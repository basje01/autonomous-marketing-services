import express from "express";
import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";
import crypto from "node:crypto";
import { config } from "./config.js";
import { readCampaignAuditBundle } from "./audit-trail.js";
import { createX402Middleware, getPlatformAddress } from "./x402.js";
import { deployMarketingTeam } from "./services/deploy.service.js";
import { listCompanies } from "./paperclip-client.js";
import { deployRequestSchema } from "./schemas.js";
import { AppError } from "./errors.js";

const MAX_IDEMPOTENCY_ENTRIES = 1000;

export function createApp(): express.Express {
  const app = express();

  // Security
  app.use(helmet());
  app.use(cors({
    origin: config.corsOrigin?.split(",").map((s) => s.trim()) || ["http://localhost:3000"],
    methods: ["GET", "POST"],
  }));
  app.use(express.json({ limit: "10kb" }));

  // Rate limiting
  const deployLimiter = rateLimit({ windowMs: 60_000, max: 5, standardHeaders: true, legacyHeaders: false });
  const readLimiter = rateLimit({ windowMs: 60_000, max: 30, standardHeaders: true, legacyHeaders: false });

  // x402 payment gate — only on the deploy endpoint, not globally (E23)
  const x402 = createX402Middleware();

  // Idempotency store with max-size cap (E08)
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

  app.post("/api/deploy-marketing-team", x402, deployLimiter, async (req, res) => {
    // Idempotency check (E09: validate key type)
    const rawKey = req.headers["x-idempotency-key"];
    const idempotencyKey = typeof rawKey === "string" ? rawKey.slice(0, 128) : undefined;
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
      const result = await deployMarketingTeam(parsed.data, getPlatformAddress());

      // Cache success (1h TTL, E08: cap size)
      if (idempotencyKey) {
        if (idempotencyStore.size >= MAX_IDEMPOTENCY_ENTRIES) {
          const oldest = idempotencyStore.keys().next().value;
          if (oldest) idempotencyStore.delete(oldest);
        }
        idempotencyStore.set(idempotencyKey, { status: 200, body: result, expiresAt: Date.now() + 3_600_000 });
      }

      res.json(result);
    } catch (error) {
      const errorId = crypto.randomUUID();
      const errorBody = error instanceof AppError
        ? { error: error.message, code: error.code, errorId }
        : { error: "Failed to deploy marketing team", code: "INTERNAL_ERROR", errorId, refundStatus: "pending_manual_review" };
      const status = error instanceof AppError ? error.statusCode : 500;

      // Cache failures with short TTL to prevent duplicate deploys on retry (E06)
      if (idempotencyKey) {
        idempotencyStore.set(idempotencyKey, { status, body: errorBody, expiresAt: Date.now() + 300_000 });
      }

      if (!(error instanceof AppError)) {
        console.error(`[gateway] PAYMENT TAKEN BUT DEPLOY FAILED — errorId=${errorId} — MANUAL INTERVENTION REQUIRED`);
      }
      console.error(`[gateway] [${errorId}]:`, error instanceof Error ? error.message : error);
      res.status(status).json(errorBody);
    }
  });

  // E04: Validated campaigns response
  app.get("/api/campaigns", readLimiter, async (_req, res) => {
    try {
      const companies = await listCompanies();
      res.json(companies);
    } catch {
      res.status(502).json({ error: "Failed to reach Paperclip API", code: "EXTERNAL_SERVICE_ERROR" });
    }
  });

  app.get("/api/campaigns/:campaignId/audit", readLimiter, async (req, res) => {
    try {
      const campaignId = req.params.campaignId;
      if (!campaignId) {
        res.status(400).json({ error: "Campaign ID is required", code: "VALIDATION_ERROR" });
        return;
      }

      const auditBundle = await readCampaignAuditBundle(campaignId);
      res.json(auditBundle);
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ error: error.message, code: error.code });
        return;
      }

      console.error("[gateway] Failed to read campaign audit trail:", error);
      res.status(500).json({ error: "Failed to read campaign audit trail", code: "INTERNAL_ERROR" });
    }
  });

  return app;
}
