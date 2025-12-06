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
          label: 'Module 2: Digital Twin (Weeks 6-7)',
          items: [
            'modules/module-2-digital-twin/module-2-digital-twin-index',
          ],
        },
        {
          type: 'category',
          label: 'Module 3: NVIDIA Isaac (Weeks 8-10)',
          items: [
            'modules/module-3-isaac/module-3-isaac-index',
          ],
        },
        {
          type: 'category',
          label: 'Module 4: VLA & Humanoids (Weeks 11-13)',
          items: [
            'modules/module-4-vla/module-4-vla-index',
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

