import * as anchor from '@project-serum/anchor';
import { Program } from '@project-serum/anchor';
import { Fib } from '../target/types/fib';

describe('fib', () => {

  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.Provider.env());

  const program = anchor.workspace.Fib as Program<Fib>;

  it('Is initialized!', async () => {
    // Add your test here.
      // #region code-simplified
    // The program to execute.

    // The Account to create.
    const myAccount = anchor.web3.Keypair.generate();

    // Create the new account and initialize it with the program.
    // #region code-simplified
    const tx = await program.rpc.initialize({
      accounts: {
        myAccount: myAccount.publicKey,
        user: provider.wallet.publicKey,
        systemProgram: SystemProgram.programId,
      },
      signers: [myAccount],
    });
    console.log("Your transaction signature", tx);
    // #endregion code-simplified

    // Fetch the newly created account from the cluster.
    const account = await program.account.myAccount.fetch(myAccount.publicKey);
   
    const data = account.data;
    console.log("the account data is: ", data)
    // verify that it matches up with the real sequence
  //  data.forEach((value, index) => {
  //    assert.ok(account.data.eq(new anchor.BN(fib(index))));
 //   })
    _myAccount = myAccount;
    
  });

});
