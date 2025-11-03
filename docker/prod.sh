#!/usr/bin/env bash

docker rm -f brokenjazz-cc

docker run \
  --name brokenjazz-cc \
  --restart unless-stopped \
  -e NODE_ENV=production \
  -e VIRTUAL_HOST=brokenjazz.cc \
  -v $PWD/dist:/usr/share/nginx/html:ro -d nginx


# docker stop francescosullo-com
# docker rm francescosullo-com

# docker run --name francescosullo-com \
#   -p 8040 \
#   --restart unless-stopped \
#   -e VIRTUAL_HOST=francescosullo.com,www.francescosullo.com \
#   -e LETSENCRYPT_HOST=francescosullo.com,www.francescosullo.com \
#   -e LETSENCRYPT_EMAIL=francescosullo@sameteam.co \
#   -v `pwd`/francescosullo.com/html:/usr/share/nginx/html:ro -d nginx
