#!/bin/bash
set -e

echo "🔹 1. Cleaning up..."
rm -rf node_modules packages/*/node_modules

echo "🔹 2. Installing dependencies (npm ci)..."
npm ci

echo "🔹 3. Building project..."
npm run build

echo "🔹 4. Running tests (npm run test:ci)..."
export NO_COLOR=true
npm run test:ci

echo "🔹 5. Bundling..."
npm run bundle

echo "🔹 6. Smoke testing bundle..."
node ./bundle/gemini.js --version

echo "✅ Local CI check passed!"
