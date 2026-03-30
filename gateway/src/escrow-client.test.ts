import { Keypair } from "@solana/web3.js";
import { describe, expect, it } from "vitest";
import { decodeCampaignAccount, deriveCampaignPDA, normalizeDeliverableHash } from "./escrow-client.js";

const CAMPAIGN_ACCOUNT_DISCRIMINATOR = Buffer.from([50, 40, 49, 11, 157, 220, 229, 192]);

describe("escrow client helpers", () => {
  it("derives a stable campaign PDA", () => {
    const authority = Keypair.generate().publicKey;
    const programId = Keypair.generate().publicKey;

    const [first] = deriveCampaignPDA(authority, "cmp-123", programId);
    const [second] = deriveCampaignPDA(authority, "cmp-123", programId);
    const [different] = deriveCampaignPDA(authority, "cmp-456", programId);

    expect(first.toBase58()).toBe(second.toBase58());
    expect(first.toBase58()).not.toBe(different.toBase58());
  });

  it("accepts a raw 32-byte hex deliverable hash", () => {
    const hex = "a".repeat(64);
    expect(normalizeDeliverableHash(hex).equals(Buffer.from(hex, "hex"))).toBe(true);
  });

  it("hashes non-hex deliverable values with sha256", () => {
    const hashed = normalizeDeliverableHash("deliverable-proof");

    expect(hashed).toHaveLength(32);
    expect(normalizeDeliverableHash("deliverable-proof").equals(hashed)).toBe(true);
  });

  it("decodes the campaign account layout", () => {
    const authority = Keypair.generate().publicKey;
    const platform = Keypair.generate().publicKey;
    const kaminoProgram = Keypair.generate().publicKey;
    const lendingMarket = Keypair.generate().publicKey;
    const reserve = Keypair.generate().publicKey;
    const userMetadata = Keypair.generate().publicKey;
    const obligation = Keypair.generate().publicKey;
    const campaignId = "campaign-flex-001";

    const data = Buffer.concat([
      CAMPAIGN_ACCOUNT_DISCRIMINATOR,
      authority.toBuffer(),
      platform.toBuffer(),
      encodeString(campaignId),
      encodeU64(5_000_000n),
      Buffer.from([4, 2, 0, 255]),
      kaminoProgram.toBuffer(),
      lendingMarket.toBuffer(),
      reserve.toBuffer(),
      userMetadata.toBuffer(),
      obligation.toBuffer(),
    ]);

    const decoded = decodeCampaignAccount(data);

    expect(decoded.authority.toBase58()).toBe(authority.toBase58());
    expect(decoded.platform.toBase58()).toBe(platform.toBase58());
    expect(decoded.campaignId).toBe(campaignId);
    expect(decoded.budget).toBe(5_000_000n);
    expect(decoded.deliverablesExpected).toBe(4);
    expect(decoded.deliverablesSubmitted).toBe(2);
    expect(decoded.status).toBe(0);
    expect(decoded.bump).toBe(255);
    expect(decoded.kaminoProgram.toBase58()).toBe(kaminoProgram.toBase58());
    expect(decoded.kaminoLendingMarket.toBase58()).toBe(lendingMarket.toBase58());
    expect(decoded.kaminoReserve.toBase58()).toBe(reserve.toBase58());
    expect(decoded.kaminoUserMetadata.toBase58()).toBe(userMetadata.toBase58());
    expect(decoded.kaminoObligation.toBase58()).toBe(obligation.toBase58());
  });

  it("rejects invalid campaign account discriminators", () => {
    const invalid = Buffer.alloc(64);
    expect(() => decodeCampaignAccount(invalid)).toThrow("Invalid campaign account discriminator");
  });
});

function encodeString(value: string): Buffer {
  const bytes = Buffer.from(value, "utf8");
  const length = Buffer.alloc(4);
  length.writeUInt32LE(bytes.length, 0);
  return Buffer.concat([length, bytes]);
}

function encodeU64(value: bigint): Buffer {
  const data = Buffer.alloc(8);
  data.writeBigUInt64LE(value);
  return data;
}
