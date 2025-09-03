import consoleImg, { consoleImgBatch, consoleImgGrid } from './img.js';
import consoleSvg, { svgColor, svgWithTitle, svgIcon, svgProgressBar, svgChart } from './svg.js';
import { 
  COLORS, 
  STYLES, 
  createColorStyle, 
  createBgStyle, 
  createGradientStyle 
} from './colors.js';
import {
  formatTimestamp,
  createTable,
  createProgressBar,
  createGroup,
  logWithTime,
  logSuccess,
  logError,
  logWarning,
  logInfo
} from './formatters.js';

// 扩展console原型
if (console.prototype) {
  // 图片相关
  console.prototype.img = consoleImg;
  console.prototype.imgBatch = consoleImgBatch;
  console.prototype.imgGrid = consoleImgGrid;
  
  // SVG相关
  console.prototype.svg = consoleSvg;
  console.prototype.svgColor = svgColor;
  console.prototype.svgWithTitle = svgWithTitle;
  console.prototype.svgIcon = svgIcon;
  console.prototype.svgProgressBar = svgProgressBar;
  console.prototype.svgChart = svgChart;
  
  // 颜色和样式
  console.prototype.colors = COLORS;
  console.prototype.styles = STYLES;
  console.prototype.color = createColorStyle;
  console.prototype.bg = createBgStyle;
  console.prototype.gradient = createGradientStyle;
  
  // 格式化工具
  console.prototype.timestamp = formatTimestamp;
  console.prototype.table = createTable;
  console.prototype.progress = createProgressBar;
  console.prototype.group = createGroup;
  console.prototype.timeLog = logWithTime;
  console.prototype.success = logSuccess;
  console.prototype.error = logError;
  console.prototype.warning = logWarning;
  console.prototype.info = logInfo;
}

// 扩展console.__proto__
if (console.__proto__) {
  // 图片相关
  console.__proto__.img = consoleImg;
  console.__proto__.imgBatch = consoleImgBatch;
  console.__proto__.imgGrid = consoleImgGrid;
  
  // SVG相关
  console.__proto__.svg = consoleSvg;
  console.__proto__.svgColor = svgColor;
  console.__proto__.svgWithTitle = svgWithTitle;
  console.__proto__.svgIcon = svgIcon;
  console.__proto__.svgProgressBar = svgProgressBar;
  console.__proto__.svgChart = svgChart;
  
  // 颜色和样式
  console.__proto__.colors = COLORS;
  console.__proto__.styles = STYLES;
  console.__proto__.color = createColorStyle;
  console.__proto__.bg = createBgStyle;
  console.__proto__.gradient = createGradientStyle;
  
  // 格式化工具
  console.__proto__.timestamp = formatTimestamp;
  console.__proto__.table = createTable;
  console.__proto__.progress = createProgressBar;
  console.__proto__.group = createGroup;
  console.__proto__.timeLog = logWithTime;
  console.__proto__.success = logSuccess;
  console.__proto__.error = logError;
  console.__proto__.warning = logWarning;
  console.__proto__.info = logInfo;
}

// 导出所有功能
export {
  // 图片功能
  consoleImg,
  consoleImgBatch,
  consoleImgGrid,
  
  // SVG功能
  consoleSvg,
  svgColor,
  svgWithTitle,
  svgIcon,
  svgProgressBar,
  svgChart,
  
  // 颜色和样式
  COLORS,
  STYLES,
  createColorStyle,
  createBgStyle,
  createGradientStyle,
  
  // 格式化工具
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

export default console;
