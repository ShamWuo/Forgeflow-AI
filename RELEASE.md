Release checklist
=================

Steps to prepare a public release:

1. Update `package.json` metadata (name, version, repository, author, license) as appropriate.
2. Ensure all tests pass: `npm test -- --run`.
3. Run lint and typecheck: `npm run lint` and `npm run typecheck`.
4. Build the app: `npm run build` (Next.js build).
5. Update `CHANGELOG.md` or release notes with notable changes.
6. Tag a release (e.g., `git tag -a vX.Y.Z -m "Release vX.Y.Z"`).
7. Push tags and open a GitHub Release.

CI
--
This repo includes a GitHub Actions workflow at `.github/workflows/ci.yml` that will run lint, tests, typecheck, and build on pushes and PRs to `main`/`master`.

Notes
-----
- Replace the placeholder `repository` field in `package.json` with the actual GitHub URL before publishing.
- If publishing to npm, ensure the `name` field in `package.json` is the desired package name and bump the `version` accordingly.
