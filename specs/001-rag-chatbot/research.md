# Research: Integrated RAG Chatbot for Physical AI & Humanoid Robotics Textbook

## Decision: RAG Architecture Pattern
**Rationale**: Retrieval-Augmented Generation is the optimal approach for providing accurate, cited answers based on specific textbook content. It allows the LLM to ground its responses in the actual textbook material rather than relying on pre-trained knowledge that may be outdated or inaccurate.

**Alternatives considered**:
- Pure LLM responses: Would not be grounded in textbook content
- Keyword search + template responses: Would lack conversational flexibility
- Rule-based system: Would not handle diverse question types effectively

## Decision: Technology Stack Selection
**Rationale**: The required technology stack (FastAPI, Qdrant Cloud, Neon Postgres, OpenAI Agents) provides the optimal balance of performance, scalability, and development efficiency for this use case.

**Alternatives considered**:
- Alternative vector databases (Pinecone, Weaviate): Qdrant Cloud offers better free tier and open-source flexibility
- Alternative databases (MongoDB, Supabase): Neon Postgres offers better serverless scaling for session data
- Alternative frameworks (Next.js API routes): FastAPI offers better async performance and OpenAPI integration
- Alternative LLM providers (Anthropic, Cohere): OpenAI Agents provide the best tool integration for grounding

## Decision: Text Chunking Strategy
**Rationale**: Chunking textbook content into 512-1024 token segments with 100-token overlap provides optimal balance between retrieval precision and context completeness. This allows the RAG system to retrieve relevant sections without losing important contextual information.

**Alternatives considered**:
- Sentence-level chunks: Too granular, might break up important concepts
- Document-level chunks: Too large, would exceed context windows
- Fixed character counts: Would not respect semantic boundaries in text

## Decision: Citation and Grounding Approach
**Rationale**: Using Qdrant metadata to store document references and implementing a citation extraction service ensures that all responses can be traced back to specific textbook sections. This maintains academic integrity and allows students to verify information.

**Alternatives considered**:
- Post-hoc citation generation: Would not be reliable or accurate
- Manual citation links: Would not scale to the full textbook content
- No citations: Would violate the requirement for source attribution

## Decision: Session Management Strategy
**Rationale**: Using Neon Postgres for session storage provides persistent, reliable storage for conversation history while maintaining data privacy. Anonymous session IDs prevent user tracking while still enabling conversation continuity.

**Alternatives considered**:
- Client-side storage only: Would not persist across devices/browsers
- In-memory storage: Would lose history on server restarts
- Third-party session services: Would add unnecessary complexity

## Decision: Text Selection Integration
**Rationale**: Implementing text selection with a dedicated API endpoint ensures that the "Ask about selected text" functionality works correctly by restricting the context to only the highlighted content, preventing global knowledge from influencing responses.

**Alternatives considered**:
- Client-side context restriction: Would be less secure and reliable
- Server-side detection of selection: Would be more complex and less responsive