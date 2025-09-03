import { COLORS, createColorStyle, createBgStyle } from './colors.js';

// 基础SVG日志功能
const svg = function(svgText, styles = []) {
    // 确保styles是数组
    if (!Array.isArray(styles)) {
        styles = [styles];
    }

    // 准备样式字符串
    let style = '';
    if (styles.length > 0) {
        if (typeof styles[0] === 'string') {
            style += styles[0];
        } else if (typeof styles[0] === 'object') {
            style += Object.entries(styles[0]).map(([key, value]) => `${key}:${value};`).join('');
        }
    }

    // 使用console.info记录SVG
    console.info('%c ', `${style} background-image:url("data:image/svg+xml,${encodeURIComponent(svgText)}")`);
};

// 创建彩色SVG日志
const svgColor = function(svgText, color = COLORS.blue, bgColor = null, additionalStyles = []) {
    let styles = [...additionalStyles];
    
    if (color) {
        styles.push(`color: ${color}`);
    }
    
    if (bgColor) {
        styles.push(`background-color: ${bgColor}`);
    }
    
    const styleString = styles.join('; ');
    svg(svgText, [styleString]);
};

// 创建带标题的SVG日志
const svgWithTitle = function(title, svgText, styles = [], options = {}) {
    const {
        titleColor = COLORS.info,
        titleSize = '16px',
        colors = true
    } = options;
    
    // 打印标题
    if (title && colors) {
        const titleStyle = createColorStyle(titleColor, [`font-size: ${titleSize}`, 'font-weight: bold']);
        console.log(`%c${title}`, titleStyle);
    } else if (title) {
        console.log(title);
    }
    
    // 打印SVG
    svg(svgText, styles);
};

// 创建SVG图标
const svgIcon = function(iconName, size = 24, color = COLORS.black, options = {}) {
    const {
        title = '',
        bgColor = null,
        padding = 4,
        colors = true
    } = options;
    
    const iconMap = {
        'check': `<svg viewBox="0 0 24 24" width="${size}" height="${size}">
            <path fill="${color}" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
        </svg>`,
        'close': `<svg viewBox="0 0 24 24" width="${size}" height="${size}">
            <path fill="${color}" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
        </svg>`,
        'info': `<svg viewBox="0 0 24 24" width="${size}" height="${size}">
            <path fill="${color}" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
        </svg>`,
        'warning': `<svg viewBox="0 0 24 24" width="${size}" height="${size}">
            <path fill="${color}" d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/>
        </svg>`,
        'error': `<svg viewBox="0 0 24 24" width="${size}" height="${size}">
            <path fill="${color}" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        </svg>`,
        'star': `<svg viewBox="0 0 24 24" width="${size}" height="${size}">
            <path fill="${color}" d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
        </svg>`,
        'heart': `<svg viewBox="0 0 24 24" width="${size}" height="${size}">
            <path fill="${color}" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        </svg>`,
        'arrow': `<svg viewBox="0 0 24 24" width="${size}" height="${size}">
            <path fill="${color}" d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/>
        </svg>`
    };
    
    const iconSvg = iconMap[iconName];
    if (!iconSvg) {
        console.warn(`Icon "${iconName}" not found. Available icons: ${Object.keys(iconMap).join(', ')}`);
        return;
    }
    
    const containerStyle = [
        `padding: ${padding}px`,
        'display: inline-block',
        'vertical-align: middle'
    ];
    
    if (bgColor) {
        containerStyle.push(`background-color: ${bgColor}`);
    }
    
    if (title) {
        svgWithTitle(title, iconSvg, containerStyle, { colors });
    } else {
        svg(iconSvg, containerStyle);
    }
};

// 创建SVG进度条
const svgProgressBar = function(percentage, options = {}) {
    const {
        width = 200,
        height = 20,
        color = COLORS.success,
        bgColor = COLORS.lightGray,
        showText = true,
        colors = true
    } = options;
    
    const clampedPercentage = Math.min(Math.max(percentage, 0), 100);
    const progressWidth = (clampedPercentage / 100) * width;
    
    const svgContent = `<svg viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">
        <rect width="${width}" height="${height}" fill="${bgColor}" rx="3"/>
        <rect width="${progressWidth}" height="${height}" fill="${color}" rx="3"/>
        ${showText ? `<text x="${width/2}" y="${height/2 + 4}" text-anchor="middle" fill="white" font-size="12" font-family="Arial">${Math.round(clampedPercentage)}%</text>` : ''}
    </svg>`;
    
    if (colors) {
        const titleStyle = createColorStyle(COLORS.info, ['font-size: 12px']);
        console.log(`%c📊 Progress Bar`, titleStyle);
    }
    
    svg(svgContent, ['display: inline-block']);
};

// 创建SVG图表
const svgChart = function(data, options = {}) {
    const {
        type = 'bar',
        width = 400,
        height = 200,
        colors = [COLORS.blue, COLORS.green, COLORS.orange, COLORS.purple, COLORS.red],
        title = 'Chart',
        showValues = true,
        colors_enabled = true
    } = options;
    
    if (!Array.isArray(data) || data.length === 0) {
        console.warn('Chart data must be a non-empty array');
        return;
    }
    
    if (colors_enabled && title) {
        const titleStyle = createColorStyle(COLORS.info, ['font-weight: bold']);
        console.log(`%c📈 ${title}`, titleStyle);
    }
    
    let svgContent = '';
    
    if (type === 'bar') {
        const maxValue = Math.max(...data);
        const barWidth = width / data.length;
        const barSpacing = barWidth * 0.1;
        const actualBarWidth = barWidth - barSpacing;
        
        svgContent = `<svg viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">
            ${data.map((value, index) => {
                const barHeight = (value / maxValue) * (height - 40);
                const x = index * barWidth + barSpacing / 2;
                const y = height - barHeight - 20;
                const color = colors[index % colors.length];
                
                return `<rect x="${x}" y="${y}" width="${actualBarWidth}" height="${barHeight}" fill="${color}"/>
                    ${showValues ? `<text x="${x + actualBarWidth/2}" y="${y - 5}" text-anchor="middle" fill="black" font-size="10">${value}</text>` : ''}`;
            }).join('')}
        </svg>`;
    } else if (type === 'pie') {
        const total = data.reduce((sum, value) => sum + value, 0);
        const centerX = width / 2;
        const centerY = height / 2;
        const radius = Math.min(width, height) / 3;
        
        let currentAngle = 0;
        svgContent = `<svg viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">
            ${data.map((value, index) => {
                const sliceAngle = (value / total) * 2 * Math.PI;
                const startAngle = currentAngle;
                const endAngle = currentAngle + sliceAngle;
                
                const x1 = centerX + radius * Math.cos(startAngle);
                const y1 = centerY + radius * Math.sin(startAngle);
                const x2 = centerX + radius * Math.cos(endAngle);
                const y2 = centerY + radius * Math.sin(endAngle);
                
                const largeArcFlag = sliceAngle > Math.PI ? 1 : 0;
                
                const pathData = [
                    `M ${centerX} ${centerY}`,
                    `L ${x1} ${y1}`,
                    `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
                    'Z'
                ].join(' ');
                
                const color = colors[index % colors.length];
                currentAngle = endAngle;
                
                return `<path d="${pathData}" fill="${color}"/>`;
            }).join('')}
        </svg>`;
    }
    
    if (svgContent) {
        svg(svgContent, ['display: inline-block']);
    }
};

export default svg;
export { svgColor, svgWithTitle, svgIcon, svgProgressBar, svgChart };
