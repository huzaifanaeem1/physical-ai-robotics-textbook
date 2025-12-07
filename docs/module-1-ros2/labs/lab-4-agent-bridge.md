---
sidebar_position: 4
sidebar_label: "Lab 4: Agent to ROS Bridge"
id: module-1-ros2-lab-agent-bridge
---

# Lab 4: Agent to ROS Bridge

## Objective
In this lab, you will create a bridge between Python-based AI agents and ROS 2 systems to integrate intelligent decision-making with robotic control.

## Prerequisites
- ROS 2 Humble installed
- Understanding of ROS 2 nodes, topics, services, and actions
- Basic Python knowledge including AI/ML concepts
- Completed Lab 1, Lab 2, and Lab 3

## Estimated Time
2-3 hours

## Setup
1. Ensure you have the ROS 2 workspace from previous labs:
```bash
cd ~/ros2_ws/src/my_robot_tutorials
```

## Exercise 1: Basic Agent-ROS Bridge

### Step 1: Create the Agent Node
Create a file `my_robot_tutorials/my_robot_tutorials/ai_agent_bridge.py`:

```python
#!/usr/bin/env python3

import rclpy
from rclpy.node import Node
from std_msgs.msg import String, Float64
from geometry_msgs.msg import Twist
from sensor_msgs.msg import LaserScan
import random
import time


class AIAgentBridge(Node):
    def __init__(self):
        super().__init__('ai_agent_bridge')

        # Declare parameters
        self.declare_parameter('agent_type', 'simple_navigation')
        self.declare_parameter('update_rate', 1.0)

        self.agent_type = self.get_parameter('agent_type').value
        self.update_rate = self.get_parameter('update_rate').value

        # Publishers
        self.cmd_vel_pub = self.create_publisher(Twist, 'cmd_vel', 10)
        self.agent_status_pub = self.create_publisher(String, 'agent_status', 10)

        # Subscribers
        self.laser_sub = self.create_subscription(
            LaserScan, 'scan', self.laser_callback, 10)

        # Timer for agent decisions
        self.timer = self.create_timer(1.0/self.update_rate, self.agent_decision_callback)

        # Agent state
        self.laser_data = None
        self.obstacle_detected = False
        self.get_logger().info(f'AI Agent Bridge initialized with type: {self.agent_type}')

    def laser_callback(self, msg):
        """Process laser scan data"""
        if len(msg.ranges) > 0:
            # Check for obstacles in front (within 1 meter, in 60 degree cone)
            front_ranges = msg.ranges[len(msg.ranges)//2-30:len(msg.ranges)//2+30]
            front_ranges = [r for r in front_ranges if r != float('inf')]

            if front_ranges:
                min_distance = min(front_ranges)
                self.obstacle_detected = min_distance < 1.0
                self.laser_data = min_distance

    def agent_decision_callback(self):
        """Main AI agent decision loop"""
        cmd_msg = Twist()

        if self.agent_type == 'simple_navigation':
            cmd_msg = self.simple_navigation_agent()
        elif self.agent_type == 'avoid_obstacles':
            cmd_msg = self.obstacle_avoidance_agent()
        else:
            cmd_msg = self.simple_navigation_agent()

        # Publish command
        self.cmd_vel_pub.publish(cmd_msg)

        # Publish status
        status_msg = String()
        status_msg.data = f"Agent decision: linear={cmd_msg.linear.x}, angular={cmd_msg.angular.z}"
        self.agent_status_pub.publish(status_msg)

        self.get_logger().info(f'Agent published: linear={cmd_msg.linear.x}, angular={cmd_msg.angular.z}')

    def simple_navigation_agent(self):
        """Simple navigation agent that moves forward unless obstacle detected"""
        cmd_msg = Twist()

        if self.obstacle_detected and self.laser_data:
            # Stop and turn if obstacle detected
            cmd_msg.linear.x = 0.0
            cmd_msg.angular.z = 0.5  # Turn right
            self.get_logger().info(f'Obstacle detected at {self.laser_data:.2f}m, turning...')
        else:
            # Move forward
            cmd_msg.linear.x = 0.5
            cmd_msg.angular.z = 0.0
            self.get_logger().info('Moving forward...')

        return cmd_msg

    def obstacle_avoidance_agent(self):
        """More sophisticated obstacle avoidance agent"""
        cmd_msg = Twist()

        if not self.laser_data:
            cmd_msg.linear.x = 0.0
            cmd_msg.angular.z = 0.0
            return cmd_msg

        if self.obstacle_detected:
            # More sophisticated avoidance
            cmd_msg.linear.x = 0.0
            cmd_msg.angular.z = 0.8  # Turn faster
        else:
            # Move forward at variable speed based on safety
            cmd_msg.linear.x = min(0.8, self.laser_data * 0.5)  # Faster if more space
            cmd_msg.angular.z = 0.0

        return cmd_msg


def main(args=None):
    rclpy.init(args=args)
    node = AIAgentBridge()
    rclpy.spin(node)
    node.destroy_node()
    rclpy.shutdown()


if __name__ == '__main__':
    main()
```

### Step 2: Create the Agent Controller Node
Create a file `my_robot_tutorials/my_robot_tutorials/agent_controller.py`:

```python
#!/usr/bin/env python3

import rclpy
from rclpy.node import Node
from std_msgs.msg import String
from std_msgs.msg import Bool
from geometry_msgs.msg import Twist
import json


class AgentController(Node):
    def __init__(self):
        super().__init__('agent_controller')

        # Publishers
        self.agent_command_pub = self.create_publisher(String, 'agent_command', 10)
        self.agent_mode_pub = self.create_publisher(String, 'agent_mode', 10)

        # Subscribers
        self.agent_status_sub = self.create_subscription(
            String, 'agent_status', self.agent_status_callback, 10)
        self.emergency_stop_sub = self.create_subscription(
            Bool, 'emergency_stop', self.emergency_stop_callback, 10)

        # Timer for sending commands
        self.timer = self.create_timer(2.0, self.send_command_callback)

        self.command_counter = 0
        self.emergency_stop_active = False

        self.get_logger().info('Agent Controller initialized')

    def agent_status_callback(self, msg):
        """Handle agent status updates"""
        self.get_logger().info(f'Agent status: {msg.data}')

    def emergency_stop_callback(self, msg):
        """Handle emergency stop"""
        self.emergency_stop_active = msg.data
        if self.emergency_stop_active:
            self.get_logger().warn('EMERGENCY STOP ACTIVATED')
            # Publish stop command
            stop_cmd = String()
            stop_cmd.data = json.dumps({'command': 'STOP', 'reason': 'EMERGENCY'})
            self.agent_command_pub.publish(stop_cmd)

    def send_command_callback(self):
        """Send periodic commands to the agent"""
        if self.emergency_stop_active:
            return

        commands = [
            {"command": "NAVIGATE", "target": [1.0, 1.0]},
            {"command": "SEARCH", "area": "room_1"},
            {"command": "RETURN_HOME", "reason": "battery_low"},
            {"command": "WAIT", "duration": 5.0}
        ]

        cmd_data = commands[self.command_counter % len(commands)]
        cmd_msg = String()
        cmd_msg.data = json.dumps(cmd_data)

        self.agent_command_pub.publish(cmd_msg)
        self.get_logger().info(f'Sent command: {cmd_data}')

        self.command_counter += 1


def main(args=None):
    rclpy.init(args=args)
    node = AgentController()
    rclpy.spin(node)
    node.destroy_node()
    rclpy.shutdown()


if __name__ == '__main__':
    main()
```

### Step 3: Make Files Executable and Update Setup
```bash
chmod +x my_robot_tutorials/my_robot_tutorials/ai_agent_bridge.py
chmod +x my_robot_tutorials/my_robot_tutorials/agent_controller.py
```

Update `my_robot_tutorials/setup.py` to include the new executables:
```python
from setuptools import setup
from glob import glob
import os

package_name = 'my_robot_tutorials'

setup(
    name=package_name,
    version='0.0.0',
    packages=[package_name],
    data_files=[
        ('share/ament_index/resource_index/packages',
            ['resource/' + package_name]),
        ('share/' + package_name, ['package.xml']),
        (os.path.join('share', package_name, 'launch'), glob('launch/*launch.[pxy][yma]*')),
        (os.path.join('share', package_name, 'config'), glob('config/*.yaml')),
    ],
    install_requires=['setuptools'],
    zip_safe=True,
    maintainer='your_name',
    maintainer_email='your_email@example.com',
    description='TODO: Package description',
    license='TODO: License declaration',
    tests_require=['pytest'],
    entry_points={
        'console_scripts': [
            'talker = my_robot_tutorials.talker:main',
            'listener = my_robot_tutorials.listener:main',
            'add_two_ints_server = my_robot_tutorials.add_two_ints_server:main',
            'add_two_ints_client = my_robot_tutorials.add_two_ints_client:main',
            'fibonacci_action_server = my_robot_tutorials.fibonacci_action_server:main',
            'fibonacci_action_client = my_robot_tutorials.fibonacci_action_client:main',
            'parameter_node = my_robot_tutorials.parameter_node:main',
            'motion_controller = my_robot_tutorials.motion_controller:main',
            'target_generator = my_robot_tutorials.target_generator:main',
            'ai_agent_bridge = my_robot_tutorials.ai_agent_bridge:main',
            'agent_controller = my_robot_tutorials.agent_controller:main',
        ],
    },
)
```

### Step 4: Create Launch File for Agent Bridge
Create `my_robot_tutorials/launch/agent_bridge_launch.py`:

```python
from launch import LaunchDescription
from launch.actions import DeclareLaunchArgument, RegisterEventHandler
from launch.event_handlers import OnProcessStart
from launch.substitutions import LaunchConfiguration
from launch_ros.actions import Node
import os


def generate_launch_description():
    # Declare launch arguments
    agent_type_arg = DeclareLaunchArgument(
        'agent_type',
        default_value='simple_navigation',
        description='Type of AI agent to run'
    )

    update_rate_arg = DeclareLaunchArgument(
        'update_rate',
        default_value='2.0',
        description='Update rate for the AI agent (Hz)'
    )

    # AI Agent Bridge Node
    ai_agent_bridge = Node(
        package='my_robot_tutorials',
        executable='ai_agent_bridge',
        name='ai_agent_bridge',
        parameters=[
            {
                'agent_type': LaunchConfiguration('agent_type'),
                'update_rate': LaunchConfiguration('update_rate')
            }
        ],
        output='screen'
    )

    # Agent Controller Node
    agent_controller = Node(
        package='my_robot_tutorials',
        executable='agent_controller',
        name='agent_controller',
        output='screen'
    )

    # Simulated laser scanner (for testing without real robot)
    laser_sim = Node(
        package='range_sensor_broadcaster',
        executable='range_sensor_broadcaster',
        name='laser_sim',
        output='screen'
    )

    return LaunchDescription([
        agent_type_arg,
        update_rate_arg,
        ai_agent_bridge,
        agent_controller,
        # laser_sim  # Uncomment if range_sensor_broadcaster is available
    ])
```

### Step 5: Build and Test Agent Bridge
```bash
cd ~/ros2_ws
colcon build --packages-select my_robot_tutorials
source install/setup.bash
```

Run the agent bridge:
```bash
ros2 launch my_robot_tutorials agent_bridge_launch.py agent_type:=simple_navigation update_rate:=1.0
```

## Exercise 2: Advanced AI Agent with Learning

### Step 1: Create Reinforcement Learning Agent Node
Create `my_robot_tutorials/my_robot_tutorials/rl_agent.py`:

```python
#!/usr/bin/env python3

import rclpy
from rclpy.node import Node
from std_msgs.msg import String, Float64
from geometry_msgs.msg import Twist
from sensor_msgs.msg import LaserScan
import numpy as np
import random


class ReinforcementLearningAgent(Node):
    def __init__(self):
        super().__init__('rl_agent')

        # Publishers and Subscribers
        self.cmd_vel_pub = self.create_publisher(Twist, 'cmd_vel', 10)
        self.laser_sub = self.create_subscription(
            LaserScan, 'scan', self.laser_callback, 10)

        # Timer for RL decisions
        self.timer = self.create_timer(0.5, self.rl_decision_callback)

        # RL parameters
        self.learning_rate = 0.1
        self.discount_factor = 0.9
        self.exploration_rate = 0.3

        # Simple Q-table for discrete actions (forward, turn left, turn right)
        self.q_table = np.zeros((10, 3))  # 10 distance states, 3 actions
        self.previous_state = None
        self.previous_action = None
        self.laser_data = None

        self.get_logger().info('Reinforcement Learning Agent initialized')

    def laser_callback(self, msg):
        """Process laser scan data and discretize into states"""
        if len(msg.ranges) > 0:
            # Get front distance (simplified)
            front_distances = [r for r in msg.ranges[len(msg.ranges)//2-10:len(msg.ranges)//2+10]
                              if r != float('inf') and r > 0]
            if front_distances:
                min_distance = min(front_distances)
                # Discretize distance into 10 states (0-9)
                self.laser_data = min(int(min_distance * 5), 9)  # Scale distance to state index

    def get_reward(self, action, distance):
        """Calculate reward based on action and distance to obstacle"""
        if distance < 1:  # Very close to obstacle
            if action == 1 or action == 2:  # Turning actions
                return 1  # Good, turning away from obstacle
            else:  # Moving forward
                return -10  # Bad, moving toward obstacle
        elif distance > 3:  # Far from obstacles
            if action == 0:  # Moving forward
                return 1  # Good, moving efficiently
            else:  # Turning when no obstacles
                return -1  # Slightly bad, unnecessary turning
        else:  # Medium distance
            return 0.5  # Neutral positive

    def rl_decision_callback(self):
        """Main RL decision loop"""
        if self.laser_data is None:
            return

        current_state = self.laser_data

        # Choose action: exploration vs exploitation
        if random.random() < self.exploration_rate:
            action = random.randint(0, 2)  # Explore
        else:
            action = np.argmax(self.q_table[current_state])  # Exploit

        # Execute action
        cmd_msg = Twist()
        if action == 0:  # Move forward
            cmd_msg.linear.x = 0.5
            cmd_msg.angular.z = 0.0
        elif action == 1:  # Turn left
            cmd_msg.linear.x = 0.0
            cmd_msg.angular.z = 0.5
        else:  # Turn right
            cmd_msg.linear.x = 0.0
            cmd_msg.angular.z = -0.5

        # Publish command
        self.cmd_vel_pub.publish(cmd_msg)

        # Update Q-table if we have a previous state-action pair
        if self.previous_state is not None and self.previous_action is not None:
            reward = self.get_reward(action, current_state)

            # Q-learning update
            current_q = self.q_table[self.previous_state, self.previous_action]
            max_future_q = np.max(self.q_table[current_state])
            new_q = (1 - self.learning_rate) * current_q + \
                   self.learning_rate * (reward + self.discount_factor * max_future_q)

            self.q_table[self.previous_state, self.previous_action] = new_q

        # Store current state-action for next iteration
        self.previous_state = current_state
        self.previous_action = action

        self.get_logger().info(f'RL Agent: state={current_state}, action={action}, reward={self.get_reward(action, current_state):.2f}')

    def reset_episode(self):
        """Reset for new episode"""
        self.previous_state = None
        self.previous_action = None


def main(args=None):
    rclpy.init(args=args)
    node = ReinforcementLearningAgent()
    rclpy.spin(node)
    node.destroy_node()
    rclpy.shutdown()


if __name__ == '__main__':
    main()
```

### Step 2: Make RL Agent Executable and Update Setup
```bash
chmod +x my_robot_tutorials/my_robot_tutorials/rl_agent.py
```

Update setup.py again:
```python
from setuptools import setup
from glob import glob
import os

package_name = 'my_robot_tutorials'

setup(
    name=package_name,
    version='0.0.0',
    packages=[package_name],
    data_files=[
        ('share/ament_index/resource_index/packages',
            ['resource/' + package_name]),
        ('share/' + package_name, ['package.xml']),
        (os.path.join('share', package_name, 'launch'), glob('launch/*launch.[pxy][yma]*')),
        (os.path.join('share', package_name, 'config'), glob('config/*.yaml')),
    ],
    install_requires=['setuptools'],
    zip_safe=True,
    maintainer='your_name',
    maintainer_email='your_email@example.com',
    description='TODO: Package description',
    license='TODO: License declaration',
    tests_require=['pytest'],
    entry_points={
        'console_scripts': [
            'talker = my_robot_tutorials.talker:main',
            'listener = my_robot_tutorials.listener:main',
            'add_two_ints_server = my_robot_tutorials.add_two_ints_server:main',
            'add_two_ints_client = my_robot_tutorials.add_two_ints_client:main',
            'fibonacci_action_server = my_robot_tutorials.fibonacci_action_server:main',
            'fibonacci_action_client = my_robot_tutorials.fibonacci_action_client:main',
            'parameter_node = my_robot_tutorials.parameter_node:main',
            'motion_controller = my_robot_tutorials.motion_controller:main',
            'target_generator = my_robot_tutorials.target_generator:main',
            'ai_agent_bridge = my_robot_tutorials.ai_agent_bridge:main',
            'agent_controller = my_robot_tutorials.agent_controller:main',
            'rl_agent = my_robot_tutorials.rl_agent:main',
        ],
    },
)
```

## Verification Steps
1. Verify that the AI agent can receive sensor data and make decisions
2. Check that commands are properly sent to the robot
3. Use `ros2 topic list` and `ros2 topic echo` to verify agent communication
4. Confirm that the agent responds appropriately to different situations

## Expected Output
- The AI agent should process sensor data and make intelligent decisions
- Robot should navigate safely, avoiding obstacles
- Agent should adapt its behavior based on environmental feedback

## Troubleshooting
- If agent doesn't respond, check that sensor topics are properly connected
- Use `ros2 topic list` to verify all required topics exist
- Check that the agent node is receiving data from sensors
- Verify that command topics are properly connected to robot controllers

## Summary
In this lab, you've learned how to create bridges between AI agents and ROS 2 systems, implement decision-making algorithms, and integrate intelligent behavior with robotic control systems.