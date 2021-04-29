---
date: 2021-04-29T19:07:16+08:00
categories: others
tags:
- others
- windows
title: windows10 UEFI引导修复
excerpt: ''

---
```
> diskpart
> list vol
> sel vol 1
# 分配盘符
> assign letter=G
# 修复引导
> cd /d G:\EFI\Microsoft\Boot\
> bcdboot C:\Windows /l zh-cn /s G: /f ALL
# 退出重启电脑
> exit
```