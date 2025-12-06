// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Physical AI & Humanoid Robotics Textbook',
  tagline: 'A comprehensive guide to embodied intelligence and humanoid systems.',
  favicon: 'img/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  // This will be updated with the Vercel deployment URL after deployment
  url: 'https://your-vercel-project-url.vercel.app',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For Vercel deployment, use '/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'huzaifanaeem1', // Usually your GitHub org/user name.
  projectName: 'physical-ai-robotics-textbook', // Usually your repo name.
  trailingSlash: false,

  onBrokenLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/huzaifanaeem1/physical-ai-robotics-textbook',
        },
        blog: false, // Disable blog for this textbook
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/docusaurus-social-card.jpg',
      colorMode: {
        defaultMode: 'light',
        disableSwitch: false,
        respectPrefersColorScheme: false,
      },
      navbar: {
        title: 'Physical AI & Humanoid Robotics',
        logo: {
          alt: 'Textbook Logo',
          src: 'img/logo.svg', // Assuming a logo will be placed here
        },
        items: [
          {
            to: 'docs/intro',
            position: 'left',
            label: 'Textbook',
          },
          {
            to: 'docs/setup-guides',
            position: 'left',
            label: 'Setup Guides',
          },
          {
            href: 'https://github.com/huzaifanaeem1/physical-ai-robotics-textbook',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'light',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Introduction',
                to: '/docs/intro',
              },
              {
                label: 'ROS 2 Fundamentals',
                to: '/docs/module-1-ros2',
              },
              {
                label: 'Glossary',
                to: '/docs/glossary',
              },
            ],
          },
          {
            title: 'Community', // Keep default community links or customize as needed
            items: [
              {
                label: 'Stack Overflow',
                href: 'https://stackoverflow.com/questions/tagged/docusaurus',
              },
              {
                label: 'Discord',
                href: 'https://discordapp.com/invite/docusaurus',
              },
              {
                label: 'X',
                href: 'https://x.com/docusaurus',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/huzaifanaeem1/physical-ai-robotics-textbook',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Physical AI & Humanoid Robotics Textbook. Built with Docusaurus.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
