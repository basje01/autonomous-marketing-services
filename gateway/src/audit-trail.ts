import crypto from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
import { PublicKey } from "@solana/web3.js";
import nacl from "tweetnacl";
import { config } from "./config.js";
import { AppError } from "./errors.js";
import { getPlatformKeypair, getPlatformPublicKey } from "./solana.js";

export const DEPLOY_BRAID_TEMPLATE_ID = "deploy-marketing-team-v1";

export const DEPLOY_BRAID_MERMAID = `flowchart TD
    A[Record Deployment Intent] --> B[Initialize Escrow]
    B --> C{Escrow Active?}
    C -->|No| X([Terminal: Manual Review])
    C -->|Yes| D[Create Paperclip Company]
    D --> E[Hire Agents]
    E --> F{Minerva Present?}
    F -->|No| Y([Terminal: Strategist Missing])
    F -->|Yes| G[Create Initial Task]
    G --> H([Terminal: Deployment Complete])`;

export interface AuditTrailEntryInput {
  actor: string;
  event: string;
  status: "info" | "succeeded" | "failed" | "decision";
  payload: Record<string, unknown>;
  nodeId?: string;
  nodeLabel?: string;
}

export interface AuditTrailEntry extends AuditTrailEntryInput {
  index: number;
  timestamp: string;
  previousHash: string | null;
  hash: string;
}

export interface AuditTrailAttestation {
  signer: string;
  signedAt: string;
  trailHash: string;
  signature: string;
}

export interface CampaignAuditTrail {
  version: 1;
  campaignId: string;
  createdAt: string;
  reasoning: {
    templateId: string;
    mermaid: string;
  };
  metadata: Record<string, unknown>;
  entries: AuditTrailEntry[];
  headHash: string | null;
  attestation: AuditTrailAttestation;
}

type SignableCampaignAuditTrail = Omit<CampaignAuditTrail, "attestation">;

export interface AuditVerification {
  valid: boolean;
  entryCount: number;
  headHash: string | null;
  trailHash: string | null;
  signer: string | null;
  error?: string;
}

const auditWriteLocks = new Map<string, Promise<unknown>>();

export async function createCampaignAuditTrail(params: {
  campaignId: string;
  metadata: Record<string, unknown>;
  auditDir?: string;
}): Promise<CampaignAuditTrail> {
  const auditDir = params.auditDir ?? config.auditLogDir;
  const filePath = getCampaignAuditPath(params.campaignId, auditDir);
  return withAuditWriteLock(filePath, async () => {
    const existing = await readAuditFileIfExists(filePath);
    if (existing) {
      return existing;
    }

    const createdAt = new Date().toISOString();
    const signableTrail: SignableCampaignAuditTrail = {
      version: 1,
      campaignId: params.campaignId,
      createdAt,
      reasoning: {
        templateId: DEPLOY_BRAID_TEMPLATE_ID,
        mermaid: DEPLOY_BRAID_MERMAID,
      },
      metadata: params.metadata,
      entries: [],
      headHash: null,
    };

    const trail: CampaignAuditTrail = {
      ...signableTrail,
      attestation: createTrailAttestation(signableTrail),
    };
    await writeAuditFile(filePath, trail);
    return trail;
  });
}

export async function appendCampaignAuditEntry(
  campaignId: string,
  entry: AuditTrailEntryInput,
  auditDir: string = config.auditLogDir,
): Promise<AuditTrailEntry> {
  const filePath = getCampaignAuditPath(campaignId, auditDir);
  return withAuditWriteLock(filePath, async () => {
    const trail = await readCampaignAuditTrail(campaignId, auditDir);
    const verification = verifyCampaignAuditTrail(trail);
    if (!verification.valid) {
      throw new AppError(
        `Audit trail for ${campaignId} failed verification: ${verification.error}`,
        500,
        "AUDIT_TRAIL_CORRUPTED",
      );
    }

    const previousHash = trail.headHash;
    const index = trail.entries.length;
    const timestamp = new Date().toISOString();
    const hash = sha256Hex(
      canonicalStringify({
        campaignId,
        index,
        timestamp,
        previousHash,
        actor: entry.actor,
        event: entry.event,
        status: entry.status,
        nodeId: entry.nodeId ?? null,
        nodeLabel: entry.nodeLabel ?? null,
        payload: entry.payload,
      }),
    );

    const nextEntry: AuditTrailEntry = {
      index,
      timestamp,
      previousHash,
      hash,
      ...entry,
    };

    trail.entries.push(nextEntry);
    trail.headHash = hash;
    trail.attestation = createTrailAttestation(trail);
    await writeAuditFile(filePath, trail);
    return nextEntry;
  });
}

export async function readCampaignAuditTrail(
  campaignId: string,
  auditDir: string = config.auditLogDir,
): Promise<CampaignAuditTrail> {
  const filePath = getCampaignAuditPath(campaignId, auditDir);
  const content = await readAuditFileIfExists(filePath);
  if (!content) {
    throw new AppError(
      `Audit trail for campaign ${campaignId} was not found`,
      404,
      "AUDIT_TRAIL_MISSING",
    );
  }
  return content;
}

export async function readCampaignAuditBundle(
  campaignId: string,
  auditDir: string = config.auditLogDir,
): Promise<{ trail: CampaignAuditTrail; verification: AuditVerification }> {
  const trail = await readCampaignAuditTrail(campaignId, auditDir);
  return {
    trail,
    verification: verifyCampaignAuditTrail(trail),
  };
}

export function verifyCampaignAuditTrail(trail: CampaignAuditTrail): AuditVerification {
  if (trail.version !== 1) {
    return invalidVerification(trail, `Unsupported audit version ${trail.version}`);
  }
  if (!trail.attestation) {
    return invalidVerification(trail, "Audit trail attestation is missing");
  }

  let previousHash: string | null = null;

  for (const [index, entry] of trail.entries.entries()) {
    if (entry.index !== index) {
      return invalidVerification(trail, `Entry ${index} has out-of-order index ${entry.index}`);
    }
    if (entry.previousHash !== previousHash) {
      return invalidVerification(
        trail,
        `Entry ${index} expected previous hash ${previousHash ?? "null"} but found ${entry.previousHash ?? "null"}`,
      );
    }

    const expectedHash = sha256Hex(
      canonicalStringify({
        campaignId: trail.campaignId,
        index: entry.index,
        timestamp: entry.timestamp,
        previousHash: entry.previousHash,
        actor: entry.actor,
        event: entry.event,
        status: entry.status,
        nodeId: entry.nodeId ?? null,
        nodeLabel: entry.nodeLabel ?? null,
        payload: entry.payload,
      }),
    );

    if (entry.hash !== expectedHash) {
      return invalidVerification(trail, `Entry ${index} hash mismatch`);
    }

    previousHash = entry.hash;
  }

  if (trail.headHash !== previousHash) {
    return invalidVerification(
      trail,
      `Head hash mismatch: expected ${previousHash ?? "null"} but found ${trail.headHash ?? "null"}`,
    );
  }

  const expectedTrailHash = hashCampaignAuditTrail(trail);
  if (trail.attestation.trailHash !== expectedTrailHash) {
    return invalidVerification(
      trail,
      `Trail hash mismatch: expected ${expectedTrailHash} but found ${trail.attestation.trailHash}`,
    );
  }

  const signatureValid = verifyTrailAttestation(trail.attestation);
  if (!signatureValid.valid) {
    return invalidVerification(trail, signatureValid.error);
  }

  return {
    valid: true,
    entryCount: trail.entries.length,
    headHash: trail.headHash,
    trailHash: trail.attestation.trailHash,
    signer: trail.attestation.signer,
  };
}

export function summarizeAuditTrail(trail: CampaignAuditTrail): {
  templateId: string;
  entryCount: number;
  headHash: string | null;
  trailHash: string;
  signer: string;
  signedAt: string;
} {
  return {
    templateId: trail.reasoning.templateId,
    entryCount: trail.entries.length,
    headHash: trail.headHash,
    trailHash: trail.attestation.trailHash,
    signer: trail.attestation.signer,
    signedAt: trail.attestation.signedAt,
  };
}

function invalidVerification(trail: CampaignAuditTrail, error: string): AuditVerification {
  return {
    valid: false,
    entryCount: trail.entries.length,
    headHash: trail.headHash,
    trailHash: trail.attestation?.trailHash ?? null,
    signer: trail.attestation?.signer ?? null,
    error,
  };
}

async function readAuditFileIfExists(filePath: string): Promise<CampaignAuditTrail | null> {
  try {
    const raw = await fs.readFile(filePath, "utf8");
    return JSON.parse(raw) as CampaignAuditTrail;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      return null;
    }
    throw error;
  }
}

async function writeAuditFile(filePath: string, trail: CampaignAuditTrail): Promise<void> {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  const tempPath = `${filePath}.${process.pid}.${Date.now()}.tmp`;
  await fs.writeFile(tempPath, `${JSON.stringify(trail, null, 2)}\n`, "utf8");
  await fs.rename(tempPath, filePath);
}

const SAFE_CAMPAIGN_ID_PATTERN = /^[a-zA-Z0-9_-]{1,64}$/;

function getCampaignAuditPath(campaignId: string, auditDir: string): string {
  if (!SAFE_CAMPAIGN_ID_PATTERN.test(campaignId)) {
    throw new AppError("Invalid campaign ID format", 400, "INVALID_CAMPAIGN_ID");
  }
  const resolved = path.resolve(auditDir, `${campaignId}.json`);
  const normalizedDir = path.resolve(auditDir);
  if (!resolved.startsWith(normalizedDir)) {
    throw new AppError("Invalid campaign ID format", 400, "INVALID_CAMPAIGN_ID");
  }
  return resolved;
}

function sha256Hex(value: string): string {
  return crypto.createHash("sha256").update(value, "utf8").digest("hex");
}

function createTrailAttestation(trail: SignableCampaignAuditTrail): AuditTrailAttestation {
  const signer = getPlatformPublicKey().toBase58();
  const signedAt = new Date().toISOString();
  const trailHash = hashCampaignAuditTrail(trail);
  const message = buildAttestationMessage(trailHash, signer, signedAt);
  const signature = Buffer.from(
    nacl.sign.detached(Buffer.from(message, "utf8"), getPlatformKeypair().secretKey),
  ).toString("base64");

  return {
    signer,
    signedAt,
    trailHash,
    signature,
  };
}

function verifyTrailAttestation(attestation: AuditTrailAttestation): {
  valid: boolean;
  error: string;
} {
  try {
    const signer = new PublicKey(attestation.signer);
    const signature = Buffer.from(attestation.signature, "base64");
    const message = Buffer.from(
      buildAttestationMessage(attestation.trailHash, attestation.signer, attestation.signedAt),
      "utf8",
    );

    if (!nacl.sign.detached.verify(message, signature, signer.toBytes())) {
      return { valid: false, error: "Trail attestation signature mismatch" };
    }

    return { valid: true, error: "" };
  } catch (error) {
    return {
      valid: false,
      error: `Trail attestation verification failed: ${error instanceof Error ? error.message : String(error)}`,
    };
  }
}

function hashCampaignAuditTrail(trail: SignableCampaignAuditTrail): string {
  return sha256Hex(
    canonicalStringify({
      version: trail.version,
      campaignId: trail.campaignId,
      createdAt: trail.createdAt,
      reasoning: trail.reasoning,
      metadata: trail.metadata,
      entries: trail.entries,
      headHash: trail.headHash,
    }),
  );
}

function buildAttestationMessage(trailHash: string, signer: string, signedAt: string): string {
  return canonicalStringify({
    namespace: "campaign-audit-trail",
    signer,
    signedAt,
    trailHash,
  });
}

function canonicalStringify(value: unknown): string {
  return JSON.stringify(sortValue(value));
}

function sortValue(value: unknown): unknown {
  if (Array.isArray(value)) {
    return value.map(sortValue);
  }
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value as Record<string, unknown>)
        .sort(([left], [right]) => left.localeCompare(right))
        .map(([key, nestedValue]) => [key, sortValue(nestedValue)]),
    );
  }
  return value;
}

async function withAuditWriteLock<T>(filePath: string, operation: () => Promise<T>): Promise<T> {
  const previous = auditWriteLocks.get(filePath) ?? Promise.resolve();
  const current = previous.catch(() => undefined).then(operation);

  auditWriteLocks.set(filePath, current);

  try {
    return await current;
  } finally {
    if (auditWriteLocks.get(filePath) === current) {
      auditWriteLocks.delete(filePath);
    }
  }
}
