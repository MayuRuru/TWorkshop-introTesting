function openAccount () {
  let amount = 0;
  let isAccountBlocked = false;

  return {
    getAmount: () => {
      return amount;
    },
    setAmount: (value) => {
      if(isAccountBlocked) {
        throw new Error('Account is blocked');
      }
      if(isNaN(value)) {
          throw new Error('Please introduce a number');
      }
      amount = value;
    },
    getBlockAccount: () => {
      return isAccountBlocked;
    },
    blockAccount: () => {
      isAccountBlocked = true;
    }
  };
};

module.exports = {openAccount}