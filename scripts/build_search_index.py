#!/usr/bin/env python3
"""
Build search index script
Extracts text content from HTML files and generates a static search index (JSON)
"""

import os
import json
import re
from pathlib import Path
from bs4 import BeautifulSoup


class SearchIndexBuilder:
    def __init__(self, wiki_dir, output_file):
        self.wiki_dir = Path(wiki_dir)
        self.output_file = Path(output_file)
        self.search_index = []
        
    # Page configuration
        self.page_config = {
            'home.html': {'title': 'Home', 'section': 'Main', 'url': '/'},
            'description.html': {'title': 'Project Description', 'section': 'Project', 'url': '/pages/description'},
            'engineering.html': {'title': 'Engineering', 'section': 'Project', 'url': '/pages/engineering'},
            'contribution.html': {'title': 'Contribution', 'section': 'Project', 'url': '/pages/contribution'},
            'notebook.html': {'title': 'Notebook', 'section': 'Dry Lab', 'url': '/pages/notebook'},
            'experiments.html': {'title': 'Experiments', 'section': 'Dry Lab', 'url': '/pages/experiments'},
            'hardware.html': {'title': 'Hardware', 'section': 'Dry Lab', 'url': '/pages/hardware'},
            'safety-and-security.html': {'title': 'Safety and Security', 'section': 'Dry Lab', 'url': '/pages/safety-and-security'},
            'software.html': {'title': 'Software', 'section': 'Model', 'url': '/pages/software'},
            'model.html': {'title': 'Model', 'section': 'Model', 'url': '/pages/model'},
            'results.html': {'title': 'Results', 'section': 'Model', 'url': '/pages/results'},
            'proof-of-concept.html': {'title': 'Proof of Concept', 'section': 'Model', 'url': '/pages/proof-of-concept'},
            'human-practices.html': {'title': 'Human Practices', 'section': 'Human Practices', 'url': '/pages/human-practices'},
            'education.html': {'title': 'Education', 'section': 'Human Practices', 'url': '/pages/education'},
            'collaboration.html': {'title': 'Collaboration', 'section': 'Human Practices', 'url': '/pages/collaboration'},
            'inclusivity.html': {'title': 'Inclusivity', 'section': 'Human Practices', 'url': '/pages/inclusivity'},
            'entrepreneurship.html': {'title': 'Entrepreneurship', 'section': 'Human Practices', 'url': '/pages/entrepreneurship'},
            'sustainability.html': {'title': 'Sustainability', 'section': 'Human Practices', 'url': '/pages/sustainability'},
            'members.html': {'title': 'Members', 'section': 'Team', 'url': '/pages/members'},
            'attributions.html': {'title': 'Attributions', 'section': 'Team', 'url': '/pages/attributions'},
            'awards.html': {'title': 'Awards', 'section': 'Awards', 'url': '/pages/awards'},
            'measurement.html': {'title': 'Measurement', 'section': 'Experiments', 'url': '/pages/measurement'},
            'plant.html': {'title': 'Plant', 'section': 'Experiments', 'url': '/pages/plant'}
        }
    
    def extract_text_content(self, html_content):
        """Extract plaintext content from HTML"""
        try:
            # First remove Jinja2 template tags
            text = re.sub(r'{%.*?%}', '', html_content)
            text = re.sub(r'{{.*?}}', '', text)
            
            soup = BeautifulSoup(text, 'html.parser')
            
            # Remove scripts, styles, navigation and footer elements that shouldn't be searched
            for element in soup(['script', 'style', 'nav', 'footer', 'header']):
                element.decompose()

            # Prefer the main content region if available
            main_content = soup.find('main') or soup.find(class_=['container', 'content', 'main-content'])
            if main_content:
                text = main_content.get_text()
            else:
                text = soup.get_text()

            # Clean up whitespace
            text = re.sub(r'\s+', ' ', text)  # collapse multiple whitespace
            text = re.sub(r'\n+', ' ', text)  # replace newlines with spaces
            text = text.strip()

            # Drop very short or non-meaningful content
            if len(text) < 50:
                return ""

            # Truncate long content for performance
            if len(text) > 3000:
                text = text[:3000] + '...'

            return text

        except Exception as e:
            print(f"Error extracting text content: {e}")
            return ""
    
    def process_html_file(self, file_path):
        """Process a single HTML file"""
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                html_content = f.read()
            
            filename = file_path.name
            if filename in self.page_config:
                config = self.page_config[filename]
                content = self.extract_text_content(html_content)
                
                if content:  # only add to index when content extraction succeeds
                    page_data = {
                        'url': config['url'],
                        'title': config['title'],
                        'section': config['section'],
                        'content': content,
                        'searchText': (config['title'] + ' ' + content).lower()
                    }
                    
                    self.search_index.append(page_data)
                    print(f"Processed: {filename} -> {config['title']}")
                else:
                    print(f"Warning: Unable to extract content from {filename}")
            else:
                print(f"Skipping unconfigured file: {filename}")
                
        except Exception as e:
            print(f"Error processing file {file_path}: {e}")
    
    def build_index(self):
        """Build the search index"""
        print("Starting search index build...")
        
        # Process HTML files in pages folder
        pages_dir = self.wiki_dir / 'pages'
        if pages_dir.exists():
            for html_file in pages_dir.glob('*.html'):
                self.process_html_file(html_file)
        
        # Process HTML files in the wiki root (e.g., home.html)
        for html_file in self.wiki_dir.glob('*.html'):
            if html_file.name not in ['layout.html', 'menu.html', 'footer.html']:
                self.process_html_file(html_file)
        
        print(f"Index build complete, processed {len(self.search_index)} pages")
    
    def save_index(self):
        """Save the search index to a JSON file"""
        try:
            # Ensure output directory exists
            self.output_file.parent.mkdir(parents=True, exist_ok=True)
            
            index_data = {
                'version': '1.0',
                'build_time': None,  # optional: add a timestamp
                'total_pages': len(self.search_index),
                'pages': self.search_index
            }
            
            with open(self.output_file, 'w', encoding='utf-8') as f:
                json.dump(index_data, f, ensure_ascii=False, indent=2)
            
            print(f"Search index saved to: {self.output_file}")
            print(f"Index size: {self.output_file.stat().st_size / 1024:.2f} KB")
            
        except Exception as e:
            print(f"Error saving index: {e}")
    
    def run(self):
        """Run the index build workflow"""
        self.build_index()
        self.save_index()


def main():
    # Configure paths
    script_dir = Path(__file__).parent
    project_root = script_dir.parent
    wiki_dir = project_root / 'wiki'
    static_dir = project_root / 'static'
    output_file = static_dir / 'search-index.json'
    
    print(f"Wiki directory: {wiki_dir}")
    print(f"Output file: {output_file}")
    
    if not wiki_dir.exists():
        print(f"Error: Wiki directory not found: {wiki_dir}")
        return
    
    # Build index
    builder = SearchIndexBuilder(wiki_dir, output_file)
    builder.run()


if __name__ == '__main__':
    main()