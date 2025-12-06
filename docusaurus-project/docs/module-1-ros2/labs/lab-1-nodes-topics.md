---
sidebar_position: 1
sidebar_label: "Lab 1: Nodes & Topics"
id: module-1-ros2-lab-nodes-topics
---

# Lab 1: ROS 2 Nodes & Topics

## Objective
In this lab, you will create and run a publisher and subscriber node to understand the publish-subscribe communication pattern in ROS 2.

## Prerequisites
- ROS 2 Humble installed
- Basic Python knowledge
- Terminal/command line familiarity

## Estimated Time
2-3 hours

## Setup
1. Create a new ROS 2 package:
```bash
mkdir -p ~/ros2_ws/src/my_robot_tutorials
cd ~/ros2_ws/src/my_robot_tutorials
```

2. Create the package:
```bash
ros2 pkg create --build-type ament_python my_robot_tutorials
```

## Exercise 1: Basic Publisher and Subscriber

### Step 1: Create the Publisher Node
Create a file `my_robot_tutorials/my_robot_tutorials/talker.py`:

```python
#!/usr/bin/env python3

import rclpy
from rclpy.node import Node
from std_msgs.msg import String


class TalkerNode(Node):
    def __init__(self):
        super().__init__('talker')
        self.publisher_ = self.create_publisher(String, 'chatter', 10)
        timer_period = 0.5  # seconds
        self.timer = self.create_timer(timer_period, self.timer_callback)
        self.i = 0

    def timer_callback(self):
        msg = String()
        msg.data = f'Hello World: {self.i}'
        self.publisher_.publish(msg)
        self.get_logger().info(f'Publishing: "{msg.data}"')
        self.i += 1


def main(args=None):
    rclpy.init(args=args)

    talker = TalkerNode()

    rclpy.spin(talker)

    # Destroy the node explicitly
    talker.destroy_node()
    rclpy.shutdown()


if __name__ == '__main__':
    main()
```

### Step 2: Create the Subscriber Node
Create a file `my_robot_tutorials/my_robot_tutorials/listener.py`:

```python
#!/usr/bin/env python3

import rclpy
from rclpy.node import Node
from std_msgs.msg import String


class ListenerNode(Node):
    def __init__(self):
        super().__init__('listener')
        self.subscription = self.create_subscription(
            String,
            'chatter',
            self.listener_callback,
            10)
        self.subscription  # prevent unused variable warning

    def listener_callback(self, msg):
        self.get_logger().info(f'I heard: "{msg.data}"')


def main(args=None):
    rclpy.init(args=args)

    listener = ListenerNode()

    rclpy.spin(listener)

    # Destroy the node explicitly
    listener.destroy_node()
    rclpy.shutdown()


if __name__ == '__main__':
    main()
```

### Step 3: Make Files Executable and Update Setup
Make the files executable:
```bash
chmod +x my_robot_tutorials/my_robot_tutorials/talker.py
chmod +x my_robot_tutorials/my_robot_tutorials/listener.py
```

Update `my_robot_tutorials/setup.py` to include the executables:
```python
from setuptools import setup
import os
from glob import glob

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
        ],
    },
)
```

### Step 4: Build and Run
```bash
cd ~/ros2_ws
colcon build --packages-select my_robot_tutorials
source install/setup.bash
```

Run the publisher in one terminal:
```bash
ros2 run my_robot_tutorials talker
```

Run the subscriber in another terminal:
```bash
ros2 run my_robot_tutorials listener
```

## Exercise 2: Custom Message Types
Create a custom message type for a robot's position.

### Step 1: Create the Message Definition
Create directory structure:
```bash
mkdir -p my_robot_tutorials/msg
```

Create `my_robot_tutorials/msg/Position.msg`:
```
float64 x
float64 y
float64 z
string frame_id
```

### Step 2: Update package.xml
Add to `my_robot_tutorials/package.xml`:
```xml
<depend>std_msgs</depend>
<build_depend>rosidl_default_generators</build_depend>
<exec_depend>rosidl_default_runtime</exec_depend>
<member_of_group>rosidl_interface_packages</member_of_group>
```

### Step 3: Update setup.py
Add to `my_robot_tutorials/setup.py`:
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
        ],
    },
    # Add the following for custom messages
    packages=[package_name],
    package_dir={'': 'my_robot_tutorials'},
    package_data={'': ['msg/*.msg']},
)
```

## Verification Steps
1. Verify that the publisher and subscriber communicate correctly
2. Check that messages are published and received as expected
3. Use `ros2 topic list` and `ros2 topic echo` to verify topics
4. Confirm that custom messages work if implemented

## Expected Output
The subscriber should receive and print messages from the publisher at the specified interval.

## Troubleshooting
- If nodes don't communicate, check that both terminals have sourced the workspace
- Use `ros2 topic list` to see active topics
- Use `ros2 node list` to see active nodes
- Check that the topic names match exactly between publisher and subscriber

## Summary
In this lab, you've learned how to create publisher and subscriber nodes in ROS 2, how to define custom message types, and how to test communication between nodes.