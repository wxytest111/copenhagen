#!/bin/bash

set -e

#env=$1

now=$(date +%Y%m%d%H)

echo "$now"

path=/opt/backup/$now
if [ ! -d $path ]; then
  mkdir -p $path
fi

mysqldump -h$TM_HOST -u$TM_USER -p$TM_PWD $TM_DB > $path/copenhagen.sql

