#!/bin/bash
# this scripts updates the repo and is meant for use in the production server
# 1. place this script at ~/update-repo.sh
# 2. use `crontab -e` and add a line `*/5 * * * * cd /path/to/repo && ~/update-repo.sh`

echo "updating repository at $(pwd)..." > ../.update-repo.sh.log;
git pull origin master --tags;
echo "done at $(date +'%Y-%m-%dT%H:%M:%S')" >> ../.update-repo.sh.log;
