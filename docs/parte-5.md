## Parte 5. (Solucion) Escribir los tests para bloquear la account
1. Cuando llamo a getBlockAccount, Espero que devuelva false por defecto

El test seria el siguiente:
```javascript
test("Given I open an account, When I call getBlockAccount, I expect it to return false by default", () => {
    // Given
    testee = new Account();

    // When
    const value = testee.getBlockAccount();

    // Then
    expect(value).toBe(false);
});
```

La solucion seria la siguiente:
```javascript
class Account {
  // [...] codigo de Account
  getBlockAccount() {
    return false;
  }
};

module.exports = Account
```

2. Cuando llamo a blockAccount, Espero que getBlockAccount devuelva true
El test seria el siguiente:
```javascript
test("Given I open an account, When I call blockAccount, I expect getBlockAccount to return true", () => {
    // Given
    testee = new Account();

    // When
    testee.blockAccount();

    // Then
    expect(testee.getBlockAccount()).toBe(true);
});
```

La solucion seria la siguiente:
```javascript
class Account {
  constructor() {
    this.amount = 0;
    this.isAccountBlocked = false;
  }

  // Codigo de setAmount y getAmount

  blockAccount () {
    this.isAccountBlocked = true;
  }

  getBlockAccount() {
    return this.isAccountBlocked;
  }
};

module.exports = Account
```

3. Cuando llamo a blockAccount y luego llamo a setAmount con un numero, Espero recibir un error.

El test seria el siguiente:
```javascript
test("Given I open an account, When I call blockAccount, I expect that calling setAmount with a number to return an error", () => {
    // Given
    testee = new Account();

    // When
    testee.blockAccount();

    // Then
    expect(() => { testee.setAmount(23) }).toThrow();
});
```

La solucion seria la siguiente:
```javascript
class Account {
  // [...] constructor y otras funciones
  setAmount (value) {
      if(this.isAccountBlocked) {
        throw new Error('Account is blocked');
      }
      if(isNaN(value)) {
          throw new Error('Please introduce a number');
      }
      this.amount = value;
  }
}
```