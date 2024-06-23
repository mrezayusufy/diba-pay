#!/bin/bash
timestamp=$(date +"%Y-%m-%d")
 
ARCHIVE_NAME="dibapay-$timestamp.tar.gz"
tar --exclude='./node_modules' --exclude='./.next' --exclude="./.git" --exclude="./.vscode" -czvf $ARCHIVE_NAME .

DATE=`date "+%Y%m%d"`
echo "Archive created successfully: $ARCHIVE_NAME  "
