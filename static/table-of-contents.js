// Floating table of contents with fade effects, smooth scrolling, highlighting, and expandable sub-sections

// ===== Neural Network Loading Animation =====
window.addEventListener('DOMContentLoaded', function() {
  const loadingPage = document.getElementById('loading-page');
  const svg = document.getElementById('nn-svg');
  
  if (!loadingPage || !svg) return;
  
  // Neural network structure: 2 input nodes, hidden layers with 4, 5, 4 nodes, 1 output node
  const layers = [2, 4, 5, 4, 1];
  const nodeRadius = 16;
  const width = 360, height = 220;
  const layerGap = width / (layers.length + 1);
  const nodePositions = [];
  
  // Calculate positions for each node
  for (let l = 0; l < layers.length; l++) {
    const n = layers[l];
    const yGap = height / (n + 1);
    nodePositions[l] = [];
    for (let i = 0; i < n; i++) {
      nodePositions[l][i] = {
        x: layerGap * (l + 1),
        y: yGap * (i + 1)
      };
    }
  }

  // Create connections between nodes
  const links = [];
  for (let l = 0; l < layers.length - 1; l++) {
    for (let i = 0; i < layers[l]; i++) {
      for (let j = 0; j < layers[l + 1]; j++) {
        links.push({
          from: {layer: l, idx: i},
          to: {layer: l + 1, idx: j}
        });
      }
    }
  }
  
  // Draw the connection lines
  links.forEach((link, idx) => {
    const from = nodePositions[link.from.layer][link.from.idx];
    const to = nodePositions[link.to.layer][link.to.idx];
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', from.x);
    line.setAttribute('y1', from.y);
    line.setAttribute('x2', to.x);
    line.setAttribute('y2', to.y);
    line.setAttribute('class', 'link');
    line.setAttribute('data-link-idx', idx);
    svg.appendChild(line);
  });
  
  // Draw the nodes
  nodePositions.forEach((layer, lidx) => {
    layer.forEach((pos, nidx) => {
      const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      circle.setAttribute('cx', pos.x);
      circle.setAttribute('cy', pos.y);
      circle.setAttribute('r', nodeRadius);
      circle.setAttribute('class', 'node');
      circle.setAttribute('data-layer', lidx);
      circle.setAttribute('data-idx', nidx);
      svg.appendChild(circle);
    });
  });

  // Animation sequence: highlight each layer, pass through layers forward and backward
  const layerOrder = [];
  for (let l = 0; l < layers.length; l++) layerOrder.push({layer: l, backward: false});
  for (let l = layers.length - 1; l >= 0; l--) layerOrder.push({layer: l, backward: true});
  
  // Animation loop
  let step = 0;
  let animationInterval;
  
  function animate() {
    // Clear all highlights
    document.querySelectorAll('.node').forEach(e => e.classList.remove('active'));
    document.querySelectorAll('.link').forEach(e => e.classList.remove('active'));
    
    // Current layer
    const cur = layerOrder[step];
    
    // Highlight all nodes in current layer
    document.querySelectorAll(`.node[data-layer="${cur.layer}"]`).forEach(e => e.classList.add('active'));
    
    // Highlight related connections
    if (!cur.backward && cur.layer < layers.length - 1) {
      // Forward: connections from this layer to next
      links.forEach((link, idx) => {
        if (link.from.layer === cur.layer) {
          document.querySelector(`.link[data-link-idx="${idx}"]`)?.classList.add('active');
        }
      });
    } else if (cur.backward && cur.layer > 0) {
      // Backward: connections from this layer to previous
      links.forEach((link, idx) => {
        if (link.to.layer === cur.layer) {
          document.querySelector(`.link[data-link-idx="${idx}"]`)?.classList.add('active');
        }
      });
    }
    
    step = (step + 1) % layerOrder.length;
  }
  
  // Start the animation
  animate();
  animationInterval = setInterval(animate, 350);
  
  // Hide loading animation after page loads
  window.addEventListener('load', function() {
    // Show for at least 2 seconds to avoid flickering
    setTimeout(() => {
      loadingPage.classList.add('fade-out');
      clearInterval(animationInterval); // Stop animation
      // Remove element after fully hidden
      setTimeout(() => {
        loadingPage.style.display = 'none';
      }, 800);
    }, 2000);
  });
});

// BIOMNIGEM brand animation logic
window.addEventListener('DOMContentLoaded', function() {
  const brandLetters = document.querySelectorAll('.brand-letter');
  const bioLetters = Array.from(document.querySelectorAll('.brand-letter[data-part="bio"]'));
  const omniLetters = Array.from(document.querySelectorAll('.brand-letter[data-part="omni"]'));
  const igemLetters = Array.from(document.querySelectorAll('.brand-letter[data-part="igem"]'));
  const sharedLetters = Array.from(document.querySelectorAll('.brand-letter.shared'));
  
  // 确保选择器正确找到了元素
  if (bioLetters.length === 0 || omniLetters.length === 0 || igemLetters.length === 0) {
    console.warn('BIOMNIGEM: Some letter groups not found');
    return;
  }
  
  // 全局动画控制
  let currentTimeout = null;
  
  function triggerJump(letters) {
    // 立即清除之前的动画定时器
    if (currentTimeout) {
      clearTimeout(currentTimeout);
      currentTimeout = null;
    }
    
    // 立即清除所有字母的jump-active类，确保可以立即开始新动画
    brandLetters.forEach(letter => {
      if (letter && letter.classList) {
        letter.classList.remove('jump-active');
      }
    });
    
    // 强制重排以确保类被立即移除
    void document.body.offsetHeight;
    
    // 立即开始新动画
    letters.forEach(letter => {
      if (letter && letter.classList) {
        letter.classList.add('jump-active');
      }
    });
    
    // 设置新的清除定时器
    currentTimeout = setTimeout(() => {
      letters.forEach(letter => {
        if (letter && letter.classList) {
          letter.classList.remove('jump-active');
        }
      });
      currentTimeout = null;
    }, 500);
  }
  
  // BIO部分悬浮 - B或I触发，包含共享的O (B-I-O)
  bioLetters.forEach(letter => {
    letter.addEventListener('mouseenter', () => {
      const jumpLetters = [...bioLetters, sharedLetters[0]].filter(l => l);
      triggerJump(jumpLetters);
    });
  });
  
  // 共享O字母悬浮也触发BIO
  if (sharedLetters[0]) {
    sharedLetters[0].addEventListener('mouseenter', () => {
      const jumpLetters = [...bioLetters, sharedLetters[0]].filter(l => l);
      triggerJump(jumpLetters);
    });
  }
  
  // OMNI部分悬浮 - M或N触发，包含共享的O和I (O-M-N-I)
  omniLetters.forEach(letter => {
    letter.addEventListener('mouseenter', () => {
      const jumpLetters = [sharedLetters[0], ...omniLetters, sharedLetters[1]].filter(l => l);
      triggerJump(jumpLetters);
    });
  });
  
  // IGEM部分悬浮 - G、E、M触发，包含共享的I (I-G-E-M)
  igemLetters.forEach(letter => {
    letter.addEventListener('mouseenter', () => {
      const jumpLetters = [sharedLetters[1], ...igemLetters].filter(l => l);
      triggerJump(jumpLetters);
    });
  });
  
  // 共享I字母悬浮触发IGEM (因为它在IGEM组更常见)
  if (sharedLetters[1]) {
    sharedLetters[1].addEventListener('mouseenter', () => {
      const jumpLetters = [sharedLetters[1], ...igemLetters].filter(l => l);
      triggerJump(jumpLetters);
    });
  }
});

class TableOfContents {
  constructor() {
    this.tocContainer = document.getElementById('toc-content');
    this.headings = [];
    this.activeId = null;
    this.init();
  }

  init() {
    this.collectHeadings();
    this.generateTOC();
    this.setupIntersectionObserver();
    this.setupSmoothScrolling();
    this.setupFadeInOnScroll();
  }

  collectHeadings() {
    const contentSection = document.querySelector('.content-section');
    if (!contentSection) return;

    const headingElements = contentSection.querySelectorAll('h2, h3');
    this.headings = Array.from(headingElements).map(heading => ({
      id: heading.id || this.generateId(heading),
      title: heading.textContent.trim(),
      level: parseInt(heading.tagName.charAt(1)),
      element: heading
    }));


    // Ensure headings have IDs
    this.headings.forEach(heading => {
      if (!heading.element.id) {
        heading.element.id = heading.id;
      }
    });
  }

  generateId(heading) {
    return heading.textContent
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  generateTOC() {
    if (!this.tocContainer) return;

    // Clear existing content
    this.tocContainer.innerHTML = '';

    if (this.headings.length === 0) {
      const noContent = document.createElement('p');
      noContent.textContent = 'No headings found on this page';
      noContent.className = 'toc-loading';
      this.tocContainer.appendChild(noContent);
      return;
    }

    const tocList = document.createElement('ul');
    let currentH2 = null;

    this.headings.forEach(heading => {
      const listItem = document.createElement('li');
      const link = document.createElement('a');
      link.href = `#${heading.id}`;
      link.textContent = heading.title;
      link.className = 'toc-link';

      if (heading.level === 2) {
        // H2 level
        listItem.appendChild(link);
        tocList.appendChild(listItem);
        currentH2 = listItem;
      } else if (heading.level === 3 && currentH2) {
        // H3 level - nested under H2
        let subList = currentH2.querySelector('ul');
        if (!subList) {
          subList = document.createElement('ul');
          currentH2.appendChild(subList);
        }
        listItem.appendChild(link);
        subList.appendChild(listItem);
      }
    });

    this.tocContainer.appendChild(tocList);
  }

  setupIntersectionObserver() {
    const headingElements = this.headings.map(h => h.element);
    const callback = (entries) => {
      // 检查是否滚动到页面底部
      const scrollHeight = document.documentElement.scrollHeight;
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const clientHeight = document.documentElement.clientHeight;
      const isAtBottom = scrollTop + clientHeight >= scrollHeight - 50; // 50px 容错
      
      if (isAtBottom && this.headings.length > 0) {
        // 如果在底部，激活最后一个标题
        const lastHeading = this.headings[this.headings.length - 1];
        this.setActiveId(lastHeading.id);
        return;
      }
      
      let visible = entries.filter(e => e.isIntersecting);
      if (visible.length > 0) {
        // 取最上方可见heading
        visible.sort((a, b) => a.target.offsetTop - b.target.offsetTop);
        this.setActiveId(visible[0].target.id);
      }
    };
    const observer = new window.IntersectionObserver(callback, {
      root: null,
      rootMargin: '0px 0px -60% 0px',
      threshold: 0.1
    });
    headingElements.forEach(el => observer.observe(el));
    
    // 添加滚动监听以处理底部情况
    let scrollTimeout;
    window.addEventListener('scroll', () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        const scrollHeight = document.documentElement.scrollHeight;
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const clientHeight = document.documentElement.clientHeight;
        const isAtBottom = scrollTop + clientHeight >= scrollHeight - 50;
        
        if (isAtBottom && this.headings.length > 0) {
          const lastHeading = this.headings[this.headings.length - 1];
          this.setActiveId(lastHeading.id);
        }
      }, 100);
    }, { passive: true });
  }

  setActiveId(id) {
    // 移除所有active
    this.tocContainer.querySelectorAll('li').forEach(li => li.classList.remove('active'));
    // 高亮当前li及其父li
    const currentLink = this.tocContainer.querySelector(`a[href="#${id}"]`);
    if (currentLink) {
      let li = currentLink.parentElement;
      li.classList.add('active');
      // 如果是h3，父li也加active以展开子目录
      let parentUl = li.parentElement;
      if (parentUl && parentUl.parentElement.tagName === 'LI') {
        parentUl.parentElement.classList.add('active');
      }
    }
    this.activeId = id;
  }

  setupSmoothScrolling() {
    this.tocContainer.addEventListener('click', (e) => {
      if (e.target.classList.contains('toc-link')) {
        e.preventDefault();
        const targetId = e.target.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  }

  setupFadeInOnScroll() {
    // 监听页面滚动，判断TOC是否进入视口，并考虑滚动位置
    const toc = document.querySelector('.toc-container');
    const onScroll = () => {
      const rect = toc.getBoundingClientRect();
      const inView = rect.top < window.innerHeight && rect.bottom > 0;
      const scrolledEnough = window.scrollY >= 10; // 与下方逻辑一致
      
      if (inView && scrolledEnough) {
        toc.classList.add('fade-in');
      } else {
        toc.classList.remove('fade-in');
      }
    };
    window.addEventListener('scroll', onScroll);
    onScroll();
  }
}

// Initialize TOC when page is fully loaded
window.addEventListener('load', () => {
  const toc = new TableOfContents();
  console.log('TOC: Initialized with', toc.headings.length, 'headings');
});

// 返回顶部按钮逻辑 - 完全重构版本
(function() {
  'use strict';
  
  class BackToTopButton {
    constructor() {
      this.button = null;
      this.progressBar = null;
      this.isVisible = false;
      this.ticking = false;
      
      // 配置参数
      this.config = {
        showThreshold: 100,        // 显示按钮的滚动阈值
        progressCircumference: 175.929, // 圆周长 2 * Math.PI * 28
        scrollBehavior: 'smooth'   // 滚动行为
      };
      
      this.init();
    }
    
    init() {
      // 等待DOM加载完成
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => this.setup());
      } else {
        this.setup();
      }
    }
    
    setup() {
      this.button = document.getElementById('back-to-top');
      if (!this.button) {
        console.warn('Back to top button not found');
        return;
      }
      
      this.progressBar = this.button.querySelector('.back-to-top-progress-bar');
      if (!this.progressBar) {
        console.warn('Progress bar not found');
      }
      
      this.bindEvents();
      this.updateButton(); // 初始状态更新
    }
    
    bindEvents() {
      // 滚动事件优化
      window.addEventListener('scroll', this.handleScroll.bind(this), { passive: true });
      
      // 点击事件
      this.button.addEventListener('click', this.scrollToTop.bind(this));
      
      // 键盘支持
      this.button.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.scrollToTop();
        }
      });
      
      // 焦点管理
      this.button.addEventListener('focus', () => {
        this.button.style.outline = '2px solid #4f46e5';
        this.button.style.outlineOffset = '2px';
      });
      
      this.button.addEventListener('blur', () => {
        this.button.style.outline = '';
        this.button.style.outlineOffset = '';
      });
    }
    
    handleScroll() {
      if (!this.ticking) {
        requestAnimationFrame(() => {
          this.updateButton();
          this.ticking = false;
        });
        this.ticking = true;
      }
    }
    
    updateButton() {
      const scrollY = window.pageYOffset || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      
      // 更新按钮可见性
      this.updateVisibility(scrollY);
      
      // 更新进度条
      this.updateProgress(scrollY, docHeight);
    }
    
    updateVisibility(scrollY) {
      const shouldShow = scrollY > this.config.showThreshold;
      
      if (shouldShow !== this.isVisible) {
        this.isVisible = shouldShow;
        this.button.classList.toggle('visible', shouldShow);
        
        // 更新aria属性
        this.button.setAttribute('aria-hidden', !shouldShow);
      }
    }
    
    updateProgress(scrollY, docHeight) {
      if (!this.progressBar || docHeight <= 0) return;
      
      const progress = Math.min(scrollY / docHeight, 1);
      const offset = this.config.progressCircumference * (1 - progress);
      
      this.progressBar.style.strokeDashoffset = offset;
    }
    
    scrollToTop() {
      try {
        window.scrollTo({
          top: 0,
          behavior: this.config.scrollBehavior
        });
      } catch (e) {
        // 降级处理
        window.scrollTo(0, 0);
      }
      
      // 焦点管理
      this.button.blur();
    }
  }
  
  // 创建实例
  new BackToTopButton();
})();
