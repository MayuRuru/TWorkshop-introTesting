let amount = 0;

function getAmount() {
  return amount;
}

function setAmount(value) {
    if(isNaN(value)) {
        throw new Error('Please introduce a number');
    }
    amount = value;
}
  
module.exports = {getAmount, setAmount}