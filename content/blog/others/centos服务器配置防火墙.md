---
tags:
- Linux
categories: Other
title: CentOS服务器配置防火墙
date: 2019-08-26T00:00:00.000+08:00
excerpt: 虽然现在用CentOS较少，（因为Docker的原因，基本都是Ubuntu18.04），但是就作为CheatSheet保留在此吧
thumbnail: ''

---
- 将端口添加到区域（永久 `--permanent`）
    ```bash
    firewall-cmd --zone=public --add-interface=eth0
    ```

- reload防火墙
    ```bash
    firewall-cmd --reload
    firewall-cmd --complete-reload # 需要断开链接
    ```
    
- 查看指定区域所有打开的端口
    ```bash
    firewall-cmd --zone=public --list-ports
    ```
    
- 在指定区域打开端口
    ```bash
    firewall-cmd --zone=public --add-port=80/tcp # (永久生效再加上 --permanent, udp设置同理)
    ```
    
- 查看防火墙状态
    ```bash
    systemctl status firewalld
    # firewall-cmd --state
    ```
    
- 防火墙启动/禁用等
    ```bash
    systemctl start firewalld # 启动防火墙
    systemctl stop firewalld # 禁用防火墙
    systemctl enable firewalld # 设置开机启动
    sytemctl disable firewalld # 停止并禁用开机启动
    firewall-cmd --reload # 重启防火墙
    ```