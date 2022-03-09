---
date: 2022-03-09T13:35:47+08:00
categories: frontend
tags:
- frontend
- CSS
title: 多级别列表使用CSS自动产生序号
excerpt: ''

---
## OL + LI

有HTML结构如下：

```html
<ol>
  <li>Text1</li>
  <li>
  	<ol>
      <li>Text2.1</li>
      <li>Text2.2</li>
    </ol>
  </li>
</ol>
```

## 利用CSS自动添加序号

```css
ol {
  counter-reset: section;                
  list-style-type: none;
}

li::before {
  counter-increment: section;           
  content: counters(section,".") " ";  
}
```

## 兼容性

> Caniuse [Link](https://caniuse.com/?search=counter-increment)

IE8及以上浏览器均支持，可以放心使用。