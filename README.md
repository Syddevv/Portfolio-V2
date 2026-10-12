# Sydney Santos Portfolio

React, TypeScript, and Vite portfolio with a Groq-powered portfolio assistant and a Resend-powered contact form.

## Local setup

1. Install dependencies with `npm install`.
2. Copy `.env.example` to `.env.local` and add your server-side credentials.
3. Run `npm run dev` for the frontend and local `/api/chat` and `/api/contact` middleware.
4. To reproduce the full Vercel deployment environment locally, install the Vercel CLI and run `vercel dev` from this directory.

The Groq key remains in the Vite server process and is never exposed through a `VITE_` browser variable.

## Environment variables

| Variable | Required | Purpose |
| --- | --- | --- |
| `GROQ_API_KEY` | Yes | Server-side Groq API key. Never prefix this with `VITE_`. |
| `GROQ_MODEL` | Yes | Groq model ID. The example uses `openai/gpt-oss-20b`. |
| `MONGODB_URI` | No | When configured, user messages and assistant replies are written to `portfolio_chat_logs`. |
| `RESEND_API_KEY` | Yes for contact | Server-side Resend API key. Never prefix this with `VITE_`. |
| `RESEND_FROM_EMAIL` | Yes for contact | Sender address. Use `onboarding@resend.dev` while testing, then replace it with an address on a verified custom domain later. |
| `CONTACT_EMAIL` | Yes for contact | Inbox that receives contact submissions. With Resend's testing sender, this must be the email registered to the Resend account. |

In Vercel, open **Project Settings → Environment Variables**, add the three Resend variables for Production and any desired Preview environments, then redeploy. Environment changes only apply to new deployments. The browser never receives these values.

Resend's `onboarding@resend.dev` sender is intended for testing and can only deliver to the email address registered to the Resend account, including from a public `.vercel.app` deployment. A custom domain is not required for this setup. After verifying a custom domain later, change only `RESEND_FROM_EMAIL`; the form and API code do not need to change.

## Contact endpoint

`POST /api/contact`

The endpoint validates and limits all fields, escapes visitor content before generating the HTML email, uses the visitor's address as `replyTo`, includes a honeypot, and applies a best-effort limit of three messages per IP every ten minutes. The in-memory limiter works within a warm function instance, but Vercel instances do not share memory. If stronger persistent abuse protection becomes necessary, replace the in-memory map with Vercel Marketplace Upstash Redis or Vercel KV using the same IP and time-window policy.

For local end-to-end testing, configure the Development environment variables in Vercel and run `vercel dev`, or place them in an ignored `.env.local` file before starting `vercel dev`. Submit the existing form or send a POST request to `http://localhost:3000/api/contact`.

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
