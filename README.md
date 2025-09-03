# Console-v2 🚀

一个功能强大的前端开发控制台工具，支持彩色、图片、多格式日志输出。

## ✨ 主要特性

### 🎨 彩色日志系统
- **16种预定义颜色**：包含基础颜色、扩展颜色和语义化颜色
- **自定义颜色支持**：支持任意HEX、RGB、HSL颜色值
- **背景色和渐变**：支持纯色背景和CSS渐变背景
- **文字样式组合**：支持粗体、斜体、下划线等样式组合

### 🖼️ 图片日志功能
- **单张图片显示**：支持自定义尺寸、适配模式、标题等
- **批量图片加载**：支持并发控制、进度显示、错误处理
- **图片网格布局**：支持自定义列数、间距、最大宽度
- **自适应尺寸**：自动计算宽高比例，支持多种适配模式

### 🎭 SVG 支持
- **自定义SVG图形**：支持任意SVG代码和样式
- **预定义图标库**：内置常用图标（星星、爱心、检查、警告等）
- **进度条组件**：可自定义尺寸、颜色、是否显示文字
- **图表生成器**：支持柱状图和饼图，自动计算布局

### 📊 格式化工具
- **数据表格显示**：支持索引、标题、列宽控制、颜色主题
- **进度条组件**：支持自定义宽度、字符、百分比显示
- **时间戳格式化**：精确到毫秒的时间格式化
- **分组日志管理**：支持展开/折叠的分组日志

## 🚀 快速开始

### 安装

```bash
npm install console-v2
```

### 基础使用

```javascript
import console from 'console-v2';

// 彩色日志
console.log('%c红色文字', console.color(console.colors.red));
console.success('成功消息');
console.error('错误消息');
console.warning('警告消息');
console.info('信息消息');

// 图片日志
await console.img('https://example.com/image.jpg', { 
  width: 200, 
  height: 100,
  title: '示例图片'
});

// SVG功能
console.svgIcon('star', 32, console.colors.orange);
console.svgProgressBar(75);

// 格式化工具
console.table(data, { title: '数据表' });
console.progress(65, 100);
```

## 📚 详细功能说明

### 颜色系统

```javascript
// 预定义颜色
console.colors.red      // #FF0000
console.colors.green    // #00FF00
console.colors.blue     // #0000FF
console.colors.success  // #28A745
console.colors.error    // #DC3545
console.colors.warning  // #FFC107
console.colors.info     // #17A2B8

// 创建颜色样式
console.color(console.colors.red, [console.styles.bold]);
console.bg(console.colors.green, console.colors.white);
console.gradient('linear-gradient(45deg, #ff6b6b, #4ecdc4)', console.colors.white);
```

### 图片功能

```javascript
// 单张图片
await console.img('https://example.com/image.jpg', {
  title: '图片标题',
  width: 300,
  height: 200,
  fit: 'cover',        // contain, cover, fill
  showInfo: true,      // 是否显示图片信息
  colors: true,        // 是否启用颜色
  debug: false         // 是否显示调试信息
});

// 批量图片
await console.imgBatch([
  'https://example.com/image1.jpg',
  'https://example.com/image2.jpg',
  'https://example.com/image3.jpg'
], {
  maxConcurrent: 3,    // 最大并发数
  showProgress: true,  // 是否显示进度
  colors: true         // 是否启用颜色
});

// 图片网格
await console.imgGrid([
  'https://example.com/image1.jpg',
  'https://example.com/image2.jpg',
  'https://example.com/image3.jpg'
], {
  columns: 3,          // 列数
  spacing: 10,         // 间距
  maxWidth: 800        // 最大宽度
});
```

### SVG 功能

```javascript
// 基础SVG
console.svg(`
  <svg viewBox="0 0 100 100" width="100" height="100">
    <circle cx="50" cy="50" r="40" fill="#ff6b6b"/>
    <text x="50" y="55" text-anchor="middle" fill="white">Hello</text>
  </svg>
`);

// 彩色SVG
console.svgColor(`
  <svg viewBox="0 0 100 100" width="100" height="100">
    <rect width="100" height="100" fill="#4ecdc4"/>
  </svg>
`, console.colors.blue, console.colors.yellow);

// SVG图标
console.svgIcon('star', 32, console.colors.orange, { 
  title: '星星图标',
  bgColor: console.colors.lightGray 
});

// 可用图标：check, close, info, warning, error, star, heart, arrow

// SVG进度条
console.svgProgressBar(75, { 
  width: 300, 
  height: 25,
  color: console.colors.success,
  showText: true 
});

// SVG图表
const data = [23, 45, 67, 89, 12, 34];
console.svgChart(data, { 
  type: 'bar',         // bar 或 pie
  title: '销售数据',
  width: 400, 
  height: 200,
  showValues: true,
  colors: [console.colors.blue, console.colors.green, console.colors.orange]
});
```

### 格式化工具

```javascript
// 数据表格
const data = [
  { name: '张三', age: 25, city: '北京', score: 95 },
  { name: '李四', age: 30, city: '上海', score: 88 },
  { name: '王五', age: 28, city: '广州', score: 92 }
];

console.table(data, { 
  title: '用户信息表',
  showIndex: true,     // 是否显示索引
  maxWidth: 80,        // 最大列宽
  colors: true         // 是否启用颜色
});

// 进度条
console.progress(65, 100, { 
  width: 40,           // 进度条宽度
  showPercentage: true, // 是否显示百分比
  showNumbers: true,   // 是否显示数字
  fillChar: '█',       // 填充字符
  emptyChar: '░'       // 空白字符
});

// 时间戳
console.timeLog('这是一条带时间戳的日志');
console.timeLog('这是另一条时间日志', 'warn');

// 分组日志
console.group('详细信息', false);  // false表示默认展开
console.log('这是分组内的日志');
console.log('可以包含多条信息');
console.groupEnd();
```

## 🎯 使用场景

### 开发调试
```javascript
// 调试API响应
console.group('API 调试信息');
console.success('请求成功');
console.table(response.data, { title: '响应数据' });
console.svgProgressBar(100, { title: '请求完成' });
console.groupEnd();
```

### 性能监控
```javascript
// 性能数据展示
const performanceData = [85, 92, 78, 95, 88, 91, 87, 94, 89, 93];
console.svgChart(performanceData, { 
  type: 'bar', 
  title: '页面性能得分',
  width: 500, 
  height: 150 
});

const avgScore = performanceData.reduce((a, b) => a + b, 0) / performanceData.length;
if (avgScore >= 90) {
  console.success('性能表现优秀！');
} else if (avgScore >= 80) {
  console.warning('性能表现良好，有改进空间');
} else {
  console.error('性能需要优化');
}
```

### 系统状态监控
```javascript
// 系统状态报告
const titleStyle = console.color(console.colors.purple, [console.styles.bold, console.styles.large]);
console.log(`%c${console.timestamp()} - 系统状态报告`, titleStyle);

const systemStatus = [
  { service: 'Web服务器', status: '运行中', uptime: '15天' },
  { service: '数据库', status: '运行中', uptime: '30天' },
  { service: '缓存服务', status: '维护中', uptime: '2小时' }
];

console.table(systemStatus, { title: '系统服务状态' });

systemStatus.forEach(item => {
  const iconName = item.status === '运行中' ? 'check' : 'warning';
  const iconColor = item.status === '运行中' ? console.colors.success : console.colors.warning;
  
  console.svgIcon(iconName, 16, iconColor, { 
    title: `${item.service}: ${item.status}` 
  });
});
```

## 🌐 浏览器兼容性

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## 📖 在线演示

打开 `test/browser.html` 文件在浏览器中查看所有功能的演示。

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

MIT License

## 🔗 相关链接

- [GitHub 仓库](https://github.com/ethwillupto10000/console-v2)
- [问题反馈](https://github.com/ethwillupto10000/console-v2/issues)


