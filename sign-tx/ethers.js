
const { ethers } = require('ethers');
require('dotenv').config();

const { TEST_PRIVATE_KEY } = process.env;

const genericERC20ABI = require('./abi.json');

// console.log(genericERC20ABI)

const provider = ethers.getDefaultProvider()
const wallet = new ethers.Wallet(TEST_PRIVATE_KEY, provider);

const x1_contract_address = '0xaB92082279F72B9d61932aB3aEF28c284e6e35f2'
const my_address = wallet.address

const contract = new ethers.Contract(x1_contract_address, genericERC20ABI, wallet)
console.log(contract.balanceOf(my_address))



// const wallet = new ethers.Wallet(TEST_PRIVATE_KEY);

// console.log('Wallet address: ', wallet.address);

// const provider = ethers.getDefaultProvider('')

// provider.getBalance(wallet.address).then((balance) => {
//   console.log('Balance: ', balance.toString());
// })