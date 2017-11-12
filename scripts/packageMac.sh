#!/bin/bash -e

pushd client/
./node_modules/.bin/electron-packager ../build \
  --platform=darwin \
  --arch=x64 \
  --no-prune \
  --package-manager=yarn \
  --icon=./src-main/assets/icon.icns \
  --out ../dist
popd

pushd dist/
zip -rq Sombrio-darwin-x64.zip Sombrio-darwin-x64/
popd
