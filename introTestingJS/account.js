class Account {
  constructor() {
    this.amount = 0;
    this.isBlocked = false;
  }

  getAmount() {
    return this.amount;
  }

  setAmount(value) {
    if ((this.isBlocked = true)) {
      throw new Error("can't add to a blocked account");
    }
    if (isNaN(value)) {
      throw new Error("not a number");
    }
    this.amount = value;
  }

  blockAccount() {
    this.isBlocked = true;
  }

  getBlockAccount() {
    //return false;
    return this.isBlocked;
  }
}

module.exports = Account;
