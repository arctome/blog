---
date: 2021-08-27T15:47:15+08:00
categories: frontend
tags:
- npm
- yarn
title: npm/Yarn(v1)问题解决方案一览
excerpt: ''

---
> 当前npm版本7.21.1，yarn使用classic版本，解决方案可能只适用于Linux环境下，请知晓。

### npm

#### npm install -g 各种权限问题

在初始化安装好node和npm后执行以下命令，设置对应目录的权限为当前用户：

```bash
sudo chown -R $USER ~/.npm
sudo chown -R $USER /usr/lib/node_modules
# For npm version smaller than v7, the path may be `/usr/local/lib`
# sudo chown -R $USER /usr/local/lib/node_modules
```

#### npm lifecycle warning

```
npm WARN lifecycle The node binary used for scripts is /var/folders/g_/dslq6ff90pn_wyjv5g6578qm0000gn/T/yarn—1577473189287-0.1962072526914138/node but npm is using /usr/local/Cellar/node/13.5.0/bin/node itself. Use the `—scripts-prepend-node-path` option to include the path for the node binary npm was executed with.
```

警告中已经提示了，需要执行 `npm config set scripts-prepend-node-path true` 解决。

### Yarn (Classic)

> npm遇到的主要是global安装的问题，主要涉及了相关的目录，以下[Yarn官方推荐的方案](https://classic.yarnpkg.com/en/docs/cli/global)也可以类比配置到npm已解决global安装问题。

#### Yarn全局安装到指定位置

```bash
yarn global add nodemon --prefix /usr/local
```

这样的好处是不必修改环境变量path，对于一到两个全局命令比较实用。

#### Yarn设置全局安装位置

```bash
yarn global bin
```

会回显目前的全局安装的可执行文件的系统链接位置，如果不希望设置到`/usr`相关的目录，则可以通过：

```bash
yarn config set prefix ~/.yarn
```

> `yarn global dir`会显示全局包的实际安装路径，如果磁盘容量有限可以考虑修改。

设置到其他目录，如果这样配置需要在全局环境变量增加yarn的全局位置，以bash为例，在文件最后添加一行：

```bash
export PATH="$(yarn global bin):$PATH"
```