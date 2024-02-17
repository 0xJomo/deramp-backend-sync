const admin = require('firebase-admin');
var serviceAccount = require('../firebase_admin.json');
const app = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
})

const fetch = require('node-fetch');
const { Headers } = fetch;
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');
const db = getFirestore();

const uuid = require('uuid4');


async function createSellOrderController(payment_id, payment_platform, amount, receiver_address, chainName) {
  const sellOrdersRef = db.collection('sell_orders')
  const sell_order_id = uuid(4).toString();

  // create buy order entry
  const sell_order = {
    payment_id: payment_id,
    payment_platform: payment_platform,
    amount: amount,
    receiver_address: receiver_address,
    balance: amount,
    chain: chainName,
  }
  await sellOrdersRef.doc(sell_order_id).set(sell_order);
  return sell_order_id;
}

module.exports = { createSellOrderController };