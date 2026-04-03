import { createApp } from "./app.js";
import { config } from "./config.js";

const app = createApp();

const server = app.listen(config.port, () => {
  console.warn(`[gateway] Frontier Marketing OS Gateway running on port ${config.port}`);
});

function shutdown(signal: string) {
  console.warn(`[gateway] ${signal} received, shutting down gracefully...`);
  server.close(() => {
    console.warn("[gateway] All connections closed. Exiting.");
    process.exit(0);
  });
  // Force exit after 10s if connections don't close
  setTimeout(() => {
    console.error("[gateway] Forced shutdown after timeout.");
    process.exit(1);
  }, 10_000).unref();
}

process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("SIGINT", () => shutdown("SIGINT"));
