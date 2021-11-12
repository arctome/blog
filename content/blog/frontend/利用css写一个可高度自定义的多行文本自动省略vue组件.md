---
tags:
- CSS
- 文本省略
- ellipsis
- 文本溢出
categories: Frontend
title: 利用CSS写一个可高度自定义的多行文本自动省略Vue组件
date: 2019-08-12T00:02:00.000+08:00
excerpt: 对于展示型页面，多行文本省略非常常见，但是实现时往往要通过嵌套，而且并不够足够精确，这里借鉴一位前辈的方案实现一个小的Vue组件实现多行省略。
thumbnail: ''

---
目前对于文本溢出是通过
```CSS
/* 单行 */
text-overflow:ellipse;
/* 多行 */
overflow : hidden;
text-overflow: ellipsis;
display: -webkit-box;
-webkit-line-clamp: 2;
-webkit-box-orient: vertical;
```

但这两种方法仅限于截断后在末尾添加省略号，如果有类似这样的需求，既不是纯色背景，又不能使用渐变的时候，就不容易计算末尾处如何控制溢出

这里引用[大神hi](http://hai.li/2017/03/08/css-multiline-overflow-ellipsis.html)的解决方法，仅使用css解决这个问题，本文使用 _Vue + Stylus_ 完成这个方案

首先分析这个组件应该具备的扩展性，它应该可以定制最大行数、行高，也需要规定更多部分的宽度大小，同时应该提供内容以及更多的html片段[插槽](https://cn.vuejs.org/v2/guide/components-slots.html#ad)(不清楚的同学请猛戳左侧链接~)，这里我先定义它的props:
```javascript
export default {
  name : 'mutiLinesEllipsis',
  props: {
    lineHeight : {
      type : Number
    },
    maxLines : {
      type : Number
    },
    fontSize : {
      type : Number
    },
    moreTextSize : {
      type : Number
    }
  }
}
```
那么有了以上的几个属性，我们开始组织我们的html结构

### 盒子结构以及原理
如图所示，这里利用了一个块元素检测左侧高度与整体高度，当文本超出时，整个内部高度被撑开，使得“更多”块有空间移动到左侧。

```html
<div class="mutiple-line" :style="{'max-height':lineHeight*maxLines + 'px' , 'line-height':lineHeight+'px'}">
  <div class="ellipsis-container" :style="{'-webkit-line-clamp':maxLines , 'font-size':moreTextSize + 'px'}">
    <div class="ellipsis-content" :style="{'font-size':fontSize + 'px'}"><slot></slot></div>
    <div class="ellipsis-ghost">
      <div class="ellipsis-placeholder" :style="{'height' : lineHeight*maxLines + 'px'}"></div>
      <div class="ellipsis-more" :style="{'font-size':fontSize+'px', 'width':moreTextSize+'px', 'height':lineHeight+'px', 'margin-top':'-'+lineHeight+'px'}">
        <slot name="more-link"></slot>
      </div>
    </div>
  </div>
</div>
```

```css
// 基本的多行容器样式
.mutiple-line 
  position: relative;
  overflow: hidden;
  width 100%
  .ellipsis-container   
    position: relative;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    color: transparent;
  .ellipsis-content 
    color: #000;
    display: inline;
    vertical-align: top;
  .ellipsis-ghost 
    position:absolute;
    z-index: 1;
    top: 0;
    left: 50%;
    width: 100%;
    height: 100%;
    color: #000;
  .ellipsis-ghost:before
    content: "";
    display: block;
    float: right;
    width: 50%;
    height: 100%;
  .ellipsis-placeholder 
    content: "";
    display: block;
    float: right;
    width: 50%;
  .ellipsis-more 
    position: relative;
    float: right;
```

利用Vue响应式的特点，如果这里需要做媒体查询等操作也是可以的，只需要改变传入参数即可，通用于任何Webkit内核浏览器(毕竟还是要依赖`-webkit-line-clamp`属性)