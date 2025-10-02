# PowerShell脚本：Markdown到HTML转换器
# 适用于Windows环境的简单自动化方案

param(
    [Parameter(Mandatory=$true)]
    [string]$MarkdownFile,
    
    [Parameter(Mandatory=$false)]
    [string]$OutputDir = "../wiki/pages",
    
    [Parameter(Mandatory=$false)]
    [string]$ConfigFile = "conversion_mapping.json"
)

# 创建映射配置JSON（如果不存在）
$mappingConfig = @{
    "section_mapping" = @{
        "Description" = @{
            "file" = "description.html"
            "title" = "Project Description"
            "lead" = "Revolutionizing biological research with BIOMNIGEM - the first true multimodal AI biologist."
        }
        "Engineering" = @{
            "file" = "engineering.html"
            "title" = "Engineering Success"
            "lead" = "Our Engineering Success: The Design → Build → Test → Learn Cycle for BIOMNIGEM."
        }
        "Contribution" = @{
            "file" = "contribution.html"
            "title" = "Contribution"
            "lead" = "Reshaping the Landscape of Synthetic Biology with BIOMNIGEM."
        }
        "Notebook" = @{
            "file" = "notebook.html"
            "title" = "Notebook"
            "lead" = "Our journey has been one of constant iteration and discovery."
        }
        "Experiments" = @{
            "file" = "experiments.html"
            "title" = "Experiments"
            "lead" = "Computational experiments designed to validate our hypotheses."
        }
        "Hardware" = @{
            "file" = "hardware.html"
            "title" = "Hardware"
            "lead" = "Computational Infrastructure: The High-Performance Computing Foundation Behind BIOMNIGEM."
        }
        "Safety and Security" = @{
            "file" = "safety-and-security.html"
            "title" = "Safety and Security"
            "lead" = "Building a powerful AI tool for biology comes with great responsibility."
        }
        "Software" = @{
            "file" = "software.html"
            "title" = "Software"
            "lead" = "BIOMNIGEM: Your Personal AI Biologist."
        }
        "Model" = @{
            "file" = "model.html"
            "title" = "Model"
            "lead" = "The Architecture of BIOMNIGEM - A paradigm shift in biological AI."
        }
        "Results" = @{
            "file" = "results.html"
            "title" = "Results"
            "lead" = "Quantitative and Qualitative Performance - BIOMNIGEM demonstrates state-of-the-art performance."
        }
    }
}

# 保存配置文件
if (-not (Test-Path $ConfigFile)) {
    $mappingConfig | ConvertTo-Json -Depth 10 | Set-Content $ConfigFile -Encoding UTF8
    Write-Host "Created configuration file: $ConfigFile" -ForegroundColor Green
}

# 读取配置
$config = Get-Content $ConfigFile -Encoding UTF8 | ConvertFrom-Json

# HTML模板
$htmlTemplate = @"
{% extends "layout.html" %}
  
{% block title %}{{TITLE}}{% endblock %}
{% block lead %}{{LEAD}}{% endblock %}

{% block page_content %}

<div class="row mt-4">
  <div class="col">
    <div class="bd-callout bd-callout-info">
      <h4>iGEM Medal Criterion</h4>
      <p>This page contributes to our project documentation and medal requirements.</p>
      <hr />
      <p>Visit the <a href="https://competition.igem.org/judging/medals">Medals page</a> for more information.</p>
    </div>
  </div>
</div>

{{CONTENT}}

{% endblock %}
"@

function ConvertTo-Html {
    param([string]$MarkdownContent)
    
    # 按行处理Markdown内容
    $lines = $MarkdownContent -split "`r?`n"
    $htmlLines = @()
    $inList = $false
    
    foreach ($line in $lines) {
        $trimmedLine = $line.Trim()
        
        # 跳过空行
        if ([string]::IsNullOrWhiteSpace($trimmedLine)) {
            if ($inList) {
                $htmlLines += "</ul>"
                $inList = $false
            }
            $htmlLines += ""
            continue
        }
        
        # 转换标题
        if ($trimmedLine -match "^### (.*)") {
            if ($inList) { $htmlLines += "</ul>"; $inList = $false }
            $htmlLines += "<h3>$($matches[1])</h3>"
        }
        elseif ($trimmedLine -match "^#### (.*)") {
            if ($inList) { $htmlLines += "</ul>"; $inList = $false }
            $htmlLines += "<h4>$($matches[1])</h4>"
        }
        elseif ($trimmedLine -match "^##### (.*)") {
            if ($inList) { $htmlLines += "</ul>"; $inList = $false }
            $htmlLines += "<h5>$($matches[1])</h5>"
        }
        # 转换列表项
        elseif ($trimmedLine -match "^- (.*)") {
            if (-not $inList) {
                $htmlLines += "<ul>"
                $inList = $true
            }
            $listContent = $matches[1]
            # 处理列表项中的内联格式
            $listContent = $listContent -replace "\*\*(.*?)\*\*", "<strong>`$1</strong>"
            $listContent = $listContent -replace "(?<!\*)\*([^\*]+?)\*(?!\*)", "<em>`$1</em>"
            $listContent = $listContent -replace "``([^``]+)``", "<code>`$1</code>"
            $htmlLines += "  <li>$listContent</li>"
        }
        # 转换表格（简单检测）
        elseif ($trimmedLine -match "^\|.*\|$") {
            if ($inList) { $htmlLines += "</ul>"; $inList = $false }
            
            # 简单的表格转换
            if ($trimmedLine -match "^\|[\s\-\|]+\|$") {
                # 这是表格分隔行，跳过
                continue
            } else {
                # 表格数据行
                $cells = $trimmedLine -split '\|' | Where-Object { $_.Trim() -ne '' }
                $cellsHtml = $cells | ForEach-Object { 
                    $cellContent = $_.Trim()
                    $cellContent = $cellContent -replace "\*\*(.*?)\*\*", "<strong>`$1</strong>"
                    "<td>$cellContent</td>"
                }
                $htmlLines += "<tr>" + ($cellsHtml -join "") + "</tr>"
            }
        }
        # 转换普通段落
        else {
            if ($inList) { $htmlLines += "</ul>"; $inList = $false }
            
            # 处理内联格式
            $paragraph = $trimmedLine
            $paragraph = $paragraph -replace "\*\*(.*?)\*\*", "<strong>`$1</strong>"
            $paragraph = $paragraph -replace "(?<!\*)\*([^\*]+?)\*(?!\*)", "<em>`$1</em>"
            $paragraph = $paragraph -replace "``([^``]+)``", "<code>`$1</code>"
            
            # 只有非HTML标签的行才包装成段落
            if ($paragraph -notmatch "^<[^>]+>") {
                $htmlLines += "<p>$paragraph</p>"
            } else {
                $htmlLines += $paragraph
            }
        }
    }
    
    # 关闭未关闭的列表
    if ($inList) {
        $htmlLines += "</ul>"
    }
    
    # 后处理：包装表格
    $finalHtml = $htmlLines -join "`n"
    
    # 包装连续的表格行为完整的表格
    $finalHtml = [regex]::Replace($finalHtml, '(<tr>.*?</tr>(?:\s*<tr>.*?</tr>)*)', {
        param($match)
        $tableRows = $match.Groups[1].Value
        return "<div class=`"table-responsive`"><table class=`"table table-striped`">$tableRows</table></div>"
    }, [System.Text.RegularExpressions.RegexOptions]::Singleline)
    
    return $finalHtml
}

function Parse-MarkdownSections {
    param([string]$Content)
    
    $sections = @{}
    $currentSection = $null
    $currentContent = @()
    
    $lines = $Content -split "`n"
    
    foreach ($line in $lines) {
        if ($line -match "^## (.+)") {
            # 保存前一个章节
            if ($currentSection) {
                $sections[$currentSection] = $currentContent -join "`n"
            }
            
            # 开始新章节
            $currentSection = $matches[1].Trim()
            $currentContent = @()
        }
        elseif ($currentSection) {
            $currentContent += $line
        }
    }
    
    # 保存最后一个章节
    if ($currentSection) {
        $sections[$currentSection] = $currentContent -join "`n"
    }
    
    return $sections
}

# 主要处理逻辑
Write-Host "Reading markdown file: $MarkdownFile" -ForegroundColor Cyan

# 转换为绝对路径
$MarkdownFile = Resolve-Path $MarkdownFile -ErrorAction SilentlyContinue
if (-not $MarkdownFile -or -not (Test-Path $MarkdownFile)) {
    Write-Error "Markdown file not found: $MarkdownFile"
    exit 1
}

try {
    $markdownContent = Get-Content $MarkdownFile -Encoding UTF8 -Raw
    if ([string]::IsNullOrWhiteSpace($markdownContent)) {
        Write-Error "Markdown file is empty or could not be read"
        exit 1
    }
}
catch {
    Write-Error "Failed to read markdown file: $($_.Exception.Message)"
    exit 1
}

$sections = Parse-MarkdownSections -Content $markdownContent

Write-Host "Found $($sections.Count) sections:" -ForegroundColor Yellow
$sections.Keys | ForEach-Object { Write-Host "  - $_" -ForegroundColor Gray }

# 确保输出目录存在
$OutputDir = $OutputDir -replace '/', '\'  # 转换路径分隔符

# 如果是相对路径，转换为绝对路径
if (-not [System.IO.Path]::IsPathRooted($OutputDir)) {
    $OutputDir = Join-Path (Get-Location) $OutputDir
}

if (-not (Test-Path $OutputDir)) {
    try {
        New-Item -ItemType Directory -Path $OutputDir -Force | Out-Null
        Write-Host "Created output directory: $OutputDir" -ForegroundColor Green
    }
    catch {
        Write-Error "Failed to create output directory: $($_.Exception.Message)"
        exit 1
    }
}

Write-Host "Using output directory: $OutputDir" -ForegroundColor Gray

$generatedFiles = @()

# 为每个章节生成HTML文件
foreach ($sectionName in $sections.Keys) {
    Write-Host "Processing section: $sectionName" -ForegroundColor Yellow
    
    $sectionConfig = $config.section_mapping.$sectionName
    
    if ($sectionConfig) {
        try {
            $htmlContent = ConvertTo-Html -MarkdownContent $sections[$sectionName]
            
            # 添加Bootstrap结构
            $wrappedContent = @"
<div class="row mt-4">
  <div class="col">
$htmlContent
  </div>
</div>
"@
            
            # 填充模板
            $finalHtml = $htmlTemplate
            $finalHtml = $finalHtml -replace [regex]::Escape("{{TITLE}}"), $sectionConfig.title
            $finalHtml = $finalHtml -replace [regex]::Escape("{{LEAD}}"), $sectionConfig.lead
            $finalHtml = $finalHtml -replace [regex]::Escape("{{CONTENT}}"), $wrappedContent
            
            $outputPath = Join-Path $OutputDir $sectionConfig.file
            
            # 确保输出目录存在
            $outputDir = Split-Path $outputPath -Parent
            if (-not (Test-Path $outputDir)) {
                New-Item -ItemType Directory -Path $outputDir -Force | Out-Null
            }
            
            # 使用UTF8编码写入文件
            [System.IO.File]::WriteAllText($outputPath, $finalHtml, [System.Text.Encoding]::UTF8)
            
            Write-Host "Generated: $outputPath" -ForegroundColor Green
            $generatedFiles += $outputPath
        }
        catch {
            Write-Error "Failed to process section '$sectionName': $($_.Exception.Message)"
        }
    }
    else {
        Write-Warning "No mapping found for section: $sectionName"
    }
}

Write-Host "`nConversion completed! Generated $($generatedFiles.Count) files:" -ForegroundColor Cyan
$generatedFiles | ForEach-Object { Write-Host "  ✅ $_" -ForegroundColor Green }

# 显示总结信息
Write-Host "`nSummary:" -ForegroundColor Cyan
Write-Host "  Source file: $MarkdownFile" -ForegroundColor Gray
Write-Host "  Output directory: $OutputDir" -ForegroundColor Gray
Write-Host "  Config file: $ConfigFile" -ForegroundColor Gray
Write-Host "  Sections processed: $($sections.Count)" -ForegroundColor Gray
Write-Host "  Files generated: $($generatedFiles.Count)" -ForegroundColor Gray