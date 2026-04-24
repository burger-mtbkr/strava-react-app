# Strava React App

This app now uses Vite for local development and production builds.

## Scripts

- `npm run dev` / `npm start`: Start Vite dev server.
- `npm run build`: Create a production build with Vite.
- `npm run preview`: Preview the production build locally.
- `npm test`: Run unit/integration tests with Jest.
- `npm run test:coverage`: Run Jest with coverage thresholds enabled.
- `npm run e2e`: Run Playwright critical-flow tests.
- `npm run coverage:critical-flows`: Validate critical-flow scenario coverage gate.
- `npm run validate`: Run lint + unit coverage + critical-flow gate.

## Environment Variables

Vite requires client-side environment variables to use the `VITE_` prefix.  
Define them in `environments/.env.local` or `environments/.env.development`.

Required keys:

- `VITE_STRAVA_CLIENT_ID`
- `VITE_STRAVA_CLIENT_SECRET`
- `VITE_STRAVA_CALLBACK_URL`
- `VITE_STRAVA_BASE_MAP_TOKEN`
- `VITE_THUNDER_FOREST_API_KEY`
