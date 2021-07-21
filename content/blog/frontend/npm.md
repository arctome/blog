---
date: 2021-07-21T15:53:17+08:00
categories: frontend
tags:
- frontend
title: 解决npm全局安装问题
excerpt: ''

---
## npm "Missing write access" error

> [flaviocopes's post](https://flaviocopes.com/npm-fix-missing-write-access-error/)

目前版本的npm与文章所述不太一致，默认的目录改为了`/usr/lib/node_modules`, 因此，命令变为：

```bash
sudo chown -R $USER /usr/lib/node_modules
```

设置成功后，对于非root用户，直接执行

```bash
npm install @cloudflare/wrangler -g
```