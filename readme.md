# DFS Tutorial Starter

To use this template to follow along with the video tutorial, just click the "Use this template" button at the top of the page. This template is a starter pack and configuration for Vue 3 using the following.

## Features
* [Vite](https://github.com/vitejs/vite) - Vite is an opinionated web dev build tool that serves your code via native ES Module imports during dev and bundles it with Rollup for production.
* ESLINT with Typescript, Vue, and Prettier configs added
* Tailwind CSS
* The Vue components for the application are also included. We'll modify the logic to retrieve and update the data passed to these components in the tutorial. 
* [JSON-Server](https://github.com/typicode/json-server) to act as a mock API/database, along with a `/data` folder containing methods for CRUD interactions with the API. JSON-server is configured to be run with a 300 ms delay so we can better visualize UI loaders in the application.

## Running the project

Our package.json has for run scripts. To run the client only, use `npm run dev`. To run the JSON-server only, use `npm run server`. To run both in a single terminal, use `npm run start`.

```json
"dev": "vite",
"server": "json-server --watch db.json --delay 300 --port 8000",
"start": "npm run server & vite",
"build": "vite build"
```

## Notes

As of writing, there is an *experimental* template for scaffolding out a Vite App with Typescript. You can find these at the [create-vite-app](https://github.com/vitejs/create-vite-app) repository. By the time you find this tutorial, it may be *less experimental* and a better option for your applications. 

While ESLint does perform linting on the application, it does not perform things like typechecking and validating imports inside for `<script lang="ts">` tags inside of `.vue` files. For this, I am using a plugin called [Vetur](https://vuejs.github.io/vetur/) for VS Code. The experimental Typescript Vite template is supposed to add similar features (as well as Typescript interpolation in `<template>` tags).