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

./scripts/packageMac.sh
./scripts/packageLinux.sh
./scripts/packageWindows.sh

echo -e "\n🚢 ship it!"
