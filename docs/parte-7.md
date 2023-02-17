## Parte 7. Preparando nuestros test para futuros cambios
La persona encargada del proyecto nos llama y nos dice que para promocionar nuestro nuevo banco, por defecto cuando se cree una account, esta tendra 5 euros.

Si cambiamos nuestra Account, quedaria asi:
```javascript
class Account {
  constructor() {
    this.amount = 5;
    this.isAccountBlocked = false;
  }
    // [...] Resto del codigo
}
```

Ahora podemos correr nuestros tests para ver que requisitos han cambiado, vemos que no solo fallan los tests de Account, si no tambien de Atm!

Primero lo primero: Vamos a arreglar nuestro `account.test.js` ya que si es correcto que fallen porque los requisitos han cambiado:

```javascript
test("Given I open an account, When I call getAmount(), Then it returns 0", () => {
    // Given
    testee = new Account();

    // When
    const value = testee.getAmount();

    // Then
    expect(value).toBe(5);
});
```

Por otro lado, vemos que los requisitos de atm no han cambiado, pero nuestros tests estan fallando!

Cuando hacemos un cambio en un fichero, no queremos que todos los tests que lo tienen como dependencia fallen. Seria muy caro de arreglar si tenemos que cambiar todo lo que usa esa dependencia. 

En lugar de eso, lo que deberiamos de hacer es que nuestro codigo no dependa directamente de ficheros que pueden cambiar, si no de "copias" que funcionan de forma parecida. Para esto usamos mocks.

Un mock permite testear como el codigo se comunica entre si. Asi, en nuestro caso de la ATM, lo correcto seria testear que esta llamando a `account.getAmount()` cuando se le pide la informacion y que devuelve lo que sea que devuelva esa funcion.

Esto nos da mucha mas flexibilidad en el codigo ya que podriamos modificar distintos ficheros sin miedo a que los tets de otros ficheros fallen.

Como escribir los tests usando mocks. Primero, tenemos que decirle a nuestros test que usen una copia false de `./account.js`.
```javascript
const Atm = require('./atm.js');
require('./account.js');

let mockGetAmount = jest.fn(() => 0);
let mockSetAmount = jest.fn(() => {});
jest.mock('./account.js', () => {
  return jest.fn().mockImplementation(() => {
    return { getAmount: mockGetAmount, setAmount: mockSetAmount };
  });
});
```

Luego, en mi primer test, pongo el resultado que espero que me devuelva y ademas, compruevo que se esta llamando a `getAmountMock`.
```javascript
test("When I ask for account information, I expect to get a json with the expected information", () => {
    // Given
    const testee = new Atm();
    // When
    const value = testee.getAccountInformation();
    //Then
    expect(value).toStrictEqual({ amount: 0, isblocked: false });
    expect(mockGetAmount).toHaveBeenCalled();
});
```

En mi segundo test, cuando se llama a makeDeposit, cambio mi expect a que lo que espero que se llame a setAmount. 

```javascript
test("When I call makeDeposit and then I call getAccountInformation, I expect to get a json with the expected information", () => {
    // Given
    const testee = new Atm();
    // When
    testee.makeDeposit(20);
    //Then
    expect(mockSetAmount).toHaveBeenCalledWith(20);
});
```

