const Account = require('./account.js');

class Atm {
  constructor() {
    this.personalAccount = new Account();
  }

  getAccountInformation() {
    return { amount: this.personalAccount.getAmount(), isblocked: false }
  }
  
  makeDeposit(value) {
    const totalAmount = value + this.personalAccount.getAmount();
    this.personalAccount.setAmount(totalAmount);
  }
}

module.exports = Atm;