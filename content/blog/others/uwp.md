---
categories: Other
date: 2020-08-10T13:33:08+08:00
tags:
- UWP
title: 有关于UWP应用联网的问题
excerpt: 最近在使用Microsoft Todo时，经常遇到无法同步的问题，也将一些微软的域名添加到了PAC，但仍然没有效果，于是想到了翻阅代理的issues。
thumbnail: ''

---
## 依然先说结论

UWP应用是一类特殊的应用，Windows会限制其在使用代理时使用127.0.0.1的回环地址，因此需要使用第三方工具开启回环代理或者修改注册表，考虑到修改注册表危险性较高且不便于操作，这里转载来自[Qv2ray](https://qv2ray.net/getting-started/step4.html#%E4%BD%BF%E7%94%A8%E7%B3%BB%E7%BB%9F%E4%BB%A3%E7%90%86)的解决方案。

## EnableLoopback

这是一个来自Fiddler的项目，用来调试UWP应用，也可以为我们简单的开启本地代理。

> Qv2ray给出的下载地址：[链接](https://qv2ray.net/EnableLoopback.zip)
> 上传到本站的地址：[链接](https://x.arcto.xyz/E2itoL/EnableLoopback.exe)

打开后在左侧的应用名称找到Microsoft Todo（或者其他的UWP应用名），勾选并点击"Save Changes"，即可开启127.0.0.1的本地代理权限。

![使用工具打开UWP的proxy](https://x.arcto.xyz/PSvgEE/enable-uwp-proxy.png)