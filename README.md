# fib
- Using Anchor, implement a contract that can sequentially generate and store fibonacci numbers.
- Make a client that can read those numbers.
- Quantify how many numbers your client can read + generate per second

## prerequisites
- Node
- Yarn
- Solana 
- Solana Wallet Generated
- Anchor

## how to run
1. run `yarn` to install dependencies
2. run `solana-test-validator` in a separate terminal
3. run `anchor deploy` and copy the address
4. paste the address in `./config.js` for `programId`
5. finally, run `ANCHOR_WALLET=<YOUR_KEYPAIR_PATH> node client.js`

## theoretical speed
The number of new fibonacci numbers you can make per second is limited only by the number of transactions you can send to solana (65000tps)

## actual speed (single threaded)
1. Reads Per Second
	Since the whole account can be retrieved at once, the Reads Per Second is limited only to the account size. 
2. Generations Per Second
	When running the client 100x, the client averaged a speed of 500ms per sequence generation on the local network, meaning 2 per second.  

