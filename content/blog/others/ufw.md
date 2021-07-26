---
date: 2021-05-27T15:29:55+08:00
categories: otherss
tags:
- others
- UFW
title: 批量删除UFW规则
excerpt: ''

---
> 本篇答案来自 [SuperUser-Boba Fit](https://superuser.com/a/1564148)

如果UFW里有数十条规则，一行一行的执行ufw命令属实折磨，参考此篇，可以改为循环执行。

```bash
ufw status numbered
# no confirm, example rule numbers
for i in 65 54 43 20 1;do yes|ufw delete $i;done
```

最后不要忘记执行：

```bash
ufw reload
```