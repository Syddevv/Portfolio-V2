import type { IncomingMessage } from "node:http";
import { defineConfig, loadEnv, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import chatHandler from "./api/chat.js";
import contactHandler from "./api/contact.js";

type RequestWithBody = IncomingMessage & { body?: unknown };

function localServerApis(): Plugin {
  return {
    name: "local-server-apis",
    apply: "serve",
    configureServer(server) {
      server.middlewares.use(async (request, response, next) => {
        const pathname = new URL(request.url ?? "/", "http://localhost").pathname;
        const handler = pathname === "/api/chat"
          ? chatHandler
          : pathname === "/api/contact"
            ? contactHandler
            : null;

        if (!handler) {
          next();
          return;
        }

        try {
          if (request.method === "POST") {
            const chunks: Buffer[] = [];
            for await (const chunk of request) {
              chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
            }
            (request as RequestWithBody).body = Buffer.concat(chunks).toString("utf8");
          }

          await handler(request as RequestWithBody, response);
        } catch {
          if (response.headersSent) {
            response.end();
            return;
          }
          response.statusCode = 500;
          response.setHeader("Content-Type", "application/json; charset=utf-8");
          response.end(JSON.stringify({ error: "The local API server could not process the request." }));
        }
      });
    },
  };
}

export default defineConfig(({ mode }) => {
  const serverEnvironment = loadEnv(mode, process.cwd(), "");
  for (const key of ["GROQ_API_KEY", "GROQ_MODEL", "MONGODB_URI", "RESEND_API_KEY", "RESEND_FROM_EMAIL", "CONTACT_EMAIL"] as const) {
    if (serverEnvironment[key]) process.env[key] = serverEnvironment[key];
  }

  return {
    plugins: [localServerApis(), react(), tailwindcss()],
  };
});
