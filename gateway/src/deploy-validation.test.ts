import { describe, expect, it } from "vitest";
import { config } from "./config.js";
import { AppError } from "./errors.js";
import { validateSupportedDeployRequest } from "./deploy-validation.js";

describe("validateSupportedDeployRequest", () => {
  it("accepts the fixed x402 budget", () => {
    const result = validateSupportedDeployRequest({
      projectName: "SolPay",
      description: "A payment gateway on Solana",
      targetAudience: "Crypto merchants",
      budgetUsdc: config.campaignPriceUsdcMicro / 1_000_000,
    });

    expect(result.budgetUsdcMicro).toBe(config.campaignPriceUsdcMicro);
    expect(result.budgetUsdc).toBe(config.campaignPriceUsdcMicro / 1_000_000);
  });

  it("uses the configured x402 budget when budgetUsdc is omitted", () => {
    const result = validateSupportedDeployRequest({
      projectName: "SolPay",
      description: "A payment gateway on Solana",
      targetAudience: "Crypto merchants",
    });

    expect(result.budgetUsdcMicro).toBe(config.campaignPriceUsdcMicro);
  });

  it("rejects a budget that does not match the charged x402 price", () => {
    expect(() =>
      validateSupportedDeployRequest({
        projectName: "SolPay",
        description: "A payment gateway on Solana",
        targetAudience: "Crypto merchants",
        budgetUsdc: 25,
      }),
    ).toThrowError(AppError);
  });

  it("rejects milestone input until the contract can enforce it", () => {
    expect(() =>
      validateSupportedDeployRequest({
        projectName: "SolPay",
        description: "A payment gateway on Solana",
        targetAudience: "Crypto merchants",
        milestones: [
          { name: "Strategy", amountUsdc: 2.5 },
          { name: "Launch", amountUsdc: 2.5 },
        ],
      }),
    ).toThrowError(AppError);
  });
});
