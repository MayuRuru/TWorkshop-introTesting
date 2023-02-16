# workshop-introduccion-al-testeo-en-javascript
Workshop para introduccion al testeo en Javascript

## Descripcion
Queremos crear un banco online. Por simplificar el ejemplo, este banco online guardara todo en memoria y solo manejara una unica cuenta bancaria.

Tendremos dos partes distintas:
 1. Account Entity. Guarda la informacion de la cuenta en memoria.
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
1. Given I have my default Amount, When I ask for it, Then it returns 0

```javascript
const testee = require('./account.js');

test("Given I have my default Amount, When I ask for it, Then it returns 0", () => {
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

1. Given I have my default Amount, When I set value to 10, Then it should return 10

```javascript
test("Given I have my default Amount, When I set value to 10, Then it should return 10", () => {
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
    
    expect(() => { 
        // When
        testee.setAmount("not a number") 
    })
    // Then
    .toThrow();
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

Para aqui! Intenta escribir los siguientes tests por tu cuenta antes de mirar las soluciones. Recuerda usar TDD.
1. Cuando llamo a getBlockAccount, Espero que devuelva false por defecto
2. Cuando llamo a blockAccount, Espero que getBlockAccount devuelva true
3. Cuando llamo a blockAccount y luego llamo a setAmount con un numero, Espero recibir un error.

## Parte 5. (Solucion) Escribir los tests para bloquear la account
1. Cuando llamo a getBlockAccount, Espero que devuelva false por defecto

El test seria el siguiente:
```javascript
```

La solucion seria la siguiente:
```javascript
```



