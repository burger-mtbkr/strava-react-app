# Strava App

**Overview:**

Basic React TypeScript app pulling data from Strava

**Tech stack:**
- [Yarn](https://yarnpkg.com/)
- React TypeScript
- [Material UI](https://mui.com/getting-started/installation/)
- React Testing Library
- [Redux Toolkit](https://redux-toolkit.js.org/) - used for local app state like modal open/closed, selected rows etc.
- [Redux Saga](https://redux-saga.js.org/).
- [React Google Maps](https://tomchentw.github.io/react-google-maps/#installation)
- [Github Actions](https://github.com/features/actions) for running checks - CI workflow can be seen [here](https://github.com/loanburger/products-redux-saga/blob/main/.github/workflows/build_test_react.yml)

**Instructions:**

1. You will need to have a configured app in strava to get you OAuth Info.
2. Once you have this setup, create a new folder called `environments` under the project folder folder.
3. Add a new file to the `environments` folder called `.dev.env`  
4. Add the following environmental variables to the file:
5. Save :wink:
```
REACT_APP_STRAVA_CLIENT_ID=your_client_id
REACT_APP_STRAVA_CLIENT_SECRET=your_client_secret
REACT_APP_STRAVA_CALLBACK_URL=http://localhost:3000
REACT_APP_GOOGLE_API_KEY=your_google_api_key
```

**Running the app**:
1. Run `yarn install`
2. Run `yarn start:dev`

**Testing the app:**
1. `Run yarn test` or
2. `Run yarn watch` or
3. `Run test:coverage` or
4. `Run test:premerge`

**Preview:**

![](./Screenshot.png)

**Strava Api documentation:**
- [React Google Maps Style Guide](https://tomchentw.github.io/react-google-maps/)
- [Strava API V3 API and SDK Reference](https://developers.strava.com/docs/reference)
- [Strava Swagger Playground](https://developers.strava.com/playground/#/)


