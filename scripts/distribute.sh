#!/bin/bash -e

echo -e "\n[🔨] building client code"
pushd client/ && yarn package && popd

echo -e "\n[📦] preparing to package"
rm -rf build/
mkdir build
cp -r client/dist build/dist
cp -r client/src-main build/src-main
cp client/package.json build/

echo -e "\n[🔨] set environment to production"
sed -i.bak -- 's/process\.env\.NODE_ENV/"production"/g' ./build/src-main/index.js
rm ./build/src-main/index.js.bak

echo -e "\n[🔨] installing dependencies"
pushd build/ && yarn install --prod && popd

echo -e "\n[🔨] compile native apps"
rm -rf dist/
pushd client/
./node_modules/.bin/electron-packager ../build --all --out ../dist
popd

echo -e "\n🚢 ship it!"
