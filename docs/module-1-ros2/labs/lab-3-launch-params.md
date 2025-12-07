---
sidebar_position: 3
sidebar_label: "Lab 3: Launch Files & Parameters"
id: module-1-ros2-lab-launch-params
---

# Lab 3: ROS 2 Launch Files & Parameters

## Objective
In this lab, you will create launch files to orchestrate multiple nodes and manage parameters for your ROS 2 applications.

## Prerequisites
- ROS 2 Humble installed
- Understanding of ROS 2 nodes, topics, and services
- Basic Python knowledge
- Completed Lab 1 and Lab 2

## Estimated Time
2-3 hours

## Setup
1. Ensure you have the ROS 2 workspace from previous labs:
```bash
cd ~/ros2_ws/src/my_robot_tutorials
```

## Exercise 1: Basic Launch File

### Step 1: Create a Simple Node for Launching
Create a file `my_robot_tutorials/my_robot_tutorials/parameter_node.py`:

```python
#!/usr/bin/env python3

import rclpy
from rclpy.node import Node
from std_msgs.msg import String


class ParameterNode(Node):
    def __init__(self):
        super().__init__('parameter_node')

        # Declare parameters with default values
        self.declare_parameter('robot_name', 'turtlebot')
        self.declare_parameter('max_velocity', 1.0)
        self.declare_parameter('operating_mode', 'autonomous')

        # Get parameter values
        self.robot_name = self.get_parameter('robot_name').value
        self.max_velocity = self.get_parameter('max_velocity').value
        self.operating_mode = self.get_parameter('operating_mode').value

        # Create publisher
        self.publisher_ = self.create_publisher(String, 'robot_status', 10)

        # Log parameter values
        self.get_logger().info(f'Robot Name: {self.robot_name}')
        self.get_logger().info(f'Max Velocity: {self.max_velocity}')
        self.get_logger().info(f'Operating Mode: {self.operating_mode}')

        # Timer to publish status
        timer_period = 1.0  # seconds
        self.timer = self.create_timer(timer_period, self.timer_callback)

    def timer_callback(self):
        msg = String()
        msg.data = f'{self.robot_name} status: {self.operating_mode}, velocity: {self.max_velocity}'
        self.publisher_.publish(msg)
        self.get_logger().info(f'Published: {msg.data}')


def main(args=None):
    rclpy.init(args=args)
    node = ParameterNode()
    rclpy.spin(node)
    node.destroy_node()
    rclpy.shutdown()


if __name__ == '__main__':
    main()
```

### Step 2: Create a Basic Launch File
Create directory for launch files:
```bash
mkdir -p my_robot_tutorials/launch
```

Create `my_robot_tutorials/launch/basic_launch_example.py`:

```python
from launch import LaunchDescription
from launch.actions import DeclareLaunchArgument
from launch.substitutions import LaunchConfiguration
from launch_ros.actions import Node


def generate_launch_description():
    return LaunchDescription([
        # Declare launch arguments
        DeclareLaunchArgument(
            'robot_name',
            default_value='turtlebot',
            description='Name of the robot'
        ),
        DeclareLaunchArgument(
            'max_velocity',
            default_value='0.5',
            description='Maximum velocity of the robot'
        ),

        # Launch the parameter node
        Node(
            package='my_robot_tutorials',
            executable='parameter_node',
            name='parameter_node',
            parameters=[
                {
                    'robot_name': LaunchConfiguration('robot_name'),
                    'max_velocity': LaunchConfiguration('max_velocity'),
                    'operating_mode': 'autonomous'
                }
            ],
            output='screen'
        )
    ])
```

### Step 3: Make Node Executable and Update Setup
```bash
chmod +x my_robot_tutorials/my_robot_tutorials/parameter_node.py
```

Update `my_robot_tutorials/setup.py`:
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
        ],
    },
)
```

### Step 4: Build and Run Basic Launch
```bash
cd ~/ros2_ws
colcon build --packages-select my_robot_tutorials
source install/setup.bash
```

Run the launch file:
```bash
ros2 launch my_robot_tutorials basic_launch_example.py
```

Or with custom parameters:
```bash
ros2 launch my_robot_tutorials basic_launch_example.py robot_name:=husky max_velocity:=2.0
```

## Exercise 2: Complex Launch File with Multiple Nodes

### Step 1: Create Additional Nodes
Create `my_robot_tutorials/my_robot_tutorials/motion_controller.py`:

```python
#!/usr/bin/env python3

import rclpy
from rclpy.node import Node
from std_msgs.msg import Float64


class MotionController(Node):
    def __init__(self):
        super().__init__('motion_controller')

        # Declare parameters
        self.declare_parameter('kp', 1.0)
        self.declare_parameter('ki', 0.1)
        self.declare_parameter('kd', 0.01)
        self.declare_parameter('max_speed', 1.0)

        # Get parameter values
        self.kp = self.get_parameter('kp').value
        self.ki = self.get_parameter('ki').value
        self.kd = self.get_parameter('kd').value
        self.max_speed = self.get_parameter('max_speed').value

        # Publishers and subscribers
        self.cmd_vel_pub = self.create_publisher(Float64, 'cmd_vel', 10)
        self.target_vel_sub = self.create_subscription(Float64, 'target_vel', self.target_callback, 10)

        self.current_target = 0.0
        self.get_logger().info(f'Motion Controller initialized with PID: [{self.kp}, {self.ki}, {self.kd}]')

    def target_callback(self, msg):
        self.current_target = msg.data
        # Simple proportional control
        cmd_msg = Float64()
        cmd_msg.data = min(self.current_target * self.kp, self.max_speed)
        self.cmd_vel_pub.publish(cmd_msg)
        self.get_logger().info(f'Commanded velocity: {cmd_msg.data}')


def main(args=None):
    rclpy.init(args=args)
    node = MotionController()
    rclpy.spin(node)
    node.destroy_node()
    rclpy.shutdown()


if __name__ == '__main__':
    main()
```

Create `my_robot_tutorials/my_robot_tutorials/target_generator.py`:

```python
#!/usr/bin/env python3

import rclpy
from rclpy.node import Node
from std_msgs.msg import Float64
import math
import time


class TargetGenerator(Node):
    def __init__(self):
        super().__init__('target_generator')

        # Declare parameters
        self.declare_parameter('amplitude', 1.0)
        self.declare_parameter('frequency', 0.1)

        self.amplitude = self.get_parameter('amplitude').value
        self.frequency = self.get_parameter('frequency').value

        # Publisher
        self.target_pub = self.create_publisher(Float64, 'target_vel', 10)

        # Timer for publishing
        timer_period = 0.1  # seconds
        self.timer = self.create_timer(timer_period, self.timer_callback)
        self.time_counter = 0.0

    def timer_callback(self):
        # Generate sinusoidal target
        target_vel = self.amplitude * math.sin(2 * math.pi * self.frequency * self.time_counter)
        msg = Float64()
        msg.data = target_vel

        self.target_pub.publish(msg)
        self.get_logger().info(f'Generated target velocity: {target_vel}')

        self.time_counter += timer_period


def main(args=None):
    rclpy.init(args=args)
    node = TargetGenerator()
    rclpy.spin(node)
    node.destroy_node()
    rclpy.shutdown()


if __name__ == '__main__':
    main()
```

### Step 2: Create Complex Launch File
Create `my_robot_tutorials/launch/complex_system_launch.py`:

```python
from launch import LaunchDescription
from launch.actions import DeclareLaunchArgument, LogInfo
from launch.substitutions import LaunchConfiguration
from launch_ros.actions import Node
import os


def generate_launch_description():
    # Declare launch arguments
    robot_name_arg = DeclareLaunchArgument(
        'robot_name',
        default_value='turtlebot',
        description='Name of the robot'
    )

    max_velocity_arg = DeclareLaunchArgument(
        'max_velocity',
        default_value='1.0',
        description='Maximum velocity of the robot'
    )

    kp_arg = DeclareLaunchArgument(
        'kp',
        default_value='1.0',
        description='Proportional gain for controller'
    )

    ki_arg = DeclareLaunchArgument(
        'ki',
        default_value='0.1',
        description='Integral gain for controller'
    )

    kd_arg = DeclareLaunchArgument(
        'kd',
        default_value='0.01',
        description='Derivative gain for controller'
    )

    # Create nodes
    parameter_node = Node(
        package='my_robot_tutorials',
        executable='parameter_node',
        name='parameter_node',
        parameters=[
            {
                'robot_name': LaunchConfiguration('robot_name'),
                'max_velocity': LaunchConfiguration('max_velocity'),
                'operating_mode': 'autonomous'
            }
        ],
        output='screen'
    )

    motion_controller = Node(
        package='my_robot_tutorials',
        executable='motion_controller',
        name='motion_controller',
        parameters=[
            {
                'kp': LaunchConfiguration('kp'),
                'ki': LaunchConfiguration('ki'),
                'kd': LaunchConfiguration('kd'),
                'max_speed': LaunchConfiguration('max_velocity')
            }
        ],
        output='screen'
    )

    target_generator = Node(
        package='my_robot_tutorials',
        executable='target_generator',
        name='target_generator',
        parameters=[
            {
                'amplitude': 0.5,
                'frequency': 0.2
            }
        ],
        output='screen'
    )

    # Add a logging action
    startup_log = LogInfo(msg=['Starting complex robot system for: ', LaunchConfiguration('robot_name')])

    return LaunchDescription([
        robot_name_arg,
        max_velocity_arg,
        kp_arg,
        ki_arg,
        kd_arg,
        startup_log,
        parameter_node,
        motion_controller,
        target_generator
    ])
```

### Step 3: Make Additional Nodes Executable
```bash
chmod +x my_robot_tutorials/my_robot_tutorials/motion_controller.py
chmod +x my_robot_tutorials/my_robot_tutorials/target_generator.py
```

### Step 4: Update Setup and Rebuild
```bash
cd ~/ros2_ws
colcon build --packages-select my_robot_tutorials
source install/setup.bash
```

Run the complex launch file:
```bash
ros2 launch my_robot_tutorials complex_system_launch.py robot_name:=husky max_velocity:=2.0 kp:=2.0 ki:=0.2 kd:=0.02
```

## Exercise 3: YAML Parameter Files

### Step 1: Create Parameter Files
Create `my_robot_tutorials/config/robot_params.yaml`:

```yaml
parameter_node:
  ros__parameters:
    robot_name: "turtlebot4"
    max_velocity: 1.5
    operating_mode: "autonomous"

motion_controller:
  ros__parameters:
    kp: 1.5
    ki: 0.15
    kd: 0.015
    max_speed: 2.0

target_generator:
  ros__parameters:
    amplitude: 0.8
    frequency: 0.15
```

### Step 2: Create Launch File with YAML Parameters
Create `my_robot_tutorials/launch/yaml_params_launch.py`:

```python
from launch import LaunchDescription
from launch_ros.actions import Node
from ament_index_python.packages import get_package_share_directory
import os


def generate_launch_description():
    # Get the path to the config directory
    config = os.path.join(
        get_package_share_directory('my_robot_tutorials'),
        'config',
        'robot_params.yaml'
    )

    # Create nodes with YAML parameters
    parameter_node = Node(
        package='my_robot_tutorials',
        executable='parameter_node',
        name='parameter_node',
        parameters=[config],
        output='screen'
    )

    motion_controller = Node(
        package='my_robot_tutorials',
        executable='motion_controller',
        name='motion_controller',
        parameters=[config],
        output='screen'
    )

    target_generator = Node(
        package='my_robot_tutorials',
        executable='target_generator',
        name='target_generator',
        parameters=[config],
        output='screen'
    )

    return LaunchDescription([
        parameter_node,
        motion_controller,
        target_generator
    ])
```

### Step 3: Update Package.xml for Config Files
Update `my_robot_tutorials/package.xml` to include config files in data files:
```xml
<package format="3">
  <name>my_robot_tutorials</name>
  <version>0.0.0</version>
  <description>TODO: Package description</description>
  <maintainer email="your_email@example.com">your_name</maintainer>
  <license>TODO: License declaration</license>

  <depend>rclpy</depend>
  <depend>std_msgs</depend>
  <depend>example_interfaces</depend>

  <exec_depend>ros2launch</exec_depend>

  <export>
    <build_type>ament_python</build_type>
  </export>
</package>
```

### Step 4: Update Setup.py for Config Files
Update `my_robot_tutorials/setup.py` to include config files:
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
        ],
    },
)
```

### Step 5: Create Config Directory and File
```bash
mkdir -p my_robot_tutorials/config
```

Then create the YAML file: