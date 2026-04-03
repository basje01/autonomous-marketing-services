import {
  ComputeBudgetProgram,
  Connection,
  Keypair,
  PublicKey,
  Transaction,
  TransactionInstruction,
  sendAndConfirmTransaction,
} from "@solana/web3.js";
import { config } from "./config.js";
import { AppError } from "./errors.js";

const DEFAULT_COMMITMENT = "confirmed";
const DEFAULT_PRIORITY_MICRO_LAMPORTS = 50_000;
const MAX_TX_RETRIES = 2;
const TX_RETRY_DELAY_MS = 2_000;

let connection: Connection | undefined;
let platformKeypair: Keypair | undefined;

export function getSolanaConnection(): Connection {
  connection ??= new Connection(config.solanaRpcUrl, DEFAULT_COMMITMENT);
  return connection;
}

export function getPlatformKeypair(): Keypair {
  if (!platformKeypair) {
    if (config.walletPrivateKey) {
      platformKeypair = Keypair.fromSecretKey(Uint8Array.from(config.walletPrivateKey));
    } else if (config.nodeEnv === "production") {
      throw new AppError(
        "SOLANA_WALLET_PRIVATE_KEY is required in production",
        500,
        "SOLANA_WALLET_MISSING",
      );
    } else {
      console.warn("[solana] WARNING: No wallet key configured; generating ephemeral devnet keypair");
      platformKeypair = Keypair.generate();
    }
  }

  return platformKeypair;
}

export function getPlatformPublicKey(): PublicKey {
  return getPlatformKeypair().publicKey;
}

export function createComputeBudgetInstruction(units: number): TransactionInstruction {
  return ComputeBudgetProgram.setComputeUnitLimit({ units });
}

export function createPriorityFeeInstruction(microLamports: number = DEFAULT_PRIORITY_MICRO_LAMPORTS): TransactionInstruction {
  return ComputeBudgetProgram.setComputeUnitPrice({ microLamports });
}

export async function sendPlatformTransaction(
  instructions: TransactionInstruction[],
  label: string,
  additionalSigners: Keypair[] = [],
): Promise<string> {
  if (instructions.length === 0) {
    throw new AppError("Cannot send empty Solana transaction", 500, "SOLANA_TRANSACTION_EMPTY");
  }

  // Inject priority fee if not already present
  const hasPriorityFee = instructions.some((ix) =>
    ix.programId.equals(ComputeBudgetProgram.programId) && ix.data.length >= 5 && ix.data[0] === 3,
  );
  const finalInstructions = hasPriorityFee
    ? instructions
    : [createPriorityFeeInstruction(), ...instructions];

  const payer = getPlatformKeypair();
  let lastError: Error | undefined;

  for (let attempt = 0; attempt <= MAX_TX_RETRIES; attempt++) {
    try {
      const signature = await sendAndConfirmTransaction(
        getSolanaConnection(),
        new Transaction().add(...finalInstructions),
        [payer, ...additionalSigners],
        {
          commitment: DEFAULT_COMMITMENT,
          preflightCommitment: DEFAULT_COMMITMENT,
        },
      );

      console.warn(`[solana] ${label}: ${signature}`);
      return signature;
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));
      const message = lastError.message;

      // Retry on transient errors only
      const isTransient = message.includes("BlockhashNotFound")
        || message.includes("block height exceeded")
        || message.includes("timeout");

      if (isTransient && attempt < MAX_TX_RETRIES) {
        console.warn(`[solana] ${label}: transient error (attempt ${attempt + 1}/${MAX_TX_RETRIES + 1}), retrying in ${TX_RETRY_DELAY_MS}ms: ${message}`);
        await new Promise((resolve) => setTimeout(resolve, TX_RETRY_DELAY_MS));
        continue;
      }

      throw new AppError(
        `Solana transaction failed (${label}): ${message}`,
        500,
        "SOLANA_TRANSACTION_FAILED",
      );
    }
  }

  throw new AppError(
    `Solana transaction failed after ${MAX_TX_RETRIES + 1} attempts (${label}): ${lastError?.message}`,
    500,
    "SOLANA_TRANSACTION_FAILED",
  );
}
