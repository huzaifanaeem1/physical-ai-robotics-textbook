# VLA System Interface Contracts

## Overview
This document defines the conceptual interfaces between components of the Vision-Language-Action (VLA) system. These are educational contracts that illustrate how components would interact in a real implementation.

## Voice Command Interface

### ASR Service Contract
```
Input: AudioStream
Output: {
  "transcribed_text": "string",
  "confidence_score": "float",
  "timestamp": "datetime",
  "processing_time": "float"
}
Error Cases:
- AudioTooNoisy: When audio quality is insufficient
- Timeout: When processing takes too long
- Unintelligible: When speech cannot be understood
```

### Voice Command Validator
```
Input: {
  "transcribed_text": "string",
  "confidence_score": "float"
}
Output: {
  "is_valid": "boolean",
  "validation_message": "string",
  "normalized_command": "string"
}
```

## Cognitive Planning Interface

### LLM Planner Contract
```
Input: {
  "goal_description": "string",
  "environment_context": "object",
  "safety_constraints": "list"
}
Output: {
  "plan_id": "string",
  "task_sequence": [
    {
      "step_id": "string",
      "action_type": "string",
      "parameters": "object",
      "preconditions": "list",
      "expected_outcomes": "list"
    }
  ],
  "validation_status": "enum",
  "estimated_completion_time": "float"
}
Error Cases:
- UnachievableGoal: When goal cannot be decomposed
- SafetyViolation: When plan violates safety constraints
- ResourceUnavailable: When required resources are not available
```

### Plan Validator
```
Input: {
  "task_sequence": "list",
  "safety_constraints": "list"
}
Output: {
  "is_valid": "boolean",
  "validation_errors": "list",
  "suggested_revisions": "list"
}
```

## Vision Processing Interface

### Object Detection Contract
```
Input: {
  "image_data": "base64_string",
  "detection_context": "string"
}
Output: {
  "detection_id": "string",
  "detected_objects": [
    {
      "object_id": "string",
      "name": "string",
      "class": "string",
      "confidence": "float",
      "bounding_box": {
        "x": "float",
        "y": "float",
        "width": "float",
        "height": "float"
      },
      "affordances": "list",
      "spatial_relationships": "list"
    }
  ],
  "processing_time": "float"
}
Error Cases:
- ImageQualityPoor: When image is too blurry or dark
- NoObjectsDetected: When no recognizable objects are found
- ProcessingTimeout: When detection takes too long
```

### Visual Grounding Contract
```
Input: {
  "natural_language_query": "string",
  "detected_objects": "list"
}
Output: {
  "target_objects": "list",
  "spatial_context": "object",
  "confidence_score": "float",
  "grounding_explanation": "string"
}
```

## Action Execution Interface

### ROS 2 Action Mapper
```
Input: {
  "action_step": {
    "step_id": "string",
    "action_type": "enum",
    "parameters": "object"
  },
  "environment_state": "object"
}
Output: {
  "ros_action_name": "string",
  "goal_parameters": "object",
  "execution_feedback": "object"
}
Error Cases:
- UnsupportedAction: When action type is not supported
- InvalidParameters: When parameters don't match action requirements
- ExecutionFailure: When ROS action fails to execute
```

### Action Executor
```
Input: {
  "ros_action_name": "string",
  "goal_parameters": "object"
}
Output: {
  "execution_id": "string",
  "status": "enum",
  "feedback": "object",
  "result": "object"
}
```

## System Integration Interface

### VLA Pipeline Orchestrator
```
Input: {
  "voice_command": "string"
}
Output: {
  "pipeline_id": "string",
  "execution_status": "enum",
  "progress_updates": "list",
  "final_result": "object",
  "error_log": "list"
}
```

### Error Recovery Handler
```
Input: {
  "error_context": {
    "component": "string",
    "error_type": "string",
    "error_details": "object"
  },
  "current_state": "object",
  "original_goal": "string"
}
Output: {
  "recovery_strategy": "string",
  "revised_plan": "object",
  "retry_parameters": "object"
}
```

## Data Flow Contracts

### Voice-to-Planning Flow
```
Stage 1: Voice → Text
Input: Audio
Output: {
  "text": "string",
  "confidence": "float",
  "timestamp": "datetime"
}

Stage 2: Text → Plan
Input: {
  "text": "string",
  "context": "object"
}
Output: {
  "plan": "object",
  "validation_status": "enum"
}
```

### Vision-to-Action Flow
```
Stage 1: Environment → Perception
Input: Image/Sensor data
Output: {
  "objects": "list",
  "spatial_relationships": "list",
  "environment_state": "object"
}

Stage 2: Perception → Action Selection
Input: {
  "perception_data": "object",
  "task_requirements": "object"
}
Output: {
  "selected_action": "string",
  "action_parameters": "object"
}
```

## Validation Rules

### Interface Compatibility
- All interfaces must accept and return well-formed JSON objects
- Required fields must be present in all requests
- Optional fields must have appropriate defaults
- Error responses must follow consistent format

### Performance Requirements
- ASR processing: < 2 seconds for typical commands
- Planning: < 5 seconds for simple tasks
- Vision processing: < 3 seconds for standard detection
- Action execution: Feedback within 1 second for active tasks

### Safety Requirements
- All plans must pass safety validation before execution
- Error recovery must be available for all actions
- System must fail gracefully when components are unavailable