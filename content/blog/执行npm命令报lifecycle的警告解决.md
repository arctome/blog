---
tags:
- NPM
categories: Frontend
title: 执行NPM命令报lifecycle的警告解决
date: 2019-12-28T00:00:00.000+08:00
excerpt: ''
thumbnail: ''

---
今天使用npm时，发现了一条如下的警告：

> npm WARN lifecycle The node binary used for scripts is /var/folders/g_/dslq6ff90pn_wyjv5g6578qm0000gn/T/yarn--1577473189287-0.1962072526914138/node but npm is using /usr/local/Cellar/node/13.5.0/bin/node itself. Use the \`--scripts-prepend-node-path\` option to include the path for the node binary npm was executed with.

这是因为yarn运行在独立的yarn环境下，解决此警告需要设置一条全局的config

    npm config set scripts-prepend-node-path true