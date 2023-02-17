class Account {
  constructor() {
    this.amount = 0;
    this.isAccountBlocked = false;
  }

  getAmount () {
      return this.amount;
  }

  setAmount (value) {
      if(this.isAccountBlocked) {
        throw new Error('Account is blocked');
      }
      if(isNaN(value)) {
          throw new Error('Please introduce a number');
      }
      this.amount = value;
  }

  blockAccount () {
    this.isAccountBlocked = true;
  }

  getBlockAccount() {
    return this.isAccountBlocked;
  }
};

module.exports = Account