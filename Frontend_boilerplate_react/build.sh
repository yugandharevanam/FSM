#!/bin/bash

# Clean previous build
rm -rf dist

# Install dependencies
npm install

# Build the project
npm run build

# Check if build was successful
if [ -d "dist" ]; then
    echo "✅ Build successful!"
    echo "📁 Build output:"
    ls -la dist/
    echo ""
    echo "📁 Assets directory:"
    ls -la dist/assets/ 2>/dev/null || echo "No assets directory found"
else
    echo "❌ Build failed!"
    exit 1
fi 