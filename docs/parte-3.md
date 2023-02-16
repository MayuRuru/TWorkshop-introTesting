## Parte 3. Escribimos el resto de tests para Account

Con esto lo unico que estamos testeando es que por defecto no tengo dinero en mi cuenta. Como queremos que nuestra aplicacion haga mas cosas, vamos a anadir mas casos de uso:

1. Given I open a new account, When I call setAmount(10), then the amount should be 10

```javascript
test("Given I open a new account, When I call setAmount(10), then the amount should be 10", () => {
    // Given: testee
    // When
    testee.setAmount(10);

    // Then
    expect(testee.getAmount()).toBe(10);
});
```

2. Escribimos el codigo que haga que esto funcione
```javascript
let amount = 0;
function getAmount() {
  return amount;
}

function setAmount(value) {
    amount = value;
}
  
module.exports = {getAmount, setAmount}
```

3. Escribimos otro test: `Given I have my default Amount, When I set value that is not a number, Then it should throw and error`

```javascript
test("Given I have my default Amount, When I set value that is not a number, Then it should throw and error", () => {
    // Given: testee
    // When
    const whenFunction = () => { testee.setAmount("not valid value") };
    //Then
    expect(whenFunction).toThrow();
});
```

4. Y cuando lo veamos fallar, escribimos en codigo que lo haga funcionar:

```javascript
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
```
