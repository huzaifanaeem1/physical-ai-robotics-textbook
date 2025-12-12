---
sidebar_position: 1
title: Lab 1 - Synthetic Data Generation
---

# Lab 1 - Synthetic Data Generation

## Objective

In this lab, you will learn to configure simulated sensors in Isaac Sim and generate synthetic datasets that can be used for training AI systems. You will capture depth, segmentation, and bounding box data while understanding the importance of synthetic realism in AI development.

## Prerequisites

- Basic understanding of Isaac Sim interface
- Knowledge of 3D scene composition concepts
- Understanding of sensor types and their applications

## Duration

Estimated time: 60-75 minutes

## Tools Required

- Isaac Sim environment
- USD scene with basic objects
- Camera and depth sensor configurations

## Step-by-Step Instructions

### Step 1: Configure Simulated Camera

1. **Open Isaac Sim** and load a basic scene with several objects
2. **Add a camera sensor** to your robot or scene:
   - Right-click on the robot/chassis in the Scene tab
   - Select "Add" → "Sensors" → "Camera"
   - Configure the following parameters:
     - **Resolution**: 640x480 pixels
     - **Field of View**: 60 degrees
     - **Frame Rate**: 30 FPS
     - **Sensor Position**: Mount on robot at appropriate height

3. **Configure camera properties**:
   - Set appropriate clipping distances (0.1m to 10m)
   - Enable realistic noise models
   - Configure exposure settings for realistic rendering

### Step 2: Capture Depth/Segmentation Images

1. **Add depth sensor** to the same mount point:
   - Select the same parent object as the camera
   - Add a "Depth Camera" sensor
   - Configure matching resolution and field of view
   - Set depth range appropriate for your scene

2. **Enable segmentation annotations**:
   - In the Isaac Sim menu, go to "Window" → "Extension Manager"
   - Enable the "Isaac ROS" extensions
   - In the "Sensors" menu, enable segmentation capture
   - Assign semantic labels to different objects in your scene

3. **Configure annotation types**:
   - Enable depth map generation
   - Enable instance segmentation
   - Enable semantic segmentation
   - Enable bounding box annotations

### Step 3: Export Dataset

1. **Set up data recording**:
   - Create a new folder for your dataset: `~/isaac_sim_datasets/lab1`
   - Configure the data recorder in Isaac Sim
   - Set the output format to compatible formats (PNG for images, JSON for annotations)

2. **Configure recording parameters**:
   - Set recording frame rate (e.g., 10 FPS for efficient capture)
   - Enable synchronization between camera and depth data
   - Set up file naming conventions for easy processing

3. **Begin data capture**:
   - Position your robot/camera in the starting position
   - Start the data recording
   - Move the camera through the scene systematically
   - Capture at least 100 frames of diverse content

### Step 4: Validate Sample Frames

1. **Stop the recording** and navigate to your dataset folder

2. **Verify data integrity**:
   - Check that camera images are properly captured
   - Verify depth maps have appropriate range values
   - Confirm segmentation masks align with camera images
   - Validate bounding box annotations match objects

3. **Analyze data quality**:
   - Examine lighting conditions in captured images
   - Check for motion blur or artifacts
   - Verify depth accuracy by comparing with ground truth
   - Ensure segmentation labels are accurate

4. **Document findings**:
   - Note any issues with data quality
   - Record frame rates achieved during capture
   - Document any challenges encountered during the process

## Expected Output

When you complete this lab, you should have:
- A dataset folder containing synchronized camera and depth images
- Segmentation masks for each captured frame
- Bounding box annotations for objects in the scene
- Documentation of the capture process and any issues encountered

## Verification Checklist

- [ ] Camera sensor successfully configured and capturing images
- [ ] Depth sensor properly set up and generating depth maps
- [ ] Segmentation masks correctly generated and aligned
- [ ] Bounding box annotations properly created
- [ ] Dataset successfully exported with synchronized data
- [ ] Sample frames validated for quality and integrity
- [ ] All annotation types (depth, segmentation, bounding boxes) present
- [ ] Data capture completed with appropriate frame count

## Troubleshooting

### Common Issues and Solutions

**Problem**: Camera feed appears black or with incorrect colors
- **Solution**: Check lighting in the scene, verify camera exposure settings, ensure proper material properties on objects

**Problem**: Depth maps show incorrect values or artifacts
- **Solution**: Verify depth sensor configuration, check clipping distances, ensure proper scene scale

**Problem**: Segmentation masks don't align with camera images
- **Solution**: Verify sensor synchronization, check that segmentation is enabled before capture, ensure consistent timing

**Problem**: Dataset files are missing or incomplete
- **Solution**: Check recording configuration, verify output directory permissions, ensure sufficient disk space

**Problem**: Bounding boxes are inaccurate or missing
- **Solution**: Ensure semantic labels are properly assigned to objects, verify annotation pipeline configuration

## Extensions

After completing this lab, try these extensions:
- Add more complex lighting conditions to test robustness
- Capture data with different camera parameters (resolution, FOV)
- Include dynamic objects in the scene to capture motion
- Experiment with different scene compositions to increase diversity

## Summary

In this lab, you successfully configured simulated sensors in Isaac Sim and generated a synthetic dataset with multiple annotation types. You learned the importance of synthetic data for AI training and gained hands-on experience with the data generation process. This foundational skill is essential for developing and testing perception systems in robotics applications.