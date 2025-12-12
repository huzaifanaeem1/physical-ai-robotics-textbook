import google.generativeai as genai
import os
from typing import List

# Configure the Gemini API
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

async def generate_embedding(text: str) -> List[float]:
    """
    Generate embedding for the given text using Google Gemini embedding model.
    """
    try:
        result = genai.embed_content(
            model="models/embedding-001",
            content=text,
            task_type="RETRIEVAL_QUERY"
        )
        return result['embedding']
    except Exception as e:
        print(f"Error generating embedding: {e}")
        raise

async def generate_embeddings(texts: List[str]) -> List[List[float]]:
    """
    Generate embeddings for multiple texts.
    """
    embeddings = []
    for text in texts:
        embedding = await generate_embedding(text)
        embeddings.append(embedding)
    return embeddings