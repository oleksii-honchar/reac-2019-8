#!/usr/bin/env bash
envFile="../../devops/local/config/production.local.env"

env-cmd -f $envFile ./scripts/kill-node-zombies.sh
env-cmd -f $envFile ../../devops/local/scripts/check-env-vars.sh
env-cmd -f $envFile node ../../dist/app-svc/bundle.js
