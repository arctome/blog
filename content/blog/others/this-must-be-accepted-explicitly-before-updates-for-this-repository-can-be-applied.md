---
date: 2021-11-30T00:13:03+08:00
categories: others
tags:
- others
title: 解决"This must be accepted explicitly before updates for this repository can
  be applied"
excerpt: ''

---
## Why?

当前LTS版本为Debian11，使用了Debian10的系统——当前系统版本属于Old Stable。

## How?

```bash
apt-get update --allow-releaseinfo-change
# may show some error, just ignore, the repos have been updated.
apt-get update
```