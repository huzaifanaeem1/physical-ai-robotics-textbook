# ROS 2 Fundamentals Module - Troubleshooting Guide

## Overview
This guide provides solutions to common issues encountered when working with the ROS 2 fundamentals module examples and exercises.

## Common Setup Issues

### ROS 2 Installation
**Problem**: ROS 2 Humble not found or not properly installed
**Solution**:
1. Verify installation: `dpkg -l | grep ros-humble`
2. Source the setup: `source /opt/ros/humble/setup.bash`
3. Add to `.bashrc`: `echo "source /opt/ros/humble/setup.bash" >> ~/.bashrc`

**Problem**: Python packages not found
**Solution**:
1. Install Python dependencies: `pip3 install -U rclpy`
2. Or use ROS 2 Python packages: `sudo apt install python3-ros-humble-*`

### Workspace Issues
**Problem**: Package not found when building
**Solution**:
1. Check directory structure: `~/ros2_ws/src/my_robot_tutorials`
2. Ensure proper package.xml and setup.py files exist
3. Run: `cd ~/ros2_ws && colcon build --packages-select my_robot_tutorials`

## Node and Topic Issues

### Publisher/Subscriber Communication
**Problem**: Nodes don't communicate with each other
**Solution**:
1. Verify both terminals have sourced ROS 2: `source ~/ros2_ws/install/setup.bash`
2. Check topic names match exactly: `ros2 topic list`
3. Verify message types match: `ros2 topic info /topic_name`
4. Check for firewall or network issues if using multi-machine setup

**Problem**: No messages being received
**Solution**:
1. Check if publisher is running: `ros2 node info /publisher_name`
2. Verify subscriber topic name: `ros2 topic echo /topic_name`
3. Check QoS profiles if messages still don't appear

### Node Lifecycle Issues
**Problem**: Node won't shutdown properly
**Solution**:
1. Use Ctrl+C to send interrupt signal
2. Ensure proper cleanup in node destruction
3. Check for blocking operations in callbacks

## Service and Action Issues

### Service Communication
**Problem**: Service client times out waiting for service
**Solution**:
1. Verify service server is running: `ros2 service list`
2. Check service type matches: `ros2 service type /service_name`
3. Ensure both nodes are on same ROS domain

**Problem**: Service call fails
**Solution**:
1. Check request/response message structure
2. Verify parameter types match definition
3. Add error handling for failed service calls

### Action Communication
**Problem**: Action client doesn't receive feedback
**Solution**:
1. Verify action server is running: `ros2 action list`
2. Check action type matches: `ros2 action type /action_name`
3. Ensure feedback callback is properly defined

## Launch File Issues

### Launch File Execution
**Problem**: Launch file won't execute
**Solution**:
1. Check Python syntax in launch file
2. Verify package name matches actual package
3. Check executable names in launch file
4. Run with verbose output: `ros2 launch package_name launch_file.py --noninteractive --log-level debug`

**Problem**: Nodes don't start from launch file
**Solution**:
1. Check executable permissions: `chmod +x script.py`
2. Verify entry points in setup.py
3. Check for missing dependencies in package.xml

## Parameter Issues

### Parameter Loading
**Problem**: Parameters not loading from YAML file
**Solution**:
1. Verify YAML syntax is correct
2. Check parameter names match in code
3. Ensure YAML file is included in data_files in setup.py
4. Verify node names match in YAML file

**Problem**: Parameter value not changing
**Solution**:
1. Check if parameter is declared before use
2. Verify parameter name spelling
3. Ensure parameter is not overridden elsewhere

## URDF and Robot Description Issues

### URDF Loading
**Problem**: Robot model doesn't display in RViz
**Solution**:
1. Check URDF syntax: `check_urdf robot.urdf`
2. Verify joint and link names are consistent
3. Check for missing or incorrect transforms

**Problem**: Robot state publisher not working
**Solution**:
1. Ensure joint_state_publisher is running for non-fixed joints
2. Check robot_description parameter is set correctly
3. Verify TF tree is properly configured

## Agent Bridge Issues

### AI Agent Integration
**Problem**: Agent not receiving sensor data
**Solution**:
1. Verify sensor topic names match
2. Check message types are compatible
3. Ensure sensor nodes are publishing data

**Problem**: Agent commands not reaching robot
**Solution**:
1. Check command topic names match
2. Verify message types are compatible
3. Ensure robot controller is listening to command topics

## Build and Runtime Issues

### Python Package Building
**Problem**: colcon build fails
**Solution**:
1. Check Python syntax: `python3 -m py_compile script.py`
2. Verify setup.py syntax
3. Check for missing dependencies
4. Clean build: `rm -rf build install log`

### Runtime Errors
**Problem**: ModuleNotFoundError for ROS packages
**Solution**:
1. Source workspace: `source ~/ros2_ws/install/setup.bash`
2. Check PYTHONPATH includes workspace
3. Verify packages are built successfully

## Jetson-Specific Issues

### Hardware Deployment
**Problem**: Performance issues on Jetson hardware
**Solution**:
1. Reduce update rates in nodes
2. Optimize code for ARM architecture
3. Monitor resource usage: `htop` or `nvidia-smi`

**Problem**: Package compatibility issues
**Solution**:
1. Use Jetson-specific ROS 2 installation
2. Check for ARM-compatible dependencies
3. Consider cross-compilation if needed

## Simulation Issues

### Gazebo Integration
**Problem**: Robot model not loading in Gazebo
**Solution**:
1. Verify URDF is valid
2. Check Gazebo plugins are properly configured
3. Ensure gazebo_ros_pkgs are installed

**Problem**: Controllers not working in simulation
**Solution**:
1. Verify controller configuration files
2. Check controller manager is running
3. Ensure proper hardware interface setup

## Network and Multi-Machine Issues

### ROS 2 Network Setup
**Problem**: Nodes on different machines can't communicate
**Solution**:
1. Check RMW implementation: `export RMW_IMPLEMENTATION=rmw_cyclonedx_cpp`
2. Verify network configuration and firewall settings
3. Ensure ROS_DOMAIN_ID matches across machines

## Debugging Strategies

### General Debugging
1. Use `ros2 node list` to see active nodes
2. Use `ros2 topic list` to see active topics
3. Use `ros2 service list` to see active services
4. Use `ros2 action list` to see active actions
5. Use `rqt_graph` to visualize the ROS graph

### Logging and Monitoring
1. Increase log level: `--log-level debug`
2. Use `ros2 topic echo` to monitor data flow
3. Use `ros2 run rqt_console rqt_console` for log monitoring
4. Use `ros2 run rqt_plot rqt_plot` for data visualization

## Common Error Messages and Solutions

### "Failed to load entry point" Error
**Cause**: Missing or incorrect entry point in setup.py
**Solution**: Verify console_scripts in setup.py match actual executable names

### "Could not find a package configuration file" Error
**Cause**: Missing dependency or incorrect package.xml
**Solution**: Install missing packages or update package.xml dependencies

### "No executable found" Error
**Cause**: Executable not built or not in PATH
**Solution**: Check setup.py entry_points and ensure files are executable

## Performance Optimization Tips

1. Use appropriate QoS profiles for your use case
2. Limit message publishing rate to necessary frequency
3. Use efficient data structures in callbacks
4. Consider threading for I/O operations
5. Profile code to identify bottlenecks

## Getting Help

If issues persist:
1. Check ROS 2 documentation: https://docs.ros.org/
2. Search ROS Answers: https://answers.ros.org/
3. Join ROS Discourse: https://discourse.ros.org/
4. Check GitHub issues for relevant packages
5. Consider creating a minimal reproducible example

## Known Issues

- [ ] List any known issues with specific examples
- [ ] Document workarounds for temporary issues
- [ ] Note any platform-specific limitations

## Update History
- Version 1.0: Initial troubleshooting guide
- Last updated: [Date]
- ROS 2 Distribution: Humble Hawksbill