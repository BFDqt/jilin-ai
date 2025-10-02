#!/usr/bin/env python3
"""
增强版Markdown到HTML转换器
支持YAML配置、表格转换、更复杂的Markdown语法
"""

import re
import os
import yaml
import argparse
from pathlib import Path
import markdown
from markdown.extensions import tables, codehilite, toc

class AdvancedMarkdownConverter:
    def __init__(self, config_file):
        self.config = self.load_config(config_file)
        
        # 初始化markdown解析器
        self.md = markdown.Markdown(extensions=[
            'tables',
            'codehilite',
            'toc',
            'fenced_code',
            'attr_list'
        ])
    
    def load_config(self, config_file):
        """加载YAML配置文件"""
        with open(config_file, 'r', encoding='utf-8') as f:
            return yaml.safe_load(f)
    
    def parse_markdown_sections(self, md_content):
        """解析Markdown文档，支持更复杂的章节结构"""
        sections = {}
        current_section = None
        current_content = []
        section_level = 0
        
        lines = md_content.split('\n')
        
        for line in lines:
            # 检测各级标题
            if line.startswith('## '):
                if current_section:
                    sections[current_section] = {
                        'content': '\n'.join(current_content),
                        'level': section_level
                    }
                
                current_section = line[3:].strip()
                current_content = []
                section_level = 2
            elif line.startswith('### ') and current_section:
                current_content.append(line)
            elif current_section:
                current_content.append(line)
        
        if current_section:
            sections[current_section] = {
                'content': '\n'.join(current_content),
                'level': section_level
            }
            
        return sections
    
    def convert_markdown_to_html(self, md_content):
        """使用markdown库转换内容"""
        return self.md.convert(md_content)
    
    def enhance_html_content(self, html_content, section_name):
        """增强HTML内容，添加Bootstrap样式和结构"""
        enhanced_html = html_content
        
        # 为表格添加Bootstrap样式
        enhanced_html = re.sub(
            r'<table>',
            r'<div class="table-responsive"><table class="table table-striped">',
            enhanced_html
        )
        enhanced_html = re.sub(r'</table>', r'</table></div>', enhanced_html)
        
        # 为代码块添加样式
        enhanced_html = re.sub(
            r'<pre><code>',
            r'<pre class="bg-light p-3 rounded"><code>',
            enhanced_html
        )
        
        # 为引用添加Bootstrap alert样式
        enhanced_html = re.sub(
            r'<blockquote>\s*<p>(.*?)</p>\s*</blockquote>',
            r'<div class="alert alert-info"><p>\1</p></div>',
            enhanced_html,
            flags=re.DOTALL
        )
        
        # 添加行和列结构
        wrapped_content = f'''<div class="row mt-4">
  <div class="col">
{enhanced_html}
  </div>
</div>'''
        
        return wrapped_content
    
    def create_complete_html_page(self, section_name, content):
        """创建完整的HTML页面"""
        section_config = self.config['section_mapping'].get(section_name)
        if not section_config:
            return None
        
        # 转换Markdown内容
        html_content = self.convert_markdown_to_html(content)
        enhanced_content = self.enhance_html_content(html_content, section_name)
        
        # 获取奖章标准信息
        medal_info = self.config['medal_criteria'].get(section_name, {
            'criterion': 'iGEM Medal Criterion',
            'description': 'This page contributes to our project documentation and medal requirements.'
        })
        
        # 填充模板
        template = self.config['templates']['base']
        final_html = template.replace('{{TITLE}}', section_config['title'])
        final_html = final_html.replace('{{LEAD}}', section_config['lead'])
        final_html = final_html.replace('{{MEDAL_CRITERION}}', medal_info['criterion'])
        final_html = final_html.replace('{{MEDAL_DESCRIPTION}}', medal_info['description'])
        final_html = final_html.replace('{{CONTENT}}', enhanced_content)
        
        return final_html, section_config['file']
    
    def batch_convert(self, md_file_path, output_dir):
        """批量转换Markdown文件到HTML页面"""
        output_dir = Path(output_dir)
        output_dir.mkdir(exist_ok=True)
        
        print(f"Reading {md_file_path}...")
        with open(md_file_path, 'r', encoding='utf-8') as f:
            md_content = f.read()
        
        sections = self.parse_markdown_sections(md_content)
        
        print(f"Found {len(sections)} sections:")
        for section in sections.keys():
            print(f"  - {section}")
        
        generated_files = []
        
        for section_name, section_data in sections.items():
            result = self.create_complete_html_page(section_name, section_data['content'])
            
            if result:
                html_content, filename = result
                output_path = output_dir / filename
                
                with open(output_path, 'w', encoding='utf-8') as f:
                    f.write(html_content)
                
                print(f"Generated: {output_path}")
                generated_files.append(str(output_path))
            else:
                print(f"Warning: No configuration found for section '{section_name}'")
        
        return generated_files

def main():
    parser = argparse.ArgumentParser(description='Advanced Markdown to iGEM wiki HTML converter')
    parser.add_argument('markdown_file', help='Path to the markdown file')
    parser.add_argument('--config', default='conversion_config.yaml', help='YAML configuration file')
    parser.add_argument('--output-dir', default='../wiki/pages', help='Output directory for HTML files')
    
    args = parser.parse_args()
    
    converter = AdvancedMarkdownConverter(args.config)
    generated_files = converter.batch_convert(args.markdown_file, args.output_dir)
    
    print(f"\nConversion completed! Generated {len(generated_files)} files:")
    for file in generated_files:
        print(f"  ✅ {file}")

if __name__ == '__main__':
    main()