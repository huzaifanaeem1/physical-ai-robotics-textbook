---
sidebar_position: 4
title: Environment & World Building
---

# Environment & World Building

## Introduction to World Building

Creating realistic simulation environments is a critical aspect of digital twin development. In Gazebo, a "world" defines the complete simulation environment including the physics properties, lighting, terrain, objects, and initial conditions. Well-designed environments enable accurate testing of robot behaviors and provide the context necessary for realistic simulation.

A world file in Gazebo is an SDF (Simulation Description Format) file that defines all the elements of a simulation environment. This includes the physics engine configuration, lighting, models, and spatial relationships between objects.

## World File Structure

A basic Gazebo world file follows this structure:

```xml
<?xml version="1.0" ?>
<sdf version="1.7">
  <world name="my_world_name">
    <!-- Gravity definition -->
    <gravity>0 0 -9.8</gravity>

    <!-- Physics engine configuration -->
    <physics name="ode_physics" type="ode">
      <!-- Physics parameters -->
    </physics>

    <!-- Lighting -->
    <light name="sun" type="directional">
      <!-- Light properties -->
    </light>

    <!-- Models and objects -->
    <model name="my_model">
      <!-- Model definition -->
    </model>

    <!-- Plugins -->
    <plugin name="my_plugin" filename="libMyPlugin.so">
      <!-- Plugin parameters -->
    </plugin>
  </world>
</sdf>
```

## Creating a Room Environment

Let's build a simple indoor environment with walls, lighting, and objects. This example demonstrates how to create a room with furniture and other elements:

### Basic Room with Walls

```xml
<?xml version="1.0" ?>
<sdf version="1.7">
  <world name="indoor_room">
    <physics name="ode" default="0" type="ode">
      <max_step_size>0.001</max_step_size>
      <real_time_factor>1</real_time_factor>
    </physics>

    <!-- Sun light -->
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
    <!-- Wall 1: North wall -->
    <model name="north_wall">
      <pose>0 5 1.5 0 0 0</pose>
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

    <!-- Wall 2: South wall -->
    <model name="south_wall">
      <pose>0 -5 1.5 0 0 0</pose>
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

    <!-- Wall 3: East wall -->
    <model name="east_wall">
      <pose>5 0 1.5 0 0 0</pose>
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

    <!-- Wall 4: West wall -->
    <model name="west_wall">
      <pose>-5 0 1.5 0 0 0</pose>
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

    <!-- Three objects in the room -->
    <!-- Chair -->
    <model name="chair">
      <pose>2 2 0.4 0 0 0</pose>
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
              <size>0.4 0.4 0.8</size>
            </box>
          </geometry>
        </collision>
        <visual name="visual">
          <geometry>
            <box>
              <size>0.4 0.4 0.8</size>
            </box>
          </geometry>
          <material>
            <ambient>0.5 0.3 0.0 1</ambient>
            <diffuse>0.5 0.3 0.0 1</diffuse>
          </material>
        </visual>
      </link>
    </model>

    <!-- Table -->
    <model name="table">
      <pose>-2 -1 0.45 0 0 0</pose>
      <link name="link">
        <inertial>
          <mass>10.0</mass>
          <inertia>
            <ixx>1.667</ixx>
            <ixy>0.0</ixy>
            <ixz>0.0</ixz>
            <iyy>1.667</iyy>
            <iyz>0.0</iyz>
            <izz>3.333</izz>
          </inertia>
        </inertial>
        <collision name="collision">
          <geometry>
            <box>
              <size>1.0 0.8 0.9</size>
            </box>
          </geometry>
        </collision>
        <visual name="visual">
          <geometry>
            <box>
              <size>1.0 0.8 0.9</size>
            </box>
          </geometry>
          <material>
            <ambient>0.6 0.4 0.2 1</ambient>
            <diffuse>0.6 0.4 0.2 1</diffuse>
          </material>
        </visual>
      </link>
    </model>

    <!-- Box -->
    <model name="box">
      <pose>0 3 0.25 0 0 0</pose>
      <link name="link">
        <inertial>
          <mass>2.0</mass>
          <inertia>
            <ixx>0.0833</ixx>
            <ixy>0.0</ixy>
            <ixz>0.0</ixz>
            <iyy>0.0833</iyy>
            <iyz>0.0</iyz>
            <izz>0.0833</izz>
          </inertia>
        </inertial>
        <collision name="collision">
          <geometry>
            <box>
              <size>0.5 0.5 0.5</size>
            </box>
          </geometry>
        </collision>
        <visual name="visual">
          <geometry>
            <box>
              <size>0.5 0.5 0.5</size>
            </box>
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

## Lighting and Skybox Configuration

Proper lighting is essential for realistic environments and affects sensor simulation accuracy. Gazebo supports several types of lights:

### Directional Lights
Simulate distant light sources like the sun:
```xml
<light name="sun" type="directional">
  <pose>0 0 10 0 0 0</pose>
  <diffuse>0.8 0.8 0.8 1</diffuse>
  <specular>0.2 0.2 0.2 1</specular>
  <direction>-0.6 0.4 -0.8</direction>
</light>
```

### Point Lights
Simulate localized light sources:
```xml
<light name="lamp" type="point">
  <pose>0 0 2 0 0 0</pose>
  <diffuse>1 1 1 1</diffuse>
  <specular>0.5 0.5 0.5 1</specular>
  <attenuation>
    <range>10</range>
    <constant>0.5</constant>
    <linear>0.1</linear>
    <quadratic>0.01</quadratic>
  </attenuation>
</light>
```

### Spot Lights
Create focused lighting with a specific direction and cone:
```xml
<light name="spotlight" type="spot">
  <pose>0 -3 2 0 0.5 0</pose>
  <diffuse>1 1 1 1</diffuse>
  <specular>0.5 0.5 0.5 1</specular>
  <direction>0 1 0</direction>
  <attenuation>
    <range>10</range>
    <constant>0.5</constant>
    <linear>0.1</linear>
    <quadratic>0.01</quadratic>
  </attenuation>
  <spot>
    <inner_angle>0.1</inner_angle>
    <outer_angle>0.5</outer_angle>
    <falloff>1.0</falloff>
  </spot>
</light>
```

## Importing External 3D Objects

Gazebo supports importing 3D models in various formats including COLLADA (.dae), OBJ (.obj), and STL (.stl). Here's how to import a chair model:

```xml
<model name="imported_chair">
  <pose>3 0 0 0 0 0</pose>
  <link name="link">
    <collision name="collision">
      <geometry>
        <mesh>
          <uri>model://chair/meshes/chair.dae</uri>
        </mesh>
      </geometry>
    </collision>
    <visual name="visual">
      <geometry>
        <mesh>
          <uri>model://chair/meshes/chair.dae</uri>
        </mesh>
      </geometry>
      <material>
        <ambient>0.5 0.3 0.0 1</ambient>
        <diffuse>0.5 0.3 0.0 1</diffuse>
      </material>
    </visual>
  </link>
</model>
```

## Asset Folder Structure

For organizing your simulation assets, follow this recommended structure:

```
models/
├── chair/
│   ├── model.config
│   └── meshes/
│       └── chair.dae
├── table/
│   ├── model.config
│   └── meshes/
│       └── table.obj
└── custom_objects/
    ├── robot_base/
    │   ├── model.config
    │   └── meshes/
    │       └── base.stl
    └── environment/
        ├── room_walls/
        │   ├── model.config
        │   └── meshes/
        │       └── walls.dae
        └── furniture/
            ├── couch/
            │   ├── model.config
            │   └── meshes/
            │       └── couch.dae
            └── lamp/
                ├── model.config
                └── meshes/
                    └── lamp.obj
```

The `model.config` file for each model should contain:

```xml
<?xml version="1.0"?>
<model>
  <name>chair</name>
  <version>1.0</version>
  <sdf version="1.7">model.sdf</sdf>
  <author>
    <name>Your Name</name>
    <email>your.email@example.com</email>
  </author>
  <description>A simple chair model</description>
</model>
```

## Environment Validation Checklist

When creating simulation environments, ensure you've addressed these key points:

- [ ] **Gravity**: Is gravity set appropriately for the environment (usually -9.8 m/s² in Z)?
- [ ] **Physics**: Are physics parameters appropriate for the simulation (time step, solver iterations)?
- [ ] **Collision Detection**: Are collision geometries properly defined for all objects?
- [ ] **Visual Representation**: Do visual elements match collision geometries where needed?
- [ ] **Lighting**: Is lighting appropriate for the scene and any vision-based sensors?
- [ ] **Scale**: Are objects scaled appropriately relative to each other?
- [ ] **Static vs Dynamic**: Are immovable objects set as static?
- [ ] **Performance**: Will the environment run efficiently in real-time?
- [ ] **Realism**: Does the environment appropriately represent the real-world scenario?
- [ ] **Accessibility**: Can the robot navigate freely in the intended areas?

## Best Practices for Environment Building

1. **Start Simple**: Begin with basic geometric shapes and add complexity gradually
2. **Performance Over Perfection**: Balance visual fidelity with simulation performance
3. **Modular Design**: Create reusable components that can be combined in different ways
4. **Realistic Physics**: Ensure objects have appropriate mass and friction values
5. **Validation**: Test the environment with actual robot models to verify realism
6. **Documentation**: Comment your world files to explain design decisions
7. **Version Control**: Track changes to world files for reproducibility

## Summary

Building realistic simulation environments is essential for creating effective digital twins. Well-designed environments provide the proper context for testing robot behaviors and enable accurate simulation of real-world scenarios. By following the principles outlined in this lesson, you'll be able to create environments that serve as reliable representations of physical spaces for your robotic systems.

In the next lesson, we'll explore sensor simulation, where you'll learn how to add various sensors to your digital twin systems.