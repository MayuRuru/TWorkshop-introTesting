function openAccount () {
  let amount = 0;

  return {
    getAmount: () => {
      return amount;
    },
    setAmount: (value) => {
      if(isNaN(value)) {
          throw new Error('Please introduce a number');
      }
      amount = value;
    }
  };
};

module.exports = {openAccount}