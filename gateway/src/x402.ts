import { ExactSvmScheme } from "@x402/svm/exact/server";
import { SOLANA_DEVNET_CAIP2, SOLANA_MAINNET_CAIP2 } from "@x402/svm";
import { paymentMiddlewareFromConfig } from "@x402/express";
import type { SchemeRegistration } from "@x402/express";
import { HTTPFacilitatorClient } from "@x402/core/server";
import { config } from "./config.js";
import { getPlatformPublicKey } from "./solana.js";

export function getPlatformAddress(): string {
  return getPlatformPublicKey().toBase58();
}

export function createX402Middleware() {
  const address = getPlatformAddress();
  const priceUsdc = `$${(config.campaignPriceUsdcMicro / 1_000_000).toFixed(2)}`;

  const network = (config.solanaNetwork === "mainnet"
    ? SOLANA_MAINNET_CAIP2
    : SOLANA_DEVNET_CAIP2) as `${string}:${string}`;

  const routes: Record<string, {
    accepts: { scheme: "exact"; network: `${string}:${string}`; payTo: string; price: string };
    description: string;
  }> = {
    "POST /api/deploy-marketing-team": {
      accepts: { scheme: "exact", network, payTo: address, price: priceUsdc },
      description: "Deploy an autonomous marketing team (7 AI agents backed by 161 specialist skills)",
    },
  };

  const schemes: SchemeRegistration[] = [
    { network, server: new ExactSvmScheme() },
  ];

  const facilitatorClient = new HTTPFacilitatorClient({ url: config.x402FacilitatorUrl });

  console.warn(`[x402] Platform: ${address.slice(0, 8)}...`);
  console.warn(`[x402] Price: ${priceUsdc} USDC on Solana ${config.solanaNetwork}`);

  return paymentMiddlewareFromConfig(routes, facilitatorClient, schemes);
}
