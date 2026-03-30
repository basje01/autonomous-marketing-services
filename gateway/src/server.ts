import express from "express";
import { config } from "./config.js";
import { createCompany, hireAgents, createInitialTask, AGENT_ROLES } from "./paperclip-client.js";
import { initializeCampaign } from "./escrow-client.js";
import { createX402Middleware, platformAddress } from "./x402.js";
import crypto from "node:crypto";

const app = express();
app.use(express.json({ limit: "10kb" }));

// x402 payment gate — returns 402 for unpaid requests to protected routes
app.use(createX402Middleware());

/**
 * Health check — reports gateway status only, no internal URLs exposed.
 */
app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    service: "frontier-marketing-os-gateway",
  });
});

/**
 * Deploy an autonomous marketing team.
 *
 * Flow:
 *   1. Client sends project brief + USDC payment (x402 middleware handles verification)
 *   2. Initialize campaign escrow on Solana
 *   3. Create Paperclip company + hire 6 agents
 *   4. Assign initial strategy task to Marketing Strategist
 *   5. Return company dashboard URL
 *
 * The x402 middleware intercepts this route. If the client has not paid,
 * it returns 402 Payment Required with pricing details. Only paid requests
 * reach this handler.
 */
app.post("/api/deploy-marketing-team", async (req, res) => {
  const campaignId = crypto.randomUUID();

  try {
    const { projectName, description, targetAudience, website } = req.body;

    if (!projectName || !description || !targetAudience) {
      res.status(400).json({
        error: "Missing required fields: projectName, description, targetAudience",
      });
      return;
    }

    // Basic input validation
    if (typeof projectName !== "string" || projectName.length > 200) {
      res.status(400).json({ error: "projectName must be a string under 200 chars" });
      return;
    }
    if (typeof description !== "string" || description.length > 5000) {
      res.status(400).json({ error: "description must be a string under 5000 chars" });
      return;
    }
    if (typeof targetAudience !== "string" || targetAudience.length > 2000) {
      res.status(400).json({ error: "targetAudience must be a string under 2000 chars" });
      return;
    }
    if (website !== undefined) {
      if (typeof website !== "string" || !website.startsWith("https://")) {
        res.status(400).json({ error: "website must be an https:// URL" });
        return;
      }
    }

    // Step 1: Initialize escrow on Solana
    console.log(`[gateway] Initializing campaign escrow: ${campaignId}`);
    const deliverablesExpected = AGENT_ROLES.filter(r => r.role !== "CEO").length;
    await initializeCampaign({
      platformAddress,
      campaignId,
      budgetUsdcMicro: config.campaignPriceUsdcMicro,
      deliverablesExpected,
    });

    // Step 2: Create Paperclip company
    console.log(`[gateway] Creating Paperclip company for: ${projectName}`);
    const company = await createCompany(
      projectName,
      `Autonomous marketing team for ${projectName}. Execute a full marketing campaign: research, SEO, content, social, and community.`
    );

    // Step 3: Hire 6 marketing agents
    console.log(`[gateway] Hiring ${AGENT_ROLES.length} marketing agents for company: ${company.id}`);
    const agents = await hireAgents(company.id);

    // Step 4: Find the strategist and assign initial task
    const strategist = agents.find((a) => a.name === "Marketing Strategist");
    if (!strategist) {
      throw new Error("Failed to hire Marketing Strategist");
    }

    console.log(`[gateway] Assigning initial task to strategist: ${strategist.id}`);
    const task = await createInitialTask(company.id, strategist.id, {
      name: projectName,
      description,
      targetAudience,
      website,
    });

    // Step 5: Return result
    res.json({
      success: true,
      campaignId,
      company: {
        id: company.id,
        name: company.name,
        dashboardUrl: `${config.paperclipApiUrl}/companies/${company.id}`,
      },
      agents: agents.map((a) => ({ id: a.id, name: a.name })),
      initialTask: {
        id: task.id,
        identifier: task.identifier,
      },
      message: `Autonomous marketing team deployed for ${projectName}. ${agents.length} agents hired and strategist is beginning research.`,
    });
  } catch (error) {
    // Payment was already settled by x402 — log for manual reconciliation
    const errorId = crypto.randomUUID();
    console.error(`[gateway] Deploy failed [${errorId}] campaignId=${campaignId}:`, error);
    console.error(`[gateway] PAYMENT TAKEN BUT DEPLOY FAILED — campaignId=${campaignId} errorId=${errorId} — MANUAL INTERVENTION REQUIRED`);
    res.status(500).json({
      error: "Failed to deploy marketing team",
      campaignId,
      errorId,
      refundStatus: "pending_manual_review",
    });
  }
});

/**
 * List active campaigns (proxy to Paperclip companies API)
 */
app.get("/api/campaigns", async (_req, res) => {
  try {
    const paperclipRes = await fetch(`${config.paperclipApiUrl}/api/companies`, {
      signal: AbortSignal.timeout(10_000),
    });
    if (!paperclipRes.ok) {
      res.status(502).json({ error: "Paperclip API unavailable" });
      return;
    }
    const companies = await paperclipRes.json();
    res.json(companies);
  } catch (error) {
    res.status(502).json({ error: "Failed to reach Paperclip API" });
  }
});

app.listen(config.port, () => {
  console.log(`[gateway] Frontier Marketing OS Gateway running on port ${config.port}`);
});
