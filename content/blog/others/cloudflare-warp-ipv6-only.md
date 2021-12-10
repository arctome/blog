---
date: 2021-05-07T00:57:54.000+08:00
categories: frontend
tags:
- others
- Cloudflare
- Warp
title: 使用Cloudflare Warp为IPv6 only的机器添加IPv4
excerpt: 利用Cloudflare的CDN网络，我们可以为IPv6的机器接入Warp从而访问IPv4网站。

---
随着全球IPv4资源的枯竭，VPS商家衍生了一种新的IPv6 only VPS，由于不占用商家的IPv4资源，因此可以压低价格。然而，VPS上面如果希望运行一些服务，那么势必需要IPv4的接入，我们可以通过Cloudflare的CDN让只有IPv4的用户访问，但如果机器需要访问如Github等，只有IPv4的网站该怎么办呢？一些大佬想到了使用Cloudflare的[Warp服务](https://1.1.1.1/)来实现，本文介绍自己在配置的成功方案。

## STEP 1. 安装Wireguard

> 执行`uname -a`查看内核，内核版本5+可以使用wireguard-tools, 否则请使用 [wireguard-go](https://github.com/WireGuard/wireguard-go)

确认内核版本后，如果选择升级至5+，请执行：

```bash
sudo apt -t $(lsb_release -sc)-backports install linux-image-$(dpkg --print-architecture) linux-headers-$(dpkg --print-architecture) --install-recommends -y
```

内核在5+后，执行下列命令，安装Wireguard：

```bash
sudo apt install net-tools -y
sudo apt install wireguard-tools --no-install-recommends
# If can't find `wiregurad-tools`, execute this and retry
echo "deb http://deb.debian.org/debian $(lsb_release -sc)-backports main" | sudo tee /etc/apt/sources.list.d/backports.list
```

## STEP 2. 安装第三方工具wgcf

> [wgcf](https://github.com/ViRb3/wgcf) is an unofficial, cross-platform CLI for Cloudflare Warp

执行命令，下载wgcf工具：

```bash
curl -fsSL git.io/wgcf.sh | sudo bash
```

完成后，首先进行注册：

```bash
wgcf register
```

过程中需要同意Cloudflare Warp协议，选择“Yes”，

成功生成后，再执行：

```bash
wgcf generate
```

执行成功，会在当前目录生成一个`wgcf.conf`，我们将它复制到Wireguard目录下：

```bash
cp wgcf.conf /etc/wireguard/wgcf.conf
```

## STEP 3. 修改wgcf.conf

编辑`wgcf.conf`文件，使其与下面的例子相似：

    [Interface]
    PrivateKey = YOUR_GENERATED_KEY_HERE
    Address = *.*.*.*/32
    #Address = *:*:*:*:*:*:*:*/128
    DNS = 2001:4860:4860::8888
    MTU = 1280
    PostUp = ip -6 rule add from [ipv6 addr] lookup main
    PostDown = ip -6 rule delete from [ipv6 addr] lookup main
    [Peer]
    PublicKey = YOUR_GENERATED_KEY_HERE
    AllowedIPs = 0.0.0.0/0
    #AllowedIPs = ::/0
    Endpoint = [2606:4700:d0::a29f:c001]:2408

> 2001:4860:4860::8888 可以替换为 Google DNS 或 Cloudflare 的IPv6 DNS服务器。

## STEP 4. 利用Crontab让Wireguard与ssh服务按顺序启动

如果启用了Wireguard的自启动，ssh服务就不能正常开启，因此，使用crontab，增加重启时自动启动Wireguard和SSH

```bash
crontab -e
```

增加以下配置：

    @reboot mkdir -p -m0755 /run/sshd
    @reboot systemctl start wg-quick@wgcf # wgcf是配置文件的名称
    @reboot /etc/init.d/ssh start

## Finish

重启，之后我们可以测试一下能否ping通Github，如果能ping通，意味着Warp配置成功，服务器能够正常访问IPv4 only的地址。