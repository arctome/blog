---
date: 2021-07-05T15:21:52+08:00
categories: otherss
tags:
- others
title: 使用cloc有效统计你的代码量
excerpt: ''

---
## 代码量 - 一个有时绕不开的命题

在某些特定的时候，虽然程序质量（或者说复杂度）不是与代码量成正比，但是不得不提供出来，对于前端常用VSCode的同学，自然没有使用idea同学好运，他们有自带的代码统计工具，因此，要推荐一个工具 —— [cloc](https://github.com/AlDanial/cloc)

## 安装非常简单，对于有包管理的OS而言

正如官方Github的简介一样简单，使用各自的包管理直接安装即可。

方便无法访问Github的同学，腾一份小抄：

```bash
npm install -g cloc              # https://www.npmjs.com/package/cloc
sudo apt install cloc            # Debian, Ubuntu
sudo yum install cloc            # Red Hat, Fedora
sudo dnf install cloc            # Fedora 22 or later
sudo pacman -S cloc              # Arch
sudo emerge -av dev-util/cloc    # Gentoo https://packages.gentoo.org/packages/dev-util/cloc
sudo apk add cloc                # Alpine Linux
doas pkg_add cloc                # OpenBSD
sudo pkg install cloc            # FreeBSD
sudo port install cloc           # macOS with MacPorts
brew install cloc                # macOS with Homebrew
choco install cloc               # Windows with Chocolatey
scoop install cloc               # Windows with Scoop
```

安装好之后，即可执行统计文件、文件夹甚至Git仓库的代码量了。

## 常用

```bash
cloc perl-5.22.0.tar.gz
cloc ./
```

### 遵从gitignore配置统计代码

对于前端同学，统计代码往往需要忽略最大的`node_modules`以及打包生成的`dist`文件，查找了官方issue找到了非常方便的方法：

```bash
cloc $(git ls-files) 
# Or
cloc --vcs git # Or cloc --vcs svn
```


