const svg = function(svgText, styles) {
    // Ensure styles is an array
    if (!Array.isArray(styles)) {
        styles = [styles];
    }

    // Prepare style string
    let style = '';
    if (styles.length > 0) {
        if (typeof styles[0] === 'string') {
            style += styles[0];
        } else if (typeof styles[0] === 'object') {
            style += Object.entries(styles[0]).map(([key, value]) => `${key}:${value};`).join('');
        }
    }

    // Log SVG with applied style using console.info
    console.info('%c ', `${style} background-image:url("data:image/svg+xml,${encodeURIComponent(svgText)}")`);
};

export default svg
