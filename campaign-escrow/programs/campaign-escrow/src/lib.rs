use anchor_lang::prelude::*;
use anchor_spl::token::{self, Token, TokenAccount, Transfer};

mod kamino;

declare_id!("5Ljn3VEwSQ1PBbsEMuQ6jZr9uWPBpRJ8FLNbqUaSDq7Z");

const MAX_DELIVERABLES: usize = 10;
const MAX_CAMPAIGN_ID: usize = 64;

/// USDC mint on Solana devnet
const USDC_MINT: Pubkey = pubkey!("4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU");

#[program]
pub mod campaign_escrow {
    use super::*;

    /// Client deposits USDC into a PDA escrow for a marketing campaign.
    pub fn initialize_campaign(
        ctx: Context<InitializeCampaign>,
        campaign_id: String,
        budget_usdc: u64,
        deliverables_expected: u8,
    ) -> Result<()> {
        require!(deliverables_expected > 0 && deliverables_expected <= MAX_DELIVERABLES as u8, EscrowError::InvalidDeliverableCount);
        require!(budget_usdc > 0, EscrowError::InvalidBudget);
        require!(campaign_id.len() <= MAX_CAMPAIGN_ID, EscrowError::CampaignIdTooLong);

        let campaign = &mut ctx.accounts.campaign;
        campaign.authority = ctx.accounts.authority.key();
        campaign.platform = ctx.accounts.platform.key();
        campaign.campaign_id = campaign_id;
        campaign.budget = budget_usdc;
        campaign.deliverables_expected = deliverables_expected;
        campaign.deliverables_submitted = 0;
        campaign.status = CampaignStatus::Active;
        campaign.bump = ctx.bumps.campaign;
        campaign.kamino_program = Pubkey::default();
        campaign.kamino_lending_market = Pubkey::default();
        campaign.kamino_reserve = Pubkey::default();
        campaign.kamino_user_metadata = Pubkey::default();
        campaign.kamino_obligation = Pubkey::default();

        // Transfer USDC from client to escrow vault
        token::transfer(
            CpiContext::new(
                ctx.accounts.token_program.to_account_info(),
                Transfer {
                    from: ctx.accounts.client_token_account.to_account_info(),
                    to: ctx.accounts.vault.to_account_info(),
                    authority: ctx.accounts.authority.to_account_info(),
                },
            ),
            budget_usdc,
        )?;

        msg!("Campaign {} initialized: {} USDC, {} deliverables",
            campaign.campaign_id, budget_usdc, deliverables_expected);
        Ok(())
    }

    /// Gateway submits a deliverable hash after an agent completes work.
    pub fn submit_deliverable(
        ctx: Context<SubmitDeliverable>,
        deliverable_hash: [u8; 32],
        agent_id: String,
    ) -> Result<()> {
        let campaign = &mut ctx.accounts.campaign;
        require!(campaign.status == CampaignStatus::Active, EscrowError::CampaignNotActive);
        require!(campaign.deliverables_submitted < campaign.deliverables_expected, EscrowError::AllDeliverablesSubmitted);
        require!(agent_id.len() <= MAX_CAMPAIGN_ID, EscrowError::AgentIdTooLong);

        campaign.deliverables_submitted += 1;

        msg!("Deliverable {}/{} submitted for campaign {} by agent {}",
            campaign.deliverables_submitted, campaign.deliverables_expected,
            campaign.campaign_id, agent_id);

        emit!(DeliverableSubmitted {
            campaign_id: campaign.campaign_id.clone(),
            deliverable_hash,
            agent_id,
            index: campaign.deliverables_submitted,
        });

        Ok(())
    }

    /// Initializes the campaign PDA as a Kamino position owner.
    pub fn initialize_kamino_position(ctx: Context<InitializeKaminoPosition>) -> Result<()> {
        let campaign_key = ctx.accounts.campaign.key();
        let authority = ctx.accounts.campaign.authority;
        let campaign_id = ctx.accounts.campaign.campaign_id.clone();
        let bump = ctx.accounts.campaign.bump;
        require!(
            ctx.accounts.campaign.kamino_program == Pubkey::default(),
            EscrowError::KaminoAlreadyInitialized
        );

        let kamino_program = ctx.accounts.kamino_program.key();
        let kamino_lending_market = ctx.accounts.kamino_lending_market.key();
        let (expected_user_metadata, _) =
            kamino::derive_user_metadata_pda(&campaign_key, &kamino_program);
        let (expected_obligation, _) = kamino::derive_vanilla_obligation_pda(
            &campaign_key,
            &kamino_lending_market,
            &kamino_program,
        );

        require_keys_eq!(
            ctx.accounts.kamino_user_metadata.key(),
            expected_user_metadata,
            EscrowError::InvalidKaminoPda
        );
        require_keys_eq!(
            ctx.accounts.kamino_obligation.key(),
            expected_obligation,
            EscrowError::InvalidKaminoPda
        );

        let signer_seeds = &[
            b"campaign".as_ref(),
            authority.as_ref(),
            campaign_id.as_bytes(),
            &[bump],
        ];

        kamino::init_position(
            kamino::InitPositionAccounts {
                campaign_owner: ctx.accounts.campaign.to_account_info(),
                fee_payer: ctx.accounts.platform.to_account_info(),
                kamino_program: ctx.accounts.kamino_program.to_account_info(),
                lending_market: ctx.accounts.kamino_lending_market.to_account_info(),
                user_metadata: ctx.accounts.kamino_user_metadata.to_account_info(),
                obligation: ctx.accounts.kamino_obligation.to_account_info(),
                rent: ctx.accounts.rent.to_account_info(),
                system_program: ctx.accounts.system_program.to_account_info(),
            },
            &[&signer_seeds[..]],
        )?;

        let campaign = &mut ctx.accounts.campaign;
        campaign.kamino_program = kamino_program;
        campaign.kamino_lending_market = kamino_lending_market;
        campaign.kamino_reserve = ctx.accounts.kamino_reserve.key();
        campaign.kamino_user_metadata = ctx.accounts.kamino_user_metadata.key();
        campaign.kamino_obligation = ctx.accounts.kamino_obligation.key();

        emit!(KaminoPositionInitialized {
            campaign: campaign_key,
            kamino_program,
            lending_market: kamino_lending_market,
            reserve: campaign.kamino_reserve,
            user_metadata: campaign.kamino_user_metadata,
            obligation: campaign.kamino_obligation,
        });

        Ok(())
    }

    /// Parks idle USDC from the PDA vault in Kamino.
    pub fn park_in_kamino(ctx: Context<ParkInKamino>, liquidity_amount: u64) -> Result<()> {
        require!(liquidity_amount > 0, EscrowError::InvalidBudget);

        let campaign = &ctx.accounts.campaign;
        require!(
            campaign.status == CampaignStatus::Active,
            EscrowError::CampaignNotActive
        );

        let (expected_lending_market_authority, _) = kamino::derive_lending_market_authority_pda(
            &campaign.kamino_lending_market,
            &campaign.kamino_program,
        );
        require_keys_eq!(
            ctx.accounts.kamino_lending_market_authority.key(),
            expected_lending_market_authority,
            EscrowError::InvalidKaminoPda
        );

        let authority = campaign.authority;
        let campaign_id = campaign.campaign_id.clone();
        let bump = campaign.bump;
        let signer_seeds = &[
            b"campaign".as_ref(),
            authority.as_ref(),
            campaign_id.as_bytes(),
            &[bump],
        ];

        kamino::deposit(
            kamino::DepositAccounts {
                campaign_owner: ctx.accounts.campaign.to_account_info(),
                kamino_program: ctx.accounts.kamino_program.to_account_info(),
                obligation: ctx.accounts.kamino_obligation.to_account_info(),
                lending_market: ctx.accounts.kamino_lending_market.to_account_info(),
                lending_market_authority: ctx
                    .accounts
                    .kamino_lending_market_authority
                    .to_account_info(),
                reserve: ctx.accounts.kamino_reserve.to_account_info(),
                reserve_liquidity_mint: ctx.accounts.reserve_liquidity_mint.to_account_info(),
                reserve_liquidity_supply: ctx.accounts.reserve_liquidity_supply.to_account_info(),
                reserve_collateral_mint: ctx.accounts.reserve_collateral_mint.to_account_info(),
                reserve_destination_deposit_collateral: ctx
                    .accounts
                    .reserve_destination_deposit_collateral
                    .to_account_info(),
                user_source_liquidity: ctx.accounts.vault.to_account_info(),
                collateral_token_program: ctx.accounts.collateral_token_program.to_account_info(),
                liquidity_token_program: ctx.accounts.liquidity_token_program.to_account_info(),
                instruction_sysvar_account: ctx.accounts.instruction_sysvar_account.to_account_info(),
            },
            liquidity_amount,
            &[&signer_seeds[..]],
        )?;

        emit!(KaminoDeposited {
            campaign: campaign.key(),
            reserve: campaign.kamino_reserve,
            liquidity_amount,
        });

        Ok(())
    }

    /// Withdraws USDC from Kamino back into the PDA vault.
    pub fn withdraw_from_kamino(
        ctx: Context<WithdrawFromKamino>,
        collateral_amount: u64,
    ) -> Result<()> {
        require!(collateral_amount > 0, EscrowError::InvalidKaminoCollateralAmount);

        let campaign = &ctx.accounts.campaign;
        let (expected_lending_market_authority, _) = kamino::derive_lending_market_authority_pda(
            &campaign.kamino_lending_market,
            &campaign.kamino_program,
        );
        require_keys_eq!(
            ctx.accounts.kamino_lending_market_authority.key(),
            expected_lending_market_authority,
            EscrowError::InvalidKaminoPda
        );

        let authority = campaign.authority;
        let campaign_id = campaign.campaign_id.clone();
        let bump = campaign.bump;
        let signer_seeds = &[
            b"campaign".as_ref(),
            authority.as_ref(),
            campaign_id.as_bytes(),
            &[bump],
        ];

        kamino::withdraw(
            kamino::WithdrawAccounts {
                campaign_owner: ctx.accounts.campaign.to_account_info(),
                kamino_program: ctx.accounts.kamino_program.to_account_info(),
                obligation: ctx.accounts.kamino_obligation.to_account_info(),
                lending_market: ctx.accounts.kamino_lending_market.to_account_info(),
                lending_market_authority: ctx
                    .accounts
                    .kamino_lending_market_authority
                    .to_account_info(),
                reserve: ctx.accounts.kamino_reserve.to_account_info(),
                reserve_liquidity_mint: ctx.accounts.reserve_liquidity_mint.to_account_info(),
                reserve_source_collateral: ctx.accounts.reserve_source_collateral.to_account_info(),
                reserve_collateral_mint: ctx.accounts.reserve_collateral_mint.to_account_info(),
                reserve_liquidity_supply: ctx.accounts.reserve_liquidity_supply.to_account_info(),
                user_destination_liquidity: ctx.accounts.vault.to_account_info(),
                collateral_token_program: ctx.accounts.collateral_token_program.to_account_info(),
                liquidity_token_program: ctx.accounts.liquidity_token_program.to_account_info(),
                instruction_sysvar_account: ctx.accounts.instruction_sysvar_account.to_account_info(),
            },
            collateral_amount,
            &[&signer_seeds[..]],
        )?;

        emit!(KaminoWithdrawn {
            campaign: campaign.key(),
            reserve: campaign.kamino_reserve,
            collateral_amount,
        });

        Ok(())
    }

    /// Release escrowed USDC when all deliverables are submitted.
    /// Checks → Effects (status) → Interactions (CPI transfer).
    pub fn complete_campaign(ctx: Context<CompleteCampaign>) -> Result<()> {
        // Checks
        let campaign = &ctx.accounts.campaign;
        require!(campaign.status == CampaignStatus::Active, EscrowError::CampaignNotActive);
        require!(campaign.deliverables_submitted >= campaign.deliverables_expected, EscrowError::DeliverablesIncomplete);
        require!(ctx.accounts.vault.amount >= campaign.budget, EscrowError::VaultBalanceMismatch);

        // Read values before mutable borrow
        let payout_amount = ctx.accounts.vault.amount;
        let authority = campaign.authority;
        let campaign_id = campaign.campaign_id.clone();
        let bump = campaign.bump;

        // Effects — update status
        ctx.accounts.campaign.status = CampaignStatus::Completed;

        // Interactions — CPI transfer USDC from vault to platform
        let seeds = &[
            b"campaign".as_ref(),
            authority.as_ref(),
            campaign_id.as_bytes(),
            &[bump],
        ];
        let signer_seeds = &[&seeds[..]];

        token::transfer(
            CpiContext::new_with_signer(
                ctx.accounts.token_program.to_account_info(),
                Transfer {
                    from: ctx.accounts.vault.to_account_info(),
                    to: ctx.accounts.platform_token_account.to_account_info(),
                    authority: ctx.accounts.campaign.to_account_info(),
                },
                signer_seeds,
            ),
            payout_amount,
        )?;

        msg!("Campaign {} completed. {} USDC released to platform.", campaign_id, payout_amount);
        Ok(())
    }

    /// Refund client if no deliverables have been submitted yet.
    /// Checks → Effects (status) → Interactions (CPI transfer).
    pub fn cancel_campaign(ctx: Context<CancelCampaign>) -> Result<()> {
        // Checks
        let campaign = &ctx.accounts.campaign;
        require!(campaign.status == CampaignStatus::Active, EscrowError::CampaignNotActive);
        require!(campaign.deliverables_submitted == 0, EscrowError::CannotCancelWithDeliverables);
        require!(ctx.accounts.vault.amount >= campaign.budget, EscrowError::VaultBalanceMismatch);

        // Read values before mutable borrow
        let refund_amount = ctx.accounts.vault.amount;
        let authority = campaign.authority;
        let campaign_id = campaign.campaign_id.clone();
        let bump = campaign.bump;

        // Effects — update status
        ctx.accounts.campaign.status = CampaignStatus::Cancelled;

        // Interactions — CPI transfer USDC back to client
        let seeds = &[
            b"campaign".as_ref(),
            authority.as_ref(),
            campaign_id.as_bytes(),
            &[bump],
        ];
        let signer_seeds = &[&seeds[..]];

        token::transfer(
            CpiContext::new_with_signer(
                ctx.accounts.token_program.to_account_info(),
                Transfer {
                    from: ctx.accounts.vault.to_account_info(),
                    to: ctx.accounts.client_token_account.to_account_info(),
                    authority: ctx.accounts.campaign.to_account_info(),
                },
                signer_seeds,
            ),
            refund_amount,
        )?;

        msg!("Campaign {} cancelled. {} USDC refunded to client.", campaign_id, refund_amount);
        Ok(())
    }
}

// === Accounts ===

#[derive(Accounts)]
#[instruction(campaign_id: String)]
pub struct InitializeCampaign<'info> {
    #[account(mut)]
    pub authority: Signer<'info>,

    /// CHECK: Platform wallet that receives funds on completion
    pub platform: UncheckedAccount<'info>,

    #[account(
        init,
        payer = authority,
        space = Campaign::SPACE,
        seeds = [b"campaign", authority.key().as_ref(), campaign_id.as_bytes()],
        bump
    )]
    pub campaign: Account<'info, Campaign>,

    #[account(
        mut,
        constraint = client_token_account.mint == USDC_MINT @ EscrowError::InvalidMint
    )]
    pub client_token_account: Account<'info, TokenAccount>,

    #[account(
        mut,
        constraint = vault.mint == USDC_MINT @ EscrowError::InvalidMint,
        constraint = vault.owner == campaign.key() @ EscrowError::InvalidVaultAuthority
    )]
    pub vault: Account<'info, TokenAccount>,

    pub token_program: Program<'info, Token>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct SubmitDeliverable<'info> {
    /// Platform authority (gateway) that can submit deliverables
    pub platform: Signer<'info>,

    #[account(
        mut,
        has_one = platform,
    )]
    pub campaign: Account<'info, Campaign>,
}

#[derive(Accounts)]
pub struct InitializeKaminoPosition<'info> {
    pub platform: Signer<'info>,

    #[account(
        mut,
        has_one = platform,
    )]
    pub campaign: Account<'info, Campaign>,

    /// CHECK: PDA verified against Kamino seeds before CPI
    #[account(mut)]
    pub kamino_user_metadata: UncheckedAccount<'info>,

    /// CHECK: PDA verified against Kamino seeds before CPI
    #[account(mut)]
    pub kamino_obligation: UncheckedAccount<'info>,

    /// CHECK: External Kamino lending program
    pub kamino_program: UncheckedAccount<'info>,

    /// CHECK: External Kamino lending market
    pub kamino_lending_market: UncheckedAccount<'info>,

    /// CHECK: External Kamino reserve, stored on the campaign after init
    pub kamino_reserve: UncheckedAccount<'info>,

    pub rent: Sysvar<'info, Rent>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct ParkInKamino<'info> {
    pub platform: Signer<'info>,

    #[account(
        mut,
        has_one = platform,
        constraint = kamino_program.key() == campaign.kamino_program @ EscrowError::KaminoNotInitialized,
        constraint = kamino_lending_market.key() == campaign.kamino_lending_market @ EscrowError::InvalidKaminoAccount,
        constraint = kamino_reserve.key() == campaign.kamino_reserve @ EscrowError::InvalidKaminoAccount,
        constraint = kamino_obligation.key() == campaign.kamino_obligation @ EscrowError::InvalidKaminoAccount,
    )]
    pub campaign: Account<'info, Campaign>,

    #[account(
        mut,
        constraint = vault.mint == USDC_MINT @ EscrowError::InvalidMint,
        constraint = vault.owner == campaign.key() @ EscrowError::InvalidVaultAuthority,
    )]
    pub vault: Account<'info, TokenAccount>,

    /// CHECK: External Kamino program
    pub kamino_program: UncheckedAccount<'info>,
    /// CHECK: External Kamino market
    pub kamino_lending_market: UncheckedAccount<'info>,
    /// CHECK: Derived PDA checked in handler
    pub kamino_lending_market_authority: UncheckedAccount<'info>,
    /// CHECK: External Kamino reserve
    #[account(mut)]
    pub kamino_reserve: UncheckedAccount<'info>,
    /// CHECK: External Kamino obligation PDA
    #[account(mut)]
    pub kamino_obligation: UncheckedAccount<'info>,
    /// CHECK: Validated by Kamino CPI
    pub reserve_liquidity_mint: UncheckedAccount<'info>,
    /// CHECK: Validated by Kamino CPI
    #[account(mut)]
    pub reserve_liquidity_supply: UncheckedAccount<'info>,
    /// CHECK: Validated by Kamino CPI
    #[account(mut)]
    pub reserve_collateral_mint: UncheckedAccount<'info>,
    /// CHECK: Validated by Kamino CPI
    #[account(mut)]
    pub reserve_destination_deposit_collateral: UncheckedAccount<'info>,
    /// CHECK: Validated by Kamino CPI
    pub collateral_token_program: UncheckedAccount<'info>,
    /// CHECK: Validated by Kamino CPI
    pub liquidity_token_program: UncheckedAccount<'info>,
    /// CHECK: Fixed sysvar address used by Kamino refresh checks
    #[account(address = anchor_lang::solana_program::sysvar::instructions::ID)]
    pub instruction_sysvar_account: UncheckedAccount<'info>,
}

#[derive(Accounts)]
pub struct WithdrawFromKamino<'info> {
    pub platform: Signer<'info>,

    #[account(
        mut,
        has_one = platform,
        constraint = kamino_program.key() == campaign.kamino_program @ EscrowError::KaminoNotInitialized,
        constraint = kamino_lending_market.key() == campaign.kamino_lending_market @ EscrowError::InvalidKaminoAccount,
        constraint = kamino_reserve.key() == campaign.kamino_reserve @ EscrowError::InvalidKaminoAccount,
        constraint = kamino_obligation.key() == campaign.kamino_obligation @ EscrowError::InvalidKaminoAccount,
    )]
    pub campaign: Account<'info, Campaign>,

    #[account(
        mut,
        constraint = vault.mint == USDC_MINT @ EscrowError::InvalidMint,
        constraint = vault.owner == campaign.key() @ EscrowError::InvalidVaultAuthority,
    )]
    pub vault: Account<'info, TokenAccount>,

    /// CHECK: External Kamino program
    pub kamino_program: UncheckedAccount<'info>,
    /// CHECK: External Kamino market
    pub kamino_lending_market: UncheckedAccount<'info>,
    /// CHECK: Derived PDA checked in handler
    pub kamino_lending_market_authority: UncheckedAccount<'info>,
    /// CHECK: External Kamino reserve
    #[account(mut)]
    pub kamino_reserve: UncheckedAccount<'info>,
    /// CHECK: External Kamino obligation PDA
    #[account(mut)]
    pub kamino_obligation: UncheckedAccount<'info>,
    /// CHECK: Validated by Kamino CPI
    pub reserve_liquidity_mint: UncheckedAccount<'info>,
    /// CHECK: Validated by Kamino CPI
    #[account(mut)]
    pub reserve_source_collateral: UncheckedAccount<'info>,
    /// CHECK: Validated by Kamino CPI
    #[account(mut)]
    pub reserve_collateral_mint: UncheckedAccount<'info>,
    /// CHECK: Validated by Kamino CPI
    #[account(mut)]
    pub reserve_liquidity_supply: UncheckedAccount<'info>,
    /// CHECK: Validated by Kamino CPI
    pub collateral_token_program: UncheckedAccount<'info>,
    /// CHECK: Validated by Kamino CPI
    pub liquidity_token_program: UncheckedAccount<'info>,
    /// CHECK: Fixed sysvar address used by Kamino refresh checks
    #[account(address = anchor_lang::solana_program::sysvar::instructions::ID)]
    pub instruction_sysvar_account: UncheckedAccount<'info>,
}

#[derive(Accounts)]
pub struct CompleteCampaign<'info> {
    pub platform: Signer<'info>,

    #[account(
        mut,
        has_one = platform,
    )]
    pub campaign: Account<'info, Campaign>,

    #[account(
        mut,
        constraint = vault.mint == USDC_MINT @ EscrowError::InvalidMint,
        constraint = vault.owner == campaign.key() @ EscrowError::InvalidVaultAuthority
    )]
    pub vault: Account<'info, TokenAccount>,

    #[account(
        mut,
        constraint = platform_token_account.mint == USDC_MINT @ EscrowError::InvalidMint
    )]
    pub platform_token_account: Account<'info, TokenAccount>,

    pub token_program: Program<'info, Token>,
}

#[derive(Accounts)]
pub struct CancelCampaign<'info> {
    #[account(
        constraint = authority.key() == campaign.authority @ EscrowError::Unauthorized
    )]
    pub authority: Signer<'info>,

    #[account(mut)]
    pub campaign: Account<'info, Campaign>,

    #[account(
        mut,
        constraint = vault.mint == USDC_MINT @ EscrowError::InvalidMint,
        constraint = vault.owner == campaign.key() @ EscrowError::InvalidVaultAuthority
    )]
    pub vault: Account<'info, TokenAccount>,

    #[account(
        mut,
        constraint = client_token_account.mint == USDC_MINT @ EscrowError::InvalidMint
    )]
    pub client_token_account: Account<'info, TokenAccount>,

    pub token_program: Program<'info, Token>,
}

// === State ===

#[account]
pub struct Campaign {
    pub authority: Pubkey,
    pub platform: Pubkey,
    pub campaign_id: String,
    pub budget: u64,
    pub deliverables_expected: u8,
    pub deliverables_submitted: u8,
    pub status: CampaignStatus,
    pub bump: u8,
    pub kamino_program: Pubkey,
    pub kamino_lending_market: Pubkey,
    pub kamino_reserve: Pubkey,
    pub kamino_user_metadata: Pubkey,
    pub kamino_obligation: Pubkey,
}

impl Campaign {
    /// Fixed allocation using max campaign_id length (64 chars) to prevent under-allocation
    const SPACE: usize =
        8 +                          // discriminator
        32 +                         // authority
        32 +                         // platform
        4 + MAX_CAMPAIGN_ID +        // campaign_id (string, max 64)
        8 +                          // budget
        1 +                          // deliverables_expected
        1 +                          // deliverables_submitted
        1 +                          // status
        1 +                          // bump
        32 +                         // kamino_program
        32 +                         // kamino_lending_market
        32 +                         // kamino_reserve
        32 +                         // kamino_user_metadata
        32;                          // kamino_obligation
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone, PartialEq, Eq)]
pub enum CampaignStatus {
    Active,
    Completed,
    Cancelled,
}

// === Events ===

#[event]
pub struct DeliverableSubmitted {
    pub campaign_id: String,
    pub deliverable_hash: [u8; 32],
    pub agent_id: String,
    pub index: u8,
}

#[event]
pub struct KaminoPositionInitialized {
    pub campaign: Pubkey,
    pub kamino_program: Pubkey,
    pub lending_market: Pubkey,
    pub reserve: Pubkey,
    pub user_metadata: Pubkey,
    pub obligation: Pubkey,
}

#[event]
pub struct KaminoDeposited {
    pub campaign: Pubkey,
    pub reserve: Pubkey,
    pub liquidity_amount: u64,
}

#[event]
pub struct KaminoWithdrawn {
    pub campaign: Pubkey,
    pub reserve: Pubkey,
    pub collateral_amount: u64,
}

// === Errors ===

#[error_code]
pub enum EscrowError {
    #[msg("Invalid deliverable count: must be 1-10")]
    InvalidDeliverableCount,
    #[msg("Invalid budget: must be greater than 0")]
    InvalidBudget,
    #[msg("Campaign ID too long: max 64 characters")]
    CampaignIdTooLong,
    #[msg("Agent ID too long: max 64 characters")]
    AgentIdTooLong,
    #[msg("Campaign is not active")]
    CampaignNotActive,
    #[msg("All deliverables already submitted")]
    AllDeliverablesSubmitted,
    #[msg("Not all deliverables have been submitted")]
    DeliverablesIncomplete,
    #[msg("Cannot cancel campaign with submitted deliverables")]
    CannotCancelWithDeliverables,
    #[msg("Unauthorized")]
    Unauthorized,
    #[msg("Invalid token mint: must be USDC")]
    InvalidMint,
    #[msg("Vault authority must be the campaign PDA")]
    InvalidVaultAuthority,
    #[msg("Vault balance is lower than the campaign budget")]
    VaultBalanceMismatch,
    #[msg("Kamino position already initialized for this campaign")]
    KaminoAlreadyInitialized,
    #[msg("Kamino position is not initialized for this campaign")]
    KaminoNotInitialized,
    #[msg("Invalid Kamino PDA for this campaign")]
    InvalidKaminoPda,
    #[msg("Invalid Kamino account for this campaign")]
    InvalidKaminoAccount,
    #[msg("Collateral amount must be greater than 0")]
    InvalidKaminoCollateralAmount,
}
