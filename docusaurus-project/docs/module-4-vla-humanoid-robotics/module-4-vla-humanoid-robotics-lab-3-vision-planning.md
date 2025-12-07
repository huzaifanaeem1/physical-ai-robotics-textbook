---
title: Lab 3 - Vision + Planning Integration
sidebar_position: 3
---

# Lab 3 - Vision + Planning Integration

## Objective

In this lab, you will practice integrating visual information with planning decisions to select appropriate robot actions. You'll learn how vision systems inform planning and how to handle scenarios where visual information affects action selection.

## Overview

Vision and planning work together in VLA systems. The vision system provides information about the current state of the environment, while the planning system uses this information to make informed decisions about which actions to take and how to execute them.

## Lab Activities

### Activity 1: Object Recognition and Action Selection

Consider the following visual input and determine appropriate actions:

**Scenario A:**
- **Visual Input**: Image showing a room with scattered objects
- **Detected Objects**:
  - Red cup on floor [confidence: 0.89, graspable: true, fragile: true]
  - Books on table [confidence: 0.92, graspable: true, stackable: true]
  - Chair near desk [confidence: 0.95, movable: true, sitable: true]
  - Water bottle on counter [confidence: 0.87, graspable: true, pourable: true]

**Command**: "Clean up the room"

**Action Selection Process**:
1. **Identify Relevant Objects**: Objects on floor that don't belong there (red cup)
2. **Determine Proper Locations**: Books → bookshelf, cup → kitchen counter
3. **Sequence Actions**: Pick up floor items before organizing table items
4. **Consider Affordances**: Handle fragile cup carefully, stack books efficiently

Complete the action selection for: "Organize the desk area"

### Activity 2: Vision-Conditioned Planning

Plan actions based on specific visual conditions:

**Scenario B:**
- **Command**: "Bring me the green water bottle"
- **Visual Input**: Kitchen area with multiple bottles
- **Detected Objects**:
  - Green plastic bottle [confidence: 0.91, contains: water, location: counter]
  - Green glass bottle [confidence: 0.85, contains: juice, location: counter]
  - Blue water bottle [confidence: 0.93, contains: water, location: refrigerator]

**Vision-Conditioned Plan**:
1. **Identify Target**: Green plastic bottle with water (matches "green" and "water")
2. **Verify Contents**: Check that bottle contains water using visual/semantic analysis
3. **Plan Approach**: Navigate to counter where green water bottle is located
4. **Execute Grasp**: Use appropriate grasp for plastic bottle
5. **Deliver**: Bring to user location

Create a vision-conditioned plan for: "Get the hot coffee from the table"

### Activity 3: Handling Uncertainty and Ambiguity

Develop strategies for handling uncertain visual information:

**Scenario C:**
- **Command**: "Move the box to the shelf"
- **Visual Input**: Two similar boxes in the room
- **Detected Objects**:
  - Cardboard box A [confidence: 0.72, size: large, location: floor]
  - Cardboard box B [confidence: 0.81, size: medium, location: table]

**Uncertainty Handling**:
1. **Query User**: "Which box would you like me to move - the large one on the floor or the medium one on the table?"
2. **Context Analysis**: If command given near one box, assume that one is target
3. **Default Selection**: Choose the more accessible box (on table)

Apply uncertainty handling to: "Put the book back"

### Activity 4: Affordance-Based Action Planning

Plan actions based on object affordances:

**Scenario D:**
- **Command**: "Set the table for dinner"
- **Detected Objects**:
  - Plates [affordances: stackable, graspable, placeable]
  - Forks [affordances: graspable, placeable, orientable]
  - Glasses [affordances: graspable, placeable, fillable]
  - Napkins [affordances: graspable, placeable, foldable]

**Affordance-Based Plan**:
1. **Grasp Planning**: Plan appropriate grasp for each object type
2. **Placement Strategy**: Consider object affordances when placing
3. **Sequence Optimization**: Place stable objects before delicate ones
4. **Orientation**: Position objects with affordances in mind (forks facing up, glasses upright)

Create an affordance-based plan for: "Arrange the art supplies"

## Planning Templates for Vision Integration

### Vision-Enhanced Task Template
```
{
  "task": "fetch_object",
  "target_visual_description": {
    "color": "green",
    "object_type": "water bottle",
    "attributes": ["contains liquid"],
    "location_context": "kitchen"
  },
  "detected_candidates": [
    {
      "object_id": "bottle_1",
      "visual_features": {...},
      "confidence": 0.91,
      "affordances": ["graspable", "pourable"],
      "location": [x, y, z]
    }
  ],
  "action_sequence": [...],
  "vision_validation_points": [...]
}
```

### Affordance-Aware Manipulation Template
```
{
  "action": "grasp_object",
  "object_properties": {
    "shape": "cylindrical",
    "size": [diameter, height],
    "weight": "light",
    "material": "plastic",
    "fragility": "durable"
  },
  "grasp_strategy": {
    "type": "power_grasp",
    "contact_points": [[x1, y1, z1], [x2, y2, z2]],
    "grip_force": "medium"
  },
  "safety_factors": {
    "fragility_check": true,
    "weight_verification": true
  }
}
```

## Vision-Planning Integration Challenges

### Perception-Action Coupling
- **Real-time Processing**: Planning must adapt as new visual information arrives
- **Synchronization**: Coordinating vision processing with action execution
- **Latency Management**: Handling delays between perception and action

### Uncertainty Management
- **Confidence Thresholds**: Deciding when visual information is reliable enough
- **Fallback Strategies**: Alternative plans when visual recognition fails
- **Verification Loops**: Checking action outcomes visually

### Multi-Modal Integration
- **Sensor Fusion**: Combining vision with other sensors (touch, audio)
- **Cross-Modal Validation**: Using multiple sensory inputs to confirm object properties
- **Context Consistency**: Ensuring visual information aligns with other knowledge

## Lab Deliverables

1. Complete the action selection for "Organize the desk area"
2. Create a vision-conditioned plan for "Get the hot coffee from the table"
3. Apply uncertainty handling to "Put the book back"
4. Create an affordance-based plan for "Arrange the art supplies"
5. Design a vision-validation checkpoint for a complex manipulation task
6. Explain how you would handle a situation where the visual system detects an unexpected obstacle during navigation

## Discussion Questions

1. How might the planning system adapt if the vision system's confidence in object detection varies significantly?
2. What strategies could be used to handle situations where the visual scene changes during plan execution?
3. How would you design a system that can gracefully degrade if the vision system fails?
4. What role does spatial reasoning play in connecting vision and planning?
5. How might the system handle ambiguous visual information when the command is time-sensitive?

## Advanced Challenge

Design a complete vision-grounded plan for: "Help me find my car keys and bring them to me." Consider:
- How to recognize car keys among other small objects
- How to handle the fact that keys might be in unusual locations
- How to verify that the correct object has been found
- How to safely transport small objects