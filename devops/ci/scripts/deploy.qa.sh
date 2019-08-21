#!/usr/bin/env bash
source ./devops/definitions.sh
source ./devops/ci/scripts/get-latest-version.sh

cfgPath=$SERVER_DEPLOY_PATH/devops/docker/docker-compose/qa.yml

docker-compose -f $cfgPath stop $CONTAINER_NAME
docker pull "$IMAGE_NAME:$VERSION"
docker tag "$IMAGE_NAME:$VERSION" "$IMAGE_NAME:latest"
docker-compose -f $cfgPath up --remove-orphans -d $CONTAINER_NAME
