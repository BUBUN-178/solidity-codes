const { default: Contract } = require("web3-eth-contract");

solc = require("solc");//solc is the compiler//it generates byter code and compiles smart contract
fs = require("fs");//its used to read files
Web3 = require("web3");
let web3 = new Web3(new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545"));
let file = fs.readFileSync("demo.sol").toString();
 console.log(file);
// eb3.eth.abi.encodeFunctionSignature(set); 
var input = {
    language: "Solidity",
    sources: {
      "demo.sol": {
        content: file,
      },
    },
  
    settings: {
      outputSelection: {
        "*": {
          "*": ["*"],
        },
      },
    }
};
var output =JSON.parse(solc.compile(JSON.stringify(input)));
console.log(output);
// ABI = output.contracts['demo.sol']['demo'].abi;
// bytecode = output.contracts['demo.sol']['demo'].evm.bytecode.object;
const bytecode = output.contracts['demo.sol']['demo'].evm.bytecode.object;
const abi = output.contracts['demo.sol']['demo'].abi;
console.log("abi:",abi);
console.log("bytecode:",bytecode);

//deployment of contract
contract = new web3.eth.Contract(abi);
let defaultAccount;
web3.eth.getAccounts().then((accounts)=>{
    console.log("Accounts:",accounts);
    defaultAccount =accounts[0];
    console.log("default",defaultAccount);
    contract.deploy({data:bytecode}.send({from:defaultAccount,gas:50000}))
     .on("recipt",(recipt)=>{
        console.log()
     })
});
