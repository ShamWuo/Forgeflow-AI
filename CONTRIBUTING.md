# Contributing to FlowForge AI

Thanks for your interest in contributing! This document expands on the short contributing notes in the README and provides templates and checkpoints to make collaboration smooth.

Guidelines
- Fork the repository and open a pull request against `main`.
- Keep changes small and focused. One feature or fix per PR.
- Include tests for logic and components where practical.
- Run `npm run lint` and `npm run typecheck` before opening a PR.

PR Template
- Summary of changes
- Motivation and context
- How to test
- Screenshots / recordings

Code of Conduct
Please follow the `CODE_OF_CONDUCT.md` in the repo.

Release process
- Use semantic version tags like `v1.2.3` when publishing a stable release.
- The repository includes a CI workflow that runs on push/PR; ensure the CI passes before tagging.
# Contributing to FlowForge AI

Thank you for helping build FlowForge AI! This guide explains how to propose features, file bugs, and submit PRs.

## Development Setup

1. Fork the repository and clone your fork.
2. Install dependencies with `npm install`.
3. Copy `.env.example` to `.env.local` and set your keys.
4. Run `npm run dev` and visit `http://localhost:3000`.

## Branching & Commits

- Base all work on `main` and use feature branches named `feature/<topic>` or `fix/<topic>`.
- Keep commits scoped and descriptive. Use imperative mood (e.g., `Add flow execution logger`).
- Reference issues in commit bodies (e.g., `Refs #42`).

## Code Style

- TypeScript for all new code.
- Components live under `components/`, domain logic under `lib/`.
- Run `npm run lint` and `npm run typecheck` before opening a PR.
- Prefer functional components with hooks and avoid default exports unless required.

## Pull Requests

- Fill in the PR template (generated automatically) with context and screenshots.
- Add tests for new features when possible. We welcome Vitest and Playwright coverage contributions.
- Tag maintainers or community reviewers if you need input.
- Be ready to iterate—collaboration is the goal.

## Bug Reports & Feature Requests

- Use GitHub Issues with the provided templates.
- Include reproduction steps, expected vs actual behavior, environment details, and logs where possible.
- Tag issues with labels (`bug`, `enhancement`, `good first issue`) to help triage.

## Community Values

- Assume positive intent, provide actionable feedback, and celebrate wins together.
- Respect the Code of Conduct—everyone deserves a safe environment to contribute.

Happy building! 🚀
