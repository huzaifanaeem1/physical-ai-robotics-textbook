# Vercel Deployment Instructions

Follow these steps to deploy your Docusaurus website to Vercel:

## 1. Install Vercel CLI (if not already installed)

```bash
npm install -g vercel
```

## 2. Login to Vercel

```bash
vercel login
```

## 3. Navigate to Your Project Directory

```bash
cd docusaurus-project
```

## 4. Deploy to Vercel

### Option A: Deploy with Default Settings
```bash
vercel --prod
```

### Option B: Deploy with Custom Settings
```bash
vercel --prod --public
```

## 5. Configure Build Settings (if prompted)

When prompted during deployment, use these settings:
- Framework: `Docusaurus`
- Build Command: `npm run build`
- Output Directory: `build`
- Root Directory: `.` (current directory)

## 6. Environment Variables (if needed)

If your site requires environment variables, add them during deployment or in the Vercel dashboard:
- No special environment variables are needed for this Docusaurus + RAG Chatbot setup

## 7. Verify Deployment

After deployment completes:
1. Copy the deployment URL (e.g., `https://physical-ai-robotics-textbook.vercel.app`)
2. Visit the URL to confirm the site is working
3. Test the RAG chatbot functionality:
   - Click the chat button in the bottom-right corner
   - Test both Global Q&A and Selected Text modes
   - Verify citations work properly

## 8. Link to GitHub Repository (Recommended)

For automatic deployments:
1. Go to your Vercel dashboard: https://vercel.com/dashboard
2. Select your project
3. Go to Settings → Git
4. Link your GitHub repository for automatic deployments on push

## 9. Update docusaurus.config.js (After Deployment)

Once you have your Vercel URL, update the `url` field in `docusaurus.config.js`:

```js
// Set the production url of your site here
url: 'https://your-project-name.vercel.app', // Replace with your actual Vercel URL
```

Then redeploy:
```bash
vercel --prod
```

## Troubleshooting

### If the chatbot doesn't appear:
- Check that `static/js/ragChatWidget.js` and `static/css/ragChatWidget.css` are in the correct locations
- Verify that `src/theme/Root.js` exists and is properly loading the widget
- Check browser console for JavaScript errors

### If API calls fail:
- Verify the backend URL in `ragChatWidget.js` is correct
- Ensure your Hugging Face Space is running and accessible
- Check CORS settings on your backend

### Build errors:
- Make sure all dependencies are properly installed
- Check that your Docusaurus project builds locally with `npm run build`