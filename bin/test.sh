echo "## Running pre-test script"
. ./bin/pre-test.sh

echo "## Running Jest tests"
npm run jest
