---
categories: Other
tags:
- 工具
date: 2020-05-08T00:22:15.000+08:00
title: Sentry——一站式错误监控平台部署记录
excerpt: Sentry这个平台除了部署稍微麻烦些，其实还是很好用的，简单记录了自己私有部署Sentry遇到的一些坑
thumbnail: ''

---
## Sentry是什么？

> Sentry helps all software teams create the best software, faster.

Sentry是一个SaaS服务，提供了多种语言、多种环境的错误收集提示等自动化处理功能。

它的优势主要有以下几点：

* 接入简单，node & flutter都是在主入口几行搞定;
* 支持平台和语言极广，几乎涵盖了市面上常见的语言和框架，能够为整个开发团队提供错误收集能力;
* 支持扩展，能够快速扩展到Gitlab、Github、Trello、Slack等平台，国内也有非常好的支持，飞书等平台也有对应的助手或Bot能够方便的扩展到日常开发上;
* 支持私有部署（虽然有坑……），这一点是最为重要的，能够让小团队快速利用Docker和官方命令进行部署，极快地为开发赋能。

SaaS版本我也曾使用过，但是如果没有配置好或者网络环境一般，可能会付出比较高的成本（定时器未清除导致的报错会瞬间烧光你的免费额度……），因此强烈推荐私有部署，相关教程也比较丰富。

> getsentry: [Github](https://github.com/getsentry/onpremise)

> 飞书官方的Sentry助手，[文档](https://getfeishu.cn/hc/zh-cn/articles/360041217373-%E6%9C%BA%E5%99%A8%E4%BA%BA-%E5%A6%82%E4%BD%95%E5%9C%A8%E9%A3%9E%E4%B9%A6%E4%B8%AD%E9%85%8D%E7%BD%AE-Sentry-%E5%8A%A9%E6%89%8B-)，如果其他平台没有原生支持也可以使用Webhook等方式“曲线救国”。

## 简单说说私有部署

其实按照官方的仓库指导，很容易能够部署，只需要一些docker的基础知识并且能够利用docker-compose工具就可以运行起来，但是有很多细节比如Nginx反代Sentry，以及邮箱配置等还是需要对其他相关的东西有一些了解。

### 配置

官方推荐的配置为2400MB内存起步，但是可以通过修改[install.sh](https://github.com/getsentry/onpremise/blob/master/install.sh)，调整最低内存，可以完成安装，但是不保证运行效率，如果较大量的请求可能会导致内存100%。

    MIN_RAM=2400 # MB

### 一些运行设置

以邮件配置举例，目前版本(onpremise, Sentry 10.1.0.dev09b99a3b)如果希望配置生效首先需要找到sentry目录下的config.yml文件（如果没有说明是全新安装，可以从config.example.yml复制一份进行修改），利用环境变量先配置对应的参数。

更新配置后，执行以下命令：

```bash
# docker-compose.yml 目录下
docker-compose stop
docker-compose run --rm web upgrade
docker-compose up -d
```

如果相关程序启动成功，则可以到系统管理界面查看是否应用配置，并发送测试邮件。

### 更新版本

随着一些API的变更，官方会更新相应的版本，私有部署的可以通过执行以下命令来进行升级。

```bash
# 避免onpremise版本安装脚本问题，建议手工拉取最新镜像tag，同时将onpremise仓库升级到对应tag
# docker pull getsentry/sentry:xx.xx.xx && git checkout xx.xx.xx
docker-compose build && docker-compose run --rm web upgrade && docker-compose up -d
```

> 目前已知Github集成存在API被废弃，相关[链接](https://developer.github.com/changes/2020-04-15-replacing-create-installation-access-token-endpoint/) ，目前onpremise 10.0.0版本存在此问题，10.0.1未确认，官方修正于20.7.0，鉴于私有部署版本更新过于激进，暂时不进行升级等待10版本后续更新。

## 坑

私有部署依赖于Sentry和它的很多镜像，以及一些第三方镜像。由于Sentry 20的自建版本仍在 __非常积极地__ 开发迭代中，强烈推荐使用docker的原始源进行安装，成功率较高，如果使用镜像，可能存在Bug导致无法安装，需要注意。

强烈建议将postgres数据和sentry-data挂载到机器目录上，可以较好的保存持久化的信息。

## Sentry依赖的一堆容器，究竟做了什么？

这里强烈推荐看[官方开发博客](https://blog.sentry.io/)了解每一个组件背后的由来。

### Snuba

### tianon/exim4

### symbolicator

### memcache + redis ？