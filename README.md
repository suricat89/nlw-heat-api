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