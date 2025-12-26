import sys
import os
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'rag_backend'))

# Set up environment variables
os.environ.setdefault("GEMINI_API_KEY", "fake_key")
os.environ.setdefault("QDRANT_URL", "http://localhost:6333")
os.environ.setdefault("DATABASE_URL", "sqlite:///./test.db")

from rag_backend.main import app
import uvicorn

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)