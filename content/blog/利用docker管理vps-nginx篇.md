---
categories: Other
tags:
- Linux
date: 2020-03-26T01:18:34.000+08:00
title: 利用Docker管理VPS——Nginx篇
excerpt: 未完待续，nginx直接安装在主机上会比较方便管理。
thumbnail: ''

---
## 写在前面

在我个人使用VPS时，一开始的思路时独立尽可能少的服务到独立的VPS内，这导致我有很多最低配的服务器，服务没用到的时候其实运行负载并不高，低配置又不能支持诸如Sentry等服务的启动，因此，采用Docker将同类型的服务进行合并是更好的策略，但随之而来的是需要对配置有合理的规划

## 为什么先写Nginx

首先我们要清楚一点，Docker的部分权限是和系统平级的，比如 __防火墙__ (操作端口时会同时添加iptables)，这导致如果只做简单映射，就会把对应端口暴露在外网，需要限制哪些服务可以通过外网访问，哪些服务只暴露对应端口给Dashboard。

> 请在平时启动Docker容器时，不想暴露到外网必须指定port的时候加127.0.0.1。

> 如果端口只暴露而不需要映射到主机端口，请使用`--expose`代替`-p`。

## 默认配置

最方便的方式其实就是从已经运行的默认nginx镜像复制一份配置文件出来

```bash
dokcer cp YOUR_NGINX_ID:/etc/nginx/conf.d/default.conf ./
dokcer cp YOUR_NGINX_ID:/etc/nginx/nginx.conf ./
```

## 配置方案

由于是同一机器上多个容器，因此只将Nginx暴露到外网，其他容器均由Nginx进行反向代理。

端口之间各种复杂的映射并不是最好的办法，选择有两种：

- Nginx安装在实际的机器内，反代各种Docker容器；
- Nginx以容器形式安装，通过网络或者link方式组成一体的网络；

我的机器为了统一管理，这里选择第一种。