use anchor_lang::{
    prelude::*,
    solana_program::{
        instruction::{AccountMeta, Instruction},
        program::invoke_signed,
        system_program,
    },
};

pub const KAMINO_LENDING_MARKET_AUTH: &[u8] = b"lma";
pub const KAMINO_BASE_SEED_USER_METADATA: &[u8] = b"user_meta";

const INIT_USER_METADATA_DISCRIMINATOR: [u8; 8] = [117, 169, 176, 69, 197, 23, 15, 162];
const INIT_OBLIGATION_DISCRIMINATOR: [u8; 8] = [251, 10, 231, 76, 27, 11, 159, 96];
const DEPOSIT_RESERVE_LIQUIDITY_AND_OBLIGATION_COLLATERAL_DISCRIMINATOR: [u8; 8] =
    [129, 199, 4, 2, 222, 39, 26, 46];
const WITHDRAW_OBLIGATION_COLLATERAL_AND_REDEEM_RESERVE_COLLATERAL_DISCRIMINATOR: [u8; 8] =
    [75, 93, 93, 220, 34, 150, 218, 196];

#[derive(AnchorSerialize, AnchorDeserialize)]
struct InitUserMetadataArgs {
    user_lookup_table: Pubkey,
}

#[derive(AnchorSerialize, AnchorDeserialize)]
struct InitObligationArgs {
    tag: u8,
    id: u8,
}

#[derive(AnchorSerialize, AnchorDeserialize)]
struct LiquidityAmountArgs {
    liquidity_amount: u64,
}

#[derive(AnchorSerialize, AnchorDeserialize)]
struct CollateralAmountArgs {
    collateral_amount: u64,
}

pub fn derive_user_metadata_pda(owner: &Pubkey, kamino_program_id: &Pubkey) -> (Pubkey, u8) {
    Pubkey::find_program_address(
        &[KAMINO_BASE_SEED_USER_METADATA, owner.as_ref()],
        kamino_program_id,
    )
}

pub fn derive_vanilla_obligation_pda(
    owner: &Pubkey,
    lending_market: &Pubkey,
    kamino_program_id: &Pubkey,
) -> (Pubkey, u8) {
    Pubkey::find_program_address(
        &[
            &[0],
            &[0],
            owner.as_ref(),
            lending_market.as_ref(),
            system_program::ID.as_ref(),
            system_program::ID.as_ref(),
        ],
        kamino_program_id,
    )
}

pub fn derive_lending_market_authority_pda(
    lending_market: &Pubkey,
    kamino_program_id: &Pubkey,
) -> (Pubkey, u8) {
    Pubkey::find_program_address(
        &[KAMINO_LENDING_MARKET_AUTH, lending_market.as_ref()],
        kamino_program_id,
    )
}

pub struct InitPositionAccounts<'info> {
    pub campaign_owner: AccountInfo<'info>,
    pub fee_payer: AccountInfo<'info>,
    pub kamino_program: AccountInfo<'info>,
    pub lending_market: AccountInfo<'info>,
    pub user_metadata: AccountInfo<'info>,
    pub obligation: AccountInfo<'info>,
    pub rent: AccountInfo<'info>,
    pub system_program: AccountInfo<'info>,
}

pub struct DepositAccounts<'info> {
    pub campaign_owner: AccountInfo<'info>,
    pub kamino_program: AccountInfo<'info>,
    pub obligation: AccountInfo<'info>,
    pub lending_market: AccountInfo<'info>,
    pub lending_market_authority: AccountInfo<'info>,
    pub reserve: AccountInfo<'info>,
    pub reserve_liquidity_mint: AccountInfo<'info>,
    pub reserve_liquidity_supply: AccountInfo<'info>,
    pub reserve_collateral_mint: AccountInfo<'info>,
    pub reserve_destination_deposit_collateral: AccountInfo<'info>,
    pub user_source_liquidity: AccountInfo<'info>,
    pub collateral_token_program: AccountInfo<'info>,
    pub liquidity_token_program: AccountInfo<'info>,
    pub instruction_sysvar_account: AccountInfo<'info>,
}

pub struct WithdrawAccounts<'info> {
    pub campaign_owner: AccountInfo<'info>,
    pub kamino_program: AccountInfo<'info>,
    pub obligation: AccountInfo<'info>,
    pub lending_market: AccountInfo<'info>,
    pub lending_market_authority: AccountInfo<'info>,
    pub reserve: AccountInfo<'info>,
    pub reserve_liquidity_mint: AccountInfo<'info>,
    pub reserve_source_collateral: AccountInfo<'info>,
    pub reserve_collateral_mint: AccountInfo<'info>,
    pub reserve_liquidity_supply: AccountInfo<'info>,
    pub user_destination_liquidity: AccountInfo<'info>,
    pub collateral_token_program: AccountInfo<'info>,
    pub liquidity_token_program: AccountInfo<'info>,
    pub instruction_sysvar_account: AccountInfo<'info>,
}

pub fn init_position<'info>(
    accounts: InitPositionAccounts<'info>,
    signer_seeds: &[&[&[u8]]],
) -> Result<()> {
    invoke_signed(
        &Instruction {
            program_id: accounts.kamino_program.key(),
            accounts: vec![
                AccountMeta::new_readonly(accounts.campaign_owner.key(), true),
                AccountMeta::new(accounts.fee_payer.key(), true),
                AccountMeta::new(accounts.user_metadata.key(), false),
                AccountMeta::new_readonly(accounts.kamino_program.key(), false),
                AccountMeta::new_readonly(accounts.rent.key(), false),
                AccountMeta::new_readonly(accounts.system_program.key(), false),
            ],
            data: encode_init_user_metadata_data()?,
        },
        &[
            accounts.campaign_owner.clone(),
            accounts.fee_payer.clone(),
            accounts.user_metadata.clone(),
            accounts.kamino_program.clone(),
            accounts.rent.clone(),
            accounts.system_program.clone(),
        ],
        signer_seeds,
    )?;

    invoke_signed(
        &Instruction {
            program_id: accounts.kamino_program.key(),
            accounts: vec![
                AccountMeta::new_readonly(accounts.campaign_owner.key(), true),
                AccountMeta::new(accounts.fee_payer.key(), true),
                AccountMeta::new(accounts.obligation.key(), false),
                AccountMeta::new_readonly(accounts.lending_market.key(), false),
                AccountMeta::new_readonly(accounts.system_program.key(), false),
                AccountMeta::new_readonly(accounts.system_program.key(), false),
                AccountMeta::new_readonly(accounts.user_metadata.key(), false),
                AccountMeta::new_readonly(accounts.rent.key(), false),
                AccountMeta::new_readonly(accounts.system_program.key(), false),
            ],
            data: encode_init_obligation_data()?,
        },
        &[
            accounts.campaign_owner,
            accounts.fee_payer,
            accounts.obligation,
            accounts.lending_market,
            accounts.system_program.clone(),
            accounts.system_program.clone(),
            accounts.user_metadata,
            accounts.rent,
            accounts.system_program,
        ],
        signer_seeds,
    )?;

    Ok(())
}

pub fn deposit<'info>(
    accounts: DepositAccounts<'info>,
    liquidity_amount: u64,
    signer_seeds: &[&[&[u8]]],
) -> Result<()> {
    invoke_signed(
        &Instruction {
            program_id: accounts.kamino_program.key(),
            accounts: vec![
                AccountMeta::new(accounts.campaign_owner.key(), true),
                AccountMeta::new(accounts.obligation.key(), false),
                AccountMeta::new_readonly(accounts.lending_market.key(), false),
                AccountMeta::new_readonly(accounts.lending_market_authority.key(), false),
                AccountMeta::new(accounts.reserve.key(), false),
                AccountMeta::new_readonly(accounts.reserve_liquidity_mint.key(), false),
                AccountMeta::new(accounts.reserve_liquidity_supply.key(), false),
                AccountMeta::new(accounts.reserve_collateral_mint.key(), false),
                AccountMeta::new(accounts.reserve_destination_deposit_collateral.key(), false),
                AccountMeta::new(accounts.user_source_liquidity.key(), false),
                AccountMeta::new_readonly(accounts.kamino_program.key(), false),
                AccountMeta::new_readonly(accounts.collateral_token_program.key(), false),
                AccountMeta::new_readonly(accounts.liquidity_token_program.key(), false),
                AccountMeta::new_readonly(accounts.instruction_sysvar_account.key(), false),
            ],
            data: encode_liquidity_amount_data(
                DEPOSIT_RESERVE_LIQUIDITY_AND_OBLIGATION_COLLATERAL_DISCRIMINATOR,
                liquidity_amount,
            )?,
        },
        &[
            accounts.campaign_owner,
            accounts.obligation,
            accounts.lending_market,
            accounts.lending_market_authority,
            accounts.reserve,
            accounts.reserve_liquidity_mint,
            accounts.reserve_liquidity_supply,
            accounts.reserve_collateral_mint,
            accounts.reserve_destination_deposit_collateral,
            accounts.user_source_liquidity,
            accounts.kamino_program,
            accounts.collateral_token_program,
            accounts.liquidity_token_program,
            accounts.instruction_sysvar_account,
        ],
        signer_seeds,
    )?;

    Ok(())
}

pub fn withdraw<'info>(
    accounts: WithdrawAccounts<'info>,
    collateral_amount: u64,
    signer_seeds: &[&[&[u8]]],
) -> Result<()> {
    invoke_signed(
        &Instruction {
            program_id: accounts.kamino_program.key(),
            accounts: vec![
                AccountMeta::new(accounts.campaign_owner.key(), true),
                AccountMeta::new(accounts.obligation.key(), false),
                AccountMeta::new_readonly(accounts.lending_market.key(), false),
                AccountMeta::new_readonly(accounts.lending_market_authority.key(), false),
                AccountMeta::new(accounts.reserve.key(), false),
                AccountMeta::new_readonly(accounts.reserve_liquidity_mint.key(), false),
                AccountMeta::new(accounts.reserve_source_collateral.key(), false),
                AccountMeta::new(accounts.reserve_collateral_mint.key(), false),
                AccountMeta::new(accounts.reserve_liquidity_supply.key(), false),
                AccountMeta::new(accounts.user_destination_liquidity.key(), false),
                AccountMeta::new_readonly(accounts.kamino_program.key(), false),
                AccountMeta::new_readonly(accounts.collateral_token_program.key(), false),
                AccountMeta::new_readonly(accounts.liquidity_token_program.key(), false),
                AccountMeta::new_readonly(accounts.instruction_sysvar_account.key(), false),
            ],
            data: encode_collateral_amount_data(
                WITHDRAW_OBLIGATION_COLLATERAL_AND_REDEEM_RESERVE_COLLATERAL_DISCRIMINATOR,
                collateral_amount,
            )?,
        },
        &[
            accounts.campaign_owner,
            accounts.obligation,
            accounts.lending_market,
            accounts.lending_market_authority,
            accounts.reserve,
            accounts.reserve_liquidity_mint,
            accounts.reserve_source_collateral,
            accounts.reserve_collateral_mint,
            accounts.reserve_liquidity_supply,
            accounts.user_destination_liquidity,
            accounts.kamino_program,
            accounts.collateral_token_program,
            accounts.liquidity_token_program,
            accounts.instruction_sysvar_account,
        ],
        signer_seeds,
    )?;

    Ok(())
}

fn encode_init_user_metadata_data() -> Result<Vec<u8>> {
    let mut data = INIT_USER_METADATA_DISCRIMINATOR.to_vec();
    data.extend(
        InitUserMetadataArgs {
            user_lookup_table: Pubkey::default(),
        }
        .try_to_vec()?,
    );
    Ok(data)
}

fn encode_init_obligation_data() -> Result<Vec<u8>> {
    let mut data = INIT_OBLIGATION_DISCRIMINATOR.to_vec();
    data.extend(InitObligationArgs { tag: 0, id: 0 }.try_to_vec()?);
    Ok(data)
}

fn encode_liquidity_amount_data(discriminator: [u8; 8], liquidity_amount: u64) -> Result<Vec<u8>> {
    let mut data = discriminator.to_vec();
    data.extend(LiquidityAmountArgs { liquidity_amount }.try_to_vec()?);
    Ok(data)
}

fn encode_collateral_amount_data(
    discriminator: [u8; 8],
    collateral_amount: u64,
) -> Result<Vec<u8>> {
    let mut data = discriminator.to_vec();
    data.extend(
        CollateralAmountArgs { collateral_amount }.try_to_vec()?,
    );
    Ok(data)
}
