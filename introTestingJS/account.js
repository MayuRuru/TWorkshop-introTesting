class Account {
  constructor() {
    this.amount = 0;
  }

  getAmount() {
    return this.amount;
  }

  setAmount(value) {
    if (isNaN(value)) {
      throw new Error("not a number");
    }
    this.amount = value;
  }
}

module.exports = Account;
