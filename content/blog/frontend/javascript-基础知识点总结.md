---
tags: []
categories: Frontend
title: Javascript 基础知识点总结
date: 2019-08-12T00:00:00.000+08:00
excerpt: 基础知识点，不能再基础的内容，强烈建议直接前往“Speaking JavaScript”相关笔记深入了解。
thumbnail: ''

---
#### 五种基础类型（ES5后6种）
- number
- string
- boolean
- undefined
- null
- Symbol

对象（Object）。其中对象类型包括：数组（Array）、函数（Function）、还有两个特殊的对象：正则（RegExp）和日期（Date）。

#### 类型判断
- typeof 返回值
- instanceof 操作符
- Object.prototype.toString获取 `[[class]]`(准确)

#### 关于函数
函数声明 function foo(){}
函数表达式 var foo = function () {}
##### 区别
- 函数声明会在任何表达式被解析和求值之前先被解析和求值，即使你的声明在代码的最后一行，它也会在同作用域内第一个表达式之前被解析/求值
- 函数声明在条件语句内虽然可以用，但是没有被标准化，也就是说不同的环境可能有不同的执行结果，所以这样情况下，最好使用函数表达式
```javascript
var getName//变量被提升，此时为undefined

getName()//oaoafly 函数被提升 这里受函数声明的影响，虽然函数声明在最后可以被提升到最前面了
var getName = function() {
	console.log('wscat')
}//函数表达式此时才开始覆盖函数声明的定义
getName()//wscat
function getName() {
	console.log('oaoafly')
}
getName()//wscat 这里就执行了函数表达式的值
```

#### 函数优化
如果我们的代码中返回多个闭包的情况，如果没有手动设置null的话，内存不会被自动释放。

#### 立即执行函数 & 匿名函数
在一个表达式后面加上括号()，该表达式会立即执行, 但是在一个语句后面加上括号()，是完全不一样的意思，他的只是分组操作符。

#### 闭包
首先了解一个JavaScript变量的作用域,
无非就是两种：全局变量和局部变量。Javascript语言的特殊之处，就在于函数内部可以直接读取全局变量。另一方面，在函数外部自然无法读取函数内的局部变量。但是通过闭包，可以在函数外面访问到内部的变量！比如:
```javascript
function f1(){
　　var n=999;
　　function f2(){
　　　　alert(n); // 999
　　}
}
```

#### 事件监听
这两种方式确定了事件执行的前后顺序，只不过后来W3C对DOM2的事件模型给出了一个规范
[http://www.w3.org/TR/2000/REC-DOM-Level-2-Events-20001113/]：首先进入事件捕获阶段->达到元素后->进入事件冒泡阶段。

#### 原型继承
在Javascript中，每个函数都有一个原型属性prototype指向函数自身的原型，而由这个函数创建的对象也有一个`__proto__`
属性指向这个原型，而函数的原型是一个对象，所以这个对象也会有一个`__proto__`指向自己的原型，这样逐层深入直到Object对象的原型(null)，这样就形成了原型链。

#### This
除了DOM的事件回调或者提供了执行上下文（后面会提到）的情况，函数正常被调用（不带new）时，里面的this指向的是全局作用域。
还有个例外，就是使用了`"use strict";`。此时this是`undefined`。
当用调用函数时使用了new关键字，此刻this指代一个新的上下文，不再指向全局this。
注意原型链底层函数中对`this`的操作会覆盖上层的值。
解决方法就是传递的时候使用`bind`方法显示指明上下文，`bind`方法是所有函数或方法都具有的。同时也可以使用`apply`或`call`
来调用该方法或函数，让它在一个新的上下文中执行。
在DOM事件的处理函数中，this指代的是被绑定该事件的DOM元素。除非你通过`bind`人为改变了事件处理器的执行上下文。

#### 对象
我们说的通过引用进行对象比较是:两个对象的值是否相同取决于它们是否指向相同的底层对象。