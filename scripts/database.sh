#!/bin/bash
echo 'Running Mongo container...'
docker run --name -p 5001:27017 mongo_db -d mongo
echo 'Stand by...'
docker exec -it mongo_db mongo bash