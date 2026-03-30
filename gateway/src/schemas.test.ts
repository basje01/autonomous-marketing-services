import { describe, it, expect } from "vitest";
import { deployRequestSchema, envSchema, createCompanyResponseSchema } from "./schemas.js";

describe("deployRequestSchema", () => {
  it("accepts valid input", () => {
    const result = deployRequestSchema.safeParse({
      projectName: "SolPay",
      description: "A payment gateway on Solana",
      targetAudience: "Crypto merchants",
    });
    expect(result.success).toBe(true);
  });

  it("accepts valid input with optional website", () => {
    const result = deployRequestSchema.safeParse({
      projectName: "SolPay",
      description: "A payment gateway",
      targetAudience: "Merchants",
      website: "https://solpay.io",
    });
    expect(result.success).toBe(true);
  });

  it("rejects missing projectName", () => {
    const result = deployRequestSchema.safeParse({
      description: "A payment gateway",
      targetAudience: "Merchants",
    });
    expect(result.success).toBe(false);
  });

  it("rejects empty projectName", () => {
    const result = deployRequestSchema.safeParse({
      projectName: "",
      description: "A payment gateway",
      targetAudience: "Merchants",
    });
    expect(result.success).toBe(false);
  });

  it("rejects projectName over 200 chars", () => {
    const result = deployRequestSchema.safeParse({
      projectName: "x".repeat(201),
      description: "A payment gateway",
      targetAudience: "Merchants",
    });
    expect(result.success).toBe(false);
  });

  it("rejects description over 5000 chars", () => {
    const result = deployRequestSchema.safeParse({
      projectName: "SolPay",
      description: "x".repeat(5001),
      targetAudience: "Merchants",
    });
    expect(result.success).toBe(false);
  });

  it("rejects http:// website", () => {
    const result = deployRequestSchema.safeParse({
      projectName: "SolPay",
      description: "A payment gateway",
      targetAudience: "Merchants",
      website: "http://insecure.com",
    });
    expect(result.success).toBe(false);
  });

  it("rejects non-URL website", () => {
    const result = deployRequestSchema.safeParse({
      projectName: "SolPay",
      description: "A payment gateway",
      targetAudience: "Merchants",
      website: "not-a-url",
    });
    expect(result.success).toBe(false);
  });
});

describe("envSchema", () => {
  it("applies defaults for missing optional fields", () => {
    const result = envSchema.safeParse({});
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.GATEWAY_PORT).toBe(3001);
      expect(result.data.SOLANA_NETWORK).toBe("devnet");
      expect(result.data.NODE_ENV).toBe("development");
    }
  });

  it("rejects invalid SOLANA_NETWORK", () => {
    const result = envSchema.safeParse({ SOLANA_NETWORK: "testnet" });
    expect(result.success).toBe(false);
  });

  it("coerces GATEWAY_PORT from string", () => {
    const result = envSchema.safeParse({ GATEWAY_PORT: "8080" });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.GATEWAY_PORT).toBe(8080);
    }
  });
});

describe("createCompanyResponseSchema", () => {
  it("accepts valid response", () => {
    const result = createCompanyResponseSchema.safeParse({ id: "abc-123", name: "Test Co" });
    expect(result.success).toBe(true);
  });

  it("rejects missing id", () => {
    const result = createCompanyResponseSchema.safeParse({ name: "Test Co" });
    expect(result.success).toBe(false);
  });

  it("rejects missing name", () => {
    const result = createCompanyResponseSchema.safeParse({ id: "abc-123" });
    expect(result.success).toBe(false);
  });
});
