#!/bin/bash -e

pushd client && yarn install && popd
brew cask install xquartz
brew install wine
