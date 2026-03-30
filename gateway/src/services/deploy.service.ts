import crypto from "node:crypto";
import { config } from "../config.js";
import { createCompany, hireAgents, createInitialTask } from "../paperclip-client.js";
import { initializeCampaign } from "../escrow-client.js";
import { platformAddress } from "../x402.js";
import { AppError } from "../errors.js";
import type { DeployRequest } from "../schemas.js";

export interface DeployResult {
  campaignId: string;
  company: { id: string; name: string; dashboardUrl: string };
  agents: { id: string; name: string }[];
  initialTask: { id: string; identifier: string };
  message: string;
}

/**
 * Deploy an autonomous marketing team.
 *
 * Pure business logic — no HTTP concerns.
 * Throws AppError on failure (caller handles response).
 */
export async function deployMarketingTeam(input: DeployRequest): Promise<DeployResult> {
  const campaignId = crypto.randomUUID();

  // Step 1: Initialize escrow on Solana
  await initializeCampaign({
    platformAddress,
    campaignId,
    budgetUsdcMicro: config.campaignPriceUsdcMicro,
    deliverablesExpected: config.deliverablesExpected,
  });

  // Step 2: Create Paperclip company
  const company = await createCompany(
    input.projectName,
    `Autonomous marketing team for ${input.projectName}. Execute a full marketing campaign: research, SEO, content, social, and community.`,
  );

  // Step 3: Hire agents
  const agents = await hireAgents(company.id);

  // Step 4: Find strategist and assign initial task
  const strategist = agents.find((a) => a.name === "Minerva");
  if (!strategist) {
    throw new AppError("Failed to hire Minerva (Marketing Strategist)", 500, "STRATEGIST_MISSING");
  }

  const task = await createInitialTask(company.id, strategist.id, {
    name: input.projectName,
    description: input.description,
    targetAudience: input.targetAudience,
    website: input.website,
  });

  return {
    campaignId,
    company: {
      id: company.id,
      name: company.name,
      dashboardUrl: `${config.paperclipApiUrl}/companies/${company.id}`,
    },
    agents: agents.map((a) => ({ id: a.id, name: a.name })),
    initialTask: { id: task.id, identifier: task.identifier },
    message: `Autonomous marketing team deployed for ${input.projectName}. ${agents.length} agents hired and Minerva is beginning research.`,
  };
}
