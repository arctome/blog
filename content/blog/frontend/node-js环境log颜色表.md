---
tags:
- Node.js
categories: Frontend
title: Node.js环境log颜色表
date: 2019-08-12T00:04:00.000+08:00
excerpt: 如果你想自己实现一个Node.js CLI，不妨加入一些颜色来使CLI的交互感更好吧。
thumbnail: ''

---
Refer from: [https://stackoverflow.com/questions/9781218/how-to-change-node-jss-console-font-color]()

```javascript
console.log('\x1b[36m%s\x1b[0m', 'I am cyan') //cyan
console.log('\x1b[33m%s\x1b[0m', stringToMakeYellow) //yellow
```

通过配置 log，达到实现不同颜色的目的，下面是一些常用的颜色

```javascript
Reset = '\x1b[0m'
Bright = '\x1b[1m'
Dim = '\x1b[2m'
Underscore = '\x1b[4m'
Blink = '\x1b[5m'
Reverse = '\x1b[7m'
Hidden = '\x1b[8m'

FgBlack = '\x1b[30m'
FgRed = '\x1b[31m'
FgGreen = '\x1b[32m'
FgYellow = '\x1b[33m'
FgBlue = '\x1b[34m'
FgMagenta = '\x1b[35m'
FgCyan = '\x1b[36m'
FgWhite = '\x1b[37m'

BgBlack = '\x1b[40m'
BgRed = '\x1b[41m'
BgGreen = '\x1b[42m'
BgYellow = '\x1b[43m'
BgBlue = '\x1b[44m'
BgMagenta = '\x1b[45m'
BgCyan = '\x1b[46m'
BgWhite = '\x1b[47m'
```

addons: 在可以引用其他库的环境中，也可以使用`inquirer`，能够完成大部分情况比如：

- 错误回显
- “提问”模式
- 输入格式化
- 回答校验
- 管理多重选项

用法详见[npm](https://www.npmjs.com/package/inquirer)