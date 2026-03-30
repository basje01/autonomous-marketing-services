import { z } from "zod";

// === Environment Schema ===
// Validated once at startup. Crashes early if invalid.

export const envSchema = z.object({
  GATEWAY_PORT: z.coerce.number().int().min(1).max(65535).default(3001),
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),

  // Solana
  SOLANA_NETWORK: z.enum(["devnet", "mainnet"]).default("devnet"),
  SOLANA_RPC_URL: z.string().url().default("https://api.devnet.solana.com"),
  CAMPAIGN_ESCROW_PROGRAM_ID: z.string().default("5Ljn3VEwSQ1PBbsEMuQ6jZr9uWPBpRJ8FLNbqUaSDq7Z"),
  SOLANA_WALLET_PRIVATE_KEY: z.string().transform((val) => {
    try { return JSON.parse(val) as number[]; } catch { return undefined; }
  }).optional(),
  USDC_MINT: z.string().default("4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU"),

  // x402
  X402_FACILITATOR_URL: z.string().url().default("https://x402.coinbase.com"),
  CAMPAIGN_PRICE_USDC: z.coerce.number().positive().default(5),

  // Campaign
  DELIVERABLES_EXPECTED: z.coerce.number().int().min(1).max(10).default(6),

  // Paperclip
  PAPERCLIP_API_URL: z.string().url().default("http://localhost:3100"),

  // CORS
  CORS_ORIGIN: z.string().optional(),
});

export type Env = z.infer<typeof envSchema>;

// === Request Schemas ===

export const deployRequestSchema = z.object({
  projectName: z.string().min(1).max(200),
  description: z.string().min(1).max(5000),
  targetAudience: z.string().min(1).max(2000),
  website: z.string().url().startsWith("https://").optional(),
});

export type DeployRequest = z.infer<typeof deployRequestSchema>;

// === Paperclip API Response Schemas ===
// Validates what the Paperclip API actually returns instead of trusting it blindly.

export const createCompanyResponseSchema = z.object({
  id: z.string(),
  name: z.string(),
});

export const createAgentResponseSchema = z.object({
  id: z.string(),
  name: z.string(),
});

export const createIssueResponseSchema = z.object({
  id: z.string(),
  identifier: z.string(),
});
