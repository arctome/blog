---
categories: Frontend
tags:
- JavaScript
date: 2020-03-20T07:07:15.000+00:00
title: 从零到一实现一个JS版深克隆
excerpt: "> 这一类的面试题其实并不是很难，但如果不自己亲自实现一遍，很难照顾到各种情况，本文从模仿lodash库内的cloneDeep函数来循序渐进地实现一个深克隆。"
thumbnail: ''

---

## 深克隆是用来做什么的？

JavaScript内，所有的Object都是引用类型，它们对应的变量只保存了一个指向实际内存的指针，如果我们只是将目标对象赋值给新对象，那么我们实际复制的还是指针，如果我们修改了原始内存内保存的对象，就会导致所有相关的变量都会被改变。因此，深克隆的目的就是为了生成一个全新的对象，并存储在独立的内存位置内。

## 先实现一个简单的复制

假设我们有以下一段已有的代码：

```javascript
// 测试循环应用
var _objType = {
  name: "This is another object."
};
// _objType.objectType = _objType;

// 复制的原始对象
var origin = {
  stringType : "This is string.",
  numberType : 123,
  booleanType : false,
  objectType : _objType,
  functionType : function() {
    return document.navigator.userAgent;
  },
  inheritType: inheritObj
}

var clonedObj = cloneDeep(origin);
origin.numberType = 456; // 修改原始对象的属性

console.log(clonedObj);
```

那么我们的基础复制方法baseClone应该如下：

```javascript
function cloneDeep(target) {
  return baseClone(target);
}

function baseClone(target) {
  var newObj = {};
  for (var key in target) {
    // 循环一个指定的变量来循环一个对象所有可枚举的属性
    newObj[key] = target[key];
  }
  return newObj;
}
```

我们注释了一个循环引用的情况下，对应的属性得到了复制，并且在修改原始对象时，新对象没有被修改。

## 递归实现简单深复制

通过判断每次读取的key是否是对象，我们可以得到一个递归实现的简单深拷贝：

```javascript
function baseClone(target) {
  var newObj = {};
  for (var key in target) {
    // 循环一个指定的变量来循环一个对象所有可枚举的属性
      if(typeof target[key] === 'object' && target[key] !== null) {
        newObj[key] = baseClone(target[key]);
      } else {
        newObj[key] = target[key];
      }
  }
  return newObj;
}
```

但是这里就会出现一个非常致命的bug， **我们的测试用例内有一个循环引用，如果只这样遍历会导致无限递归** ，我们需要进行处理。

## 保证只循环复制自身的属性

修改我们的baseClone，检测对应的key是否是自身属性：

```javascript
function baseClone(target) {
  var newObj = {};
  for (var key in target) {
    // 循环一个指定的变量来循环一个对象所有可枚举的属性
    if(Object.prototype.hasOwnProperty.call(target, key)) { // 使用泛型方法，避免target内存在自定义的hasOwnProperty方法导致判断出现错误
      if(typeof target[key] === 'object' && target[key] !== null) {
        newObj[key] = baseClone(target[key]);
      } else {
        newObj[key] = target[key];
      }
  	}
  }
  return newObj;
}
```

## 处理循环引用(Circular Structure)

> 循环引用是指，对象A中有一个指针指向对象B，B内又有一个指针指向对象A，导致两个指针都不能得到正确的释放。

我们使用一个数组去存储拷贝过的对象，避免循环引用导致递归进入死循环无法退出的问题：

```javascript
function baseClone(target, stack) {
  var newObj = {};
  if(!stack) stack = [];
  // 检测target是否已经存在于stack内
  if(target.indexOf(stack) > -1) {
    return target
  } else {
    stack.push(target)
  }
  for (var key in target) {
    // 循环一个指定的变量来循环一个对象所有可枚举的属性
      if(typeof target[key] === 'object' && target[key] !== null) {
        newObj[key] = baseClone(target[key], stack);
      } else {
        newObj[key] = target[key];
      }
  }
  return newObj;
}
```

## 如果涉及到继承

我们修改上面的例子，给出一个简单的继承：

```javascript
// 测试继承部分的情况
function OriginParent(name) {
  this._stringType = name;
  this.numberType = 999;
};
var inheritObj = new OriginParent("origin string");
var clonedInherit = cloneDeep(inheritObj);
inheritObj.numberType = 888;

console.log(clonedInherit.constructor);
```

当我们打印复制的对象的构造函数时，我们发现它输出的是Object而非OriginParent，也就是说我们在复制的过程中，遗失了它本身的构造函数。

因此在循环时我们需要使用一个变量临时存储，并在之后修复它，改进的代码如下：

```javascript
// 利用new操作符的特性完成修复
function inheritClone(target) {
  var ctor = target.constructor;
  var newObj = new ctor;
  return newObj;
}
```

> 这里处理的情况其实是函数，但实际上lodash库对于函数直接进行了返回，换而言之，他们使用同一个内存地址是符合我们对于深拷贝的定义的。

## 处理更多的类型

### 数组

首先通过展开运算符(`...`)是可以快速实现的，会对简单的一维数组（且内部均为基本类型的值）的数组进行拷贝，如果涉及到引用类型（包括多维数组），还需要进行递归处理直到目标是一个基础类型为止。

除了展开运算，我们也可以使用几个数组的原生方法返回全新的数组，比如`Array.map`或者`Array.concat(); // 拼接为空时是指返回新的原来数组`

修改上面的代码，使之支持数组：

```javascript
function baseClone(target, stack) {
  var newObj = Array.isArray(target) : [] : {};
  if(!stack) stack = [];
  // 检测target是否已经存在于stack内
  if(target.indexOf(stack) > -1) {
    return target
  } else {
    stack.push(target)
  }
  for (var key in target) {
    // 循环一个指定的变量来循环一个对象所有可枚举的属性
      if(typeof target[key] === 'object' && target[key] !== null) {
        newObj[key] = baseClone(target[key], stack);
      } else {
        newObj[key] = target[key];
      }
  }
  return newObj;
}
```

### 其他引用类型

首先要进行判断，因为是引用类型，建议通过`toString`来进行判断，下面给出一个简单的对应：

```javascript
const mapTag = '[object Map]';
const setTag = '[object Set]';
const arrayTag = '[object Array]';
const objectTag = '[object Object]';

const boolTag = '[object Boolean]';
const dateTag = '[object Date]';
const errorTag = '[object Error]';
const numberTag = '[object Number]';
const regexpTag = '[object RegExp]';
const stringTag = '[object String]';
const symbolTag = '[object Symbol]';
```

对于以上的类型，除了数组和对象，其他都不能再进行递归拷贝，因此可以对应使用构造器直接构造新的引用值来进行拷贝。

## 延展话题：Map与WeakMap

这个话题之后会另起一篇单独讨论，他们在这一类复制的情况可以有较好的运用。