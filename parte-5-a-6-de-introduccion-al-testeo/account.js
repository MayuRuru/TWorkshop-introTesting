let amount = 0;

function getAmount() {
  return amount;
}

function setAmount(value) {
    if(isAccountBlocked) {
      throw new Error('Account is blocked');
    }
    if(isNaN(value)) {
        throw new Error('Please introduce a number');
    }
    amount = value;
}

let isAccountBlocked = false;

function getBlockAccount() {
  return isAccountBlocked;
}

function blockAccount() {
  isAccountBlocked = true;
}

module.exports = {getAmount, setAmount, getBlockAccount, blockAccount}