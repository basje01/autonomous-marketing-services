import "dotenv/config";

export const config = {
  // Server
  port: parseInt(process.env.GATEWAY_PORT || "3001", 10),

  // Solana
  solanaNetwork: (process.env.SOLANA_NETWORK || "devnet") as "devnet" | "mainnet",
  solanaRpcUrl: process.env.SOLANA_RPC_URL || "https://api.devnet.solana.com",
  campaignEscrowProgramId: process.env.CAMPAIGN_ESCROW_PROGRAM_ID || "",

  // x402
  x402FacilitatorUrl:
    process.env.X402_FACILITATOR_URL || "https://x402.coinbase.com",

  // USDC price stored as integer micro-units (6 decimals) to avoid float rounding
  campaignPriceUsdcMicro: Math.round(
    parseFloat(process.env.CAMPAIGN_PRICE_USDC || "5") * 1_000_000
  ),

  // Campaign
  deliverablesExpected: parseInt(process.env.DELIVERABLES_EXPECTED || "5", 10),

  // Paperclip
  paperclipApiUrl: process.env.PAPERCLIP_API_URL || "http://localhost:3100",

  // USDC mint on devnet
  usdcMint:
    process.env.USDC_MINT || "4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU",
} as const;
