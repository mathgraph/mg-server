#!/bin/sh
branch="develop"
if [ "$1" != "" ]
then
    branch=$1
fi
#git checkout $branch
#git fetch
#git reset --hard origin/$branch
npm install
#npm run import
#npm run front
if [ "$branch" = "master" ]
then
    pm2 restart trees-server.js
else
    pm2 restart trees-server
fi

