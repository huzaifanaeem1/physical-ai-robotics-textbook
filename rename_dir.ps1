$sourcePath = "rag-backend"
$destPath = "rag_backend"

# Check if source exists
if (Test-Path $sourcePath) {
    # Check if destination already exists
    if (Test-Path $destPath) {
        Write-Host "Destination $destPath already exists. Removing it first."
        Remove-Item -Path $destPath -Recurse -Force
    }

    # Rename the directory
    Rename-Item -Path $sourcePath -NewName $destPath
    Write-Host "Successfully renamed $sourcePath to $destPath"
} else {
    Write-Host "Source directory $sourcePath does not exist"
}