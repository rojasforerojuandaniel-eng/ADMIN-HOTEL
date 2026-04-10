#!/bin/bash
# Script para iniciar el servidor Rhynode PMS
# Ejecutar cada vez que se quiera usar la aplicación

cd /home/z/my-project/public

# Matar procesos anteriores
pkill -f "http.server 3000" 2>/dev/null
sleep 1

# Iniciar servidor
python3 -m http.server 3000 --bind 0.0.0.0 &

# Keep-alive
while true; do
  sleep 5
  curl -s http://localhost:3000 > /dev/null 2>&1
done
