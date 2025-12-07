#!/usr/bin/env python3
"""
Database initialization script for the RAG Chatbot system.
Creates the necessary tables in the database.
"""

import asyncio
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

async def init_db():
    from rag_backend.db.models import init_db
    print("Initializing database tables...")
    await init_db()
    print("Database tables created successfully!")

if __name__ == "__main__":
    asyncio.run(init_db())