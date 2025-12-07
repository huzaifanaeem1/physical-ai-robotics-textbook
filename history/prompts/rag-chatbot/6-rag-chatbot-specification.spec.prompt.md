---
id: 6
title: rag-chatbot-specification
stage: spec
date: 2025-12-07
surface: agent
model: Claude Sonnet 4.5
feature: rag-chatbot
branch: 001-rag-chatbot
user: Claude Code User
command: "/sp.specify \"Integrated RAG Chatbot for Physical AI & Humanoid Robotics Textbook\""
labels: [specification, rag, chatbot, education, textbook, ai]
links:
  spec: specs/001-rag-chatbot/spec.md
  plan: null
  tasks: null
  pr: null
  adr: null
files:
  - specs/001-rag-chatbot/spec.md
  - specs/001-rag-chatbot/checklists/requirements.md
tests:
  - specification completeness validated
  - user scenarios defined
  - functional requirements specified
  - success criteria established
  - quality checklist created
---

## Prompt

Integrated RAG Chatbot for Physical AI & Humanoid Robotics Textbook

Goal:
Design an integrated Retrieval-Augmented Generation (RAG) chatbot that lives inside the published textbook website and answers questions about the book's content. The chatbot must support both:
1) Global Q&A over the entire textbook
2) Local Q&A restricted to a specific text selection chosen by the user

Tech Stack (must use):
- OpenAI Agents / ChatKit SDKs for the LLM + tools
- FastAPI backend service
- Neon Serverless Postgres for chat sessions, users, and logging
- Qdrant Cloud Free Tier for vector search over textbook content
- Frontend embedded into the Docusaurus book site as a chat widget/panel

Core Capabilities:
- Ingest all published textbook content (Markdown/docs) into Qdrant as chunks with metadata (module, chapter, section).
- Answer questions using RAG: retrieve relevant chunks from Qdrant, pass them as context to the OpenAI Agent, and return grounded answers.
- "Ask about selection" mode: when the user highlights text in the book and clicks a button, send that snippet + question to the backend and answer using ONLY that selection as context (no global retrieval).
- Show source citations: display which sections/chapters were used to answer (links back into the Docusaurus docs).
- Maintain per-session conversation history in Neon Postgres (user id / anonymous session id, messages, timestamps, mode: global vs selection).
- Basic safety layer: refuse to answer questions unrelated to the book, or clearly mark when the answer is outside book scope.

System Design Requirements:
- Clear architecture diagram for:
  Docusaurus frontend → FastAPI → Qdrant + Postgres → OpenAI Agent
- FastAPI routes:
  - POST /chat/global  (question + session_id)
  - POST /chat/selection  (question + selected_text + session_id)
  - GET /history/{session_id}
- Qdrant schema: collection name, vector size, metadata fields (module, chapter, heading, url, etc).
- Postgres schema: sessions, messages, optional feedback (thumbs up/down).

Frontend Requirements:
- Floating chat button or sidebar panel on all textbook pages.
- Two modes in the UI:
  - "Ask about this page / book" (global RAG)
  - "Ask about selected text" (appears when user highlights text)
- Nice, minimal UI that fits the existing textbook theme.

Constraints:
- Chatbot answers must stay grounded in textbook content by default; if the model needs to go beyond the book, it must clearly label the answer as "outside textbook scope".
- No heavy auth system required; lightweight session handling (cookie or localStorage + Postgres row) is enough.
- Keep costs low: batching, reasonable context windows, and chunk sizes.

Deliverables:
- A precise RAG architecture specification
- Data ingestion & chunking strategy for docs → Qdrant
- API design for the FastAPI backend
- Description of how the OpenAI Agent/ChatKit is configured (tools, system prompt, RAG flow)
- UX description for both global Q&A and selection-based Q&A
- Ready for implementation in the next step (/sp.plan and /sp.implement).

## Response snapshot

Successfully created a comprehensive specification for the Integrated RAG Chatbot for Physical AI & Humanoid Robotics Textbook. The specification includes:

**User Scenarios & Testing**:
- User Story 1 (P1): Global Q&A Chatbot - Students can ask questions about textbook content and receive accurate answers with citations
- User Story 2 (P2): Context-Aware Q&A from Text Selection - Students can highlight text and ask questions specifically about that selection
- User Story 3 (P3): Conversation History and Context - Students can maintain context in conversations for follow-up questions

**Functional Requirements** (FR-001 to FR-010):
- Chat interface widget on all textbook pages
- Accurate answers with source citations
- Text selection functionality
- Conversation history maintenance
- Safety mechanisms for out-of-scope questions
- Minimal, theme-consistent UI

**Key Entities**:
- Chat Session, Message, Textbook Content Chunk, and User Interaction entities defined

**Success Criteria** (SC-001 to SC-007):
- Response time under 5 seconds
- 90% accuracy for answers
- 85% of answers with proper citations
- 95% success rate for text selection questions
- 98% accuracy for identifying out-of-scope questions
- 80% user satisfaction
- Support for 1000+ concurrent users

Created quality checklist in specs/001-rag-chatbot/checklists/requirements.md to validate specification completeness.

## Outcome

- ✅ Impact: Complete RAG chatbot specification ready for planning and implementation
- 🧪 Tests: All requirements and success criteria defined and validated
- 📁 Files: spec.md and requirements checklist created
- 🔁 Next prompts: Ready for /sp.plan to design implementation architecture
- 🧠 Reflection: Specification balances comprehensive functionality with clear success metrics

## Evaluation notes (flywheel)

- Failure modes observed: None - specification meets all quality criteria
- Graders run and results (PASS/FAIL): PASS - all validation checks passed
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): Create implementation plan with /sp.plan