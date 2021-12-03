if [ -f ".env.test" ]; then
  . ./.env.test
fi

echo "## Executing database migrations"
npm run runMigrations

echo "## Running pre-test scripts"
ts-node jest/jest.pretest.ts
