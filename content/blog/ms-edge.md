---
categories: Other
date: 2020-08-09T16:37:06+08:00
tags:
- Edge
title: 配置MS Edge双版本并行
excerpt: 作为前端偶尔需要调试两个版本的Edge是否存在Bug，而且老Edge在一些方便的功能，比如PDF预览，新Edge还是不如的，因此本文主要介绍如何配置双版本共存。
thumbnail: ''

---
## 如果你还没有被自动更新

你可以选择Fast Cycle或者使用Beta版尝鲜新Edge，这样的Edge版本不需要进行额外的操作，即可与旧版本兼容并存。

## 如果你已经通过Windows Update自动更新

那么就需要通过注册表修改使其并存。

首先找到注册表的这个位置：

`HKEY_LOCAL_MACHINE\SOFTWARE\Policies\Microsoft`

在左侧的`Microsoft`项右键，选择“新建” > “项”，命名为EdgeUpdate。

在右侧窗口，右键，新建DWORD（32位）值，命名为`Allowsxs`，双击修改值为1（保持16进制不变）。

最终成果如图：![注册表最终修改](https://disk.arcto.xyz/g/h9z3b6cvwm/dual-edge-reg.png?t=HfLa9e)

## 如果操作完成后开始菜单仍找不到“Microsoft Edge 旧版”

在“设置” > “应用和功能”找到新版Edge，点击修改，（如果有卸载可以尝试卸载），再重新安装即可双版本共存。

![双版本共存](https://disk.arcto.xyz/g/h9z3b6cvwm/dual-edge-final.png?t=_0o9X2)