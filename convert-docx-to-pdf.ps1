$soffice = 'C:\Program Files\LibreOffice\program\soffice.exe'
$outDir = 'C:\Users\leew\OneDrive\Documents\Playground\green-life\output\doc'

if (-not (Test-Path $soffice)) {
  Write-Error "LibreOffice not found at $soffice"
  exit 1
}

Get-ChildItem $outDir -Filter *.docx | ForEach-Object {
  & $soffice --headless --convert-to pdf --outdir $outDir $_.FullName
}
