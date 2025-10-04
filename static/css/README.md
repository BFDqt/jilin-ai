# CSS 模块化架构说明

## 📁 文件结构概览

本项目的CSS采用模块化架构，将原来的单一`style.css`文件（2000+行）拆分为5个专门的模块文件，每个文件负责特定的功能领域，提高代码的可维护性和团队协作效率。

```
static/css/
├── base.css           # 基础设置 (270行)
├── navbar.css         # 导航栏 (300行)
├── layout.css         # 布局 (350行)
├── components.css     # 组件 (400行)
├── animations.css     # 动画 (350行)
├── style.css.backup   # 原文件备份
└── README.md          # 本说明文件
```

## 🔧 各模块详细说明

### 1. base.css - 基础设置 (270行)
**用途**: 全局基础样式和主题系统的核心文件
**加载优先级**: 最高 (第1个加载)

#### 主要内容:
- **滚动条隐藏**: 跨浏览器兼容的滚动条隐藏样式
- **无障碍类**: `.visually-hidden`, `.skip-link` 等辅助功能样式
- **CSS变量定义**: 完整的主题变量系统
  ```css
  [data-theme="light"] { --primary-color: #4f46e5; }
  [data-theme="dark"] { --primary-color: #8b5cf6; }
  ```
- **全局样式**: `body`, 基础字体, 背景等
- **字体和文本样式**: 标题层级, 文本颜色类
- **辅助类**: 间距, 颜色, 显示等工具类

#### 使用场景:
- 修改主题颜色配置
- 添加新的全局样式变量
- 调整基础字体和文本样式

---

### 2. navbar.css - 导航栏 (300行)
**用途**: 导航栏及相关交互组件的完整样式
**加载优先级**: 高 (第2个加载)

#### 主要内容:
- **主题切换器**: 三态主题切换按钮的完整样式和交互
- **导航栏基础样式**: 毛玻璃效果、阴影、定位等
- **品牌LOGO样式**: BIOMNIGEM字母动画效果
  ```css
  .brand-letter { animation: brand-glow-move 3s linear infinite; }
  ```
- **导航链接样式**: 悬停效果、文字样式
- **下拉菜单样式**: 毛玻璃下拉菜单及其动画

#### 使用场景:
- 修改导航栏外观
- 调整品牌LOGO动画
- 自定义下拉菜单样式
- 主题切换器功能调整

---

### 3. layout.css - 页面布局 (350行)
**用途**: 页面整体布局和主要内容区域样式
**加载优先级**: 中 (第3个加载)

#### 主要内容:
- **英雄区域布局**: `.bg-hero` 渐变背景和基础布局
- **现代英雄头部**: 完整的英雄区设计
  ```css
  .modern-hero-header { min-height: 60vh; }
  .hero-gradient { animation: gradientShift 8s ease-in-out infinite; }
  ```
- **主要内容布局**: `.content-section`, `.text-content` 等
- **TOC目录样式**: 悬浮目录的完整样式和交互
- **页脚样式**: 页脚渐变和链接样式
- **响应式设计**: 各种屏幕尺寸的适配

#### 使用场景:
- 调整页面整体布局
- 修改英雄区设计
- 自定义内容区域样式
- 响应式布局调整

---

### 4. components.css - 组件样式 (400行)
**用途**: 可复用组件的样式定义
**加载优先级**: 中 (第4个加载)

#### 主要内容:
- **按钮样式**: `.btn-primary` 渐变按钮
- **返回顶部按钮**: 完整的浮动返回顶部组件
  ```css
  .back-to-top-btn { 
    position: fixed; 
    backdrop-filter: blur(10px); 
  }
  ```
- **站内搜索样式**: 搜索框和结果下拉的完整样式
- **合作伙伴Logo滚动**: 无限滚动logo展示
- **联系方式样式**: 联系信息的格式化样式
- **友情链接样式**: 链接悬停效果

#### 使用场景:
- 添加新的UI组件
- 修改现有组件样式
- 自定义按钮和交互元素
- 调整搜索功能样式

---

### 5. animations.css - 动画效果 (350行)
**用途**: 所有动画效果和过渡的集中管理
**加载优先级**: 低 (最后加载)

#### 主要内容:
- **神经网络加载动画**: 完整的页面加载动画
- **英雄区域动画**: 
  ```css
  @keyframes gradientShift { /* 渐变移动 */ }
  @keyframes particleFloat { /* 粒子浮动 */ }
  ```
- **品牌字母跳动动画**: LOGO字母的交互动画
- **通用动画关键帧**: 淡入、滑入、缩放等通用动画
- **脉冲和呼吸效果**: `.pulse`, `.breathing`, `.glow` 等效果类
- **悬停效果动画**: `.hover-lift`, `.hover-scale` 等交互动画
- **响应式动画优化**: 减少动画偏好的支持

#### 使用场景:
- 添加新的动画效果
- 修改现有动画参数
- 性能优化动画
- 减少动画偏好适配

## 🚀 加载顺序和依赖关系

CSS文件按以下顺序在 `layout.html` 中加载：

```html
<!-- 1. 基础设置 - 必须最先加载 -->
<link href="{{ url_for('static', filename='css/base.css') }}" rel="stylesheet">

<!-- 2. 导航栏 - 依赖base.css的变量 -->
<link href="{{ url_for('static', filename='css/navbar.css') }}" rel="stylesheet">

<!-- 3. 布局 - 依赖base.css的变量和全局样式 -->
<link href="{{ url_for('static', filename='css/layout.css') }}" rel="stylesheet">

<!-- 4. 组件 - 依赖前面的基础样式 -->
<link href="{{ url_for('static', filename='css/components.css') }}" rel="stylesheet">

<!-- 5. 动画 - 最后加载，非阻塞 -->
<link href="{{ url_for('static', filename='css/animations.css') }}" rel="stylesheet">
```

### 依赖关系:
- `base.css` ← 所有其他文件依赖其CSS变量
- `navbar.css` ← 依赖base.css的主题变量
- `layout.css` ← 依赖base.css的变量和全局样式
- `components.css` ← 依赖base.css和layout.css
- `animations.css` ← 独立，但引用其他文件中的类名

## 🎨 主题系统

主题系统在 `base.css` 中定义，支持亮色和暗色主题：

### 主要变量:
```css
/* 亮色主题 */
[data-theme="light"] {
  --primary-color: #4f46e5;
  --bg-primary: linear-gradient(135deg, #dbeafe 0%, #e0e7ff 100%);
  --text-primary: #1f2937;
  /* ... 更多变量 */
}

/* 暗色主题 */
[data-theme="dark"] {
  --primary-color: #8b5cf6;
  --bg-primary: #0f172a;
  --text-primary: #f1f5f9;
  /* ... 更多变量 */
}
```

### 使用主题变量:
```css
.my-component {
  background: var(--bg-primary);
  color: var(--text-primary);
  border-color: var(--border-color);
}
```

## 🛠️ 开发指南

### 添加新样式时的最佳实践:

1. **确定样式归属**:
   - 全局基础样式 → `base.css`
   - 导航相关 → `navbar.css`
   - 布局相关 → `layout.css`
   - 独立组件 → `components.css`
   - 动画效果 → `animations.css`

2. **使用CSS变量**:
   ```css
   /* ✅ 推荐 */
   .new-component {
     background: var(--card-bg);
     color: var(--text-primary);
   }
   
   /* ❌ 不推荐 */
   .new-component {
     background: #ffffff;
     color: #1f2937;
   }
   ```

3. **保持响应式设计**:
   ```css
   .my-component {
     /* 桌面端样式 */
   }
   
   @media (max-width: 768px) {
     .my-component {
       /* 移动端样式 */
     }
   }
   ```

4. **动画性能优化**:
   ```css
   .animated-element {
     will-change: transform;
     transform: translateZ(0); /* 开启硬件加速 */
   }
   ```

### 修改现有样式:

1. **定位文件**: 使用文件内容概览快速定位
2. **保持一��性**: 遵循现有的命名约定和结构
3. **测试主题**: 确保在亮色和暗色主题下都正常显示
4. **检查响应式**: 在不同屏幕尺寸下测试

## 📋 维护清单

### 定期维护任务:

- [ ] **性能检查**: 使用浏览器开发者工具检查CSS加载性能
- [ ] **代码重复检查**: 定期检查是否有重复的样式定义
- [ ] **未使用样式清理**: 移除不再使用的CSS规则
- [ ] **浏览器兼容性测试**: 确保在主流浏览器中正常显示
- [ ] **主题一致性检查**: 确保新添加的样式支持主题切换

### 添加新页面时:

1. 在相应的模块文件中添加页面特定样式
2. 如果需要大量特定样式，考虑创建独立的页面CSS文件
3. 更新本README文件记录新增的样式

## 🔄 版本历史

| 版本 | 日期 | 变更说明 |
|------|------|----------|
| v2.0.0 | 2025-10-05 | 完成CSS模块化重构，拆分为5个专门文件 |
| v1.0.0 | - | 原始单一style.css文件 |

## 📞 技术支持

如果在使用过程中遇到问题：

1. **样式冲突**: 检查CSS加载顺序和特异性
2. **主题问题**: 确认是否正确使用CSS变量
3. **响应式问题**: 检查媒体查询断点
4. **动画性能**: 考虑使用 `transform` 和 `opacity` 进行动画

---

**最后更新**: 2025年10月5日  
**维护者**: BIOMNIGEM开发团队