---
date: 2021-12-06T02:47:33+08:00
categories: others
tags:
- others
title: hetnzer解决mac地址滥用警告
excerpt: ''

---
> 本文最后更新于2021年12月8日

### Cause

安装Proxmox VE，开通VM，配置网络，ok，大概率会马上收到mac警告。

### 只使用IPv4 NAT方式

```bash
echo "net.ipv4.igmp_link_local_mcast_reports = 0" >> /etc/sysctl.conf
sysctl -p
```

从邮件提交测试，应该能够解决问题。

### IPv4 NAT + IPv6独立方式

由于上述配置只针对IPv4，在我给机器增加IPv6后，果然收到了新的警告，报告的mac地址与新增的IPv6 only网卡一致。

> [Hetzner Doc Link](https://docs.hetzner.com/robot/dedicated-server/faq/error-faq/#mac-errors)

根据文档，在Proxmox VE界面防火墙增加规则，我将43端口的双向TCP全部屏蔽。

再次提交测试，顺利通过。

### 社区的额外解决方案

> [Community](https://forum.proxmox.com/threads/proxmox-claiming-mac-address.52601/page-7)

1. 关闭rpc

```bash
systemctl disable rpcbind.service rpcbind.socket rpcbind.target
```

这个方案未验证。