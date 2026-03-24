# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


### Iniciar el proyecto

- En un terminal ejecutar el siguiente comando
```shell
npm install
```

```shell
npm run dev
```

### Para Iniciar la API (json-server)

- En un nuevo terminal

```shell
npm run dev-api
``` 

### Iniciar un proyecto similar desde 0

- Paso 1: En un terminal ejecutar el siguiente comando
```shell
npm create vite -- --template react .
```
Opciones- Version Experimental: No - npm y start: No

- Paso 2: Borrar todo menos main jsx

- Paso 3: Crear una API ficticia instalando librería JSON server con el siguiente comando de terminal:
```shell
npm i --save-dev json-server
```

- Paso 4: Ir a package.json > scripts y escribir el siguiente comando : "dev-api": "json-server --watch ./src/data/db.json --port 3001",

- Paso 5: Iniciar la API con un comando de terminal:
```shell
npm run dev-api
``` 
- Paso 6: Inciar el proyecto con el siguiente comando de terminal:
```shell
npm run dev
```