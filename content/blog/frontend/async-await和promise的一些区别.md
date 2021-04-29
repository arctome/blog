---
tags:
- JavaScript
categories: Frontend
title: Async/await和Promise的一些区别
date: 2019-08-20T00:00:00.000+08:00
excerpt: Promise相对更为常用，async是generate/co带来的语法糖，在Node.js环境里应用场景更加广泛，书写也更为顺手。
thumbnail: ''

---
#### 先说说Promise

Promise 对象用于表示一个异步操作的最终状态（完成或失败），以及该异步操作的结果值。

一个 Promise有以下几种状态:
* pending: 初始状态，既不是成功，也不是失败状态。
* fulfilled: 意味着操作成功完成。（与rejected统称为settled状态）
* rejected: 意味着操作失败。

>  Javascript中的promise代表一种 __已经发生__ 的状态， 而且可以通过回调方法链在一起。 如果你想要的是表达式的延时计算，考虑无参数的"箭头方法":  `f = () =>表达式` 创建惰性求值的表达式，使用 `f()` 求值。

Promise常用的方法有：
- __all__: 这个方法返回一个新的promise对象，该promise对象在iterable参数对象里所有的promise对象都成功的时候才会触发成功，一旦有任何一个iterable里面的promise对象失败则立即触发该promise对象的失败。
- __race__: 当iterable参数里的任意一个子promise被成功或失败后，父promise马上也会用子promise的成功返回值或失败详情作为参数调用父promise绑定的相应句柄，并返回该promise对象。
- __reject__: 返回一个状态为失败的Promise对象，并将给定的失败信息传递给对应的处理方法.
- __resolve__: 返回一个状态由给定value决定的Promise对象。如果该值是thenable(即，带有then方法的对象)，返回的Promise对象的最终状态由then方法执行决定；否则的话(该value为空，基本类型或者不带then方法的对象),返回的Promise对象状态为fulfilled，并且将该value传递给对应的then方法。

__注意：Promise直接执行的是宏任务，只有.then和.catch是微任务!__

#### 再说Async/await
`async function` 用来定义一个 __返回 AsyncFunction 对象__ 的异步函数。异步函数是指通过事件循环异步执行的函数，它会 __通过一个隐式的 Promise 返回其结果__ (如果不是通过await返回，那么返回的是一个Promise，返回值为resolve的值）。如果你在代码中使用了异步函数，就会发现它的语法和结构会更像是标准的同步函数。

异步函数可以包含await指令，该指令会暂停异步函数的执行，并等待Promise执行，然后继续执行异步函数，并返回结果。

记住，await 关键字只在异步函数内有效。如果你在异步函数外使用它，会抛出语法错误。

注意，当异步函数暂停时，它调用的函数会继续执行(收到异步函数返回的隐式Promise)

async/await的目的是简化使用多个 promise 时的同步行为，并对一组 Promises执行某些操作。正如Promises类似于结构化回调，async/await更像结合了generators和 promises。

使用async时要注意，如果同时操作多个异步方法，要注意调用的写法：
```javascript
var sequentialStart = async function() {
  console.log('==SEQUENTIAL START==');

  // 1. Execution gets here almost instantly
  const slow = await resolveAfter2Seconds();
  console.log(slow); // 2. this runs 2 seconds after 1.

  const fast = await resolveAfter1Second();
  console.log(fast); // 3. this runs 3 seconds after 1.
}

var concurrentStart = async function() {
  console.log('==CONCURRENT START with await==');
  const slow = resolveAfter2Seconds(); // starts timer immediately
  const fast = resolveAfter1Second(); // starts timer immediately

  // 1. Execution gets here almost instantly
  console.log(await slow); // 2. this runs 2 seconds after 1.
  console.log(await fast); // 3. this runs 2 seconds after 1., immediately after 2., since fast is already resolved
}

var parallel = async function() {
  console.log('==PARALLEL with await Promise.all==');
  
  // Start 2 "jobs" in parallel and wait for both of them to complete
  await Promise.all([
      (async()=>console.log(await resolveAfter2Seconds()))(),
      (async()=>console.log(await resolveAfter1Second()))()
  ]);
}
```
#### 那么async/await相比于Promise的区别（优势）？
- 代码读起来更加同步，Promise虽然摆脱了回调地狱，但是then的链式调用也会带来额外的阅读负担
- Promise传递中间值非常麻烦，而async/await几乎是同步的写法，非常优雅
- 错误处理友好，async/await可以用成熟的try/catch，Promise的错误捕获非常冗余
- 调试友好，Promise的调试很差，由于没有代码块，你不能在一个返回表达式的箭头函数中设置断点，如果你在一个.then代码块中使用调试器的步进(step-over)功能，调试器并不会进入后续的.then代码块，因为调试器只能跟踪同步代码的『每一步』。