# workshop-introduccion-al-testeo-en-javascript
Workshop para introduccion al testeo en Javascript

## Descripcion
Queremos crear un banco online. Por simplificar el ejemplo, este banco online guardara todo en memoria y solo manejara una unica cuenta bancaria.

Tendremos dos partes distintas:
 1. Account. Guarda la informacion de la cuenta en memoria.
 2. ATM. Permite al usuario modificar la account entity.

[Requisitos de nuestra aplicacion](./img/funcionalidades-cuenta.png)

## Pre-requisitos

Primero, hay que instalar node. Si no lo tienes ya instalado, [puedes descargarlo aqui](https://nodejs.org/en/download/).

Al descargar node, nos estaremos descargando tambien la herramienta `npm`.

(Opcional) Para asegurarte de que tienes la ultima version de npm instalada, puedes usar:
```bash
npm install -g npm
```

## Parte 1. Creamos nuestro proyecto
Crea una carpeta donde vamos a poner los ficheros del proyecto.
```
mkdir introduccionAlTesteo
cd introduccionAlTesteo
```

Empezamos el proyecto creando nuestra configuracion basica. Dale a enter a todo. Cuando pida `test command` escribe `jest`.
```bash
npm init
```
Esto deberia de crear nuestro package.json de esta forma:
```json
{
  "name": "ejemplointroduccionaltesteo",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "jest"
  },
  "author": "",
  "license": "ISC"
}
```

Instalamos nuestra libreria de testeo de forma local y global
```bash
npm install --save-dev jest
npm install jest --global
```

Creamos los ficheros que vamos a usar:
```bash
touch account.js account.test.js
```

## Parte 2. Escribimos un test para Account Entity

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

## Parte 3. Escribimos el resto de tests para Account Entity

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

## Parte 4. Escribir los tests para bloquear la account

Para aqui! Intenta escribir los siguientes tests por tu cuenta antes de mirar las soluciones. Puedes hacer un fork de este repositorio y duplicar la carpeta `parte-1-a-3-de-introduccion-al-testeo` para seguir o seguir los pasos de arriba. Recuerda usar TDD.

1. Cuando llamo a getBlockAccount, Espero que devuelva false por defecto
2. Cuando llamo a blockAccount, Espero que getBlockAccount devuelva true
3. Cuando llamo a blockAccount y luego llamo a setAmount con un numero, Espero recibir un error.

## Parte 5. (Solucion) Escribir los tests para bloquear la account
1. Cuando llamo a getBlockAccount, Espero que devuelva false por defecto

El test seria el siguiente:
```javascript
test("When I call getBlockAccount, I expect it to return false by default", () => {
    // Given: testee
    // When
    const value = testee.getBlockAccount();

    // Then
    expect(value).toBe(false);
});
```

La solucion seria la siguiente:
```javascript
// [...] Codigo de getAmount, setAmount

function getBlockAccount() {
  return false;
}

module.exports = {getAmount, setAmount, getBlockAccount}
```

2. Cuando llamo a blockAccount, Espero que getBlockAccount devuelva true
El test seria el siguiente:
```javascript
test("When I call blockAccount, I expect getBlockAccount to return true", () => {
    // Given: testee
    // When
    testee.blockAccount();

    // Then
    expect(testee.getBlockAccount()).toBe(true);
});
```

La solucion seria la siguiente:
```javascript
// [...] Codigo de getAmount, setAmount

let isAccountBlocked = false;

function getBlockAccount() {
  return isAccountBlocked;
}

function blockAccount() {
  isAccountBlocked = true;
}

module.exports = {getAmount, setAmount, getBlockAccount, blockAccount}
```

3. Cuando llamo a blockAccount y luego llamo a setAmount con un numero, Espero recibir un error.

El test seria el siguiente:
```javascript
test("When I call blockAccount, I expect that calling setAmount with a number to return an error", () => {
    // Given: testee
    // When
    testee.blockAccount();

    // Then
    expect(() => { 
        testee.setAmount(23) 
    })
    .toThrow();
});
```

La solucion seria la siguiente:
```javascript
function setAmount(value) {
    if(isAccountBlocked) {
      throw new Error('Account is blocked');
    }
    if(isNaN(value)) {
        throw new Error('Please introduce a number');
    }
    amount = value;
}
```

## Parte 6. Escribimos un test para nuestra ATM
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




