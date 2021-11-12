---
tags:
- JavaScript
- 事件循环
- Event Loop
- Event
categories: Frontend
title: Task, Job 与 EventLoop
date: 2019-08-20T16:01:00.000+00:00
excerpt: 经久不衰的话题，我找到了一篇非常有趣的解释文章，详细说明了其中的区别，争取一文讲通JavaScript的循环机制！
thumbnail: ''

---
#### 在解释事件循环前……

```javascript
function foo(b) {
  var a = 10;
  return a + b + 11;
}

function bar(x) {
  var y = 3;
  return foo(x * y);
}

console.log(bar(7)); // 返回 42
```

这段代码存在这样的过程：

1. console.log调用bar -> 创建了第一个帧

2. bar调用foo -> 创建了第二个帧，并被压倒第一个帧上

3. foo完成并返回 -> 最上层帧弹出栈

4. bar完成并返回 -> 出栈，栈空

#### javascript在什么时候会用到队列呢？

一个 JavaScript 运行时包含了一个 **待处理的消息队列** 。每一个消息都关联着一个用以处理这个消息的函数。

在事件循环期间的某个时刻，运行时从 **最先进入队列的消息开始处理队列中的消息** 。为此，这个消息会被移出队列，并作为输入参数调用与之关联的函数。正如前面所提到的，调用一个函数总是会为其创造一个新的栈帧。

函数的处理会一直进行到执行栈再次为空为止；然后事件循环将会处理队列中的下一个消息（如果还有的话）。

#### 回到正题

根据 [HTML Standard](https://html.spec.whatwg.org/multipage/webappapis.html#event-loops). 这里的宏任务（旧称macrotask）现统称为task，其定义为：

> a task is a struct which has:
> \- **Steps**
> A series of steps specifying the work to be done by the task.
> \- **A source**
> One of the task sources, used to group and serialize related tasks.
> \- **A document**
> A Document associated with the task, or null for tasks that are not in a window event loop.
> \- **A script evaluation environment settings object set**
> A set of environment settings objects used for tracking script evaluation during the task.
> A task is runnable if its document is either null or fully active.

翻译过来就是一个具有指定步骤、具有一个源、上下文或者null（此时使用window event loop）、一系列追踪脚本运行的对象的结构。

而微任务依然是microtask，其定义为：

> A microtask is a colloquial way of referring to a task that was created via the queue a microtask algorithm. 译：微任务是指通过队列微任务算法创建的任务的口语方式。

#### 举个例子

这里感谢Jiasm的例子[微任务、宏任务与Event-Loop](https://juejin.im/post/5b73d7a6518825610072b42b),
对于一段JS代码而言，在JS的执行阶段是要逐步执行的，那么执行到一些需要等时的方法时，我就不可能去等待这些方法到来，等到你到来的时候我们再排队；
那么对于一个方法（macrotask）而言，其内部可能存在多个额外的“业务”：

```javascript
setTimeout(_ => console.log(4))

new Promise(resolve => {
  resolve()
  console.log(1)
}).then(_ => {
  console.log(3)
})

console.log(2)
// finally log 1,2,3,4
```

这里需要注意，setTimeout是宏任务，而Promise.then是一个标准的微任务，**在同步代码执行完成后才回去检查是否有异步任务完成，并执行对应的回调，而微任务又会在宏任务之前执行。**

> [Promise A+规范](https://promisesaplus.com/#notes)里特别标注，这里Promise要取决于平台和引擎自身：This can be implemented with either a “macro-task” mechanism such as setTimeout or setImmediate, or with a “micro-task” mechanism such as MutationObserver or process.nextTick. Since the promise implementation is considered platform code, it may itself contain a task-scheduling queue or “trampoline” in which the handlers are called.

目前比较流行的实现标准里，宏任务有：

|  | Browser | Node.js |
| --- | --- | --- |
| I/O | Yes | Yes |
| setTimeout/setInterval | Yes | Yes |
| setImmediate | No | Yes |
| requestAnimationFrame | Yes | No |

常见的微任务有：`process.nextTick`,`MutationObserver`,`Promise.then/catch/finally`

#### 回到EventLoop-事件循环

有一个非常好的动画来解释为什么是这样的执行顺序 [Who's right?](https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/#level-1-bossfight)