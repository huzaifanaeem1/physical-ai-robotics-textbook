---
sidebar_position: 8
title: Capstone Mini-Project - Build a Simple Digital Twin
---

# Capstone Mini-Project: Build a Simple Digital Twin

## Project Overview

In this capstone project, you will integrate all the concepts learned throughout this module to build a complete digital twin system. You'll create a small environment with a humanoid robot, add sensors, implement basic AI behavior, and validate that your digital twin functions correctly.

This project demonstrates your mastery of digital twin simulation by combining:
- Environment creation and physics simulation
- Robot modeling and sensor integration
- Unity visualization for high-fidelity display
- Basic AI perception-action loop

## Project Requirements

### Core Components to Implement

1. **Small Environment**: Create a room or laboratory environment with obstacles
2. **Robot Model**: Add a humanoid or simple robot to the environment
3. **One Sensor**: Implement at least one sensor (LiDAR, IMU, or camera)
4. **Basic AI Behavior**: Create a simple control loop that responds to sensor data
5. **Simulation Output**: Demonstrate that the simulation produces expected results
6. **Validation**: Verify that the digital twin behaves as expected

### Learning Objectives

By completing this project, you will demonstrate:
- Ability to create integrated simulation environments
- Understanding of sensor simulation and integration
- Knowledge of AI control loop implementation
- Skills in digital twin validation and testing

## Step-by-Step Implementation Guide

### Phase 1: Environment Setup

#### 1.1 Create the Environment World File

Create a new world file at `static/code/module-2/sdf_examples/capstone_environment.sdf`:

```xml
<?xml version="1.0" ?>
<sdf version="1.7">
  <world name="capstone_environment">
    <!-- Physics configuration -->
    <physics name="ode" default="0" type="ode">
      <max_step_size>0.001</max_step_size>
      <real_time_factor>1</real_time_factor>
      <real_time_update_rate>1000</real_time_update_rate>
    </physics>

    <!-- Lighting -->
    <light name="sun" type="directional">
      <cast_shadows>true</cast_shadows>
      <pose>0 0 10 0 0 0</pose>
      <diffuse>0.8 0.8 0.8 1</diffuse>
      <specular>0.2 0.2 0.2 1</specular>
      <attenuation>
        <range>1000</range>
        <constant>0.9</constant>
        <linear>0.01</linear>
        <quadratic>0.001</quadratic>
      </attenuation>
      <direction>-0.6 0.4 -0.8</direction>
    </light>

    <!-- Ground plane -->
    <model name="ground_plane">
      <static>true</static>
      <link name="link">
        <collision name="collision">
          <geometry>
            <plane>
              <normal>0 0 1</normal>
              <size>10 10</size>
            </plane>
          </geometry>
        </collision>
        <visual name="visual">
          <geometry>
            <plane>
              <normal>0 0 1</normal>
              <size>10 10</size>
            </plane>
          </geometry>
          <material>
            <ambient>0.7 0.7 0.7 1</ambient>
            <diffuse>0.7 0.7 0.7 1</diffuse>
          </material>
        </visual>
      </link>
    </model>

    <!-- Room walls -->
    <!-- North wall -->
    <model name="north_wall">
      <pose>0 4.9 1.5 0 0 0</pose>
      <static>true</static>
      <link name="link">
        <collision name="collision">
          <geometry>
            <box>
              <size>10 0.2 3</size>
            </box>
          </geometry>
        </collision>
        <visual name="visual">
          <geometry>
            <box>
              <size>10 0.2 3</size>
            </box>
          </geometry>
          <material>
            <ambient>0.8 0.8 0.8 1</ambient>
            <diffuse>0.8 0.8 0.8 1</diffuse>
          </material>
        </visual>
      </link>
    </model>

    <!-- South wall -->
    <model name="south_wall">
      <pose>0 -4.9 1.5 0 0 0</pose>
      <static>true</static>
      <link name="link">
        <collision name="collision">
          <geometry>
            <box>
              <size>10 0.2 3</size>
            </box>
          </geometry>
        </collision>
        <visual name="visual">
          <geometry>
            <box>
              <size>10 0.2 3</size>
            </box>
          </geometry>
          <material>
            <ambient>0.8 0.8 0.8 1</ambient>
            <diffuse>0.8 0.8 0.8 1</diffuse>
          </material>
        </visual>
      </link>
    </model>

    <!-- East wall -->
    <model name="east_wall">
      <pose>4.9 0 1.5 0 0 0</pose>
      <static>true</static>
      <link name="link">
        <collision name="collision">
          <geometry>
            <box>
              <size>0.2 10 3</size>
            </box>
          </geometry>
        </collision>
        <visual name="visual">
          <geometry>
            <box>
              <size>0.2 10 3</size>
            </box>
          </geometry>
          <material>
            <ambient>0.8 0.8 0.8 1</ambient>
            <diffuse>0.8 0.8 0.8 1</diffuse>
          </material>
        </visual>
      </link>
    </model>

    <!-- West wall -->
    <model name="west_wall">
      <pose>-4.9 0 1.5 0 0 0</pose>
      <static>true</static>
      <link name="link">
        <collision name="collision">
          <geometry>
            <box>
              <size>0.2 10 3</size>
            </box>
          </geometry>
        </collision>
        <visual name="visual">
          <geometry>
            <box>
              <size>0.2 10 3</size>
            </box>
          </geometry>
          <material>
            <ambient>0.8 0.8 0.8 1</ambient>
            <diffuse>0.8 0.8 0.8 1</diffuse>
          </material>
        </visual>
      </link>
    </model>

    <!-- Two obstacles in the room -->
    <model name="obstacle_1">
      <pose>2 1 0.5 0 0 0</pose>
      <link name="link">
        <inertial>
          <mass>5.0</mass>
          <inertia>
            <ixx>0.4167</ixx>
            <ixy>0.0</ixy>
            <ixz>0.0</ixz>
            <iyy>0.4167</iyy>
            <iyz>0.0</iyz>
            <izz>0.8333</izz>
          </inertia>
        </inertial>
        <collision name="collision">
          <geometry>
            <box>
              <size>0.8 0.8 1.0</size>
            </box>
          </geometry>
        </collision>
        <visual name="visual">
          <geometry>
            <box>
              <size>0.8 0.8 1.0</size>
            </box>
          </geometry>
          <material>
            <ambient>0.8 0.4 0.0 1</ambient>
            <diffuse>0.8 0.4 0.0 1</diffuse>
          </material>
        </visual>
      </link>
    </model>

    <model name="obstacle_2">
      <pose>-2 -2 0.3 0 0 0</pose>
      <link name="link">
        <inertial>
          <mass>3.0</mass>
          <inertia>
            <ixx>0.18</ixx>
            <ixy>0.0</ixy>
            <ixz>0.0</ixz>
            <iyy>0.18</iyy>
            <iyz>0.0</iyz>
            <izz>0.36</izz>
          </inertia>
        </inertial>
        <collision name="collision">
          <geometry>
            <cylinder>
              <radius>0.5</radius>
              <length>0.6</length>
            </cylinder>
          </geometry>
        </collision>
        <visual name="visual">
          <geometry>
            <cylinder>
              <radius>0.5</radius>
              <length>0.6</length>
            </cylinder>
          </geometry>
          <material>
            <ambient>0.0 0.4 0.8 1</ambient>
            <diffuse>0.0 0.4 0.8 1</diffuse>
          </material>
        </visual>
      </link>
    </model>

  </world>
</sdf>
```

### Phase 2: Robot Model with Sensor

#### 2.1 Create a Simple Robot Model

Create a simple robot model at `static/code/module-2/sdf_examples/capstone_robot.sdf`:

```xml
<?xml version="1.0" ?>
<sdf version="1.7">
  <model name="simple_robot">
    <pose>0 0 0.5 0 0 0</pose>

    <!-- Chassis -->
    <link name="chassis">
      <inertial>
        <mass>10.0</mass>
        <inertia>
          <ixx>1.0</ixx>
          <ixy>0.0</ixy>
          <ixz>0.0</ixz>
          <iyy>1.0</iyy>
          <iyz>0.0</iyz>
          <izz>1.0</izz>
        </inertia>
      </inertial>

      <collision name="collision">
        <geometry>
          <box>
            <size>0.5 0.5 0.3</size>
          </box>
        </geometry>
      </collision>

      <visual name="visual">
        <geometry>
          <box>
            <size>0.5 0.5 0.3</size>
          </box>
        </geometry>
        <material>
          <ambient>0.0 0.8 0.0 1</ambient>
          <diffuse>0.0 0.8 0.0 1</diffuse>
        </material>
      </visual>
    </link>

    <!-- Left wheel -->
    <link name="left_wheel">
      <inertial>
        <mass>1.0</mass>
        <inertia>
          <ixx>0.01</ixx>
          <ixy>0.0</ixy>
          <ixz>0.0</ixz>
          <iyy>0.01</iyy>
          <iyz>0.0</iyz>
          <izz>0.02</izz>
        </inertia>
      </inertial>

      <collision name="collision">
        <geometry>
          <cylinder>
            <radius>0.15</radius>
            <length>0.05</length>
          </cylinder>
        </geometry>
      </collision>

      <visual name="visual">
        <geometry>
          <cylinder>
            <radius>0.15</radius>
            <length>0.05</length>
          </cylinder>
        </geometry>
        <material>
          <ambient>0.3 0.3 0.3 1</ambient>
          <diffuse>0.3 0.3 0.3 1</diffuse>
        </material>
      </visual>
    </link>

    <!-- Right wheel -->
    <link name="right_wheel">
      <inertial>
        <mass>1.0</mass>
        <inertia>
          <ixx>0.01</ixx>
          <ixy>0.0</ixy>
          <ixz>0.0</ixz>
          <iyy>0.01</iyy>
          <iyz>0.0</iyz>
          <izz>0.02</izz>
        </inertia>
      </inertial>

      <collision name="collision">
        <geometry>
          <cylinder>
            <radius>0.15</radius>
            <length>0.05</length>
          </cylinder>
        </geometry>
      </collision>

      <visual name="visual">
        <geometry>
          <cylinder>
            <radius>0.15</radius>
            <length>0.05</length>
          </cylinder>
        </geometry>
        <material>
          <ambient>0.3 0.3 0.3 1</ambient>
          <diffuse>0.3 0.3 0.3 1</diffuse>
        </material>
      </visual>
    </link>

    <!-- LiDAR sensor -->
    <sensor name="lidar_sensor" type="ray">
      <pose>0 0 0.2 0 0 0</pose>
      <ray>
        <scan>
          <horizontal>
            <samples>360</samples>
            <resolution>1</resolution>
            <min_angle>-3.14159</min_angle>
            <max_angle>3.14159</max_angle>
          </horizontal>
        </scan>
        <range>
          <min>0.1</min>
          <max>10.0</max>
          <resolution>0.01</resolution>
        </range>
      </ray>
      <plugin name="lidar_controller" filename="libRayPlugin.so">
        <alwaysOn>true</alwaysOn>
        <updateRate>10</updateRate>
        <topic>laser_scan</topic>
        <frameName>lidar_frame</frameName>
      </plugin>
      <noise>
        <type>gaussian</type>
        <mean>0.0</mean>
        <stddev>0.01</stddev>
      </noise>
    </sensor>

    <!-- Joints connecting wheels to chassis -->
    <joint name="left_wheel_hinge" type="revolute">
      <parent>chassis</parent>
      <child>left_wheel</child>
      <pose>-0.25 0.25 -0.15 0 0 0</pose>
      <axis>
        <xyz>0 0 1</xyz>
      </axis>
    </joint>

    <joint name="right_wheel_hinge" type="revolute">
      <parent>chassis</parent>
      <child>right_wheel</child>
      <pose>-0.25 -0.25 -0.15 0 0 0</pose>
      <axis>
        <xyz>0 0 1</xyz>
      </axis>
    </joint>

  </model>
</sdf>
```

### Phase 3: Combined World File

#### 3.1 Create the Complete World File

Create a combined world file at `static/code/module-2/sdf_examples/capstone_world.sdf`:

```xml
<?xml version="1.0" ?>
<sdf version="1.7">
  <world name="capstone_world">
    <!-- Physics configuration -->
    <physics name="ode" default="0" type="ode">
      <max_step_size>0.001</max_step_size>
      <real_time_factor>1</real_time_factor>
      <real_time_update_rate>1000</real_time_update_rate>
    </physics>

    <!-- Lighting -->
    <light name="sun" type="directional">
      <cast_shadows>true</cast_shadows>
      <pose>0 0 10 0 0 0</pose>
      <diffuse>0.8 0.8 0.8 1</diffuse>
      <specular>0.2 0.2 0.2 1</specular>
      <attenuation>
        <range>1000</range>
        <constant>0.9</constant>
        <linear>0.01</linear>
        <quadratic>0.001</quadratic>
      </attenuation>
      <direction>-0.6 0.4 -0.8</direction>
    </light>

    <!-- Ground plane -->
    <model name="ground_plane">
      <static>true</static>
      <link name="link">
        <collision name="collision">
          <geometry>
            <plane>
              <normal>0 0 1</normal>
              <size>10 10</size>
            </plane>
          </geometry>
        </collision>
        <visual name="visual">
          <geometry>
            <plane>
              <normal>0 0 1</normal>
              <size>10 10</size>
            </plane>
          </geometry>
          <material>
            <ambient>0.7 0.7 0.7 1</ambient>
            <diffuse>0.7 0.7 0.7 1</diffuse>
          </material>
        </visual>
      </link>
    </model>

    <!-- Room walls -->
    <!-- North wall -->
    <model name="north_wall">
      <pose>0 4.9 1.5 0 0 0</pose>
      <static>true</static>
      <link name="link">
        <collision name="collision">
          <geometry>
            <box>
              <size>10 0.2 3</size>
            </box>
          </geometry>
        </collision>
        <visual name="visual">
          <geometry>
            <box>
              <size>10 0.2 3</size>
            </box>
          </geometry>
          <material>
            <ambient>0.8 0.8 0.8 1</ambient>
            <diffuse>0.8 0.8 0.8 1</diffuse>
          </material>
        </visual>
      </link>
    </model>

    <!-- South wall -->
    <model name="south_wall">
      <pose>0 -4.9 1.5 0 0 0</pose>
      <static>true</static>
      <link name="link">
        <collision name="collision">
          <geometry>
            <box>
              <size>10 0.2 3</size>
            </box>
          </geometry>
        </collision>
        <visual name="visual">
          <geometry>
            <box>
              <size>10 0.2 3</size>
            </box>
          </geometry>
          <material>
            <ambient>0.8 0.8 0.8 1</ambient>
            <diffuse>0.8 0.8 0.8 1</diffuse>
          </material>
        </visual>
      </link>
    </model>

    <!-- East wall -->
    <model name="east_wall">
      <pose>4.9 0 1.5 0 0 0</pose>
      <static>true</static>
      <link name="link">
        <collision name="collision">
          <geometry>
            <box>
              <size>0.2 10 3</size>
            </box>
          </geometry>
        </collision>
        <visual name="visual">
          <geometry>
            <box>
              <size>0.2 10 3</size>
            </box>
          </geometry>
          <material>
            <ambient>0.8 0.8 0.8 1</ambient>
            <diffuse>0.8 0.8 0.8 1</diffuse>
          </material>
        </visual>
      </link>
    </model>

    <!-- West wall -->
    <model name="west_wall">
      <pose>-4.9 0 1.5 0 0 0</pose>
      <static>true</static>
      <link name="link">
        <collision name="collision">
          <geometry>
            <box>
              <size>0.2 10 3</size>
            </box>
          </geometry>
        </collision>
        <visual name="visual">
          <geometry>
            <box>
              <size>0.2 10 3</size>
            </box>
          </geometry>
          <material>
            <ambient>0.8 0.8 0.8 1</ambient>
            <diffuse>0.8 0.8 0.8 1</diffuse>
          </material>
        </visual>
      </link>
    </model>

    <!-- Two obstacles in the room -->
    <model name="obstacle_1">
      <pose>2 1 0.5 0 0 0</pose>
      <link name="link">
        <inertial>
          <mass>5.0</mass>
          <inertia>
            <ixx>0.4167</ixx>
            <ixy>0.0</ixy>
            <ixz>0.0</ixz>
            <iyy>0.4167</iyy>
            <iyz>0.0</iyz>
            <izz>0.8333</izz>
          </inertia>
        </inertial>
        <collision name="collision">
          <geometry>
            <box>
              <size>0.8 0.8 1.0</size>
            </box>
          </geometry>
        </collision>
        <visual name="visual">
          <geometry>
            <box>
              <size>0.8 0.8 1.0</size>
            </box>
          </geometry>
          <material>
            <ambient>0.8 0.4 0.0 1</ambient>
            <diffuse>0.8 0.4 0.0 1</diffuse>
          </material>
        </visual>
      </link>
    </model>

    <model name="obstacle_2">
      <pose>-2 -2 0.3 0 0 0</pose>
      <link name="link">
        <inertial>
          <mass>3.0</mass>
          <inertia>
            <ixx>0.18</ixx>
            <ixy>0.0</ixy>
            <ixz>0.0</ixz>
            <iyy>0.18</iyy>
            <iyz>0.0</iyz>
            <izz>0.36</izz>
          </inertia>
        </inertial>
        <collision name="collision">
          <geometry>
            <cylinder>
              <radius>0.5</radius>
              <length>0.6</length>
            </cylinder>
          </geometry>
        </collision>
        <visual name="visual">
          <geometry>
            <cylinder>
              <radius>0.5</radius>
              <length>0.6</length>
            </cylinder>
          </geometry>
          <material>
            <ambient>0.0 0.4 0.8 1</ambient>
            <diffuse>0.0 0.4 0.8 1</diffuse>
          </material>
        </visual>
      </link>
    </model>

    <!-- Simple robot with LiDAR -->
    <include>
      <uri>model://simple_robot</uri>
      <pose>0 0 0.5 0 0 0</pose>
    </include>

  </world>
</sdf>
```

### Phase 4: Simple AI Behavior Implementation

#### 4.1 Create a Basic Control Script

Create a simple control script in Python that demonstrates the AI perception-action loop:

```python
#!/usr/bin/env python3
"""
Simple AI control script for the capstone digital twin project.
This script demonstrates the perception-action loop with obstacle avoidance.
"""

import rospy
from sensor_msgs.msg import LaserScan
from geometry_msgs.msg import Twist
import numpy as np

class SimpleObstacleAvoider:
    def __init__(self):
        # Initialize ROS node
        rospy.init_node('simple_obstacle_avoider', anonymous=True)

        # Publishers and subscribers
        self.cmd_vel_pub = rospy.Publisher('/cmd_vel', Twist, queue_size=10)
        self.laser_sub = rospy.Subscriber('/laser_scan', LaserScan, self.laser_callback)

        # Robot state
        self.laser_data = None
        self.rate = rospy.Rate(10)  # 10 Hz

        # Control parameters
        self.safe_distance = 1.0  # meters
        self.forward_speed = 0.5  # m/s
        self.rotation_speed = 0.5  # rad/s

    def laser_callback(self, msg):
        """Process incoming laser scan data"""
        self.laser_data = msg

    def get_min_distance(self, angle_range=(-30, 30)):
        """Get minimum distance in a specific angular range (degrees)"""
        if self.laser_data is None:
            return float('inf')

        # Convert angle range to radians
        min_angle_idx = int((np.radians(angle_range[0]) - self.laser_data.angle_min) / self.laser_data.angle_increment)
        max_angle_idx = int((np.radians(angle_range[1]) - self.laser_data.angle_min) / self.laser_data.angle_increment)

        # Ensure indices are within bounds
        min_angle_idx = max(0, min_angle_idx)
        max_angle_idx = min(len(self.laser_data.ranges), max_angle_idx)

        # Get range values in the specified sector
        sector_ranges = self.laser_data.ranges[min_angle_idx:max_angle_idx]
        valid_ranges = [r for r in sector_ranges if not (r < self.laser_data.range_min or r > self.laser_data.range_max)]

        return min(valid_ranges) if valid_ranges else float('inf')

    def get_side_distances(self):
        """Get distances to obstacles on left and right sides"""
        if self.laser_data is None:
            return float('inf'), float('inf')

        # Left side (30 to 90 degrees)
        left_min_idx = int((np.radians(30) - self.laser_data.angle_min) / self.laser_data.angle_increment)
        left_max_idx = int((np.radians(90) - self.laser_data.angle_min) / self.laser_data.angle_increment)
        left_min_idx = max(0, left_min_idx)
        left_max_idx = min(len(self.laser_data.ranges), left_max_idx)
        left_sector = self.laser_data.ranges[left_min_idx:left_max_idx]
        left_valid = [r for r in left_sector if not (r < self.laser_data.range_min or r > self.laser_data.range_max)]
        left_dist = min(left_valid) if left_valid else float('inf')

        # Right side (-90 to -30 degrees)
        right_min_idx = int((np.radians(-90) - self.laser_data.angle_min) / self.laser_data.angle_increment)
        right_max_idx = int((np.radians(-30) - self.laser_data.angle_min) / self.laser_data.angle_increment)
        right_min_idx = max(0, right_min_idx)
        right_max_idx = min(len(self.laser_data.ranges), right_max_idx)
        right_sector = self.laser_data.ranges[right_min_idx:right_max_idx]
        right_valid = [r for r in right_sector if not (r < self.laser_data.range_min or r > self.laser_data.range_max)]
        right_dist = min(right_valid) if right_valid else float('inf')

        return left_dist, right_dist

    def run(self):
        """Main control loop"""
        print("Starting simple obstacle avoidance...")

        while not rospy.is_shutdown():
            if self.laser_data is None:
                print("Waiting for laser data...")
                self.rate.sleep()
                continue

            # Get distance to obstacles directly ahead
            front_dist = self.get_min_distance((-30, 30))
            left_dist, right_dist = self.get_side_distances()

            # Create twist message
            cmd_vel = Twist()

            # Simple obstacle avoidance logic
            if front_dist < self.safe_distance:
                # Obstacle detected ahead - turn away
                if left_dist > right_dist:
                    # Turn left
                    cmd_vel.linear.x = 0.0
                    cmd_vel.angular.z = self.rotation_speed
                else:
                    # Turn right
                    cmd_vel.linear.x = 0.0
                    cmd_vel.angular.z = -self.rotation_speed
            else:
                # No obstacles ahead - move forward
                cmd_vel.linear.x = self.forward_speed
                cmd_vel.angular.z = 0.0

            # Publish command
            self.cmd_vel_pub.publish(cmd_vel)

            # Print status
            print(f"Front: {front_dist:.2f}m, Left: {left_dist:.2f}m, Right: {right_dist:.2f}m")

            self.rate.sleep()

if __name__ == '__main__':
    try:
        controller = SimpleObstacleAvoider()
        controller.run()
    except rospy.ROSInterruptException:
        pass
```

### Phase 5: Unity Visualization Setup

#### 5.1 Unity Import Configuration

For Unity visualization of your digital twin:

1. **Prepare the Robot Model**:
   - Export your robot from Gazebo as an SDF file
   - Convert to a supported 3D format (FBX, COLLADA, OBJ)
   - Ensure proper scaling (Gazebo typically uses meters)

2. **Import to Unity**:
   - Use Unity's URDF Importer package or import manually
   - Set up materials and lighting to match your simulation
   - Create a simple scene with the environment

3. **Camera Setup**:
   - Position cameras for optimal viewing
   - Add post-processing effects for enhanced visualization
   - Create multiple viewpoints for different perspectives

### Phase 6: Testing and Validation

#### 6.1 Simulation Testing

1. **Launch the simulation**:
   ```bash
   gz sim -r capstone_world.sdf
   ```

2. **Verify components**:
   - Robot appears in the environment
   - LiDAR sensor publishes data
   - Robot responds to control commands
   - Physics behave realistically

3. **Run the AI controller**:
   - Execute the simple obstacle avoidance script
   - Observe the robot's behavior
   - Verify it avoids obstacles effectively

#### 6.2 Validation Criteria

Your digital twin is working if:

- [ ] The robot successfully navigates the environment
- [ ] LiDAR sensor provides accurate distance measurements
- [ ] AI controller responds appropriately to sensor data
- [ ] Robot avoids obstacles and continues moving
- [ ] Simulation runs smoothly in real-time
- [ ] Unity visualization accurately represents the robot

## Expected Outcomes

Upon successful completion of this project, you will have:

1. **Integrated Environment**: A complete simulation environment with walls, obstacles, and proper physics
2. **Robot Model**: A simple robot with a functional LiDAR sensor
3. **AI Behavior**: Basic obstacle avoidance implemented through the perception-action loop
4. **Working System**: A digital twin that demonstrates realistic robot behavior
5. **Validation**: Confirmation that all components work together effectively

## Troubleshooting

### Common Issues and Solutions

- **Robot not moving**: Check joint configurations and actuator control
- **LiDAR not publishing**: Verify sensor configuration and plugin loading
- **Physics instability**: Adjust physics parameters and mass properties
- **Controller not responding**: Check ROS topic names and communication
- **Visualization issues**: Verify Unity import settings and coordinate systems

### Debugging Tips

1. **Check Topics**: Use `rostopic list` to verify available topics
2. **Monitor Data**: Use `rostopic echo` to view sensor data
3. **Visualize**: Use rviz or gazebo visualization tools
4. **Log**: Add debug output to your control scripts

## Extension Ideas

Once you've completed the basic project, consider extending it with:

- **Advanced Navigation**: Implement path planning algorithms
- **Multiple Sensors**: Add cameras or IMU for richer perception
- **Complex Behaviors**: Create more sophisticated AI behaviors
- **Unity Integration**: Connect Unity visualization to real-time simulation
- **Performance Metrics**: Add measurement and logging capabilities

## Summary

This capstone project demonstrates the integration of all concepts covered in this module. By building a complete digital twin system with environment, robot, sensors, and AI control, you've validated your understanding of the digital twin simulation pipeline. The project serves as a foundation for more complex robotic systems and validates the effectiveness of simulation-based development approaches.