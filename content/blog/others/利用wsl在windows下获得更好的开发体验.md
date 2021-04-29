---
categories: Other
tags:
- WSL
date: 2020-04-22T14:44:42.000+08:00
title: 利用WSL在Windows下获得更好的开发体验
excerpt: WSL和WSL2都是大坑，这篇先介绍如何配置，先用起来，之后再更新一篇文章来细数WSL的问题与缺陷……
thumbnail: ''

---
## 为什么Windows不适合作为开发使用？

对于我个人的前端开发体验而言，主要在这几个方面：

- 利用Node.js实现一些自动化功能，代码内经常混入一些Windows无法运行的bash命令；
- Windows下一般不只有开发环境，还会安装一些其他的软件、游戏等等，相互影响；
- 部分库没有做`cross-env`兼容，在Windows下执行会有意料之外的bug；
- Windows的目录结构在实际使用时会有意料之外的问题；

因此，WSL是在Windows下进行开发更好的选择。

> 截止本文编写时，我仍不建议使用WSL2的版本，会给开发带来一些不必要的困扰，稳定后再体验。

## 开启WSL

有关于如何在Windows下开启WSL功能，很多文章在一年前都进行了说明。在当前版本号1909下，只需要注意以下几点：

1. 可以正常使用Microsoft Store（也支持利用zip包安装，具体详见[官方文档](https://docs.microsoft.com/en-us/windows/wsl/install-manual)）；
2. 开启“适用于Linux的Windows子系统”，设置路径在：控制面板\程序\程序和功能 -> 左侧“启用或关闭Windows功能”，这一步骤需要进行重启使得更改生效；

## 安装

安装比较简单，利用Microsoft Store搜索“Linux”，选择你喜欢的版本进行安装即可。

> 安装会默认安装至C盘，如果你的C盘容量非常“宝贵”，建议使用[LxRunOffline](https://github.com/DDoSolitary/LxRunOffline)工具进行迁移，这个工具还可以进行管理等等功能，有兴趣的可以研究一下。我们下载它的Release并在Windows下解压到合适的目录下，利用PowerShell环境运行exe即可执行相关命令。

等待下载完成后启动，需要等待一些时间，系统会自动对你选择的Linux发行版进行配置和初始化，输入你的用户名密码即可开始使用。

## 配置

配置上正常先将系统自带的各种包更新升级`sudo apt update && sudo apt upgrade`

### ProxyChains

由于WSL使用的是父主机（即Windows系统）的网络环境，因此在WSL环境下，部分软件安装配置时，会存在无法访问的情况（例如Github Release的文件分发地址……），强烈建议先配置[ProxyChains-NG](https://github.com/rofl0r/proxychains-ng)，可以选择手工下载源码make安装，也可以利用包管理器（目前包管理器版本较低，为3.x版本，仓库目前已经到了4.x版本，如果有能力建议使用源码安装，我使用的Ubuntu-18.04版本需要安装make与gcc包），`sudo apt install proxychains`进行安装，这里不赘述。

安装好后在`/etc`目录下编辑（如果是源码安装，这里是创建）`proxychains.conf`文件，在文件内写入配置信息：

```bash
[ProxyList]
# add proxy here ...
# meanwile
# defaults set to "tor"
socks5 127.0.0.1 1080
```

在配置完成后，运行命令前带有`proxychains`即可通过代理，例如如下命令即可测试是否成功应用代理：

```bash
proxychains curl myip.ipip.net
```

如果显示代理，即配置成功。

### Node.js & NPM

这里其实没什么需要详细说明的，和我们在服务器环境配置Node.js同理。

> 在官网的角落可以找到一个相对隐蔽的Node源地址，配置后可以直接通过包管理器快捷安装Node，相比于二进制与源码安装更为简单，其[仓库地址](https://github.com/nodesource/distributions)

这里我遇到了Bug，在配置WSL环境前，我没有移除Windows下的Node环境，在完成了上述安装步骤后，`npm -v`提示“Unable to correct problems, you have held broken packages.”，看到对应报错地址指向了`/mnt/c`下的node目录时，明白了npm命令是调用了Windows环境下的npm，因此，卸载Windows下的nvm(__请通过“控制面板”内的软件功能进行卸载__)与Node.js后，移除WSL内已安装的Node.js并重新安装，一切正常工作，完美。

### Oh my Zsh

前文提到过，curl和wget目前都可以通过proxychains进行代理，这里其实没有太大的困难，但是，考虑到可能的DNS污染相关，这里我把官方的curl地址修改为`sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"`并使用代理，安装成功。

> 如果提示SSL相关问题，wget下可以通过`wget --no-check-certificate`临时关闭SSL检查。

这里我还遇到了一个无法连接的问题，我在安装的时候提示我`raw.githubusercontent.com`指向了0.0.0.0，查找[相关issue](https://github.com/microsoft/WSL/issues/3761)，执行以下命令查询是否有相关的软件控制网络或代理，检查发现我的“火绒”影响了，临时退出即可。

```bash
powershell.exe "Get-CimInstance -Namespace root/SecurityCenter2 -ClassName AntivirusProduct" | grep displayName
```

### SSH

配置WSL的git环境需要对应的SSH-key，按照正常的方法，可以生成，但是无法复制出来，__WSL具有可以直接执行Windows环境exe程序的特性__，因此可以通过`cat ~/.ssh/id_rsa | clip.exe`直接复制出来。

然而生成的key无法被Github识别，提示“key is invalid”，查阅得到[这个结果](https://stackoverflow.com/questions/47859437/windows-10-openssh-key-invalid-format)，虽然并不是完全一致的问题，但是提供了思路，将SSH生成的命令修改，删除指定长度“4096”的设置（-b 指定密钥长度。对于RSA密钥，最小要求768位，默认是2048位。DSA密钥必须恰好是1024位(FIPS 186-2 标准的要求)。）

```bash
ssh-keygen -t rsa -C "your_email@example.com"
```

配置到Github，成功。

## 卸载与导出

如果之后不再需要WSL环境，可以通过如下命令进行卸载：

```bash
wslconfig /unregister <wslconfig /list得到的对应名称>
```

额外的，建议将对应的UWP程序同时右键卸载进行彻底移除。

如果希望备份迁移，可以使用前文提到过的LxRunOffline工具进行处理，可以参考项目的Readme进行操作。