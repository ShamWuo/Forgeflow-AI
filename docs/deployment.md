# Deployment Guide

## Vercel (Recommended)

1. Fork the repository on GitHub.
2. Import the project into [Vercel](https://vercel.com/import) and pick the `main` branch.
3. Set environment variables in the Vercel dashboard:
   - `OPENAI_API_KEY`
   - `OPENAI_BASE_URL` (optional)
   - `NEXT_PUBLIC_ENABLE_MOCKS` (set to `false` in production)
4. Trigger a deploy. Vercel will install dependencies and run the build automatically.

## Docker

```bash
docker build -t flowforge-ai .
docker run -p 3000:3000 \
  -e OPENAI_API_KEY="sk-..." \
  flowforge-ai
```

Add a `Dockerfile` and `docker-compose.yml` (PRs welcome!) to enable production-grade container deployment.

## Self-Hosting

- Use `npm run build` followed by `npm run start` on any Node.js 18+ runtime.
- For SSR caching and rate limiting, front the app with Nginx or Cloudflare.
- BYO vector database, redis cache, or job queue depending on your extensions.
