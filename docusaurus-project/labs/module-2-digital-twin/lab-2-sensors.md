---
sidebar_position: 2
title: Lab 2 - Add Sensors to the Digital Twin
---

# Lab 2 - Add Sensors to the Digital Twin

## Objective

In this lab, you will add LiDAR and IMU sensors to your robot model and visualize the sensor data output. You will learn how to configure sensors in SDF, understand sensor noise models, and interpret sensor data in the context of a digital twin system.

## Prerequisites

- Completed Lab 1 (Gazebo World Building)
- Understanding of SDF format and robot modeling
- Basic knowledge of sensor types and their applications in robotics
- Gazebo installed and operational

## Duration

Estimated time: 60-75 minutes

## Tools Required

- Gazebo simulation environment
- Text editor for creating SDF files
- Terminal/command prompt
- Optional: ROS/RQt tools for sensor data visualization

## Step-by-Step Instructions

### Step 1: Create a Robot Model with Sensors

1. Create a new directory for this lab:
   ```bash
   mkdir -p ~/gazebo_lab/sensors
   cd ~/gazebo_lab/sensors
   ```

2. Create a robot model file named `sensor_robot.sdf`:
   ```bash
   touch sensor_robot.sdf
   ```

3. Add the basic robot structure with chassis and wheels:
   ```xml
   <?xml version="1.0" ?>
   <sdf version="1.7">
     <model name="sensor_robot">
       <pose>0 0 0.5 0 0 0</pose>

       <!-- Robot chassis -->
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
               <size>0.8 0.6 0.3</size>
             </box>
           </geometry>
         </collision>

         <visual name="visual">
           <geometry>
             <box>
               <size>0.8 0.6 0.3</size>
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

       <!-- Joints connecting wheels to chassis -->
       <joint name="left_wheel_hinge" type="continuous">
         <parent>chassis</parent>
         <child>left_wheel</child>
         <pose>-0.3 0.25 -0.15 0 0 0</pose>
         <axis>
           <xyz>0 0 1</xyz>
         </axis>
       </joint>

       <joint name="right_wheel_hinge" type="continuous">
         <parent>chassis</parent>
         <child>right_wheel</child>
         <pose>-0.3 -0.25 -0.15 0 0 0</pose>
         <axis>
           <xyz>0 0 1</xyz>
         </axis>
       </joint>

     </model>
   </sdf>
   ```

### Step 2: Add LiDAR Sensor

1. Add a LiDAR sensor to the robot chassis. Insert this code inside the `<model>` tag after the joint definitions:

   ```xml
   <!-- LiDAR Sensor -->
   <sensor name="lidar_sensor" type="ray">
     <pose>0.3 0 0.15 0 0 0</pose>
     <ray>
       <scan>
         <horizontal>
           <samples>360</samples>
           <resolution>1</resolution>
           <min_angle>-3.14159</min_angle>  <!-- -π radians -->
           <max_angle>3.14159</max_angle>    <!-- π radians -->
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
     <visualize>true</visualize>
     <always_on>true</always_on>
     <update_rate>10</update_rate>
     <noise>
       <type>gaussian</type>
       <mean>0.0</mean>
       <stddev>0.01</stddev>
     </noise>
   </sensor>
   ```

### Step 3: Add IMU Sensor

1. Add an IMU sensor to the robot chassis. Insert this code after the LiDAR sensor definition:

   ```xml
   <!-- IMU Sensor -->
   <sensor name="imu_sensor" type="imu">
     <pose>0 0 0.1 0 0 0</pose>
     <imu>
       <angular_velocity>
         <x>
           <noise type="gaussian">
             <mean>0.0</mean>
             <stddev>2e-4</stddev>
             <bias_mean>0.0000075</bias_mean>
             <bias_stddev>0.0000008</bias_stddev>
           </noise>
         </x>
         <y>
           <noise type="gaussian">
             <mean>0.0</mean>
             <stddev>2e-4</stddev>
             <bias_mean>0.0000075</bias_mean>
             <bias_stddev>0.0000008</bias_stddev>
           </noise>
         </y>
         <z>
           <noise type="gaussian">
             <mean>0.0</mean>
             <stddev>2e-4</stddev>
             <bias_mean>0.0000075</bias_mean>
             <bias_stddev>0.0000008</bias_stddev>
           </noise>
         </z>
       </angular_velocity>
       <linear_acceleration>
         <x>
           <noise type="gaussian">
             <mean>0.0</mean>
             <stddev>1.7e-2</stddev>
             <bias_mean>0.1</bias_mean>
             <bias_stddev>0.001</bias_stddev>
           </noise>
         </x>
         <y>
           <noise type="gaussian">
             <mean>0.0</mean>
             <stddev>1.7e-2</stddev>
             <bias_mean>0.1</bias_mean>
             <bias_stddev>0.001</bias_stddev>
           </noise>
         </y>
         <z>
           <noise type="gaussian">
             <mean>0.0</mean>
             <stddev>1.7e-2</stddev>
             <bias_mean>0.1</bias_mean>
             <bias_stddev>0.001</bias_stddev>
           </noise>
         </z>
       </linear_acceleration>
     </imu>
     <plugin name="imu_controller" filename="libImuPlugin.so">
       <alwaysOn>true</alwaysOn>
       <updateRate>100</updateRate>
       <topic>imu_data</topic>
       <bodyName>chassis</bodyName>
       <frameName>imu_frame</frameName>
     </plugin>
     <visualize>false</visualize>
     <always_on>true</always_on>
     <update_rate>100</update_rate>
   </sensor>
   ```

### Step 4: Create a World File with the Sensor Robot

1. Create a world file named `sensor_world.world`:

   ```xml
   <?xml version="1.0" ?>
   <sdf version="1.7">
     <world name="sensor_world">
       <!-- Physics configuration -->
       <physics name="ode" default="0" type="ode">
         <max_step_size>0.001</max_step_size>
         <real_time_factor>1</real_time_factor>
       </physics>

       <!-- Lighting -->
       <light name="sun" type="directional">
         <cast_shadows>true</cast_shadows>
         <pose>0 0 10 0 0 0</pose>
         <diffuse>0.8 0.8 0.8 1</diffuse>
         <specular>0.2 0.2 0.2 1</specular>
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
                 <size>20 20</size>
               </plane>
             </geometry>
           </collision>
           <visual name="visual">
             <geometry>
               <plane>
                 <normal>0 0 1</normal>
                 <size>20 20</size>
               </plane>
             </geometry>
             <material>
               <ambient>0.7 0.7 0.7 1</ambient>
               <diffuse>0.7 0.7 0.7 1</diffuse>
             </material>
           </visual>
         </link>
       </model>

       <!-- Several objects for the LiDAR to detect -->
       <model name="wall_1">
         <pose>5 0 1 0 0 0</pose>
         <static>true</static>
         <link name="link">
           <collision name="collision">
             <geometry>
               <box>
                 <size>0.1 10 2</size>
               </box>
             </geometry>
           </collision>
           <visual name="visual">
             <geometry>
               <box>
                 <size>0.1 10 2</size>
               </box>
             </geometry>
             <material>
               <ambient>0.8 0.8 0.8 1</ambient>
               <diffuse>0.8 0.8 0.8 1</diffuse>
             </material>
           </visual>
         </link>
       </model>

       <model name="box_obstacle">
         <pose>3 3 0.5 0 0 0</pose>
         <static>true</static>
         <link name="link">
           <collision name="collision">
             <geometry>
               <box>
                 <size>1 1 1</size>
               </box>
             </geometry>
           </collision>
           <visual name="visual">
             <geometry>
               <box>
                 <size>1 1 1</size>
               </box>
             </geometry>
             <material>
               <ambient>0.8 0.4 0.0 1</ambient>
               <diffuse>0.8 0.4 0.0 1</diffuse>
             </material>
           </visual>
         </link>
       </model>

       <!-- Include the sensor robot -->
       <include>
         <uri>file://$(find gazebo_lab)/sensors/sensor_robot.sdf</uri>
         <pose>0 0 0 0 0 0</pose>
       </include>

     </world>
   </sdf>
   ```

### Step 5: Test the LiDAR Sensor

1. Launch the simulation with your sensor-equipped robot:
   ```bash
   gz sim -r sensor_world.world
   ```

2. Once the simulation is running, you should see:
   - The robot with LiDAR sensor mounted on top
   - LiDAR visualization showing laser rays when selected
   - The IMU sensor (though not visually represented)

3. To visualize the LiDAR data in real-time:
   - In the Gazebo GUI, click on the LiDAR sensor in the model tree
   - The laser rays should be visible as a scanning pattern
   - Move the robot or objects in the environment to see how the LiDAR readings change

### Step 6: Visualize Sensor Data (Optional with ROS)

If you have ROS installed alongside Gazebo:

1. Run the simulation in a separate terminal:
   ```bash
   gz sim -r sensor_world.world
   ```

2. In another terminal, use ROS tools to visualize the sensor data:
   ```bash
   # Install visualization tools if needed
   sudo apt-get install ros-noetic-rqt ros-noetic-rviz ros-noetic-laser-pipeline

   # Run rqt to see topics
   rqt

   # Or use rostopic to see the data directly
   rostopic echo /laser_scan
   rostopic echo /imu_data
   ```

### Step 7: Add Depth Camera (Optional Extension)

For a more comprehensive sensor setup, you can add a depth camera. Add this to your robot model:

```xml
<!-- Depth Camera (RGB-D) -->
<sensor name="depth_camera" type="depth">
  <pose>0.4 0 0.2 0 0 0</pose>
  <camera>
    <horizontal_fov>1.047</horizontal_fov>  <!-- 60 degrees in radians -->
    <image>
      <width>640</width>
      <height>480</height>
      <format>R8G8B8</format>
    </image>
    <clip>
      <near>0.1</near>
      <far>10.0</far>
    </clip>
    <noise>
      <type>gaussian</type>
      <mean>0.0</mean>
      <stddev>0.007</stddev>
    </noise>
  </camera>
  <always_on>true</always_on>
  <update_rate>30</update_rate>
  <visualize>true</visualize>
  <plugin name="camera_controller" filename="libDepthCameraPlugin.so">
    <alwaysOn>true</alwaysOn>
    <updateRate>30</updateRate>
    <cameraName>depth_camera</cameraName>
    <imageTopicName>rgb/image_raw</imageTopicName>
    <depthImageTopicName>depth/image_raw</depthImageTopicName>
    <pointCloudTopicName>depth/points</pointCloudTopicName>
    <cameraInfoTopicName>rgb/camera_info</cameraInfoTopicName>
    <frameName>depth_camera_frame</frameName>
  </plugin>
</sensor>
```

### Step 8: Understanding Sensor Noise Models

1. **Gaussian Noise**: The most common model, representing random variations in measurements
   - `mean`: Average offset from true value
   - `stddev`: Standard deviation of the noise
   - `bias_mean`: Long-term drift
   - `bias_stddev`: Variability of the drift

2. **LiDAR Noise**: Affects distance measurements
   - Typically increases with distance
   - Influenced by surface reflectivity
   - Angular resolution affects precision

3. **IMU Noise**: Affects acceleration and angular velocity measurements
   - Bias: Long-term drift in measurements
   - Random walk: Accumulating errors over time
   - Varies by sensor quality and cost

## Expected Output

When you run the simulation, you should observe:
- A robot equipped with LiDAR and IMU sensors
- LiDAR laser rays scanning the environment and detecting obstacles
- IMU data being generated (visible through ROS topics or other interfaces)
- Proper visualization of sensor data in the Gazebo GUI
- Accurate detection of the wall and box obstacles by the LiDAR

## Verification Checklist

- [ ] Robot model loads successfully with both LiDAR and IMU sensors
- [ ] LiDAR sensor generates scan data that detects environmental obstacles
- [ ] IMU sensor publishes orientation and acceleration data
- [ ] Sensor data appears realistic with appropriate noise characteristics
- [ ] Simulation runs smoothly with sensor updates
- [ ] LiDAR visualization shows scanning pattern when selected
- [ ] Sensor topics are available for external tools (if using ROS)

## Troubleshooting

### Common Issues and Solutions

**Problem**: LiDAR sensor not publishing data
- **Solution**: Check that the plugin is properly named and loaded, verify topic names, ensure the sensor is positioned correctly

**Problem**: IMU readings are erratic
- **Solution**: Verify the noise parameters are realistic, check that the sensor is properly attached to a link with physics properties

**Problem**: Simulation runs slowly with sensors enabled
- **Solution**: Reduce update rates for sensors that don't need high frequency, or decrease the number of LiDAR samples

**Problem**: Sensor data doesn't update in real-time
- **Solution**: Check update rates and ensure the physics engine is running at appropriate speeds

**Problem**: Sensor plugins fail to load
- **Solution**: Verify plugin filenames are correct for your Gazebo version, check that required libraries are installed

**Problem**: LiDAR doesn't detect nearby objects
- **Solution**: Check the minimum range setting, ensure objects are within the LiDAR's field of view, verify collision properties of objects

## Extensions

After completing this lab, try these extensions:
- Add a camera sensor and visualize the RGB output
- Create a simple navigation scenario where the robot uses LiDAR data to avoid obstacles
- Experiment with different noise parameters to see how they affect sensor performance
- Implement a basic SLAM algorithm using the LiDAR data

## Summary

In this lab, you successfully integrated multiple sensor types into a robot model for your digital twin system. You learned how to configure LiDAR and IMU sensors in SDF, understood the importance of noise modeling, and verified that the sensors produce realistic data. This sensor integration is crucial for creating accurate digital twins that can perceive their environment like real robots do.