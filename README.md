[![CircleCI](https://circleci.com/gh/suricat89/nlw-heat-api/tree/master.svg?style=svg)](https://circleci.com/gh/suricat89/nlw-heat-api/tree/master)

[![CircleCI](./jest/badges/badge-statements.svg)](https://circleci.com/gh/suricat89/nlw-heat-api/tree/master)
[![CircleCI](./jest/badges/badge-lines.svg)](https://circleci.com/gh/suricat89/nlw-heat-api/tree/master)
[![CircleCI](./jest/badges/badge-functions.svg)](https://circleci.com/gh/suricat89/nlw-heat-api/tree/master)
[![CircleCI](./jest/badges/badge-branches.svg)](https://circleci.com/gh/suricat89/nlw-heat-api/tree/master)

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
- CircleCI