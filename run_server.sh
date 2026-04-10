#!/bin/bash
cd /home/z/my-project/public
while true; do
  python3 -m http.server 3000 --bind 0.0.0.0 2>&1
  echo "Server crashed, restarting..."
  sleep 1
done
