---
date: 2021-12-06T02:47:33+08:00
categories: others
tags:
- others
title: hetnzer解决mac地址滥用警告
excerpt: ''

---
### Cause

安装Proxmox VE，开通VM，配置网络，ok，大概率会马上收到mac警告。

### Resolve

```bash
vim /etc/sysctl.conf
# edit this line to
# net.ipv4.igmp_link_local_mcast_reports = 0
sysctl -p
```

然后使用邮件里给的Retry地址，申请官方测试，目前我是收到了问题已解决的邮件，增加了state后，暂无新警告。

### 社区的额外解决方案

1. 阻止43端口

2. 关闭rpc

```bash
systemctl disable rpcbind.service rpcbind.socket rpcbind.target
```

这两个方案未验证，单独修改这两处的时候，仍然提示Abuse，应该是没用。