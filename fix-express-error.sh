#!/bin/bash

# Fix Express 5 Error - Reinstall Dependencies
echo "🔧 Fixing Express 5 Error..."
echo "================================="
echo ""

# Step 1: Remove node_modules and package-lock.json
echo "📦 Step 1: Removing old dependencies..."
if [ -d "node_modules" ]; then
    rm -rf node_modules
    echo "✅ Removed node_modules"
else
    echo "⚠️  node_modules not found"
fi

if [ -f "package-lock.json" ]; then
    rm -f package-lock.json
    echo "✅ Removed package-lock.json"
else
    echo "⚠️  package-lock.json not found"
fi

echo ""

# Step 2: Reinstall dependencies
echo "📦 Step 2: Installing dependencies with Express 4..."
echo "   This may take a few minutes..."
echo ""

npm install

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Dependencies installed successfully!"
    echo ""
    
    # Step 3: Verify Express version
    echo "🔍 Step 3: Verifying Express version..."
    npm list express 2>&1 | grep "express@"
    
    echo ""
    echo "🎉 Fix complete! You can now run:"
    echo "   npm run dev:full"
    echo ""
else
    echo ""
    echo "❌ Installation failed. Please check the error above."
    echo ""
fi

