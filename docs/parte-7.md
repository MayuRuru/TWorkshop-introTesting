## Parte 7. Preparando nuestros test para futuros cambios
La persona encargada del proyecto nos llama y nos dice que para promocionar nuestro nuevo banco, por defecto cuando se cree una account, esta tendra 5 euros.

Si cambiamos nuestra Account
```javascript
let amount = 5;

// [...] Resto del codigo
```

Y luego corremos nuestros tests para ver que requisitos han cambiado, vemos que no solo fallan los tests de Account, si no tambien de Atm!

Primero lo primero: Vamos a arreglar nuestro `account.test.js` ya que si es correcto que falle porque los requisitos han cambiado:

```javascript
test("Given I have my default Amount, When I ask for it, Then it returns 5", () => {
    // Given: Objetos que estamos usando en nuestro test

    // When
    const value = testee.getAmount();

    // Then
    expect(value).toBe(5);
});
```

Por otro lado, vemos que los requisitos de atm no han cambiado, pero nuestros tests estan fallando. Cuando hacemos un cambio en una dependencia, no queremos que todos los tests que tienen esa dependencia falles. Seria muy caro de arreglar si tenemos que cambiar todo lo que usa esa dependencia. En lugar de eso, lo que deberiamos de hacer es que nuestro codigo no dependa directamente de ficheros que pueden cambiar, si no de "copias" que funcionan de forma parecida. Para esto usamos mocks.

Un mock permite testear como el codigo se comunica entre si. Asi, en nuestro caso de la ATM, no estariamos testeando que devuelva "0" o un "10" en amount, si no que llame a `account.getAmount()` y devuelva lo que sea que devuelva esa funcion.

Esto nos da mucha mas flexibilidad en el codigo ya que podriamos modificar otros ficheros y mientras no modifiquemos esta, sus tests unitarios no deberian de fallar.

Como escribir los tests usando mocks. Primero, tenemos que decirle a nuestros test que usen una copia false de `./account.js`.
```javascript
const testee = require('./atm.js');
const accountMock = require('./account.js');

jest.mock('./account.js');
```

Luego, en mi primer test, pongo el resultado que espero que me devuelva y ademas, compruevo que se esta llamando.
```javascript
test("When I ask for account information, I expect to get a json with the expected information", () => {
    // Given
    let spy = jest.spyOn(accountMock, 'getAmount').mockImplementation(() => 0);

    // When
    const value = testee.getAccountInformation();
    //Then
    expect(value).toStrictEqual({ amount: 0, isblocked: false });
    expect(accountMock.getAmount).toHaveBeenCalled();

    spy.mockRestore();
});
```

En mi segundo test, cuando se llama a makeDeposit, cambio mi expect a que lo que espero que se llame a setAmount. 

```javascript
test("When I call makeDeposit and then I call getAccountInformation, I expect testee to call setAmount", () => {
    // Given
    let spy = jest.spyOn(accountMock, 'getAmount').mockImplementation(() => 0);

    // When
    testee.makeDeposit(20);

    //Then
    expect(accountMock.setAmount).toHaveBeenCalledWith(20);
    spy.mockRestore();
});
```

