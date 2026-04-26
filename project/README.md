# Strava React App

React + TypeScript app that connects to Strava and shows activities on an interactive map (React Leaflet). Builds and dev server use [Vite](https://vitejs.dev/).

## Prerequisites

- Node.js and npm (see your team’s supported versions; this repo uses Vite 7 and React 18).

## Scripts

| Command | Purpose |
| --- | --- |
| `npm run start:local` | Dev server with `environments/.env.local` |
| `npm run start:dev` | Dev server with `environments/.env.development` |
| `npm start` / `npm run dev` | Dev server (no `env-cmd`; use only if env vars are already available to Vite) |
| `npm run build` | Production build |
| `npm run preview` | Serve the production build locally |
| `npm test` | Jest unit/integration tests |
| `npm run test:watch` | Jest in watch mode |
| `npm run test:coverage` | Jest with coverage thresholds |
| `npm run e2e` | Playwright tests |
| `npm run e2e:ui` | Playwright UI mode |
| `npm run e2e:headed` | Playwright headed browser |
| `npm run coverage:critical-flows` | Critical-flow coverage gate |
| `npm run lint` / `npm run lint:fix` | ESLint |
| `npm run validate` | Lint + unit coverage + critical-flow gate |

## Environment variables

Vite only exposes variables prefixed with `VITE_` to the client. Put values in `environments/.env.local` or `environments/.env.development` and run `npm run start:local` or `npm run start:dev` so they are loaded.

### Strava OAuth (required for typical use)

| Variable | Purpose |
| --- | --- |
| `VITE_STRAVA_CLIENT_ID` | Strava OAuth `client_id` |
| `VITE_STRAVA_CLIENT_SECRET` | Strava OAuth `client_secret` (used when exchanging the auth code for tokens) |
| `VITE_STRAVA_CALLBACK_URL` | OAuth redirect URL (must match your Strava app settings) |

The map uses free basemaps (**Open Street Map**, **CyclOSM**) with no API keys.

### Thunderforest (optional)

| Variable | Purpose |
| --- | --- |
| `VITE_THUNDER_FOREST_API_KEY` | API key from [Thunderforest](https://www.thunderforest.com/) for the extra basemaps (Cycle Map, Landscape, Outdoors, Pioneer, Neighbourhood, Atlas). **Omit it or leave it empty if you do not use Thunderforest.** Without a key, those entries still appear in the map layer control but are disabled; the free OSM-based layers above work without it. |

## Strava API

- [Strava API reference](https://developers.strava.com/docs/reference)
- [Strava API playground](https://developers.strava.com/playground/#/)
