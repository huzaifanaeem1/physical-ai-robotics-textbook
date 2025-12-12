@echo off
REM Build script for Docusaurus site with RAG chatbot integration

REM Navigate to the docusaurus project directory
cd docusaurus-project

REM Install dependencies
npm install

REM Build the static site
npm run build

echo Build completed successfully! The site is available in the build/ directory.
pause