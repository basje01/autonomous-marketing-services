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
  SOLANA_WALLET_PRIVATE_KEY: z
    .string()
    .transform((val) => {
      try {
        const parsed = JSON.parse(val) as unknown;
        if (!Array.isArray(parsed) || parsed.length !== 64) return undefined;
        if (
          !parsed.every((n) => typeof n === "number" && Number.isInteger(n) && n >= 0 && n <= 255)
        )
          return undefined;
        return parsed as number[];
      } catch {
        return undefined;
      }
    })
    .optional(),
  USDC_MINT: z.string().default("4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU"),
  KAMINO_PROGRAM_ID: z.string().default("SLendK7ySfcEzyaFqy93gDnD3RtrpXJcnRwb6zFHJSh"),
  KAMINO_FARMS_PROGRAM_ID: z.string().default("FarmsPZpWu9i7Kky8tPN37rs2TpmMrAZrC7S7vJa91Hr"),
  KAMINO_LENDING_MARKET: z.string().optional(),
  KAMINO_USDC_RESERVE: z.string().optional(),

  // x402
  X402_FACILITATOR_URL: z.string().url().default("https://x402.coinbase.com"),
  CAMPAIGN_PRICE_USDC: z.coerce.number().positive().default(5),

  // Campaign
  DELIVERABLES_EXPECTED: z.coerce.number().int().min(1).max(10).default(6),
  AUDIT_LOG_DIR: z.string().default("./data/audit"),

  // Paperclip
  PAPERCLIP_API_URL: z.string().url().default("http://localhost:3100"),

  // Twitter intel
  TWITTERAPI_IO_KEY: z.string().min(1).optional(),

  // Auth
  GATEWAY_API_KEY: z.string().min(16).optional(),

  // CORS
  CORS_ORIGIN: z.string().optional(),
});

export type Env = z.infer<typeof envSchema>;

// === Request Schemas ===

export const milestoneInputSchema = z.object({
  name: z.string().min(1).max(120),
  amountUsdc: z.coerce.number().positive(),
});

export const deployRequestSchema = z.object({
  projectName: z.string().min(1).max(200),
  description: z.string().min(1).max(5000),
  targetAudience: z.string().min(1).max(2000),
  website: z.string().url().startsWith("https://").optional(),
  budgetUsdc: z.coerce.number().positive().optional(),
  milestones: z.array(milestoneInputSchema).min(1).max(10).optional(),
});

export type DeployRequest = z.infer<typeof deployRequestSchema>;
export type DeployMilestone = z.infer<typeof milestoneInputSchema>;

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
