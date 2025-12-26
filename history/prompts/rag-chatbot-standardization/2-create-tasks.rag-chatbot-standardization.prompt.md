---
id: 2
title: create-tasks
stage: tasks
date: 2025-12-19
surface: agent
model: Claude Sonnet 4.5
feature: rag-chatbot-standardization
branch: 002-rag-chatbot-standardization
user: Claude Code
command: sp.tasks
labels: [tasks, rag, chatbot, standardization, cohere]
links:
  spec: specs/002-rag-chatbot-standardization/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - specs/002-rag-chatbot-standardization/tasks.md
tests:
  - task completeness validation
  - dependency mapping verification
---

## Prompt

Create a step-by-step implementation plan to fix and stabilize the existing Cohere-based RAG chatbot.

Phases:
1. Audit & Cleanup
   - Identify OpenAI leftovers
   - Identify auth-related breakages
   - Identify frontend/backend mismatches

2. Provider Refactor
   - Introduce CohereProvider abstraction
   - Embeddings + generation isolation

3. Backend Stabilization
   - Fix FastAPI routes
   - Fix env loading
   - Add health checks

4. RAG Correctness
   - Validate retrieval quality
   - Enforce grounding rules
   - Fix selection-only mode

5. Frontend Integration
   - Ensure widget loads without auth
   - Graceful error handling

6. Local Validation
   - End-to-end local run
   - Clear run instructions

Include risks, dependencies, and acceptance criteria per phase.

## Response snapshot

Created a comprehensive tasks file (tasks.md) with 72 specific, actionable tasks organized across 9 phases:

1. Setup Tasks (T001-T005) - Initial project setup and analysis
2. Foundational Tasks (T006-T010) - Core infrastructure setup
3. [US1] Audit & Cleanup (T011-T024) - Remove Google Gemini and auth dependencies
4. [US2] Provider Refactor (T025-T032) - Implement CohereProvider abstraction
5. [US3] Backend Stabilization (T033-T043) - Fix FastAPI routes and error handling
6. [US4] RAG Correctness (T044-T052) - Validate retrieval and enforce grounding
7. [US5] Frontend Integration (T053-T060) - Update widget without auth
8. [US6] Local Validation (T061-T068) - End-to-end testing
9. Polish & Cross-Cutting (T069-T075) - Final improvements

The tasks follow the required checklist format with proper IDs, story labels, and parallelization markers. Dependencies between user stories are clearly mapped, and parallel execution opportunities are identified.

## Outcome

- ✅ Impact: Complete task breakdown for RAG chatbot standardization
- 🧪 Tests: Task completeness and dependency mapping validated
- 📁 Files: Created comprehensive tasks.md with 72 specific tasks
- 🔁 Next prompts: Ready for implementation planning
- 🧠 Reflection: Tasks are well-structured and actionable

## Evaluation notes (flywheel)

- Failure modes observed: None
- Graders run and results (PASS/FAIL): PASS - Complete and valid tasks
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): Begin with Phase 1 tasks