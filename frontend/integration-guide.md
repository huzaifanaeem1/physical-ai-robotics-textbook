# Docusaurus Integration Guide for RAG Chatbot Widget

This guide explains how to integrate the RAG Chatbot widget into your Docusaurus documentation site.

## Prerequisites

- A running instance of the RAG Chatbot backend (e.g., deployed on Hugging Face Spaces)
- The backend should be accessible from your frontend (CORS configured if needed)

## Step 1: Add the Widget Files

1. Copy the widget JavaScript file to your Docusaurus `static/js/` directory:
   ```
   static/
   └── js/
       └── ragChatWidget.js
   ```

2. Copy the CSS file to your Docusaurus `static/css/` directory (optional, for enhanced styling):
   ```
   static/
   └── css/
       └── ragChatWidget.css
   ```

## Step 2: Include the Widget in Your Site

### Option A: Using Docusaurus Config (Recommended)

Add the script to your `docusaurus.config.js` file:

```javascript
module.exports = {
  // ... your existing config
  scripts: [
    // ... your existing scripts
    {
      src: '/js/ragChatWidget.js',
      async: true,
      defer: true
    }
  ],
  stylesheets: [
    // ... your existing stylesheets
    {
      href: '/css/ragChatWidget.css',
      type: 'text/css'
    }
  ]
};
```

### Option B: Direct HTML Injection

Add the following to your `docusaurus.config.js` in the `headTags` section:

```javascript
module.exports = {
  // ... your existing config
  headTags: [
    {
      tagName: 'script',
      attributes: {
        src: '/js/ragChatWidget.js',
        async: true
      }
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'stylesheet',
        type: 'text/css',
        href: '/css/ragChatWidget.css'
      }
    }
  ]
};
```

## Step 3: Configure the Backend URL

### For Hugging Face Deployment

If your backend is deployed on Hugging Face Spaces, update the backend URL in the widget. Replace the default URL in the JavaScript file:

```javascript
// In ragChatWidget.js, update this line:
this.backendUrl = process.env.BACKEND_URL || 'https://your-username-your-space-name.hf.space/api';
```

### Alternative: Environment Configuration

If you're using environment variables in your Docusaurus build process:

```javascript
// In your docusaurus.config.js
const BACKEND_URL = process.env.BACKEND_URL || 'https://your-username-your-space-name.hf.space/api';

// Then use it in your scripts
headTags: [
  {
    tagName: 'script',
    attributes: {
      src: `/js/ragChatWidget.js?backend=${encodeURIComponent(BACKEND_URL)}`,
      async: true
    }
  }
]
```

## Step 4: Customize Widget Behavior (Optional)

The widget has several configurable options that can be set via JavaScript before the widget initializes. You can create a small script that runs before the widget to customize it:

```html
<script>
  // Set the backend URL before the widget loads
  window.RAG_CHAT_CONFIG = {
    backendUrl: 'https://your-username-your-space-name.hf.space/api'
  };
</script>
```

## Step 5: Test the Integration

1. Build and start your Docusaurus site:
   ```bash
   npm run build
   npm run serve
   # or for development
   npm run start
   ```

2. Navigate to any page on your documentation site
3. You should see the chat button in the bottom-right corner
4. Click it to open the chat panel and test the functionality

## Troubleshooting

### Widget not appearing
- Check that the JavaScript file is correctly placed in the `static/js/` directory
- Verify that the script is being loaded by checking the browser console for errors
- Make sure your Docusaurus build includes the static files

### Backend connection errors
- Verify that your Hugging Face Space is running and accessible
- Check CORS settings on your backend (already configured for Hugging Face)
- Ensure the backend URL is correctly configured
- Check browser console for network errors

### Styling conflicts
- The widget uses specific IDs and classes to avoid conflicts
- If you have conflicting styles, the CSS file can be customized
- The widget uses z-index 1000+ to appear above other content

## Security Considerations

- The widget stores session IDs in localStorage, which is appropriate for anonymous sessions
- Ensure your backend properly validates requests
- Consider implementing rate limiting on your backend API endpoints
- Use HTTPS for production deployments (automatic with Hugging Face Spaces)