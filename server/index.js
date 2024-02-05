const ethers = require("ethers");
const { BigNumber } = require('bignumber.js');
const derampAbi = require('./abi.js'); // Adjust the path based on your project structure


// Replace 'YourContractAbi' and 'YourContractAddress' with your actual contract ABI and address
const contractAbi = derampAbi; // Your contract ABI
const contractAddress = '0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0'; // Local Address

// Connect to a provider (Ethereum node)
const provider = new ethers.providers.JsonRpcProvider("http://localhost:8545");

// Create a contract instance
const contract = new ethers.Contract(contractAddress, contractAbi, provider);

// Specify the event you want to listen to
const eventName = 'OffRamp'; // RYour actual event name

// Set up the event filter
const eventFilter = contract.filters[eventName]();

// Listen to the events
provider.on(eventFilter, (log, event) => {
  console.log('Event:', event);
  console.log('Log:', log);

  // Parse the event data using the contract ABI
  const parsedData = contract.interface.parseLog(log);

  // Access the parsed data fields
  const eventData = parsedData.args;
  console.log('Parsed Event Data:', eventData);

  // Parse data
  const paymentId = eventData[0];
  const paymentPlatform = eventData[1];  
  const depositAmount = parseInt(eventData[2].toString(), 10);
  const receiverAddress = eventData[3]

  console.log('PaymentId:', paymentId);
  console.log('PaymentPlatform:', paymentPlatform)
  console.log('DepositAmount:', depositAmount)
  console.log("ReceiverAddress:", receiverAddress)
});