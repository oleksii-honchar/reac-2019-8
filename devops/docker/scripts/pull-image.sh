#!/usr/bin/env bash
./devops/docker/scripts/login-to-registry.sh
source ./devops/definitions.sh

docker pull $IMAGE_NAME
