---
categories: Other
date: 2020-08-02T01:49:59+08:00
tags:
- 工具
title: 使用forestry.io管理你的博客
excerpt: '[forestry.io](https://forestry.io/ "Forestry.io") 我使用了约有一年的时间，整体体验下来非常不错，对于书写博客这种轻量化的需求基本可以全面满足，利用模板（Front
  matter）和多种媒体库接入方式，把更多的精力专注于写作上。'
thumbnail: ''

---
> 如果英文能力还可以的同学可以直接移步 [官网文档](https://forestry.io/docs/welcome/)

## 原来的写博客方式

现在比较多的写博客模式是利用Github仓库，连接Github Page或者一些第三方服务如Netlify, Vercel(Now.sh)来进行部署，写好文章提交后的流程已经基本自动，而且大部分平台的服务都是免费的。

> 博主之前使用Vercel部署时，需要注意免费计划 **每个小时不能超过30次构建部署** 。

然而写博客主要是内容，那么书写平台就是一大问题，我们虽然可以用本地IDE（亦或是Code Server/VSCode Remote）这一类工具进行编写，但是未免仍不够轻量，如果是iPad这一类移动设备更是不方便，因而，我发现了这个基于Git的第三方编辑平台—— [Forestry.io](https://forestry.io)

![Forestry.io CMS](https://res.cloudinary.com/forestry-io/image/fetch/c_limit,dpr_auto,f_auto,q_80,w_1028/https://forestry.io/uploads/2018/12/draft-post-editor.png)

## 快速上手

Forestry.io支持四种Git来源：Github, Gitlab, Bitbucket, Azure Devops。

一般作为博客我们使用Github，继续后会进入到Github的授权界面，授权即可。

> 默认的授权是读取Public库，如果你需要也可以在CMS左侧的Settings中选择授权Private仓库。

> 如果是Bitbucket和Azure Devops，可能需要更复杂的设置，我没有使用过，可以参考官方文档。

授权完成后，可以进入Dashboard，选择Add Site。

本篇以一个GatsbyJS的模板项目为例子，Hexo，Hugo，Jekyll官网上都有相关的例子可以参考。如果你是Hexo，请选择Other类别。然后点击Next。

![选择静态生成框架](https://x.arcto.xyz/ACvJrn/forestry-step1.png)

进入到“Select your git provider”界面，和原来一样，选择你的Git来源，这里我选择Github。

第三步就来到了仓库选择，直接选择你想要操作的仓库与分支，如果你不想让Forestry提交commit到master，请在此选择一个编辑分支。

![选择仓库与分支](https://x.arcto.xyz/px985W/forestry-step3.png)

导入完成，进入到CMS的主界面。

![CMS主界面](https://x.arcto.xyz/mrnxZc/forestry-step4.png)

## 简单设置

如同上面的CMS显示，我们只要将剩下三步配置完成即可。

### Set up sidebar

侧边栏是一些快捷入口，这里你可以配置三类：

![侧边栏配置](https://x.arcto.xyz/DzKWqf/forestry-setting1.png)

* 目录: 顾名思义，目录可以用作分类等场合，对应的，所有在分类下创建的文档都会进入到对应的目录下；
* 文档: 直接编辑某一篇文档，适合作为介绍页或者文档页的快捷入口；
* Heading: Heading是一个 **没有内容** 的侧边栏选项，适合作为分割线等等，来定制你的侧边栏；

这里添加一个Section，可以看到可以配置很多项，一般默认即可，如果不希望分类下额外存在目录，可以将创建内容改为Documents

![创建侧边栏](https://x.arcto.xyz/KEXWaw/forestry-setting2.png)

这里我们先不配置默认模板，先保存。

### Import Media

重头戏来了，之所以选择一个CMS，最重要的就是我们很多时候有上传图片的需求，但是无论是Git手动提交还是第三方工具上传，都费时费力，还需要手工粘贴图片的绝对地址。

而有了CMS，这一切都简化了。

![](https://x.arcto.xyz/ks36HG/forestry-setting3.png "配置媒体文件")

如图所示，可以支持四种图片管理方式，最普通的Git提交，第三方支持了Cloudinary和Amazon S3以及Netlify Large Media。

> Cloudinary可以免费试用，它是一个积分制的服务，如果你的博客流量较小，那么它的免费量其实足以；
>
> Amazon S3这里特别提一下，目前有很多VPS厂家会提供Object Storage，他们会提供类似S3的管理方式，但是咨询了Forestry.io的技术支持后，明确表示了 **目前支持的S3仅有Amazon，即你暂时无法通过配置其他域名来实现其他S3的配置** 。

如果配置顺利，在“可视化编辑器”内，你就可以点击这里实现上传直接插入文档中：

![](https://x.arcto.xyz/JatvkA/forestry-setting4.png "添加图片")

点击open后，会跳转到你的媒体库，上传即自动插入到文章中。

## 配置预览

Forestry.io支持在发布前进行预览，需要配置预览的相关命令，环境以Node.js为主，也可以进行自定义，本章内容建议详细参阅官方文档的 [配置页面](https://forestry.io/docs/previews/instant-previews/)

## 设置文章模板

这一章也是非常重要的，我们在前面的Section里可以设置默认模板，这就是为了方便统一类别下的文章格式一致(Front matter)，点击左侧的Front matter进入配置界面。

点击添加模板后，可以全新创建，也可以从已有的文章自动分析。

> 我自己使用时发现，文本编辑的识别率较好，如果是类似标签选择的则会识别错误，建议先导入，然后添加一篇新文章进行测试。

一般对于Markdown的博客写作，我们选择左侧的“Fields and big content area”。

![](https://x.arcto.xyz/Z721sM/forestry-setting5.png)

Forestry.io提供了一些Field选项，对于博客写作，它们可以与你的Front matter一一对应，通过交互实现配置Front matter，进而与你的博客主题（如Banner图，文章简介等等）比较好的对应，具体使用可以自己体验一下。