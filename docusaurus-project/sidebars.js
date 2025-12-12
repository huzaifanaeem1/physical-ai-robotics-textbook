// @ts-check

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.

 @type {import('@docusaurus/plugin-content-docs').SidebarsConfig}
 */
const sidebars = {
  tutorialSidebar: [
    'intro',
    {
      type: 'category',
      label: 'Setup Guides',
      items: [
        'setup-guides/setup-guides-index',
        'setup-guides/setup-guides-hardware-setup',
        'setup-guides/setup-guides-software-setup',
        'setup-guides/setup-guides-cloud-bridge',
      ],
    },
    {
      type: 'category',
      label: 'Modules',
      items: [
        {
          type: 'category',
          label: 'Module 1: ROS 2 (Weeks 3-5)',
          items: [
            'module-1-ros2/module-1-ros2-introduction',
            {
              type: 'category',
              label: 'Lesson 1: Nodes & Topics',
              items: [
                'module-1-ros2/module-1-ros2-nodes-topics',
                'module-1-ros2/labs/module-1-ros2-lab-nodes-topics',
              ],
            },
            {
              type: 'category',
              label: 'Lesson 2: Services & Actions',
              items: [
                'module-1-ros2/module-1-ros2-services-actions',
                'module-1-ros2/labs/module-1-ros2-lab-services-actions',
              ],
            },
            {
              type: 'category',
              label: 'Lesson 3: rclpy Patterns',
              items: [
                'module-1-ros2/module-1-ros2-rclpy-patterns',
                // No lab for this lesson yet
              ],
            },
            {
              type: 'category',
              label: 'Lesson 4: URDF Robot Description',
              items: [
                'module-1-ros2/module-1-ros2-urdf-robot-description',
                // No lab for this lesson yet
              ],
            },
            {
              type: 'category',
              label: 'Lesson 5: Launch Files & Parameters',
              items: [
                'module-1-ros2/module-1-ros2-launch-files-params',
                'module-1-ros2/labs/module-1-ros2-lab-launch-params',
              ],
            },
            {
              type: 'category',
              label: 'Lesson 6: Agent to ROS Bridge',
              items: [
                'module-1-ros2/module-1-ros2-agent-ros-bridge',
                'module-1-ros2/labs/module-1-ros2-lab-agent-bridge',
              ],
            },
            {
              type: 'category',
              label: 'Capstone Project',
              items: [
                'module-1-ros2/module-1-ros2-capstone',
              ],
            },
            {
              type: 'category',
              label: 'Hardware Notes',
              items: [
                'module-1-ros2/jetson-notes',
              ],
            },
          ],
        },
    {
  type: 'category',
  label: 'Module 2: Digital Twin (Weeks 6–7)',
  collapsible: true,
  collapsed: true,
  items: [
    'module-2-digital-twin/intro',
    'module-2-digital-twin/lesson-1-digital-twin',
    'module-2-digital-twin/lesson-2-physics',
    'module-2-digital-twin/lesson-3-environments',
    'module-2-digital-twin/lesson-4-sensors',
    'module-2-digital-twin/lesson-5-unity-visualization',
    'module-2-digital-twin/lesson-6-ai-loop',
    'module-2-digital-twin/capstone-mini-project',
  ],
},

        {
          type: 'category',
          label: 'Module 3: NVIDIA Isaac (Weeks 8-10)',
          items: [
            'module-3-isaac/intro',
            'module-3-isaac/lesson-1-ai-brain',
            'module-3-isaac/lesson-2-isaac-sim',
            'module-3-isaac/lesson-3-isaac-ros',
            'module-3-isaac/lesson-4-nav2',
            'module-3-isaac/lesson-5-control-loop',
            'module-3-isaac/lesson-6-integration',
            'module-3-isaac/lesson-7-capstone',
            {
              type: 'category',
              label: 'Labs',
              items: [
                'module-3-isaac/labs/module-3-isaac-lab-1-synthetic-data',
                'module-3-isaac/labs/module-3-isaac-lab-2-perception',
                'module-3-isaac/labs/module-3-isaac-lab-3-navigation',
              ],
            },
          ],
        },
        {
          type: 'category',
          label: 'Module 4: VLA & Humanoids (Weeks 11-13)',
          items: [
            'module-4-vla-humanoid-robotics/module-4-index',
            {
              type: 'category',
              label: 'Lesson 1: VLA Introduction',
              items: [
                'module-4-vla-humanoid-robotics/lesson-1-introduction-vla',
              ],
            },
            {
              type: 'category',
              label: 'Lesson 2: Voice-to-Text Processing',
              items: [
                'module-4-vla-humanoid-robotics/lesson-2-voice-text',
              ],
            },
            {
              type: 'category',
              label: 'Lesson 3: Cognitive Planning',
              items: [
                'module-4-vla-humanoid-robotics/lesson-3-cognitive-llm-planning',
              ],
            },
            {
              type: 'category',
              label: 'Lesson 4: Vision & Object Grounding',
              items: [
                'module-4-vla-humanoid-robotics/lesson-4-vision-object-grounding',
              ],
            },
            {
              type: 'category',
              label: 'Lesson 5: ROS 2 Action Execution',
              items: [
                'module-4-vla-humanoid-robotics/lesson-5-ros2-action-execution',
              ],
            },
            {
              type: 'category',
              label: 'Lesson 6: Integrated VLA Pipeline',
              items: [
                'module-4-vla-humanoid-robotics/lesson-6-integrated-vla-pipeline',
              ],
            },
            {
              type: 'category',
              label: 'Lesson 7: Capstone Guide',
              items: [
                'module-4-vla-humanoid-robotics/lesson-7-capstone-guide',
              ],
            },
            {
              type: 'category',
              label: 'Labs',
              items: [
                'module-4-vla-humanoid-robotics/module-4-vla-humanoid-robotics-lab-1-voice-command',
                'module-4-vla-humanoid-robotics/module-4-vla-humanoid-robotics-lab-2-language-plan',
                'module-4-vla-humanoid-robotics/module-4-vla-humanoid-robotics-lab-3-vision-planning',
              ],
            },
            {
              type: 'category',
              label: 'Capstone Project',
              items: [
                'module-4-vla-humanoid-robotics/autonomous-humanoid-project',
              ],
            },
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'References',
      items: [
        'references/glossary',
      ],
    },
  ],
};

export default sidebars;

