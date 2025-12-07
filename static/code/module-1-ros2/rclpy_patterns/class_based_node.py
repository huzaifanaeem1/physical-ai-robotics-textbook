#!/usr/bin/env python3

"""
Example of a class-based ROS 2 node with multiple publishers and subscribers
"""

import rclpy
from rclpy.node import Node
from std_msgs.msg import String, Int32
from geometry_msgs.msg import Twist


class ClassBasedNode(Node):
    def __init__(self):
        super().__init__('class_based_node')

        # Create publishers
        self.publisher_1 = self.create_publisher(String, 'chatter', 10)
        self.publisher_2 = self.create_publisher(Twist, 'cmd_vel', 10)

        # Create subscribers
        self.subscription_1 = self.create_subscription(
            String, 'input_topic', self.string_callback, 10)
        self.subscription_2 = self.create_subscription(
            Int32, 'counter_topic', self.int_callback, 10)

        # Create timer
        self.timer = self.create_timer(0.5, self.timer_callback)

        # Node state
        self.counter = 0
        self.last_string = ""

        self.get_logger().info('Class-based node initialized')

    def string_callback(self, msg):
        self.last_string = msg.data
        self.get_logger().info(f'Received string: {msg.data}')

    def int_callback(self, msg):
        self.counter = msg.data
        self.get_logger().info(f'Received counter: {msg.data}')

    def timer_callback(self):
        # Publish a message
        msg = String()
        msg.data = f'Hello from class-based node: {self.counter}'
        self.publisher_1.publish(msg)

        # Publish a velocity command
        vel_msg = Twist()
        vel_msg.linear.x = float(self.counter % 10) * 0.1
        vel_msg.angular.z = 0.0
        self.publisher_2.publish(vel_msg)

        self.get_logger().info(f'Published: {msg.data}')


def main(args=None):
    rclpy.init(args=args)

    node = ClassBasedNode()

    try:
        rclpy.spin(node)
    except KeyboardInterrupt:
        pass
    finally:
        node.destroy_node()
        rclpy.shutdown()


if __name__ == '__main__':
    main()