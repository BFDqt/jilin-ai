#!/usr/bin/env python3
"""
Markdown to HTML converter for iGEM wiki pages
将Markdown文档按照预设规则转换为对应的HTML页面
"""

import re
import os
import argparse
from pathlib import Path

class MarkdownToHTMLConverter:
    def __init__(self, template_dir, output_dir):
        self.template_dir = Path(template_dir)
        self.output_dir = Path(output_dir)
        
        # 定义章节映射规则
        self.section_mapping = {
            "Description": "description.html",
            "Engineering": "engineering.html", 
            "Contribution": "contribution.html",
            "Notebook": "notebook.html",
            "Experiments": "experiments.html",
            "Hardware": "hardware.html",
            "Safety and Security": "safety-and-security.html",
            "Software": "software.html",
            "Model": "model.html",
            "Results": "results.html"
        }
        
        # HTML模板基础结构
        self.html_template = '''{% extends "layout.html" %}
  
{% block title %}{{TITLE}}{% endblock %}
{% block lead %}{{LEAD}}{% endblock %}

{% block page_content %}

{{CONTENT}}

{% endblock %}
'''

    def parse_markdown_sections(self, md_content):
        """解析Markdown文档，按二级标题分割章节"""
        sections = {}
        current_section = None
        current_content = []
        
        lines = md_content.split('\n')
        
        for line in lines:
            # 检测二级标题 (## Title)
            if line.startswith('## '):
                # 保存前一个章节
                if current_section:
                    sections[current_section] = '\n'.join(current_content)
                
                # 开始新章节
                current_section = line[3:].strip()
                current_content = []
            elif current_section:
                current_content.append(line)
        
        # 保存最后一个章节
        if current_section:
            sections[current_section] = '\n'.join(current_content)
            
        return sections

    def markdown_to_html(self, md_content):
        """将Markdown内容转换为HTML"""
        # 基本的Markdown转HTML规则
        html_content = md_content
        
        # 转换标题
        html_content = re.sub(r'^### (.*?)$', r'<h3>\1</h3>', html_content, flags=re.MULTILINE)
        html_content = re.sub(r'^#### (.*?)$', r'<h4>\1</h4>', html_content, flags=re.MULTILINE)
        html_content = re.sub(r'^##### (.*?)$', r'<h5>\1</h5>', html_content, flags=re.MULTILINE)
        
        # 转换段落
        html_content = re.sub(r'^(?!<[h|d|u|t])(.*?)$', r'<p>\1</p>', html_content, flags=re.MULTILINE)
        
        # 转换粗体
        html_content = re.sub(r'\*\*(.*?)\*\*', r'<strong>\1</strong>', html_content)
        
        # 转换列表
        html_content = re.sub(r'^- (.*?)$', r'<li>\1</li>', html_content, flags=re.MULTILINE)
        
        # 转换代码
        html_content = re.sub(r'`(.*?)`', r'<code>\1</code>', html_content)
        
        # 包装列表项
        html_content = re.sub(r'(<li>.*?</li>)', lambda m: f'<ul>\n{m.group(1)}\n</ul>' 
                             if not re.search(r'<ul>.*?' + re.escape(m.group(1)), html_content) else m.group(1), 
                             html_content, flags=re.DOTALL)
        
        # 清理空段落
        html_content = re.sub(r'<p>\s*</p>', '', html_content)
        
        return html_content

    def create_html_page(self, section_name, content):
        """创建完整的HTML页面"""
        # 生成页面标题和导语
        title_mapping = {
            "Description": "Project Description",
            "Engineering": "Engineering Success", 
            "Contribution": "Contribution",
            "Notebook": "Notebook",
            "Experiments": "Experiments",
            "Hardware": "Hardware",
            "Safety and Security": "Safety and Security",
            "Software": "Software",
            "Model": "Model",
            "Results": "Results"
        }
        
        lead_mapping = {
            "Description": "Revolutionizing biological research with BIOMNIGEM - the first true multimodal AI biologist.",
            "Engineering": "Our Engineering Success: The Design → Build → Test → Learn Cycle for BIOMNIGEM.",
            "Contribution": "Reshaping the Landscape of Synthetic Biology with BIOMNIGEM.",
            "Notebook": "Our journey has been one of constant iteration and discovery - documenting every step from brainstorming to breakthrough.",
            "Experiments": "Computational experiments designed to validate our hypotheses and demonstrate BIOMNIGEM's capabilities.",
            "Hardware": "Computational Infrastructure: The High-Performance Computing Foundation Behind BIOMNIGEM.",
            "Safety and Security": "Building a powerful AI tool for biology comes with great responsibility - our comprehensive approach to safety and security.",
            "Software": "BIOMNIGEM: Your Personal AI Biologist - Stop juggling dozens of separate tools. Start a conversation with your data.",
            "Model": "The Architecture of BIOMNIGEM - A paradigm shift in biological AI through multimodal understanding.",
            "Results": "Quantitative and Qualitative Performance - BIOMNIGEM demonstrates state-of-the-art performance across biological tasks."
        }
        
        title = title_mapping.get(section_name, section_name)
        lead = lead_mapping.get(section_name, f"Detailed information about {section_name}.")
        
        # 转换内容为HTML
        html_content = self.markdown_to_html(content)
        
        # 添加标准的iGEM wiki结构
        structured_content = f'''<div class="row mt-4">
  <div class="col">
    <div class="bd-callout bd-callout-info">
      <h4>iGEM Medal Criterion</h4>
      <p>This page contributes to our project documentation and medal requirements.</p>
      <hr />
      <p>Visit the <a href="https://competition.igem.org/judging/medals">Medals page</a> for more information.</p>
    </div>
  </div>
</div>

<div class="row mt-4">
  <div class="col">
{html_content}
  </div>
</div>'''
        
        # 填充模板
        final_html = self.html_template.replace('{{TITLE}}', title)
        final_html = final_html.replace('{{LEAD}}', lead)
        final_html = final_html.replace('{{CONTENT}}', structured_content)
        
        return final_html

    def convert_file(self, md_file_path):
        """转换单个Markdown文件"""
        print(f"Reading {md_file_path}...")
        
        with open(md_file_path, 'r', encoding='utf-8') as f:
            md_content = f.read()
        
        # 解析章节
        sections = self.parse_markdown_sections(md_content)
        
        print(f"Found {len(sections)} sections:")
        for section in sections.keys():
            print(f"  - {section}")
        
        # 为每个章节生成对应的HTML文件
        for section_name, section_content in sections.items():
            if section_name in self.section_mapping:
                html_filename = self.section_mapping[section_name]
                html_content = self.create_html_page(section_name, section_content)
                
                output_path = self.output_dir / html_filename
                
                with open(output_path, 'w', encoding='utf-8') as f:
                    f.write(html_content)
                
                print(f"Generated: {output_path}")
            else:
                print(f"Warning: No mapping found for section '{section_name}'")

def main():
    parser = argparse.ArgumentParser(description='Convert Markdown to iGEM wiki HTML pages')
    parser.add_argument('markdown_file', help='Path to the markdown file')
    parser.add_argument('--output-dir', default='../wiki/pages', help='Output directory for HTML files')
    parser.add_argument('--template-dir', default='../wiki', help='Template directory')
    
    args = parser.parse_args()
    
    converter = MarkdownToHTMLConverter(args.template_dir, args.output_dir)
    converter.convert_file(args.markdown_file)
    
    print("Conversion completed!")

if __name__ == '__main__':
    main()