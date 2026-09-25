# viteTsCht

Cheat sheet for the official Vite React + TypeScript starter (`npm create vite@latest -- --template react-ts`). Each command has a copy button.

GitHub Pages is not enabled. This repo is set up for [Cloudflare Workers static assets](https://developers.cloudflare.com/workers/static-assets/).

## Local

```bash
npm install
npm run dev
```

## Cloudflare Workers

```bash
npx wrangler login
npm run deploy
```

`npm run deploy` builds `dist/` and publishes it with Wrangler. Unknown paths return `public/404.html` with HTTP 404. There is no Worker script.
