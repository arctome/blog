---
date: 2021-06-04T18:45:48+08:00
categories: frontend
tags:
- frontend
title: 让disable的元素“动”起来
excerpt: ''

---
## 前言

前端开发时经常会遇到用户需要同意协议才能进行提交的操作，此时，如果原本使用的就是表单的方式，那么在用户未同意时disable提交按钮是最为稳妥的方案。

> 当然，还是那句老话，前端所有的验证仅仅是为了“用户体验”， 如果涉及其他考量，请务必后端再判断一次！

然而，disable的元素，是不能够触发事件的，也就是说，没有办法在click与submit时友好地进行提示，这与我们的预期不符，因此，这里推荐几种hack方案。

<iframe height="265" style="width: 100%;" scrolling="no" title="disabled-button" src="https://codepen.io/arctome/embed/yLMKxqm?height=265&theme-id=light&default-tab=js,result" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/arctome/pen/yLMKxqm'>disabled-button</a> by arctome
  (<a href='https://codepen.io/arctome'>@arctome</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

## 1. CSS大法好

```css
input[disabled] {pointer-events:none}
```

仅此一行，解决问题，什么原理呢？

> `pointer-events:none`元素永远不会成为鼠标事件的target。但是，当其后代元素的pointer-events属性指定其他值时，鼠标事件可以指向后代元素，在这种情况下，鼠标事件将在捕获或冒泡阶段触发父元素的事件侦听器。

也就是说，我们将其事件“转移”，disable触发不了，让他上级处理，能够达到一样的效果；

<iframe height="265" style="width: 100%;" scrolling="no" title="disabled-button-css" src="https://codepen.io/arctome/embed/JjWLaQN?height=265&theme-id=light&default-tab=js,result" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/arctome/pen/JjWLaQN'>disabled-button-css</a> by arctome
  (<a href='https://codepen.io/arctome'>@arctome</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>
