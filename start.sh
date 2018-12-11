#!/bin/bash
docker run --rm -p 0.0.0.0:8000:8000 --name nxweb --link nxserver:nxserver -v $PWD:/webapp -w /webapp -it node:7.9.0 npm run dev
