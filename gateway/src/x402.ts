import { Keypair } from "@solana/web3.js";
import { ExactSvmScheme } from "@x402/svm/exact/server";
import { SOLANA_DEVNET_CAIP2, SOLANA_MAINNET_CAIP2 } from "@x402/svm";
import { paymentMiddlewareFromConfig } from "@x402/express";
import type { SchemeRegistration } from "@x402/express";
import { HTTPFacilitatorClient } from "@x402/core/server";
import { config } from "./config.js";

// Lazy singleton — only initialized when first accessed, not at module load
let _keypair: Keypair | undefined;
let _address: string | undefined;

function getPlatformKeypair(): Keypair {
  if (!_keypair) {
    if (config.walletPrivateKey) {
      _keypair = Keypair.fromSecretKey(Uint8Array.from(config.walletPrivateKey));
    } else if (config.nodeEnv === "production") {
      throw new Error("SOLANA_WALLET_PRIVATE_KEY is required in production");
    } else {
      console.warn("[x402] WARNING: No wallet key — generating ephemeral devnet keypair");
      _keypair = Keypair.generate();
    }
  }
  return _keypair;
}

export function getPlatformAddress(): string {
  if (!_address) {
    _address = getPlatformKeypair().publicKey.toBase58();
  }
  return _address;
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
