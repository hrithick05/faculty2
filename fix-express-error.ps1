# Fix Express 5 Error - Reinstall Dependencies
Write-Host "🔧 Fixing Express 5 Error..." -ForegroundColor Cyan
Write-Host "=================================" -ForegroundColor Cyan
Write-Host ""

# Step 1: Remove node_modules and package-lock.json
Write-Host "📦 Step 1: Removing old dependencies..." -ForegroundColor Yellow
if (Test-Path "node_modules") {
    Remove-Item -Recurse -Force "node_modules"
    Write-Host "✅ Removed node_modules" -ForegroundColor Green
} else {
    Write-Host "⚠️  node_modules not found" -ForegroundColor Yellow
}

if (Test-Path "package-lock.json") {
    Remove-Item -Force "package-lock.json"
    Write-Host "✅ Removed package-lock.json" -ForegroundColor Green
} else {
    Write-Host "⚠️  package-lock.json not found" -ForegroundColor Yellow
}

Write-Host ""

# Step 2: Verify package.json has Express 4
Write-Host "📋 Step 2: Verifying package.json..." -ForegroundColor Yellow
$packageJson = Get-Content "package.json" -Raw | ConvertFrom-Json
$expressVersion = $packageJson.dependencies.express

if ($expressVersion -eq "^4.18.2") {
    Write-Host "✅ package.json has Express 4.18.2" -ForegroundColor Green
} else {
    Write-Host "❌ package.json has $expressVersion (should be ^4.18.2)" -ForegroundColor Red
    Write-Host "   Fixing package.json..." -ForegroundColor Yellow
    $packageJson.dependencies.express = "^4.18.2"
    $packageJson | ConvertTo-Json -Depth 100 | Set-Content "package.json"
    Write-Host "✅ Fixed package.json" -ForegroundColor Green
}

Write-Host ""

# Step 3: Reinstall dependencies
Write-Host "📦 Step 3: Installing dependencies with Express 4..." -ForegroundColor Yellow
Write-Host "   This may take a few minutes..." -ForegroundColor Gray
Write-Host ""

npm install

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "✅ Dependencies installed successfully!" -ForegroundColor Green
    Write-Host ""
    
    # Step 4: Verify Express version
    Write-Host "🔍 Step 4: Verifying Express version..." -ForegroundColor Yellow
    $installedVersion = npm list express 2>&1 | Select-String "express@" | Select-Object -First 1
    Write-Host "   $installedVersion" -ForegroundColor Gray
    
    Write-Host ""
    Write-Host "🎉 Fix complete! You can now run:" -ForegroundColor Green
    Write-Host "   npm run dev:full" -ForegroundColor Cyan
    Write-Host ""
} else {
    Write-Host ""
    Write-Host "❌ Installation failed. Please check the error above." -ForegroundColor Red
    Write-Host ""
}

