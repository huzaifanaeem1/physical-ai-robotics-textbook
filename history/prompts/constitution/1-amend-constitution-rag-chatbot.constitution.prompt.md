---
id: 1
title: amend-constitution-rag-chatbot
stage: constitution
date: 2025-12-19
surface: agent
model: Claude Sonnet 4.5
feature: rag-chatbot-system
branch: 005-user-auth
user: Claude Code
command: sp.constitution
labels: [constitution, rag, chatbot, cohere]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - .specify/memory/constitution.md
tests:
  - constitution validation
---

## Prompt

System Goal:
Stabilize and harden an existing RAG chatbot embedded inside a Docusaurus-based textbook website.
The chatbot must answer questions about the book content and support "answer from selected text only".

Model Provider:
Cohere (NOT OpenAI). Use Cohere for embeddings and generation.

Non-Negotiables:
- No API keys or secrets hardcoded anywhere.
- All credentials must be loaded via environment variables only.
- The system must run locally without authentication.
- The chatbot must be robust, predictable, and error-free.

Core Principles:
1. Grounded Answers Only
   - Global mode: answers must be based on retrieved book chunks.
   - Selection mode: answers must use ONLY the provided selected text.
   - If context is insufficient, say so clearly.

2. Deterministic & Debbugable
   - Clear separation of ingestion, retrieval, generation.
   - Minimal magic; explicit functions and logs.
   - Fail gracefully with readable errors.

3. Provider Abstraction
   - All Cohere calls must live behind a provider interface.
   - No OpenAI imports or references anywhere.

4. Low-Cost & Free-Tier Friendly
   - Chunking + batching optimized.
   - Qdrant Cloud Free Tier compatible.
   - Neon Serverless Postgres compatible.

5. Frontend Safety
   - Chat widget must work without user auth.
   - No crashes if backend is temporarily unavailable.
   - Clear loading/error states.

Definition of Done:
- Local Docusaurus runs with no errors.
- Backend runs locally with env-based config.
- RAG answers work in both modes.
- No auth, no broken navbar items, no runtime crashes.

## Response snapshot

I've updated the project constitution to reflect the requirements for the RAG chatbot system. The new constitution includes:

- Core Principles: Grounded Answers Only, Deterministic & Debuggable, Provider Abstraction, Low-Cost & Free-Tier Friendly, and Frontend Safety
- Non-Negotiables: No hardcoded credentials, environment-based config, local operation without auth
- Model Provider Requirements: Cohere-only implementation with abstraction
- Success Criteria: Local operation, RAG functionality in both modes, no runtime crashes

The constitution version has been bumped from 0.1.0 to 1.0.0 to reflect the significant change in project focus from textbook content to RAG chatbot system.

## Outcome

- ✅ Impact: Major constitution update with new project focus and principles
- 🧪 Tests: Constitution template validation
- 📁 Files: Updated .specify/memory/constitution.md with new principles
- 🔁 Next prompts: Implementation of RAG system according to new constitution
- 🧠 Reflection: Constitution now properly guides RAG chatbot development with clear principles

## Evaluation notes (flywheel)

- Failure modes observed: None
- Graders run and results (PASS/FAIL): PASS - Valid constitution format
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): Implement Cohere provider abstraction