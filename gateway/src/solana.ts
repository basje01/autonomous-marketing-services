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

export async function sendPlatformTransaction(
  instructions: TransactionInstruction[],
  label: string,
  additionalSigners: Keypair[] = [],
): Promise<string> {
  if (instructions.length === 0) {
    throw new AppError("Cannot send empty Solana transaction", 500, "SOLANA_TRANSACTION_EMPTY");
  }

  const payer = getPlatformKeypair();
  const signature = await sendAndConfirmTransaction(
    getSolanaConnection(),
    new Transaction().add(...instructions),
    [payer, ...additionalSigners],
    {
      commitment: DEFAULT_COMMITMENT,
      preflightCommitment: DEFAULT_COMMITMENT,
    },
  );

  console.info(`[solana] ${label}: ${signature}`);
  return signature;
}
