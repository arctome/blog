---
categories: Other
date: 2021-01-11T10:15:24+08:00
tags:
- Linux
title: Nginx故障排除
excerpt: 记录遇到的nginx错误以及相关解决方案
thumbnail: ''

---
### nginx.service: Failed to read PID from file /run/nginx.pid: Invalid argument

已解决。遇到此问题是使用DigitalOcean的Ubuntu 18.04 Droplet,检查nginx运行状态 `service nginx status` 输出标题的错误, 参考[StackOverflow](https://stackoverflow.com/questions/42078674/nginx-service-failed-to-read-pid-from-file-run-nginx-pid-invalid-argument)解决，步骤(以下均使用root账户)：

- `mkdir /etc/systemd/system/nginx.service.d`
- `printf "[Service]\nExecStartPost=/bin/sleep 0.1\n" > /etc/systemd/system/nginx.service.d/override.conf`
- `systemctl daemon-reload`
- `systemctl restart nginx`