// 颜色常量定义
const COLORS = {
  // 基础颜色
  black: '#000000',
  white: '#FFFFFF',
  red: '#FF0000',
  green: '#00FF00',
  blue: '#0000FF',
  yellow: '#FFFF00',
  cyan: '#00FFFF',
  magenta: '#FF00FF',
  
  // 扩展颜色
  orange: '#FFA500',
  purple: '#800080',
  pink: '#FFC0CB',
  brown: '#A52A2A',
  gray: '#808080',
  lightGray: '#D3D3D3',
  darkGray: '#404040',
  
  // 成功/错误/警告颜色
  success: '#28A745',
  error: '#DC3545',
  warning: '#FFC107',
  info: '#17A2B8'
};

// 样式常量
const STYLES = {
  bold: 'font-weight: bold',
  italic: 'font-style: italic',
  underline: 'text-decoration: underline',
  strikethrough: 'text-decoration: line-through',
  small: 'font-size: 12px',
  large: 'font-size: 18px',
  huge: 'font-size: 24px'
};

// 创建带颜色的日志样式
const createColorStyle = (color, additionalStyles = []) => {
  const baseStyle = `color: ${color}`;
  const allStyles = [baseStyle, ...additionalStyles];
  return allStyles.join('; ');
};

// 创建带背景色的日志样式
const createBgStyle = (bgColor, textColor = '#000000', additionalStyles = []) => {
  const baseStyle = `background-color: ${bgColor}; color: ${textColor}`;
  const allStyles = [baseStyle, ...additionalStyles];
  return allStyles.join('; ');
};

// 渐变背景样式
const createGradientStyle = (gradient, textColor = '#FFFFFF', additionalStyles = []) => {
  const baseStyle = `background: ${gradient}; color: ${textColor}`;
  const allStyles = [baseStyle, ...additionalStyles];
  return allStyles.join('; ');
};

export {
  COLORS,
  STYLES,
  createColorStyle,
  createBgStyle,
  createGradientStyle
};