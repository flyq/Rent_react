const cita = require('./cita-sdk')
const {
  abi
} = require('./contracts/compiled.js')
const {
  contractAddress
} = require('./config')

const transaction = require('./contracts/transaction')
const rentContract = new cita.base.Contract(abi, contractAddress)
module.exports = {
  transaction,
  rentContract,
}