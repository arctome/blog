---
categories: Frontend
tags:
- CSS
- 灰度化
date: 2020-04-04T01:48:03.000+08:00
title: 利用CSS给自己的博客增加灰度化效果
excerpt: 特殊的日子，前端需要配合做一些修改，这里总结一些大厂的实现方法。
thumbnail: ''

---
## 思路

利用filter特性，我们可以对根节点直接增加黑白滤镜，也可以通过通用的类名实现指定节点的滤镜（请注意，filter属性可能会影响部分DOM元素的渲染层，请参考BFC相关知识点。）

## 先看几种实现

### B站

```css
html.gray{-webkit-filter:grayscale(.95)}
```

配合以下的JS代码实现在指定时间段内自动开启滤镜：

```javascript
var now=Date.now();15859296e5<now&&now<1586016e6&&(document.getElementsByTagName("html")[0].className="gray")
```

(PS: 刚上线的时候看了一下，发现轮播没有修改为单个，后两个为空，一定要注意😂)

### 京东

```css
.o2_ie8 .more2_international {
    filter: progid:dximagetransform.microsoft.alphaimageloader(src='//storage.360buyimg.com/mtd/home/more_international1575014601797.png', sizingMethod='scale');
    background: none;
}

.mod_help_cover {
    background-image: none;
}

.dropdown:hover .cw-icon {
    border-bottom: 1px solid #e3e4e5;
}

html.o2_gray {
    -webkit-filter: grayscale(100%);
    filter: progid:DXImageTransform.Microsoft.BasicImage(grayscale=1);
}
```

配合以下JS代码实现在指定时间内应用类名

```javascript
var isDuringDate = function(beginDateStr, endDateStr) {
    var curDate = new Date()
    var beginDate = new Date(beginDateStr)
    var endDate = new Date(endDateStr)

    if (curDate >= beginDate && curDate <= endDate) {
        return true
    }
    return false
}

$html = $('html')
$html.toggleClass('o2_gray', isDuringDate('2020/04/04 00:00:00', '2020/04/04 23:59:59'))
```

(PS: 京东的首页没有压缩源代码，很多部分是直出拼接在页面内的，也是一种便于操作的方案)

### 淘宝

```css
html{-webkit-filter: grayscale(100%);       filter:progid:DXImageTransform.Microsoft.BasicImage(grayscale=1);} 
```

## 总结

综合以上几个例子，我们可以知道，通过`filter: grayscale(100%);`即可完成最简单的灰度化，但是，filter属性的可用性在[Caniuse查询](https://caniuse.com/#feat=css-filters)可知，不兼容全系列IE浏览器，即便我们使用`-ms-filter`，在[部分版本IE仍无法使用](https://docs.microsoft.com/en-us/previous-versions/ms530752(v%3Dvs.85))，因此，如果需要兼容IE则可以通过IE浏览器自身实现的滤镜来作为替代。

> Note   As of Windows Internet Explorer 9 this feature was deprecated. As of Internet Explorer 10 this feature was removed and should no longer be used.

另外可以发现，京东还做了图片滤镜的兼容，在灰度滤镜效果异常时可以使用半透明图片作为滤镜，也是一种常见的方案。

## 延申阅读

[如何尽可能的兼容低版本IE](https://medium.com/@MateMarschalko/css-filters-all-the-way-down-to-ie4-6349d61c4cce)

上面这篇文章介绍了一些兼容的技巧，但是对于一些效果需要实验验证DXImage系的滤镜与CSS3滤镜的效果是否一致。