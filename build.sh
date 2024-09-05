#!/bin/bash

# Exit immediately if a command exits with a non-zero status.
set -e

# Print commands and their arguments as they are executed.
set -x

# Install Node.js dependencies.
echo "Installing dependencies..."
npm install

# Here you can add other build steps, such as compiling TypeScript, bundling assets, etc.
# For example, if you were using a build tool or had to compile TypeScript, you might run:
# npm run build

echo "Build completed successfully."
