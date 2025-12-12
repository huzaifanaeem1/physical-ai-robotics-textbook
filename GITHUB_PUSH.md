# GitHub Push Instructions

Follow these steps to push your Docusaurus website to GitHub:

## 1. Initialize Git Repository (if not already done)

```bash
cd docusaurus-project
git init
git add .
git commit -m "Initial commit: Docusaurus website with RAG Chatbot integration"
```

## 2. Connect to GitHub Repository

```bash
# Replace with your actual repository URL
git remote add origin https://github.com/huzaifanaeem1/physical-ai-robotics-textbook.git
```

## 3. Push to GitHub

```bash
git branch -M main
git push -u origin main
```

## 4. Verify Files

Ensure all required files are pushed:
- `static/js/ragChatWidget.js`
- `static/css/ragChatWidget.css`
- `src/theme/Root.js`
- `src/css/custom.css`
- Updated `docusaurus.config.js`

## 5. Verify GitHub Repository

Check that your GitHub repository contains all the files:
- Visit https://github.com/huzaifanaeem1/physical-ai-robotics-textbook
- Confirm all files are present in the repository