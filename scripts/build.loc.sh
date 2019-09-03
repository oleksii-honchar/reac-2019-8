#!/usr/bin/env bash
envFile="$PWD/devops/local/config/development.env"
env-cmd -f $envFile "$PWD/devops/local/scripts/check-env-vars.sh"

source $envFile

env-cmd -f $envFile \
    webpack \
        --config ./configs/webpack.config.js \
        --mode development \
        --env.BUILD_ANALYZE=$BUILD_ANALYZE
        --progress
