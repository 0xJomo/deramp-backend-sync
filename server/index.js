const ethers = require("ethers");
const { BigNumber } = require('bignumber.js');
const derampAbi = require('./abi.js');
const { createSellOrderController } = require('./firestore')



// Replace 'YourContractAbi' and 'YourContractAddress' with your actual contract ABI and address
const contractAbi = derampAbi; // Your contract ABI
const contractAddress = '0x8AA103410431D508bd64a74BcDcC1369473Ad377'; // Local Address

// Connect to a provider (Ethereum node)
const provider = new ethers.providers.JsonRpcProvider("https://eth-sepolia.g.alchemy.com/v2/v178sXJ0X49qRdgINzyuNbEvKsMXob4W");

// Create a contract instance
const contract = new ethers.Contract(contractAddress, contractAbi, provider);

// Specify the event you want to listen to
const eventName = 'OffRamp'; // RYour actual event name

// Set up the event filter
const eventFilter = contract.filters[eventName]();

console.log("start")

// Listen to the events
provider.on(eventFilter, async (log, event) => {
  // Parse the event data using the contract ABI
  const parsedData = contract.interface.parseLog(log);

  // Access the parsed data fields
  const eventData = parsedData.args;

  // Parse data
  const paymentId = eventData[0];
  const paymentPlatform = eventData[1];
  const depositAmount = parseInt(eventData[2].toString(), 10);
  const receiverAddress = eventData[3]
  const chainName = "Blast"

  console.log('PaymentId:', paymentId);
  console.log('PaymentPlatform:', paymentPlatform)
  console.log('DepositAmount:', depositAmount)
  console.log("ReceiverAddress:", receiverAddress)

  await createSellOrderController(paymentId, paymentPlatform, depositAmount, receiverAddress, chainName)
});