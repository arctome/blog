---
tags:
- HTML
categories: Frontend
title: meta标签的使用
date: 2019-08-17T00:00:00.000+08:00
excerpt: meta标签我们总是一键生成，但是忽略了里面一些特殊属性值所能带来方便，这篇文章简单列出一些常用但缺少注意的标签值。
thumbnail: ''

---
平时使用时最常见的用法：
```html
<meta charset="UTF-8">
```

但是通过meta我们可以实现很多特别的功能。

#### meta是什么

>The <meta> tag provides metadata about the HTML document. Metadata will not be displayed on the page, but will be machine parsable.

换句话来说，就是页面里对用户不可见，但是可供浏览器解析的页面信息。

#### meta的类型

##### http-equiv

这一类使用格式为`<meta http-equiv="参数" content="具体的描述">`

- content-Type
可以设置html的字符集和格式，但是被`<meta charset="utf-8">`取代

- X-UA-Compatible
设置浏览器渲染模式，一般采取最新的：
```html
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
```

- cache-control
设置浏览器缓存，一般设置为`<meta http-equiv="cache-control" content="no-cache">`
可设置为以下属性：
	- no-cache: 先发送请求，与服务器确认该资源是否被更改，如果未被更改，则使用缓存。
	- no-store: 不允许缓存，每次都要去服务器上，下载完整的响应。（安全措施）
	- public : 缓存所有响应，但并非必须。因为max-age也可以做到相同效果
	- private : 只为单个用户缓存，因此不允许任何中继进行缓存。（比如说CDN就不允许缓存private的响应）
	- maxage : 表示当前请求开始，该响应在多久内能被缓存和重用，而不去服务器重新请求。例如：max-age=60表示响应可以再缓存和重用 60 秒。
    - no-siteapp: 禁止百度默认的移动端转码。
    
- expires
设置网页过期时间，超时需要重新从服务器获取。
```html
<meta http-equiv="expires" content="Sunday 26 October 2016 01:00 GMT" />
```

- refresh
网页将在设定的时间内，自动刷新并调向设定的网址。
```html
<meta http-equiv="refresh" content="2;URL=https://blog.sparkinglemon.me">
```
设置为2s后自动转向到网址

- Set-Cookie
配置页面cookie

##### name
name属性的配置格式
```html
<meta name="参数" content="具体的描述">
```

- keywords
设置页面关键词，SEO收录常用

- description
页面描述，SEO常用

- viewport
__移动端__ 设置视口。后续会在移动端适配详细补充。

- robots
告知爬虫具体需要爬取的页面，默认是all ，可以设置none，noindex（非本页），nofollow（通过本页索引其他页）

- author
页面作者，不常用

- generator
页面制作于

- copyright
页面版权信息

- revisit-after
设置爬虫重访时间


> 部分内容参考了 [Lxxyx-“HTML meta标签总结与属性使用介绍”](https://segmentfault.com/a/1190000004279791)