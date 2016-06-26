#!/usr/bin/env bash

echo "## build docker container"
docker-compose build

echo "## stop docker container"
docker-compose down

echo "## run docker container"
docker-compose up -d

echo "## remove dangling docker images"
docker rmi $(docker images --quiet --filter 'dangling=true')

exit 0

