// Console-v2 功能演示
// 展示彩色、图片、多格式日志输出功能

// 导入日志工具
import console from '../lib/index.js';

console.log('🚀 Console-v2 功能演示开始');

// 1. 彩色日志输出
console.group('🎨 彩色日志功能');
console.log('%c这是红色文字', console.color(console.colors.red));
console.log('%c这是绿色背景', console.bg(console.colors.green, console.colors.white));
console.log('%c这是蓝色渐变背景', console.gradient('linear-gradient(45deg, #ff6b6b, #4ecdc4)', console.colors.white));

// 使用预定义的成功/错误/警告日志
console.success('操作成功完成！');
console.error('发生了一个错误');
console.warning('这是一个警告信息');
console.info('这是一条信息提示');

console.groupEnd();

// 2. 图片日志功能
console.group('🖼️ 图片日志功能');

// 基础图片显示
try {
  await console.img('https://picsum.photos/200/100', {
    title: '随机图片示例',
    width: 200,
    height: 100,
    fit: 'cover'
  });
} catch (error) {
  console.warning('图片加载失败，可能是网络问题');
}

// 批量图片加载
const imageUrls = [
  'https://picsum.photos/100/100?random=1',
  'https://picsum.photos/100/100?random=2',
  'https://picsum.photos/100/100?random=3'
];

try {
  await console.imgBatch(imageUrls, {
    maxConcurrent: 2,
    showProgress: true
  });
} catch (error) {
  console.warning('批量图片加载失败');
}

console.groupEnd();

// 3. SVG 功能演示
console.group('🎭 SVG 功能演示');

// 基础SVG
console.svg(`
  <svg viewBox="0 0 200 100" width="200" height="100">
    <rect width="200" height="100" fill="#4ecdc4"/>
    <text x="100" y="50" text-anchor="middle" fill="white" font-size="16">Hello SVG!</text>
  </svg>
`);

// 彩色SVG
console.svgColor(`
  <svg viewBox="0 0 100 100" width="100" height="100">
    <circle cx="50" cy="50" r="40" fill="#ff6b6b"/>
    <text x="50" y="55" text-anchor="middle" fill="white" font-size="12">SVG</text>
  </svg>
`, console.colors.red, console.colors.yellow);

// SVG图标
console.svgIcon('star', 32, console.colors.orange, { title: '星星图标' });
console.svgIcon('heart', 32, console.colors.red, { title: '爱心图标' });

// SVG进度条
console.svgProgressBar(75, { width: 300, height: 25 });

// SVG图表
const chartData = [23, 45, 67, 89, 12, 34];
console.svgChart(chartData, { 
  type: 'bar', 
  title: '销售数据图表',
  width: 400, 
  height: 200 
});

console.groupEnd();

// 4. 格式化工具演示
console.group('📊 格式化工具演示');

// 表格显示
const userData = [
  { name: '张三', age: 25, city: '北京', score: 95 },
  { name: '李四', age: 30, city: '上海', score: 88 },
  { name: '王五', age: 28, city: '广州', score: 92 },
  { name: '赵六', age: 35, city: '深圳', score: 78 }
];

console.table(userData, { 
  title: '用户信息表',
  showIndex: true,
  maxWidth: 60
});

// 进度条
console.progress(65, 100, { 
  width: 40,
  showPercentage: true,
  showNumbers: true
});

// 时间日志
console.timeLog('这是一条带时间戳的日志');
console.timeLog('这是另一条时间日志', 'warn');

// 分组日志
console.group('详细信息', false);
console.log('这是分组内的日志');
console.log('可以包含多条信息');
console.groupEnd();

console.groupEnd();

// 5. 组合使用示例
console.group('🎯 组合使用示例');

// 创建一个带颜色的标题
const titleStyle = console.color(console.colors.purple, [console.styles.bold, console.styles.large]);
console.log(`%c${console.timestamp()} - 系统状态报告`, titleStyle);

// 显示系统状态
const systemStatus = [
  { service: 'Web服务器', status: '运行中', uptime: '15天' },
  { service: '数据库', status: '运行中', uptime: '30天' },
  { service: '缓存服务', status: '维护中', uptime: '2小时' }
];

console.table(systemStatus, { title: '系统服务状态' });

// 显示服务状态图标
systemStatus.forEach(item => {
  const iconName = item.status === '运行中' ? 'check' : 'warning';
  const iconColor = item.status === '运行中' ? console.colors.success : console.colors.warning;
  
  console.svgIcon(iconName, 16, iconColor, { 
    title: `${item.service}: ${item.status}` 
  });
});

console.groupEnd();

// 6. 性能监控示例
console.group('⚡ 性能监控示例');

// 模拟性能数据
const performanceData = [85, 92, 78, 95, 88, 91, 87, 94, 89, 93];
console.svgChart(performanceData, { 
  type: 'bar', 
  title: '页面性能得分',
  width: 500, 
  height: 150 
});

// 显示性能统计
const avgScore = performanceData.reduce((a, b) => a + b, 0) / performanceData.length;
console.success(`平均性能得分: ${avgScore.toFixed(1)}`);

if (avgScore >= 90) {
  console.success('性能表现优秀！');
} else if (avgScore >= 80) {
  console.warning('性能表现良好，有改进空间');
} else {
  console.error('性能需要优化');
}

console.groupEnd();

console.log('🎉 Console-v2 功能演示完成！');
console.log('💡 更多功能请查看文档或源代码');