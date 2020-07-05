#!/bin/bash

function set_variable {
  VAR_TO_SET=${1}
  printf -- "value for ${VAR_TO_SET}: ";
  read ${VAR_TO_SET};
  echo "setting ${VAR_TO_SET} to \"${!VAR_TO_SET}\"";
  sed -i '' "s|${VAR_TO_SET}\: .*|${VAR_TO_SET}\: ${!VAR_TO_SET}|g" ./deploy/docker-compose.deploy.yml;
}

cp -r ./deploy/docker-compose.yml ./deploy/docker-compose.deploy.yml;
set_variable MYSQL_USER;
set_variable MYSQL_PASSWORD;
set_variable MYSQL_DATABASE;
set_variable GITHUB_CLIENT_ID;
set_variable GITHUB_CLIENT_SECRET;
set_variable GITHUB_REDIRECT_URI;
set_variable LOGIN_URL;
