#!/usr/bin/env bash
set -euo pipefail

BLUE='\033[0;34m'
LBLUE='\033[1;36m'
RED='\033[0;31m'
GREEN='\033[0;32m'
NC='\033[0m' # No Color

source ./devops/definitions.sh
source ./devops/ci/scripts/get-latest-version.sh

printf "${LBLUE}Restart docker-compose via ssh${NC}\n"

cfgPath=$SERVER_DEPLOY_PATH/devops/docker/docker-compose.stage.yml

vars="export REGISTRY_USER=$DOCKER_REGISTRY_USER  REGISTRY_PWD=$DOCKER_REGISTRY_PWD;"

dockerCmd="
cd $SERVER_DEPLOY_PATH && \
./devops/ci/scripts/check-free-space.sh && \
docker-compose -f $cfgPath stop $CONTAINER_NAME && \
docker pull $IMAGE_NAME:$VERSION && \
docker tag $IMAGE_NAME:$VERSION $IMAGE_NAME:latest && \
docker-compose -f $cfgPath up --remove-orphans -d $CONTAINER_NAME
"

cmd="$vars $dockerCmd"

echo $cmd

ssh -p 8822 "gitlab-runner@${HOSTNAME_STAGE}" $cmd

printf " ${LBLUE}All steps completed${NC}\n"

