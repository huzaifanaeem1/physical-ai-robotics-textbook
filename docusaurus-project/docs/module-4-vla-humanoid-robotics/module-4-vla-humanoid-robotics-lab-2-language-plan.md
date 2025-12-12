---
title: Lab 2 - Language-to-Plan Conversion
sidebar_position: 2
---

# Lab 2 - Language-to-Plan Conversion

## Objective

In this lab, you will practice converting natural language commands into structured action plans using cognitive planning principles. You'll develop skills in task decomposition, safety validation, and plan feasibility assessment.

## Overview

Cognitive planning is the process of transforming high-level natural language commands into executable action sequences. This lab focuses on the systematic breakdown of commands into subtasks that can be executed by a humanoid robot.

## Lab Activities

### Activity 1: Task Decomposition Practice

For each of the following commands, break down the task into hierarchical subtasks:

**Command A:** "Set the table for two people"
1. **Goal Level**: Set dining table for 2 people
2. **Subgoal Level**:
   - Identify required items (plates, utensils, glasses)
   - Locate items in kitchen/storage
   - Transport items to dining table
   - Arrange items in proper positions
3. **Action Level**:
   - Navigate to kitchen
   - Identify 2 plates, 4 utensils, 2 glasses
   - Pick up items (max 2 at a time)
   - Navigate to dining table
   - Place items in proper positions
   - Verify completion

**Command B:** "Put the red book back on the shelf"
1. **Goal Level**: Return red book to shelf
2. **Subgoal Level**:
   - Locate the red book
   - Navigate to book's location
   - Identify the correct shelf
   - Navigate to shelf location
   - Place book on shelf
3. **Action Level**:
   - Scan environment for red book
   - Approach book location
   - Verify object is book and is red
   - Grasp the book
   - Navigate to bookshelf
   - Identify appropriate shelf space
   - Place book in position
   - Verify placement

Now complete the decomposition for: "Bring me a glass of water from the kitchen"

### Activity 2: Safety and Validation Analysis

For each action sequence, identify potential safety concerns and validation steps:

**Example:**
```
Command: "Move the chair to the table"
Action Sequence:
1. Navigate to chair
2. Verify chair is moveable
3. Grasp chair legs carefully
4. Lift chair slightly
5. Navigate to table
6. Position chair near table
7. Place chair down

Safety Concerns:
- Stability during lifting
- Collision with obstacles
- Potential to drop chair

Validation Steps:
- Check chair weight before lifting
- Verify path is clear
- Confirm table area is accessible
```

Apply this analysis to: "Clean up the toys on the floor"

### Activity 3: Plan Feasibility Assessment

Evaluate whether each plan is feasible given robot constraints:

**Robot Constraints:**
- Maximum lifting capacity: 2kg
- Maximum reach: 1.5m from base
- Navigation in tight spaces: minimum 0.5m clearance
- Object manipulation: must be graspable (not liquid, not gas)

**Plan Evaluation:**
```
Command: "Lift the piano"
Feasibility: ❌ Not feasible
Reason: Piano exceeds weight limit (typically 200+ kg)
Suggested Alternative: "The piano is too heavy for me to lift. Could you specify a lighter object?"
```

Evaluate the feasibility of: "Pour the water from the glass onto the floor"

### Activity 4: Pseudocode Implementation

Using the pseudocode structure from the lesson, implement a simple planning function for a specific task:

```
FUNCTION plan_fetch_object(command):
    // Parse the command
    object_to_fetch = extract_object(command)
    target_location = extract_location(command)

    // Generate subgoals
    subgoals = [
        "NAVIGATE_TO_OBJECT",
        "IDENTIFY_OBJECT",
        "GRASP_OBJECT",
        "NAVIGATE_TO_USER",
        "DELIVER_OBJECT"
    ]

    // Validate each subgoal
    validated_plan = []
    FOR each subgoal in subgoals:
        IF validate_subgoal(subgoal, object_to_fetch):
            validated_plan.append(subgoal)
        ELSE:
            recovery_action = generate_recovery(subgoal)
            validated_plan.append(recovery_action)

    RETURN validated_plan
```

Implement a similar function for: "Organize books on the shelf"

## Planning Templates

Use these templates to structure your plans:

### Fetch Task Template
```
{
  "task_type": "fetch",
  "target_object": {
    "name": "",
    "attributes": [],
    "location": ""
  },
  "destination": {
    "name": "",
    "type": ""
  },
  "safety_constraints": [],
  "validation_steps": []
}
```

### Navigation Task Template
```
{
  "task_type": "navigate",
  "target_location": {
    "name": "",
    "coordinates": [],
    "type": ""
  },
  "path_constraints": [],
  "obstacle_avoidance": true
}
```

### Manipulation Task Template
```
{
  "task_type": "manipulate",
  "action": "",
  "object": {
    "name": "",
    "properties": {},
    "grasp_points": []
  },
  "safety_checks": []
}
```

## Lab Deliverables

1. Complete the task decomposition for "Bring me a glass of water from the kitchen"
2. Perform safety and validation analysis for "Clean up the toys on the floor"
3. Evaluate feasibility of "Pour the water from the glass onto the floor"
4. Implement pseudocode function for "Organize books on the shelf"
5. Create a complete plan using the appropriate template for "Set the table for dinner"

## Discussion Questions

1. How might the planning process adapt if the robot encounters an unexpected obstacle during execution?
2. What strategies could be used to handle ambiguous commands like "Put that there"?
3. How would you modify the planning process for tasks requiring multiple robots working together?
4. What role does the vision system play in validating and adjusting plans during execution?