#!/usr/bin/env python3

"""
Simple AI Agent to ROS Bridge Example
This example shows how to connect an AI agent with ROS 2
"""

import rclpy
from rclpy.node import Node
from std_msgs.msg import String, Float64
from geometry_msgs.msg import Twist
from sensor_msgs.msg import LaserScan
import random
import json


class SimpleAgentBridge(Node):
    def __init__(self):
        super().__init__('simple_agent_bridge')

        # Publishers
        self.cmd_vel_pub = self.create_publisher(Twist, 'cmd_vel', 10)
        self.agent_status_pub = self.create_publisher(String, 'agent_status', 10)

        # Subscribers
        self.sensor_sub = self.create_subscription(
            LaserScan, 'scan', self.sensor_callback, 10)
        self.command_sub = self.create_subscription(
            String, 'agent_command', self.command_callback, 10)

        # Timer for agent decisions
        self.timer = self.create_timer(0.5, self.agent_decision_callback)

        # Agent state
        self.sensor_data = None
        self.agent_mode = 'explore'  # explore, navigate, avoid
        self.obstacle_detected = False

        self.get_logger().info('Simple Agent Bridge initialized')

    def sensor_callback(self, msg):
        """Process sensor data from ROS"""
        if len(msg.ranges) > 0:
            # Get minimum distance in front
            front_ranges = msg.ranges[len(msg.ranges)//2-30:len(msg.ranges)//2+30]
            front_ranges = [r for r in front_ranges if r != float('inf')]

            if front_ranges:
                min_distance = min(front_ranges)
                self.obstacle_detected = min_distance < 1.0
                self.sensor_data = min_distance

    def command_callback(self, msg):
        """Process commands from external agent controller"""
        try:
            command_data = json.loads(msg.data)
            new_mode = command_data.get('command', 'explore').lower()

            if new_mode in ['explore', 'navigate', 'avoid', 'stop']:
                self.agent_mode = new_mode
                self.get_logger().info(f'Agent mode changed to: {self.agent_mode}')
        except json.JSONDecodeError:
            self.get_logger().warn(f'Invalid command format: {msg.data}')

    def agent_decision_callback(self):
        """Main agent decision loop"""
        cmd_msg = Twist()

        if self.agent_mode == 'stop':
            # Stop the robot
            cmd_msg.linear.x = 0.0
            cmd_msg.angular.z = 0.0
        elif self.agent_mode == 'avoid' or self.obstacle_detected:
            # Obstacle avoidance behavior
            cmd_msg.linear.x = 0.0
            cmd_msg.angular.z = 0.5  # Turn to avoid
            self.get_logger().info('Avoiding obstacle')
        elif self.agent_mode == 'navigate':
            # Navigate forward
            cmd_msg.linear.x = 0.5
            cmd_msg.angular.z = 0.0
        else:  # explore
            # Random exploration
            cmd_msg.linear.x = 0.3
            cmd_msg.angular.z = random.uniform(-0.2, 0.2)

        # Publish command
        self.cmd_vel_pub.publish(cmd_msg)

        # Publish status
        status_msg = String()
        status_msg.data = f"Mode: {self.agent_mode}, Linear: {cmd_msg.linear.x}, Angular: {cmd_msg.angular.z}"
        self.agent_status_pub.publish(status_msg)

    def get_agent_state(self):
        """Get current state for external AI agent"""
        return {
            'mode': self.agent_mode,
            'obstacle_detected': self.obstacle_detected,
            'sensor_data': self.sensor_data,
            'timestamp': self.get_clock().now().nanoseconds
        }


def main(args=None):
    rclpy.init(args=args)

    node = SimpleAgentBridge()

    try:
        rclpy.spin(node)
    except KeyboardInterrupt:
        pass
    finally:
        node.destroy_node()
        rclpy.shutdown()


if __name__ == '__main__':
    main()