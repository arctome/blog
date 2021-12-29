---
date: 2021-12-30T02:10:49+08:00
categories: others
tags:
- others
title: Nginx配置目录挂载后启动
excerpt: ''

---
常见情况，使用了一些如NFS，s3fs等方式，动态挂载目录，并提供给nginx使用，如果nginx设置直接启动，会找不到文件因而启动失败。

## Fix

### Edit systemctl of nginx

```bash
# if your device doesn't have /etc/systemd/system/nginx.service.d/
mkdir /etc/systemd/system/nginx.service.d
touch /etc/systemd/system/nginx.service.d/override.conf
# Start edit
vim /etc/systemd/system/nginx.service.d/override.conf
# Or
systemctl edit nginx.service
```

在文件内添加：

```
[Unit]
RequiresMountsFor=/data # Your dynamic mount folder
```

然后重启nginx

```bash
systemctl start/restart nginx.service
systemctl enable nginx.service
```