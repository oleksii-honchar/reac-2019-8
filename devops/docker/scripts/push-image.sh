#!/usr/bin/env bash
set -e

source ./devops/definitions.sh
source ./devops/ci/scripts/get-latest-version.sh

bash ./devops/docker/scripts/login-to-registry.sh && \
docker push $IMAGE_NAME:$VERSION