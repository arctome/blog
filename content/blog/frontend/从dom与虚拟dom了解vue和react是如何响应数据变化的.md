---
tags:
- Vue.js
- Virtual DOM
- MVVM
categories: Frontend
title: 从DOM与虚拟DOM了解Vue和React是如何响应数据变化的
date: 2020-01-08T00:00:00.000+08:00
excerpt: 提起MVVM框架，就不能不提到虚拟DOM，也正是由于虚拟DOM的存在，界面不再是一条条DOM操作驱动的，取而代之的是数据的改变，“自动”地驱动了DOM改变……
thumbnail: ''

---
## 先说浏览器的渲染模式

这里引用一段掘金作者“我是你的超级英雄”在[深入剖析：Vue核心之虚拟DOM](https://juejin.im/post/5d36cc575188257aea108a74) 一文中的描述：

> 所有的浏览器渲染引擎工作流程大致分为5步：创建DOM 树 —> 创建 Style Rules -> 构建 Render 树 —> 布局 Layout -—> 绘制 Painting。
> 第一步，构建 DOM 树：用 HTML 分析器，分析 HTML 元素，构建一棵 DOM 树；
> 第二步，生成样式表：用 CSS 分析器，分析 CSS 文件和元素上的 inline 样式，生成页面的样式表；
> 第三步，构建 Render 树：将 DOM 树和样式表关联起来，构建一棵 Render 树（Attachment）。每个 DOM 节点都有 attach 方法，接受样式信息，返回一个 render 对象（又名 renderer），这些 render 对象最终会被构建成一棵 Render 树；
> 第四步，确定节点坐标：根据 Render 树结构，为每个 Render 树上的节点确定一个在显示屏上出现的精确坐标；
> 第五步，绘制页面：根据 Render 树和节点显示坐标，然后调用每个节点的 paint 方法，将它们绘制出来。

DOM树是整个页面的骨架，承载着内容和结构的任务，而当下的Web开发会有大量与DOM树交互的需要，因此，虚拟DOM和diff算法应运而生，先在虚拟DOM上更新，再diff后应用局部的更新，减少了直接操作DOM树带来的重绘与重排问题，有关diff算法会在下一篇文章中做分析。

## Patch是何时执行的？

当vnode和oldVnode都存在、oldVnode不是真实节点，并且vnode和oldVnode是同一节点时，才会调用patchVnode进行patch。

## Patch/Update有哪些情况？

这里我们只说明后续响应的情况：

- 如果节点不同，则根据 __旧节点__ 参考使用 `nextSibling` 创建新节点并移除旧节点，其中Vue.js需要更新其中占位符节点（实际DOM节点）；
- 如果节点相同，则更新vnode的属性并更新到实际节点，旧节点本质上仍然不变；
- 如果节点存在子元素且子元素发生改变，则通过 `updateChildren` 更新子节点，这里可能会用到我们的key属性，进行快速比对diff。