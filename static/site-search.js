/**
 * 站内搜索功能
 * 实现静态网页的内容搜索功能
 */

class SiteSearch {
  constructor() {
    this.searchInput = document.getElementById('site-search-input');
    this.searchBtn = document.getElementById('site-search-btn');
    this.clearBtn = document.getElementById('search-clear-btn');
    this.resultsContainer = document.getElementById('search-results');
    this.resultsList = document.getElementById('search-results-list');
    this.noResultsMsg = document.querySelector('.search-no-results');
    this.resultsCount = document.querySelector('.search-results-count');
    
    // 搜索索引，存储所有页面内容
    this.searchIndex = [];
    this.isIndexLoaded = false;
    
    // 防抖定时器
    this.searchTimeout = null;
    
    this.init();
  }
  
  init() {
    if (!this.searchInput) return;
    
    this.bindEvents();
    this.loadSearchIndex();
  }
  
  bindEvents() {
    // 输入框事件
    this.searchInput.addEventListener('input', (e) => {
      this.handleSearch(e.target.value);
    });
    
    this.searchInput.addEventListener('focus', () => {
      if (this.searchInput.value.trim()) {
        this.showResults();
      }
    });
    
    // 搜索按钮事件
    this.searchBtn.addEventListener('click', () => {
      const val = (this.searchInput.value || '').trim();
      if (!val) {
        // If empty, focus input to expand and allow typing
        this.searchInput.focus();
        return;
      }
      this.handleSearch(val);
    });
    
    // 清除按钮事件
    this.clearBtn.addEventListener('click', () => {
      this.clearSearch();
    });
    
    // 键盘事件
    this.searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        this.handleSearch(this.searchInput.value);
      } else if (e.key === 'Escape') {
        this.hideResults();
      }
    });
    
    // 点击外部隐藏结果
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.site-search')) {
        this.hideResults();
      }
    });
  }
  
  async loadSearchIndex() {
    try {
      // 尝试加载预构建的搜索索引
      try {
        const response = await fetch('/static/search-index.json');
        if (response.ok) {
          const indexData = await response.json();
          this.searchIndex = indexData.pages || [];
          this.isIndexLoaded = true;
          console.log('Search index loaded,', this.searchIndex.length, 'pages');
          return;
        }
      } catch (error) {
    console.warn('Unable to load prebuilt index, falling back to dynamic index:', error);
      }
      
      // 后备方案：动态构建索引
      await this.buildDynamicIndex();
      
    } catch (error) {
      console.error('加载搜索索引失败:', error);
      // 使用当前页面内容作为最后的后备方案
      this.buildCurrentPageIndex();
    }
  }
  
  async buildDynamicIndex() {
    // 定义要搜索的页面列表
    const pages = [
      { url: '{{ url_for("home") }}', title: '首页', section: '主页' },
      { url: '{{ url_for("pages", page="description") }}', title: '项目描述', section: '项目' },
      { url: '{{ url_for("pages", page="engineering") }}', title: '工程设计', section: '项目' },
      { url: '{{ url_for("pages", page="contribution") }}', title: '贡献', section: '项目' },
      { url: '{{ url_for("pages", page="notebook") }}', title: '实验记录', section: '干实验室' },
      { url: '{{ url_for("pages", page="experiments") }}', title: '实验', section: '干实验室' },
      { url: '{{ url_for("pages", page="hardware") }}', title: '硬件', section: '干实验室' },
      { url: '{{ url_for("pages", page="safety-and-security") }}', title: '安全与保障', section: '干实验室' },
      { url: '{{ url_for("pages", page="software") }}', title: '软件', section: '模型' },
      { url: '{{ url_for("pages", page="model") }}', title: '模型', section: '模型' },
      { url: '{{ url_for("pages", page="results") }}', title: '结果', section: '模型' },
      { url: '{{ url_for("pages", page="proof-of-concept") }}', title: '概念验证', section: '模型' },
      { url: '{{ url_for("pages", page="human-practices") }}', title: '人文实践', section: '人文实践' },
      { url: '{{ url_for("pages", page="education") }}', title: '教育', section: '人文实践' },
      { url: '{{ url_for("pages", page="collaboration") }}', title: '合作', section: '人文实践' },
      { url: '{{ url_for("pages", page="inclusivity") }}', title: '包容性', section: '人文实践' },
      { url: '{{ url_for("pages", page="entrepreneurship") }}', title: '创业', section: '人文实践' },
      { url: '{{ url_for("pages", page="sustainability") }}', title: '可持续性', section: '人文实践' },
      { url: '{{ url_for("pages", page="members") }}', title: '团队成员', section: '团队' },
      { url: '{{ url_for("pages", page="attributions") }}', title: '致谢', section: '团队' },
      { url: '{{ url_for("pages", page="awards") }}', title: '奖项', section: '奖项' },
      { url: '{{ url_for("pages", page="measurement") }}', title: '测量', section: '实验' },
      { url: '{{ url_for("pages", page="plant") }}', title: '植物', section: '实验' }
    ];
    
    // 加载页面内容
    for (const page of pages) {
      try {
        // 处理Flask模板URL
        let url = page.url;
        if (url.includes('{{')) {
          // 简化URL处理
          if (url.includes('home')) {
            url = '/';
          } else if (url.includes('"pages"')) {
            const pageMatch = url.match(/page="([^"]+)"/);
            if (pageMatch) {
              url = `/pages/${pageMatch[1]}`;
            }
          }
        }
        
        const response = await fetch(url);
        if (response.ok) {
          const html = await response.text();
          const content = this.extractTextContent(html);
          
          this.searchIndex.push({
            url: url,
            title: page.title,
            section: page.section,
            content: content,
            searchText: (page.title + ' ' + content).toLowerCase()
          });
        }
      } catch (error) {
        console.warn(`无法加载页面: ${page.url}`, error);
      }
    }
    
    this.isIndexLoaded = true;
    console.log('Dynamic search index built,', this.searchIndex.length, 'pages');
  }
  
  buildCurrentPageIndex() {
    // 使用当前页面内容作为搜索索引
    const content = this.extractTextContent(document.documentElement.outerHTML);
  const title = document.title || 'Current page';
    
    this.searchIndex = [{
      url: window.location.pathname,
      title: title,
      section: '当前页面',
      content: content,
      searchText: (title + ' ' + content).toLowerCase()
    }];
    
    this.isIndexLoaded = true;
    console.log('Built search index from current page');
  }
  
  extractTextContent(html) {
  // 创建临时DOM元素来解析HTML
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
    
    // 移除脚本和样式标签
    const scripts = tempDiv.querySelectorAll('script, style, nav, footer');
    scripts.forEach(el => el.remove());
    
    // 获取主要内容区域
    const mainContent = tempDiv.querySelector('main, .container, #main-content, body');
    const textContent = mainContent ? mainContent.textContent : tempDiv.textContent;
    
    // 清理文本：移除多余空白，保留重要内容
    return textContent
      .replace(/\s+/g, ' ')
      .replace(/\n+/g, ' ')
      .trim()
      .substring(0, 2000); // 限制内容长度
  }
  
  handleSearch(query) {
    clearTimeout(this.searchTimeout);
    
    query = query.trim();
    
    // Show/hide clear button
    if (query) {
      this.clearBtn.classList.remove('d-none');
    } else {
      this.clearBtn.classList.add('d-none');
      this.hideResults();
      return;
    }
    
    // 防抖处理
    this.searchTimeout = setTimeout(() => {
      this.performSearch(query);
    }, 300);
  }
  
  performSearch(query) {
    if (!this.isIndexLoaded) {
      this.showLoadingResults();
      return;
    }
    
    if (query.length < 2) {
      this.hideResults();
      return;
    }
    
    const searchTerms = query.toLowerCase().split(/\s+/).filter(term => term.length > 0);
    const results = [];
    
    for (const page of this.searchIndex) {
      let score = 0;
      let matchedTerms = 0;
      const highlights = [];
      
      for (const term of searchTerms) {
        // 标题匹配 (高权重)
        if (page.title.toLowerCase().includes(term)) {
          score += 10;
          matchedTerms++;
        }
        
        // 内容匹配
        if (page.searchText.includes(term)) {
          score += 1;
          matchedTerms++;
          
          // 查找匹配的上下文
          const context = this.getMatchContext(page.content, term);
          if (context) {
            highlights.push(context);
          }
        }
      }
      
      // 只有所有搜索词都匹配才显示结果
      if (matchedTerms === searchTerms.length && score > 0) {
        results.push({
          ...page,
          score,
          highlights: highlights.slice(0, 2) // 最多显示2个高亮片段
        });
      }
    }
    
    // 按评分排序
    results.sort((a, b) => b.score - a.score);
    
    this.displayResults(results, query);
  }
  
  getMatchContext(content, term, contextLength = 100) {
    const index = content.toLowerCase().indexOf(term.toLowerCase());
    if (index === -1) return null;
    
    const start = Math.max(0, index - contextLength / 2);
    const end = Math.min(content.length, index + term.length + contextLength / 2);
    
    let context = content.substring(start, end);
    
    // 添加省略号
    if (start > 0) context = '...' + context;
    if (end < content.length) context = context + '...';
    
    // 高亮搜索词
    const regex = new RegExp(`(${this.escapeRegex(term)})`, 'gi');
    context = context.replace(regex, '<mark>$1</mark>');
    
    return context;
  }
  
  escapeRegex(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }
  
  displayResults(results, query) {
    if (results.length === 0) {
      this.showNoResults();
      return;
    }
    
    this.resultsCount.textContent = `Found ${results.length} results`;
    this.resultsList.innerHTML = '';
    this.noResultsMsg.classList.add('d-none');
    
    results.slice(0, 8).forEach((result, index) => {
      const li = document.createElement('li');
      li.className = 'search-result-item';
      li.setAttribute('role', 'option');
      li.setAttribute('tabindex', '0');
      
      const highlights = result.highlights.length > 0 
        ? `<p class="search-result-snippet">${result.highlights[0]}</p>`
        : '';
      
      li.innerHTML = `
        <a href="${result.url}" class="search-result-link">
          <div class="search-result-header">
            <h6 class="search-result-title">${result.title}</h6>
            <span class="search-result-section">${result.section}</span>
          </div>
          ${highlights}
        </a>
      `;
      
      // 点击事件
      li.addEventListener('click', () => {
        window.location.href = result.url;
      });
      
      // 键盘事件
      li.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          window.location.href = result.url;
        }
      });
      
      this.resultsList.appendChild(li);
    });
    
    this.showResults();
  }
  
  showLoadingResults() {
    this.resultsCount.textContent = 'Searching...';
    this.resultsList.innerHTML = '<li class="search-loading">Loading...</li>';
    this.noResultsMsg.classList.add('d-none');
    this.showResults();
  }
  
  showNoResults() {
    this.resultsCount.textContent = 'Search results';
    this.resultsList.innerHTML = '';
    this.noResultsMsg.classList.remove('d-none');
    this.showResults();
  }
  
  showResults() {
    this.resultsContainer.style.display = 'block';
    this.resultsContainer.setAttribute('aria-expanded', 'true');
  }
  
  hideResults() {
    this.resultsContainer.style.display = 'none';
    this.resultsContainer.setAttribute('aria-expanded', 'false');
  }
  
  clearSearch() {
    this.searchInput.value = '';
    this.clearBtn.classList.add('d-none');
    this.hideResults();
    this.searchInput.focus();
  }
}

// 初始化搜索功能
document.addEventListener('DOMContentLoaded', () => {
  new SiteSearch();
});