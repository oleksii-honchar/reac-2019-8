#!/usr/bin/env bash
baseDir=${PWD}
echo $baseDir
envFile="$baseDir/../../devops/local/config/development.env"
env-cmd -f $envFile ../../devops/local/scripts/check-env-vars.sh
env-cmd -f $envFile webpack --config ./webpack.config.js --mode development
