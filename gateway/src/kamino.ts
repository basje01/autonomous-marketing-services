import { Obligation, Reserve } from "@kamino-finance/klend-sdk";
import {
  Connection,
  PublicKey,
  SystemProgram,
  SYSVAR_RENT_PUBKEY,
  TransactionInstruction,
} from "@solana/web3.js";
import { AppError } from "./errors.js";

const DEFAULT_PUBLIC_KEY = new PublicKey("11111111111111111111111111111111");
const REFRESH_RESERVE_DISCRIMINATOR = Buffer.from([2, 218, 138, 235, 79, 201, 25, 102]);
const REFRESH_OBLIGATION_DISCRIMINATOR = Buffer.from([33, 132, 147, 228, 151, 192, 72, 89]);
const REFRESH_OBLIGATION_FARMS_FOR_RESERVE_DISCRIMINATOR = Buffer.from([
  140, 144, 253, 21, 10, 74, 248, 3,
]);
const KAMINO_LENDING_MARKET_AUTH_SEED = Buffer.from("lma");
const KAMINO_USER_METADATA_SEED = Buffer.from("user_meta");
const KAMINO_FARM_USER_SEED = Buffer.from("user");
const COLLATERAL_FARM_MODE = 0;

export interface KaminoReserveState {
  reserveAddress: PublicKey;
  lendingMarket: PublicKey;
  liquidityMint: PublicKey;
  liquidityTokenProgram: PublicKey;
  liquiditySupply: PublicKey;
  collateralMint: PublicKey;
  collateralSupply: PublicKey;
  pythOracle: PublicKey | null;
  switchboardPriceOracle: PublicKey | null;
  switchboardTwapOracle: PublicKey | null;
  scopePrices: PublicKey | null;
  collateralFarm: PublicKey | null;
}

export async function loadKaminoReserveState(
  connection: Connection,
  reserveAddress: PublicKey,
  kaminoProgramId: PublicKey,
  lendingMarket: PublicKey,
): Promise<KaminoReserveState> {
  const accountInfo = await connection.getAccountInfo(reserveAddress);
  if (!accountInfo) {
    throw new AppError(
      `Kamino reserve ${reserveAddress.toBase58()} not found`,
      500,
      "KAMINO_RESERVE_MISSING",
    );
  }
  if (!accountInfo.owner.equals(kaminoProgramId)) {
    throw new AppError(
      `Kamino reserve ${reserveAddress.toBase58()} is owned by ${accountInfo.owner.toBase58()}, expected ${kaminoProgramId.toBase58()}`,
      500,
      "KAMINO_RESERVE_OWNER_INVALID",
    );
  }

  const reserve = Reserve.decode(accountInfo.data);
  const reserveLendingMarket = new PublicKey(reserve.lendingMarket);
  if (!reserveLendingMarket.equals(lendingMarket)) {
    throw new AppError(
      `Kamino reserve ${reserveAddress.toBase58()} belongs to lending market ${reserveLendingMarket.toBase58()}, expected ${lendingMarket.toBase58()}`,
      500,
      "KAMINO_RESERVE_MARKET_MISMATCH",
    );
  }

  return {
    reserveAddress,
    lendingMarket: reserveLendingMarket,
    liquidityMint: new PublicKey(reserve.liquidity.mintPubkey),
    liquidityTokenProgram: new PublicKey(reserve.liquidity.tokenProgram),
    liquiditySupply: new PublicKey(reserve.liquidity.supplyVault),
    collateralMint: new PublicKey(reserve.collateral.mintPubkey),
    collateralSupply: new PublicKey(reserve.collateral.supplyVault),
    pythOracle: optionalPublicKey(reserve.config.tokenInfo.pythConfiguration.price),
    switchboardPriceOracle: optionalPublicKey(
      reserve.config.tokenInfo.switchboardConfiguration.priceAggregator,
    ),
    switchboardTwapOracle: optionalPublicKey(
      reserve.config.tokenInfo.switchboardConfiguration.twapAggregator,
    ),
    scopePrices: optionalPublicKey(reserve.config.tokenInfo.scopeConfiguration.priceFeed),
    collateralFarm: optionalPublicKey(reserve.farmCollateral),
  };
}

export async function obligationHasCollateralDeposit(
  connection: Connection,
  obligationAddress: PublicKey,
  kaminoProgramId: PublicKey,
  reserveAddress: PublicKey,
): Promise<boolean> {
  const accountInfo = await connection.getAccountInfo(obligationAddress);
  if (!accountInfo) {
    return false;
  }
  if (!accountInfo.owner.equals(kaminoProgramId)) {
    throw new AppError(
      `Kamino obligation ${obligationAddress.toBase58()} is owned by ${accountInfo.owner.toBase58()}, expected ${kaminoProgramId.toBase58()}`,
      500,
      "KAMINO_OBLIGATION_OWNER_INVALID",
    );
  }

  const obligation = Obligation.decode(accountInfo.data);
  return obligation.deposits.some(
    (deposit) =>
      new PublicKey(deposit.depositReserve).equals(reserveAddress) &&
      !deposit.depositedAmount.isZero(),
  );
}

export function deriveKaminoUserMetadataPda(
  owner: PublicKey,
  kaminoProgramId: PublicKey,
): PublicKey {
  return PublicKey.findProgramAddressSync(
    [KAMINO_USER_METADATA_SEED, owner.toBuffer()],
    kaminoProgramId,
  )[0];
}

export function deriveKaminoVanillaObligationPda(
  owner: PublicKey,
  lendingMarket: PublicKey,
  kaminoProgramId: PublicKey,
): PublicKey {
  return PublicKey.findProgramAddressSync(
    [
      Buffer.from([0]),
      Buffer.from([0]),
      owner.toBuffer(),
      lendingMarket.toBuffer(),
      SystemProgram.programId.toBuffer(),
      SystemProgram.programId.toBuffer(),
    ],
    kaminoProgramId,
  )[0];
}

export function deriveKaminoLendingMarketAuthorityPda(
  lendingMarket: PublicKey,
  kaminoProgramId: PublicKey,
): PublicKey {
  return PublicKey.findProgramAddressSync(
    [KAMINO_LENDING_MARKET_AUTH_SEED, lendingMarket.toBuffer()],
    kaminoProgramId,
  )[0];
}

export function deriveKaminoObligationFarmStatePda(
  farmAddress: PublicKey,
  obligation: PublicKey,
  farmsProgramId: PublicKey,
): PublicKey {
  return PublicKey.findProgramAddressSync(
    [KAMINO_FARM_USER_SEED, farmAddress.toBuffer(), obligation.toBuffer()],
    farmsProgramId,
  )[0];
}

export function buildRefreshReserveInstruction(
  reserve: KaminoReserveState,
  kaminoProgramId: PublicKey,
): TransactionInstruction {
  return new TransactionInstruction({
    programId: kaminoProgramId,
    keys: [
      { pubkey: reserve.reserveAddress, isSigner: false, isWritable: true },
      { pubkey: reserve.lendingMarket, isSigner: false, isWritable: false },
      { pubkey: reserve.pythOracle ?? kaminoProgramId, isSigner: false, isWritable: false },
      {
        pubkey: reserve.switchboardPriceOracle ?? kaminoProgramId,
        isSigner: false,
        isWritable: false,
      },
      {
        pubkey: reserve.switchboardTwapOracle ?? kaminoProgramId,
        isSigner: false,
        isWritable: false,
      },
      { pubkey: reserve.scopePrices ?? kaminoProgramId, isSigner: false, isWritable: false },
    ],
    data: REFRESH_RESERVE_DISCRIMINATOR,
  });
}

export function buildRefreshObligationInstruction(
  lendingMarket: PublicKey,
  obligation: PublicKey,
  kaminoProgramId: PublicKey,
): TransactionInstruction {
  return new TransactionInstruction({
    programId: kaminoProgramId,
    keys: [
      { pubkey: lendingMarket, isSigner: false, isWritable: false },
      { pubkey: obligation, isSigner: false, isWritable: true },
    ],
    data: REFRESH_OBLIGATION_DISCRIMINATOR,
  });
}

export function buildRefreshObligationFarmInstruction(params: {
  platform: PublicKey;
  lendingMarket: PublicKey;
  lendingMarketAuthority: PublicKey;
  reserve: KaminoReserveState;
  obligation: PublicKey;
  obligationFarmUserState: PublicKey;
  farmsProgramId: PublicKey;
  kaminoProgramId: PublicKey;
}): TransactionInstruction {
  if (!params.reserve.collateralFarm) {
    throw new AppError(
      "Kamino reserve does not have a collateral farm",
      500,
      "KAMINO_FARM_DISABLED",
    );
  }

  return new TransactionInstruction({
    programId: params.kaminoProgramId,
    keys: [
      { pubkey: params.platform, isSigner: true, isWritable: false },
      { pubkey: params.obligation, isSigner: false, isWritable: false },
      { pubkey: params.lendingMarketAuthority, isSigner: false, isWritable: false },
      { pubkey: params.reserve.reserveAddress, isSigner: false, isWritable: false },
      { pubkey: params.reserve.collateralFarm, isSigner: false, isWritable: true },
      { pubkey: params.obligationFarmUserState, isSigner: false, isWritable: true },
      { pubkey: params.lendingMarket, isSigner: false, isWritable: false },
      { pubkey: params.farmsProgramId, isSigner: false, isWritable: false },
      { pubkey: SYSVAR_RENT_PUBKEY, isSigner: false, isWritable: false },
      { pubkey: SystemProgram.programId, isSigner: false, isWritable: false },
    ],
    data: Buffer.concat([
      REFRESH_OBLIGATION_FARMS_FOR_RESERVE_DISCRIMINATOR,
      Buffer.from([COLLATERAL_FARM_MODE]),
    ]),
  });
}

export function hasKaminoCollateralFarm(
  reserve: KaminoReserveState,
): reserve is KaminoReserveState & { collateralFarm: PublicKey } {
  return reserve.collateralFarm !== null;
}

function optionalPublicKey(value: string | PublicKey): PublicKey | null {
  const publicKey = new PublicKey(value);
  return publicKey.equals(DEFAULT_PUBLIC_KEY) ? null : publicKey;
}
