#!/bin/bash

export DISPLAY=:0

APP_DIR="$HOME/InteractivoMSD"
APP_URL="file://$APP_DIR/index.html"

echo "Starting InteractivoMSD kiosk..."

# Configurar touchscreen para la pantalla vertical
xinput map-to-output 10 HDMI-A-0

sleep 1

# Iniciar Firefox
exec firefox \
    --new-instance \
    --kiosk \
    "$APP_URL"