# Implementation Tasks: RAG Chatbot Standardization

**Feature**: RAG Chatbot Standardization
**Feature Branch**: 002-rag-chatbot-standardization
**Created**: 2025-12-19
**Status**: In Progress

## Phase 1: Setup Tasks

- [X] T001 Audit existing backend files for OpenAI/Gemini references
- [X] T002 Audit existing frontend files for auth dependencies
- [X] T003 Update requirements.txt to replace google-generativeai with cohere
- [X] T004 Create backup of current working implementation

## Phase 2: Foundational Tasks

- [X] T005 Install cohere package and verify installation
- [X] T006 Create Cohere configuration validation utility
- [X] T007 Create base CohereProvider class structure

## Phase 3: [US1] Remove Google Gemini Dependencies

- [X] T008 [P] [US1] Replace google.generativeai import in services/generator.py
- [X] T009 [P] [US1] Update generate_answer function to use Cohere instead of Gemini
- [X] T010 [P] [US1] Replace google.generativeai import in services/embeddings.py
- [X] T011 [P] [US1] Update generate_embedding function to use Cohere embeddings
- [X] T012 [P] [US1] Update generate_embeddings function to use Cohere batch embeddings
- [X] T013 [US1] Test Cohere embedding generation with sample text
- [X] T014 [US1] Test Cohere text generation with sample prompts

## Phase 4: [US2] Remove Authentication Dependencies

- [X] T015 [P] [US2] Remove authorization header parameter from routes/ask.py
- [X] T016 [P] [US2] Remove authorization header parameter from routes/ask_selected.py
- [X] T017 [P] [US2] Remove authorization header parameter from routes/history.py
- [X] T018 [P] [US2] Remove auth import from main.py
- [X] T019 [P] [US2] Remove auth router inclusion from main.py
- [X] T020 [P] [US2] Remove auth-related imports from routes/ask.py
- [X] T021 [P] [US2] Remove auth-related imports from routes/ask_selected.py
- [X] T022 [P] [US2] Remove personalization imports from routes/ask.py
- [X] T023 [P] [US2] Remove personalization imports from routes/ask_selected.py
- [X] T024 [P] [US2] Remove auth-related personalization calls from ask route
- [X] T025 [P] [US2] Remove auth-related personalization calls from ask_selected route
- [X] T026 [US2] Update health check to remove GEMINI_API_KEY requirement

## Phase 5: [US3] Stabilize Backend API

- [X] T027 [P] [US3] Update health check endpoint to validate COHERE_API_KEY instead of GEMINI_API_KEY
- [X] T028 [P] [US3] Update main.py API description from "Google Gemini" to "Cohere"
- [X] T029 [P] [US3] Add proper error handling for Cohere API calls in generator.py
- [X] T030 [P] [US3] Add proper error handling for Cohere API calls in embeddings.py
- [X] T031 [P] [US3] Update ask route response validation
- [X] T032 [P] [US3] Update ask_selected route response validation
- [X] T033 [P] [US3] Update history route response validation
- [X] T034 [US3] Test all API routes without authentication
- [X] T035 [US3] Verify environment variable loading works correctly

## Phase 6: [US4] Fix RAG Functionality

- [X] T036 [P] [US4] Update retrieval logic to work with Cohere embeddings in retriever.py
- [X] T037 [P] [US4] Update context assembly in generator.py for proper grounding
- [X] T038 [P] [US4] Ensure selection-only mode works without auth in ask_selected route
- [X] T039 [P] [US4] Validate that global mode uses retrieved context properly
- [X] T040 [P] [US4] Update grounding prompts to enforce book content usage
- [X] T041 [US4] Test retrieval quality with Cohere embeddings
- [X] T042 [US4] Verify citation generation works properly with new system

## Phase 7: [US5] Fix Frontend Widget

- [X] T043 [P] [US5] Remove auth token handling from ragChatWidget.js
- [X] T044 [P] [US5] Remove authorization header from global API calls in widget
- [X] T045 [P] [US5] Remove authorization header from selected API calls in widget
- [X] T046 [P] [US5] Remove authorization header from history API calls in widget
- [X] T047 [P] [US5] Remove user profile fetching from ragChatWidget.js
- [X] T048 [P] [US5] Remove user status display from ragChatWidget.js UI
- [X] T049 [US5] Test widget functionality without authentication
- [X] T050 [US5] Verify both global and selection modes work in widget

## Phase 8: [US6] Validate Local Implementation

- [X] T051 [P] [US6] Update .env.example with Cohere-specific variables
- [X] T052 [P] [US6] Update README.md with Cohere setup instructions
- [X] T053 [P] [US6] Test complete end-to-end flow with Cohere
- [X] T054 [P] [US6] Test error handling when Cohere API is unavailable
- [X] T055 [P] [US6] Test error handling when Qdrant is unavailable
- [X] T056 [US6] Verify response quality meets requirements
- [X] T057 [US6] Run comprehensive integration tests

## Phase 9: Polish & Cross-Cutting Concerns

- [X] T058 Remove all unused Google Gemini dependencies from requirements.txt
- [X] T059 Remove all auth-related database code and models
- [X] T060 Update documentation to reflect Cohere implementation
- [X] T061 Clean up any remaining auth or Gemini references
- [X] T062 Perform final testing of complete system
- [X] T063 Update any remaining hardcoded values or configurations

## Dependencies

- **Phase 4 (Remove Auth)** depends on **Phase 3 (Remove Gemini)** completion
- **Phase 5 (Stabilize Backend)** depends on **Phase 4 (Remove Auth)** completion
- **Phase 6 (Fix RAG)** depends on **Phase 5 (Stabilize Backend)** completion
- **Phase 7 (Fix Frontend)** depends on **Phase 5 (Stabilize Backend)** completion
- **Phase 8 (Validate)** depends on **Phases 3-7** completion

## Parallel Execution Examples

- Tasks T008-T012 can run in parallel during Phase 3 (Gemini removal)
- Tasks T015-T025 can run in parallel during Phase 4 (Auth removal)
- Tasks T027-T033 can run in parallel during Phase 5 (Backend stabilization)
- Tasks T043-T048 can run in parallel during Phase 7 (Frontend fixes)

## Implementation Strategy

**MVP Scope**: Complete Phases 1-3 to establish Cohere foundation, then Phases 4-5 for working authenticated-free backend, then Phase 7 for basic frontend functionality.