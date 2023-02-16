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