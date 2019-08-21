#--- BASE ---
FROM phusion/baseimage:0.11 AS base
EXPOSE 80
CMD ["/sbin/my_init"]

RUN mkdir -p /usr/src/web-app/dist
WORKDIR /usr/src/web-app
COPY ./devops/definitions.sh ./devops/definitions.sh

#--- NGINX ---
RUN mkdir /etc/service/nginx
COPY ./devops/docker/services/nginx/run.sh /etc/service/nginx/run
RUN chmod +x /etc/service/nginx/run
COPY ./devops/docker/services/nginx/install.sh ./devops/docker/services/nginx/install.sh
RUN ./devops/docker/services/nginx/install.sh
COPY ./devops/docker/services/nginx/config /etc/nginx

#--- WEB-APP ---
ARG NPM_REGISTRY
ARG NPM_REGISTRY_TOKEN
RUN mkdir /etc/service/web-app
COPY ./devops/docker/services/web-app/run.sh /etc/service/web-app/run
RUN chmod +x /etc/service/web-app/run
COPY ./devops/docker/services/web-app ./devops/docker/services/web-app
RUN ./devops/docker/services/web-app/install.sh

#--- DEPS INSTALL ---
#--- DEPS ---
FROM base AS deps
ARG NPM_REGISTRY
ARG NPM_REGISTRY_TOKEN
ENV npm_config_cache=/cache/npm
VOLUME npm-cache:/cache/npm
RUN mkdir -p /tmp/src/app-svc && mkdir -p /tmp/src/app
COPY package.json /tmp/package.json
COPY package-lock.json /tmp/package-lock.json
COPY ./src/app-svc/package.json /tmp/src/app-svc/package.json
COPY ./src/app-svc/package-lock.json /tmp/src/app-svc/package-lock.json
COPY ./src/app/package.json /tmp/src/app/package.json
COPY ./src/app/package-lock.json /tmp/src/app/package-lock.json
COPY ./devops /tmp/devops
WORKDIR /tmp
RUN npm set progress=false && npm config set depth 0 && \
    npm run web-app:install

#--- WEB-APP ---
FROM base AS release
COPY . .

#--- BUILD ---
FROM release AS build
ARG LINT_WEB_APP
COPY --from=deps /tmp .
RUN if [ "$LINT_WEB_APP" = "true" ]; then npm run web-app:lint; fi
RUN npm run app:build
RUN rm -rf ./src/app/node_modules
RUN npm run app-svc:build
RUN rm -rf ./src/app-svc/node_modules

#--- RELEASE ---
FROM release AS final
RUN npm i
COPY --from=build /usr/src/web-app/dist ./dist
