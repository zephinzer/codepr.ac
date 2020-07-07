#!/bin/bash
# this script is meant to be run on the server where codeprac is deployed

set -euo pipefail;

#################
# configuration #
#################

USERNAME=codeprac;
API_IMAGE_URI='zephinzer/codeprac-api:latest';
UI_IMAGE_URI='zephinzer/codeprac-ui:latest';

##############
# update api #
##############

echo "updating service at $(date +'%Y-%m-%dT%H:%M:%S')" > /var/log/update-service.log;
API_HASH_EXISTING="$(docker inspect ${API_IMAGE_URI} --format '{{index .RepoDigests 0}}' | cut -d ':' -f 2)";
docker pull ${API_IMAGE_URI};
API_HASH_LATEST="$(docker inspect ${API_IMAGE_URI} --format '{{index .RepoDigests 0}}' | cut -d ':' -f 2)";
if [ "${API_HASH_EXISTING}" != "${API_HASH_LATEST}" ]; then
  cd /home/${USERNAME}/src && make deploy_production;
fi;
echo "${API_IMAGE_URI}|${API_HASH_LATEST}" >> /var/log/update-service.log;

#############
# update ui #
#############

UI_HASH_EXISTING="$(docker inspect ${UI_IMAGE_URI} --format '{{index .RepoDigests 0}}' | cut -d ':' -f 2)";
docker pull ${UI_IMAGE_URI};
UI_HASH_LATEST="$(docker inspect ${UI_IMAGE_URI} --format '{{index .RepoDigests 0}}' | cut -d ':' -f 2)";
if [ "${UI_HASH_EXISTING}" != "${UI_HASH_LATEST}" ]; then
  cd /home/${USERNAME}/src && make deploy_production;
fi;
echo "${UI_IMAGE_URI}|${UI_HASH_LATEST}" >> /var/log/update-service.log;
