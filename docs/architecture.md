# FlowForge AI Architecture Overview

FlowForge AI is split into a typed API layer and an interactive client experience built on Next.js.

```
┌────────────────────────────────────────────────────────────────────┐
│                              Next.js                               │
│                                                                    │
│  ┌──────────────┐   ┌──────────────────┐   ┌────────────────────┐  │
│  │ App Router   │   │ API Route        │   │ React Client       │  │
│  │ (Server)     │   │ /api/flow/run    │   │ Components         │  │
│  └──────────────┘   └──────────────────┘   └────────────────────┘  │
│          │                    │                       │            │
│          ▼                    ▼                       ▼            │
│  - Page composition   - Validates requests    - Flow builder UI    │
│  - Metadata           - Calls LLM provider    - Step editor        │
│  - Server-side env    - Mock mode fallback    - Result inspector   │
└─────────┬──────────────────────────────────────────────────────────┘
          │
          ▼
┌────────────────────────────────────────────────────────────────────┐
│ OpenAI-compatible Provider                                         │
│  (OpenAI, Azure, local proxy, etc.)                                │
└────────────────────────────────────────────────────────────────────┘
```

## Key Modules

- `app/api/flow/run/route.ts`: Sequentially executes flow steps, calling the OpenAI API when available and falling back to mock mode otherwise.
- `components/flow-builder.tsx`: The main client component responsible for managing flow state, running executions, and rendering results.
- `components/step-editor.tsx`: Edits individual steps with models, prompts, and output keys.
- `lib/template.ts`: Tiny templating helper for `{{variable}}` substitution.
- `lib/default-flow.ts`: Ships a starter flow to demonstrate the workflow UX.

## Data Contracts

All data exchanged between the client and API is typed in `types/flow.ts`. This enables end-to-end type safety and easier future SDK generation.

## Extensibility Points

- **Step Types**: Extend the flow schema with new step kinds (tool calls, retrievers) and handle them inside the API route.
- **Providers**: Swap `openai` for any compatible client (Anthropic, LocalAI) by adjusting the `OpenAI` initialization logic.
- **Persistence**: Add database storage (Supabase, Postgres) for saved flows and run history.
- **Automation**: Integrate with background job queues (Inngest, Temporal) for scheduled or long-running flows.
