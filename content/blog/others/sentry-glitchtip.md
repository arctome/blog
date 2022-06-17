---
date: 2022-06-17T15:30:08+08:00
categories: others
tags:
- others
title: 部署Sentry的轻量替代品——GlitchTip
excerpt: ''

---
# [GlitchTip](https://glitchtip.com)

## GlitchTip是什么

一个与Sentry几乎类似功能的错误捕获、监控程序，开源在gitlab.com，提供了 __linux/amd64__ 和 __linux/arm64__ 双架构的Docker镜像，要知道，Sentry还是不能支持ARM架构的，对于有甲骨文4C24G的同学，无法部署Sentry，可以将GlitchTip作为平替。

## 安装

> 官方的 [自建安装指南](https://glitchtip.com/documentation/install)

我这里选择docker-compose的方案，基本按照官方文档流程下来，走通没有问题。

## 存在Bug

我部署的版本是 v1.22.5，目前版本在部署中发现一些问题，我这里提供我的解决方案。

### Bug1：怎么配置EMAIL_URL?

官方文档漏了最重要的一个配置，举例说明，比如使用Yandex的个人域名邮箱，SMTP服务端口为 __SSL模式下的465端口__ ，因此，EMAIL_URL的格式应该为：

```
EMAIL_URL=smtp+ssl://user@example.com:password@smtp.yandex.com:465
```

> [Related Issue](https://github.com/joke2k/django-environ/issues/212)

### Bug2: 如何“彻底”禁用注册?

[官方文档](https://glitchtip.com/documentation/install#configuration) 提供的变量 `ENABLE_OPEN_USER_REGISTRATION` 默认为关闭，但是刚进入界面仍然可以注册，这是因为在 [代码](https://gitlab.com/glitchtip/glitchtip-backend/-/blob/26bb1b75aaa634b2be6aa0ef4884e22c57d78755/users/utils.py#L8) 里有这样一个判断:

```python
if not enable_user_registration:
    enable_user_registration = not Organization.objects.exists()
```

所以需要至少创建一个Organization，登录界面的注册才会被隐藏。

__是的，你没有看错，是隐藏……__ ，如果你手工重定向到 `/register` 依然能够访问，点击注册会请求 `/rest-auth/registration` ,依然会请求成功，完成注册……

想必有朋友已经有了想法。我是将GlitchTip放在了Nginx的后面访问，因此，加了两条403的路由（其中界面的路由通过首页定向依然不行，因为是前端路由……）

```conf
location /register { return 403; }
location /rest-auth/registration { return 403; }
```

算是临时解决了，如果之后有更好的方案，我再更新。

> Q: 隐藏了注册相关路由，我该怎么创建新用户呢？
> A: `docker-compose run migrate ./manage.py createsuperuser`, 参考你的docker-compose.yml里，migrate对应的服务名称。