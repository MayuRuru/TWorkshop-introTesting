const account = require('./account.js');

function startAtmForAccount() {
    personalAccount = account.openAccount();
    return {
        getAccountInformation: () => {
            return { amount: personalAccount.getAmount(), isblocked: false }
        },
        makeDeposit: (value) => {
            const totalAmount = value + personalAccount.getAmount();
            personalAccount.setAmount(totalAmount);
        }
    }
}

module.exports = { startAtmForAccount };