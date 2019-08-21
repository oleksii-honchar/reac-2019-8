#!/usr/bin/env bash

if [ ! -d "$DIRECTORY" ]; then
  mkdir -p ./devops/pipeline
fi

cd ./devops/pipeline

if [ "$1" = "require" ]; then
    shift 1
    ls -al $@ > /dev/null 2>&1 && exit 0
    echo "Dependencies $@ not satisfied"
    exit 1
elif [ "$1" = "success" ]; then
    touch $CI_JOB_NAME
    exit 0
fi

echo "Invalid command; must be either require or success"
exit 1
