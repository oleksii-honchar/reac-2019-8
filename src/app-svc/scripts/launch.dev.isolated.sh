#!/usr/bin/env bash
envFile="../../devops/local/config/development.isolated.env"

env-cmd -f $envFile ./scripts/kill-node-zombies.sh

env-cmd -f $envFile ../../devops/local/scripts/check-env-vars.sh
env-cmd -f $envFile nodemon --inspect ./src/index.dev.js
