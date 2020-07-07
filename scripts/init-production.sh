#!/bin/bash
# this file makes a copy of ./deploy/docker-compose.yml and interactively allows
# the user to enter in the production secrets

PRODUCTION_DOCKER_COMPOSE_PATH=./docker-compose.yml;

function set_variable {
  VAR_TO_SET=${1}
  printf -- "value for ${VAR_TO_SET}: ";
  read ${VAR_TO_SET};
  echo "setting ${VAR_TO_SET} to \"${!VAR_TO_SET}\"";
  sed --in-place "s|${VAR_TO_SET}\: .*|${VAR_TO_SET}\: ${!VAR_TO_SET}|g" ${PRODUCTION_DOCKER_COMPOSE_PATH};
}

cp ./deploy/docker-compose.yml ${PRODUCTION_DOCKER_COMPOSE_PATH};
set_variable MYSQL_USER;
set_variable MYSQL_PASSWORD;
set_variable MYSQL_DATABASE;
set_variable GITHUB_CLIENT_ID;
set_variable GITHUB_CLIENT_SECRET;
set_variable GITHUB_REDIRECT_URI;
set_variable LOGIN_URL;
