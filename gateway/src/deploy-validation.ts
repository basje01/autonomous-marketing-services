import { config } from "./config.js";
import { AppError } from "./errors.js";
import type { DeployRequest } from "./schemas.js";

const USDC_SCALE = 1_000_000;

export interface SupportedDeployPlan {
  budgetUsdc: number;
  budgetUsdcMicro: number;
  deliverablesExpected: number;
}

export function validateSupportedDeployRequest(input: DeployRequest): SupportedDeployPlan {
  if (input.milestones && input.milestones.length > 0) {
    throw new AppError(
      "Flexible milestones are not yet enforced on-chain. Remove milestones until the escrow program supports them.",
      400,
      "MILESTONES_NOT_SUPPORTED",
    );
  }

  const fixedBudgetUsdcMicro = config.campaignPriceUsdcMicro;
  if (input.budgetUsdc !== undefined) {
    const requestedBudgetUsdcMicro = toUsdcMicro(input.budgetUsdc, "budgetUsdc");
    if (requestedBudgetUsdcMicro !== fixedBudgetUsdcMicro) {
      throw new AppError(
        `budgetUsdc must equal the fixed x402 price of ${formatUsdcMicro(fixedBudgetUsdcMicro)} USDC until dynamic pricing is implemented.`,
        400,
        "BUDGET_PRICE_MISMATCH",
      );
    }
  }

  return {
    budgetUsdc: fixedBudgetUsdcMicro / USDC_SCALE,
    budgetUsdcMicro: fixedBudgetUsdcMicro,
    deliverablesExpected: config.deliverablesExpected,
  };
}

function toUsdcMicro(amountUsdc: number, fieldName: string): number {
  if (!Number.isFinite(amountUsdc) || amountUsdc <= 0) {
    throw new AppError(`${fieldName} must be a positive USDC amount`, 400, "INVALID_USDC_AMOUNT");
  }

  const scaled = Math.round(amountUsdc * USDC_SCALE);
  if (!Number.isSafeInteger(scaled)) {
    throw new AppError(`${fieldName} is too large to represent safely`, 400, "INVALID_USDC_AMOUNT");
  }

  if (Math.abs(amountUsdc - scaled / USDC_SCALE) > 1e-9) {
    throw new AppError(`${fieldName} must use at most 6 decimal places`, 400, "INVALID_USDC_AMOUNT");
  }

  return scaled;
}

function formatUsdcMicro(amountUsdcMicro: number): string {
  return (amountUsdcMicro / USDC_SCALE).toFixed(6).replace(/\.?0+$/, "");
}
