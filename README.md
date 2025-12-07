# Physical AI & Humanoid Robotics Textbook - RAG Chatbot

This repository contains the implementation of a RAG (Retrieval-Augmented Generation) Chatbot system for the Physical AI & Humanoid Robotics textbook. The system allows students to ask questions about the textbook content and receive accurate, cited answers.

## Architecture

The system consists of two main components:

1. **Backend (FastAPI)**: Handles RAG processing, session management, and API endpoints
2. **Frontend Widget**: Docusaurus-integrated chat interface with text selection capabilities

### Tech Stack

- **Backend**: FastAPI, Google Gemini, Qdrant, Neon Postgres
- **Frontend**: JavaScript widget for Docusaurus integration
- **AI Models**: Google Gemini embedding-001 and gemini-pro

## Features

- **Global Q&A**: Ask questions about the entire textbook content
- **Local Q&A**: Ask questions about specific selected text
- **Citation System**: Answers include links to relevant textbook sections
- **Session Management**: Conversation history maintained with session IDs
- **Text Selection**: Automatically detects and uses selected text for context

## Project Structure

```
rag-backend/
├── main.py                 # FastAPI entry point
├── routes/                 # API endpoints
├── services/               # Business logic (embeddings, retrieval, generation)
├── db/                     # Database models and connection
├── utils/                  # Utilities (chunking, cleaning)
├── ingest.py              # Document ingestion pipeline
├── requirements.txt       # Python dependencies
├── .env.example          # Environment variables template
└── README.md             # Backend documentation

frontend/
├── static/js/             # Chat widget JavaScript
├── static/css/            # Chat widget CSS
└── integration-guide.md   # Docusaurus integration guide
```

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd rag-backend
   ```

2. Install Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   # Edit .env with your API keys and configuration
   ```

4. Initialize the database:
   ```bash
   python init_db.py
   ```

5. Run the backend:
   ```bash
   uvicorn main:app --reload --port 8000
   ```

### Ingesting Textbook Content

1. Place your markdown textbook files in a `docs/` directory
2. Run the ingestion script:
   ```bash
   python ingest.py
   ```

### Frontend Integration

1. Copy the files in `frontend/static/` to your Docusaurus `static/` directory
2. Follow the integration guide in `frontend/integration-guide.md` to add the widget to your Docusaurus site

## API Endpoints

- `POST /api/ask`: Global Q&A with retrieval from textbook
- `POST /api/ask-selected`: Q&A based only on selected text
- `GET /api/history/{session_id}`: Get conversation history
- `GET /health`: Health check endpoint

## Environment Variables

- `GEMINI_API_KEY`: Google Gemini API key
- `QDRANT_URL`: Qdrant Cloud URL
- `QDRANT_API_KEY`: Qdrant API key
- `DATABASE_URL`: Postgres database connection string
- `QDRANT_COLLECTION`: Name of the Qdrant collection (default: book_chunks)

## Deployment

### Backend Deployment

The backend is designed for deployment on platforms like Hugging Face Spaces or cloud providers:

1. Ensure all environment variables are configured
2. Install dependencies
3. Run with a WSGI/ASGI server like uvicorn

### Frontend Deployment

The frontend widget is designed for integration with Docusaurus documentation sites. See the integration guide for details.

## Development

### Running in Development Mode

1. Backend:
   ```bash
   cd rag-backend
   uvicorn main:app --reload
   ```

2. The frontend widget will automatically connect to the backend at `http://localhost:8000` by default.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

[Specify your license here]

## Support

For support, please open an issue in the GitHub repository.