---
tags:
- 前端
- 浏览器
- 重绘
- 重排
- repaint
- reflow
categories: Frontend
title: 浏览器的重绘（Repaint）与重排（Reflow）机制
date: 2019-08-21T00:00:00.000+08:00
excerpt: 优化重绘与重排是日常优化页面性能较为常见的手段，了解其机制非常重要。
thumbnail: ''

---
#### 什么时候会触发重排？

- 添加或删除可见的 DOM 元素
- 元素位置改变
- 元素尺寸改变（包括：外边距、内边距、边框厚度、宽度、高度等属性改变）
- 内容改变。例如：文本改变或图片被另一个不同尺寸的图片代替
- 页面渲染器初始化
- 浏览器窗口尺寸改变
- 获取会导致渲染队列刷新的属性（详细介绍如下）

除此之外，一些获取DOM结构和布局的操作也会触发重排，比如：
* offsetTop , offsetLeft , offsetWidth , offsetHeight
* scrollTop , scrollLeft , scrollWidth , scrollHeight
* clientTop , clientLeft , clientWidth , clientHeight
* getComputedStyle() ( currentStyle in IE )

#### 为什么说重排比重绘更耗费性能

当 DOM 的变化影响了元素的几何属性（宽和高） – 比如改变边框宽度或给段落增加文字，导致行数增加 – 浏览器需要重新计算元素的几何属性，同样其他元素的几何属性和位置也会因此受到影响。浏览器会使渲染树中受到影响的部分失效，并重新构建渲染树。这个过程称为 “重排（reflow）”。完成重排后，浏览器会重新绘制受影响的部分到屏幕中，该过程称为 “重绘（repaint）”。

重排会导致大量的计算，而重绘的区域已经计算好，相对而言开销小一些，但是要注意，两种情况都是需要一定开销的，一定要尽量减少；

#### 我可以怎么做来避免呢？
1. 合并多次对样式属性的操作/使用class
2. 批量修改DOM - 通过生成一个DOM片段后一次性插入文档（可以通过脱离文档流来减少开销）
3. 缓存布局信息减少获取的操作
4. 将需要多次重排的元素，position 属性设置为 absolute 或 fixed