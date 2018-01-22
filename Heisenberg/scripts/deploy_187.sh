#!/bin/bash

set -e

ssh root@106.75.81.187 /bin/bash << EOF
cd /opt/works/copenhagen
pwd
git co .
git pr
cd Heisenberg
npm install
yes|cp -R web/dist/* public/
pm2 restart bin/www
EOF