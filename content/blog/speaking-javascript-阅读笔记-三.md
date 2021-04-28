---
categories: Frontend
tags:
- JavaScript
date: 2020-03-01T10:18:25.000+00:00
title: '"Speaking JavaScript"阅读笔记（三）'
excerpt: JavaScript阅读笔记第三部分，这部分进入到了核心部分——函数，变量，对象。
thumbnail: ''

---
_本章开始写函数与对象，内容相对较多单起一章专门记录_

### 10. 函数

JavaScript中的函数一共有三种形式：

* 非方法的函数（“普通函数”）；
* 构造器；
* 方法；

因此我们创建函数一共有三种：

* 通过函数表达式；
* 通过函数声明；
* 通过Function()构造器（不推荐）；

所有的函数都是对象、Function构造器的实例。

具名函数表达式只能在函数表达式的内部被访问。

在函数的内部，有两个特殊的对象，arguments和this。

> this引用的值是函数数据以执行的环境对象——或者也可以说是this值。由于在调用函数之前，this的值并不确定，因此this可能会在代码执行过程中引用不同的对象。

> ECMAScript中的所有参数传递的都是值，不可能通过引用传递参数。

#### 10.1. 控制函数调用，`call()`, `apply()`和`bind()`

_bind()方法非原生，本节末尾会给出使用apply实现bind。_

使用：

```javascript
func.apply(thisValue, argArray)
func.call(thisValue, arg1, ..., argN)
func.bind(thisValue, arg1, ..., argN) // 创建一个新函数，会调用func，再绑定this到新的thisValue
```

一个非常有趣的陷阱：

```javascript
['1', '2', '3'].map(parseInt) // [1, NaN, NaN]
```

这是因为parseInt只接受一个参数，map的期望函数签名`function(element, index, array)`，而parseInt的签名则是`parseInt(string, radix?)`, 这会导致radix也被传入。

#### 10.1.1 实现bind

_本节的实现来自JS高程_

1. apply

```javascript
function bind(fn, context) {
  return function () {
    return fn.apply(context, arguments);
  }
}
```

1. apply的柯里化版本

```javascript
function bind(fn, context) {
  var args = Array.prototype.slice.call(arguments, 2);
  return function () {
    var innerArgs = Array.prototype.slice.call(arguments);
    var finalArgs = args.concat(innerArgs);
    return fn.apply(context, finalArgs);
  }
}
```

### 11. 变量：作用域、环境和闭包

> 全局执行环境是最外围的一个执行环境，每个函数都有自己的执行环境，eval也会创建一个独立的执行环境。

#### 11.1. 作用域

JavaScript的变量是函数级作用域的，**只有函数可以产生新的作用域**。

JavaScript会提前所有的变量声明，它会把所有的声明移到直接作用域的最前面。

#### 11.2. IIFE

* 它是立即执行的；
* 它必须是一个表达式；
* 连续的两个IIFE之间需要分号，不然会导致解析错误。

IIFE也可以前缀运算符，比如!, void都是可以的，避免了分号的问题。

```javascript
var File = function () { // open IIFE
	// do something...
}(); // close IIFE
```

#### 11.3. 全局对象

全局对象是有原型的。

#### 11.4. 环境

无论一个函数被调用多少次，它总要访问它自己（最新）的本地变量和外部作用域的变量。当多次调用自己的时候，每次调用都会创建一个新的环境。

通过闭包可以使得函数可以维持其创建时所在的作用域。但如果创建时受到了当前作用域变量的影响，会存在环境公用的影响。

#### 11.5. 垃圾收集

两种垃圾收集机制，__标记清除__，__引用计数__，两种都有使用，标记清除更为常用，引用计数一般用于COM对象。

#### 11.6. 闭包

> __闭包__ 是指有权访问另一个函数作用域中的变量的函数。

创建闭包的常见方式，就是在一个函数内部创建另一个函数。

闭包只能取得包含函数中任何变量的最后一个值。

#### 11.7. 闭包中的this

在闭包中使用this对象会导致一些问题，因为this对象是在运行时基于函数的执行环境绑定的。

> 如果闭包的作用域链中保存着一个HTML元素，那么就意味着该元素将无法被销毁。

### 12. 对象与继承

JavaScript中的面向对象编程（OOP）分为以下几层：

* 第一层，单一对象的面向对象；
* 第二层，对象间的原型链；
* 第三层，作为实例工厂的构造函数，类似于其他语言的类；
* 第四层，子类，通过继承已有的构造函数，创建新的构造函数。

#### 12.1. 第一层，单一对象的面向对象

##### 12.1.1 属性

属性分为三种：

1. 属性
2. 访问器
3. 内置属性（规范将内置属性的键置于方括号中，例如`[[Prototype]]`）

delete只影响一个对象的直接“自有”的，非继承的属性，delete成功则返回true，如果是自有属性但不能删除则返回false。

##### 12.1.2 对象字面量

```javascript
var jane = {
  name: 'jane',
  describe: function () {
    return 'Person named ' + this.name;
  }
}
```

#### 12.2. 第二层，对象间的关系——原型链

```javascript
var proto = {
  describe: function () {
    return 'name: ' + this.name;
  }
};
var obj = {
  [[Prototype]]: proto, // 实际不可访问
  name: 'obj'
}
```

对象obj从proto继承了describe属性。

当通过obj访问属性时，JS首先从本对象中查找，接着是它的原型，以及它原型的原型。

在ES5后，我们可以通过`Object.create(proto, propDescObj?)`完成使用给定prototype创建新对象。

检测时，可以使用：

```javascript
Object.prototype.isPrototypeOf(obj); // 会检索整个链上
```

#### 12.2.1 特殊属性__proto__

某些JavaScript引擎有特殊属性可以获取和设置对象的原型：`__proto__`。这样可以直接访问`[[Prototype]]`。其在ES6内将会作为标准。

方法区分：

* `Object.getOwnPropertyNames(obj)` 返回obj的所有 **自有** 的属性键。
* `Object.keys(obj)` 返回obj的所有 **可枚举** 的属性键。

#### 12.3 访问器

```javascript
var obj = {
  get foo() { // 取值调用，getter
    return 'getter';
  },
  set foo(value) { // 赋值调用，setter
    console.log('setter: '+value);
  }
}
```

#### 12.4 属性特性和属性描述符

* Value
* Writable
* Get
* Set
* Enumerable
* Configurable

#### 12.5 复制对象

复制要保证：

1. 拷贝必须具有与原对象相同的原型；
2. 拷贝必须具有与原对象相同的属性和特性；

```javascript
function copyObject(orig) {
  // copy prototype
  var copy = Object.create(Object.getPrototypeOf(orig));
  // copy all properties
  copyOwnPropertiesFrom(copy, orig);
  return copy;
}

function copyOwnPropertiesFrom(target, source) {
  Object.getOwnPropertyNames(source).forEach(function (propKey) {
    var desc = Object.getOwnProperyDescriptor(source, propKey);
    Object.defineProperty(target, propKey, desc);  // 使用获取的属性描述符创建target的自有属性
  });
  return target;
}
```

#### 12.6 第三层，作为实例工厂的构造函数，类似于其他语言的类

Speaking JavaScript内推荐的构造函数写法：

> ```javascript
> function Person(name) {
>   this.name = name;
> }
> Person.prototype.describe = function () {
>   return 'Person named ' + this.name;
> };
> ```

经典面试内容：
Q：new操作符都做了什么？
A：

1. 创建一个新对象；
2. 将构造函数的作用域赋给新对象（因此this就指向了这个新对象）；
3. 执行构造函数中的代码（为这个新对象添加属性）；
4. 返回新对象。

> 引用类型与基本包装类型（“装箱”）的主要区别就是对象的生存期，使用new操作符创建的引用类型的实例，在执行流离开当前作用域之前都一直保存在内存中。而自动创建的基本包装类型的对象，则只存在于一行代码的执行瞬间，然后立即被销毁。

Speaking JavaScript内对这个过程的描述：

> 首先设置行为：创建一个新对象，其原型为Person.prototype;
> 然后设置数据：Person接受对象作为隐式参数this，并添加实例属性。

代码模拟如下:

```javascript
function newOperator(Constr,args) {
  var thisValue = Object.create(Constr.prototype);
  var result = Constr.apply(thisValue, args);
  if(typeof result === 'object' && result !== null) {
  	return result;
  }
  return thisValue;
}
```

每个函数包含一个实例原型对象，它的constructor属性指回函数。

### 12.7 泛型方法：借用原型方法

```javascript
Wine.prototyte.incAge.call(john, 3) // 类似于这样的模式
```

对于泛型方法，最常用的是处理一些“Array like”的元素，借用数组方法进行处理。

通过 `Array.isArray` 也可以作为数组的判断，能够区分Array-like。