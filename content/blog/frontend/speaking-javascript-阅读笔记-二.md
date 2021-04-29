---
categories: Frontend
tags:
- JavaScript
date: 2020-02-29T18:57:46.000+00:00
title: '"Speaking JavaScript"阅读笔记（二）'
excerpt: JavaScript阅读笔记第二部分，这部分是JS的一些基本内容。
thumbnail: ''

---
### 2. JavaScript相关的一些事

#### 2.1. JavaScript的性质

- 它是动态的；
- 它是动态类型； _（即便引入TypeScript协助开发也只能协助推导类型。）_
- 它是函数式和面向对象的；

### 3. JavaScript语言深入

#### 3.1 语句

凡是在JavaScript期望语句的地方都可以写表达式，不能在需要表达式的地方使用语句。

如果使用二义表达式（语法类型是二义的），为了避免二义性，在解析过程中，JavaScript不能使用对象字面和函数表达式作为语句，即不能以下面的内容开头：
- '{}'；
- function关键词； _(所以IIFE模式需要将匿名函数放在一个括号内，如果不使用这个括号， JS会认为这是一个函数声明，而函数声明是不可以匿名的，而函数定义又不能立即执行。)_

#### 3.2 数字

刷题曾经遇到过一个这样的问题：

```javascript
// 以下那种写法能够正确输出？
1.toString()  // 唯一一种不能正常输出的。
1..toString()
1 .toString()
(1).toString()
1.0.toString()
```

之所以存在这种问题，是因为JS内所有数字都是以浮点数存储的，这里紧跟的'.'会被认为是小数点。

### 4. 值

> 在编程语言的语义和类型体系环境中，静态一般是指“编译时”或者“非运行时”，动态是指“运行时”。

#### 4.1 强制转换

JavaScript内置的转换机制只支持布尔值、数字、字符串和对象。

怪异的两个转换：

- `Number(null) === 0`
- `Number(undefined); // NaN`

两个约定的转换方式：

- 乘法运算符会强制转换为数字；
- 加法运算中如果一个是字符串，运算符会将另一个运算数转换为字符串。

引擎内自带一个转换算法，ToPrimitive()，根据情景的不同偏好，先后完成：

- 如果输入的是原始值，返回；
- 如果输入是对象，偏好为数值，调用valueOf（偏好为字符串时优先调用toString)；
- 否则，调用toString（valueOf）；
- 否则，抛出一个TypeError。

#### 4.2 null

null表示 __没有对象__ 。

null是原型链最顶端的元素。

```javascript
Object.getPrototypeOf(Object.prototype) // null
```

#### 4.3 原始值的包装对象（装箱）

布尔值，数字和字符串这三种原始值都有响应的构造函数。它们的实例包含原始值。原始值可以从包装器借调方法。

### 5. 运算符

JavaScript中无法重载或自定义运算符，包括等号。

NaN与本身不相等（宽松 & 严格）。

#### 5.1 比较

在比较包装实例和原始值的时候，原始值和包装的原始值是宽松相等的，（但两个相同的原始值它们的包装实例不相等）

### 6. 数字

Number()在转换时一般优于parseFloat(), 原因：

- 对非字符串使用parseFloat效率较低，因为在解析之前它会将参数强制转换为字符串；
- parseFloat()会将空字符串解析成NaN；
- parseFloat()会一直解析到最后一个合法的字符，这意味着最后可能得到的不是想要的结果，比如`parseFloat(123.45#)`

### 7. 字符

字符串是由JavaScript字符组成的不可变序列，其中每个字符是一个16位的UTF-16编码单元。（一个Unicode字符相当于一个或两个JavaScript字符）

优化：新版本JavaScript引擎通过加号+优化字符串拼接并在内部使用相似的方法（array.push()）。

### 8. 数组

不要用for-in来遍历数组，因为for-in只会遍历索引，而不是数组元素，其次还会遍历所有的（非索引）属性值。

注意，for-in遍历对象所有的可枚举属性，其中包括了继承来的属性，因此需要判断是否为自身的：

```javascript
for(var key in person) {
	if(Object.prototype.hasOwnProperty.call(person, key) { // 为了避免person自身有hasOwnProperty方法
    	console.log(key)   
    }
}
```

### 9. 错误处理

对于异常捕获有两个原则：如果一处出错的含义不能被描述，那么就抛错；找到一个可以捕获错误的位置，捕获异常。

Error是通用的异常构造器，所有其他的异常构造器都是它的子构造器，因此我们可以自定义错误构造器。