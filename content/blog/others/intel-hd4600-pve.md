---
date: 2021-12-06T11:18:54+08:00
categories: others
tags:
- others
title: Intel核显HD4600直通PVE
excerpt: ''

---
本文主要记录的是直通遇到错误码的情况。

> 正常直通请参考荒岛大佬的教程，此处给出[链接](https://lala.im/6324.html)

### 错误码Code28

没装驱动，装上驱动再检查。

### 错误码Code43

这款核心显卡常见的问题……根据[社区帖子](https://forum.proxmox.com/threads/i5-4440-hd-4600-passthrough-code-43.75322/post-339028)的方案，我在win10的kvm虚拟机成功直通，以下是较评论更详细的步骤。

> 请先检查上述直通过程有无问题，以下配置建立在前面直通配置完毕的情况下。

#### 将PCI ID更新到GRUB

```
# Replace your device_id
GRUB_CMDLINE_LINUX_DEFAULT="quiet intel_iommu=on video=efifb:off vfio-pci.ids=8086:0412"
```

#### 编辑vm配置

```
vim /etc/pve/nodes/<YOUR_NODE_NAME>/qemu-server/<VM_ID>.conf
```

在文件内增加(id修改为你自己的DEVICE_ID)

```
args: -device vfio-pci,host=00:02.0,x-igd-opregion=on
```

如果之前配置了PCI-E设备，请把`hostpci0`所在行注释，不然会导致`device is already attached`错误，无法启动。

至于使用q35 or 默认，以及UEFI or SeaBios都无所谓，我是用的双默认，可以启动。

> 我这里使用的是i7-4770，考虑到4代特性，没有使用UEFI模式。

### 启动之后

之所以一直在任务管理器看不到负载是因为PVE内的预览是使用的类似“板载显卡”的方式来输出界面的，因而没有走核显，使用Remote Desktop，预览three.js的例子，可以清晰的看到3D引擎已经产生了负载。

Plex的面板也提供展示，能够看到某个用户当前正在看的，点击图标还有详细信息，如果后面括号有hw标记，则代表已经使用了硬件加速。