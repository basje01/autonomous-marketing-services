import crypto from "node:crypto";
import {
  createAssociatedTokenAccountIdempotentInstruction,
  getAccount,
  getAssociatedTokenAddressSync,
  TOKEN_PROGRAM_ID,
  TOKEN_2022_PROGRAM_ID,
} from "@solana/spl-token";
import {
  PublicKey,
  SystemProgram,
  SYSVAR_INSTRUCTIONS_PUBKEY,
  SYSVAR_RENT_PUBKEY,
  TransactionInstruction,
} from "@solana/web3.js";
import { AppError } from "./errors.js";
import { config } from "./config.js";
import {
  buildRefreshObligationFarmInstruction,
  buildRefreshObligationInstruction,
  buildRefreshReserveInstruction,
  deriveKaminoLendingMarketAuthorityPda,
  deriveKaminoObligationFarmStatePda,
  deriveKaminoUserMetadataPda,
  deriveKaminoVanillaObligationPda,
  hasKaminoCollateralFarm,
  loadKaminoReserveState,
  obligationHasCollateralDeposit,
} from "./kamino.js";
import {
  createComputeBudgetInstruction,
  getPlatformPublicKey,
  getSolanaConnection,
  sendPlatformTransaction,
} from "./solana.js";

const DEFAULT_PUBLIC_KEY = new PublicKey("11111111111111111111111111111111");
const CAMPAIGN_ACCOUNT_DISCRIMINATOR = Buffer.from([50, 40, 49, 11, 157, 220, 229, 192]);
const INITIALIZE_CAMPAIGN_DISCRIMINATOR = Buffer.from([169, 88, 7, 6, 9, 165, 65, 132]);
const SUBMIT_DELIVERABLE_DISCRIMINATOR = Buffer.from([38, 137, 64, 44, 237, 11, 125, 101]);
const COMPLETE_CAMPAIGN_DISCRIMINATOR = Buffer.from([238, 164, 40, 81, 211, 55, 55, 26]);
const CANCEL_CAMPAIGN_DISCRIMINATOR = Buffer.from([66, 10, 32, 138, 122, 36, 134, 202]);
const INITIALIZE_KAMINO_POSITION_DISCRIMINATOR = Buffer.from([8, 215, 228, 47, 147, 114, 142, 183]);
const PARK_IN_KAMINO_DISCRIMINATOR = Buffer.from([217, 246, 14, 161, 152, 79, 115, 118]);
const WITHDRAW_FROM_KAMINO_DISCRIMINATOR = Buffer.from([177, 144, 191, 109, 204, 151, 38, 176]);
const U64_MAX = 18_446_744_073_709_551_615n;

const COMPUTE_UNITS_ESCROW = 250_000;
const COMPUTE_UNITS_KAMINO = 500_000;

export interface DecodedCampaignAccount {
  authority: PublicKey;
  platform: PublicKey;
  campaignId: string;
  budget: bigint;
  deliverablesExpected: number;
  deliverablesSubmitted: number;
  status: number;
  bump: number;
  kaminoProgram: PublicKey;
  kaminoLendingMarket: PublicKey;
  kaminoReserve: PublicKey;
  kaminoUserMetadata: PublicKey;
  kaminoObligation: PublicKey;
}

export interface CampaignKaminoFundingData {
  programId: string;
  lendingMarket: string;
  reserve: string;
  userMetadata: string;
  obligation: string;
  requestedParkAmountUsdcMicro: string;
  parkingSignature: string | null;
  parkingError: string | null;
}

export interface CampaignFundingData {
  campaignPda: string;
  sourceTokenAccount: string;
  vaultTokenAccount: string;
  usdcMint: string;
  fundedAmountUsdcMicro: string;
  initializeSignature: string;
  platformBalanceBeforeFundingUsdcMicro: string;
  platformBalanceAfterFundingUsdcMicro: string | null;
  vaultBalanceAfterFundingUsdcMicro: string | null;
  finalVaultBalanceUsdcMicro: string | null;
  parkedInKamino: boolean;
  kamino: CampaignKaminoFundingData | null;
}

/**
 * Derive the campaign PDA from the authority pubkey and campaign ID.
 */
export function deriveCampaignPDA(
  authorityPubkey: PublicKey,
  campaignId: string,
  programId: PublicKey,
): [PublicKey, number] {
  return PublicKey.findProgramAddressSync(
    [Buffer.from("campaign"), authorityPubkey.toBuffer(), Buffer.from(campaignId)],
    programId,
  );
}

const MIN_CAMPAIGN_ACCOUNT_SIZE = 8 + 32 + 32 + 4 + 0 + 8 + 1 + 1 + 1 + 1 + 32 * 5; // 246 bytes with empty campaign_id

export function decodeCampaignAccount(data: Buffer): DecodedCampaignAccount {
  if (data.length < MIN_CAMPAIGN_ACCOUNT_SIZE) {
    throw new AppError(
      `Campaign account data too short: ${data.length} bytes, expected at least ${MIN_CAMPAIGN_ACCOUNT_SIZE}`,
      500,
      "ESCROW_ACCOUNT_INVALID",
    );
  }
  if (!data.subarray(0, 8).equals(CAMPAIGN_ACCOUNT_DISCRIMINATOR)) {
    throw new AppError("Invalid campaign account discriminator", 500, "ESCROW_ACCOUNT_INVALID");
  }

  let offset = 8;
  const authority = new PublicKey(data.subarray(offset, offset + 32));
  offset += 32;
  const platform = new PublicKey(data.subarray(offset, offset + 32));
  offset += 32;

  const campaignIdLength = data.readUInt32LE(offset);
  offset += 4;
  if (campaignIdLength > 64 || offset + campaignIdLength > data.length) {
    throw new AppError(
      `Invalid campaign ID length: ${campaignIdLength}`,
      500,
      "ESCROW_ACCOUNT_INVALID",
    );
  }
  const campaignId = data.subarray(offset, offset + campaignIdLength).toString("utf8");
  offset += campaignIdLength;

  const budget = data.readBigUInt64LE(offset);
  offset += 8;

  const deliverablesExpected = data.readUInt8(offset);
  offset += 1;
  const deliverablesSubmitted = data.readUInt8(offset);
  offset += 1;
  const status = data.readUInt8(offset);
  offset += 1;
  const bump = data.readUInt8(offset);
  offset += 1;

  const kaminoProgram = new PublicKey(data.subarray(offset, offset + 32));
  offset += 32;
  const kaminoLendingMarket = new PublicKey(data.subarray(offset, offset + 32));
  offset += 32;
  const kaminoReserve = new PublicKey(data.subarray(offset, offset + 32));
  offset += 32;
  const kaminoUserMetadata = new PublicKey(data.subarray(offset, offset + 32));
  offset += 32;
  const kaminoObligation = new PublicKey(data.subarray(offset, offset + 32));

  return {
    authority,
    platform,
    campaignId,
    budget,
    deliverablesExpected,
    deliverablesSubmitted,
    status,
    bump,
    kaminoProgram,
    kaminoLendingMarket,
    kaminoReserve,
    kaminoUserMetadata,
    kaminoObligation,
  };
}

export function normalizeDeliverableHash(value: string): Buffer {
  if (/^[0-9a-fA-F]{64}$/.test(value)) {
    return Buffer.from(value, "hex");
  }
  return crypto.createHash("sha256").update(value, "utf8").digest();
}

/**
 * Initialize a campaign escrow on-chain.
 * Funds are sourced from the platform wallet after x402 settlement and parked in Kamino if configured.
 */
export async function initializeCampaign(params: {
  platformAddress: string;
  campaignId: string;
  budgetUsdcMicro: number;
  deliverablesExpected: number;
  kamino?: {
    programId: string;
    farmsProgramId: string;
    lendingMarket: string;
    usdcReserve: string;
  };
}): Promise<CampaignFundingData> {
  const connection = getSolanaConnection();
  const platform = getPlatformPublicKey();
  const configuredPlatform = new PublicKey(params.platformAddress);
  if (!configuredPlatform.equals(platform)) {
    throw new AppError(
      `Platform signer ${platform.toBase58()} does not match configured platform ${configuredPlatform.toBase58()}`,
      500,
      "ESCROW_PLATFORM_MISMATCH",
    );
  }

  const programId = new PublicKey(config.campaignEscrowProgramId);
  const usdcMint = new PublicKey(config.usdcMint);
  const usdcTokenProgram = await getTokenProgramForMint(usdcMint);
  ensureSplTokenProgram(usdcTokenProgram, "campaign USDC mint");
  const budget = BigInt(params.budgetUsdcMicro);

  if (budget <= 0n) {
    throw new AppError("Campaign budget must be greater than 0", 400, "ESCROW_BUDGET_INVALID");
  }

  const [campaignPda] = deriveCampaignPDA(platform, params.campaignId, programId);
  const sourceUsdcAta = getAssociatedTokenAddressSync(usdcMint, platform, false, usdcTokenProgram);
  const vaultAta = getAssociatedTokenAddressSync(usdcMint, campaignPda, true, usdcTokenProgram);

  const sourceAccount = await getOptionalTokenAccount(sourceUsdcAta, usdcTokenProgram);
  if (!sourceAccount) {
    throw new AppError(
      `Platform USDC account ${sourceUsdcAta.toBase58()} does not exist; x402 settlement must complete before escrow init`,
      500,
      "ESCROW_SOURCE_ACCOUNT_MISSING",
    );
  }
  if (sourceAccount.amount < budget) {
    throw new AppError(
      `Platform USDC balance ${sourceAccount.amount.toString()} is lower than campaign budget ${budget.toString()}`,
      500,
      "ESCROW_SOURCE_BALANCE_LOW",
    );
  }

  const initializeInstructions: TransactionInstruction[] = [
    createComputeBudgetInstruction(COMPUTE_UNITS_ESCROW),
    ...(await buildAtaIfMissing({
      mint: usdcMint,
      owner: campaignPda,
      tokenProgram: usdcTokenProgram,
      allowOwnerOffCurve: true,
    })),
    buildInitializeCampaignInstruction({
      programId,
      authority: platform,
      platform,
      campaign: campaignPda,
      sourceTokenAccount: sourceUsdcAta,
      vault: vaultAta,
      campaignId: params.campaignId,
      budget,
      deliverablesExpected: params.deliverablesExpected,
    }),
  ];

  let kaminoParkingInstructions: TransactionInstruction[] = [];
  let kaminoFunding: CampaignKaminoFundingData | null = null;
  if (params.kamino) {
    const kaminoProgramId = new PublicKey(params.kamino.programId);
    const kaminoFarmsProgramId = new PublicKey(params.kamino.farmsProgramId);
    const lendingMarket = new PublicKey(params.kamino.lendingMarket);
    const reserveAddress = new PublicKey(params.kamino.usdcReserve);
    const reserve = await loadKaminoReserveState(
      connection,
      reserveAddress,
      kaminoProgramId,
      lendingMarket,
    );

    if (!reserve.liquidityMint.equals(usdcMint)) {
      throw new AppError(
        `Kamino reserve ${reserveAddress.toBase58()} is for mint ${reserve.liquidityMint.toBase58()}, expected ${usdcMint.toBase58()}`,
        500,
        "KAMINO_RESERVE_MINT_MISMATCH",
      );
    }

    const kaminoUserMetadata = deriveKaminoUserMetadataPda(campaignPda, kaminoProgramId);
    const kaminoObligation = deriveKaminoVanillaObligationPda(
      campaignPda,
      lendingMarket,
      kaminoProgramId,
    );
    const kaminoMarketAuthority = deriveKaminoLendingMarketAuthorityPda(
      lendingMarket,
      kaminoProgramId,
    );
    const collateralTokenProgram = await getTokenProgramForMint(reserve.collateralMint);
    ensureSplTokenProgram(collateralTokenProgram, "Kamino collateral mint");

    kaminoFunding = {
      programId: kaminoProgramId.toBase58(),
      lendingMarket: lendingMarket.toBase58(),
      reserve: reserveAddress.toBase58(),
      userMetadata: kaminoUserMetadata.toBase58(),
      obligation: kaminoObligation.toBase58(),
      requestedParkAmountUsdcMicro: budget.toString(),
      parkingSignature: null,
      parkingError: null,
    };

    initializeInstructions.push(
      buildInitializeKaminoPositionInstruction({
        programId,
        platform,
        campaign: campaignPda,
        kaminoUserMetadata,
        kaminoObligation,
        kaminoProgramId,
        lendingMarket,
        reserve: reserveAddress,
      }),
    );

    const farmRefreshInstruction = hasKaminoCollateralFarm(reserve)
      ? buildRefreshObligationFarmInstruction({
          platform,
          lendingMarket,
          lendingMarketAuthority: kaminoMarketAuthority,
          reserve,
          obligation: kaminoObligation,
          obligationFarmUserState: deriveKaminoObligationFarmStatePda(
            reserve.collateralFarm,
            kaminoObligation,
            kaminoFarmsProgramId,
          ),
          farmsProgramId: kaminoFarmsProgramId,
          kaminoProgramId,
        })
      : null;

    kaminoParkingInstructions = [
      createComputeBudgetInstruction(COMPUTE_UNITS_KAMINO),
      buildRefreshReserveInstruction(reserve, kaminoProgramId),
      buildRefreshObligationInstruction(lendingMarket, kaminoObligation, kaminoProgramId),
      ...(farmRefreshInstruction ? [farmRefreshInstruction] : []),
      buildParkInKaminoInstruction({
        programId,
        platform,
        campaign: campaignPda,
        vault: vaultAta,
        kaminoProgramId,
        lendingMarket,
        lendingMarketAuthority: kaminoMarketAuthority,
        reserve,
        obligation: kaminoObligation,
        destinationCollateral: reserve.collateralSupply,
        collateralTokenProgram,
        liquidityTokenProgram: reserve.liquidityTokenProgram,
        liquidityAmount: budget,
      }),
      ...(farmRefreshInstruction ? [farmRefreshInstruction] : []),
    ];
  }

  const initializeSignature = await sendPlatformTransaction(
    initializeInstructions,
    "escrow initialize",
  );

  const fundingData: CampaignFundingData = {
    campaignPda: campaignPda.toBase58(),
    sourceTokenAccount: sourceUsdcAta.toBase58(),
    vaultTokenAccount: vaultAta.toBase58(),
    usdcMint: usdcMint.toBase58(),
    fundedAmountUsdcMicro: budget.toString(),
    initializeSignature,
    platformBalanceBeforeFundingUsdcMicro: sourceAccount.amount.toString(),
    platformBalanceAfterFundingUsdcMicro: await readOptionalTokenAccountAmount(
      sourceUsdcAta,
      usdcTokenProgram,
    ),
    vaultBalanceAfterFundingUsdcMicro: await readOptionalTokenAccountAmount(
      vaultAta,
      usdcTokenProgram,
    ),
    finalVaultBalanceUsdcMicro: null,
    parkedInKamino: false,
    kamino: kaminoFunding,
  };

  if (kaminoParkingInstructions.length === 0) {
    return {
      ...fundingData,
      finalVaultBalanceUsdcMicro: fundingData.vaultBalanceAfterFundingUsdcMicro,
    };
  }

  try {
    const parkingSignature = await sendPlatformTransaction(
      kaminoParkingInstructions,
      "escrow park in Kamino",
    );
    return {
      ...fundingData,
      finalVaultBalanceUsdcMicro: await readOptionalTokenAccountAmount(vaultAta, usdcTokenProgram),
      parkedInKamino: true,
      kamino: fundingData.kamino
        ? {
            ...fundingData.kamino,
            parkingSignature,
          }
        : null,
    };
  } catch (error) {
    const parkingError = error instanceof Error ? error.message : String(error);
    console.error(
      `[escrow] Kamino parking failed for ${params.campaignId}; funds remain safely in vault`,
      parkingError,
    );
    return {
      ...fundingData,
      finalVaultBalanceUsdcMicro: await readOptionalTokenAccountAmount(vaultAta, usdcTokenProgram),
      kamino: fundingData.kamino
        ? {
            ...fundingData.kamino,
            parkingError,
          }
        : null,
    };
  }
}

/**
 * Submit a deliverable hash to the escrow after an agent completes work.
 */
export async function submitDeliverable(params: {
  campaignId: string;
  deliverableHash: string;
  agentId: string;
}): Promise<string> {
  const platform = getPlatformPublicKey();
  const programId = new PublicKey(config.campaignEscrowProgramId);
  const [campaignPda] = deriveCampaignPDA(platform, params.campaignId, programId);
  const deliverableHash = normalizeDeliverableHash(params.deliverableHash);

  return sendPlatformTransaction(
    [
      createComputeBudgetInstruction(COMPUTE_UNITS_ESCROW),
      buildSubmitDeliverableInstruction({
        programId,
        platform,
        campaign: campaignPda,
        deliverableHash,
        agentId: params.agentId,
      }),
    ],
    "escrow submit deliverable",
  );
}

/**
 * Complete a campaign and release escrowed USDC.
 * If funds are parked in Kamino, the full collateral position is withdrawn first.
 */
export async function completeCampaign(params: { campaignId: string }): Promise<string> {
  const platform = getPlatformPublicKey();
  const programId = new PublicKey(config.campaignEscrowProgramId);
  const usdcMint = new PublicKey(config.usdcMint);
  const usdcTokenProgram = await getTokenProgramForMint(usdcMint);
  ensureSplTokenProgram(usdcTokenProgram, "campaign USDC mint");
  const [campaignPda] = deriveCampaignPDA(platform, params.campaignId, programId);
  const campaign = await loadCampaignAccount(campaignPda);

  const vaultAta = getAssociatedTokenAddressSync(usdcMint, campaignPda, true, usdcTokenProgram);
  const platformUsdcAta = getAssociatedTokenAddressSync(
    usdcMint,
    platform,
    false,
    usdcTokenProgram,
  );

  await maybeWithdrawKaminoPosition({
    campaignPda,
    campaign,
    vaultAta,
  });

  return sendPlatformTransaction(
    [
      createComputeBudgetInstruction(COMPUTE_UNITS_ESCROW),
      ...(await buildAtaIfMissing({
        mint: usdcMint,
        owner: platform,
        tokenProgram: usdcTokenProgram,
      })),
      buildCompleteCampaignInstruction({
        programId,
        platform,
        campaign: campaignPda,
        vault: vaultAta,
        platformTokenAccount: platformUsdcAta,
      }),
    ],
    "escrow complete campaign",
  );
}

/**
 * Cancel a campaign and refund escrowed USDC.
 * A refund token account is required because the gateway, not the client, signs this flow.
 */
export async function cancelCampaign(params: {
  campaignId: string;
  refundTokenAccount: string;
}): Promise<string> {
  const platform = getPlatformPublicKey();
  const programId = new PublicKey(config.campaignEscrowProgramId);
  const usdcMint = new PublicKey(config.usdcMint);
  const usdcTokenProgram = await getTokenProgramForMint(usdcMint);
  ensureSplTokenProgram(usdcTokenProgram, "campaign USDC mint");
  const [campaignPda] = deriveCampaignPDA(platform, params.campaignId, programId);
  const campaign = await loadCampaignAccount(campaignPda);
  const vaultAta = getAssociatedTokenAddressSync(usdcMint, campaignPda, true, usdcTokenProgram);
  const refundTokenAccount = new PublicKey(params.refundTokenAccount);

  await maybeWithdrawKaminoPosition({
    campaignPda,
    campaign,
    vaultAta,
  });

  return sendPlatformTransaction(
    [
      createComputeBudgetInstruction(COMPUTE_UNITS_ESCROW),
      buildCancelCampaignInstruction({
        programId,
        authority: platform,
        campaign: campaignPda,
        vault: vaultAta,
        refundTokenAccount,
      }),
    ],
    "escrow cancel campaign",
  );
}

async function maybeWithdrawKaminoPosition(params: {
  campaignPda: PublicKey;
  campaign: DecodedCampaignAccount;
  vaultAta: PublicKey;
}): Promise<void> {
  if (!isKaminoInitialized(params.campaign)) {
    return;
  }

  const reserve = await loadKaminoReserveState(
    getSolanaConnection(),
    params.campaign.kaminoReserve,
    params.campaign.kaminoProgram,
    params.campaign.kaminoLendingMarket,
  );
  const hasDepositedCollateral = await obligationHasCollateralDeposit(
    getSolanaConnection(),
    params.campaign.kaminoObligation,
    params.campaign.kaminoProgram,
    params.campaign.kaminoReserve,
  );
  if (!hasDepositedCollateral) {
    return;
  }
  const collateralTokenProgram = await getTokenProgramForMint(reserve.collateralMint);
  ensureSplTokenProgram(collateralTokenProgram, "Kamino collateral mint");

  const platform = getPlatformPublicKey();
  const farmRefreshInstruction = hasKaminoCollateralFarm(reserve)
    ? buildRefreshObligationFarmInstruction({
        platform,
        lendingMarket: params.campaign.kaminoLendingMarket,
        lendingMarketAuthority: deriveKaminoLendingMarketAuthorityPda(
          params.campaign.kaminoLendingMarket,
          params.campaign.kaminoProgram,
        ),
        reserve,
        obligation: params.campaign.kaminoObligation,
        obligationFarmUserState: deriveKaminoObligationFarmStatePda(
          reserve.collateralFarm,
          params.campaign.kaminoObligation,
          new PublicKey(config.kaminoFarmsProgramId),
        ),
        farmsProgramId: new PublicKey(config.kaminoFarmsProgramId),
        kaminoProgramId: params.campaign.kaminoProgram,
      })
    : null;

  await sendPlatformTransaction(
    [
      createComputeBudgetInstruction(COMPUTE_UNITS_KAMINO),
      buildRefreshReserveInstruction(reserve, params.campaign.kaminoProgram),
      buildRefreshObligationInstruction(
        params.campaign.kaminoLendingMarket,
        params.campaign.kaminoObligation,
        params.campaign.kaminoProgram,
      ),
      ...(farmRefreshInstruction ? [farmRefreshInstruction] : []),
      buildWithdrawFromKaminoInstruction({
        programId: new PublicKey(config.campaignEscrowProgramId),
        platform,
        campaign: params.campaignPda,
        vault: params.vaultAta,
        kaminoProgramId: params.campaign.kaminoProgram,
        lendingMarket: params.campaign.kaminoLendingMarket,
        lendingMarketAuthority: deriveKaminoLendingMarketAuthorityPda(
          params.campaign.kaminoLendingMarket,
          params.campaign.kaminoProgram,
        ),
        reserve,
        obligation: params.campaign.kaminoObligation,
        sourceCollateral: reserve.collateralSupply,
        collateralTokenProgram,
        liquidityTokenProgram: reserve.liquidityTokenProgram,
        collateralAmount: U64_MAX,
      }),
      ...(farmRefreshInstruction ? [farmRefreshInstruction] : []),
    ],
    "escrow withdraw from Kamino",
  );
}

async function loadCampaignAccount(campaignPda: PublicKey): Promise<DecodedCampaignAccount> {
  const accountInfo = await getSolanaConnection().getAccountInfo(campaignPda);
  if (!accountInfo) {
    throw new AppError(
      `Campaign ${campaignPda.toBase58()} not found`,
      404,
      "ESCROW_CAMPAIGN_MISSING",
    );
  }
  return decodeCampaignAccount(accountInfo.data);
}

function isKaminoInitialized(campaign: DecodedCampaignAccount): boolean {
  return (
    !campaign.kaminoProgram.equals(DEFAULT_PUBLIC_KEY) &&
    !campaign.kaminoLendingMarket.equals(DEFAULT_PUBLIC_KEY) &&
    !campaign.kaminoReserve.equals(DEFAULT_PUBLIC_KEY) &&
    !campaign.kaminoObligation.equals(DEFAULT_PUBLIC_KEY)
  );
}

async function getTokenProgramForMint(mint: PublicKey): Promise<PublicKey> {
  const accountInfo = await getSolanaConnection().getAccountInfo(mint);
  if (!accountInfo) {
    throw new AppError(`Token mint ${mint.toBase58()} not found`, 500, "TOKEN_MINT_MISSING");
  }
  if (
    accountInfo.owner.equals(TOKEN_PROGRAM_ID) ||
    accountInfo.owner.equals(TOKEN_2022_PROGRAM_ID)
  ) {
    return accountInfo.owner;
  }
  throw new AppError(
    `Mint ${mint.toBase58()} is owned by unsupported token program ${accountInfo.owner.toBase58()}`,
    500,
    "TOKEN_PROGRAM_UNSUPPORTED",
  );
}

async function getOptionalTokenAccount(address: PublicKey, tokenProgram: PublicKey) {
  const accountInfo = await getSolanaConnection().getAccountInfo(address);
  if (!accountInfo) {
    return null;
  }
  return getAccount(getSolanaConnection(), address, "confirmed", tokenProgram);
}

async function readOptionalTokenAccountAmount(
  address: PublicKey,
  tokenProgram: PublicKey,
): Promise<string | null> {
  try {
    const account = await getOptionalTokenAccount(address, tokenProgram);
    return account?.amount.toString() ?? null;
  } catch (error) {
    console.warn(
      `[escrow] Unable to observe token account ${address.toBase58()} after transaction`,
      error instanceof Error ? error.message : error,
    );
    return null;
  }
}

async function buildAtaIfMissing(params: {
  mint: PublicKey;
  owner: PublicKey;
  tokenProgram: PublicKey;
  allowOwnerOffCurve?: boolean;
}): Promise<TransactionInstruction[]> {
  const ata = getAssociatedTokenAddressSync(
    params.mint,
    params.owner,
    params.allowOwnerOffCurve ?? false,
    params.tokenProgram,
  );
  const existing = await getSolanaConnection().getAccountInfo(ata);
  if (existing) {
    return [];
  }

  return [
    createAssociatedTokenAccountIdempotentInstruction(
      getPlatformPublicKey(),
      ata,
      params.owner,
      params.mint,
      params.tokenProgram,
    ),
  ];
}

function buildInitializeCampaignInstruction(params: {
  programId: PublicKey;
  authority: PublicKey;
  platform: PublicKey;
  campaign: PublicKey;
  sourceTokenAccount: PublicKey;
  vault: PublicKey;
  campaignId: string;
  budget: bigint;
  deliverablesExpected: number;
}): TransactionInstruction {
  return new TransactionInstruction({
    programId: params.programId,
    keys: [
      { pubkey: params.authority, isSigner: true, isWritable: true },
      { pubkey: params.platform, isSigner: false, isWritable: false },
      { pubkey: params.campaign, isSigner: false, isWritable: true },
      { pubkey: params.sourceTokenAccount, isSigner: false, isWritable: true },
      { pubkey: params.vault, isSigner: false, isWritable: true },
      { pubkey: TOKEN_PROGRAM_ID, isSigner: false, isWritable: false },
      { pubkey: SystemProgram.programId, isSigner: false, isWritable: false },
    ],
    data: Buffer.concat([
      INITIALIZE_CAMPAIGN_DISCRIMINATOR,
      encodeString(params.campaignId),
      encodeU64(params.budget),
      Buffer.from([params.deliverablesExpected]),
    ]),
  });
}

function buildSubmitDeliverableInstruction(params: {
  programId: PublicKey;
  platform: PublicKey;
  campaign: PublicKey;
  deliverableHash: Buffer;
  agentId: string;
}): TransactionInstruction {
  return new TransactionInstruction({
    programId: params.programId,
    keys: [
      { pubkey: params.platform, isSigner: true, isWritable: false },
      { pubkey: params.campaign, isSigner: false, isWritable: true },
    ],
    data: Buffer.concat([
      SUBMIT_DELIVERABLE_DISCRIMINATOR,
      params.deliverableHash,
      encodeString(params.agentId),
    ]),
  });
}

function buildInitializeKaminoPositionInstruction(params: {
  programId: PublicKey;
  platform: PublicKey;
  campaign: PublicKey;
  kaminoUserMetadata: PublicKey;
  kaminoObligation: PublicKey;
  kaminoProgramId: PublicKey;
  lendingMarket: PublicKey;
  reserve: PublicKey;
}): TransactionInstruction {
  return new TransactionInstruction({
    programId: params.programId,
    keys: [
      { pubkey: params.platform, isSigner: true, isWritable: false },
      { pubkey: params.campaign, isSigner: false, isWritable: true },
      { pubkey: params.kaminoUserMetadata, isSigner: false, isWritable: true },
      { pubkey: params.kaminoObligation, isSigner: false, isWritable: true },
      { pubkey: params.kaminoProgramId, isSigner: false, isWritable: false },
      { pubkey: params.lendingMarket, isSigner: false, isWritable: false },
      { pubkey: params.reserve, isSigner: false, isWritable: false },
      { pubkey: SYSVAR_RENT_PUBKEY, isSigner: false, isWritable: false },
      { pubkey: SystemProgram.programId, isSigner: false, isWritable: false },
    ],
    data: INITIALIZE_KAMINO_POSITION_DISCRIMINATOR,
  });
}

function buildParkInKaminoInstruction(params: {
  programId: PublicKey;
  platform: PublicKey;
  campaign: PublicKey;
  vault: PublicKey;
  kaminoProgramId: PublicKey;
  lendingMarket: PublicKey;
  lendingMarketAuthority: PublicKey;
  reserve: Awaited<ReturnType<typeof loadKaminoReserveState>>;
  obligation: PublicKey;
  destinationCollateral: PublicKey;
  collateralTokenProgram: PublicKey;
  liquidityTokenProgram: PublicKey;
  liquidityAmount: bigint;
}): TransactionInstruction {
  return new TransactionInstruction({
    programId: params.programId,
    keys: [
      { pubkey: params.platform, isSigner: true, isWritable: false },
      { pubkey: params.campaign, isSigner: false, isWritable: true },
      { pubkey: params.vault, isSigner: false, isWritable: true },
      { pubkey: params.kaminoProgramId, isSigner: false, isWritable: false },
      { pubkey: params.lendingMarket, isSigner: false, isWritable: false },
      { pubkey: params.lendingMarketAuthority, isSigner: false, isWritable: false },
      { pubkey: params.reserve.reserveAddress, isSigner: false, isWritable: true },
      { pubkey: params.obligation, isSigner: false, isWritable: true },
      { pubkey: params.reserve.liquidityMint, isSigner: false, isWritable: false },
      { pubkey: params.reserve.liquiditySupply, isSigner: false, isWritable: true },
      { pubkey: params.reserve.collateralMint, isSigner: false, isWritable: true },
      { pubkey: params.destinationCollateral, isSigner: false, isWritable: true },
      { pubkey: params.collateralTokenProgram, isSigner: false, isWritable: false },
      { pubkey: params.liquidityTokenProgram, isSigner: false, isWritable: false },
      { pubkey: SYSVAR_INSTRUCTIONS_PUBKEY, isSigner: false, isWritable: false },
    ],
    data: Buffer.concat([PARK_IN_KAMINO_DISCRIMINATOR, encodeU64(params.liquidityAmount)]),
  });
}

function buildWithdrawFromKaminoInstruction(params: {
  programId: PublicKey;
  platform: PublicKey;
  campaign: PublicKey;
  vault: PublicKey;
  kaminoProgramId: PublicKey;
  lendingMarket: PublicKey;
  lendingMarketAuthority: PublicKey;
  reserve: Awaited<ReturnType<typeof loadKaminoReserveState>>;
  obligation: PublicKey;
  sourceCollateral: PublicKey;
  collateralTokenProgram: PublicKey;
  liquidityTokenProgram: PublicKey;
  collateralAmount: bigint;
}): TransactionInstruction {
  return new TransactionInstruction({
    programId: params.programId,
    keys: [
      { pubkey: params.platform, isSigner: true, isWritable: false },
      { pubkey: params.campaign, isSigner: false, isWritable: true },
      { pubkey: params.vault, isSigner: false, isWritable: true },
      { pubkey: params.kaminoProgramId, isSigner: false, isWritable: false },
      { pubkey: params.lendingMarket, isSigner: false, isWritable: false },
      { pubkey: params.lendingMarketAuthority, isSigner: false, isWritable: false },
      { pubkey: params.reserve.reserveAddress, isSigner: false, isWritable: true },
      { pubkey: params.obligation, isSigner: false, isWritable: true },
      { pubkey: params.reserve.liquidityMint, isSigner: false, isWritable: false },
      { pubkey: params.sourceCollateral, isSigner: false, isWritable: true },
      { pubkey: params.reserve.collateralMint, isSigner: false, isWritable: true },
      { pubkey: params.reserve.liquiditySupply, isSigner: false, isWritable: true },
      { pubkey: params.collateralTokenProgram, isSigner: false, isWritable: false },
      { pubkey: params.liquidityTokenProgram, isSigner: false, isWritable: false },
      { pubkey: SYSVAR_INSTRUCTIONS_PUBKEY, isSigner: false, isWritable: false },
    ],
    data: Buffer.concat([WITHDRAW_FROM_KAMINO_DISCRIMINATOR, encodeU64(params.collateralAmount)]),
  });
}

function buildCompleteCampaignInstruction(params: {
  programId: PublicKey;
  platform: PublicKey;
  campaign: PublicKey;
  vault: PublicKey;
  platformTokenAccount: PublicKey;
}): TransactionInstruction {
  return new TransactionInstruction({
    programId: params.programId,
    keys: [
      { pubkey: params.platform, isSigner: true, isWritable: false },
      { pubkey: params.platform, isSigner: false, isWritable: true }, // rent_receiver == platform
      { pubkey: params.campaign, isSigner: false, isWritable: true },
      { pubkey: params.vault, isSigner: false, isWritable: true },
      { pubkey: params.platformTokenAccount, isSigner: false, isWritable: true },
      { pubkey: TOKEN_PROGRAM_ID, isSigner: false, isWritable: false },
    ],
    data: COMPLETE_CAMPAIGN_DISCRIMINATOR,
  });
}

function buildCancelCampaignInstruction(params: {
  programId: PublicKey;
  authority: PublicKey;
  campaign: PublicKey;
  vault: PublicKey;
  refundTokenAccount: PublicKey;
}): TransactionInstruction {
  return new TransactionInstruction({
    programId: params.programId,
    keys: [
      { pubkey: params.authority, isSigner: true, isWritable: true }, // mut: receives rent on close
      { pubkey: params.campaign, isSigner: false, isWritable: true },
      { pubkey: params.vault, isSigner: false, isWritable: true },
      { pubkey: params.refundTokenAccount, isSigner: false, isWritable: true },
      { pubkey: TOKEN_PROGRAM_ID, isSigner: false, isWritable: false },
    ],
    data: CANCEL_CAMPAIGN_DISCRIMINATOR,
  });
}

function encodeString(value: string): Buffer {
  const data = Buffer.from(value, "utf8");
  const length = Buffer.alloc(4);
  length.writeUInt32LE(data.length, 0);
  return Buffer.concat([length, data]);
}

function encodeU64(value: bigint): Buffer {
  const data = Buffer.alloc(8);
  data.writeBigUInt64LE(value);
  return data;
}

function ensureSplTokenProgram(tokenProgram: PublicKey, label: string): void {
  if (!tokenProgram.equals(TOKEN_PROGRAM_ID)) {
    throw new AppError(
      `${label} uses token program ${tokenProgram.toBase58()}, but the escrow program currently supports the SPL Token program only`,
      500,
      "TOKEN_PROGRAM_UNSUPPORTED",
    );
  }
}
