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

// src/index.js
const consoleImg = async (url, options = {}) => {
    const {
        debug,
        fit = "contain",
        height,
        styles,
        width
    } = options;
    const blob = await getBlob(url);
    const dataUrl = await readAsDataUrl(blob);
    const image = await loadImage(dataUrl);
    const ratio = image.naturalWidth / image.naturalHeight;
    const _width = width || (height ? height * ratio : image.naturalWidth);
    const _height = height || (width ? width / ratio : image.naturalHeight);
    const py = _height / 2;
    const px = _width / 2;
    const css = (url2 = dataUrl) => [
        "font-size: 0",
        `padding: ${py}px ${px}px`,
        `background: url(${url2}) no-repeat 50% / ${fit}`,
        styles && toArray(styles).join("; ")
    ].filter(Boolean).join("; ");
    console.log("%c ", css());
    if (debug) {
        console.log("[console.img]", css(url).split("; "));
    }
    return image;
};

// Export consoleImg function
export default consoleImg;
