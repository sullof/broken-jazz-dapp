#!/usr/bin/env bash

host=brokenjazz-cc

if [[ $1 != '' ]]; then
  host=$1
fi

docker exec -it $host bash
