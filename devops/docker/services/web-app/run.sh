#!/usr/bin/env bash
set -e

cd /usr/src/web-app

if [[ "$NODE_ENV" == "development" ]]; then
    if [[ "$WATCH_MODE" == "true" ]]; then
        if [[ "$APP_SVC_MODE" == "normal" ]]; then
            /usr/bin/npm run web-app:launch:dev
        else
            /usr/bin/npm run web-app:launch:dev:isolated
        fi
    else
        if [[ "$APP_SVC_MODE" == "normal" ]]; then
            /usr/bin/npm run api-gw:launch:dev
        else
            /usr/bin/npm run api-gw:launch:dev:isolated
        fi
    fi
else
    /usr/bin/npm run api-gw:launch
fi
