# console-v2
# A useful console extend tool for font-end developer.

`console-v2` 是一个可以在控制台中输出带有样式的 SVG 图片的拓展工具。

## 安装

使用 npm：
```bash
npm install console-v2

```

或者使用 yarn：

```bash
yarn add console-v2

```

# Usage
```javascript
// main.js
import console from 'console-v2';

// usage
console.svg(
  `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 750 200' width='100%' height='200'>
    <style>
      text { font-family: sans-serif; font-weight: 100; fill: #d8eaff; }
      #stop1 { animation: recolor 10s linear infinite alternate }
      #stop2 { animation: recolor 10s -12s linear infinite alternate }
      @keyframes recolor {
        0% { stop-color: #388bee; }
        20% { stop-color: #ec970b; }
        40% { stop-color: #af74fd; }
        60% { stop-color: #c020d9; }
        80% { stop-color: #514a9d; }
        100% { stop-color: #053ece; }
      }
    </style>
    <defs>
      <linearGradient id='grad'>
        <stop id='stop1' offset='0%' stop-color='#388bee'></stop>
        <stop id='stop2' offset='100%' stop-color='#514a9d'></stop>
      </linearGradient>
    </defs>
    <rect width='100%' height='200' fill='url(#grad)'></rect>
    <text text-anchor='end' font-size='50' x='505' y='105'> 测试打印SVG </text>
    <text text-anchor='end' font-size='50' x='505' y='155'> Console-v2 </text>
    <text text-anchor='end' font-size='25' x='505' y='180'> A Useful Console Tool </text>
  </svg>`,
  [
    'padding-left:750px;padding-top:200px;'
  ]
);

```
# License
- MIT License


