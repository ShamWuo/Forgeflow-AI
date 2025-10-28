# FlowForge AI

FlowForge AI is an open-source workflow studio for Large Language Models. Design multi-step agent pipelines, run them locally, and share reusable templates with your team—without vendor lock-in.

## Why FlowForge AI?

- **Visual-first builder** – Compose chained LLM steps with per-step system prompts, models, temperatures, and variable injection.
- **Bring-your-own-model** – Works with any OpenAI-compatible endpoint (OpenAI, Azure, Anthropic via proxy, local adapters like LM Studio or Ollama).
- **Bring-your-own-key (BYOK)** – Provide keys per-run in the UI while keeping defaults on the server.
- **Deterministic runs** – Capture and inspect every intermediate output, temperature, and token usage.
- **Collaboration ready** – Export/import flows as JSON, version them in Git, and review diffs like regular code.
- **Hackable** – Built on Next.js, Tailwind CSS, and TypeScript with a clean component architecture.

## Features

- Drag-and-drop step ordering with live validation
- Dynamic templating (`{{variable}}`) across steps
- Sequential execution with shared context
- Mock mode for offline development
- API-first design with typed contracts (`/api/flow/run`)
- Pluggable output visualizers (JSON, Markdown, plain text)

## Quick Start

```bash
# Clone the repo
git clone https://github.com/<your-handle>/flowforge-ai.git
cd flowforge-ai

# Install dependencies
npm install

# Configure your environment
cp .env.example .env.local
# Edit .env.local and add your OpenAI-compatible API key

# Start the dev server
npm run dev
```

Visit `http://localhost:3000` to start building flows.

### Docker

```bash
docker build -t flowforge-ai .
docker run -p 3000:3000 -e OPENAI_API_KEY="sk-..." flowforge-ai
```

## Environment Variables

| Variable | Description |
| --- | --- |
| `OPENAI_API_KEY` | Optional default key for server-side execution. Users can supply their own in the UI. |
| `OPENAI_BASE_URL` | Optional default base URL for custom endpoints (Azure, proxies, local servers). |

Set `NEXT_PUBLIC_ENABLE_MOCKS=true` in `.env.local` to bypass live model calls. Mock responses keep the interface usable during development or demos.

## Roadmap

- 🔁 Looping & branching
- 🧪 Head-to-head flow evaluation suite
- 🔌 Plugin SDK for custom step types (tools, retrievers, webhooks)
- 📚 Flow template gallery backed by JSON schema
- 📦 Desktop build via Tauri

Check `docs/roadmap.md` for details and open issues for good first contributions.

## Contributing

1. Fork the repository & create a feature branch.
2. Run `npm run lint` and `npm run typecheck` before pushing.
3. Open a PR with screenshots / Loom of your change in action.
4. Tag a maintainer for review and iterate together.

See `CONTRIBUTING.md` for our full contribution guidelines, templates, and checklists.

## Release

This repository is prepared for public releases. Key points:

- CI runs on push and PRs via `.github/workflows/ci.yml` (lint, tests, typecheck, build).
- Create a tagged release (e.g., `git tag -a v0.1.0 -m "v0.1.0"`) and push the tag to GitHub. A separate release workflow can be configured to publish artifacts or trigger downstream automation.
- See `RELEASE.md` and `CHANGELOG.md` for the release checklist and notes.

If you'd like me to add an automated release workflow that creates GitHub Releases from tags or publishes to npm (when `NPM_TOKEN` is provided), tell me and I'll add a safe, configurable workflow.

## Community & Support

- GitHub Discussions for Q&A and feature proposals
- Issue labels triaged weekly (“good first issue”, “help wanted”)
- Monthly livestream building sessions (details TBD)

## License

MIT © 2025 FlowForge AI contributors
