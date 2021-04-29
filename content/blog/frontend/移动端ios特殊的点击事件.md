---
tags:
- Safari
categories: Frontend
title: 移动端iOS特殊的点击事件
date: 2019-08-13T00:00:00.000+08:00
excerpt: 又在iOS的点击事件上踩坑了，iOS的Safari会对触发条件要求比较高，如果你也踩坑了可以花几分钟看看
thumbnail: ''

---
### 起因

目前需要做一个 SDK，挂载到全局完成一些标记的时间，因此需要借助`document.body.addEventListener`的方式，那么废话不多说，一把 suo

```javascript
document.body.addEventListener('click', function(e) {
  console.log('成功触发:' + e.target)
})
```

正当我觉得这一切没什么问题的时候，测试发现了 Bug

| iOS 设备不能正常的触发啊

这种情况只能回头看代码了，这里有如下代码

```html
<p data-xxx="test"></p>
```

通过上面的事件监听，我发现 iOS 设备压根没有成功的添加到这个节点，那么是什么问题呢？

### Bug or Feature?

经过一系列尝试我发现， **位于 body 的事件是无法在捕获/冒泡阶段在 iOS 设备触发事件** , 这就触及到知识盲区了，赶紧翻阅相关网站查找资料

### Fix

经过查阅，以下方法可以修复这个问题：

- onclick
- `<a href="javascript:void(0);">`
- `cursor: pointer;` body 或者对应元素
- `<button>`
- `click` -> `touchstart`

以上方案来讲，样式最清晰，改动最小，touchstart 方案也是比较容易实现的，但需要注意 touchend