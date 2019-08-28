#!/bin/bash
echo 'Removing the older version of the image.'
docker rmi -f strictab:latest
echo 'Building the image. Please stand by.'
docker build -t strictab .
echo 'Done!'