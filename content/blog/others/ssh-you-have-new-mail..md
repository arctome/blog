---
date: 2021-12-01T19:01:04+08:00
categories: others
tags:
- others
title: SSH显示“You have new mail.”
excerpt: ''

---
## 怎么看？

```bash
cat /var/spool/mail/root
```

## 哪来的？

有部分服务会产生report，如acme.sh，如果遇到续约失败等，会产生一封邮件，发送至对应host，而往往主机没有配置自身的邮件服务，那么就会保留在文件系统里。