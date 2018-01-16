#!/bin/bash

set -e

folder=$1

cd db_backup

tar -xvf $folder.tar

cd ..

mysql -h$TM_HOST -u$TM_USER -p$TM_PWD $TM_DB < db_backup/$folder/copenhagen.sql
