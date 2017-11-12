#!/bin/bash -e

echo -e "\n[🔨] building client code"
pushd client/ && yarn install && yarn package && popd

echo -e "\n[📦] preparing to package"
rm -rf build/
mkdir build
cp -r client/dist build/dist
cp -r client/src-main build/src-main
cp client/package.json build/
cp client/yarn.lock build/

echo -e "\n[🔨] set environment to production"
sed -i.bak -- 's/process\.env\.NODE_ENV/"production"/g' ./build/src-main/env.js
rm ./build/src-main/env.js.bak

echo -e "\n[🔨] installing dependencies"
pushd build/
yarn install
rm -rf src/ sagui.config.js .sagui/
popd

echo -e "\n[🔨] compile native apps"
rm -rf dist/
pushd client/
./node_modules/.bin/electron-packager ../build --platform=darwin,linux,win32 --arch=x64 --no-prune --package-manager=yarn --out ../dist
popd

echo -e "\n[🗜] zipping binaries"
pushd dist/
zip -r Sombrio-darwin-x64.zip Sombrio-darwin-x64/
zip -r Sombrio-linux-x64.zip Sombrio-linux-x64/
zip -r Sombrio-win32-x64.zip Sombrio-win32-x64/
popd

echo -e "\n🚢 ship it!"
