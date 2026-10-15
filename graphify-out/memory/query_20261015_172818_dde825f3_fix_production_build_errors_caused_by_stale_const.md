---
type: "query"
date: "2026-10-15T17:28:18.196154+00:00"
question: "Fix production build errors caused by stale const/data imports"
contributor: "graphify"
outcome: "useful"
source_nodes: ["build", "materialProps.ts", "data.ts"]
---

# Q: Fix production build errors caused by stale const/data imports

## Answer

Expanded vocabulary: build materialProps data. The build failed on stale const/data usage and mismatched classroom response types. Resolved by putting a typed quiz mock in ClassroomInstructorView, correcting ClassroomViewProps to a single classroom, repairing dependent learner/submission types and quiz helpers, and removing unused imports. npm run build now succeeds.

## Outcome

- Signal: useful

## Source Nodes

- build
- materialProps.ts
- data.ts