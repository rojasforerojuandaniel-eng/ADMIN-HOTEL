#!/bin/bash
# Auto-restart wrapper for Next.js dev server
cd /home/z/my-project

while true; do
  echo "$(date): Starting Next.js server..."
  node node_modules/.bin/next dev -p 3000
  EXIT_CODE=$?
  echo "$(date): Server exited with code $EXIT_CODE"
  if [ $EXIT_CODE -eq 0 ]; then
    break
  fi
  echo "$(date): Restarting in 2 seconds..."
  sleep 2
done
