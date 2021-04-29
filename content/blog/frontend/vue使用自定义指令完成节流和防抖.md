---
tags:
- Vue.js
categories: Frontend
title: Vue使用自定义指令完成节流和防抖
date: 2019-08-12T00:00:00.000+08:00
excerpt: 在与用户有较多互动的场景（搜索，表单智能补全），防抖和节流显得尤为重要，在用户体验与接口性能之间找到绝佳的平衡点。
thumbnail: ''

---
### 为什么要通过指令实现？

参考`lodash/_`，和`underscore`库，节流和防抖均是通过高阶函数的形式实现的，这种方式需要手动绑定`this`，对于 Vue 的单组件文件来说，在`methods`外层使用会导致`this`的指向不清，直接指向`window`的情况，举例：

```javascript
methods: {
  doSomethings () {
    console.log('log')
  }
},
mounted () {
  document.querySelector('.test').addEventListener('click', function() {
    _.throttle(this.doSomethings, 200)
  }) // 无法正常触发，此写法报错非函数，箭头函数则完全没有触发内部函数
}
```

```javascript
methods: {
  doSomethings: _.throttle(function() {
    console.log('log') // 可以正常节流，这里this的指向是该组件
  })
}
```

虽然第二种方法正确实现了节流，但是这种写法不方便进行组合合并，如果触发的函数有不同的情况，在内部的函数需要多层嵌套或者传参，举例：

```vue
<template>
  <div id="app">
    olas
    <span @click="test(1)">1111</span>
    <span @click="test(2)">2222</span>
    <span @click="test(3)">3333</span>
    <span @click="test(4)">4444</span>
  </div>
</template>
<script>
methods: {
  test: function(i) {
  	console.log(i)
  },
	doSomething:_.throttle(function(i) {
    this.test(i)
  }, 2000)
	},
	mounted () {

	}
</script>
```

这种情况下无法实现参数值的传递，需要借助 data，并不是比较好的选择，因此采用自定义指令的方式

### 这种实现有什么不足？

最大的一点不足就是 **SSR**

需要通过判断`window`或者提供一个服务端专用版本来避免获取 dom，但是需要节流/防抖的一般都是在客户端的用户交互事件，往往不需要提供服务端版本，因此我这里采用`window`判断的方式，只在客户端挂载监听事件

通过自定义指令，代理 v-on 直接挂载的方式，需要传入较多的参数

### 防抖实现

参数：

- `func`: methods 内的函数名;
- `args`: 向该方法传递的参数，形式为数组;
- `opt` : 防抖选项，包含 seconds 和 immediate

```javascript
Vue.directive('debounce', {
  inserted: function(el, binding) {
    const event = binding.arg
    const funcArgs = binding.value.args || []
    const options = binding.value.opt || {}
    const wait = options.seconds || 300
    if (typeof window !== 'undefined') {
      let timer = null
      el.addEventListener(event, e => {
        if (timer) {
          clearTimeout(timer)
        }
        if (options.immediate) {
          let callNow = !timer
          if (callNow) {
            binding.value.func.apply(this, funcArgs)
          }
          timer = setTimeout(() => {
            timer = null
          }, wait)
        } else {
          timer = setTimeout(() => {
            timer = null
            binding.value.func.apply(this, funcArgs)
          }, wait)
        }
      })
    }
  }
})
```

### 节流实现

参数：

- `func`: methods 内的函数名;
- `args`: 向该方法传递的参数，形式为数组;
- `opt` : 防抖选项，包含 seconds 和 leading(未实现),trailing(未实现)

```javascript
Vue.directive('throttle', {
  inserted: function(el, binding) {
    const event = binding.arg
    const funcArgs = binding.value.args || []
    const options = binding.value.opt || {}
    const wait = options.seconds || 300
    if (typeof window !== 'undefined') {
      let previous = 0
      el.addEventListener(event, e => {
        if (!previous) {
          previous = new Date()
          binding.value.func.apply(this, funcArgs)
        } else {
          let now = new Date()
          if (now - previous > wait) {
            previous = now
            binding.value.func.apply(this, funcArgs)
          }
        }
      })
    }
  }
})
```