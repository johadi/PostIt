#!/usr/bin/env bash

set -eo pipefail  # exit immediately when any command fails
set -o nounset    # treat unset variables as an error

docker-compose build web
docker-compose up -d web
