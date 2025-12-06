---
sidebar_position: 1
title: Lab 1 - Build a Gazebo World
---

# Lab 1 - Build a Gazebo World

## Objective

In this lab, you will create a basic Gazebo simulation world with a ground plane, lighting, and three objects. You will then simulate gravity and collision to observe how objects behave in the virtual environment.

## Prerequisites

- Basic understanding of SDF (Simulation Description Format)
- Gazebo installed and configured
- Text editor for creating SDF files
- Basic knowledge of 3D coordinate systems

## Duration

Estimated time: 45-60 minutes

## Tools Required

- Gazebo simulation environment
- Text editor (VS Code, Vim, Nano, etc.)
- Terminal/command prompt

## Step-by-Step Instructions

### Step 1: Create the Basic World Structure

1. Create a new directory for your lab files:
   ```bash
   mkdir -p ~/gazebo_lab/worlds
   cd ~/gazebo_lab/worlds
   ```

2. Create a new world file named `basic_lab.world`:
   ```bash
   touch basic_lab.world
   ```

3. Open the file in your preferred text editor and add the basic SDF structure:
   ```xml
   <?xml version="1.0" ?>
   <sdf version="1.7">
     <world name="basic_lab_world">
       <!-- World content will go here -->
     </world>
   </sdf>
   ```

### Step 2: Configure Physics Properties

1. Add gravity definition inside the `<world>` tag:
   ```xml
   <gravity>0 0 -9.8</gravity>
   ```

2. Add physics engine configuration:
   ```xml
   <physics name="ode_physics" default="true" type="ode">
     <max_step_size>0.001</max_step_size>
     <real_time_factor>1.0</real_time_factor>
     <real_time_update_rate>1000.0</real_time_update_rate>
     <ode>
       <solver>
         <type>quick</type>
         <iters>10</iters>
         <sor>1.3</sor>
       </solver>
       <constraints>
         <cfm>0.0</cfm>
         <erp>0.2</erp>
         <contact_max_correcting_vel>100.0</contact_max_correcting_vel>
         <contact_surface_layer>0.001</contact_surface_layer>
       </constraints>
     </ode>
   </physics>
   ```

### Step 3: Add Lighting

1. Add a directional light source (simulating sunlight):
   ```xml
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
   ```

### Step 4: Create Ground Plane

1. Add a ground plane model:
   ```xml
   <model name="ground_plane">
     <static>true</static>
     <link name="link">
       <collision name="collision">
         <geometry>
           <plane>
             <normal>0 0 1</normal>
             <size>100 100</size>
           </plane>
         </geometry>
         <surface>
           <friction>
             <ode>
               <mu>1.0</mu>
               <mu2>1.0</mu2>
             </ode>
           </friction>
           <bounce>
             <restitution_coefficient>0.0</restitution_coefficient>
             <threshold>100000.0</threshold>
           </bounce>
           <contact>
             <ode>
               <soft_cfm>0</soft_cfm>
               <soft_erp>0.2</soft_erp>
               <kp>1e+13</kp>
               <kd>1</kd>
               <max_vel>0.01</max_vel>
               <min_depth>0</min_depth>
             </ode>
           </contact>
         </surface>
       </collision>
       <visual name="visual">
         <geometry>
           <plane>
             <normal>0 0 1</normal>
             <size>100 100</size>
           </plane>
         </geometry>
         <material>
           <ambient>0.7 0.7 0.7 1</ambient>
           <diffuse>0.7 0.7 0.7 1</diffuse>
           <specular>0.0 0.0 0.0 1</specular>
         </material>
       </visual>
     </link>
   </model>
   ```

### Step 5: Add Three Objects

1. Add a sphere object that will fall due to gravity:
   ```xml
   <model name="falling_sphere">
     <pose>2 0 5 0 0 0</pose>
     <link name="link">
       <inertial>
         <mass>1.0</mass>
         <inertia>
           <ixx>0.1</ixx>
           <ixy>0.0</ixy>
           <ixz>0.0</ixz>
           <iyy>0.1</iyy>
           <iyz>0.0</iyz>
           <izz>0.1</izz>
         </inertia>
       </inertial>
       <collision name="collision">
         <geometry>
           <sphere>
             <radius>0.3</radius>
           </sphere>
         </geometry>
       </collision>
       <visual name="visual">
         <geometry>
           <sphere>
             <radius>0.3</radius>
           </sphere>
         </geometry>
         <material>
           <ambient>1.0 0.0 0.0 1</ambient>
           <diffuse>1.0 0.0 0.0 1</diffuse>
         </material>
       </visual>
     </link>
   </model>
   ```

2. Add a box object:
   ```xml
   <model name="stationary_box">
     <pose>-2 0 0.5 0 0 0</pose>
     <static>true</static>
     <link name="link">
       <collision name="collision">
         <geometry>
           <box>
             <size>1.0 1.0 1.0</size>
           </box>
         </geometry>
       </collision>
       <visual name="visual">
         <geometry>
           <box>
             <size>1.0 1.0 1.0</size>
           </box>
         </geometry>
         <material>
           <ambient>0.0 1.0 0.0 1</ambient>
           <diffuse>0.0 1.0 0.0 1</diffuse>
         </material>
       </visual>
     </link>
   </model>
   ```

3. Add a cylinder object:
   ```xml
   <model name="cylinder_obstacle">
     <pose>0 2 0.75 0 0 0</pose>
     <static>true</static>
     <link name="link">
       <collision name="collision">
         <geometry>
           <cylinder>
             <radius>0.4</radius>
             <length>1.5</length>
           </cylinder>
         </geometry>
       </collision>
       <visual name="visual">
         <geometry>
           <cylinder>
             <radius>0.4</radius>
             <length>1.5</length>
           </cylinder>
         </geometry>
         <material>
           <ambient>0.0 0.0 1.0 1</ambient>
           <diffuse>0.0 0.0 1.0 1</diffuse>
         </material>
       </visual>
     </link>
   </model>
   ```

### Step 6: Complete World File

Your complete `basic_lab.world` file should look like this:

```xml
<?xml version="1.0" ?>
<sdf version="1.7">
  <world name="basic_lab_world">
    <gravity>0 0 -9.8</gravity>

    <physics name="ode_physics" default="true" type="ode">
      <max_step_size>0.001</max_step_size>
      <real_time_factor>1.0</real_time_factor>
      <real_time_update_rate>1000.0</real_time_update_rate>
      <ode>
        <solver>
          <type>quick</type>
          <iters>10</iters>
          <sor>1.3</sor>
        </solver>
        <constraints>
          <cfm>0.0</cfm>
          <erp>0.2</erp>
          <contact_max_correcting_vel>100.0</contact_max_correcting_vel>
          <contact_surface_layer>0.001</contact_surface_layer>
        </constraints>
      </ode>
    </physics>

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

    <model name="ground_plane">
      <static>true</static>
      <link name="link">
        <collision name="collision">
          <geometry>
            <plane>
              <normal>0 0 1</normal>
              <size>100 100</size>
            </plane>
          </geometry>
          <surface>
            <friction>
              <ode>
                <mu>1.0</mu>
                <mu2>1.0</mu2>
              </ode>
            </friction>
            <bounce>
              <restitution_coefficient>0.0</restitution_coefficient>
              <threshold>100000.0</threshold>
            </bounce>
            <contact>
              <ode>
                <soft_cfm>0</soft_cfm>
                <soft_erp>0.2</soft_erp>
                <kp>1e+13</kp>
                <kd>1</kd>
                <max_vel>0.01</max_vel>
                <min_depth>0</min_depth>
              </ode>
            </contact>
          </surface>
        </collision>
        <visual name="visual">
          <geometry>
            <plane>
              <normal>0 0 1</normal>
              <size>100 100</size>
            </plane>
          </geometry>
          <material>
            <ambient>0.7 0.7 0.7 1</ambient>
            <diffuse>0.7 0.7 0.7 1</diffuse>
            <specular>0.0 0.0 0.0 1</specular>
          </material>
        </visual>
      </link>
    </model>

    <model name="falling_sphere">
      <pose>2 0 5 0 0 0</pose>
      <link name="link">
        <inertial>
          <mass>1.0</mass>
          <inertia>
            <ixx>0.1</ixx>
            <ixy>0.0</ixy>
            <ixz>0.0</ixz>
            <iyy>0.1</iyy>
            <iyz>0.0</iyz>
            <izz>0.1</izz>
          </inertia>
        </inertial>
        <collision name="collision">
          <geometry>
            <sphere>
              <radius>0.3</radius>
            </sphere>
          </geometry>
        </collision>
        <visual name="visual">
          <geometry>
            <sphere>
              <radius>0.3</radius>
            </sphere>
          </geometry>
          <material>
            <ambient>1.0 0.0 0.0 1</ambient>
            <diffuse>1.0 0.0 0.0 1</diffuse>
          </material>
        </visual>
      </link>
    </model>

    <model name="stationary_box">
      <pose>-2 0 0.5 0 0 0</pose>
      <static>true</static>
      <link name="link">
        <collision name="collision">
          <geometry>
            <box>
              <size>1.0 1.0 1.0</size>
            </box>
          </geometry>
        </collision>
        <visual name="visual">
          <geometry>
            <box>
              <size>1.0 1.0 1.0</size>
            </box>
          </geometry>
          <material>
            <ambient>0.0 1.0 0.0 1</ambient>
            <diffuse>0.0 1.0 0.0 1</diffuse>
          </material>
        </visual>
      </link>
    </model>

    <model name="cylinder_obstacle">
      <pose>0 2 0.75 0 0 0</pose>
      <static>true</static>
      <link name="link">
        <collision name="collision">
          <geometry>
            <cylinder>
              <radius>0.4</radius>
              <length>1.5</length>
            </cylinder>
          </geometry>
        </collision>
        <visual name="visual">
          <geometry>
            <cylinder>
              <radius>0.4</radius>
              <length>1.5</length>
            </cylinder>
          </geometry>
          <material>
            <ambient>0.0 0.0 1.0 1</ambient>
            <diffuse>0.0 0.0 1.0 1</diffuse>
          </material>
        </visual>
      </link>
    </model>

  </world>
</sdf>
```

### Step 7: Run the Simulation

1. Launch Gazebo with your world file:
   ```bash
   gz sim -r basic_lab.world
   ```

2. Observe the simulation:
   - The red sphere should fall due to gravity and land on the ground
   - The green box and blue cylinder should remain stationary
   - All objects should exhibit proper collision behavior

### Step 8: Experiment with Parameters

1. Try changing the initial height of the sphere (currently at z=5) to see how it affects the fall
2. Modify the friction coefficients to see how it affects sliding behavior
3. Adjust the restitution coefficient to see how bounciness changes

## Expected Output

When you run the simulation, you should observe:
- A ground plane with three objects positioned differently
- A red sphere that falls from height and lands on the ground plane
- Green box and blue cylinder that remain in their initial positions
- Proper lighting and shading effects
- Realistic physics behavior when the sphere hits the ground

## Verification Checklist

- [ ] World file loads without errors in Gazebo
- [ ] Red sphere falls due to gravity and stops at ground level
- [ ] Green box and blue cylinder remain stationary
- [ ] Objects do not pass through each other or the ground
- [ ] Lighting appears realistic and illuminates objects properly
- [ ] Simulation runs smoothly at real-time speed
- [ ] Physics behavior looks realistic (no jittering or instability)

## Troubleshooting

### Common Issues and Solutions

**Problem**: Sphere falls through the ground
- **Solution**: Check that the ground plane is set as static and that the sphere's initial position is above the ground plane

**Problem**: Objects appear to vibrate or jitter
- **Solution**: Adjust the physics parameters, especially constraint violation settings in the physics engine configuration

**Problem**: Simulation runs slowly or not in real-time
- **Solution**: Reduce the real_time_update_rate or increase max_step_size in the physics configuration

**Problem**: Objects pass through each other
- **Solution**: Check collision geometry definitions and ensure proper mass/inertia values

**Problem**: Gazebo won't load the world file
- **Solution**: Validate the XML syntax and ensure the SDF version is compatible with your Gazebo installation

## Extensions

After completing this lab, try these extensions:
- Add more objects with different shapes and sizes
- Create a simple maze or obstacle course
- Add textured materials to make the environment more realistic
- Experiment with different physics parameters to see how they affect behavior

## Summary

In this lab, you successfully created a complete Gazebo world with physics simulation, lighting, and multiple interacting objects. You observed how gravity affects objects and verified that collision detection works properly. This foundation will be essential for more complex digital twin simulations.