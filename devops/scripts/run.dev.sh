#!/usr/bin/env bash
source ./devops/definitions.sh
source ./devops/local/scripts/load-env.sh
source ./devops/docker/scripts/login-to-registry.sh

docker-compose -f ./devops/docker/docker-compose/development.yml down
docker-compose -f ./devops/docker/docker-compose/development.yml up
