## Parte 3. Escribimos el resto de tests para Account

Con esto lo unico que estamos testeando es que por defecto no tengo dinero en mi cuenta. Como queremos que nuestra aplicacion haga mas cosas, vamos a anadir mas casos de uso:

1. Given I have a new account, When I call setAmount with 10, Then getAmount should return 10

```javascript
test("Given I have a new account, When I call setAmount with 10, Then getAmount should return 10", () => {
    // Given
    testee = new Account();

    // When
    testee.setAmount(10);

    // Then
    expect(testee.getAmount()).toBe(10);
});
```

2. Escribimos el codigo que haga que esto funcione
```javascript
class Account {
  constructor() {
    this.amount = 0;
  }

  getAmount () {
      return this.amount;
  }

  setAmount (value) {
      this.amount = value;
  }
};

module.exports = Account
```

3. Escribimos otro test en el que esperamos que se lance un error si se intentar llamar a setAmount con algo que no sea un numero.

```javascript
test("Given I have a new account, When I set value that is not a number, Then it should throw and error", () => {
    // Given: Objetos que estamos usando en nuestro test
    testee = new Account();

    // When: Accion que estamos testeando
    action = () => {
        testee.setAmount("not a number") 
    }
    // Then: Expectativas
    expect(action).toThrow();
});
```

4. Y cuando lo veamos fallar, escribimos en codigo que lo haga funcionar:

```javascript
class Account {
  // [...] codigo de constructor y getAmount

  setAmount (value) {
      if(isNaN(value)) {
          throw new Error('Please introduce a number');
      }
      this.amount = value;
  }
};

module.exports = Account
```
