# HXTII Markdown 渲染使用指南

## 概述

本项目集成了 HXTII 库，可以在内容页面中自动渲染 Markdown 内容。Home 页面不受影响，保持原有设计。

## 使用方法

### 方式一：使用 Markdown 字符串（推荐）

#### 步骤 1：创建 JS 内容文件

在 `static/wiki/` 目录下创建对应页面的 JS 文件，例如 `human-practices.js`：

```javascript
window.hxtIsMarkdown = true;
let markdownString = String.raw`
# 页面标题

## 第一节
这是第一节的内容...

## 第二节
这是第二节的内容...

### 子标题
- 列表项 1
- 列表项 2

![图片描述](https://static.igem.wiki/teams/YOUR_TEAM_NUMBER/images/your-image.png)
`;
```

**注意事项：**
- 必须设置 `window.hxtIsMarkdown = true;`
- 使用 `String.raw` 可以避免转义字符问题
- 图片路径请使用 iGEM 官方图床或相对路径

#### 步骤 2：在 HTML 页面中引入

在 `wiki/pages/` 下的 HTML 文件中：

```html
{% extends "layout.html" %}
  
{% block title %}Human Practices{% endblock %}
{% block lead %}页面副标题描述{% endblock %}

{% block page_content %}
<!-- 引入 markdown 内容文件 -->
<script type="text/javascript" src="{{ url_for('static', filename = 'wiki/human-practices.js') }}"></script>
{% endblock %}
```

**关键点：**
- 使用 Flask 的 `url_for` 函数引用静态文件
- 只需要一行 `<script>` 标签，其他都由 `layout.html` 自动处理
- 不需要手动添加 `<div id="HXT">` 容器

### 方式二：使用 HXTII 内容格式

如果您习惯使用 HXTII 的原生格式：

```javascript
// 不设置 hxtIsMarkdown
var hxtiiContent = [
  {
    "tag": "h1",
    "text": "标题"
  },
  {
    "tag": "p",
    "text": "段落内容"
  }
  // ... 更多内容
];
```

然后在 HTML 中引入即可，系统会自动识别格式。

## 功能特性

### 1. 自动目录生成

- ✅ 左侧目录自动从 Markdown 的 `##` 标题（H2）生成
- ✅ 点击目录项可以平滑滚动到对应章节
- ✅ 支持响应式设计（移动端自适应）

### 2. 返回顶部按钮

- ✅ 滚动超过 300px 自动显示
- ✅ 带有进度环显示当前滚动位置
- ✅ 平滑滚动动画

### 3. Markdown 支持

支持标准 Markdown 语法：
- 标题 (`#`, `##`, `###`, etc.)
- 列表（有序/无序）
- 链接和图片
- 粗体/斜体
- 代码块
- 引用块
- 表格

## 实际示例

### 文件结构

```
jilin-ai/
├── static/
│   └── wiki/
│       ├── human-practices.js       # Markdown 内容
│       ├── description.js
│       └── engineering.js
└── wiki/
    └── pages/
        ├── human-practices.html     # HTML 模板
        ├── description.html
        └── engineering.html
```

### human-practices.html 完整示例

```html
{% extends "layout.html" %}
  
{% block title %}Human Practices{% endblock %}
{% block lead %}We ask every team to think deeply and creatively about whether their project is responsible and good for the world.{% endblock %}

{% block page_content %}
<!-- 只需要这一行，引入 markdown 内容 -->
<script type="text/javascript" src="{{ url_for('static', filename = 'wiki/human-practices.js') }}"></script>
{% endblock %}
```

### human-practices.js 完整示例

```javascript
window.hxtIsMarkdown = true;
let markdownString = String.raw`
# CCiC Report · Jilin-AI in Beijing Opening Ceremony

## 01 Company Visit

Before the conference, Jilin-AI was invited to visit 北京深势科技公司...

![Company Visit](https://static.igem.wiki/teams/5551/images/company-visit.png)

## 02 Project Presentation

On the second day, Jilin-AI presented their project BiomniGEM...

## 03 Poster Discussion

At the poster exhibition, Jilin-AI's booth attracted many visitors...
`;
```

## 图片使用建议

### 上传到 iGEM 图床

1. 将图片上传到 iGEM 官方图床
2. 获取图片 URL（格式：`https://static.igem.wiki/teams/YOUR_TEAM_NUMBER/images/xxx.png`）
3. 在 Markdown 中使用：

```markdown
![图片描述](https://static.igem.wiki/teams/5551/images/photo.png)
```

### 使用本地静态文件

如果要使用项目中的静态图片：

```markdown
![图片描述](/static/images/photo.png)
```

## 常见问题

### Q1: 为什么内容没有显示？

**检查清单：**
1. ✅ JS 文件路径是否正确？使用 `url_for` 函数
2. ✅ 是否设置了 `window.hxtIsMarkdown = true;`？
3. ✅ 变量名是 `markdownString` 而不是其他？
4. ✅ 浏览器控制台是否有报错？

### Q2: 目录没有生成怎么办？

- 确保 Markdown 中使用了 `##` 二级标题
- HXTII 只从 H2 标题生成目录
- 检查浏览器控制台是否有错误

### Q3: 图片不显示？

- 检查图片 URL 是否正确
- 确保图片已上传到 iGEM 图床
- 本地路径在 Markdown 中使用斜杠 `/` 而不是反斜杠 `\`

### Q4: 如何在 Home 页不使用 HXTII？

- 无需担心！系统已自动配置
- `layout.html` 中的条件判断确保 Home 页不受影响
- 只有 `{% block page_content %}` 的页面会启用 HXTII

## 样式自定义

如果需要自定义 HXTII 渲染的样式，可以在 `static/style.css` 中添加：

```css
/* HXTII 内容样式 */
#HXT h2 {
  color: #2563eb;
  margin-top: 2rem;
}

#HXT img {
  max-width: 100%;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

#HXT code {
  background-color: #f3f4f6;
  padding: 2px 6px;
  border-radius: 4px;
}
```

## 调试技巧

### 在浏览器控制台检查变量

打开浏览器控制台（F12），输入：

```javascript
// 检查是否加载了 markdown 内容
console.log(window.hxtIsMarkdown);
console.log(markdownString);

// 检查 HXTII 实例
console.log(window.hxt);

// 检查标题列表
console.log(window.hxt.titleGradeList);
```

### 查看渲染结果

```javascript
// 查看 HXT 容器
document.getElementById('HXT');

// 查看生成的目录
document.getElementById('toc-content');
```

## 最佳实践

1. **内容组织**
   - 使用清晰的标题结构（H1 > H2 > H3）
   - 每个 H2 标题会出现在左侧目录中
   - 避免标题嵌套过深

2. **图片优化**
   - 压缩图片大小（推荐 < 500KB）
   - 使用描述性的 alt 文本
   - 统一使用 iGEM 图床

3. **代码规范**
   - JS 文件使用 UTF-8 编码
   - 使用 `String.raw` 避免转义问题
   - 保持 Markdown 语法规范

4. **性能优化**
   - 避免单个页面内容过长（建议 < 50KB）
   - 图片使用 CDN 加速
   - 必要时可分页展示

## 技术支持

如遇问题，请检查：
1. 浏览器控制台错误信息
2. Flask 后端日志
3. HXTII 库版本兼容性

---

**最后更新时间：** 2025-10-04  
**版本：** 1.0  
**作者：** Jilin-AI Team

