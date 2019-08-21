#!/usr/bin/env bash
envFile="$PWD/../../devops/local/config/development.env"
env-cmd -f $envFile "$PWD/../../devops/local/scripts/check-env-vars.sh"

source $envFile

if [ $SSR = true ]; then
    env-cmd -f $envFile webpack --config ./webpack.config.js --mode development --progress &\
    env-cmd -f $envFile webpack --config ./webpack.config.ssr.js --mode development --progress
else
    env-cmd -f $envFile webpack --config ./webpack.config.js --mode development --progress
fi


