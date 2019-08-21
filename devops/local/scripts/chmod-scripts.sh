#!/usr/bin/env bash
BLUE='\033[0;34m'
LBLUE='\033[1;36m'
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW=$(tput setaf 3)
NC='\033[0m' # No Color

function chmodFile () {
    if [ ! -f ${1} ]; then
        printf "${YELLOW}${1} not found${NC}\n";
        return
    fi

    printf "chmod +x ${1}";

    if chmod +x ${1}; then
        printf " ${GREEN}[OK]${NC}\n";
    else
        printf " ${RED}[Error]${NC}\n";
    fi
}

printf "${LBLUE}Gonna make all this scripts executable ...${NC}\n";

currDir="$(pwd)"
printf "Base dir: $currDir\n";

chmodFile devops/scripts/build.sh
chmodFile devops/scripts/run.sh
chmodFile devops/scripts/run.dev.sh
chmodFile devops/scripts/run.dev.isolated.sh
chmodFile devops/scripts/run-service.sh

chmodFile devops/local/scripts/load-env.sh
chmodFile devops/local/scripts/check-env-vars.sh

chmodFile devops/ci/scripts/bump-version.sh
chmodFile devops/ci/scripts/check-free-space.sh
chmodFile devops/ci/scripts/deploy.prod.sh
chmodFile devops/ci/scripts/deploy.qa.sh
chmodFile devops/ci/scripts/deploy.stage.sh
chmodFile devops/ci/scripts/get-latest-version.sh
chmodFile devops/ci/scripts/login-to-git.sh
chmodFile devops/ci/scripts/pipeline-dependency.sh
chmodFile devops/ci/scripts/post-jira-comment.sh
chmodFile devops/ci/scripts/semver.sh

chmodFile devops/docker/scripts/cleanup.sh
chmodFile devops/docker/scripts/connect-bash.sh
chmodFile devops/docker/scripts/login-to-registry.sh
chmodFile devops/docker/scripts/pull-image.sh
chmodFile devops/docker/scripts/push-image.sh
chmodFile devops/docker/scripts/push-latest-image.sh
chmodFile devops/docker/scripts/rm-all.sh
chmodFile devops/docker/scripts/rm-all-volumes.sh
chmodFile devops/docker/scripts/run-bash.dev.sh
chmodFile devops/docker/scripts/run-bash.sh
chmodFile devops/docker/scripts/soft-cleanup.sh
chmodFile devops/docker/scripts/stop-all.sh

chmodFile devops/docker/services/nginx/install.sh
chmodFile devops/docker/services/nginx/run.sh
chmodFile devops/docker/services/web-app/install.sh
chmodFile devops/docker/services/web-app/run.sh

printf "${LBLUE}Done${NC}\n";
