---
categories: Frontend
tags:
- JavaScript
date: 2020-03-02T17:48:00.000+08:00
title: '"Speaking JavaScript"阅读笔记（附加篇）'
excerpt: JavaScript阅读笔记最终篇，一些额外的内容。
thumbnail: ''

---
_本篇开始将一部分浏览器与Node.js环境相关的知识点补充进来_

### 超时与间歇调用

> JavaScript是单线程语言（后期加入额外线程Worker）

需要注意的是，使用定时器对于队列而言，不是在指定时间立即执行，而是 __在指定时间被加入到队列中__ ，如果队列内没有其他任务，则表现为“立即执行”

如果在浏览器端，需要效果比较好的定时执行，可以通过rAF实现。

### DocumentFragment

使用DocumentFragment优化DOM操作。

### 浏览器的重绘与重排

详见另一篇[文章](https://blog.sparking.app/post?id=fe%252F%25E6%25B5%258F%25E8%25A7%2588%25E5%2599%25A8%25E7%259A%2584%25E9%2587%258D%25E7%25BB%2598-repaint-%25E4%25B8%258E%25E9%2587%258D%25E6%258E%2592-reflow-%25E6%259C%25BA%25E5%2588%25B6 "重绘与重排")

### 事件

现在使用MVVM框架多了，减少了直接操作事件，但是还是有必要列出复习的。

#### 1. 事件流

三个阶段：

* 事件捕获
* 处于目标
* 事件冒泡

#### 2. DOM2级事件处理程序

* `addEventListener(eventName, fn, needCapture?)`
* `removeEventListener`

remove操作需要注意，fn不能是一个匿名函数，这时remove才有效。

#### 3. 事件对象

event对象通常包括以下：

* bubbles
* cancelable
* currentTarget
* defaultPrevented(DOM Level-3)
* detail
* eventPhase(处于流的阶段，1-捕获，2-处于目标，3-冒泡)
* preventDefault() (取消默认行为，注意区分)
* stopImmediatePropagation() (DOM Level-3)
* stopPropagation() (取消事件的进一步捕获或冒泡)
* target
* trusted
* type
* view

#### 4. 事件委托

事件委托利用了事件冒泡，只指定一个事件处理程序，就可以管理某一类型的所有事件。

面试题：

Q：用原生JS实现jQuery的on和off效果？

A:

#### 5. 事件模拟

可以用 `document.createEvent` 模拟一些鼠标或者键盘事件，但是需要实机测试，例如Chrome对模拟的点击事件就有比较严格的限制。

#### 6. 拖放事件

HTML5 新增的事件，可以用来作为一些特殊的交互，比如拖放上传等。

#### 7. JSON

注意，以下都是 **合法的** JSON：

* **简单值**
* 对象
* 数组

> `JSON.stringify(value[, replacer [, space]])` 可以通过传入第二个参数进行JSON过滤，第二个参数支持数组或者函数。第三个参数不常用，一般用于控制缩进。

### XHR(XMLHttpRequest)

状态值：

* 0，未初始化；
* 1，启动（已经调用open但是未send）；
* 2，发送；
* 3，接收；
* 4，完成。

#### 1. FormData

表单提交，可以上传文件。

#### 2. Progress事件

用于监测进度，可以用HTML5实现上传进度。

#### 3. 跨域CORS

> 跨域资源共享(CORS) 是一种机制，它使用额外的 HTTP 头来告诉浏览器  让运行在一个 origin (domain) 上的Web应用被准许访问来自不同源服务器上的指定的资源。当一个资源从与该资源本身所在的服务器不同的域、协议或端口请求一个资源时，资源会发起一个跨域 HTTP 请求。

> 出于安全原因，浏览器限制从脚本内发起的跨源HTTP请求。 例如，XMLHttpRequest和Fetch API遵循同源策略。

1. 不会引发CORS的简单请求：

   ![MDN-CORS](https://oss.sparkling.fun/puburl/VfwsaPAQhV/CORS_simple-request.png)
2. 需要进行预检（Preflight）的请求：

   ![MDN-CORS](https://oss.sparkling.fun/puburl/puogwu-2C1/CORS_preflight-request.png)
3. 携带身份凭证（Cookie）：

   ![MDN-CORS](https://oss.sparkling.fun/puburl/6uD8-ns9MM/CORS_with-credit.png)
   
### 高级技巧：节流与防抖

节流：节约流量——无论触发多少次，指定间隔内只能触发一次；
防抖：防止抖动——中间触发N次都以最后一次开始计算时间，待指定间隔后触发。

### 数据存储

#### 1. Cookie

Cookie数量限制不一，在20-50之间，尺寸一般在4096B

#### 2. Storage

localStorage一般会设置每个来源5MB，部分浏览器只有2.5MB；

SessionStorage同样一般为5MB，部分浏览器为2.5MB；

#### 3. IndexedDB & WebSQL

浏览器支持情况不定，需要根据具体需求使用。