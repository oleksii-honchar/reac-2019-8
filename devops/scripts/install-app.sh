#!/usr/bin/env bash

if [[ -z "${NPM_REGISTRY}" ]] || [[ -z "${NPM_REGISTRY_TOKEN}" ]] ; then
    source ./devops/local/scripts/load-env.sh
fi

npm config set @ciklum:registry "https://${NPM_REGISTRY}"
npm config set "//${NPM_REGISTRY}/:_authToken" $NPM_REGISTRY_TOKEN

cd ./src/app
npm install
