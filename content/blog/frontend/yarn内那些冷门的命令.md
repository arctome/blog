---
tags:
- NPM
- Yarn
- 命令
- 升级
categories: Frontend
title: Yarn内那些冷门的命令
date: 2020-01-05T16:00:00.000+00:00
excerpt: 这篇文章在忘记命令的时候还会快速访问看看，不要再只用install和add了！
thumbnail: ''

---
## Yarn与Package

1. `yarn remove [package]`

执行remove会同时移除package.json与yarn.lock。

## Yarn安装

1. `yarn install --force`

Yarn支持缓存依赖，如果曾经安装过相同的包，则会从缓存读取，并且能够离线安装，如果认为之前缓存的版本有问题，则需要使用`--force`来强制跳过缓存安装。也可以运行`yarn cache clean`移除所有本地缓存（可以指定包名单独清理）。

1. `yarn install --ignore-scripts`

Yarn和NPM在运行安装时，如果项目有相关的钩子，则会在相应的事件运行钩子，如果想避免执行钩子，则可以通过忽略scripts避免钩子执行。

1. `yarn global add`

Yarn的全局安装需要注意的是，在一些环境下`yarn config set prefix <filepath>`来设置全局安装位置，或者在如同`yarn global add create-react-app --prefix /usr/local`配置全局安装位置。

这个问题常见于Linux环境，如果我们执行`yarn config get prefix`得到的是`undefined`或者其他无法访问的目录，我们是不能够通过yarn global安装全局可执行的命令的，这时我们需要设置`yarn config set prefix ~/.yarn`然后在我们的\~/.bashrc(或者\~/.zshrc)文件内添加一行:

```bash
export PATH="$PATH:`yarn global bin`"
```

## Yarn CLI 相关

1. `yarn list --depth=0`

博主曾经遇到过一次本地环境阿里云SDK执行正常，但同事的执行故障，经过检查发现阿里云的SDK最近有更新，检查可以通过list命令，也可以指定具体的包。

1. `yarn upgrade-interactive [--latest]`

升级，升级包是一个核心需求，加入--latest可以忽视大版本直接获取对应包的最新版，如果是跨版本更新，则会同时修改package.json。

1. `yarn version --new-version <version>`

我们在更新项目时经常需要同时更新package.json的对应版本，如果需要结合CI流程则未免过于繁琐，可以对应执行yarn version来更新package.json。

## 你应该保留yarn.lock文件并提交到版本控制

yarn.lock文件内部包括了所有相关的依赖和版本信息，以及对应的包地址，为了能够保证在所有开发者以及开发环境（如CI等）的运行一致，建议保留并提交版本控制。

## 有关于切换源

> 原始默认的源：https://registry.yarnpkg.com

我们可以通过`yarn config set registry https://registry.npm.taobao.org/`来设置源为淘宝源，但是偶尔会出现一些安装问题，这里备份一下原始地址以供参考。