import { COLORS, createColorStyle, createBgStyle } from './colors.js';

// 时间戳格式化
const formatTimestamp = (date = new Date()) => {
  const pad = (num) => String(num).padStart(2, '0');
  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1);
  const day = pad(date.getDate());
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  const seconds = pad(date.getSeconds());
  const ms = String(date.getMilliseconds()).padStart(3, '0');
  
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${ms}`;
};

// 创建表格日志
const createTable = (data, options = {}) => {
  const {
    title = 'Table',
    showIndex = true,
    maxWidth = 80,
    colors = true
  } = options;

  if (!Array.isArray(data) || data.length === 0) {
    console.warn('Table data must be a non-empty array');
    return;
  }

  // 计算列宽
  const headers = Object.keys(data[0]);
  const columnWidths = headers.map(header => {
    const maxLength = Math.max(
      header.length,
      ...data.map(row => String(row[header] || '').length)
    );
    return Math.min(maxLength, maxWidth);
  });

  // 打印标题
  if (title) {
    const titleStyle = colors ? createColorStyle(COLORS.info, ['font-weight: bold']) : '';
    console.log(`%c${title}`, titleStyle);
  }

  // 打印表头
  let headerRow = '';
  if (showIndex) {
    headerRow += '│ # │ ';
  }
  headers.forEach((header, i) => {
    const paddedHeader = header.padEnd(columnWidths[i]);
    headerRow += `│ ${paddedHeader} │ `;
  });
  
  const headerStyle = colors ? createBgStyle(COLORS.lightGray, COLORS.black, ['font-weight: bold']) : '';
  console.log(`%c${headerRow}`, headerStyle);

  // 打印分隔线
  let separator = '';
  if (showIndex) {
    separator += '├───┼─';
  }
  headers.forEach((_, i) => {
    separator += '─'.repeat(columnWidths[i] + 2) + '┼─';
  });
  separator = separator.slice(0, -1) + '┤';
  console.log(separator);

  // 打印数据行
  data.forEach((row, index) => {
    let dataRow = '';
    if (showIndex) {
      dataRow += `│ ${String(index + 1).padStart(2)} │ `;
    }
    
    headers.forEach((header, i) => {
      const value = String(row[header] || '');
      const truncatedValue = value.length > columnWidths[i] 
        ? value.substring(0, columnWidths[i] - 3) + '...'
        : value.padEnd(columnWidths[i]);
      dataRow += `│ ${truncatedValue} │ `;
    });
    
    const rowStyle = colors && index % 2 === 0 
      ? createBgStyle(COLORS.white, COLORS.black)
      : '';
    console.log(`%c${dataRow}`, rowStyle);
  });

  // 打印底部边框
  let bottomBorder = '';
  if (showIndex) {
    bottomBorder += '└───┴─';
  }
  headers.forEach((_, i) => {
    bottomBorder += '─'.repeat(columnWidths[i] + 2) + '┴─';
  });
  bottomBorder = bottomBorder.slice(0, -1) + '┘';
  console.log(bottomBorder);
};

// 创建进度条
const createProgressBar = (current, total, options = {}) => {
  const {
    width = 30,
    showPercentage = true,
    showNumbers = true,
    fillChar = '█',
    emptyChar = '░',
    colors = true
  } = options;

  if (total <= 0) return;
  
  const percentage = Math.min(Math.max(current / total, 0), 1);
  const filledWidth = Math.round(width * percentage);
  const emptyWidth = width - filledWidth;
  
  const filled = fillChar.repeat(filledWidth);
  const empty = emptyChar.repeat(emptyWidth);
  
  let progressBar = `[${filled}${empty}]`;
  
  if (showPercentage) {
    const percentText = `${Math.round(percentage * 100)}%`;
    progressBar += ` ${percentText}`;
  }
  
  if (showNumbers) {
    progressBar += ` (${current}/${total})`;
  }
  
  // 根据进度选择颜色
  let color = COLORS.info;
  if (percentage >= 0.8) color = COLORS.success;
  else if (percentage >= 0.5) color = COLORS.warning;
  else if (percentage < 0.2) color = COLORS.error;
  
  const style = colors ? createColorStyle(color) : '';
  console.log(`%c${progressBar}`, style);
};

// 创建分组日志
const createGroup = (label, collapsed = false) => {
  if (collapsed) {
    console.groupCollapsed(label);
  } else {
    console.group(label);
  }
};

// 创建时间日志
const logWithTime = (message, level = 'log') => {
  const timestamp = formatTimestamp();
  const timeStyle = createColorStyle(COLORS.gray, ['font-size: 12px']);
  const messageStyle = createColorStyle(COLORS.black);
  
  console[level](`%c[${timestamp}]%c ${message}`, timeStyle, messageStyle);
};

// 创建成功/错误/警告日志
const logSuccess = (message) => {
  const style = createColorStyle(COLORS.success, ['font-weight: bold']);
  console.log(`%c✓ ${message}`, style);
};

const logError = (message) => {
  const style = createColorStyle(COLORS.error, ['font-weight: bold']);
  console.error(`%c✗ ${message}`, style);
};

const logWarning = (message) => {
  const style = createColorStyle(COLORS.warning, ['font-weight: bold']);
  console.warn(`%c⚠ ${message}`, style);
};

const logInfo = (message) => {
  const style = createColorStyle(COLORS.info, ['font-weight: bold']);
  console.info(`%cℹ ${message}`, style);
};

export {
  formatTimestamp,
  createTable,
  createProgressBar,
  createGroup,
  logWithTime,
  logSuccess,
  logError,
  logWarning,
  logInfo
};