#!/usr/bin/env bash
set -e
apt-get update
curl -sL https://deb.nodesource.com/setup_10.x | bash -
apt-get install -y nodejs expect-dev