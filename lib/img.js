import { COLORS, createColorStyle, createBgStyle } from './colors.js';

// src/get-blob.js
const getBlob = async (url) => {
    const response = await fetch(url);
    return response.blob();
};

// src/load-image.js
const loadImage = (src) => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = "";
        img.src = src;
        img.onload = () => resolve(img);
        img.onerror = img.onabort = reject;
    });
};

// src/read-as-data-url.js
const readAsDataUrl = (blob) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onload = () => resolve(reader.result);
        reader.onerror = reader.onabort = reject;
    });
};

// src/to-array.js
const toArray = (val) => {
    return Array.isArray(val) ? val : [val];
};

// 增强的图片日志功能
const consoleImg = async (url, options = {}) => {
    const {
        debug = false,
        fit = "contain",
        height,
        width,
        styles = [],
        title = '',
        showInfo = true,
        colors = true
    } = options;
    
    try {
        const blob = await getBlob(url);
        const dataUrl = await readAsDataUrl(blob);
        const image = await loadImage(dataUrl);
        
        const ratio = image.naturalWidth / image.naturalHeight;
        const _width = width || (height ? height * ratio : image.naturalWidth);
        const _height = height || (width ? width / ratio : image.naturalHeight);
        
        const py = _height / 2;
        const px = _width / 2;
        
        // 创建基础样式
        const baseStyles = [
            "font-size: 0",
            `padding: ${py}px ${px}px`,
            `background: url(${dataUrl}) no-repeat 50% / ${fit}`,
            ...toArray(styles)
        ].filter(Boolean);
        
        const css = baseStyles.join("; ");
        
        // 如果有标题，先打印标题
        if (title) {
            const titleStyle = colors ? createColorStyle(COLORS.info, ['font-weight: bold']) : '';
            console.log(`%c${title}`, titleStyle);
        }
        
        // 打印图片
        console.log("%c ", css);
        
        // 显示图片信息
        if (showInfo) {
            const infoStyle = colors ? createColorStyle(COLORS.gray, ['font-size: 12px']) : '';
            console.log(`%c📷 Image: ${image.naturalWidth}×${image.naturalHeight} (${_width}×${_height})`, infoStyle);
        }
        
        // 调试模式
        if (debug) {
            const debugStyle = colors ? createColorStyle(COLORS.purple, ['font-size: 11px']) : '';
            console.log(`%c[DEBUG] CSS: ${css}`, debugStyle);
        }
        
        return image;
    } catch (error) {
        const errorStyle = colors ? createColorStyle(COLORS.error) : '';
        console.error(`%c❌ Failed to load image: ${url}`, errorStyle);
        console.error(error);
        throw error;
    }
};

// 批量图片日志
const consoleImgBatch = async (urls, options = {}) => {
    const {
        maxConcurrent = 3,
        showProgress = true,
        colors = true
    } = options;
    
    if (showProgress) {
        console.group('🖼️ Loading Images Batch');
    }
    
    const results = [];
    const total = urls.length;
    
    for (let i = 0; i < total; i += maxConcurrent) {
        const batch = urls.slice(i, i + maxConcurrent);
        const batchPromises = batch.map(async (url, batchIndex) => {
            try {
                const result = await consoleImg(url, { ...options, showInfo: false });
                results.push({ url, success: true, result });
                
                if (showProgress) {
                    const progressStyle = colors ? createColorStyle(COLORS.success) : '';
                    console.log(`%c✓ Loaded: ${url}`, progressStyle);
                }
                
                return { url, success: true, result };
            } catch (error) {
                results.push({ url, success: false, error });
                
                if (showProgress) {
                    const errorStyle = colors ? createColorStyle(COLORS.error) : '';
                    console.log(`%c✗ Failed: ${url}`, errorStyle);
                }
                
                return { url, success: false, error };
            }
        });
        
        await Promise.all(batchPromises);
        
        if (showProgress) {
            const progress = Math.min(i + maxConcurrent, total);
            const progressStyle = colors ? createColorStyle(COLORS.info) : '';
            console.log(`%c📊 Progress: ${progress}/${total}`, progressStyle);
        }
    }
    
    if (showProgress) {
        console.groupEnd();
        
        const successCount = results.filter(r => r.success).length;
        const summaryStyle = colors ? createColorStyle(COLORS.success, ['font-weight: bold']) : '';
        console.log(`%c📋 Batch Complete: ${successCount}/${total} images loaded successfully`, summaryStyle);
    }
    
    return results;
};

// 图片网格显示
const consoleImgGrid = async (urls, options = {}) => {
    const {
        columns = 3,
        spacing = 10,
        maxWidth = 800,
        colors = true
    } = options;
    
    if (!Array.isArray(urls) || urls.length === 0) {
        console.warn('URLs must be a non-empty array');
        return;
    }
    
    const gridStyle = colors ? createColorStyle(COLORS.info, ['font-weight: bold']) : '';
    console.log(`%c🖼️ Image Grid (${columns} columns)`, gridStyle);
    
    // 计算网格尺寸
    const cellWidth = Math.floor((maxWidth - (columns - 1) * spacing) / columns);
    const cellHeight = cellWidth;
    
    // 创建网格容器样式
    const gridContainerStyle = [
        'display: inline-block',
        `width: ${maxWidth}px`,
        'font-size: 0',
        'line-height: 0'
    ].join('; ');
    
    console.log(`%c<div style="${gridContainerStyle}">`, 'color: transparent');
    
    // 按行处理图片
    for (let row = 0; row < Math.ceil(urls.length / columns); row++) {
        const rowUrls = urls.slice(row * columns, (row + 1) * columns);
        
        for (let col = 0; col < columns; col++) {
            const url = rowUrls[col];
            if (!url) continue;
            
            try {
                const image = await consoleImg(url, {
                    width: cellWidth,
                    height: cellHeight,
                    fit: 'cover',
                    showInfo: false,
                    colors: false
                });
                
                // 添加网格间距
                if (col < columns - 1) {
                    console.log('%c ', `display: inline-block; width: ${spacing}px; height: 1px;`);
                }
            } catch (error) {
                // 显示占位符
                const placeholderStyle = [
                    'display: inline-block',
                    `width: ${cellWidth}px`,
                    `height: ${cellHeight}px`,
                    'background-color: #f0f0f0',
                    'border: 1px dashed #ccc',
                    'color: #999',
                    'text-align: center',
                    'line-height: 1',
                    'font-size: 12px'
                ].join('; ');
                
                console.log(`%c<div style="${placeholderStyle}">Failed</div>`, 'color: transparent');
            }
        }
        
        // 行间距
        if (row < Math.ceil(urls.length / columns) - 1) {
            console.log(`%c<div style="height: ${spacing}px;"></div>`, 'color: transparent');
        }
    }
    
    console.log('%c</div>', 'color: transparent');
};

export default consoleImg;
export { consoleImgBatch, consoleImgGrid };
