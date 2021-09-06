---
date: 2021-09-06T13:43:31+08:00
categories: frontend
tags:
- WSL
title: 使用WSL快速搭建开发环境
excerpt: ''

---
### WSL 是什么？

Windows Subsystem of Linux, 属于在Windows内加载的旁系统。WSL1与WSL2的实现不一致，WSL2更像是一个系统内的虚拟机，而WSL1是通过兼容层实现了类似与Linux的运行环境，如果涉及底层的一些操作或者命令则不存在。

更详细的对比请参阅: [Comparing WSL 1 and WSL 2
](https://docs.microsoft.com/en-us/windows/wsl/compare-versions)

### 对于前端同学的选择

我的需要最基本的有：可接受的文件io，Node.js，npm/yarn，容器（运行本地Debug环境）。

那么如上的需求，可以考虑WSL1+WSL2的搭配方案，即需要容器的环境使用WSL2挂载项目文件夹进行执行，否则则在WSL1内正常使用Node开发。

> 如果你能接受 __【挂载盘】较慢的io速度__ 以及 __每次需要现查的主机/WSL2 IP地址__ ，那么可以只使用一个WSL2环境。

### WSL快速配置

> 官方安装指南 [Windows Subsystem for Linux Installation Guide for Windows 10](https://docs.microsoft.com/en-us/windows/wsl/install-win10)

这里我使用 Manual Installation，同时开启WSL2所需的Features，并安装Linux kernel update package。截止至Step4。

我选择不将所有WSL版本都设置为2，即不设置默认使用版本2。

这时安装的WSL即为一代，选择你希望安装的distribution，我这里选择的Debian。

正常安装并在内部配置好所需的开发工具后，将WSL1导出一份用来生成WSL2。

### 配置Node.js环境

前文赘述了不少关于npm的问题，其实根治的方案就是选择一个node版本控制工具，比如nvm，它会将不同版本的包管理在一个有权限的子目录内，“根本上”避免了权限问题。

> 这里我选择的nvm，官方Guide [Readme](https://github.com/nvm-sh/nvm#installing-and-updating)

安装好nvm并使用nvm安装Node.js以及其他工具如yarn等工具后，我们就可以开启“平行宇宙”，将环境一分为二了。

> Yarn (classic) 目前推荐的安装方案：`npm install -g yarn`

> "开启“平行宇宙”，将环境一分为二"的梗来自于Marvel的"What If..." 04，古一将Doctor Strange一分为二，使得同一时间线内有了两个Doctor Strange。

### 切分环境

打开PowerShell，确保容器目前处于关闭状态。

> 手工关闭，`wsl --shutdown`

首先需要把已有的导出为一个档案文件，

```cmd
wsl --export <DistributionName> <FileName>
```

导出后，再使用import进行导入，这里可以指定安装位置，因此 __也可以用来移动WSL安装位置__ :

```cmd
wsl --import <AnotherDistributionName> <InstallLocation> <FileName>
```

验证可以使用`wsl --list -v`，这时我们已经有了两个WSL1。接下来我们转换其中一个为WSL2

```cmd
wsl --set-version <AnotherDistributionName> 2
```

再执行`wsl --list -v`就可以得到两个版本的WSL共存了。

> 使用同一个环境切分，可以比较方便的处理同一个文件夹下的文件，避免了由于不同用户导致的权限问题。

### WSL2容器解决方案

> Docker Desktop v4开始，对于商业公司使用作出了明确限制，如果涉及商用，就需要使用付费plan，因此本文介绍的都是使用[Podman](https://podman.io/) 进行容器管理的方案。

#### Podman安装

其它WSL底层系统请参考[Podman Installation Instructions](https://podman.io/getting-started/installation)

```bash
sudo apt-get -y install podman
```

#### Podman登录Docker注册表

```bash
podman login your.registry.com
```

#### Podman拉取镜像并运行

```bash
podman pull <image>
podman run <custom-args> <image>
```

由于缺失systemd和journal，可能会启动时遇到报错，可以在执行时增加参数`--cgroup-manager=cgroupfs --events-backend=file`，或者直接在配置文件里进行全局设置：

```bash
vim /etc/containers/containers.conf
```

```conf
[engine]
events_logger="file"
cgroup_manager="cgroupfs"
```

#### Podman停止、列出镜像

```bash
podman ps -a
podman stop <container> && podman rm <container>
```

### WSL2实用命令

#### [如何获取主机IP](https://pscheit.medium.com/get-the-ip-address-of-the-desktop-windows-host-in-wsl2-7dc61653ad51)

```bash
ipconfig.exe | grep 'vEthernet (WSL)' -A4 | cut -d":" -f 2 | tail -n1 | sed -e 's/\s*//g'
```