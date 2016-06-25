#!/usr/bin/env bash

TMPDIR="tmp"

GITREPOURL="https://github.com/ReneCode/epl-translate"

# get the last part of the url => that is the folder
IFS='/' read -a arr <<< "$GITREPOURL"
GITREPO=${arr[ ${#arr[@]} -1]}


if [ ! -d $TMPDIR ]
then
	echo create $TMPDIR
	mkdir $TMPDIR
fi
cd $TMPDIR




if [ ! -d $GITREPO ]
then		
	echo "## clone git repo"
	git clone $GITREPOURL
	cd $GITREPO
else
	echo "## pull git repo"
	cd $GITREPO
	git pull $GITREPOURL
fi


echo "## stop docker container"
docker-compose down

echo "## build docker container"
docker-compose build

echo "## run docker container"
docker-compose up -d



