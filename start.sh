#!/bin/bash

# Startup script for RAG Chatbot on Hugging Face Spaces

set -e  # Exit on any error

echo "Starting RAG Chatbot application..."

# Initialize the database
echo "Initializing database..."
python init_db.py

# Start the FastAPI application
echo "Starting FastAPI server..."
exec uvicorn main:app --host 0.0.0.0 --port 8000 --workers 1