import express from "express";
import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";
import crypto from "node:crypto";
import { config } from "./config.js";
import { createX402Middleware } from "./x402.js";
import { deployMarketingTeam } from "./services/deploy.service.js";
import { deployRequestSchema } from "./schemas.js";
import { AppError } from "./errors.js";

export function createApp(): express.Express {
  const app = express();

  // Security
  app.use(helmet());
  app.use(cors({
    origin: config.corsOrigin?.split(",") || ["http://localhost:3000"],
    methods: ["GET", "POST"],
  }));
  app.use(express.json({ limit: "10kb" }));

  // Rate limiting
  const deployLimiter = rateLimit({ windowMs: 60_000, max: 5, standardHeaders: true, legacyHeaders: false });
  const readLimiter = rateLimit({ windowMs: 60_000, max: 30, standardHeaders: true, legacyHeaders: false });

  // x402 payment gate
  app.use(createX402Middleware());

  // Idempotency store (in-memory; production: use Redis)
  const idempotencyStore = new Map<string, { status: number; body: unknown; expiresAt: number }>();
  setInterval(() => {
    const now = Date.now();
    for (const [key, val] of idempotencyStore) {
      if (val.expiresAt < now) idempotencyStore.delete(key);
    }
  }, 5 * 60_000).unref();

  // === Routes ===

  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", service: "frontier-marketing-os-gateway" });
  });

  app.post("/api/deploy-marketing-team", deployLimiter, async (req, res) => {
    // Idempotency check
    const idempotencyKey = req.headers["x-idempotency-key"] as string | undefined;
    if (idempotencyKey) {
      const cached = idempotencyStore.get(idempotencyKey);
      if (cached) { res.status(cached.status).json(cached.body); return; }
    }

    // Validate input
    const parsed = deployRequestSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({
        error: "Validation failed",
        code: "VALIDATION_ERROR",
        details: parsed.error.flatten().fieldErrors,
      });
      return;
    }

    try {
      const result = await deployMarketingTeam(parsed.data);

      // Cache for idempotency (1h TTL)
      if (idempotencyKey) {
        idempotencyStore.set(idempotencyKey, { status: 200, body: result, expiresAt: Date.now() + 3_600_000 });
      }

      res.json(result);
    } catch (error) {
      const errorId = crypto.randomUUID();

      if (error instanceof AppError) {
        console.error(`[gateway] [${errorId}]:`, error.message);
        res.status(error.statusCode).json({ error: error.message, code: error.code, errorId });
      } else {
        console.error(`[gateway] Deploy failed [${errorId}]:`, error);
        console.error(`[gateway] PAYMENT TAKEN BUT DEPLOY FAILED — errorId=${errorId} — MANUAL INTERVENTION REQUIRED`);
        res.status(500).json({
          error: "Failed to deploy marketing team",
          code: "INTERNAL_ERROR",
          errorId,
          refundStatus: "pending_manual_review",
        });
      }
    }
  });

  app.get("/api/campaigns", readLimiter, async (_req, res) => {
    try {
      const paperclipRes = await fetch(`${config.paperclipApiUrl}/api/companies`, {
        signal: AbortSignal.timeout(10_000),
      });
      if (!paperclipRes.ok) {
        res.status(502).json({ error: "Paperclip API unavailable", code: "EXTERNAL_SERVICE_ERROR" });
        return;
      }
      const companies = await paperclipRes.json();
      res.json(companies);
    } catch {
      res.status(502).json({ error: "Failed to reach Paperclip API", code: "EXTERNAL_SERVICE_ERROR" });
    }
  });

  return app;
}
