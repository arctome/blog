---
tags:
- JavaScript
categories: Frontend
title: JS中的异步链式调用
date: 2020-02-16T16:00:00.000+00:00
excerpt: 经典面试题，这里给出一种思路较为直接的解法。
thumbnail: ''

---
```javascript
let EatMan = function () {
  this.task = [] // 声明一个task数组，模拟事件循环队列；
  this.taskNum = []
  let fn = () => {
    this.next();
  }
  this.task.push(fn);
  setTimeout(() => {
    this.next();
  }, 0)
  return this;
}

EatMan.prototype.eat = function (str) { // 为了task任务队列一致性，将eat也转换为setTimeout异步
  const _this = this
  var fn = () => {
    setTimeout(() => {
      console.log(str)
      _this.next()
    }, 0)
  }
  this.task.push(fn)
  this.taskNum.push(str)
  return this // 返回this使得可以链式操作
}
EatMan.prototype.sleep = function (ms) { // setTimeout的任务，需要在完成时再调用next继续执行
  const _this = this
  var fn = () => {
    setTimeout(() => {
      console.log('this is normal sleep.')
      _this.next()
    }, ms * 1000)
  }
  this.task.push(fn)
  this.taskNum.push('sleep')
  return this
}
EatMan.prototype.firstSleep = function (ms) { // 与sleep类似，注意需要在队首加入
  const _this = this
  var fn = () => {
    setTimeout(() => {
      console.log('this is first sleep.')
      _this.next()
    }, ms * 1000)
  }
  this.task.unshift(fn)
  this.taskNum.unshift('firstSleep')
  return this
}
EatMan.prototype.next = function () { // 通过next指针完成出队列操作，使之拥有顺序
  let fn = this.task.shift()
  fn && fn()
}

let eatMan = new EatMan()
eatMan.eat('apple').eat('orange').sleep(3).eat('banana').firstSleep(3)
console.log(eatMan.taskNum)
```