[![CircleCI](https://circleci.com/gh/suricat89/nlw-heat-api/tree/master.svg?style=shield)](https://circleci.com/gh/suricat89/nlw-heat-api/tree/master)
[![Coverage Status](https://coveralls.io/repos/github/suricat89/nlw-heat-api/badge.svg?branch=master)](https://coveralls.io/github/suricat89/nlw-heat-api?branch=master)

# NLW Heat API
API developed during Rocketseat NLW#Heat event.

This API is the back end for both the React front end and the React Native app.

It's a simple app where users can send messages and see it in a feed-like page being updated in real time.

It has the following features:
- Github OAuth and easy user registration using just Github data
- Socket communication for real time update on listeners when a message is received


## Tech Stack
- Typescript
- PostgreSQL (using Prisma ORM)
- ExpressJS + Socket.io
- Jest
- Docker Compose (for ease of Development/Tests)


## Check it out!
https://suricat-nlw-heat-api.herokuapp.com/docs/


## How to run it
Install packages and copy the example env files
```bash
nvm use 14
npm install
cp .env.example .env.development
cp .env.example.debug .env.development.debug
```
They are basically the same file, but the `.env.development` will be used to run the app on any terminal, while `.env.development.debug` will be used to debug it on VSCode.

You will need to create a Github OAuth ID and Secret for both React and React Native front ends, if you wish to test them locally (instructions below).

After all envs are set, just run
```bash
source .env.development
sudo docker-compose up

# run it in production mode
npm run build
npm start

# OR run in development mode
npm run dev
```

Or, if you prefer, just debug it in VSCode using the `Debug App` task


### Creating Github OAuth apps
Github -> Settings -> Developer Settings -> OAuth Apps

For the **React** frontend, create a new OAuth App with both "Homepage URL" and "Authorization callback URL" as:
```
http://localhost:3000
```
Update .env file values for `WEB_GITHUB_OAUTH_ID` and `WEB_GITHUB_OAUTH_SECRET`


For the **React Native** app, create a new OAuth App with both "Homepage URL" and "Authorization callback URL" as:
```
https://auth.expo.io/@your.github.username/nlw-heat-app
```
Update .env file values for `MOBILE_GITHUB_OAUTH_ID` and `MOBILE_GITHUB_OAUTH_SECRET`


## Tests
```bash
sudo docker-compose up
npm test
```