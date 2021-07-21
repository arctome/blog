---
tags:
- JavaScript
categories: Frontend
title: JavaScript的原型链与继承
date: 2019-08-21T16:04:00.000+00:00
excerpt: 也是经典面试题与概念，简单介绍一下其中的区别与链条关系，后续可以深入再增加一篇文章。
thumbnail: ''

---
> 感谢[JS原型链与继承别再被问倒了 - 路易斯@juejin](https://juejin.im/post/58f94c9bb123db411953691b)

#### JavaScript的继承

继承是OO语言中的一个最为人津津乐道的概念.许多OO语言都支持两种继承方式: 接口继承 和 实现继承 .接口继承只继承方法签名,而实现继承则继承实际的方法.由于js中方法没有签名,在ECMAScript中无法实现接口继承.ECMAScript只支持实现继承,而且其 实现继承 主要是依靠原型链来实现的.

#### 构造函数、原型和实例

> 每个构造函数(constructor)都有一个原型对象(prototype),原型对象都包含一个指向构造函数的指针,而实例(instance)都包含一个指向原型对象的内部指针.

> 如果试图引用对象(实例instance)的某个属性,会首先在对象内部寻找该属性,直至找不到,然后才在该对象的原型(instance.prototype)里去找这个属性.

所以我们有`constructor1.prototype = instance2`

如果试图引用constructor1构造的实例instance1的某个属性p1:
1).首先会在instance1内部属性中找一遍;
2).接着会在instance1.**proto**(constructor1.prototype)中找一遍,而constructor1.prototype 实际上是instance2, 也就是说在instance2中寻找该属性p1;
3).如果instance2中还是没有,此时程序不会灰心,它会继续在instance2.**proto**(constructor2.prototype)中寻找...直至Object的原型对象

![原型链与原型对象](https://x.arcto.xyz/6gnP2V/prototype-chain.jpg)