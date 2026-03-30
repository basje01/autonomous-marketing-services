import crypto from "node:crypto";
import { config } from "../config.js";
import {
  appendCampaignAuditEntry,
  createCampaignAuditTrail,
  readCampaignAuditBundle,
  summarizeAuditTrail,
} from "../audit-trail.js";
import { createCompany, hireAgents, createInitialTask } from "../paperclip-client.js";
import { initializeCampaign } from "../escrow-client.js";
import { AppError } from "../errors.js";
import type { DeployRequest } from "../schemas.js";

export interface DeployAuditSummary {
  templateId: string;
  entryCount: number;
  headHash: string | null;
  trailHash: string;
  signer: string;
  signedAt: string;
  verified: boolean;
}

export interface DeployResult {
  campaignId: string;
  company: { id: string; name: string; dashboardUrl: string };
  agents: { id: string; name: string }[];
  initialTask: { id: string; identifier: string };
  message: string;
  audit: DeployAuditSummary;
}

/**
 * Deploy an autonomous marketing team.
 * Pure business logic — no HTTP concerns, no x402 dependency.
 */
export async function deployMarketingTeam(
  input: DeployRequest,
  platformAddress: string,
): Promise<DeployResult> {
  const campaignId = crypto.randomUUID();
  const budgetUsdc =
    input.budgetUsdc ?? config.campaignPriceUsdcMicro / 1_000_000;
  const milestones = input.milestones;
  const deliverablesExpected =
    milestones?.length ?? config.deliverablesExpected;
  const kaminoEnabled = Boolean(config.kaminoLendingMarket && config.kaminoUsdcReserve);

  await createCampaignAuditTrail({
    campaignId,
    metadata: {
      platformAddress,
      projectName: input.projectName,
      budgetUsdc,
      deliverablesExpected,
      kaminoEnabled,
      milestones: milestones ?? [],
    },
  });

  await appendCampaignAuditEntry(campaignId, {
    actor: "gateway.deploy-service",
    nodeId: "A",
    nodeLabel: "Record Deployment Intent",
    event: "deploy.intent.recorded",
    status: "succeeded",
    payload: {
      projectName: input.projectName,
      targetAudience: input.targetAudience,
      website: input.website ?? null,
      budgetUsdc,
      deliverablesExpected,
      kaminoEnabled,
      milestoneCount: milestones?.length ?? 0,
    },
  });

  try {
    // Step 1: Initialize escrow
    await initializeCampaign({
      platformAddress,
      campaignId,
      budgetUsdcMicro: Math.round(budgetUsdc * 1_000_000),
      deliverablesExpected,
      milestones,
      kamino: kaminoEnabled
        ? {
            programId: config.kaminoProgramId,
            farmsProgramId: config.kaminoFarmsProgramId,
            lendingMarket: config.kaminoLendingMarket!,
            usdcReserve: config.kaminoUsdcReserve!,
          }
        : undefined,
    });

    await appendCampaignAuditEntry(campaignId, {
      actor: "gateway.escrow",
      nodeId: "B",
      nodeLabel: "Initialize Escrow",
      event: "escrow.initialized",
      status: "succeeded",
      payload: {
        budgetUsdcMicro: Math.round(budgetUsdc * 1_000_000),
        deliverablesExpected,
        kaminoEnabled,
      },
    });

    await appendCampaignAuditEntry(campaignId, {
      actor: "gateway.deploy-service",
      nodeId: "C",
      nodeLabel: "Escrow Active?",
      event: "deploy.escrow.verified",
      status: "decision",
      payload: {
        active: true,
        kaminoEnabled,
      },
    });

    // Step 2: Create Paperclip company
    const company = await createCompany(
      input.projectName,
      `Autonomous marketing team for ${input.projectName}. Execute a full marketing campaign: research, SEO, content, social, and community.`,
    );

    await appendCampaignAuditEntry(campaignId, {
      actor: "gateway.paperclip",
      nodeId: "D",
      nodeLabel: "Create Paperclip Company",
      event: "paperclip.company.created",
      status: "succeeded",
      payload: {
        companyId: company.id,
        companyName: company.name,
      },
    });

    // Step 3: Hire Minerva first (must succeed), then ICs in parallel
    const agents = await hireAgents(company.id);

    await appendCampaignAuditEntry(campaignId, {
      actor: "gateway.paperclip",
      nodeId: "E",
      nodeLabel: "Hire Agents",
      event: "paperclip.agents.hired",
      status: "succeeded",
      payload: {
        companyId: company.id,
        agentCount: agents.length,
        agentNames: agents.map((agent) => agent.name),
      },
    });

    // Step 4: Find Minerva and assign initial task
    const strategist = agents.find((a) => a.name === "Minerva");
    if (!strategist) {
      await appendCampaignAuditEntry(campaignId, {
        actor: "gateway.deploy-service",
        nodeId: "F",
        nodeLabel: "Minerva Present?",
        event: "deploy.strategist.checked",
        status: "decision",
        payload: {
          strategistFound: false,
          agentNames: agents.map((agent) => agent.name),
        },
      });

      await appendCampaignAuditEntry(campaignId, {
        actor: "gateway.deploy-service",
        nodeId: "Y",
        nodeLabel: "Terminal: Strategist Missing",
        event: "deploy.strategist.missing",
        status: "failed",
        payload: {
          expectedStrategist: "Minerva",
        },
      });
      throw new AppError("Failed to hire Minerva (Marketing Strategist)", 500, "STRATEGIST_MISSING");
    }

    await appendCampaignAuditEntry(campaignId, {
      actor: "gateway.deploy-service",
      nodeId: "F",
      nodeLabel: "Minerva Present?",
      event: "deploy.strategist.checked",
      status: "decision",
      payload: {
        strategistFound: true,
        strategistId: strategist.id,
      },
    });

    const task = await createInitialTask(company.id, strategist.id, {
      name: input.projectName,
      description: input.description,
      targetAudience: input.targetAudience,
      website: input.website,
    });

    await appendCampaignAuditEntry(campaignId, {
      actor: "gateway.paperclip",
      nodeId: "G",
      nodeLabel: "Create Initial Task",
      event: "paperclip.initial_task.created",
      status: "succeeded",
      payload: {
        companyId: company.id,
        taskId: task.id,
        taskIdentifier: task.identifier,
        strategistId: strategist.id,
      },
    });

    await appendCampaignAuditEntry(campaignId, {
      actor: "gateway.deploy-service",
      nodeId: "H",
      nodeLabel: "Terminal: Deployment Complete",
      event: "deploy.completed",
      status: "succeeded",
      payload: {
        companyId: company.id,
        agentCount: agents.length,
        taskId: task.id,
      },
    });

    const auditBundle = await readCampaignAuditBundle(campaignId);
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
      audit: {
        ...summarizeAuditTrail(auditBundle.trail),
        verified: auditBundle.verification.valid,
      },
    };
  } catch (error) {
    if (!(error instanceof AppError && error.code === "STRATEGIST_MISSING")) {
      await appendCampaignAuditEntry(campaignId, {
        actor: "gateway.deploy-service",
        nodeId: "X",
        nodeLabel: "Terminal: Manual Review",
        event: "deploy.failed",
        status: "failed",
        payload: {
          message: error instanceof Error ? error.message : String(error),
          code: error instanceof AppError ? error.code : "INTERNAL_ERROR",
        },
      });
    }
    throw error;
  }
}
