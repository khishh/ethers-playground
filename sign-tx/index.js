const { Alchemy, Network, Wallet, Utils } = require('alchemy-sdk');
require('dotenv').config();

const { TEST_API_KEY, TEST_PRIVATE_KEY } = process.env;

const settings = {
  apiKey: TEST_API_KEY,
  network: Network.ETH_SEPOLIA,
};
const alchemy = new Alchemy(settings);

let wallet = new Wallet(TEST_PRIVATE_KEY);

async function main() {
  const nonce = await alchemy.core.getTransactionCount(
    wallet.address,
    'latest'
  );

  alchemy.core.getBalance(wallet.address, 'latest').then((balance) => {
    console.log('Balance: ', parseInt(balance));
  });

  let transaction = {
    to: '0xab5801a7d398351b8be11c439e05c5b3259aec9b', //choose any address!,
    value: Utils.parseEther('0.001'), // 0.001 worth of ETH being sent
    gasLimit: '21000',
    maxPriorityFeePerGas: Utils.parseUnits('5', 'gwei'),
    maxFeePerGas: Utils.parseUnits('20', 'gwei'),
    nonce: nonce,
    type: 2,
    chainId: 11155111, // ETH_SEPOLIA transaction
  };

  let rawTransaction = await wallet.signTransaction(transaction);
  
  console.log('Raw tx: ', rawTransaction);
  let tx = await alchemy.core.sendTransaction(rawTransaction);
  console.log(`https://sepolia.etherscan.io/txs/${tx.hash}`);
}

/// my first transactions: https://sepolia.etherscan.io/tx/0x8ca3f75b1878d2f99689ce60c43e5e991209143efc2c6f42eb70274d18e2bc0e

main();