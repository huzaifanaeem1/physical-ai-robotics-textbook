---
sidebar_position: 3
title: Lab 3 - Navigation Planning Concepts
---

# Lab 3 - Navigation Planning Concepts

## Objective

In this lab, you will explore the conceptual aspects of navigation planning using Nav2. You will create a simple room diagram, define goal positions, conceptually create global and local plans, explain how a humanoid would follow paths in simulation, and verify path feasibility.

## Prerequisites

- Understanding of basic navigation concepts
- Knowledge of coordinate systems and path planning
- Familiarity with humanoid robot constraints

## Duration

Estimated time: 60-75 minutes

## Tools Required

- Paper and pencil or digital drawing tool
- Understanding of Nav2 concepts
- Knowledge of humanoid locomotion constraints

## Step-by-Step Instructions

### Step 1: Create Simple Room Diagram

1. **Draw a rectangular room** with dimensions 8m × 6m:
   ```
   +-------------------------+
   |                         |
   |    [Start]              |
   |      •                  |
   |                         |
   |           [Obstacle]    |
   |           ████████      |
   |                         |
   |                    •    |
   |                   [Goal] |
   |                         |
   +-------------------------+
   ```

2. **Add static obstacles**:
   - Draw a 1m × 1.5m rectangular obstacle near the center
   - Add a 0.5m × 2m obstacle near the right wall
   - Mark narrow passages around obstacles

3. **Define coordinate system**:
   - Set bottom-left corner as (0,0)
   - X-axis pointing right, Y-axis pointing up
   - Mark grid lines every 1 meter for reference

4. **Mark robot starting position**:
   - Place at (1, 1) facing toward the goal
   - Indicate robot size (e.g., 0.6m diameter for wheeled, or consider humanoid footprint)

### Step 2: Define Goal Position

1. **Set primary goal location**:
   - Position at (7, 5) in the top-right corner
   - Mark with distinctive symbol (star, flag, or "G")
   - Consider alternative goals if primary path is blocked

2. **Define goal criteria**:
   - **Position tolerance**: ±0.2m from goal coordinates
   - **Orientation requirement**: Robot should face a specific direction at goal
   - **Approach constraints**: Consider how robot should approach the goal

3. **Mark secondary goals** (optional):
   - Alternative destination at (6, 1) in bottom-right
   - Charging station at (1, 5) in top-left
   - Waypoint at (4, 3) for path planning practice

### Step 3: Create Global + Local Plans Conceptually

#### Global Plan Creation

1. **Identify navigable space**:
   - Mark areas where robot can safely move
   - Consider robot size and safety margins around obstacles
   - Identify potential bottlenecks and narrow passages

2. **Compute optimal path** using conceptual A* approach:
   - Start from current position (1, 1)
   - Consider cost of moving through each area (distance + obstacle proximity)
   - Find path that minimizes total cost while avoiding obstacles
   - Result: Waypoints at (1,1) → (2,1) → (2,3) → (4,3) → (6,4) → (7,5)

3. **Global plan visualization**:
   ```
   +-------------------------+
   |                         |
   |    S                   |
   |    *                    |
   |     *        [Obstacle] |
   |      *      ████████    |
   |       *               * |
   |        *             *  |
   |         *           *   |
   |          *         G    |
   |                         |
   +-------------------------+
   ```

#### Local Plan Considerations

1. **Conceptual local planning**:
   - **Short-term trajectory**: Generate immediate movement commands (next 1-2 meters)
   - **Obstacle avoidance**: React to unexpected obstacles not in global map
   - **Dynamic constraints**: Consider robot's turning radius and acceleration limits
   - **Safety margins**: Maintain buffer from obstacles for safety

2. **Humanoid-specific constraints**:
   - **Footstep planning**: Each step must be on stable, traversable terrain
   - **Balance requirements**: Center of mass must remain within support polygon
   - **Step size limits**: Maximum distance between consecutive foot placements
   - **Turning considerations**: Different turning capabilities than wheeled robots

### Step 4: Explain How a Humanoid Would Follow the Path in Simulation

1. **Path following strategy for humanoid**:
   - **Footstep planning**: Plan each foot placement along the path
   - **Balance maintenance**: Ensure center of mass remains stable during movement
   - **Step timing**: Coordinate step timing with balance control
   - **Gaze control**: Direct gaze toward upcoming path segments

2. **Humanoid-specific navigation considerations**:
   - **Support polygon**: Maintain feet positions to ensure balance
   - **Zero Moment Point (ZMP)**: Keep ZMP within support polygon during walking
   - **Capture point**: Ensure robot can stop safely if perturbed
   - **Step adaptation**: Adjust foot placement based on terrain and obstacles

3. **Simulation behavior**:
   - **Smooth motion**: Humanoid moves with natural walking gait
   - **Obstacle awareness**: Adjusts path when encountering unexpected obstacles
   - **Goal approach**: Slows down and orients properly when approaching goal
   - **Safety checks**: Maintains balance and avoids collisions throughout

### Step 5: Verify Path Feasibility

1. **Static feasibility check**:
   - **Collision verification**: Ensure path doesn't intersect with known obstacles
   - **Clearance check**: Verify adequate space for robot body and movement
   - **Turning feasibility**: Confirm robot can navigate all turns and curves
   - **Step feasibility**: For humanoid, verify each potential foot placement is stable

2. **Dynamic feasibility assessment**:
   - **Velocity constraints**: Path should be traversable within robot speed limits
   - **Acceleration limits**: Ensure path doesn't require impossible accelerations
   - **Balance constraints**: For humanoid, ensure path maintains dynamic balance
   - **Energy efficiency**: Consider energy consumption for different path options

3. **Humanoid-specific feasibility**:
   - **Foot placement feasibility**: Every potential step location must be stable
   - **Terrain requirements**: Surface must support foot placement and weight bearing
   - **Step sequence validity**: Step pattern must maintain bipedal stability
   - **Recovery capability**: Path should allow for balance recovery if needed

4. **Safety verification**:
   - **Buffer zones**: Maintain safe distance from obstacles
   - **Emergency stops**: Ensure robot can stop safely if needed
   - **Alternative routes**: Have backup paths available if primary route becomes blocked
   - **Goal accessibility**: Confirm goal location is actually reachable

## Expected Output

When you complete this lab, you should have:
- A room diagram with obstacles, start, and goal positions
- A conceptual global path showing optimal route
- Understanding of local planning considerations
- Knowledge of humanoid-specific navigation constraints
- Verification that your planned path is feasible for the robot

## Verification Checklist

- [ ] Room diagram created with appropriate dimensions and obstacles
- [ ] Goal position clearly defined with coordinates
- [ ] Global path planned avoiding all static obstacles
- [ ] Local planning considerations identified
- [ ] Humanoid-specific constraints incorporated
- [ ] Path feasibility verified for both static and dynamic constraints
- [ ] Safety margins considered in path planning
- [ ] Alternative paths identified for robust navigation

## Troubleshooting Concepts

### Common Navigation Planning Issues

**Path infeasibility**: Planned path cannot be executed by the robot
- **Solution**: Consider robot kinematic constraints, increase safety margins, or replan with robot-specific parameters

**Local minima**: Robot gets stuck in area where all paths seem worse
- **Solution**: Implement exploration behaviors, use more sophisticated planners, or add random perturbations

**Dynamic obstacle conflicts**: Moving obstacles block planned path
- **Solution**: Implement reactive planning, maintain alternative routes, or increase local planning frequency

**Humanoid balance issues**: Planned path violates balance constraints
- **Solution**: Consider balance requirements in path planning, use footstep planning algorithms, or add balance recovery behaviors

**Computation time**: Planning algorithm takes too long to compute
- **Solution**: Use hierarchical planning, simplify environment representation, or optimize algorithm implementation

## Extensions

After completing this lab, try these extensions:
- Add dynamic obstacles and plan for their movement
- Consider multiple robots navigating in the same space
- Plan for different robot types with varying capabilities
- Implement a simple path optimization algorithm

## Summary

In this lab, you explored the conceptual aspects of navigation planning using Nav2 principles. You created a room diagram, planned paths considering both global and local constraints, and understood how a humanoid robot would follow these paths while maintaining balance and safety. You also learned to verify path feasibility considering both static obstacles and dynamic constraints. This foundational understanding is crucial for implementing real navigation systems using Nav2 and Isaac technologies.