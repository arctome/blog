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