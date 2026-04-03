import express from "express";
import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";
import crypto from "node:crypto";
import { config } from "./config.js";
import { readCampaignAuditBundle } from "./audit-trail.js";
import { validateSupportedDeployRequest } from "./deploy-validation.js";
import { createX402Middleware, getPlatformAddress } from "./x402.js";
import { deployMarketingTeam } from "./services/deploy.service.js";
import { listCompanies } from "./paperclip-client.js";
import { deployRequestSchema } from "./schemas.js";
import type { DeployRequest } from "./schemas.js";
import { AppError } from "./errors.js";
import { TwitterClient, LlmsTxtFormatter } from "./services/twitter.service.js";

const MAX_IDEMPOTENCY_ENTRIES = 1000;
const IDEMPOTENCY_PENDING_TTL_MS = 5 * 60_000;
const VALID_FORMATS = new Set(["json", "llms-txt", "compact"]);

type IdempotencyEntry =
  | { state: "pending"; expiresAt: number }
  | { state: "completed"; status: number; body: unknown; expiresAt: number };

export function createApp(): express.Express {
  const app = express();

  // Security
  app.use(
    helmet({
      hsts: { maxAge: 31536000, includeSubDomains: true, preload: true },
      contentSecurityPolicy: false, // API-only, no HTML served
    }),
  );
  app.use(
    cors({
      origin: (config.corsOrigin?.split(",").map((s) => s.trim()) ?? []).filter(Boolean),
      methods: ["GET", "POST"],
    }),
  );
  app.use(express.json({ limit: "10kb" }));

  // Rate limiting
  const deployLimiter = rateLimit({
    windowMs: 60_000,
    max: 5,
    standardHeaders: true,
    legacyHeaders: false,
  });
  const readLimiter = rateLimit({
    windowMs: 60_000,
    max: 30,
    standardHeaders: true,
    legacyHeaders: false,
  });

  // x402 payment gate — only on the deploy endpoint, not globally (E23)
  const x402 = createX402Middleware();

  // Idempotency store with max-size cap (E08)
  const idempotencyStore = new Map<string, IdempotencyEntry>();
  setInterval(() => {
    const now = Date.now();
    for (const [key, val] of idempotencyStore) {
      if (val.expiresAt < now) idempotencyStore.delete(key);
    }
  }, 5 * 60_000).unref();

  // Lazy singleton Twitter client (L1)
  let twitterClient: TwitterClient | undefined;

  // Optional API key auth for sensitive endpoints (C7)
  function requireApiKey(req: express.Request, res: express.Response, next: express.NextFunction) {
    if (!config.gatewayApiKey) {
      if (config.nodeEnv === "production") {
        res.status(500).json({ error: "GATEWAY_API_KEY is required in production", code: "CONFIG_ERROR" });
        return;
      }
      next();
      return;
    }
    const provided = req.headers["x-api-key"];
    if (provided !== config.gatewayApiKey) {
      res.status(401).json({ error: "Invalid or missing API key", code: "UNAUTHORIZED" });
      return;
    }
    next();
  }

  // === Routes ===

  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", service: "frontier-marketing-os-gateway" });
  });

  app.post(
    "/api/deploy-marketing-team",
    deployLimiter,
    validateDeployRequestInput,
    serveCachedIdempotencyResponse,
    x402,
    async (req, res) => {
      const idempotencyKey = getIdempotencyKey(req.headers["x-idempotency-key"]);
      const deployRequest = res.locals.deployRequest as DeployRequest | undefined;
      if (!deployRequest) {
        if (idempotencyKey) idempotencyStore.delete(idempotencyKey);
        res.status(500).json({ error: "Validated deploy request missing", code: "INTERNAL_ERROR" });
        return;
      }

      try {
        const result = await deployMarketingTeam(deployRequest, getPlatformAddress());

        // Cache success (1h TTL, E08: cap size)
        if (idempotencyKey) {
          if (idempotencyStore.size >= MAX_IDEMPOTENCY_ENTRIES) {
            const oldest = idempotencyStore.keys().next().value;
            if (oldest) idempotencyStore.delete(oldest);
          }
          idempotencyStore.set(idempotencyKey, {
            state: "completed",
            status: 200,
            body: result,
            expiresAt: Date.now() + 3_600_000,
          });
        }

        res.json(result);
      } catch (error) {
        const errorId = crypto.randomUUID();
        const errorBody =
          error instanceof AppError
            ? { error: error.message, code: error.code, errorId }
            : {
                error: "Failed to deploy marketing team",
                code: "INTERNAL_ERROR",
                errorId,
                refundStatus: "pending_manual_review",
              };
        const status = error instanceof AppError ? error.statusCode : 500;

        // Cache failures with short TTL to prevent duplicate deploys on retry (E06)
        if (idempotencyKey) {
          idempotencyStore.set(idempotencyKey, {
            state: "completed",
            status,
            body: errorBody,
            expiresAt: Date.now() + 300_000,
          });
        }

        if (!(error instanceof AppError)) {
          console.error(
            `[gateway] PAYMENT TAKEN BUT DEPLOY FAILED — errorId=${errorId} — MANUAL INTERVENTION REQUIRED`,
          );
        }
        console.error(`[gateway] [${errorId}]:`, error instanceof Error ? error.message : error);
        res.status(status).json(errorBody);
      }
    },
  );

  // E04: Validated campaigns response
  app.get("/api/campaigns", readLimiter, requireApiKey, async (_req, res) => {
    try {
      const companies = await listCompanies();
      res.json(companies);
    } catch {
      res
        .status(502)
        .json({ error: "Failed to reach Paperclip API", code: "EXTERNAL_SERVICE_ERROR" });
    }
  });

  app.get("/api/campaigns/:campaignId/audit", readLimiter, requireApiKey, async (req, res) => {
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
      res
        .status(500)
        .json({ error: "Failed to read campaign audit trail", code: "INTERNAL_ERROR" });
    }
  });

  // === Twitter Intel Routes ===

  function getTwitterClient(): TwitterClient {
    if (!config.twitterApiKey) {
      throw new AppError("Twitter API not configured", 501, "TWITTER_NOT_CONFIGURED");
    }
    twitterClient ??= new TwitterClient({ apiKey: config.twitterApiKey });
    return twitterClient;
  }

  app.get("/api/twitter/tweet/:tweetId", readLimiter, requireApiKey, async (req, res) => {
    try {
      const tweetId = req.params.tweetId;
      if (!tweetId || !/^\d{1,25}$/.test(tweetId)) {
        res.status(400).json({ error: "Invalid tweet ID", code: "VALIDATION_ERROR" });
        return;
      }
      const twitter = getTwitterClient();
      const tweets = await twitter.fetchTweetsByIds([tweetId]);
      if (tweets.length === 0) {
        res.status(404).json({ error: "Tweet not found", code: "NOT_FOUND" });
        return;
      }
      res.json({
        meta: { fetchedAt: new Date().toISOString(), source: "twitterapi.io" },
        tweet: tweets[0],
      });
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ error: error.message, code: error.code });
        return;
      }
      console.error("[gateway] Twitter tweet fetch failed:", error);
      res.status(502).json({ error: "Failed to fetch tweet", code: "EXTERNAL_SERVICE_ERROR" });
    }
  });

  app.get("/api/twitter/account/:username/latest", readLimiter, requireApiKey, async (req, res) => {
    try {
      const username = req.params.username;
      if (!username || !/^[a-zA-Z0-9_]{1,15}$/.test(username)) {
        res.status(400).json({ error: "Invalid username", code: "VALIDATION_ERROR" });
        return;
      }
      const twitter = getTwitterClient();
      const { tweets } = await twitter.fetchUserTweets(username);
      const format = (req.query.format as string) || "json";

      if (!VALID_FORMATS.has(format)) {
        res.status(400).json({
          error: `Invalid format: ${format}. Must be one of: ${[...VALID_FORMATS].join(", ")}`,
          code: "VALIDATION_ERROR",
        });
        return;
      }

      const date = new Date().toISOString().slice(0, 10);

      if (format === "llms-txt") {
        const accounts = new Map([[username, tweets]]);
        res.type("text/plain").send(LlmsTxtFormatter.toLlmsTxt({ date, accounts }));
        return;
      }

      if (format === "compact") {
        res.type("text/plain").send(LlmsTxtFormatter.toCompactContext(tweets));
        return;
      }

      res.json({
        meta: {
          fetchedAt: new Date().toISOString(),
          source: "twitterapi.io",
          tweetCount: tweets.length,
        },
        tweets,
      });
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ error: error.message, code: error.code });
        return;
      }
      console.error("[gateway] Twitter account fetch failed:", error);
      res
        .status(502)
        .json({ error: "Failed to fetch account tweets", code: "EXTERNAL_SERVICE_ERROR" });
    }
  });

  app.get("/api/twitter/intel/today", readLimiter, requireApiKey, async (_req, res) => {
    try {
      const date = new Date().toISOString().slice(0, 10);
      const fs = await import("node:fs");
      const path = await import("node:path");

      // Try to serve pre-generated daily intel file
      const mdPath = path.resolve("intel/twitter", `${date}.md`);
      if (fs.existsSync(mdPath)) {
        res.type("text/plain").send(fs.readFileSync(mdPath, "utf-8"));
        return;
      }

      // No cached file — return 404 with guidance
      res.status(404).json({
        error: "Today's intel not yet generated",
        code: "NOT_FOUND",
        hint: "Run: npx tsx scripts/fetch-tweets.ts daily",
      });
    } catch (error) {
      console.error("[gateway] Twitter intel fetch failed:", error);
      res.status(500).json({ error: "Failed to read intel", code: "INTERNAL_ERROR" });
    }
  });

  // Global error handler (M6)
  app.use(
    (err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
      console.error("[gateway] Unhandled error:", err);
      if (err instanceof AppError) {
        res.status(err.statusCode).json({ error: err.message, code: err.code });
        return;
      }
      res.status(500).json({ error: "Internal server error", code: "INTERNAL_ERROR" });
    },
  );

  return app;

  function validateDeployRequestInput(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) {
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
      validateSupportedDeployRequest(parsed.data);
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ error: error.message, code: error.code });
        return;
      }
      next(error);
      return;
    }

    res.locals.deployRequest = parsed.data;
    next();
  }

  function serveCachedIdempotencyResponse(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) {
    const idempotencyKey = getIdempotencyKey(req.headers["x-idempotency-key"]);
    if (!idempotencyKey) {
      next();
      return;
    }

    const cached = idempotencyStore.get(idempotencyKey);
    if (cached) {
      if (cached.state === "pending") {
        res.status(409).json({
          error: "A request with this idempotency key is already in progress",
          code: "IDEMPOTENCY_IN_PROGRESS",
        });
        return;
      }

      res.status(cached.status).json(cached.body);
      return;
    }

    if (idempotencyStore.size >= MAX_IDEMPOTENCY_ENTRIES) {
      const oldest = idempotencyStore.keys().next().value;
      if (oldest) idempotencyStore.delete(oldest);
    }

    idempotencyStore.set(idempotencyKey, {
      state: "pending",
      expiresAt: Date.now() + IDEMPOTENCY_PENDING_TTL_MS,
    });

    next();
  }
}

function getIdempotencyKey(rawKey: unknown): string | undefined {
  if (typeof rawKey !== "string") return undefined;
  if (rawKey.length > 128) return undefined;
  if (!/^[a-zA-Z0-9_-]+$/.test(rawKey)) return undefined;
  return rawKey;
}
