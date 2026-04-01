import request from "supertest";
import { beforeEach, describe, expect, it, vi } from "vitest";

const x402MiddlewareSpy = vi.fn((_req, _res, next: () => void) => next());
const deployMarketingTeamSpy = vi.fn();

vi.mock("./x402.js", () => ({
  createX402Middleware: () => (req: unknown, res: unknown, next: () => void) => x402MiddlewareSpy(req, res, next),
  getPlatformAddress: () => "Platform1111111111111111111111111111111111",
}));

vi.mock("./services/deploy.service.js", () => ({
  deployMarketingTeam: (...args: unknown[]) => deployMarketingTeamSpy(...args),
}));

describe("createApp", () => {
  beforeEach(() => {
    x402MiddlewareSpy.mockClear();
    deployMarketingTeamSpy.mockReset();
    deployMarketingTeamSpy.mockResolvedValue({
      campaignId: "cmp-123",
      company: { id: "co-1", name: "SolPay Marketing", dashboardUrl: "http://localhost:3100/companies/co-1" },
      agents: [{ id: "agent-1", name: "Minerva" }],
      initialTask: { id: "task-1", identifier: "ISSUE-1" },
      message: "ok",
      funding: {
        campaignPda: "campaign-pda",
        sourceTokenAccount: "source-ata",
        vaultTokenAccount: "vault-ata",
        usdcMint: "usdc-mint",
        fundedAmountUsdcMicro: "5000000",
        initializeSignature: "sig-init",
        platformBalanceBeforeFundingUsdcMicro: "6000000",
        platformBalanceAfterFundingUsdcMicro: "1000000",
        vaultBalanceAfterFundingUsdcMicro: "5000000",
        finalVaultBalanceUsdcMicro: "5000000",
        parkedInKamino: false,
        kamino: null,
      },
      audit: {
        templateId: "deploy-marketing-team-v1",
        entryCount: 3,
        headHash: "head",
        trailHash: "trail",
        signer: "signer",
        signedAt: "2026-03-30T00:00:00.000Z",
        verified: true,
      },
    });
  });

  it("rejects unsupported budget input before x402 runs", async () => {
    const { createApp } = await import("./app.js");
    const app = createApp();

    const response = await request(app)
      .post("/api/deploy-marketing-team")
      .send({
        projectName: "SolPay",
        description: "A payment gateway on Solana",
        targetAudience: "Crypto merchants",
        budgetUsdc: 25,
      });

    expect(response.status).toBe(400);
    expect(response.body.code).toBe("BUDGET_PRICE_MISMATCH");
    expect(x402MiddlewareSpy).not.toHaveBeenCalled();
    expect(deployMarketingTeamSpy).not.toHaveBeenCalled();
  });

  it("serves cached idempotent responses before x402 reruns", async () => {
    const { createApp } = await import("./app.js");
    const app = createApp();

    const payload = {
      projectName: "SolPay",
      description: "A payment gateway on Solana",
      targetAudience: "Crypto merchants",
    };

    const first = await request(app)
      .post("/api/deploy-marketing-team")
      .set("x-idempotency-key", "same-key")
      .send(payload);

    const second = await request(app)
      .post("/api/deploy-marketing-team")
      .set("x-idempotency-key", "same-key")
      .send(payload);

    expect(first.status).toBe(200);
    expect(second.status).toBe(200);
    expect(x402MiddlewareSpy).toHaveBeenCalledTimes(1);
    expect(deployMarketingTeamSpy).toHaveBeenCalledTimes(1);
  });

  it("blocks in-flight idempotent retries before x402 reruns", async () => {
    let resolveDeploy: ((value: Awaited<ReturnType<typeof deployMarketingTeamSpy>>) => void) | undefined;
    deployMarketingTeamSpy.mockImplementationOnce(() => new Promise((resolve) => {
      resolveDeploy = resolve;
    }));

    const { createApp } = await import("./app.js");
    const app = createApp();

    const payload = {
      projectName: "SolPay",
      description: "A payment gateway on Solana",
      targetAudience: "Crypto merchants",
    };

    const firstRequest = new Promise<request.Response>((resolve, reject) => {
      request(app)
        .post("/api/deploy-marketing-team")
        .set("x-idempotency-key", "in-flight-key")
        .send(payload)
        .end((error, response) => {
          if (error) {
            reject(error);
            return;
          }
          resolve(response);
        });
    });

    await vi.waitFor(() => {
      expect(deployMarketingTeamSpy).toHaveBeenCalledTimes(1);
    });

    const second = await request(app)
      .post("/api/deploy-marketing-team")
      .set("x-idempotency-key", "in-flight-key")
      .send(payload);

    expect(second.status).toBe(409);
    expect(second.body.code).toBe("IDEMPOTENCY_IN_PROGRESS");
    expect(x402MiddlewareSpy).toHaveBeenCalledTimes(1);

    resolveDeploy?.({
      campaignId: "cmp-123",
      company: { id: "co-1", name: "SolPay Marketing", dashboardUrl: "http://localhost:3100/companies/co-1" },
      agents: [{ id: "agent-1", name: "Minerva" }],
      initialTask: { id: "task-1", identifier: "ISSUE-1" },
      message: "ok",
      funding: {
        campaignPda: "campaign-pda",
        sourceTokenAccount: "source-ata",
        vaultTokenAccount: "vault-ata",
        usdcMint: "usdc-mint",
        fundedAmountUsdcMicro: "5000000",
        initializeSignature: "sig-init",
        platformBalanceBeforeFundingUsdcMicro: "6000000",
        platformBalanceAfterFundingUsdcMicro: "1000000",
        vaultBalanceAfterFundingUsdcMicro: "5000000",
        finalVaultBalanceUsdcMicro: "5000000",
        parkedInKamino: false,
        kamino: null,
      },
      audit: {
        templateId: "deploy-marketing-team-v1",
        entryCount: 3,
        headHash: "head",
        trailHash: "trail",
        signer: "signer",
        signedAt: "2026-03-30T00:00:00.000Z",
        verified: true,
      },
    });

    const first = await firstRequest;
    expect(first.status).toBe(200);
  });
});
