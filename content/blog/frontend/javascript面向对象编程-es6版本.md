---
categories: Frontend
tags:
- JavaScript
- 面向对象
- OOP
date: 2020-03-16T01:46:02.000+08:00
title: JavaScript面向对象编程(ES6版本)
excerpt: 虽然目前忙的任务，对JS的OOP一点好感也没有，但还是得对OOP加深印象，毕竟也是一种经典的范式（所以说，用的好是经典，用的不好是神经，当年C++写OOP就满糟糕的……）
thumbnail: ''

---
> 写在最前面，为什么已经入行一年半才写这样一篇文章呢？其实并不是自己平时开发没有使用，但是很多时候自己的代码会有些“四不像”，各种风格糅杂在一起，因此写这么一篇文章，从编程范式的角度规范自己的代码。

### 面向对象的特性

面向对象就要提到以下的“名词”，那么JavaScript应该如何实现这些呢？

- 类与对象
- 封装性
- 继承
- 多态
- 抽象性

### 类与对象

> 基于原型的编程不是面向对象编程中体现的风格，且行为重用（在基于类的语言中也称为继承）是通过装饰它作为原型的现有对象的过程实现的。这种模式也被称为弱类化，原型化，或基于实例的编程。

而在JavaScript中，实现的方式就是通过函数内置的Prototype属性完成这种 __原型继承__ 。

#### 对象

JavaScript内的对象，其实就是Object，那么Object有两种方法可以用来创建：

```javascript
var Person = {}; // 字面量
var Person = new Object(); // 使用new运算符
```

那么他们有什么区别呢？首先要说的就是new，new做了哪些呢？这里引用MDN的解释：

> 1. 创建一个空的简单JavaScript对象（即{}）；
> 2. 链接该对象（即设置该对象的构造函数）到另一个对象 ；
> 3. 将步骤1新创建的对象作为this的上下文 ；
> 4. 如果该函数没有返回对象，则返回this。

不难发现，new的第一步其实和字面量方式完全一致，所以，new运算符的链接与设定this其实是最核心的不同点。

我们一般不常用`new Object()`，而直接用字面量方式的原因，其实是因为他们的prototype都指向了null。

正是因为这样，我们在日常的使用中，如果希望通过OOP实现逻辑，应该通过new的方式来进行，因为他可以继承我们期望的对象。

##### 代码风格

JavaScript有很多的引用类型数据，因此在面向对象时，要注意分离自有的部分与暴露的方法。

```javascript
function Person (name){
	this.name = name;
}
Person.prototype.sayIntro = function() {
	return 'Hello, my name is ' + name + '.'
}
var person1 = new Person('peter'); // Person是一个构造器。
person1.sayIntro(); // 为什么可以调用prototype上的方法呢？参见“原型链”
```

##### `Object.create()`

> Object.create()方法创建一个新对象，使用现有的对象来提供新创建的对象的__proto__。

Object.create()是ES2015规范内的新方法，同时在ES5.1进行了加强，它可以polyfill使得我们可以在生产中尽可能使用来让我们的代码更为清晰。

其内部核心的实现其实在JS高程有对应的代码：

```javascript
// 在自己的实现里要注意当前环境是否支持create，以及目标是否可以作为create的对象。
Object.create = function (proto, propertiesObject) {
  function F() {}
  F.prototype = proto;
  return new F();
};
```

那么如果使用`Object.create`应该如何实现继承呢？下面是MDN的一个例子：

```javascript
// Shape - 父类(superclass)
function Shape() {
  this.x = 0;
  this.y = 0;
}

// 父类的方法
Shape.prototype.move = function(x, y) {
  this.x += x;
  this.y += y;
  console.info('Shape moved.');
};

// Rectangle - 子类(subclass)
function Rectangle() {
  Shape.call(this); // call super constructor.
}

// 子类续承父类
Rectangle.prototype = Object.create(Shape.prototype); // create的目标是父类的prototype，注意，JS的继承是原型继承。
Rectangle.prototype.constructor = Rectangle; // 修复constructor指向
```

上面是一个单继承的例子，如果我们希望做多继承，其实只需要修改Rectangle.prototype，让其的赋值为其多继承的对象的prototype的合并(Object.assign)。需要注意需要在子类内部显式绑定this。

#### 类

ES6最大的变化就是对Class的支持，虽然JS只能通过原型继承，但是Class的出现使得JS的OOP“看起来更像那么回事了”。

为什么说看起来呢？目前还没有实现私有与公有特性，它只是原来构造模式的一个语法糖，但是，它也有它的不同之处。

- Class内部只是原型的实现，在实际使用时还是需要通过new运算符执行构造函数；
- 类声明不能被提升；
- 类声明中的代码自动运行在严格模式下；
- __类中的所有方法都是不可枚举的__ ；
- 每个类都有一个`[[construct]]`的方法，constructor方法默认返回实例对象（即this）；

##### 派生类

```javascript
class HelloWorld extends React.Component {}
```

上面这种写法在React的开发中非常常见，extends是一个派生类， __在派生类中，如果使用了构造方法，就必须使用super()__ ，在构造函数中访问this之前要调用super()， __负责初始化this__ 。

```javascript
class Shape {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class Rectangle extends Shape {
  constructor() {
    super();  // 这里的super可以作为函数，也可以作为特殊的对象（无法直接输出，但是可以设置属性）。
  }
}
```

### 继承

见上面对“类与对象”内继承的实现，核心在于prototype __原型继承模式__ 。

### 抽象

> 抽象是允许模拟工作问题中通用部分的一种机制。这可以通过继承（具体化）或组合来实现。
> JavaScript通过继承实现具体化，通过让类的实例是其他对象的属性值来实现组合。

> JavaScript Function 类继承自Object类（这是典型的具体化） 。Function.prototype的属性是一个Object实例（这是典型的组合）。

### 多态

其实多态并没有太多好说的，核心在于“原型链”：如果你在子类声明了同名的属性和方法，那么就不会在原型链上向上查找。