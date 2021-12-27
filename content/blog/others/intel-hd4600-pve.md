---
date: 2021-12-06T11:18:54+08:00
categories: others
tags:
- others
title: Intel核显HD4600直通PVE
excerpt: ''

---
本文主要针对HD4600核心显卡给出特殊问题的解决办法，正常直通流程请参考下方：

> 正常直通请参考LALA大佬的教程，此处给出[链接](https://lala.im/6324.html)

> HD4600 核心显卡驱动[直达地址](https://www.intel.cn/content/www/cn/zh/support/products/81496/graphics/graphics-for-4th-generation-intel-processors/intel-hd-graphics-4600.html#drivers-software)

> 如果是win10之前的版本如win7,8,server 2012可以选择15.36版本下载，能够正常使用3D等能力，但测试Plex硬解没有显示成功(hw标识)。win10及之后的版本可以选择15.40，能够正常进行硬解。

如果按照以上教程已经配置完毕，但进入系统设备管理器显示“设备已停止，代码：43”，那么请按以下方法配置。

## 0. (可选)将PCI ID更新到GRUB

> 之所以为可选步骤，是因为有些设备不需要这一行也能正常设置到vfio，具体原因不清楚。

```
vim /etc/default/grub
```

将`GRUB_CMDLINE_LINUX_DEFAULT`改为下方所示，我的DEVICE ID是8086:0412，修改为你的设备id

> 查询请参考上方教程。

```
# Replace your device_id
GRUB_CMDLINE_LINUX_DEFAULT="quiet intel_iommu=on video=efifb:off vfio-pci.ids=8086:0412"
```

修改完成后执行，使grub生效

```
update-grub
```

## 1. 编辑QEMU配置文件

执行下方命令，注意替换你的节点名和vm id。

```
vim /etc/pve/nodes/<YOUR_NODE_NAME>/qemu-server/<VM_ID>.conf
```

如果已经有hostpci0一行，请将其删除或注释，并在文件中增加一行：

> 00:02.0是我的VGA设备id，请对应替换为你的设备id。

```
args: -device vfio-pci,host=00:02.0,x-igd-opregion=on
```

## 2. 设置机器类型

经过我的测试，这套配置需要使用默认的SeaBIOS和i440fx机器，UEFI+q35的配置我这里没有直通成功。

## 3. 收尾工作

安装hd4600驱动，设置远程桌面，先后重启宿主机和vm，可以尝试在远程桌面模式下运行three.js的[examples](https://threejs.org/examples/)，能够看到GPU的3D部分开始工作，我这里第一个例子的帧数稳定在32帧。

Plex的面板也提供展示，能够看到某个用户当前正在看的，点击图标还有详细信息，如果后面括号有hw标记，则代表已经使用了硬件加速。


> 解决方案参考自[Proxmox论坛帖子](https://forum.proxmox.com/threads/i5-4440-hd-4600-passthrough-code-43.75322/post-339028)