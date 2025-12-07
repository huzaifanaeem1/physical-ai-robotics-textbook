---
sidebar_position: 5
title: Navigation with Nav2
---

# Navigation with Nav2

## Learning Objectives

- Understand Nav2 and its purpose in robot navigation
- Learn about global vs local planners with simple diagrams
- Understand costmaps: Static, dynamic, inflation layers
- Create a conceptual example of a humanoid navigating around obstacles in a simulated room
- Document planning challenges for bipeds vs wheeled robots (footstep feasibility, dynamic balance)

## Introduction to Nav2

Navigation2 (Nav2) is the ROS 2 navigation stack that provides path planning, obstacle avoidance, and robot control capabilities. It represents the "action" component of the AI-robot brain, taking environmental understanding from perception systems and converting it into safe, efficient robot movement.

### Purpose in Robot Navigation

Nav2 serves as the navigation engine that enables autonomous mobile robots to:
- Plan optimal paths from current location to goals
- Avoid obstacles in real-time
- Execute smooth, controlled movement
- Adapt to dynamic environments
- Maintain safety constraints during navigation

### Key Components

- **Global Planner**: Computes long-term routes using static maps
- **Local Planner**: Generates safe short-term trajectories avoiding dynamic obstacles
- **Controller**: Translates planned paths into low-level robot commands
- **Costmap**: Maintains representations of navigable space
- **Recovery Behaviors**: Handles navigation failures and stuck situations

## Global vs Local Planners

Navigation in Nav2 is divided into two complementary planning systems that work together to provide safe, efficient navigation.

### Global Planner

The global planner computes long-term, optimal paths using static map information:

```
┌─────────────────────────────────────────────────────────┐
│                    Global Planner                       │
│                                                         │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐ │
│  │   Static    │    │  Path       │    │   Global    │ │
│  │   Map       │───▶│  Planning   │───▶│   Path      │ │
│  │             │    │  Algorithm  │    │             │ │
│  │  (Known     │    │  (A*, D*    │    │  (Optimal   │ │
│  │   obstacles) │    │   variants) │    │   route)    │ │
│  └─────────────┘    └─────────────┘    └─────────────┘ │
└─────────────────────────────────────────────────────────┘
```

#### Global Planner Characteristics
- **Long-term Focus**: Plans the overall route from start to goal
- **Static Information**: Uses static map data for obstacle-free path planning
- **Optimality**: Seeks to find the most efficient path based on cost functions
- **Infrequent Updates**: Recomputes only when goals change or major obstacles are detected
- **Global Context**: Considers the entire known environment for path planning

#### Common Global Algorithms
- **A* (A-star)**: Popular algorithm balancing path optimality and computation time
- **Dijkstra**: Guarantees optimal paths but computationally expensive
- **D* Lite**: Dynamic replanning for changing environments
- **Theta***: Any-angle path planning allowing direct connections between waypoints

### Local Planner

The local planner generates safe, executable trajectories while avoiding dynamic obstacles:

```
┌─────────────────────────────────────────────────────────┐
│                    Local Planner                        │
│                                                         │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐ │
│  │  Local      │    │  Trajectory │    │  Velocity   │ │
│  │  Costmap    │───▶│  Generation │───▶│  Commands   │ │
│  │             │    │             │    │             │ │
│  │  (Dynamic  │    │  (Trajectory│    │  (Safe      │ │
│  │   obstacles) │    │   optimization) │    │   movement)   │ │
│  └─────────────┘    └─────────────┘    └─────────────┘ │
└─────────────────────────────────────────────────────────┘
```

#### Local Planner Characteristics
- **Short-term Focus**: Plans immediate movement to follow global path safely
- **Dynamic Awareness**: Responds to real-time sensor data about moving obstacles
- **Feasibility**: Ensures planned trajectories are achievable by the robot
- **Frequent Updates**: Recomputes at high frequency (typically 10-20 Hz)
- **Safety Priority**: Prioritizes obstacle avoidance over path optimality

#### Common Local Algorithms
- **DWA (Dynamic Window Approach)**: Considers robot dynamics in trajectory selection
- **TEB (Timed Elastic Band)**: Optimizes trajectories with time constraints
- **MPC (Model Predictive Control)**: Uses robot models for predictive planning

## Costmaps

Costmaps are 2D grid-based representations that encode information about the environment for navigation planning. They provide a common data structure used by both global and local planners.

### Static Costmap

The static costmap represents known, unchanging obstacles:

```
Static Costmap Example:
┌─────────────────────────┐
│  0  0  0  0  0  0  0  0│  (0 = free space)
│  0  0  0  0  0  0  0  0│
│  0  0 [100][100] 0  0  0│  (100 = obstacle)
│  0  0 [100][100] 0  0  0│
│  0  0  0  0  0  0  0  0│
│  0  0  0  0  0  0  0  0│
└─────────────────────────┘
```

#### Static Costmap Contents
- **Static Obstacles**: Walls, furniture, permanent fixtures
- **Traversable Areas**: Free space where the robot can move
- **Unknown Areas**: Regions not yet mapped by perception systems
- **Map Metadata**: Resolution, origin, and coordinate frame information

### Dynamic Costmap

The dynamic costmap represents temporary and moving obstacles detected by sensors:

```
Dynamic Costmap Example:
┌─────────────────────────┐
│  0  0  0  0  0  0  0  0│
│  0 [50][50] 0  0  0  0  0│  (50 = temporary obstacle)
│  0 [50][50] 0  0  0  0  0│
│  0  0  0  0  0  0  0  0│
│  0  0  0  0 [75] 0  0  0│  (75 = moving obstacle)
│  0  0  0  0  0  0  0  0│
└─────────────────────────┘
```

#### Dynamic Costmap Contents
- **Sensor Obstacles**: Obstacles detected by LiDAR, cameras, etc.
- **Moving Objects**: People, other robots, dynamic obstacles
- **Clearing Information**: Areas where obstacles have moved away
- **Temporal Data**: Information about obstacle persistence and movement

### Inflation Layer

The inflation layer expands obstacle costs to account for robot size and safety margins:

```
Inflation Example:
Before inflation:     After inflation:
┌─────────┐           ┌─────────┐
│  0  0  0│           │ 50 50 50│  (50-100 = safety buffer)
│  0[100] 0│           │ 50[100]50│
│  0  0  0│           │ 50 50 50│
└─────────┘           └─────────┘
```

#### Inflation Parameters
- **Robot Radius**: Buffer zone based on robot physical dimensions
- **Safety Margin**: Additional buffer for collision avoidance
- **Inflation Radius**: Distance over which obstacle costs decrease
- **Cost Function**: Mathematical function defining how costs decay with distance

## Conceptual Example: Humanoid Navigating Around Obstacles

Let's examine a conceptual scenario where a humanoid robot navigates around obstacles in a simulated room using Nav2:

### Environment Setup
A humanoid robot needs to navigate from one corner of a rectangular room to the opposite corner, with several obstacles in the path.

### Navigation Process

#### Initial State
1. **Map Loading**: Robot loads static map of the room
2. **Localization**: Robot determines its current position using perception data
3. **Goal Setting**: Navigation goal is set at the destination corner
4. **Global Plan**: Global planner computes optimal path around known obstacles

#### Dynamic Obstacle Encounter
1. **Obstacle Detection**: Robot's sensors detect a person walking across the path
2. **Costmap Update**: Dynamic costmap marks the person's location as an obstacle
3. **Local Planning**: Local planner generates trajectories to avoid the moving person
4. **Path Following**: Robot adjusts its path to navigate around the person safely

#### Path Execution
1. **Velocity Commands**: Controller generates appropriate velocity commands
2. **Motion Execution**: Robot moves according to planned trajectory
3. **Continuous Monitoring**: Sensors continuously check for new obstacles
4. **Adaptive Planning**: Plans are updated as the environment changes

#### Goal Achievement
1. **Approach**: Robot approaches the goal location following the global plan
2. **Final Adjustment**: Local planner ensures precise positioning at goal
3. **Completion**: Navigation task completes successfully
4. **Map Update**: Obstacle information is cleared from dynamic costmap

### Humanoid-Specific Considerations

For humanoid robots, additional factors must be considered:

- **Balance Maintenance**: Planning must account for the robot's dynamic balance requirements
- **Footstep Planning**: Specific placement of feet for stable locomotion
- **Center of Mass**: Trajectories must maintain center of mass within stable regions
- **Turning Radius**: Humanoid robots may have different turning characteristics than wheeled robots

## Planning Challenges for Bipedal vs Wheeled Robots

Bipedal robots face unique navigation challenges compared to traditional wheeled robots:

### Footstep Feasibility

#### Wheeled Robots
- **Continuous Motion**: Can move in any direction within constraints
- **Simple Planning**: Path planning focuses on obstacle avoidance
- **Smooth Trajectories**: Continuous wheel rotation enables smooth motion

#### Bipedal Robots
- **Discrete Steps**: Must plan each foot placement carefully
- **Terrain Requirements**: Each foot placement must be on stable, traversable terrain
- **Step Constraints**: Limited step size and placement options
- **Balance Considerations**: Each step affects the robot's dynamic balance

### Dynamic Balance

#### Stability Requirements
- **Zero Moment Point (ZMP)**: Bipedal robots must maintain ZMP within support polygon
- **Capture Point**: Dynamic balance point that determines stability during walking
- **Center of Mass Control**: Precise control of CoM position and velocity
- **Swing Foot Planning**: Careful planning of swing foot trajectory to maintain balance

#### Balance-Aware Planning
- **Stable Foot Placement**: Each footstep must maintain dynamic stability
- **CoM Trajectory**: Planning must consider center of mass movement
- **Timing Constraints**: Step timing affects overall stability
- **Recovery Planning**: Plans must include recovery from potential balance losses

### Navigation Strategy Differences

#### Wheeled Navigation
- **Pure Path Following**: Focus on following planned paths efficiently
- **Simple Obstacle Avoidance**: Maneuver around obstacles using differential drive
- **Point-to-Point**: Direct navigation from current to goal location

#### Bipedal Navigation
- **Step-by-Step Planning**: Each step must be planned and executed carefully
- **Terrain Analysis**: Continuous assessment of foot placement feasibility
- **Balance-First Approach**: Safety and stability take precedence over efficiency
- **Multi-Step Consideration**: Planning must consider multiple future steps

### Practical Implications

#### Path Planning
- **Wheeled**: Can plan smooth, curved paths
- **Bipedal**: Must plan paths with discrete, stable foot placements

#### Obstacle Avoidance
- **Wheeled**: Can maneuver around obstacles with simple trajectory adjustments
- **Bipedal**: Must find alternative routes with stable foot placement opportunities

#### Recovery Behaviors
- **Wheeled**: Simple backing up or turning around
- **Bipedal**: Complex balance recovery and careful repositioning

## Exercises

1. **Planning Exercise**: Design a navigation strategy for a humanoid robot that must navigate through a narrow doorway
2. **Costmap Exercise**: Create a conceptual costmap for a room with both static and dynamic obstacles, considering humanoid-specific constraints
3. **Comparison Exercise**: Analyze the differences between wheeled and bipedal navigation in a crowded environment

## Summary

Nav2 provides the navigation capabilities that complete the AI-robot brain by converting environmental understanding into safe, efficient robot movement. The combination of global and local planners, supported by comprehensive costmap systems, enables robots to navigate complex environments. For humanoid robots, navigation planning must account for unique challenges including footstep feasibility and dynamic balance requirements. Understanding these navigation concepts is crucial for implementing complete autonomous robotic systems.

In the next lesson, we'll explore the complete AI decision flow that ties perception, localization, mapping, and navigation together.