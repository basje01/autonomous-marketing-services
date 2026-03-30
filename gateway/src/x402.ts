import { Keypair } from "@solana/web3.js";
import { ExactSvmScheme } from "@x402/svm/exact/server";
import { SOLANA_DEVNET_CAIP2 } from "@x402/svm";
import { paymentMiddlewareFromConfig } from "@x402/express";
import type { SchemeRegistration } from "@x402/express";
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
 */
export function createX402Middleware() {
  // Platform wallet — receives USDC payments
  const platformKeypair = process.env.SOLANA_WALLET_PRIVATE_KEY
    ? Keypair.fromSecretKey(
        Uint8Array.from(JSON.parse(process.env.SOLANA_WALLET_PRIVATE_KEY))
      )
    : Keypair.generate(); // Devnet placeholder

  const platformAddress = platformKeypair.publicKey.toBase58();

  // Price in USD string format
  const priceUsdc = `$${(config.campaignPriceUsdcMicro / 1_000_000).toFixed(2)}`;

  // Network as template literal type to satisfy `${string}:${string}`
  const network = SOLANA_DEVNET_CAIP2 as `${string}:${string}`;

  // Routes config — Record<"METHOD /path", RouteConfig>
  const routes = {
    "POST /api/deploy-marketing-team": {
      accepts: {
        scheme: "exact" as const,
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

  console.log(`[x402] Platform wallet: ${platformAddress}`);
  console.log(`[x402] Campaign price: ${priceUsdc} USDC on Solana devnet`);

  // Create middleware — handles 402 responses and payment verification automatically
  const middleware = paymentMiddlewareFromConfig(
    routes,
    undefined,    // no custom facilitator client (uses default CDP facilitator)
    schemes,
  );

  return { middleware, platformAddress, platformKeypair };
}
