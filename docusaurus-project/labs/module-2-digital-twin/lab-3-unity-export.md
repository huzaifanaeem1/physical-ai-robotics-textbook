---
sidebar_position: 3
title: Lab 3 - Export Robot → Unity Visual Twin
---

# Lab 3 - Export Robot → Unity Visual Twin

## Objective

In this lab, you will learn how to export a robot model from Gazebo/SDF format to Unity for high-fidelity visualization. You will import the robot into Unity, apply materials and lighting, place it in a scene, and render a camera preview to showcase your digital twin.

## Prerequisites

- Completed Lab 1 and Lab 2 (Gazebo World and Sensor Integration)
- Unity 2022.3 LTS installed
- Basic understanding of 3D modeling and Unity interface
- Robot model with sensors from previous labs
- URDF Importer package for Unity (optional but recommended)

## Duration

Estimated time: 75-90 minutes

## Tools Required

- Gazebo simulation environment
- Unity 2022.3 LTS or later
- Text editor for URDF/SDF files
- 3D modeling software (Blender, Maya, etc.) - optional
- Terminal/command prompt

## Step-by-Step Instructions

### Step 1: Prepare Robot Model for Export

1. Navigate to your sensor robot model file from Lab 2:
   ```bash
   cd ~/gazebo_lab/sensors
   ```

2. Make sure your `sensor_robot.sdf` file is complete with both LiDAR and IMU sensors

3. To facilitate Unity import, we'll need to convert the SDF to URDF format (Unity's URDF Importer works better with URDF). Create a URDF file named `sensor_robot.urdf`:

   ```xml
   <?xml version="1.0" ?>
   <robot name="sensor_robot">
     <!-- Robot chassis -->
     <link name="chassis">
       <inertial>
         <mass value="10.0"/>
         <origin xyz="0 0 0" rpy="0 0 0"/>
         <inertia ixx="1.0" ixy="0.0" ixz="0.0" iyy="1.0" iyz="0.0" izz="1.0"/>
       </inertial>

       <collision name="chassis_collision">
         <origin xyz="0 0 0" rpy="0 0 0"/>
         <geometry>
           <box size="0.8 0.6 0.3"/>
         </geometry>
       </collision>

       <visual name="chassis_visual">
         <origin xyz="0 0 0" rpy="0 0 0"/>
         <geometry>
           <box size="0.8 0.6 0.3"/>
         </geometry>
         <material name="green">
           <color rgba="0.0 0.8 0.0 1.0"/>
         </material>
       </visual>
     </link>

     <!-- Left wheel -->
     <link name="left_wheel">
       <inertial>
         <mass value="1.0"/>
         <origin xyz="0 0 0" rpy="0 0 0"/>
         <inertia ixx="0.01" ixy="0.0" ixz="0.0" iyy="0.01" iyz="0.0" izz="0.02"/>
       </inertial>

       <collision name="left_wheel_collision">
         <origin xyz="0 0 0" rpy="0 0 0"/>
         <geometry>
           <cylinder radius="0.15" length="0.05"/>
         </geometry>
       </collision>

       <visual name="left_wheel_visual">
         <origin xyz="0 0 0" rpy="0 0 0"/>
         <geometry>
           <cylinder radius="0.15" length="0.05"/>
         </geometry>
         <material name="dark_gray">
           <color rgba="0.3 0.3 0.3 1.0"/>
         </material>
       </visual>
     </link>

     <!-- Right wheel -->
     <link name="right_wheel">
       <inertial>
         <mass value="1.0"/>
         <origin xyz="0 0 0" rpy="0 0 0"/>
         <inertia ixx="0.01" ixy="0.0" ixz="0.0" iyy="0.01" iyz="0.0" izz="0.02"/>
       </inertial>

       <collision name="right_wheel_collision">
         <origin xyz="0 0 0" rpy="0 0 0"/>
         <geometry>
           <cylinder radius="0.15" length="0.05"/>
         </geometry>
       </collision>

       <visual name="right_wheel_visual">
         <origin xyz="0 0 0" rpy="0 0 0"/>
         <geometry>
           <cylinder radius="0.15" length="0.05"/>
         </geometry>
         <material name="dark_gray">
           <color rgba="0.3 0.3 0.3 1.0"/>
         </material>
       </visual>
     </link>

     <!-- Joints -->
     <joint name="left_wheel_hinge" type="continuous">
       <parent link="chassis"/>
       <child link="left_wheel"/>
       <origin xyz="-0.3 0.25 -0.15" rpy="0 0 0"/>
       <axis xyz="0 0 1"/>
     </joint>

     <joint name="right_wheel_hinge" type="continuous">
       <parent link="chassis"/>
       <child link="right_wheel"/>
       <origin xyz="-0.3 -0.25 -0.15" rpy="0 0 0"/>
       <axis xyz="0 0 1"/>
     </joint>

     <!-- LiDAR sensor link -->
     <link name="lidar_link">
       <inertial>
         <mass value="0.1"/>
         <origin xyz="0 0 0" rpy="0 0 0"/>
         <inertia ixx="0.0001" ixy="0.0" ixz="0.0" iyy="0.0001" iyz="0.0" izz="0.0001"/>
       </inertial>

       <collision name="lidar_collision">
         <origin xyz="0 0 0" rpy="0 0 0"/>
         <geometry>
           <cylinder radius="0.05" length="0.05"/>
         </geometry>
       </collision>

       <visual name="lidar_visual">
         <origin xyz="0 0 0" rpy="0 0 0"/>
         <geometry>
           <cylinder radius="0.05" length="0.05"/>
         </geometry>
         <material name="blue">
           <color rgba="0.0 0.0 1.0 1.0"/>
         </material>
       </visual>
     </link>

     <joint name="lidar_mount" type="fixed">
       <parent link="chassis"/>
       <child link="lidar_link"/>
       <origin xyz="0.3 0 0.15" rpy="0 0 0"/>
     </joint>

   </robot>
   ```

### Step 2: Export Robot Model to Compatible Format

Since Unity doesn't directly support SDF, we need to export our robot model in a compatible 3D format:

1. If you have access to mesh files for your robot components, gather them in a directory structure like this:
   ```
   robot_meshes/
   ├── chassis.dae
   ├── wheel.dae
   └── lidar.dae
   ```

2. If you don't have mesh files, you can create simple geometric representations:
   - For the chassis: a rectangular box (0.8×0.6×0.3 meters)
   - For wheels: cylinders (radius 0.15m, length 0.05m)
   - For LiDAR: small cylinder (radius 0.05m, length 0.05m)

3. Export or create these as COLLADA (.dae) or FBX files, which are well-supported by Unity

### Step 3: Set Up Unity Project

1. Open Unity Hub and create a new 3D project named "DigitalTwinVisualization"

2. Install the URDF Importer package (if not already installed):
   - In Unity, go to Window → Package Manager
   - Click the "+" button and select "Add package from git URL..."
   - Enter: `com.unity.robotics.urdf-importer`
   - Click "Add" to install

3. Alternatively, if the URDF Importer is not available, you can import the robot manually using the mesh files you created

### Step 4: Import Robot Using URDF Importer (Recommended)

1. With your Unity project open, go to GameObject → URDF Importer → Import URDF

2. Navigate to your `sensor_robot.urdf` file and select it

3. Configure the import settings:
   - **Coordinate Space**: Unity (Left-handed)
   - **Import Collision**: Checked
   - **Import Inertial**: Checked
   - **Import Visual**: Checked
   - **Scale Factor**: 1.0 (since we're using meters)

4. Click "Import" to bring your robot into the Unity scene

5. The robot should appear in your scene with proper joint structure and materials applied

### Step 5: Manual Import (Alternative Method)

If the URDF Importer is not available, you can manually import the robot:

1. Create a new Empty GameObject and name it "SensorRobot"

2. Import your mesh files by dragging them into the Assets folder

3. Create child GameObjects for each robot part:
   - Create "Chassis" child with the chassis mesh
   - Create "LeftWheel" child with the left wheel mesh
   - Create "RightWheel" child with the right wheel mesh
   - Create "LiDAR" child with the LiDAR mesh

4. Position each part according to the URDF specifications:
   - Chassis at (0, 0, 0)
   - LeftWheel at (-0.3, 0.25, -0.15)
   - RightWheel at (-0.3, -0.25, -0.15)
   - LiDAR at (0.3, 0, 0.15)

### Step 6: Apply Materials and Lighting

1. Create new materials for your robot components:
   - In Project window, right-click → Create → Material
   - Name materials: "ChassisGreen", "WheelGray", "LiDARBlue"

2. Configure the materials:
   - **ChassisGreen**: Albedo color (0.0, 0.8, 0.0, 1.0)
   - **WheelGray**: Albedo color (0.3, 0.3, 0.3, 1.0)
   - **LiDARBlue**: Albedo color (0.0, 0.0, 1.0, 1.0)

3. Apply materials to the respective mesh renderers in the robot hierarchy

4. Add lighting to your scene:
   - Create a Directional Light (GameObject → Light → Directional Light)
   - Position it to illuminate the robot well
   - Adjust intensity to around 1.0
   - Set rotation to (50, -30, 0) for good lighting angles

### Step 7: Create Scene Environment

1. Create a ground plane:
   - GameObject → 3D Object → Plane
   - Scale it to appropriate size (e.g., 20x20 units)
   - Apply a neutral gray material

2. Add environment objects to match your Gazebo simulation:
   - Create cubes or other primitives to represent obstacles
   - Position them similarly to your Gazebo world

3. Adjust the environment materials to complement the robot

### Step 8: Add Camera and Configure View

1. Add a Main Camera to your scene (if not already present)

2. Position the camera to get a good view of the robot:
   - Move camera to position (5, 3, -5) or similar
   - Rotate camera to look at the robot (try rotation (15, 45, 0))

3. Configure camera settings:
   - Field of View: 60
   - Clear Flags: Solid Color or Skybox
   - Background color: Light gray or sky blue

4. Create additional camera angles if desired:
   - Top-down view
   - Side view
   - Close-up of sensors

### Step 9: Fine-tune Materials and Appearance

1. Add specular highlights to make the robot look more realistic:
   - Select each material
   - Increase Metallic value to 0.2-0.4 for plastic/metallic appearance
   - Set Smoothness to 0.5-0.7 for a polished look

2. Add some environment reflection:
   - Create an Environment Reflection Probe (GameObject → Light → Reflection Probe)
   - Position it near the robot
   - Set to "Box" type and adjust size to encompass the scene

3. Fine-tune lighting:
   - Add a subtle ambient light
   - Adjust shadows for more realistic appearance
   - Consider adding a Point Light near the robot for additional illumination

### Step 10: Render Preview and Capture

1. In the Scene view, position the camera for the best view of your robot

2. Switch to the Game view to see the final rendered result

3. Take a screenshot of the rendered scene:
   - Press Alt+Cmd+Shift+4 (Mac) or Alt+PrtScrn (Windows) to capture
   - Or use Unity's screenshot tool: Edit → RenderDoc → Capture Current Frame (if RenderDoc is installed)

4. For higher quality renders:
   - Increase the resolution in Game view
   - Enable anti-aliasing in the camera settings
   - Use Post-Processing Stack for enhanced visual quality

### Step 11: Create a Simple Animation (Optional)

1. Create a simple animation to demonstrate the robot's functionality:
   - Select the robot root GameObject
   - Open Animation window (Window → Animation → Animation)
   - Create a new animation file named "RobotIdle"

2. Add a simple rotation animation to the wheels:
   - Select left_wheel and right_wheel
   - Record keyframes for rotation on the Z-axis
   - Create a continuous rotation animation

3. Play the animation to see the robot in action

### Step 12: Build and Export (Optional)

1. To share your Unity visualization:
   - File → Build Settings
   - Select your target platform (PC, Mac, Linux, WebGL, etc.)
   - Add open scenes
   - Click "Build" to create an executable

2. The exported application will contain your robot visualization

## Expected Output

When you complete this lab, you should have:
- A Unity scene with your robot model imported from Gazebo
- Properly applied materials matching the original robot colors
- Appropriate lighting and environment setup
- A camera positioned to show the robot effectively
- A rendered preview showing the robot in the Unity environment
- The ability to visualize the robot with high-fidelity graphics

## Verification Checklist

- [ ] Robot model successfully imported into Unity from URDF/SDF
- [ ] Robot joints and kinematic structure preserved in Unity
- [ ] Materials applied correctly to robot components
- [ ] Lighting properly configured to illuminate the robot
- [ ] Environment created to match the Gazebo simulation context
- [ ] Camera positioned to provide good view of the robot
- [ ] Rendered preview shows the robot clearly
- [ ] Robot appears in Unity with same proportions as Gazebo model
- [ ] Sensor components visible in Unity scene
- [ ] Scene runs smoothly with acceptable performance

## Troubleshooting

### Common Issues and Solutions

**Problem**: Robot appears too large or too small in Unity
- **Solution**: Check that the scale factor is correct (1 meter in Gazebo = 1 unit in Unity), adjust if needed

**Problem**: URDF Importer not available
- **Solution**: Manually import using the alternative method with mesh files and proper positioning

**Problem**: Robot joints not working correctly
- **Solution**: Verify that joint types and limits are properly imported, check coordinate system conversions

**Problem**: Materials not applying correctly
- **Solution**: Ensure mesh files have proper UV coordinates, manually assign materials if needed

**Problem**: Lighting appears wrong or too dark
- **Solution**: Adjust light intensities and positions, check that materials have proper metallic/smoothness values

**Problem**: Robot parts appear disconnected
- **Solution**: Verify that the hierarchy and positions match the original URDF/SDF specification

**Problem**: Performance is slow
- **Solution**: Reduce polygon count of meshes, simplify materials, reduce number of lights

## Extensions

After completing this lab, try these extensions:
- Add dynamic materials that change based on sensor data
- Create a complete scene matching your Gazebo simulation environment
- Implement basic robot movement in Unity synchronized with Gazebo
- Add post-processing effects for enhanced visual quality
- Create multiple camera angles for technical documentation

## Summary

In this lab, you successfully exported a robot model from Gazebo to Unity, creating a high-fidelity visual twin. You learned how to handle the format conversion, apply appropriate materials and lighting, and create an attractive visualization that complements your physics simulation in Gazebo. This combination of accurate physics simulation in Gazebo and high-quality visualization in Unity creates a comprehensive digital twin system for robotics development and presentation.