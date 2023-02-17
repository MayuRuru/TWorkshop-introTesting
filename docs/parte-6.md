## Parte 6. Escribimos tests para nuestra ATM
Creamos los ficheros para nuestra atm en nuestro proyecto:
```bash
touch atm.js atm.test.js
```

1. Queremos escribir un test para que cuando llame a getAccountInformation que me devuelva un objeto con la informacion de la cuenta.

Primero escribimos el test en `atm.test.js`
```javascript
const Atm = require('./atm.js');

test("When I ask for account information, I expect to get a json with the expected information", () => {
    // Given
    const testee = new Atm();
    // When
    const value = testee.getAccountInformation();
    //Then
    expect(value).toStrictEqual({ amount: 0, isblocked: false });
});
```

Y escribimos el codigo para que funcione:
```javascript
const Account = require('./account.js');

class Atm {
  getAccountInformation() {
    return { amount: 0, isblocked: false }
  }
}

module.exports = Atm;
```

2. Para que llame a account, queremos escribir otro test para que cuando llame a depositMoney y luego a getAccountInformation que me devuelva un objeto con la informacion de la cuenta actualizada.

Primero escribimos el test en `atm.test.js`
```javascript
test("When I call makeDeposit and then I call getAccountInformation, I expect to get a json with the expected information", () => {
    // Given
    const testee = new Atm();
    // When
    testee.makeDeposit(20);
    //Then
    expect(testee.getAccountInformation()).toStrictEqual({ amount: 20, isblocked: false });
});
```

Y luego hacemos los cambios en `atm.js` para que funcione
```javascript
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
```
