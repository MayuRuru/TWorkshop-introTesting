## Parte 6. Escribimos tests para nuestra ATM
Creamos los ficheros para nuestra atm en nuestro proyecto:
```bash
touch atm.js atm.test.js
```

1. Queremos escribir un test para que cuando llame a getAccountInformation que me devuelva un objeto con la informacion de la cuenta.

Primero escribimos el test en `atm.test.js`
```javascript
const testee = require('./atm.js');

test("When I ask for account information, I get a json with the expected information", () => {
    // When
    const value = testee.getAccountInformation();
    //Then
    expect(value).toStrictEqual({ amount: 0, isblocked: false });
});
```

Y escribimos el codigo para que funcione:
```javascript
function getAccountInformation() {
    return { amount: 0, isblocked: false }
}

module.exports = { getAccountInformation };
```

2. Para que llame a account, queremos escribir otro test para que cuando llame a depositMoney y luego a getAccountInformation que me devuelva un objeto con la informacion de la cuenta actualizada.

Primero escribimos el test en `atm.test.js`
```javascript
test("When I call makeDeposit and then I call getAccountInformation, I expect to get a json with the expected information", () => {
    // When
    testee.makeDeposit(20);
    //Then
    expect(testee.getAccountInformation()).toStrictEqual({ amount: 20, isblocked: false });
});
```

Y luego hacemos los cambios en `atm.js` para que funcione
```javascript
const account = require('./account.js');

function getAccountInformation() {
    return { amount: account.getAmount(), isblocked: false }
}

function makeDeposit(value) {
    const totalAmount = value + account.getAmount();
    account.setAmount(totalAmount);
}
module.exports = { getAccountInformation, makeDeposit };
```
