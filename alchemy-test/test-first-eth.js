const axios = require('axios');

// copy-paste your URL provided in your Alchemy.com dashboard
const ALCHEMY_URL = "https://eth-sepolia.g.alchemy.com/v2/0OzNvDi9Y6XplnLiLxEGYGWqnvACSz_e";

axios.post(ALCHEMY_URL, {
  jsonrpc: "2.0",
  id: 1,
  method: "eth_getBalance",
  params: [
    // "0xb443", // block 46147
    // true  // retrieve the full transaction object in transactions array
    '0xe5cB067E90D5Cd1F8052B83562Ae670bA4A211a8',
    'latest'
  ]
}).then((response) => {
  console.log(parseInt(response.data.result, 16));
});

const addresses = ['add1', 'add2', 'add3']

const batch = [
    addresses.map((address, index) => ({
        jsonrpc: "2.0",
        id: index,
        method: "eth_getBalance",
        params: [
            address,
            'latest'
        ]
    }))
];
