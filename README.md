# Strava React App

React and TypeScript app that connects to Strava and shows activities on an interactive map ([React Leaflet](https://react-leaflet.js.org/)). The application code lives in **[`project/`](./project)**. For scripts, environment variables, and local setup, see the **[`project/README.md`](./project/README.md)**.

## Tech stack

- [Node.js](https://nodejs.org/) and **npm** — [Vite](https://vitejs.dev/) 7, React 18, TypeScript
- [Material UI](https://mui.com/)
- [Redux Toolkit](https://redux-toolkit.js.org/) and [Redux Saga](https://redux-saga.js.org/) (app and async flow)
- [Jest](https://jestjs.io/) and [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/); [Playwright](https://playwright.dev/) for E2E
- [ESLint](https://eslint.org/)

## Quick start

```bash
cd project
npm install
```

1. Create a [Strava API application](https://developers.strava.com/docs/getting-started) and note the OAuth client ID, secret, and callback URL.
2. Copy or edit `environments/.env.development` (or `.env.local` for `npm run start:local`) and set variables with the **`VITE_`** prefix — Vite only exposes those to the client. See the [project README](./project/README.md#environment-variables) for the full list, including optional map layers (e.g. Thunderforest).

```bash
npm run start:dev
```

## CI

[GitHub Actions](https://github.com/features/actions) run on `main` for this repo: [`.github/workflows/build_test_react.yml`](.github/workflows/build_test_react.yml) (E2E: [e2e_playwright.yml](.github/workflows/e2e_playwright.yml), CodeQL: [codeql-analysis.yml](.github/workflows/codeql-analysis.yml)). The build job uses [`project/`](./project) as its working directory.

## Strava API

- [Strava API v3 reference](https://developers.strava.com/docs/reference)
- [Strava API playground](https://developers.strava.com/playground/#/)
