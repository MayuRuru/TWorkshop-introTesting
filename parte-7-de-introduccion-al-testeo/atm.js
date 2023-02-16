const account = require('./account.js');

function getAccountInformation() {
    return { amount: account.getAmount(), isblocked: false }
}

function makeDeposit(value) {
    const totalAmount = value + account.getAmount();
    account.setAmount(totalAmount);
}
module.exports = { getAccountInformation, makeDeposit };