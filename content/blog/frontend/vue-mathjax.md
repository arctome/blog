---
date: 2021-10-08T18:36:07+08:00
categories: frontend
tags:
- frontend
title: Vue项目中使用MathJax
excerpt: ''

---
> [MathJax's Home Page](https://www.mathjax.org/)

日常在一些页面里会用到Latex公式，在这一方面比较成熟的就是MathJax库，能够提供最为全面且方便的页面公式展示。

### 引入MathJax(v3)

```bash
npm i mathjax-full --save
# yarn add mathjax-full
```

Vue项目中import的内容需要通过Webpack处理，而MathJax最终的提供形式是挂载到window的，所以，在有需要的位置直接使用：

```javascript
import "mathjax-full/es5/tex-svg-full";
// import "mathjax-full/es5/tex-chtml-full"; // CHTML方式
```

### 在Vue项目中使用MathJax(v3)

在Vue项目中，我们习惯手工去触发渲染，因为大量的内容会动态生成。在手工触发时，调用以下方法:

```javascript
window.MathJax.typeset();
```

### 隐藏右键菜单

MathJax的功能对于公式展示而言，极为完备，甚至默认提供了右键菜单来让用户定制展示，对于B端项目，右键菜单并不是必要的，因此通过options将其关闭。

那么由于相关JS是通过直接import的方式引入的，无论是mount相关周期还是create相关周期，MathJax都已经初始化完毕，无法再配置。

所以，比较好的办法是在Vue的入口文件main.js内，直接全局优先定义options

```javascript
window.MathJax = {
  options: {
    enableMenu: false,
    processHtmlClass: 'tex2jax_process' // 指定需要处理的DOM元素类，避免全局遍历
  }
}
```