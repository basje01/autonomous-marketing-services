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
  walletPrivateKey: env.SOLANA_WALLET_PRIVATE_KEY as number[] | undefined,

  // Solana
  solanaNetwork: env.SOLANA_NETWORK,
  solanaRpcUrl: env.SOLANA_RPC_URL,
  campaignEscrowProgramId: env.CAMPAIGN_ESCROW_PROGRAM_ID,
  usdcMint: env.USDC_MINT,
  kaminoProgramId: env.KAMINO_PROGRAM_ID,
  kaminoFarmsProgramId: env.KAMINO_FARMS_PROGRAM_ID,
  kaminoLendingMarket: env.KAMINO_LENDING_MARKET,
  kaminoUsdcReserve: env.KAMINO_USDC_RESERVE,

  // x402
  x402FacilitatorUrl: env.X402_FACILITATOR_URL,
  campaignPriceUsdcMicro: Math.round(env.CAMPAIGN_PRICE_USDC * 1_000_000),

  // Campaign
  deliverablesExpected: env.DELIVERABLES_EXPECTED,
  auditLogDir: env.AUDIT_LOG_DIR,

  // Paperclip
  paperclipApiUrl: env.PAPERCLIP_API_URL,

  // Twitter intel
  twitterApiKey: env.TWITTERAPI_IO_KEY,

  // Auth
  gatewayApiKey: env.GATEWAY_API_KEY,

  // CORS
  corsOrigin: env.CORS_ORIGIN,
} as const;
