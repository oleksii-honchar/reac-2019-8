#!/usr/bin/env bash

BLUE='\033[0;34m'
LBLUE='\033[1;36m'
RED='\033[0;31m'
GREEN='\033[0;32m'
NC='\033[0m' # No Color

source ./devops/definitions.sh
source ./devops/docker/scripts/get-latest-version.s

printf "${LBLUE}Check version and push if latest${NC}\n"

res=$(./devops/ci/scripts/pipeline-dependency.sh require build-and-push)

if ! $res; then
    printf "${RED}$res${NC}\n"
    printf "${LBLUE}Aborting${NC}\n"
    exit 0
fi

echo 'Checking versions...'

if [[ -r "./devops/version/latest" ]] ; then
    source "./devops/version/latest"

    compareRes=$(./devops/ci/scripts/semver.sh compare ${LATEST_VERSION} ${VERSION})

    if [[ $compareRes -lt 0 ]] ; then
        echo "LATEST_VERSION=${VERSION}" > ./devops/version/latest
        echo "LATEST_VERSION=${VERSION}"
        echo "Pushing latest image ..."
        docker tag ${IMAGE_NAME}:${VERSION} ${IMAGE_NAME}:latest
        docker push ${IMAGE_NAME}:latest
    else
        echo "current VERSION=${VERSION}"
        echo "LATEST_VERSION=${LATEST_VERSION}"
        echo "no push needed"
    fi
else
    echo "saving latest version first time..."
    mkdir -p ./devops/version
    echo "LATEST_VERSION=${VERSION}"
    echo "LATEST_VERSION=${VERSION}" > ./devops/version/latest
    echo "Pushing latest image ..."
    docker tag ${IMAGE_NAME}:${VERSION} ${IMAGE_NAME}:latest
    docker push ${IMAGE_NAME}:latest
fi

printf "${LBLUE}Done${NC}\n"