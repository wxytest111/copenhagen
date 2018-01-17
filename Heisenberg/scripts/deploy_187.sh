#!/bin/bash

set -e

ssh root@106.75.81.187 /bin/bash << EOF
cd /root/copenhagen
pwd
git co .
git pr
cd Heisenberg
cp -R web/dist/* public/
pm2 restart bin/www
EOF