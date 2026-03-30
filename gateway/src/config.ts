import "dotenv/config";
import { envSchema } from "./schemas.js";

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error("[config] Invalid environment variables:");
  for (const [field, errors] of Object.entries(parsed.error.flatten().fieldErrors)) {
    console.error(`  ${field}: ${errors?.join(", ")}`);
  }
  process.exit(1);
}

const env = parsed.data;

export const config = {
  port: env.GATEWAY_PORT,
  nodeEnv: env.NODE_ENV,

  // Solana
  solanaNetwork: env.SOLANA_NETWORK,
  solanaRpcUrl: env.SOLANA_RPC_URL,
  campaignEscrowProgramId: env.CAMPAIGN_ESCROW_PROGRAM_ID,
  usdcMint: env.USDC_MINT,

  // x402
  x402FacilitatorUrl: env.X402_FACILITATOR_URL,
  campaignPriceUsdcMicro: Math.round(env.CAMPAIGN_PRICE_USDC * 1_000_000),

  // Campaign
  deliverablesExpected: env.DELIVERABLES_EXPECTED,

  // Paperclip
  paperclipApiUrl: env.PAPERCLIP_API_URL,

  // CORS
  corsOrigin: env.CORS_ORIGIN,
} as const;
