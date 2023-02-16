## Parte 2. Escribimos nuestro primer test

Para escribir un test, tenemos que definir el siguiente esqueleto:
```javascript
test("Descripcion del test y resultados que se esperan", () => {
    // Given: Objetos que estamos usando en nuestro test
    const testee = require('my-file');

    // When: Accion que estamos testeando
    const value = testee.doSomething();

    // Then: Expectativas
    expect(value).toBe(expectedValue);
})
```

Hay distintas comprobaciones que `expect` nos permite hacer y que [estan documentados en su pagina oficial](https://jestjs.io/docs/expect). Algunos ejemplos son:
```javascript
expect(value).not.toBe(expectedValue);

expect(action).toThrow(Error);

expect(arrayValue).toContain(expectedValue);
```

Escribimos el primer test en nuestro `account.test.js`. Recordad que estamos haciendo TDD, asi que lo primero es escribir el test
1. Given I open a new account, When I call getAmount(), Then it returns 0

```javascript
const testee = require('./account.js');

test("Given I open a new account, When I call getAmount(), Then it returns 0", () => {
    // Given: testee

    // When
    const value = testee.getAmount();

    // Then
    expect(value).toBe(0);
});
```

2. Escribimos el codigo minimo necesario en `account.js` para hacer que pase:
```javascript
function getAmount() {
  return 0;
}

module.exports = {getAmount}
```

Con esto ya deberiamos de tener un test funcionando.