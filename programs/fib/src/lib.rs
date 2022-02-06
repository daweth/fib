use anchor_lang::prelude::*;

declare_id!("5vwA2TGjfE8B5d5BT7ZopekNVxgNnNvtuKzS9QeZk8Us");

#[program]
mod fib {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> ProgramResult {
        let my_account = &mut ctx.accounts.my_account;
        let mut seq = Vec::new();
        seq.push(1);
        seq.push(1);
        my_account.data = seq;
        Ok(())
    }
    
    pub fn generate(ctx: Context<Generate>) -> ProgramResult {
        let storage = &mut ctx.accounts.my_account;
        let seq = &storage.data;
        let curr = seq[seq.len().wrapping_sub(1)];
        let last = seq[seq.len().wrapping_sub(2)];
        let sum = last + curr;
        storage.data.push(sum);
        Ok(())
    }

}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(init, payer = user, space = 8000 + 64)]
    pub my_account: Account<'info, MyAccount>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct Generate<'info> {
    #[account(mut)]
    pub my_account : Account<'info, MyAccount>,
}

#[account]
pub struct MyAccount {
    pub data: Vec<u64>,
}


