#!/usr/bin/env bash

# Set up the project from scratch and get it running locally for development.

source ./scripts/utility-functions.sh

set -eo pipefail  # exit immediately when any command fails
set -o nounset    # treat unset variables as an error

if [[ "${0}" != "scripts/setup.sh" ]]; then
  echo "ERROR: You must invoke this script only from the root directory of the project."
  exit 1
fi

echo
echo "Setting up..."
echo

generate_skeleton_env_file ".env"

echo
echo "Creating persistent data volume for Postgres..."
docker volume create --name=data

echo
echo "Building the Docker services..."
docker-compose build

echo
echo "Migrating the database..."
docker-compose run web npm run migrate

echo
echo "cleaning the build folder..."
docker-compose run web npm run heroku-prebuild

cho
echo "build the webpack..."
docker-compose run web npm run heroku-postbuild

echo
echo "Initial setup complete."
echo
echo "Next steps:"
echo
echo "1. Open the .env.development file and compare it to src/main/resources/env/.env.sample"
echo "   Ensure you have the correct values for all the necessary environment"
echo "   variables.  For keys and secrets, ask another developer on the team."
echo
echo "2. Repeat step 1 for .env.local"
echo
echo "3. Try running the test suite yourself:"
echo
echo "   docker-compose run web yarn test"
echo
echo "4. Start the server, and start coding!"
echo
echo "   docker-compose up --build"
echo
