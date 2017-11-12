#!/bin/bash -e

pushd client/
./node_modules/.bin/electron-packager ../build \
  --platform=linux \
  --arch=x64 \
  --no-prune \
  --package-manager=yarn \
  --icon=./src-main/assets/icons/1024x1024.png \
  --out ../dist
popd

pushd dist/
zip -rq Sombrio-linux-x64.zip Sombrio-linux-x64/
popd
