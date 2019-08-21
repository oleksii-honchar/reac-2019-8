#!/usr/bin/env bash

set -euo pipefail

source ./devops/definitions.sh
source ./devops/ci/scripts/get-latest-version.sh

if [[ -n "${CI_COMMIT_REF_NAME-}" ]] ; then
    # build by gitlab-runner
    ./devops/local/scripts/check-env-vars.sh

    docker build -f "./devops/docker/Dockerfile" \
        --build-arg NPM_REGISTRY \
        --build-arg NPM_REGISTRY_TOKEN \
        --build-arg LINT_WEB_APP \
        --force-rm=true \
        -t="$IMAGE_NAME:$VERSION" .

else
    # local build
    source ./devops/local/scripts/load-env.sh
    ./devops/local/scripts/check-env-vars.sh

    docker build -f "./devops/docker/Dockerfile" \
        --build-arg NPM_REGISTRY \
        --build-arg NPM_REGISTRY_TOKEN \
        --build-arg LINT_WEB_APP \
        --force-rm=true \
        -t="$IMAGE_NAME:$VERSION" \
        -t="$IMAGE_NAME:latest" .
fi

