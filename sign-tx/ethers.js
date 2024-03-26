
const { ethers } = require('ethers');
require('dotenv').config();

const { TEST_PRIVATE_KEY } = process.env;

const genericERC20ABI = require('./abi.json');

// basically provider is the node that you are connecting to. In my case, I want to connect to x1 testnet. So
const X1_TESTNET_PROVIDER1 = "https://x1testrpc.okx.com/"
const provider = new ethers.providers.JsonRpcProvider(X1_TESTNET_PROVIDER1);

// wallet is the account that you are using to sign the transactions
const wallet = new ethers.Wallet(TEST_PRIVATE_KEY, provider);

// contract address of x1 WETH
const x1_contract_address = '0xbec7859bc3d0603bec454f7194173e36bf2aa5c8'
const my_address = wallet.address

// contract is the instance of the contract that you are interacting with
// If you want to call transactions on the contract, you need to provide contract address, ABI, and signer.
// With provider, you cannot make transaction as it cannot sign the transaction
const contract = new ethers.Contract(x1_contract_address, genericERC20ABI, wallet)

contract.balanceOf(my_address).then((balance) => {
    console.log('Balance: ', parseInt(balance));
}) 

contract.transfer('0xfc976D96ccc57bC9D04AeA92A4a66Abd71926298', ethers.utils.parseEther('0.01')).then((tx) => {
    console.log('Transaction: ', tx);
});