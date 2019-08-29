#!/bin/bash
echo 'Running Mongo container...'
docker run --name mongo_db -d mongo
echo 'Stand by...'
docker exec -it mongo_db mongo bash