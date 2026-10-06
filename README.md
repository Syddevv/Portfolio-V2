# Sydney Santos Portfolio

React, TypeScript, and Vite portfolio with a Groq-powered portfolio assistant.

## Local setup

1. Install dependencies with `npm install`.
2. Copy `.env.example` to `.env.local` and add your server-side Groq key.
3. Run `npm run dev`. The development-only Vite middleware serves `/api/chat` through the same handler used by the deployed server function.

The Groq key remains in the Vite server process and is never exposed through a `VITE_` browser variable.

## Environment variables

| Variable | Required | Purpose |
| --- | --- | --- |
| `GROQ_API_KEY` | Yes | Server-side Groq API key. Never prefix this with `VITE_`. |
| `GROQ_MODEL` | Yes | Groq model ID. The example uses `openai/gpt-oss-20b`. |
| `MONGODB_URI` | No | When configured, user messages and assistant replies are written to `portfolio_chat_logs`. |

Set the same variables in the Vercel project settings before deployment. The browser never receives these values.

## Chat endpoint

`POST /api/chat`

Request:

```json
{
  "message": "Tell me about Eyrie",
  "history": [
    { "role": "user", "content": "What mobile projects has Sydney built?" },
    { "role": "assistant", "content": "Sydney has worked on Eyrie and Loopym." }
  ]
}
```

Successful response:

```json
{ "reply": "Eyrie is Sydney's AI-assisted, offline-first personal finance app..." }
```

The endpoint trims and validates messages, accepts only `user` and `assistant` history entries, retains at most 10 recent entries, limits requests per client, and times out stalled provider calls. Provider details and environment values are never returned to the browser. Client-supplied assistant history is treated as conversation context rather than portfolio truth.

## Verification

- `npm test` runs focused chatbot tests.
- `npm run lint` checks the frontend and API TypeScript.
- `npm run build` creates the production Vite build.
