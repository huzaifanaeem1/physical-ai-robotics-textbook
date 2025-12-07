from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional
import uuid

router = APIRouter()

class AskRequest(BaseModel):
    question: str
    session_id: Optional[str] = None

class AskResponse(BaseModel):
    answer: str
    citations: list
    session_id: str

@router.post("/ask", response_model=AskResponse)
async def ask_endpoint(request: AskRequest):
    try:
        # Generate a new session ID if not provided
        session_id = request.session_id or str(uuid.uuid4())

        # Import here to avoid circular dependencies
        from rag_backend.services.generator import generate_answer
        from rag_backend.services.session_logger import log_message

        # Generate answer using RAG pipeline
        answer, citations = await generate_answer(
            question=request.question,
            session_id=session_id,
            mode="global"
        )

        # Log the interaction
        await log_message(session_id, "user", request.question)
        await log_message(session_id, "ai", answer)

        return AskResponse(
            answer=answer,
            citations=citations,
            session_id=session_id
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))