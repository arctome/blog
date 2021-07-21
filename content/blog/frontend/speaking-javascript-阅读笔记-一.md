---
categories: Frontend
tags:
- JavaScript
date: 2020-02-28T07:31:08.000+00:00
title: '"Speaking JavaScript"阅读笔记（一）'
excerpt: Speaking JavaScript，忘记捡起这本书的原因了，但是这一轮把欠下的债认真还了一边，收获良多，这一篇大部分都是铺垫的内容。
thumbnail: ''

---
### 写在前面

由于疫情的原因，这次离职比以往多了许多准备和复习的时间，也能沉下心好好复习一下基础知识点，本篇是我自己在阅读“Speaking JavaScript”时做出的摘录与笔记，在整理的过程中会加入一些自己想到的代码示例，并综合《JavaScript高级程序设计（第3版）》整理，如果有一些错误欢迎在下方的Disqus评论区指正，感谢！

~~为什么没有用最新的第四版高程呢？因为2019.10.16才正式有英文版，而且作者和第三版不是同一位……等到出了正式中文版再做一次补充吧~~

![Speaking JavaScript](https://x.arcto.xyz/N4DgB-/orm_front_cover.jpg "中文名：深入理解JavaScript")

# 0. JavaScript背景知识

### 0.1. JavaScript与ECMAScript的关系

ECMAScript是JavaScript的官方命名，因为Java已经是一个商标。JavaScript指编程语言，ECMAScript是语言规范的名字。

### 0.2. ECMAScript历程

* 1th Edition (1997-01)
* 2th Edition (1998-08)
* 3th Edition (1999-12, 4th Edition has been abandoned at 2008-07)
* 5th Edition (2009-12)
* 6th Edition - ECMAScript 2015
* 7th Edition - ECMAScript 2016
* 8th Edition - ECMAScript 2017
* 9th Edition - ECMAScript 2018
* 10th Edition - ECMAScript 2019
* ES.Next

# 1. JavaScript的一些特性

### 1.1 语法类别：语句和表达式

```javascript
var foo; // 语句, do something
3 * 7 // 表达式, 产生“值”
```

常见的一种情形是：三目表达式 与 `if-else`块。

### 1.2 分号：建议使用

分号用于结束语句，缺少的分号会通过分号自动插入机制(ASI)完成，什么是ASI呢？

> ASI的目标是使分号对于行结束来说是可选的，也有说法是帮助解析器来确定语句的结束。

__但是，在以下的情况下也会认定为语句结束: __

* 行结束符后（如换行符）跟着一个非法token；
* 遇到一个结束的花括号；
* 文件已达结尾；

```javascript
if(a<0) a = 0
console.log(a) // 0后跟console属于非法token
```

```javascript
function foo(a, b) {
	return // return意味着会自动插入一个分号，下文不再执行
  	{
    	a + b
    }
}
```

### 1.3 变量名

一个合法的变量名规则：第一个字符可以是任意的Unicode字符、美元符号($)、或者下划线( _ )，后面还可以是任意的Unicode数字。

> ECMAScript中的一切都区分大小写。

但是保留字不能作为变量名，除保留字外以下变量也不建议：

* `Infinity`
* `NaN`
* `undefined`

### 1.4 值

原始值：

* true、false
* 数字（均为浮点）
* 字符串
* “空值”: undefined, null

除以上外，其他的值都是对象，特殊的，通过“装箱”我们可以得到非原始值的“字符串”、“布尔”、“数字”。

> 当复制引用类型的值的时候，会复制一份值的副本到新变量分配的空间中，然而，**这个值的副本实际上是一个指针，指向存储在堆中的一个对象**。

#### 1.4.1 如何对值分类

1. typeof

typeof主要用于原始值，除`typeof null === 'object'`外，其他都有正确的输出。

> typeof null是一个不能修正的bug，因为这会破坏现有的代码。~~直到目前的标准也不能修改~~

1. instanceof

instanceof主要用于对象，用来判断 **value是否是一个通过Constr构造器创建的对象。**

### 1.5 布尔值

#### 1.5.1 假值

以下值会被解释为假值：

* undefined, null
* false
* ~~-0~~ , NaN (经过测试，目前浏览器对+0，-0均判断为false)
* ''

#### 1.5.2 二元操作符

JavaScript的二元逻辑运算符是 **短路** 的，也就是说我们可以利用这个特点优化代码，尽量将大概率发生的优先判断。

'&&'，'||'符号返回的是第一个运算数的 **假（真）值** 或者第二个运算数，也就是说其实际返回的是执行后的值。

### 1.6 数字

JavaScript中的所有的数字都是浮点数。

### 1.7 字符串

### 1.8 语句

* 多条件情况下，switch的运行效率要高于if-else；
* break可以跳离循环，continue会开始一个新的循环迭代，可以用来优化循环内的执行过程；

### 1.9 函数

#### 1.9.1 函数声明的提升特性

注意与变量声明之间的区别，函数声明 **的实体会被移动到所在作用域的开始处** 。

> 而变量声明会变成如下的代码：
>
> ```javascript
>     var a; // undefined
>     console.log(a); // undefined
>     a = 3; // 3
> ```

但是要注意函数声明与函数表达式不同，后者只符合变量声明的提升规则。

```javascript
console.log(a); // undefined
console.log(b); // Uncaught ReferenceError: b is not defined. stopped.
var a = function b() {
    return 3;
} 
console.log(a);
console.log(b);
```

#### 1.9.2 特殊变量arguments

所有参数变量——`arguments`看起来像一个数组，但是却不具备数组的方法。(Array-like)

如果想将arguments转换为数组，代码如下：

```javascript
Array.prototype.slice.call(arrayLikeObject);
```

### 1.10 变量作用域

一个变量的作用域总是完整的函数。

#### 1.10.1 提升

所有变量声明都会被提升，**声明** 会被移动到函数的开始处，而赋值仍然会在原来的位置。通常来说，优先提升`var a;`，然后再提升`function a`，然后再赋值。

#### 1.10.2 闭包

> 闭包是指有权访问另一个函数作用域中的变量的函数。 —— JS高程(第3版),后文简称高程

一般外层函数内部存在一些变量，然后以返回一个函数的形式完成闭包，最常见的模式即“IIFE”

#### 1.10.3 IIFE

```javascript
// 关于为什么这种写法可以完成IIFE，后续会补充在此。
(function () {
	var foo = 'test'
}());
```

这里要注意闭包有时会存在并 **保持** 与外界变量的联系，如下：

```javascript
for(var i=0;i<5;i++) {
	result.push(function () { return i; }) // result[1]()执行后仍然是i = 5赋值的时候
}
```

_与对象等有关的点单独总结一章详细说明_