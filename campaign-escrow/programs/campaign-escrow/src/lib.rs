use anchor_lang::prelude::*;
use anchor_spl::token::{self, Token, TokenAccount, Transfer};

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

    /// Release escrowed USDC when all deliverables are submitted.
    /// Checks → Effects (status) → Interactions (CPI transfer).
    pub fn complete_campaign(ctx: Context<CompleteCampaign>) -> Result<()> {
        // Checks
        let campaign = &ctx.accounts.campaign;
        require!(campaign.status == CampaignStatus::Active, EscrowError::CampaignNotActive);
        require!(campaign.deliverables_submitted >= campaign.deliverables_expected, EscrowError::DeliverablesIncomplete);

        // Read values before mutable borrow
        let budget = campaign.budget;
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
            budget,
        )?;

        msg!("Campaign {} completed. {} USDC released to platform.", campaign_id, budget);
        Ok(())
    }

    /// Refund client if no deliverables have been submitted yet.
    /// Checks → Effects (status) → Interactions (CPI transfer).
    pub fn cancel_campaign(ctx: Context<CancelCampaign>) -> Result<()> {
        // Checks
        let campaign = &ctx.accounts.campaign;
        require!(campaign.status == CampaignStatus::Active, EscrowError::CampaignNotActive);
        require!(campaign.deliverables_submitted == 0, EscrowError::CannotCancelWithDeliverables);

        // Read values before mutable borrow
        let budget = campaign.budget;
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
            budget,
        )?;

        msg!("Campaign {} cancelled. {} USDC refunded to client.", campaign_id, budget);
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
        constraint = vault.mint == USDC_MINT @ EscrowError::InvalidMint
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
pub struct CompleteCampaign<'info> {
    pub platform: Signer<'info>,

    #[account(
        mut,
        has_one = platform,
    )]
    pub campaign: Account<'info, Campaign>,

    #[account(
        mut,
        constraint = vault.mint == USDC_MINT @ EscrowError::InvalidMint
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
        constraint = vault.mint == USDC_MINT @ EscrowError::InvalidMint
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
        1;                           // bump
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
}
