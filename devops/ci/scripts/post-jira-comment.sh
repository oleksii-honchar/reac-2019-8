#!/usr/bin/env bash

source ./devops/definitions.sh
source ./devops/ci/scripts/get-latest-version.sh

msg1=$(echo $CI_COMMIT_MESSAGE | sed s/\'/@/g)
branchName=$(echo $msg1 | awk '{split($0,a,"@"); print a[2]}')
ISSUE_ID=${branchName##*/}

printf "ISSUE_ID: $ISSUE_ID \n"

if [[ $ISSUE_ID =~ ^[A-Z]{1,9}-[0-9]{1,4}$ ]] ; then
    curl \
       -D- \
       -u $JIRA_USER:$JIRA_PWD \
       -X POST \
       --data "{ \"body\": \"{color:#14892c}*$CONTAINER_NAME@$VERSION*{color}\"}" \
       -H "Content-Type: application/json" \
       https://jira.ciklum.net/rest/api/2/issue/$ISSUE_ID/comment
else
    echo "No issue id was detected. Skip post to jira."
fi

