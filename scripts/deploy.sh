#!/bin/bash --login

set -e
curl -o- -L https://yarnpkg.com/install.sh | bash
./scripts/install.sh
./scripts/distribute.sh
