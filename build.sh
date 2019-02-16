#!/bin/bash
BASE_D=$(realpath "${BASH_SOURCE%/*}")

CMD=$1
shift

case "$CMD" in
  prepare)
    CMD="npm install --no-bin-links"
    ;;
  shell)
    CMD="/bin/bash"
    ;;
  "")
    CMD="webpack"
    ;;
esac

sudo docker run --rm -it -u 1000 -v "$BASE_D":/app jmfirth/webpack $CMD "$@"
