#!/bin/bash
# this scripts updates the repo and is meant for use in the production server
# to deploy this, run the following in the api server as the user `codeprac`
#   (crontab -l 2>/dev/null; echo '*/5 * * * * cd /home/codeprac/src && make update_repo') | crontab -;

echo "updating repository at $(pwd)..." > .update-repo.sh.log;
git pull origin master --tags;
echo "done at $(date +'%Y-%m-%dT%H:%M:%S')" >> .update-repo.sh.log;
