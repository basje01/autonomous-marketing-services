import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { describe, expect, it } from "vitest";
import {
  appendCampaignAuditEntry,
  createCampaignAuditTrail,
  readCampaignAuditBundle,
  verifyCampaignAuditTrail,
} from "./audit-trail.js";
import { getPlatformPublicKey } from "./solana.js";

describe("audit trail", () => {
  it("creates an attested BRAID audit trail", async () => {
    const auditDir = await createTempAuditDir();

    await createCampaignAuditTrail({
      campaignId: "cmp-attested",
      metadata: {
        projectName: "Kamino Growth Sprint",
        budgetUsdc: 1500,
      },
      auditDir,
    });

    await appendCampaignAuditEntry("cmp-attested", {
      actor: "gateway.deploy-service",
      nodeId: "A",
      nodeLabel: "Record Deployment Intent",
      event: "deploy.intent.recorded",
      status: "succeeded",
      payload: {
        projectName: "Kamino Growth Sprint",
      },
    }, auditDir);

    const bundle = await readCampaignAuditBundle("cmp-attested", auditDir);

    expect(bundle.verification.valid).toBe(true);
    expect(bundle.trail.reasoning.templateId).toBe("deploy-marketing-team-v1");
    expect(bundle.trail.attestation.signer).toBe(getPlatformPublicKey().toBase58());
    expect(bundle.verification.trailHash).toBe(bundle.trail.attestation.trailHash);
  });

  it("detects metadata tampering through the trail attestation", async () => {
    const auditDir = await createTempAuditDir();
    const campaignId = "cmp-tampered";

    await createCampaignAuditTrail({
      campaignId,
      metadata: {
        projectName: "Original",
      },
      auditDir,
    });

    await appendCampaignAuditEntry(campaignId, {
      actor: "gateway.deploy-service",
      event: "deploy.intent.recorded",
      status: "succeeded",
      payload: {
        ok: true,
      },
    }, auditDir);

    const filePath = path.resolve(auditDir, `${campaignId}.json`);
    const raw = await fs.readFile(filePath, "utf8");
    const trail = JSON.parse(raw) as Record<string, unknown>;
    trail.metadata = { projectName: "Tampered" };
    await fs.writeFile(filePath, `${JSON.stringify(trail, null, 2)}\n`, "utf8");

    const tamperedBundle = await readCampaignAuditBundle(campaignId, auditDir);

    expect(tamperedBundle.verification.valid).toBe(false);
    expect(tamperedBundle.verification.error).toContain("Trail hash mismatch");
  });

  it("serializes concurrent appends into one valid chain", async () => {
    const auditDir = await createTempAuditDir();
    const campaignId = "cmp-concurrent";

    await createCampaignAuditTrail({
      campaignId,
      metadata: {
        projectName: "Concurrent Campaign",
      },
      auditDir,
    });

    await Promise.all([
      appendCampaignAuditEntry(campaignId, {
        actor: "gateway.paperclip",
        event: "paperclip.company.created",
        status: "succeeded",
        payload: {
          companyId: "pc_1",
        },
      }, auditDir),
      appendCampaignAuditEntry(campaignId, {
        actor: "gateway.paperclip",
        event: "paperclip.agents.hired",
        status: "succeeded",
        payload: {
          agentCount: 4,
        },
      }, auditDir),
    ]);

    const bundle = await readCampaignAuditBundle(campaignId, auditDir);
    const events = bundle.trail.entries.map((entry) => entry.event).sort();

    expect(bundle.verification.valid).toBe(true);
    expect(bundle.trail.entries).toHaveLength(2);
    expect(bundle.trail.entries.map((entry) => entry.index)).toEqual([0, 1]);
    expect(events).toEqual(["paperclip.agents.hired", "paperclip.company.created"]);
  });

  it("fails verification when an entry hash is altered", async () => {
    const auditDir = await createTempAuditDir();
    const campaignId = "cmp-entry-hash";

    await createCampaignAuditTrail({
      campaignId,
      metadata: {
        projectName: "Entry Hash Campaign",
      },
      auditDir,
    });

    await appendCampaignAuditEntry(campaignId, {
      actor: "gateway.deploy-service",
      event: "deploy.completed",
      status: "succeeded",
      payload: {
        companyId: "pc_complete",
      },
    }, auditDir);

    const bundle = await readCampaignAuditBundle(campaignId, auditDir);
    bundle.trail.entries[0]!.hash = "00".repeat(32);

    const verification = verifyCampaignAuditTrail(bundle.trail);

    expect(verification.valid).toBe(false);
    expect(verification.error).toContain("hash mismatch");
  });
});

async function createTempAuditDir(): Promise<string> {
  return fs.mkdtemp(path.join(os.tmpdir(), "campaign-audit-"));
}
