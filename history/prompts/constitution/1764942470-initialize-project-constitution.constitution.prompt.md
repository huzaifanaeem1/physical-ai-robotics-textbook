---
id: 1764942470
title: Initialize Project Constitution
stage: constitution
date: 2025-12-05
surface: agent
model: claude-sonnet-4-5-20250929
feature: none
branch: master
user: N/A
command: /sp.constitution
labels: [- constitution]
links:
  spec: {{LINKS_SPEC}}
  ticket: {{LINKS_TICKET}}
  adr: {{LINKS_ADR}}
  pr: {{LINKS_PR}}
files:
- .specify/memory/constitution.md
tests:
null
---

## Prompt

Project: AI/Spec-Driven Textbook on Physical AI {{PROMPT_TEXT}} Humanoid Robotics

Core principles:
- Technical accuracy based on established robotics, simulation, and AI concepts
- Educational clarity for beginner-to-intermediate students in AI, robotics, and simulation
- Structured pedagogical flow from foundational concepts to advanced humanoid robotics systems
- Consistency across all chapters in style, terminology, and formatting
- AI-native writing workflow aligned with Spec-Kit and Docusaurus documentation standards

Key standards:
- All explanations must follow standard robotics and AI practices, including ROS 2, Gazebo, Unity, NVIDIA Isaac, and Vision-Language-Action systems
- Writing style: clear, instructional, and technically precise; avoid jargon unless defined
- Diagrams, examples, and conceptual explanations must be reproducible in standard simulation or robotics environments
- Each chapter must comply with Docusaurus formatting conventions (frontmatter, headings, code blocks, callouts)
- No hallucinated frameworks, tools, or capabilities—only well-known robotics and AI systems
- All system descriptions (perception, control, kinematics, simulation, planning) must follow widely accepted robotics literature and engineering principles

Constraints:
- The textbook must cover the full learning path of Physical AI {{PROMPT_TEXT}} Humanoid Robotics, including:
  • Physical AI foundations and embodied intelligence  
  • ROS 2 fundamentals  
  • Simulation with Gazebo  
  • Visualization with Unity  
  • NVIDIA Isaac platform for perception and training  
  • Humanoid kinematics, dynamics, and locomotion  
  • Conversational and VLA-driven robotics  
- Minimum 13 chapters, following a weekly learning structure  
- Every chapter must include learning objectives, explanations, examples, diagrams (text-based if needed), and exercises  
- Output must be directly usable inside a Docusaurus project without modifications  
- This constitution applies ONLY to writing the textbook content—no chatbot, authentication, personalization, or translation features at this stage

Success criteria:
- The completed textbook provides a clear, accurate, and comprehensive introduction to Physical AI {{PROMPT_TEXT}} Humanoid Robotics
- All chapters are fully structured, coherent, and technically sound
- Formatting is compatible with Docusaurus and Spec-Kit
- The final book stands alone as an educational resource suitable for students entering the world of humanoid and embodied AI systems

## Response snapshot

The project constitution has been initialized to version 0.1.0. This is the initial creation of the constitution. Please manually review and update the following templates: .specify/templates/plan-template.md, .specify/templates/spec-template.md, .specify/templates/tasks-template.md, .specify/templates/commands/*.md. Suggested commit message: docs: initialize constitution to v0.1.0 (initial creation)

## Outcome

- ✅ Impact: {{OUTCOME_IMPACT}}
- 🧪 Tests: {{TESTS_SUMMARY}}
- 📁 Files: {{FILES_SUMMARY}}
- 🔁 Next prompts: {{NEXT_PROMPTS}}
- 🧠 Reflection: {{REFLECTION_NOTE}}

## Evaluation notes (flywheel)

- Failure modes observed: {{FAILURE_MODES}}
- Graders run and results (PASS/FAIL): {{GRADER_RESULTS}}
- Prompt variant (if applicable): {{PROMPT_VARIANT_ID}}
- Next experiment (smallest change to try): {{NEXT_EXPERIMENT}}
