#!/bin/bash
cd /home/z/my-project/public
while true; do
  python3 -m http.server 3000 --bind 0.0.0.0
  echo "Server stopped, restarting in 2s..."
  sleep 2
done
