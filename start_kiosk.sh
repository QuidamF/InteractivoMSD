#!/bin/bash

export DISPLAY=:0

APP_DIR="$HOME/InteractivoMSD"
APP_URL="file://$APP_DIR/index.html"

echo "Starting InteractivoMSD kiosk..."

# Cerrar Firefox anterior
pkill -f "firefox.*InteractivoMSD" 2>/dev/null

sleep 1

# Abrir Firefox
firefox \
    --new-instance \
    --kiosk \
    "$APP_URL" &

echo "Kiosk started."