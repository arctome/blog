---
categories: Other
date: 2020-08-22T10:49:36+08:00
tags:
- Linux
title: 解决切换用户提示的sed报错
excerpt: 使用WSL时，考虑到已有的环境已经配置好了，使用import复制了一个容器运行在WSL1下，遇到了sed报错，这里是一个解决思路
thumbnail: ''

---
## 现象

```bash
sed: -e expression #1, char 24: unknown command: `.'
```

切换用户时（此用户是原来WSL2的默认账户），shell报以上错误。

考虑到是切换用户才导致的，因此怀疑`.zshrc (or .bashrc)`内有命令错误

## 移除未使用的命令

使用debug模式，尝试读取并执行.zshrc

> 如果不能确定当前.zshrc配置，请清理后再执行source！

```bash
source ~/.zshrc -x
```

果然，发现了新的错误：

```bash
compinit:501: no such file or directory: /usr/share/zsh/vendor-completions/_docker
```

这是由于复制时WSL2和WSL1在处理docker的方案上不同，导致自动补全的链接出现问题，移除WSL1容器内的docker自动补全

```bash
cd /usr/share/zsh/vendor-completions
# remove your deprecated auto-completions
```

再执行source，问题解决！