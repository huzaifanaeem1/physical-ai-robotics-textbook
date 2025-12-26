<!-- Sync Impact Report -->
<!--
Version change: 0.1.0 → 1.0.0
List of modified principles:
- PROJECT_NAME → RAG Chatbot for Physical AI & Humanoid Robotics Textbook
- PRINCIPLE_1_NAME → Grounded Answers Only
- PRINCIPLE_2_NAME → Deterministic & Debuggable
- PRINCIPLE_3_NAME → Provider Abstraction
- PRINCIPLE_4_NAME → Low-Cost & Free-Tier Friendly
- PRINCIPLE_5_NAME → Frontend Safety
Added sections: Non-Negotiables, Model Provider Requirements, Error Handling Standards
Removed sections: Old educational principles
Templates requiring updates:
- .specify/templates/plan-template.md: ✅ updated
- .specify/templates/spec-template.md: ✅ updated
- .specify/templates/tasks-template.md: ✅ updated
- .specify/templates/commands/*.md: ✅ updated
Follow-up TODOs: None
-->
# RAG Chatbot for Physical AI & Humanoid Robotics Textbook Constitution

## Core Principles

### Grounded Answers Only
- Global mode: answers must be based on retrieved book chunks.
- Selection mode: answers must use ONLY the provided selected text.
- If context is insufficient, say so clearly. The system MUST NOT hallucinate information.

### Deterministic & Debuggable
- Clear separation of ingestion, retrieval, generation.
- Minimal magic; explicit functions and logs.
- Fail gracefully with readable errors. All components must be traceable and testable.

### Provider Abstraction
- All Cohere calls must live behind a provider interface.
- No OpenAI imports or references anywhere in the codebase.
- Provider interfaces must be swappable with minimal code changes.

### Low-Cost & Free-Tier Friendly
- Chunking + batching optimized for cost efficiency.
- Qdrant Cloud Free Tier compatible.
- Neon Serverless Postgres compatible.
- Resource usage must be monitored and optimized.

### Frontend Safety
- Chat widget must work without user authentication.
- No crashes if backend is temporarily unavailable.
- Clear loading/error states for all user interactions.
- Graceful degradation when services are down.

## Non-Negotiables
- No API keys or secrets hardcoded anywhere in the codebase.
- All credentials must be loaded via environment variables only.
- The system must run locally without authentication.
- The chatbot must be robust, predictable, and error-free.
- No authentication dependencies in the frontend or backend.

## Model Provider Requirements
- Cohere must be used for both embeddings and generation.
- All Cohere-specific implementations must be abstracted behind provider interfaces.
- No direct Cohere SDK calls outside of provider implementations.
- Provider configuration must be environment-driven.

## Key Standards

- All RAG pipeline components (retrieval, generation, ingestion) must be clearly separated and testable.
- Error handling must be comprehensive with appropriate fallbacks.
- Logging must be structured and include traceability for debugging.
- Frontend components must follow progressive enhancement principles.
- API endpoints must have proper validation and rate limiting where appropriate.
- No external dependencies that require authentication for basic functionality.

## Constraints

- The system must support two answer modes: global (from entire book) and selection-only (from highlighted text).
- Backend must be configurable through environment variables only.
- Frontend must gracefully handle backend unavailability.
- No hardcoded credentials, API keys, or secrets in any source files.
- All Cohere integrations must be abstracted and replaceable.
- The chat widget must work in all textbook pages without conflicts.

## Governance

### Success Criteria
- Local Docusaurus runs with no errors.
- Backend runs locally with env-based config.
- RAG answers work in both global and selection modes.
- No authentication dependencies, no broken components, no runtime crashes.
- System operates reliably in local development environment.
- All components follow the specified architectural principles.

### Amendment Procedure
- All principle changes require explicit justification and review.
- Version bumps: MAJOR for principle removals, MINOR for additions, PATCH for clarifications.
- Changes must be propagated to dependent templates and documentation.

### Compliance Review
- Regular audits of credential handling to ensure no hardcoding.
- Verification that all Cohere calls go through provider abstraction.
- Frontend safety checks for error state handling.
- Performance monitoring for cost optimization.

**Version**: 1.0.0 | **Ratified**: 2025-12-05 | **Last Amended**: 2025-12-19
Feature name: rag-chatbot-system