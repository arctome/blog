---
date: 2021-05-24T07:16:21+08:00
categories: others
tags:
- others
- Docker
title: 个人向Docker Swarm使用笔记
excerpt: 持续更新中，内容可能随时有更新……

---
# Docker Swarm

相比于k8s这种重量级的集群方案，k3s足够轻量，非常适合个人，但是在我这里，我有着数个IPv6 only的服务器，k3s目前不能完美支持IPv6的worker节点加入集群，这使我关注到了Docker重新推出的Swarm模式

## Create a Manager

```bash
# 此处也可以使用网卡名称？未测试
docker swarm init --advertise-addr <MANAGER-IP>
```

## Join as a worker

```bash
docker swarm join \
  --token <MANAGER-NODE-DELIVERED-TOKEN> \
  <MANAGER-IP>:2377
```

> 如果丢失了这个token，也可以通过`docker swarm join-token manager`重新显示。

## Group workers by label

可以通过创建label来对worker进行分类：[相关Issues](https://github.com/moby/moby/issues/27231#issuecomment-767696365)

```bash
docker node update --label-add test swarm-test-04
```

如果添加成功，通过以下命令即可通过label筛选列出相关worker

```bash
docker node ls --filter node.label=test
```

## 开放端口

对于一般的IPv4机器我们可以直接使用类似`8080:8080`的方式打开，但是如果是IPv6 Only，打开端口需要将配置改为：

```yaml
- target: 8080
  published: 8080
  protocol: tcp
  mode: host
```
