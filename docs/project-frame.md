# Jilin-AI 2025 iGEM Wiki 项目框架文档

## 项目概述

**项目名称**: BIOMNIGEM - Team Jilin-AI 2025 iGEM Competition Wiki  
**项目类型**: 多模态AI框架生物研究Wiki网站  
**技术栈**: Flask + Frozen-Flask + Bootstrap + 静态站点生成  
**部署方式**: GitHub Pages / GitLab Pages  
**许可证**: CC-BY-4.0  

## 项目架构

### 核心架构模式
- **静态站点生成器**: 基于Flask-Frozen的静态HTML生成
- **模板引擎**: Jinja2模板系统
- **前端框架**: Bootstrap 5 + 自定义CSS/JS
- **构建系统**: Python脚本自动化构建

### 技术栈详情
- **后端**: Flask 3.1.0+ (开发服务器)
- **静态生成**: Frozen-Flask 1.0.0+
- **前端**: Bootstrap 5.3, FontAwesome 6.4.2
- **字体**: Google Fonts (Merriweather, Playfair Display, Montserrat)
- **构建工具**: Python 3.13+, uv包管理器
- **代码质量**: Black, Ruff, MyPy, Pytest

## 目录结构详解

```
jilin-ai/
├── app.py                    # Flask应用主入口
├── build.py                  # 静态站点构建脚本
├── requirements.txt          # Python依赖包
├── pyproject.toml           # 项目配置和元数据
├── README.md                # 项目说明文档
├── LICENSE                  # CC-BY-4.0许可证
├── uv.lock                  # uv锁定文件
├── dependencies.txt         # 依赖包列表
├── jilin-ai.code-workspace  # VS Code工作区配置
│
├── docs/                    # 项目文档目录
│   ├── wiki-frame.md       # Wiki框架文档
│   └── project-frame.md    # 项目框架文档(本文件)
│
├── static/                  # 静态资源目录
│   ├── bootstrap.min.css    # Bootstrap CSS框架
│   ├── bootstrap.bundle.min.js # Bootstrap JS框架
│   ├── style.css           # 自定义样式文件
│   ├── site-search.js      # 站内搜索功能
│   ├── table-of-contents.js # 目录生成和导航
│   ├── theme-toggle.js     # 主题切换功能
│   ├── dropdown-nav.js     # 下拉导航功能
│   ├── search-index.json   # 搜索索引数据
│   ├── jilinai.ico         # 网站图标
│   ├── cur_dna_32.cur      # DNA光标文件
│   └── cur_trna_32.cur     # tRNA光标文件
│
├── wiki/                    # Wiki模板和页面目录
│   ├── layout.html         # 主布局模板
│   ├── menu.html           # 导航菜单模板
│   ├── footer.html         # 页脚模板
│   └── pages/              # 页面内容目录
│       ├── home.html       # 首页
│       ├── description.html # 项目描述
│       ├── engineering.html # 工程实现
│       ├── contribution.html # 贡献说明
│       ├── software.html   # 软件工具
│       ├── timeline.html   # 时间线
│       ├── experiments.html # 实验记录
│       ├── safety-and-security.html # 安全与安全
│       ├── overview.html   # 模型概览
│       ├── model.html      # 模型详情
│       ├── results.html    # 结果展示
│       ├── human-practices.html # 人类实践
│       ├── education.html  # 教育推广
│       ├── collaboration.html # 合作交流
│       ├── inclusivity.html # 包容性
│       ├── entrepreneurship.html # 创业实践
│       ├── sustainability.html # 可持续性
│       ├── members.html    # 团队成员
│       ├── attributions.html # 致谢
│       ├── awards.html     # 奖项荣誉
│       ├── hardware.html   # 硬件设计
│       ├── measurement.html # 测量方法
│       ├── notebook.html   # 实验记录本
│       ├── plant.html      # 植物相关
│       └── proof-of-concept.html # 概念验证
│
└── scripts/                 # 工具脚本目录
    ├── build_search_index.py # 搜索索引构建
    ├── convert_md_to_html.py # Markdown转HTML
    ├── advanced_converter.py # 高级转换器
    ├── conversion_config.yaml # 转换配置
    ├── conversion_mapping.json # 转换映射
    ├── Convert-MarkdownToHtml.ps1 # PowerShell转换脚本
    ├── test_document.md    # 测试文档
    └── test_output/        # 测试输出目录
        ├── description.html
        ├── engineering.html
        └── results.html
```

## 核心文件功能详解

### 1. Flask应用 (`app.py`)
```python
# 主要功能:
- Flask应用初始化
- 路由配置 (首页和动态页面路由)
- 静态文件配置
- 错误处理 (404页面)
- 开发服务器启动 (端口8080)
- Flask-Frozen集成
```

**关键特性**:
- 动态路由: `/<page>` 自动匹配 `wiki/pages/` 中的HTML文件
- 错误处理: 404错误自动重定向到首页
- 静态文件服务: 自动服务 `static/` 目录
- 模板目录: 指向 `wiki/` 目录

### 2. 构建脚本 (`build.py`)
```python
# 主要功能:
- 静态站点生成
- 清理和重建dist目录
- 静态资源复制
- 构建状态报告
- 文件列表输出
```

**构建流程**:
1. 清理现有 `dist/` 目录
2. 配置Flask-Frozen
3. 生成静态HTML文件
4. 复制静态资源到 `dist/static/`
5. 输出构建结果统计

### 3. 项目配置 (`pyproject.toml`)
```toml
# 项目元数据:
- 项目名称: jilin-ai
- 版本: 0.1.0
- 描述: BIOMNIGEM多模态AI框架
- Python版本要求: >=3.13
- 许可证: CC-BY-4.0

# 依赖包:
- flask>=3.1.0
- frozen-flask>=1.0.0
- python-dotenv>=1.0.0
- werkzeug>=3.0.0

# 开发工具:
- pytest (测试)
- black (代码格式化)
- ruff (代码检查)
- mypy (类型检查)
```

## Wiki模板系统

### 1. 主布局 (`layout.html`)
**核心特性**:
- 响应式设计 (Bootstrap 5)
- 主题切换 (明暗模式)
- 无障碍访问支持
- 神经网络加载动画
- 目录导航系统
- 返回顶部按钮

**布局结构**:
```html
<!DOCTYPE html>
<html>
<head>
  <!-- 元数据、CSS、字体 -->
</head>
<body>
  <!-- 加载动画 -->
  <!-- 导航菜单 -->
  <!-- 页面内容 (首页特殊布局/标准布局) -->
  <!-- 页脚 -->
  <!-- JavaScript脚本 -->
</body>
</html>
```

### 2. 导航菜单 (`menu.html`)
**菜单结构**:
- **Home**: 首页
- **Project**: 项目相关 (Description, Engineering, Contribution)
- **Dry Lab**: 干实验 (Software, Timeline, Experiments, Safety)
- **Model**: 模型相关 (Overview, Model, Results)
- **Human Practice**: 人类实践 (Human Practice, Education, Collaboration, Inclusivity, Entrepreneurship, Sustainability)
- **Team**: 团队信息 (Members, Attributions)
- **Awards**: 奖项荣誉

**交互功能**:
- 响应式下拉菜单
- 站内搜索功能
- 主题切换器
- 无障碍键盘导航

### 3. 页脚 (`footer.html`)
**内容模块**:
- 合作伙伴Logo轮播
- 相关团队链接
- 联系方式 (邮箱、微信、B站、Instagram)
- 许可证信息 (CC-BY-4.0)
- GitLab仓库链接

## 静态资源系统

### 1. 样式系统 (`style.css`)
**设计主题**: 蓝紫色渐变科技风格
**核心功能**:
- 无障碍访问类
- 主题切换器样式
- 神经网络加载动画
- 响应式布局
- 自定义组件样式
- 动画和过渡效果

### 2. JavaScript功能模块

#### 站内搜索 (`site-search.js`)
```javascript
class SiteSearch {
  // 功能特性:
  - 静态内容搜索
  - 实时搜索建议
  - 搜索结果高亮
  - 键盘导航支持
  - 搜索历史记录
}
```

#### 目录生成 (`table-of-contents.js`)
```javascript
// 功能特性:
- 自动生成页面目录
- 浮动目录导航
- 平滑滚动效果
- 当前章节高亮
- 可折叠子章节
- 神经网络加载动画
```

#### 主题切换 (`theme-toggle.js`)
```javascript
// 功能特性:
- 明暗主题切换
- 系统主题跟随
- 主题状态持久化
- 无障碍访问支持
```

## 工具脚本系统

### 1. 搜索索引构建 (`build_search_index.py`)
**功能**: 从HTML文件提取文本内容，生成静态搜索索引
```python
class SearchIndexBuilder:
  # 主要方法:
  - extract_text_content() # 提取文本内容
  - build_search_index()   # 构建搜索索引
  - save_index()          # 保存索引文件
```

### 2. Markdown转换器 (`convert_md_to_html.py`)
**功能**: 将Markdown文档转换为HTML页面
```python
class MarkdownToHTMLConverter:
  # 主要方法:
  - convert_markdown()    # Markdown转HTML
  - apply_template()      # 应用模板
  - save_html()          # 保存HTML文件
```

### 3. 高级转换器 (`advanced_converter.py`)
**功能**: 支持复杂转换规则的高级转换工具

## 页面内容组织

### 页面分类体系
1. **项目核心** (Project)
   - Description: 项目描述和背景
   - Engineering: 工程实现方案
   - Contribution: 对社区的贡献

2. **干实验** (Dry Lab)
   - Software: 软件工具和算法
   - Timeline: 项目时间线
   - Experiments: 实验设计和结果
   - Safety and Security: 安全考虑

3. **模型系统** (Model)
   - Overview: 模型架构概览
   - Model: 详细模型实现
   - Results: 实验结果和分析

4. **人类实践** (Human Practice)
   - Human Practice: 人类实践总结
   - Education: 教育推广活动
   - Collaboration: 合作交流
   - Inclusivity: 包容性实践
   - Entrepreneurship: 创业实践
   - Sustainability: 可持续性考虑

5. **团队信息** (Team)
   - Members: 团队成员介绍
   - Attributions: 致谢和引用

6. **其他页面**
   - Awards: 奖项和荣誉
   - Hardware: 硬件设计
   - Measurement: 测量方法
   - Notebook: 实验记录本

## 开发工作流

### 1. 本地开发
```bash
# 安装依赖
uv sync

# 启动开发服务器
uv run app.py
# 或
python app.py

# 访问: http://localhost:8080
```

### 2. 静态站点构建
```bash
# 构建静态站点
python build.py

# 输出目录: dist/
```

### 3. 内容更新流程
1. 编辑 `wiki/pages/` 中的HTML文件
2. 更新 `static/` 中的资源文件
3. 运行搜索索引构建: `python scripts/build_search_index.py`
4. 测试本地服务器
5. 提交到Git仓库
6. 自动部署到Pages

## 部署配置

### 1. GitHub Pages
- 构建输出目录: `dist/`
- 自动部署: 通过GitHub Actions
- 域名: `https://2025.igem.wiki/jilin-ai`

### 2. GitLab Pages
- 构建输出目录: `public/`
- 自动部署: 通过GitLab CI/CD
- 域名: `https://gitlab.igem.org/2025/jilin-ai`

## 性能优化

### 1. 静态资源优化
- CSS/JS文件压缩
- 图片优化和懒加载
- 字体文件优化
- CDN资源使用

### 2. 搜索性能
- 静态搜索索引
- 客户端搜索实现
- 搜索结果缓存
- 防抖搜索输入

### 3. 用户体验
- 神经网络加载动画
- 平滑滚动和过渡
- 响应式设计
- 无障碍访问支持

## 维护和扩展

### 1. 内容管理
- HTML页面直接编辑
- Markdown转换工具支持
- 批量内容更新脚本
- 搜索索引自动更新

### 2. 功能扩展
- 新页面模板系统
- 自定义组件开发
- 第三方集成支持
- 多语言支持准备

### 3. 代码质量
- 自动化测试 (Pytest)
- 代码格式化 (Black)
- 代码检查 (Ruff)
- 类型检查 (MyPy)

## 技术债务和已知问题

### 1. 当前限制
- 搜索功能仅支持英文内容
- 主题切换在某些浏览器中可能不完整
- 移动端导航菜单需要进一步优化

### 2. 待优化项目
- 图片懒加载实现
- 搜索性能优化
- 多语言支持
- 更丰富的动画效果

## 总结

Jilin-AI 2025 iGEM Wiki项目采用了现代化的静态站点生成架构，结合了Flask的灵活性和静态站点的性能优势。项目具有良好的可维护性、可扩展性和用户体验，完全符合iGEM竞赛的Wiki要求。

**核心优势**:
- 快速加载的静态站点
- 完整的搜索功能
- 响应式设计
- 无障碍访问支持
- 自动化构建和部署
- 良好的代码组织结构

**适用场景**:
- iGEM竞赛Wiki
- 学术项目展示
- 静态文档站点
- 多语言内容管理

---

*文档最后更新: 2025年1月*
*维护者: Team Jilin-AI*
