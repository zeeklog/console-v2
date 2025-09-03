// Console-v2 基础使用示例
// 展示最常用的功能

import console from '../lib/index.js';

// 1. 基础彩色日志
console.log('🚀 Console-v2 基础使用示例');

// 2. 使用预定义颜色
console.log('%c这是红色文字', console.color(console.colors.red));
console.log('%c这是绿色背景', console.bg(console.colors.green, console.colors.white));
console.log('%c这是蓝色文字', console.color(console.colors.blue));

// 3. 使用语义化日志
console.success('✅ 操作成功完成！');
console.error('❌ 发生了一个错误');
console.warning('⚠️ 这是一个警告信息');
console.info('ℹ️ 这是一条信息提示');

// 4. 创建分组日志
console.group('📊 数据展示示例');

// 5. 显示数据表格
const userData = [
  { name: '张三', age: 25, city: '北京', score: 95 },
  { name: '李四', age: 30, city: '上海', score: 88 },
  { name: '王五', age: 28, city: '广州', score: 92 }
];

console.table(userData, { 
  title: '用户信息表',
  showIndex: true,
  maxWidth: 60
});

// 6. 显示进度条
console.progress(75, 100, { 
  width: 30,
  showPercentage: true,
  showNumbers: true
});

// 7. 显示SVG图标
console.svgIcon('star', 24, console.colors.orange, { title: '星星图标' });
console.svgIcon('heart', 24, console.colors.red, { title: '爱心图标' });

console.groupEnd();

// 8. 时间戳日志
console.timeLog('这是一条带时间戳的日志');

// 9. 组合使用示例
const titleStyle = console.color(console.colors.purple, [console.styles.bold, console.styles.large]);
console.log(`%c${console.timestamp()} - 示例完成`, titleStyle);

console.log('🎉 基础使用示例完成！');