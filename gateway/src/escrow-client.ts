import { PublicKey } from "@solana/web3.js";

/**
 * Escrow client for the Anchor campaign-escrow program.
 *
 * Instructions:
 *   initialize_campaign  — client deposits USDC into PDA
 *   submit_deliverable   — gateway submits deliverable hash + agent ID
 *   complete_campaign    — all deliverables done → release USDC
 *   cancel_campaign      — refund if no work started
 *
 * TODO: Wire to actual Anchor IDL once program is deployed to devnet.
 * Transaction signing will use a dedicated signer module (not raw keypair).
 */

/**
 * Derive the campaign PDA from the client pubkey and campaign ID.
 */
export function deriveCampaignPDA(
  clientPubkey: PublicKey,
  campaignId: string,
  programId: PublicKey
): [PublicKey, number] {
  return PublicKey.findProgramAddressSync(
    [
      Buffer.from("campaign"),
      clientPubkey.toBuffer(),
      Buffer.from(campaignId),
    ],
    programId
  );
}

/**
 * Initialize a campaign escrow on-chain.
 * Deposits USDC into the PDA and sets the expected deliverable count.
 */
export async function initializeCampaign(params: {
  platformAddress: string;
  campaignId: string;
  budgetUsdcMicro: number;
  deliverablesExpected: number;
}): Promise<string> {
  if (process.env.NODE_ENV === "production") {
    throw new Error("Escrow client not yet implemented — cannot accept real payments in production");
  }

  // TODO: Build and send Anchor transaction via dedicated signer module
  console.log(
    `[escrow] STUB: Would initialize campaign ${params.campaignId}`,
    `budget=${params.budgetUsdcMicro / 1_000_000} USDC`,
    `deliverables=${params.deliverablesExpected}`,
    `platform=${params.platformAddress}`
  );
  return "placeholder-tx-signature";
}

/**
 * Submit a deliverable hash to the escrow after an agent completes work.
 */
export async function submitDeliverable(params: {
  campaignId: string;
  deliverableHash: string;
  agentId: string;
}): Promise<string> {
  if (process.env.NODE_ENV === "production") {
    throw new Error("Escrow client not yet implemented");
  }

  console.log(
    `[escrow] STUB: Would submit deliverable for campaign ${params.campaignId}`,
    `hash=${params.deliverableHash}`,
    `agent=${params.agentId}`
  );
  return "placeholder-tx-signature";
}

/**
 * Complete a campaign and release escrowed USDC.
 */
export async function completeCampaign(params: {
  campaignId: string;
}): Promise<string> {
  if (process.env.NODE_ENV === "production") {
    throw new Error("Escrow client not yet implemented");
  }

  console.log(
    `[escrow] STUB: Would complete campaign ${params.campaignId} and release USDC`
  );
  return "placeholder-tx-signature";
}

/**
 * Cancel a campaign and refund escrowed USDC to the client.
 */
export async function cancelCampaign(params: {
  campaignId: string;
}): Promise<string> {
  if (process.env.NODE_ENV === "production") {
    throw new Error("Escrow client not yet implemented");
  }

  console.log(`[escrow] STUB: Would cancel campaign ${params.campaignId} and refund`);
  return "placeholder-tx-signature";
}
