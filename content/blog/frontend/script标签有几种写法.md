---
tags:
- HTML
categories: Frontend
title: script标签有几种写法
date: 2019-08-16T16:05:00.000+00:00
excerpt: 老梗新用，“茴”字有几种写法？其实 `script`标签也有很多写法，用这篇文章再梳理一遍加深印象。
thumbnail: ''

---
#### script 标签有哪些属性

* async
* defer
* integrity
* src
* type
* text
* crossorigin

区别如下

![script标签属性区别](https://x.arcto.xyz/y04gmB/script-tag-difference.png)

如图可知，async不影响页面解析过程，但是加载完成执行过程会终止parsing；
而defer是在过程中加载，等到页面解析完成后才执行。

**要注意，async无法确定顺序，比较适合不依赖dom结构的，而defer则是顺序执行**

#### 其他的方式

1. 动态创建script标签

```javascript
var script = document.createElement('script');
script.type = "text/javascript";
script.src = "file1.js";
document.getElementByTagName("head")[0].appendChild(script);
```

动态创建的script无论在何时执行创建，其源js均会在最后执行