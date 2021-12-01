echo "## Setting test envs"
. ./.env.test

echo "## Executing database migrations"
npm run runMigrations

echo "## Running pre-test scripts"
ts-node jest/jest.pretest.ts

