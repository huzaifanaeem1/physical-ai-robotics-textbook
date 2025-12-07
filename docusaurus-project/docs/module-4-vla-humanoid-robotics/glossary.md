---
title: VLA Glossary
sidebar_position: 8
---

# Vision-Language-Action (VLA) Glossary

This glossary defines key terms and concepts specific to Vision-Language-Action systems for humanoid robotics.

## A

### Affordance
The possible actions that can be performed with an object. For example, a cup has affordances like "graspable" and "pourable".

### ASR (Automatic Speech Recognition)
Technology that converts spoken language into written text. In VLA systems, ASR serves as the first step in the pipeline, converting voice commands to text.

### Action Execution
The final stage of the VLA pipeline where planned steps are converted to physical robot behaviors using ROS 2 interfaces.

## C

### Cognitive Planning
The process of using Large Language Models (LLMs) to translate natural language commands into structured action plans. This component serves as the "brain" of the VLA system.

## G

### Goal → Subgoal → Action Decomposition
The hierarchical breakdown of high-level tasks into executable steps: goals are broken into subgoals, which are further broken down into specific actions.

## L

### LLM (Large Language Model)
A type of artificial intelligence model that can understand and generate human language. In VLA systems, LLMs are used for cognitive planning and task decomposition.

## N

### Nav2 (Navigation 2)
ROS 2 navigation stack that provides path planning and navigation capabilities for mobile robots.

### Natural Language Command
A human instruction given in everyday language (e.g., "Please bring me the red cup from the table") as opposed to a programmed robot command.

## P

### Perception System
The component of a robot that processes sensory input to understand the environment, particularly for object detection and localization.

### Planning System
The component that transforms high-level goals into executable action sequences, considering safety and feasibility constraints.

## R

### Robot Operating System 2 (ROS 2)
The middleware framework used for robot communication and coordination, providing the foundation for VLA action execution.

### ROS Actions
Long-running tasks in ROS 2 that provide feedback during execution and return a result upon completion, used for navigation and manipulation in VLA systems.

## S

### Speech-to-Text Pipeline
The sequence of processing steps that convert audio input into written text, including preprocessing, feature extraction, acoustic modeling, and language modeling.

## V

### Vision Grounding
The process of connecting language concepts to visual elements in an environment, enabling robots to identify which objects in their visual field correspond to items mentioned in natural language commands.

### Vision-Language-Action (VLA)
An integrated system that combines computer vision (Vision), natural language processing (Language), and robotic action execution (Action) to enable robots to respond to natural language commands in unstructured environments.

### Vision System
The component of the VLA system responsible for detecting and identifying objects in the environment, providing the visual information needed for task execution.

## W

### Whisper-Style Models
A family of ASR models that use transformer architectures to convert speech to text with high accuracy across multiple languages and acoustic conditions.

### World Model
The robot's internal representation of its environment, including the location and properties of objects, used for planning and execution.