---
date: 2021-09-01T17:30:13+08:00
categories: frontend
tags:
- webpack
title: Webpack 4最后兼容的loader
excerpt: ''

---
## Why not use Webpack 5 ?

因为目前有些大型的项目还在依赖Webpack4，比如我正在用的Storybook和flareact。

如果安装最新版的各种loader，最常见的错误就是`TypeError: this.getOptions is not a function`，所以要么开发时锁定loader版本，要么根据我下面的列表进行调整devDependencies。

## Lastest version of Webpack4 loaders

- css-loader@5.2.7
- sass-loader@10.2.0
- postcss-loader@4.2.0
- less-loader@7.3.0
- mini-css-extract-plugin@1.6.2
- copy-webpack-plugin@6.4.1

> Webpack4对于mjs文件处理存在问题，可以增加一条以下规则：
> ```javascript
> {
>     test: /\.mjs$/,
>     include: /node_modules/,
>     type: "javascript/auto",
> }
> ```