---
date: 2021-08-27T15:47:15+08:00
categories: frontend
tags:
- npm
title: npm问题解决方案一览
excerpt: ''

---
> 当前npm版本7.21.1，解决方案可能只适用于Linux环境下，请知晓。

## npm install -g 各种权限问题

在初始化安装好node和npm后执行以下命令，设置对应目录的权限为当前用户：

```bash
sudo chown -R $USER ~/.npm
sudo chown -R $USER /usr/lib/node_modules
# For npm version smaller than v7, the path may be `/usr/local/lib`
# sudo chown -R $USER /usr/local/lib/node_modules
```

## npm lifecycle warning

```
npm WARN lifecycle The node binary used for scripts is /var/folders/g_/dslq6ff90pn_wyjv5g6578qm0000gn/T/yarn—1577473189287-0.1962072526914138/node but npm is using /usr/local/Cellar/node/13.5.0/bin/node itself. Use the `—scripts-prepend-node-path` option to include the path for the node binary npm was executed with.
```

警告中已经提示了，需要执行 `npm config set scripts-prepend-node-path true` 解决。