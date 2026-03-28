import { PublicKey } from "@solana/web3.js";
import type { Keypair } from "@solana/web3.js";

/**
 * Escrow client for the Anchor campaign-escrow program.
 *
 * Instructions:
 *   initialize_campaign  — client deposits USDC into PDA
 *   submit_deliverable   — gateway submits deliverable hash + agent ID
 *   complete_campaign    — all deliverables done → release USDC
 *   cancel_campaign      — refund if no work started
 *
 * TODO: Wire to actual Anchor IDL once program is built (Phase 0, Days 6-7)
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
  clientKeypair: Keypair;
  campaignId: string;
  budgetUsdcMicro: number;
  deliverablesExpected: number;
}): Promise<string> {
  // TODO: Build and send Anchor transaction
  console.log(
    `[escrow] Would initialize campaign ${params.campaignId}`,
    `budget=${params.budgetUsdcMicro / 1_000_000} USDC`,
    `deliverables=${params.deliverablesExpected}`
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
  // TODO: Build and send Anchor transaction
  console.log(
    `[escrow] Would submit deliverable for campaign ${params.campaignId}`,
    `hash=${params.deliverableHash}`,
    `agent=${params.agentId}`
  );
  return "placeholder-tx-signature";
}

/**
 * Complete a campaign and release escrowed USDC.
 * Only callable when all deliverables have been submitted.
 */
export async function completeCampaign(params: {
  campaignId: string;
}): Promise<string> {
  // TODO: Build and send Anchor transaction
  console.log(
    `[escrow] Would complete campaign ${params.campaignId} and release USDC`
  );
  return "placeholder-tx-signature";
}

/**
 * Cancel a campaign and refund escrowed USDC to the client.
 * Only callable if no deliverables have been submitted yet.
 */
export async function cancelCampaign(params: {
  campaignId: string;
}): Promise<string> {
  // TODO: Build and send Anchor transaction
  console.log(`[escrow] Would cancel campaign ${params.campaignId} and refund`);
  return "placeholder-tx-signature";
}
