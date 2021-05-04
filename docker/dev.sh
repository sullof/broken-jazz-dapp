#!/usr/bin/env bash

docker run -it --rm \
  --name brokenjazz-cc-dev \
  -p 6969 \
  -v $PWD:/usr/src/app \
  -v $PWD/log:/var/log/brokenjazz-cc \
  -e NODE_ENV=development \
  -e VIRTUAL_HOST=brokenjazz.cc.localhost,www.brokenjazz.cc.localhost \
  -w /usr/src/app node:12.20.0-alpine3.10 npm run start
