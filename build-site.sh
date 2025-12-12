#!/bin/bash
# Build script for Docusaurus site with RAG chatbot integration

# Navigate to the docusaurus project directory
cd docusaurus-project

# Install dependencies
npm install

# Build the static site
npm run build

echo "Build completed successfully! The site is available in the build/ directory."