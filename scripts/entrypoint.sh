#!/usr/bin/env bash

source /.env

if [[ $# -eq 0 ]] ; then
    echo "$0: Please specify a command for the entrypoint script" && exit 1
elif [[ $1 == "migrate" ]]; then
    echo "$0: migrating..."
    exec npm run migrate
elif [[ $1 == "run" ]]; then
    echo "$0: starting..."
    exec npm run start
elif [[ $1 == "npm" ]]; then
    echo "$0: $@"
    exec $@
else
    echo "$0: unknown command -[$1]-" && exit 1
fi
