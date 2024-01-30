const Web3 = require('web3');

const alchemyApiKey = 'JeaTE8pmAJlQNMhBoGIN7stJlH3vwguZ';
const web3 = new Web3(`https://eth-mainnet.g.alchemy.com/v2/JeaTE8pmAJlQNMhBoGIN7stJlH3vwguZ`);

// Your contract ABI and address
const contractAbi = [...];  // Replace with your contract ABI
const contractAddress = '0x...';  // Replace with your contract address

const contract = new web3.eth.Contract(contractAbi, contractAddress);

// Connect to Alchemy
web3.eth.net.isListening()
  .then(() => console.log('Connected to Alchemy'))
  .catch(err => console.error('Error connecting to Alchemy:', err));


// Subscribe to a specific event
const event = contract.events.YourEventName();

event
  .on('data', event => {
    console.log('Event:', event);
    // Handle the event data here
  })
  .on('error', error => {
    console.error('Error:', error);
  });