---
date: 2021-05-12T17:52:01+08:00
categories: otherss
tags:
- others
title: Vim 删除空行、行首空格、行尾空格
excerpt: 'Reference: https://blog.csdn.net/yilovexing/article/details/92982717'

---
- 删除空格行：

```
:g/^$/d
```

- 删除所有行首空格：

```
:%s/^\s*//g
```

- 删除所有行尾空格：

```
:%s/\s*$//g
```