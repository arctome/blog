---
categories: Frontend
tags:
- JavaScript
- Module
- AMD
- CommonJS
- ES Module
date: 2020-03-18T15:24:18.000+08:00
title: JavaScript的模块机制
excerpt: 模块机制还是一个非常需要注意的细节，这里简单说明四种常见的模块机制，主要区分AMD，CMD，ES6 Module。
thumbnail: ''

---
目前，JavaScript生态下最常见的模块机制大致分为以下四种：

- AMD
- CMD
- CommonJS
- ES6 Module

下面逐个分析每个机制的特点。

## CommonJS

- 环境：Node.js
- 全局方法：`require(module) & exports || module.exports`

### exports 与 module.exports

在Node.js环境中，`exports, require, module`都是node的全局对象，`exports`是`module.exports`的引用。

## AMD("Asynchronous Module Definition")

- 环境：Browser
- 全局方法：`require([module], callback)`

> 这里需要注意，所有的浏览器环境的模块化机制，都要避免同步引入，因为不同于服务端可以直接进行磁盘读取，很快即可使用对应模块，浏览器端需要异步请求，否则会造成假死的状态。因此， __浏览器端的模块化机制都是异步加载的__ 。

AMD规范通过回调机制实现了异步加载，在加载完成后执行callback。

## CMD("Common Module Definition")

- 环境：Browser(Sea.js)
- 全局方法：`define() & seajs.use()`

## ES6 Modules

- 环境：Browser(目前工具通过工具已经支持Node.js)
- 全局方法：`export & import`

与CommonJS最主要有两点区别

1. ES6模块输出的是值的引用，输出接口动态绑定，而 CommonJS 输出的是值的拷贝；
2. ES6模块编译时执行，而 CommonJS 模块总是在运行时加载。

### export的使用

```javascript
export const firstName = "Michael";
// const firstName = "Michael";
// export { firstName }; // 不能直接export firstName是因为export需要导出一个“接口”而不能是一个值。
```

### export default

为模块指定默认输出，如果import接口时，可以用任意名称指向export default输出的方法