#!/bin/bash
# this scripts updates the repo and is meant for use in the production server

echo "updating repository at $(pwd)..." > .update-repo.sh.log;
git pull origin master --tags;
echo "done at $(date +'%Y-%m-%dT%H:%M:%S')" >> .update-repo.sh.log;
