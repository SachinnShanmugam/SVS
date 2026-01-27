# SVS Website - Gallery Updater
# This script scans assets/products subfolders and updates js/script.js

$siteRoot = Resolve-Path "$PSScriptRoot\.."
$assetsPath = Join-Path $siteRoot "assets\products"
$scriptJsPath = Join-Path $siteRoot "js\script.js"

Write-Host "Scanning images in $assetsPath..."

# Initialize data structure
$galleryData = @{}
$folders = Get-ChildItem -Path $assetsPath -Directory

foreach ($folder in $folders) {
    $category = $folder.Name
    $files = Get-ChildItem -Path $folder.FullName -Include *.jpg, *.jpeg, *.png, *.webp -Recurse
    
    $items = @()
    foreach ($file in $files) {
        # Create a simple title from filename (remove extension and hyphens)
        $title = $file.BaseName -replace "-", " " -replace "_", " " 
        # Capitalize first letter (optional polish)
        $title = (Get-Culture).TextInfo.ToTitleCase($title)
        
        # Build object string
        $items += "            { src: '$($file.Name)', title: '$title' }"
    }
    
    # Join items with commas
    $itemsString = $items -join ",`n"
    $galleryData[$category] = "        '$category': [`n$itemsString`n        ]"
}

# Construct the new JS object string
$newConfig = "    // Gallery Configuration (Manage your images here)`n    const galleryData = {`n"
$categories = $galleryData.Keys
foreach ($cat in $categories) {
    $newConfig += $galleryData[$cat] + ",`n"
}
$newConfig += "    };"

# Read js/script.js
$content = Get-Content -Path $scriptJsPath -Raw

# Replace the configuration block using Regex
# We look for "const galleryData = {" until "};"
$pattern = "(?ms)\s*// Gallery Configuration \(Manage your images here\).*?const galleryData = \{.*?\};"

if ($content -match $pattern) {
    $newContent = $content -replace $pattern, $newConfig
    Set-Content -Path $scriptJsPath -Value $newContent -Encoding UTF8
    Write-Host "Success! js/script.js has been updated with new images." -ForegroundColor Green
} else {
    Write-Host "Error: Could not find 'const galleryData' block in js/script.js" -ForegroundColor Red
}

Start-Sleep -Seconds 3
