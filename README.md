# KnowledgeOps-AI

Portfolio-ready document intelligence frontend built with React, TypeScript and Vite.

## What this demo shows

- Cloudflare Pages deployment ready
- Demo access flow backed by Cloudflare Pages Functions secrets
- Login, upload, chat and recovery screens
- Clear KnowledgeOps-AI branding for professional presentation

## Cloudflare env vars

Public build-time variables:

```env
VITE_APP_NAME=KnowledgeOps-AI
VITE_TAGLINE=Enterprise document intelligence demo
VITE_BASE_URL=https://your-backend-domain.com/
VITE_DEMO_LOGIN_PATH=/api/demo-login
```

Secrets for the Pages Function (set them in Cloudflare as secret variables, not `VITE_` vars):

```env
DEMO_ACCESS_EMAIL=your-approved-demo-email
DEMO_ACCESS_PASSWORD=your-approved-demo-password
BACKEND_LOGIN_URL=https://your-backend-domain.com
```

## Local development

```bash
npm install
npm run dev
```
