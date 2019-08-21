#!/usr/bin/env bash
set -e

apt-get update && apt-get install -y \
    software-properties-common build-essential zlib1g-dev \
    wget mc curl

mkdir -p /tmp && cd /tmp
wget http://nginx.org/keys/nginx_signing.key
apt-key add nginx_signing.key
echo "deb http://nginx.org/packages/ubuntu/ xenial nginx
deb-src http://nginx.org/packages/ubuntu/ xenial nginx" >> /etc/apt/sources.list
apt-get remove nginx-common
apt-get update
apt-get install nginx
ln -sf /dev/stdout /var/log/nginx/access.log
ln -sf /dev/stderr /var/log/nginx/error.log
rm /etc/nginx/conf.d/default.conf

apt-get clean
rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*
