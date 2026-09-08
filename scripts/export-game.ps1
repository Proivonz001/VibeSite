<#
.SYNOPSIS
  Export a Godot project to public/games/<slug>/ as a web build.

.EXAMPLE
  .\scripts\export-game.ps1 -Project ..\EFFUAN -Slug effuan

.NOTES
  - Requires the portable Godot 4.7 in ..\CLD_GAMES\Godot and the web export
    templates in %APPDATA%\Godot\export_templates\4.7.stable.
  - The project must contain an export_presets.cfg with a preset named "Web"
    (thread_support off, so the build also works without COOP/COEP headers).
  - The project setting editor/export/convert_text_resources_to_binary must be
    false when the game lists .tres files at runtime with DirAccess.
#>
param(
  [Parameter(Mandatory = $true)][string]$Project,
  [Parameter(Mandatory = $true)][string]$Slug,
  [string]$Godot = (Join-Path $PSScriptRoot "..\..\CLD_GAMES\Godot\Godot_v4.7-stable_win64_console.exe"),
  [string]$Preset = "Web"
)

$ErrorActionPreference = "Stop"
$site = Resolve-Path (Join-Path $PSScriptRoot "..")
$projectPath = Resolve-Path $Project
$outDir = Join-Path $site "public\games\$Slug"
New-Item -ItemType Directory -Force $outDir | Out-Null

Write-Host "Importing $projectPath ..."
& $Godot --headless --path $projectPath --import | Out-Null

Write-Host "Exporting preset '$Preset' to $outDir ..."
& $Godot --headless --path $projectPath --export-release $Preset (Join-Path $outDir "index.html")
if ($LASTEXITCODE -ne 0) { throw "Godot export failed with exit code $LASTEXITCODE" }

Get-ChildItem $outDir | Select-Object Name, @{n = "MB"; e = { [math]::Round($_.Length / 1MB, 2) } } | Format-Table -AutoSize
