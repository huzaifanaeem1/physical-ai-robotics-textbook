# RAG Chatbot for Physical AI & Humanoid Robotics Textbook

This is a Hugging Face Space deployment of a RAG (Retrieval-Augmented Generation) Chatbot system for the Physical AI & Humanoid Robotics textbook. The system uses Google Gemini for embeddings and answer generation.

## Features

- Global Q&A over the entire textbook content
- Local Q&A restricted to specific text selections
- Citation system returning source metadata and URLs
- Session management with conversation history
- Integration with Qdrant vector database and Neon Postgres

## Tech Stack

- FastAPI: Web framework
- Google Gemini: Embeddings and text generation
- Qdrant: Vector database for document chunks
- Neon Postgres: Session and message storage
- SQLAlchemy: Database ORM

## Hugging Face Deployment

This Space is designed to run on Hugging Face's container-based Spaces with Docker.

### Required Secrets

Add the following secrets in your Hugging Face Space settings:

- `GEMINI_API_KEY`: Your Google Gemini API key
- `QDRANT_URL`: Your Qdrant Cloud URL
- `QDRANT_API_KEY`: Your Qdrant API key
- `DATABASE_URL`: Your Neon Postgres connection string

### Environment Variables

The following environment variables are used:
- `QDRANT_COLLECTION`: Name of the Qdrant collection (default: book_chunks)

## API Endpoints

- `POST /api/ask`: Global Q&A with retrieval from textbook
- `POST /api/ask-selected`: Q&A based only on selected text
- `GET /api/history/{session_id}`: Get conversation history
- `GET /health`: Health check endpoint

## Ingestion Process

To ingest textbook content after deployment:

1. Access the Space terminal or connect via the Hugging Face API
2. Place your markdown files in a `docs/` directory
3. Run the ingestion script:
   ```bash
   python ingest.py
   ```

This will chunk the documents, generate embeddings using Gemini, and upload them to Qdrant.

## Architecture

The system consists of:
1. **Backend (FastAPI)**: Handles RAG processing, session management, and API endpoints
2. **Services Layer**: Modular services for embeddings, retrieval, generation, and logging
3. **Database Layer**: Async SQLAlchemy models for sessions and messages
4. **Utilities**: Text chunking, markdown cleaning, and metadata extraction

## Frontend Integration

The backend provides API endpoints that can be integrated with any frontend, including Docusaurus documentation sites. The API is CORS-enabled to allow cross-origin requests.

## Performance Optimizations

- Optimized for Hugging Face CPU Basic tier
- Async database operations
- Efficient embedding and retrieval
- Proper resource management

## Security

- Environment variables for sensitive data
- CORS configured for frontend integration
- Input validation on all endpoints
- Proper error handling without information leakage

## Troubleshooting

### Health Check
Visit `/health` endpoint to verify the service status and required environment variables.

### Common Issues
- Ensure all required secrets are set in Hugging Face Space settings
- Verify Qdrant and Postgres connections
- Check Gemini API key permissions
- Confirm ingestion has completed if queries return no results