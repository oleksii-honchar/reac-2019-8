#!/usr/bin/env bash

#For zombie process problem, auto kill previous app-svc process / this solution is cross platform
node -e "process.exit(0) || process.exit(1)" && echo "Killing on port: $APP_SVC_PORT" && npx cross-port-killer $APP_SVC_PORT
