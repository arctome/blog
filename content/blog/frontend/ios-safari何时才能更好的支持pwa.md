---
categories: Frontend
tags:
- PWA
- Safari
- iOS
date: 2020-04-14T16:07:03.000+08:00
title: iOS Safari何时才能更好的支持PWA？
excerpt: 这篇文章写的其实满气愤的，PWA其实是非常棒的特性，但是在iOS上表现如此之差也难堪重任。
thumbnail: ''

---
### 写在前面

最近由于疫情的原因，找工作是越来越难了，自己的工作时间也很尴尬，三年不足，一年有余，反思自己，觉得应该在现在的时间多学些东西，同时督促自己提高效率，就想到了“番茄工作法”，想找一个App来配合使用，看到了一个叫"FocusList"的工具，很简洁，支持macOS + iOS，但是价格让我望而却步，简单的功能也需要近15元，还不包括macOS，而且作者上一次版本更新还是在一年前，现在的macOS三天一小更新，五天一大更新，付费最担心的莫过于后面的系统支持不好。正好最近想练下React Hooks，决定自己仿照App实现一个番茄计时，加入PWA和Web提醒功能，噩梦就这么来了。

### MDN的官方写法

在MDN的[通过通知推送让 PWA 可重用“”](https://developer.mozilla.org/zh-CN/docs/Web/Progressive_web_apps/Re-engageable_Notifications_Push)一文中，给出了规范的写法，这里提到Notification的requestPermission是一个Promise对象，因此，可以用如下写法提示用户打开推送许可：

```javascript
Notification.requestPermission().then(function(result) {
    if(result === 'granted') {
        randomNotification();
    }
});
```

OK，这种写法很简洁，也非常容易在业务里实现，部署到HTTPS的域名下试试效果，Chrome（macOS）下完美。

再用Safari（macOS）打开，错误，emmm，看到报错：`undefined is not an object (evaluating 'Notification.requestPermission().then')`，了解，应该是Safari需要兼容，也许是实现不同，通过查阅文档果然，Safari是通过Callback实现的，也就是说，这段代码应该改为：

```javascript
try {
    Notification.requestPermission()
        .then(() => doSomething())
} catch (error) {
    // Safari doesn't return a promise for requestPermissions and it                                     
    // throws a TypeError. It takes a callback as the first argument                                     
    // instead.
    if (error instanceof TypeError) {
       Notification.requestPermission(() => {
           doSomething();
       });
    } else {
       throw error;
    }
}      
```

通过这种改造，ok，macOS上的Safari能够正常请求允许并发送通知了，很不错。

### iOS与macOS —— 区别对待

本以为到这里已经结束了，但万万没想到的是，iOS对PWA的支持是 __有限的__ , 在iOS上，压根就没有Notification这个对象，也就是说，如果想兼容iOS设备，就要先做一个判断：

```javascript
if(typeof Notification === 'undefined') return; // Without Notification, code below will throw error.
try {
    Notification.requestPermission()
        .then(() => doSomething())
} catch (error) {
    // Safari doesn't return a promise for requestPermissions and it                                     
    // throws a TypeError. It takes a callback as the first argument                                     
    // instead.
    if (error instanceof TypeError) {
       Notification.requestPermission(() => {
           doSomething();
       });
    } else {
       throw error;
    }
}      
```

踩过坑，就要知道iOS究竟实现了PWA的哪些部分，查阅资料，总结下来 __至今仍未支持的功能__ 有：

- 创建应用程序加载屏幕
- 使用推送通知
- 添加离线支持（iOS会在指定时间清除AppCache，因此，离线支持不是永久可用的。）
- 创建一个初始的应用程序UI来实现即时加载
- 通过浏览器引导对话框，提示安装到主屏幕

所以，到这里我终于明白为什么iOS市场会有一些功能很简单但是需要付费的软件了，生态闭环，封闭了一些功能，使得开发者 __不得不__ 采用不同的方式来实现。

这也是PWA迄今为止仍无法大范围普及的原因，功能缺失，是不能作为App的 __替代__ 来完成使用的。

而小程序，能够通过宿主平台的能力（推送、缓存、以及账户共享等等），完成PWA很早就期望的一些能力，因此，小程序是目前相对“Lite”的应用形式。

> 另外一种推送方式是FCM，即Firebase Cloud Messaging，它需要一个完全唯一的用户设备ASN，但是通过Web的方式，我们不能够获得这种ASN，因此这一条路也是不通的。

### Apple，何时才能做出改变？

谷歌相关问题，就能够发现很多相关的提问。距离iOS开始支持standalone模式的PWA已经过去了一年多的时间（从iOS12.2发布算起，发布的时间是2019年3月25日），其实我想对于Apple而言，技术不是问题，核心问题是PWA可能会给AppStore带来或多或少的影响，这从根本影响了Apple支持PWA的愿望。