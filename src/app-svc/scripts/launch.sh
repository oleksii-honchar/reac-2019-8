#!/usr/bin/env bash
# for prod ENV vars provided from outside
../../devops/local/scripts/check-env-vars.sh
node ../../dist/app-svc/bundle.js
