---
sidebar_position: 2
sidebar_label: "Lab 2: Services & Actions"
id: module-1-ros2-lab-services-actions
---

# Lab 2: ROS 2 Services & Actions

## Objective
In this lab, you will create and run service and action servers and clients to understand request-response and goal-oriented communication patterns in ROS 2.

## Prerequisites
- ROS 2 Humble installed
- Understanding of ROS 2 nodes and topics
- Basic Python knowledge
- Completed Lab 1: Nodes & Topics

## Estimated Time
2-3 hours

## Setup
1. Ensure you have the ROS 2 workspace from Lab 1:
```bash
cd ~/ros2_ws/src/my_robot_tutorials
```

## Exercise 1: Basic Service Server and Client

### Step 1: Create the Service Definition
Create directory structure:
```bash
mkdir -p my_robot_tutorials/srv
```

Create `my_robot_tutorials/srv/AddTwoInts.srv`:
```
int64 a
int64 b
---
int64 sum
```

### Step 2: Create the Service Server
Create a file `my_robot_tutorials/my_robot_tutorials/add_two_ints_server.py`:

```python
#!/usr/bin/env python3

import rclpy
from rclpy.node import Node
from example_interfaces.srv import AddTwoInts


class AddTwoIntsServer(Node):
    def __init__(self):
        super().__init__('add_two_ints_server')
        self.srv = self.create_service(AddTwoInts, 'add_two_ints', self.add_two_ints_callback)

    def add_two_ints_callback(self, request, response):
        response.sum = request.a + request.b
        self.get_logger().info(f'Returning {request.a} + {request.b} = {response.sum}')
        return response


def main(args=None):
    rclpy.init(args=args)

    add_two_ints_server = AddTwoIntsServer()

    rclpy.spin(add_two_ints_server)

    add_two_ints_server.destroy_node()
    rclpy.shutdown()


if __name__ == '__main__':
    main()
```

### Step 3: Create the Service Client
Create a file `my_robot_tutorials/my_robot_tutorials/add_two_ints_client.py`:

```python
#!/usr/bin/env python3

import sys
import rclpy
from rclpy.node import Node
from example_interfaces.srv import AddTwoInts


class AddTwoIntsClient(Node):
    def __init__(self):
        super().__init__('add_two_ints_client')
        self.client = self.create_client(AddTwoInts, 'add_two_ints')

        while not self.client.wait_for_service(timeout_sec=1.0):
            self.get_logger().info('Service not available, waiting again...')

        self.request = AddTwoInts.Request()

    def send_request(self, a, b):
        self.request.a = a
        self.request.b = b
        future = self.client.call_async(self.request)
        rclpy.spin_until_future_complete(self, future)
        return future.result()


def main():
    rclpy.init()

    client = AddTwoIntsClient()
    response = client.send_request(int(sys.argv[1]), int(sys.argv[2]))

    if response is not None:
        print(f'Result of add_two_ints: {response.sum}')
    else:
        print('Service call failed')

    client.destroy_node()
    rclpy.shutdown()


if __name__ == '__main__':
    main()
```

### Step 4: Make Files Executable
```bash
chmod +x my_robot_tutorials/my_robot_tutorials/add_two_ints_server.py
chmod +x my_robot_tutorials/my_robot_tutorials/add_two_ints_client.py
```

### Step 5: Update setup.py for Services
Update `my_robot_tutorials/setup.py` to include services:
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
            'add_two_ints_server = my_robot_tutorials.add_two_ints_server:main',
            'add_two_ints_client = my_robot_tutorials.add_two_ints_client:main',
        ],
    },
)
```

### Step 6: Build and Run the Service
```bash
cd ~/ros2_ws
colcon build --packages-select my_robot_tutorials
source install/setup.bash
```

Run the service server in one terminal:
```bash
ros2 run my_robot_tutorials add_two_ints_server
```

Run the service client in another terminal:
```bash
ros2 run my_robot_tutorials add_two_ints_client 2 3
```

## Exercise 2: Basic Action Server and Client

### Step 1: Create the Action Definition
Create directory structure:
```bash
mkdir -p my_robot_tutorials/action
```

Create `my_robot_tutorials/action/Fibonacci.action`:
```
int32 order
---
int32[] sequence
---
int32[] partial_sequence
```

### Step 2: Create the Action Server
Create a file `my_robot_tutorials/my_robot_tutorials/fibonacci_action_server.py`:

```python
#!/usr/bin/env python3

import time
import rclpy
from rclpy.action import ActionServer
from rclpy.node import Node
from example_interfaces.action import Fibonacci


class FibonacciActionServer(Node):
    def __init__(self):
        super().__init__('fibonacci_action_server')
        self._action_server = ActionServer(
            self,
            Fibonacci,
            'fibonacci',
            self.execute_callback)

    def execute_callback(self, goal_handle):
        self.get_logger().info('Executing goal...')

        feedback_msg = Fibonacci.Feedback()
        feedback_msg.partial_sequence = [0, 1]

        for i in range(1, goal_handle.request.order):
            if goal_handle.is_cancel_requested:
                goal_handle.canceled()
                self.get_logger().info('Goal canceled')
                return Fibonacci.Result()

            feedback_msg.partial_sequence.append(
                feedback_msg.partial_sequence[i] + feedback_msg.partial_sequence[i-1])

            self.get_logger().info(f'Feedback: {feedback_msg.partial_sequence}')
            goal_handle.publish_feedback(feedback_msg)
            time.sleep(1)

        goal_handle.succeed()
        result = Fibonacci.Result()
        result.sequence = feedback_msg.partial_sequence
        self.get_logger().info(f'Result: {result.sequence}')

        return result


def main(args=None):
    rclpy.init(args=args)

    fibonacci_action_server = FibonacciActionServer()

    rclpy.spin(fibonacci_action_server)


if __name__ == '__main__':
    main()
```

### Step 3: Create the Action Client
Create a file `my_robot_tutorials/my_robot_tutorials/fibonacci_action_client.py`:

```python
#!/usr/bin/env python3

import time
import rclpy
from rclpy.action import ActionClient
from rclpy.node import Node
from example_interfaces.action import Fibonacci


class FibonacciActionClient(Node):
    def __init__(self):
        super().__init__('fibonacci_action_client')
        self._action_client = ActionClient(
            self,
            Fibonacci,
            'fibonacci')

    def send_goal(self, order):
        goal_msg = Fibonacci.Goal()
        goal_msg.order = order

        self._action_client.wait_for_server()

        self._send_goal_future = self._action_client.send_goal_async(
            goal_msg,
            feedback_callback=self.feedback_callback)

        self._send_goal_future.add_done_callback(self.goal_response_callback)

    def goal_response_callback(self, future):
        goal_handle = future.result()
        if not goal_handle.accepted:
            self.get_logger().info('Goal rejected :(')
            return

        self.get_logger().info('Goal accepted :)')

        self._get_result_future = goal_handle.get_result_async()
        self._get_result_future.add_done_callback(self.get_result_callback)

    def feedback_callback(self, feedback_msg):
        feedback = feedback_msg.feedback
        self.get_logger().info(f'Received feedback: {feedback.partial_sequence}')

    def get_result_callback(self, future):
        result = future.result().result
        self.get_logger().info(f'Result: {result.sequence}')
        rclpy.shutdown()


def main(args=None):
    rclpy.init(args=args)

    action_client = FibonacciActionClient()
    action_client.send_goal(10)

    rclpy.spin(action_client)


if __name__ == '__main__':
    main()
```

### Step 4: Make Action Files Executable
```bash
chmod +x my_robot_tutorials/my_robot_tutorials/fibonacci_action_server.py
chmod +x my_robot_tutorials/my_robot_tutorials/fibonacci_action_client.py
```

### Step 5: Update setup.py for Actions
Update `my_robot_tutorials/setup.py` to include actions:
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
            'add_two_ints_server = my_robot_tutorials.add_two_ints_server:main',
            'add_two_ints_client = my_robot_tutorials.add_two_ints_client:main',
            'fibonacci_action_server = my_robot_tutorials.fibonacci_action_server:main',
            'fibonacci_action_client = my_robot_tutorials.fibonacci_action_client:main',
        ],
    },
)
```

### Step 6: Build and Run the Action
```bash
cd ~/ros2_ws
colcon build --packages-select my_robot_tutorials
source install/setup.bash
```

Run the action server in one terminal:
```bash
ros2 run my_robot_tutorials fibonacci_action_server
```

Run the action client in another terminal:
```bash
ros2 run my_robot_tutorials fibonacci_action_client
```

## Exercise 3: Custom Service Implementation
Implement a custom service for a robot to calculate the distance between two points.

### Step 1: Create Custom Service Definition
Create `my_robot_tutorials/srv/CalculateDistance.srv`:
```
float64 x1
float64 y1
float64 x2
float64 y2
---
float64 distance
```

## Verification Steps
1. Verify that the service server and client communicate correctly
2. Check that the action server and client work with feedback
3. Use `ros2 service list` and `ros2 action list` to verify services and actions
4. Confirm that custom services work if implemented

## Expected Output
- Service client should receive calculated results from the server
- Action client should receive feedback during execution and final result
- Both should complete without errors

## Troubleshooting
- If services/actions don't work, check that both terminals have sourced the workspace
- Use `ros2 service list` and `ros2 action list` to see available services/actions
- Use `ros2 node list` to see active nodes
- Check that service/action names match exactly between client and server

## Summary
In this lab, you've learned how to create service and action servers and clients in ROS 2, how to define custom service and action types, and how to test request-response and goal-oriented communication patterns.