---
title: ROS 2 Action Execution for VLA Systems
sidebar_position: 5
---

# ROS 2 Action Execution for VLA Systems

## Overview of ROS 2 Actions for Execution

Robot Operating System 2 (ROS 2) provides the framework for executing physical robot behaviors in Vision-Language-Action (VLA) systems. ROS 2 actions are used for long-running tasks that provide feedback during execution and return a result upon completion. In VLA systems, these actions implement the physical behaviors planned by the cognitive planning component.

### Key ROS 2 Action Concepts

ROS 2 actions differ from simple topics or services:
- **Topics**: One-way communication for continuous data streams
- **Services**: Request-response communication for quick operations
- **Actions**: Feedback-enabled communication for long-running operations

### Action Components
1. **Goal**: The desired outcome of the action
2. **Feedback**: Continuous updates on action progress
3. **Result**: The final outcome when the action completes

## Converting Planning Steps → ROS Action Messages

The cognitive planning component generates action sequences that must be converted to specific ROS 2 action messages for execution.

### Navigation Actions

Navigation actions use the `nav2_msgs/action/NavigateToPose` action:

```
Planning Step: "Navigate to kitchen counter"
↓
ROS 2 Action Goal:
{
  "target_pose": {
    "pose": {
      "position": {"x": 2.5, "y": 1.2, "z": 0.0},
      "orientation": {"x": 0.0, "y": 0.0, "z": 0.707, "w": 0.707}
    },
    "header": {"frame_id": "map", "stamp": current_time}
  }
}
↓
Execution: Robot moves to specified pose
```

### Manipulation Actions

Manipulation actions might use custom action types like `control_msgs/action/GripperCommand`:

```
Planning Step: "Grasp the red cup"
↓
ROS 2 Action Goal:
{
  "command": {
    "position": 0.02,  // Close gripper to grasp object
    "max_effort": 100.0
  }
}
↓
Execution: Robot grasps object at current position
```

### Perception Actions

Perception actions might use actions like `vision_msgs/action/DetectObjects`:

```
Planning Step: "Locate the green bottle"
↓
ROS 2 Action Goal:
{
  "roi": {
    "min_x": 100, "min_y": 150,
    "max_x": 300, "max_y": 350
  },
  "object_types": ["bottle"],
  "confidence_threshold": 0.8
}
↓
Execution: Vision system detects objects in specified region
```

## Navigation and Manipulation Primitives

### MoveBase Action

The `nav2_msgs/action/MoveBase` action is fundamental for navigation:

```
Goal:
{
  "pose": {
    "position": {"x": target_x, "y": target_y, "z": target_z},
    "orientation": {"x": ox, "y": oy, "z": oz, "w": ow}
  }
}

Feedback:
{
  "distance_remaining": meters,
  "navigation_time": duration,
  "current_pose": current_robot_pose
}

Result:
{
  "result_code": SUCCESS/FAILURE,
  "final_pose": actual_final_pose
}
```

### Manipulation Primitives

Common manipulation actions include:

#### Gripper Control
- **Open Gripper**: `{"position": 0.05}` (fully open)
- **Close Gripper**: `{"position": 0.01}` (lightly closed for grasp)
- **Grasp Object**: `{"position": 0.005}` (fully closed with object)

#### Arm Control
- **Joint Position**: Move to specific joint angles
- **Cartesian Position**: Move end-effector to specific 3D position
- **Trajectory Execution**: Follow a sequence of positions over time

### Perception Primitives

#### Object Detection
- **Detect All Objects**: Scan environment for all detectable objects
- **Detect Specific Object**: Look for specific object type/color
- **Verify Object**: Confirm object properties after approach

#### Localization
- **Update Pose**: Refine robot's position estimate
- **Map Alignment**: Align robot's view with known map

## Example: LLM Plan → Navigation + Pick-Up Sequence

Let's trace how a high-level plan gets converted to ROS 2 actions:

### High-Level Plan: "Fetch the blue water bottle"
```
1. NAVIGATE_TO_KITCHEN
2. LOCATE_BLUE_BOTTLE
3. APPROACH_BOTTLE
4. GRASP_BOTTLE
5. RETURN_TO_USER
```

### ROS 2 Action Sequence:

**Step 1: Navigate to Kitchen**
```
Action: nav2_msgs/action/NavigateToPose
Goal: {"pose": {"position": {"x": 3.0, "y": 2.0}, "orientation": {...}}}
Feedback: Distance to goal, path progress
Result: Success/failure, final position
```

**Step 2: Locate Blue Bottle**
```
Action: vision_msgs/action/DetectObjects
Goal: {"object_types": ["bottle"], "color": "blue"}
Feedback: Detection confidence scores
Result: Bottle position and orientation
```

**Step 3: Approach Bottle**
```
Action: nav2_msgs/action/NavigateToPose
Goal: {"pose": {"position": {"x": bottle_x, "y": bottle_y-0.3}, ...}}  // 30cm in front
Feedback: Distance to approach position
Result: Success, ready for manipulation
```

**Step 4: Grasp Bottle**
```
Action: control_msgs/action/GripperCommand
Goal: {"command": {"position": 0.01, "max_effort": 50.0}}
Feedback: Current gripper position
Result: Success/failure, object grasped confirmation
```

**Step 5: Return to User**
```
Action: nav2_msgs/action/NavigateToPose
Goal: {"pose": {"position": {"x": user_x, "y": user_y}, "orientation": {...}}}
Feedback: Distance to user, navigation progress
Result: At user location, ready for delivery
```

## Failure Modes in VLA Action Execution

### Object Moved
- **Problem**: Object detected at planning time is no longer at expected location
- **Detection**: Navigation succeeds but manipulation fails, or vision detects different object
- **Recovery**: Re-scan environment, update plan with new object location

### Path Blocked
- **Problem**: Path to target location becomes blocked after planning
- **Detection**: Navigation action receives obstacle feedback
- **Recovery**: Re-plan path, or return to planning phase with new information

### Perception Mismatch
- **Problem**: Vision system fails to detect expected object or detects wrong object
- **Detection**: Vision action returns no matches or low confidence
- **Recovery**: Re-orient robot, re-scan, or query user for clarification

### Manipulation Failure
- **Problem**: Robot fails to grasp or manipulate object as expected
- **Detection**: Gripper feedback indicates no object or slip
- **Recovery**: Adjust grasp position, try alternative grasp, or report failure

### Navigation Failure
- **Problem**: Robot cannot reach intended destination
- **Detection**: Navigation action fails with obstacle or localization error
- **Recovery**: Find alternative route, adjust destination, or return to planning

## Action Execution Strategies

### Sequential Execution
Execute actions one after another, waiting for each to complete before starting the next:
- **Pros**: Simple, predictable, easy to debug
- **Cons**: Slower, cannot take advantage of parallel capabilities

### Concurrent Execution
Execute multiple actions simultaneously when possible:
- **Pros**: Faster execution, better resource utilization
- **Cons**: More complex coordination, potential conflicts

### Feedback Integration
Use action feedback to adjust subsequent actions:
- Monitor progress and adjust parameters in real-time
- Abort or modify actions based on intermediate results
- Update world model based on action outcomes

## Integration with VLA Pipeline

Action execution connects to other VLA components:

```
LLM Plan → Action Conversion → ROS 2 Execution → Feedback → Plan Adjustment
     ↓            ↓                    ↓              ↓           ↓
   Structured   ROS Action        Physical      Success/     Updated
   Steps       Messages          Behavior      Failure      Context
```

The action execution layer receives structured action sequences from the cognitive planner, converts them to ROS 2 action messages, executes the physical behaviors, and provides feedback that may trigger plan adjustments.

## Learning Objectives

After this lesson, you should understand:
- How ROS 2 actions differ from topics and services
- The process of converting planning steps to ROS 2 action messages
- Common navigation and manipulation primitives used in VLA systems
- How to implement a complete navigation + manipulation sequence
- Common failure modes and recovery strategies for action execution
- How action execution integrates with the broader VLA pipeline