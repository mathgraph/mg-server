#!/bin/sh
branch="master"
if [ "$1" != "" ]
then
    branch=$1
fi
git checkout $branch
git fetch
git reset --hard origin/$branch
npm install
#npm run import
#npm run front

if [ "$branch" = "master" ]
then
    cd mg-main-prod
    bower install
    cd ..
    pm2 startOrRestart ecosystem.json production
else
    cd mg-main 
    bower install
    cd ..
    pm2 startOrRestart ecosystem.json branch
fi
