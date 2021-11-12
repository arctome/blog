---
date: 2021-06-04T19:20:26+08:00
categories: frontend
tags:
- frontend
- next.js
- 打包
- pkg
title: 使用pkg打包你的Next.js应用
excerpt: ''

---
## 前言

最近给某人做毕设已经做了小半年了（手工狗头），为了避免上场演示突然崩溃，想把前端部分进行整合打包，以二进制的方式演示，以下是成功的例子：

## 0. pkg是真的很方便

[pkg](https://www.npmjs.com/package/pkg)是Vercel推出的一款打包工具，与Serverless正好相反，他的目的是打包为单文件、多平台可用的可执行文件。

对于一般的node应用，按文档例子配置即可，对于Next.js应用，需要进行以下的额外配置。

## 1. 配置

### 1.1 Install & Config

首先全局安装pkg

```bash
npm install pkg -g
# or
# yarn global add pkg
```

pkg可以通过命令行传参，也可以在package.json里进行配置，由于next.js略微复杂，这里示例在package.json

```json
  "pkg": {
    "assets": [
      ".next/**/*",
      ".env",
      "public/**/*"
    ],
    "scripts": [
      ".next/server/**/*.js"
    ],
    "targets": [
      "node14-linux-x64"
    ],
    "outputPath": "dist"
  },
  "bin": "index.js",
  "main": "index.js"
```

这里的index.js是官方的[Custom Server](https://nextjs.org/docs/advanced-features/custom-server)方式，pkg需要指定入口，因此不能使用原来的next包内的server。

> bin和main设置一个即可。

## 2. pack

打包过程基本不需要介入，我这里涉及了node的sharp包，需要额外引入，按照这个[issue](https://github.com/lovell/sharp/issues/826)的方案，复制相关的静态文件（或者dll）

请注意，如果使用了.env请务必引入在assets中。