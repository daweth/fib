const anchor = require("@project-serum/anchor");
const { Program } = require("@project-serum/anchor");
const {SystemProgram} = anchor.web3;

const provider = anchor.Provider.local();

const average = arr => arr.reduce((a,b) => a + b, 0) / arr.length;

const generateFib = async (program, account, iter = 500) => {
	let txReceived; // time since last call
	let avgTxnTime; // average transaction time
	let txnTimes = []; // all transaction times

	for(let i=0; i<iter; i++){
		console.log('starting call #',i)
		const b  = Date.now();
		try{
		const tx = await program.rpc.generate({
      accounts: {
        myAccount: account.publicKey,
      },
  	})
		}catch(e){
			console.error(e)
		}
		const a = Date.now();
		txReceived=a-b;
		txnTimes[i] = txReceived;
	}
	
	console.log("process finished.");
	return(average(txnTimes))
}

async function main() {
	const idl = JSON.parse(
		require("fs").readFileSync("./target/idl/fib.json", "utf8")
	);
	
	// create a new instance with this public key
	const programId = new anchor.web3.PublicKey("5vwA2TGjfE8B5d5BT7ZopekNVxgNnNvtuKzS9QeZk8Us");
	const program = new anchor.Program(idl, programId);

	// create a new account for the state
	const myAccount = anchor.web3.Keypair.generate();
//	console.log(myAccount)

	// initialize the program
	await program.rpc.initialize({
		accounts: {
			myAccount: myAccount.publicKey,
			user: provider.wallet.publicKey,
			systemProgram: SystemProgram.programId,
		},
		signers: [myAccount],
	});

	const avgTimes = await generateFib(program, myAccount, 100);
	console.log("Average time between calls in ms: ",avgTimes);
	const account = await program.account.myAccount.fetch(myAccount.publicKey);
	console.log("The generated sequence in the account is: ", account.data.toString(10));

}

console.log("Running client.");
main().then(() => console.log("Success"));
