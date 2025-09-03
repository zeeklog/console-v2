# Console-v2 示例代码

这个目录包含了 Console-v2 的各种使用示例。

## 📁 文件说明

### `basic-usage.js`
基础使用示例，展示最常用的功能：
- 彩色日志输出
- 语义化日志（成功、错误、警告、信息）
- 数据表格显示
- 进度条
- SVG图标
- 分组日志
- 时间戳

### `demo.js`
完整功能演示，包含所有高级功能：
- 图片日志（单张、批量、网格）
- SVG图表和进度条
- 复杂的组合使用场景
- 性能监控示例

## 🚀 运行示例

### Node.js 环境
```bash
# 运行基础示例
node examples/basic-usage.js

# 运行完整演示
node examples/demo.js
```

### 浏览器环境
打开 `test/browser.html` 文件，在浏览器控制台中查看所有功能的演示。

## 💡 学习建议

1. **从基础开始**：先运行 `basic-usage.js` 了解基本用法
2. **查看演示**：运行 `demo.js` 或打开浏览器演示页面
3. **实践应用**：在自己的项目中尝试各种功能
4. **组合使用**：学习如何组合多种功能创建复杂的日志输出

## 🔧 自定义示例

你可以基于这些示例创建自己的使用案例：

```javascript
// 创建自定义颜色主题
const customColors = {
  primary: '#007bff',
  secondary: '#6c757d',
  accent: '#ffc107'
};

// 创建自定义日志样式
const customStyle = console.color(customColors.primary, [console.styles.bold, console.styles.large]);

// 使用自定义样式
console.log('%c自定义标题', customStyle);
```

## 📚 更多资源

- [主文档](../README.md)
- [API 参考](../lib/)
- [测试文件](../test/)