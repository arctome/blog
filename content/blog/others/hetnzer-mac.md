---
date: 2021-12-06T02:47:33+08:00
categories: others
tags:
- others
title: hetnzer解决mac地址滥用警告
excerpt: ''

---
> 本文最后更新于2021年12月27日

Google搜索“hetzner mac abuse”关键字，可以说，在Hetzner购买独立服务器的确物美价廉，售后友好，上下行网络都是标准G口，即便是欧洲商家也很难找出其二。

但是，Hetzner位于德国，因此其网络限制比较多，比如NFS端口不能完全暴露外网，MAC地址限制等等。

> 有关于Hetzner关于MAC限制的[说明](https://www.hetzner.com/legal/dedicated-server)，这个规则适用于整个Hetzner下的所有Dedicated Server，不区分机房。

那么，如果在Hetzner独服上，安装Proxmox，__并开通带有独立IPv6的VM&LXC__，就会基本上一定收到"MAC Abuse Report"，警告机器能够检测到除主机mac之外的其他mac，违反了协议，超过指定时间会被锁定机器。

> 购买独立IPv4在2022年将会上涨，包括租费以及首次安装费，不建议独立IPv4，如果购买了额外IPv4，则需要在面板里手工绑定mac，不涉及本文中提到的解决方案。

## 官方文档解决方案

> [Reference](https://docs.hetzner.com/robot/dedicated-server/faq/error-faq/#mac-errors)

翻译一下，Proxmox的防火墙存在Bug，建议阻止outgoing方向的43端口，但是这个bug只在Proxmox VE 6版本存在，我在PVE7同样收到了MAC Abuse邮件。

## “破罐子破摔”型方案

这个报告的确很恼人，而且频率极高，如果非必须使用PVE，可以不用……

## 社区方案

上一个方案属于开玩笑了，想必点进来都是想解决问题的，搜索了所有提及相关关键字的帖子or方案，大致分为几类。

### pfsense

使用pfsense将子网网络独立，相对比较复杂，而且，子网内的机器比较依赖中间的中转。参考[链接](https://github.com/pekare/hetzner-proxmox-pfsense)

### 禁用一些转发（验证不一定成功）

sysctl.conf

```
net.ipv4.igmp_link_local_mcast_reports = 0
```

包括社区提及，关闭rpcbind相关服务

```
systemctl disable rpcbind.service rpcbind.socket rpcbind.target
```

## 我的终极方案（IPv4 NAT + IPv6）

最近手头增加了两台独服，参考了另一个Kimsufi的独服网络配置方案，相对简单，而且在PVE6 和 PVE7上，均能生效。

首先防火墙配置，正常设置一条规则（或者一个安全群组，vm和节点都能使用），阻止进出的43端口TCP链接。

由于是单个IPv4和一个/64位的IPv6段，拥有独立IP的vm都是单IPv6，直接设置一个经过主网卡进行转发。

所以对于IPv6的链接，流向如下：

```
Outside <==> vmbr0(main IPv4 + main IPv6) <==> vmbr1 (a subnet in main IPv6)
```

### 宿主机配置

一个示例的/etc/network/interfaces文件如下

```
### Hetzner Online GmbH installimage

source /etc/network/interfaces.d/*

auto lo
iface lo inet loopback
iface lo inet6 loopback

auto enp2s0    #ifconfig提前找到的主网卡名称
iface enp2s0 inet manual
iface enp2s0 inet6 manual

auto vmbr0
iface vmbr0 inet static
  address <YOUR_MAIN_IPV4>         #后台可查
  netmask <YOUR_MAIN_IPV4_NETMASK> #后台可查
  gateway <YOUR_MAIN_IPV4_GATEWAY> #后台可查
  bridge_ports enp2s0              #ifconfig提前找到的主网卡名称
  bridge_stp off
  bridge_fd 0
  bridge_maxwait 0

iface vmbr0 inet6 static
  address 2a01:aaa:aaa:aaa::2      #后台可查，这里假设一个虚拟的IPv6/64地址
  netmask 64                       #后台可查，Hetzner一般为/64
  gateway fe80::1                  #后台可查，Hetzner一般为此gateway
  bridge_ports enp2s0
  bridge_stp off
  bridge_fd 0

## 内网桥接 
auto vmbr1
iface vmbr1 inet static
  address 10.10.2.1
  netmask 255.255.255.0
  bridge_ports none
  bridge_stp off
  bridge_fd 0
  post-up iptables -t nat -A POSTROUTING -s '10.10.2.0/24' -o vmbr0 -j MASQUERADE
  post-down iptables -t nat -D POSTROUTING -s '10.10.2.0/24' -o vmbr0 -j MASQUERADE

  # NAT
  post-up iptables -t nat -A PREROUTING -i vmbr0 -p tcp --dport <EXPOSE_PORT> -j DNAT --to 10.10.2.2:<VM_PORT>
  post-down iptables -t nat -D PREROUTING -i vmbr0 -p tcp --dport <EXPOSE_PORT> -j DNAT --to 10.10.2.2:<VM_PORT>

iface vmbr1 inet6 static
  address 2a01:aaa:aaa:aaa::3/64
  bridge_ports none
  bridge_stp off
  bridge_fd 0
  post-up echo 1 > /proc/sys/net/ipv6/conf/all/proxy_ndp
  post-up echo 1 > /proc/sys/net/ipv6/conf/all/forwarding
  post-up echo 1 > /proc/sys/net/ipv6/conf/default/forwarding
  post-up /sbin/ip -f inet6 neigh add proxy 2a01:aaa:aaa:aaa::3 dev vmbr1
  # 下面两行为一对，指::100/128的IPv6地址通过vmbr0转发出去，而进网增加了一条经::3在vmbr1上转发的规则，有几个独立的固定IPv6，则增加几对
  post-up /sbin/ip -f inet6 neigh add proxy 2a01:aaa:aaa:aaa::100 dev vmbr0
  post-up /sbin/ip -f inet6 route add 2a01:aaa:aaa:aaa::100 dev vmbr1
```

> 建议使用我之前提过的较为安全的修改方式，避免interfaces错误导致无法连接机器，[文章链接](/others/安全配置服务器网络/)

保存，并重启networking服务。

```
service networking restart
```

如果顺利的话，SSH链接恢复，检查Proxmox，两块虚拟网卡vmbr0和vmbr1正常。

### Proxmox配置

VM和LXC(即CT)配置方式类似。

对于IPv6分配，采用静态，选择一个在interfaces内已经配置好转发的地址，桥接选择vmbr1，记得开启防火墙并同步双向43的规则，正常情况下，机器的IPv6应该是通的。

而对于NAT的IPv4地址，不开启防火墙也没有问题，因为43规则已经用于宿主机，端口转发会遵从宿主机防火墙配置。