#!/bin/bash -e

pushd client/
./node_modules/.bin/electron-packager ../build \
  --platform=win32 \
  --arch=x64 \
  --no-prune \
  --package-manager=yarn \
  --icon=./src-main/assets/icon.ico \
  --out ../dist
popd

pushd dist/
zip -rq Sombrio-win32-x64.zip Sombrio-win32-x64/
popd
