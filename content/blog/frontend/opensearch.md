---
date: 2021-08-31T17:59:24+08:00
categories: frontend
tags:
- OpenSearch
title: 如何让网站支持OpenSearch
excerpt: ''

---
## What is OpenSearch

OpenSearch是一个通用的搜索协议，主要是为了给浏览器提供“搜索引擎”探知，也就是说，支持了这个功能的网站，可以在较为新的浏览器地址栏添加搜索引擎或者直接进行搜索，如Gtihub和npm。

## Example

我们接下来以npmjs.com举例说明。

查看页面源代码，我们可以找到一行meta标签信息：

```html
<link data-react-helmet="true" href="https://static.npmjs.com/osd.xml" rel="search" title="npm package search" type="application/opensearchdescription+xml"/>
```

其中`type="application/opensearchdescription+xml"`声明了这是一条对OpenSearch支持的元信息，`rel="search"`，链接到了一个xml文档，我们打开可以看到：

```xml
<OpenSearchDescription xmlns="http://a9.com/-/spec/opensearch/1.1/" xmlns:moz="http://www.mozilla.org/2006/browser/search/">
<ShortName>npm</ShortName>
<Description>Search for packages on npm</Description>
<InputEncoding>UTF-8</InputEncoding>
<Image width="16" height="16" type="image/x-icon">https://static.npmjs.com/favicon-16x16.png</Image>
<Url type="text/html" method="get" template="https://www.npmjs.com/search?q={searchTerms}"/>
</OpenSearchDescription>
```

非常简单，首先最外层及OpenSearch协议标准，使用ShortName字段定义一个名称，可以带有描述、Icon，其中最主要的是Url字段。

这个字段提供了搜索需要的请求地址以及方法，在浏览器地址栏搜索时，会使用用户输入的字符替换`{searchTerms}`，并按照xml配置的方法进行请求，因此我们在自己实现时，主要需要将其修改为我们页面的搜索请求接口。