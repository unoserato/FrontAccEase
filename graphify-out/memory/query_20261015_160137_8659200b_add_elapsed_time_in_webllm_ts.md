---
type: "query"
date: "2026-10-15T16:01:37.075836+00:00"
question: "Add elapsed time in webLLM.ts"
contributor: "graphify"
outcome: "useful"
source_nodes: ["compileWebLLMResults()", "Analyzer()"]
---

# Q: Add elapsed time in webLLM.ts

## Answer

Expanded vocabulary: web llm compile results analyzer. Graph connects compileWebLLMResults at src/services/webLLM.ts L123 with Analyzer at src/pages/learner/Analyzer.tsx. Verified current source: Analyzer runs preparation, model initialization and evaluations before compiling. Pass elapsed seconds measured with performance.now from scan start into the compiler.

## Outcome

- Signal: useful

## Source Nodes

- compileWebLLMResults()
- Analyzer()