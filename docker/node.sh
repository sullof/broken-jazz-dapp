#!/usr/bin/env bash

docker stop brokenjazz-cc
docker rm brokenjazz-cc

docker run -d \
  --name brokenjazz-cc \
  -p 6969 \
  --restart unless-stopped \
  -v $PWD:/usr/src/app \
  -v /vol/log/brokenjazz-cc_app:/var/log/brokenjazz-cc_app \
  -e NODE_ENV=production \
  -e VIRTUAL_HOST=brokenjazz.cc,www.brokenjazz.cc \
  -e LETSENCRYPT_HOST=brokenjazz.cc,www.brokenjazz.cc \
  -e LETSENCRYPT_EMAIL=brokenjazz@sullo.co \
  -w /usr/src/app node:12.20.0-alpine3.10 npm run start
