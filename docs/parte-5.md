## Parte 5. (Solucion) Escribir los tests para bloquear la account
1. Cuando llamo a getBlockAccount, Espero que devuelva false por defecto

El test seria el siguiente:
```javascript
test("Given I open an account, When I call getBlockAccount, I expect it to return false by default", () => {
    // Given
    testee = account.openAccount();

    // When
    const value = testee.getBlockAccount();

    // Then
    expect(value).toBe(false);
});
```

La solucion seria la siguiente:
```javascript
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
    },
    getBlockAccount: () => {
      return false;
    }
  };
};

module.exports = {openAccount}
```

2. Cuando llamo a blockAccount, Espero que getBlockAccount devuelva true
El test seria el siguiente:
```javascript
test("Given I open an account, When I call blockAccount, I expect getBlockAccount to return true", () => {
    // Given
    testee = account.openAccount();

    // When
    testee.blockAccount();

    // Then
    expect(testee.getBlockAccount()).toBe(true);
});
```

La solucion seria la siguiente:
```javascript
function openAccount () {
  let amount = 0;
  let isAccountBlocked = false;

  return {
    getAmount: () => {
      return amount;
    },
    setAmount: (value) => {
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
```

3. Cuando llamo a blockAccount y luego llamo a setAmount con un numero, Espero recibir un error.

El test seria el siguiente:
```javascript
test("Given I open an account, When I call blockAccount, I expect that calling setAmount with a number to return an error", () => {
    // Given
    testee = account.openAccount();

    // When
    testee.blockAccount();

    // Then
    expect(() => { testee.setAmount(23) }).toThrow();
});
```

La solucion seria la siguiente:
```javascript
function openAccount () {
  // [...] Codigo de openAccount
  return {
    setAmount: (value) => {
      if(isAccountBlocked) {
        throw new Error('Account is blocked');
      }
      if(isNaN(value)) {
          throw new Error('Please introduce a number');
      }
      amount = value;
    }
    // [...] otras funciones
  }
}
// [...] Codigo de account
```