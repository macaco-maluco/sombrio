#!/bin/bash -e

rvm use ruby-2.3.1
brew install yarn
./scripts/install.sh
./scripts/distribute.sh
