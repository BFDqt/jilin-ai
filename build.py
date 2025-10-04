#!/usr/bin/env python3
"""
Build script for generating static site from Flask application.
This script generates all static HTML pages for deployment to GitHub Pages.
"""

import os
import shutil
from pathlib import Path
from flask_frozen import Freezer
from app import app

def build_static_site():
    """Generate static site using Flask-Frozen"""
    print("🔨 Building static site...")
    
    # Configure freezer for GitHub Pages deployment
    app.config['FREEZER_DESTINATION'] = 'dist'
    app.config['FREEZER_RELATIVE_URLS'] = True
    app.config['FREEZER_IGNORE_MIMETYPE_WARNINGS'] = True
    
    # Clean existing dist directory
    dist_path = Path('dist')
    if dist_path.exists():
        print("🧹 Cleaning existing dist directory...")
        shutil.rmtree(dist_path)
    
    # Create freezer instance
    freezer = Freezer(app)
    
    # Generate static files
    freezer.freeze()
    
    # Copy static assets (CSS, JS, images, etc.)
    static_src = Path('static')
    static_dest = dist_path / 'static'
    
    if static_src.exists():
        print("📁 Copying static assets...")
        shutil.copytree(static_src, static_dest, dirs_exist_ok=True)
    
    # Fix file extensions for GitHub Pages
    print("🔧 Adding .html extensions for GitHub Pages compatibility...")
    for file_path in dist_path.iterdir():
        if file_path.is_file() and not file_path.suffix and file_path.name != 'index':
            # Read the content
            content = file_path.read_text(encoding='utf-8')
            
            # Create new .html file
            html_file = file_path.with_suffix('.html')
            html_file.write_text(content, encoding='utf-8')
            
            # Remove original file
            file_path.unlink()
            
            print(f"  ✓ Converted {file_path.name} → {html_file.name}")
    
    # Copy CNAME file if it exists in root
    cname_src = Path('CNAME')
    if cname_src.exists():
        cname_dest = dist_path / 'CNAME'
        shutil.copy2(cname_src, cname_dest)
        print("  ✓ Copied CNAME file")
    
    print("✅ Static site built successfully!")
    print(f"📁 Output directory: {dist_path.absolute()}")
    
    # List generated files
    print("\n📄 Generated files:")
    for file_path in sorted(dist_path.rglob('*')):
        if file_path.is_file():
            relative_path = file_path.relative_to(dist_path)
            print(f"  - {relative_path}")

if __name__ == "__main__":
    build_static_site()