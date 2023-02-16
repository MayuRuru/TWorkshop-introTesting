## Parte 2. Escribimos nuestro primer test

Para escribir un test, tenemos que definir el siguiente esqueleto:
```javascript
test("Descripcion del test y resultados que se esperan", () => {
    expect(testee.doSomething()).toBe("expected value");
})
```

Como recomendacion, una buena practica para escribir nuestros tests es dividirlos en tres partes Given-When-Then o Arrage-Act-Assert.
```javascript
const myfile = require('my-file');

test("Descripcion del test y resultados que se esperan", () => {
    // Given: Defino los objetos que necesito para el test
    const testee = myfile.createObject();

    // When: Realizo la accion que estoy testeando
    const value = testee.doSomething();

    // Then: Escribo lo que espero que suceda en mi test
    expect(value).toBe(expectedValue);
})
```

Hay distintas comprobaciones que `expect` nos permite hacer y que [estan documentados en l pagina oficial de Jest](https://jestjs.io/docs/expect). Algunos ejemplos son:
```javascript
expect(value).not.toBe(expectedValue);

expect(action).toThrow(Error);

expect(arrayValue).toContain(expectedValue);
```

Escribimos el primer test en nuestro `account.test.js`. Recordad que estamos haciendo TDD, asi que lo primero es escribir el test
1. Given I open an account, When I call getAmount(), Then it returns 0

```javascript
const testee = require('./account.js');

test("Given I open an account, When I call getAmount(), Then it returns 0", () => {
    // Given: Objetos que estamos usando en nuestro test
    testee = account.openAccount();

    // When: Accion que estamos testeando
    const value = testee.getAmount();

    // Then: Expectativas
    expect(value).toBe(0);
});
```

2. Escribimos el codigo minimo necesario en `account.js` para hacer que pase:
```javascript
function openAccount() {
  return {
    getAmount: () => {
      return 0;
    }
  };
}

module.exports = {openAccount}
```

Con esto ya deberiamos de tener un test funcionando.