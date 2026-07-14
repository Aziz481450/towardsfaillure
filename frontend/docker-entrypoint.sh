#!/bin/sh
set -e

if [ -n "$VITE_API_URL" ]; then
  sed -i "s|__VITE_API_URL__|$VITE_API_URL|g" /usr/share/nginx/html/index.html
fi

exec nginx -g "daemon off;"
