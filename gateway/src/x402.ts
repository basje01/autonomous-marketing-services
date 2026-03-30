import { Keypair } from "@solana/web3.js";
import { ExactSvmScheme } from "@x402/svm/exact/server";
import { SOLANA_DEVNET_CAIP2, SOLANA_MAINNET_CAIP2 } from "@x402/svm";
import { paymentMiddlewareFromConfig } from "@x402/express";
import type { SchemeRegistration } from "@x402/express";
import { HTTPFacilitatorClient } from "@x402/core/server";
import { config } from "./config.js";

/**
 * Create the x402 payment middleware for Express.
 *
 * Flow:
 *   1. Client hits POST /api/deploy-marketing-team without payment
 *   2. Middleware returns 402 with payment requirements (USDC amount, network, payTo address)
 *   3. Client constructs Solana USDC payment, retries with X-PAYMENT header
 *   4. Middleware verifies via facilitator, settles on-chain, passes to route handler
 *   5. Route handler deploys the marketing team
 *
 * Security: platformKeypair NEVER leaves this module. Only the public address is exported.
 */

// Platform wallet — isolated in this module, never exported
const platformKeypair = process.env.SOLANA_WALLET_PRIVATE_KEY
  ? Keypair.fromSecretKey(
      Uint8Array.from(JSON.parse(process.env.SOLANA_WALLET_PRIVATE_KEY))
    )
  : (() => {
      if (process.env.NODE_ENV === "production") {
        throw new Error("SOLANA_WALLET_PRIVATE_KEY is required in production");
      }
      console.warn("[x402] WARNING: No wallet key set — generating ephemeral devnet keypair. Funds will be lost on restart.");
      return Keypair.generate();
    })();

export const platformAddress = platformKeypair.publicKey.toBase58();

export function createX402Middleware() {
  // Price in USD string format
  const priceUsdc = `$${(config.campaignPriceUsdcMicro / 1_000_000).toFixed(2)}`;

  // Network — configurable via env
  const network = (config.solanaNetwork === "mainnet"
    ? SOLANA_MAINNET_CAIP2
    : SOLANA_DEVNET_CAIP2) as `${string}:${string}`;

  // Routes config with explicit type
  const routes: Record<string, {
    accepts: { scheme: "exact"; network: `${string}:${string}`; payTo: string; price: string };
    description: string;
  }> = {
    "POST /api/deploy-marketing-team": {
      accepts: {
        scheme: "exact",
        network,
        payTo: platformAddress,
        price: priceUsdc,
      },
      description: "Deploy an autonomous marketing team (6 AI agents backed by 161 specialist skills)",
    },
  };

  // Register server-side SVM scheme for payment verification
  const schemes: SchemeRegistration[] = [
    {
      network,
      server: new ExactSvmScheme(),
    },
  ];

  // Facilitator client — uses configured URL instead of SDK default
  const facilitatorClient = new HTTPFacilitatorClient({
    url: config.x402FacilitatorUrl,
  });

  console.log(`[x402] Platform: ${platformAddress.slice(0, 8)}...`);
  console.log(`[x402] Price: ${priceUsdc} USDC on Solana ${config.solanaNetwork}`);
  console.log(`[x402] Facilitator: ${config.x402FacilitatorUrl}`);

  // Create middleware — handles 402 responses and payment verification
  const middleware = paymentMiddlewareFromConfig(
    routes,
    facilitatorClient,
    schemes,
  );

  return middleware;
}
