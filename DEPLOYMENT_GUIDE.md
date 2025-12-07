# Hugging Face Spaces Deployment Guide for RAG Chatbot

This guide provides step-by-step instructions to deploy the RAG Chatbot to Hugging Face Spaces.

## Prerequisites

- A Hugging Face account
- Access to Google Gemini API (API key)
- Qdrant Cloud account (URL and API key)
- Neon Postgres database (connection string)

## Step 1: Prepare Your Hugging Face Repository

1. Create a new Hugging Face Space with the following settings:
   - Type: "Docker"
   - SDK: "Docker"
   - Hardware: "CPU Basic" (or higher if needed)

2. Clone the Space repository to your local machine:
   ```bash
   git clone https://huggingface.co/spaces/your-username/your-space-name
   ```

## Step 2: Copy Files to Your Space

Copy all the necessary files to your Space repository:

```
your-space-repo/
├── Dockerfile
├── start.sh
├── space.yml
├── HUGGINGFACE_README.md
├── rag-backend/
│   ├── main.py
│   ├── requirements.txt
│   ├── init_db.py
│   ├── ingest.py
│   ├── .env.example
│   ├── README.md
│   ├── routes/
│   ├── services/
│   ├── db/
│   └── utils/
```

## Step 3: Configure Environment Variables

1. Go to your Space settings on Hugging Face
2. Navigate to the "Secrets" tab
3. Add the following secrets:

```
GEMINI_API_KEY = your_actual_gemini_api_key
QDRANT_URL = your_actual_qdrant_url
QDRANT_API_KEY = your_actual_qdrant_api_key
DATABASE_URL = your_actual_postgres_connection_string
```

## Step 4: Update Space Configuration

Make sure your `space.yml` file is properly configured:

```yaml
type: docker
sdk: docker
app_port: 8000
secrets:
  - key: GEMINI_API_KEY
    name: Gemini API Key
    description: Your Google Gemini API key for embeddings and text generation
  - key: QDRANT_URL
    name: Qdrant URL
    description: Your Qdrant Cloud URL
  - key: QDRANT_API_KEY
    name: Qdrant API Key
    description: Your Qdrant API key
  - key: DATABASE_URL
    name: Database URL
    description: Your Postgres database connection string
hardware:
  cpu: True
  memory: 16gb
  accelerator: none
```

## Step 5: Push Files to Hugging Face

```bash
cd your-space-repo
git add .
git commit -m "Add RAG Chatbot application"
git push origin main
```

## Step 6: Monitor Deployment

1. Check the Space logs to ensure the application starts successfully
2. Look for any error messages related to:
   - Missing environment variables
   - Database connection issues
   - Qdrant connection issues
   - Gemini API access

## Step 7: Ingest Your Textbook Content

After the Space is running successfully:

1. Access the Space terminal (if available) or use the Hugging Face API
2. Create a `docs/` directory in the Space
3. Add your textbook markdown files to the `docs/` directory
4. Run the ingestion script:
   ```bash
   python ingest.py
   ```

## Step 8: Test the API

Once ingestion is complete, test the API endpoints:

- `GET /health` - Check if the service is running
- `POST /api/ask` - Test global Q&A functionality
- `POST /api/ask-selected` - Test selected text Q&A
- `GET /api/history/{session_id}` - Test history retrieval

## Frontend Integration

To integrate with a Docusaurus site:

1. Update the backend URL in your frontend to point to your deployed Space URL
2. Example: `https://your-username-your-space-name.hf.space/api`

## Troubleshooting

### Common Issues:

1. **Environment Variables Not Loading**:
   - Ensure secrets are properly set in Space settings
   - Check that secret names match exactly

2. **Database Connection Issues**:
   - Verify DATABASE_URL format is correct
   - Ensure the database allows connections from Hugging Face IPs

3. **Qdrant Connection Issues**:
   - Check QDRANT_URL and QDRANT_API_KEY
   - Verify Qdrant Cloud allows external connections

4. **Gemini API Issues**:
   - Confirm GEMINI_API_KEY has proper permissions
   - Check API quotas and billing

### Health Check:

Use the `/health` endpoint to verify all required environment variables are set and services are accessible.

## Scaling Considerations

- The application is optimized for CPU Basic tier
- For higher traffic, consider upgrading to CPU Plus or GPU tier
- Monitor resource usage and scale accordingly

## Security Best Practices

- Never commit credentials to version control
- Use Hugging Face Secrets for all sensitive information
- Implement rate limiting if needed
- Use HTTPS for all connections
- Regularly rotate API keys

## Updating the Application

To update your deployed Space:

1. Make changes to your local repository
2. Commit and push changes:
   ```bash
   git add .
   git commit -m "Update message"
   git push origin main
   ```
3. The Space will automatically rebuild and redeploy

Your RAG Chatbot is now deployed and ready to use!