# Production Deployment Configuration

## Environment Variables for Production

For production deployment, you need to set the following environment variables in your Vercel project settings:

### For the Docusaurus Frontend (Vercel deployment settings):
```
BACKEND_URL=https://your-production-backend-url.com/api
```

### For the RAG Backend (if deployed separately):
```
GEMINI_API_KEY=your_google_gemini_api_key
QDRANT_URL=your_qdrant_url
QDRANT_API_KEY=your_qdrant_api_key
QDRANT_COLLECTION=book_chunks
DATABASE_URL=your_postgresql_database_url
BACKEND_URL=https://your-production-backend-url.com
```

## Vercel Configuration

The `vercel.json` file is already configured for deployment. Make sure your production environment variables are set in the Vercel dashboard.

## Deployment Steps

1. **Deploy the RAG Backend** (if not using existing deployment):
   - Push your backend code to a repository
   - Connect to Vercel or deploy using your preferred platform
   - Set the required environment variables in the deployment settings

2. **Deploy the Docusaurus Frontend**:
   - Connect your repository to Vercel
   - Set the BACKEND_URL environment variable to point to your production backend
   - Build and deploy

3. **Verify the Integration**:
   - Check that the chatbot widget appears on all pages
   - Test both "Global Q&A" and "Ask Selected" modes
   - Verify conversation history functionality

## API Endpoints Used

The chatbot widget communicates with these backend endpoints:

- `POST /api/ask` - For general questions about the textbook
- `POST /api/ask-selected` - For questions about selected text
- `GET /api/history/{session_id}` - To retrieve conversation history

## Troubleshooting

If the chatbot doesn't appear in production:
1. Verify that the BACKEND_URL environment variable is correctly set
2. Check browser console for any JavaScript errors
3. Verify that CORS is properly configured on your backend
4. Ensure that static files (js/ragChatWidget.js and css/ragChatWidget.css) are accessible

If API calls fail:
1. Check that the backend is accessible from the frontend domain
2. Verify that the backend URL is correctly configured
3. Check that the backend API endpoints are responding correctly