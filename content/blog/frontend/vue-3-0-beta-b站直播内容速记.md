---
categories: Frontend
tags:
- Vue.js
- Vue 3.0
date: 2020-04-21T22:27:05.000+08:00
title: '"Vue 3.0 Beta"B站直播内容速记'
excerpt: 通过B站直播，整体的重新了解了Vue3的概况，虽然一年内可能不会常用，但还是尽量了解尤大的开发思想，便于后续快速升级。
thumbnail: ''

---
## 直播内容

> 直播使用的PPT[Google文档地址, 需要科学上网](https://docs.google.com/presentation/d/1LHp-8hEtXEMSE1fd6YLAhYmtndQelQKbWlGggZKe4y8/edit#slide=id.g31e95ee831_0_92)

- 3.0 Beta特性介绍
	- 性能表现
    - “摇树”支持
    - Composition API
    - Fragment, Teleport, Suspense
    - 更好的TypeScript支持
    - 自定义Render
- 何时才能使用Vue 3.0（生态进度）
    
## 性能表现

### 重写V-dom实现

> 本节内容结合 [_vue-next-template-explorer.netlify.app_](https://vue-next-template-explorer.netlify.app/) 食用更佳。

2.0版本的的v-dom实现参考了[snabbdom](https://github.com/snabbdom/snabbdom)，加入了一部分Vue相关的特性属性如Static标记等。3.0大幅度修改了其实现，并对标记等进行了优化。

### Compiler-informed fast paths（个人理解：更快的编译/render路径）

> 本节内容结合 [_vue-next-template-explorer.netlify.app_](https://vue-next-template-explorer.netlify.app/) 食用更佳。

这一部分主要体现在最终的render函数上，利用上述工具，我们发现静态节点标记以及属性（绑定）被归为不同的部分，其中静态节点甚至可以通过开启提升来进行复用，未绑定的属性与进行了绑定的也可以直接标记出来，减少了对比与diff压力，从而得到更快的速度。

### 更高效的组件初始化

### 更新性能提高1.3～2倍

> 参考（下同）：based on benchmarks that simulates typical scenarios, may vary based on actual application.

### 2～3倍更快的SSR（服务端渲染）

SSR下，可以将静态节点作为Buffer的一部分直接推入最终的请求返回中，从而获得更快的速度。

## “摇树”Tree-shaking

> 本节内容结合 [_vue-next-template-explorer.netlify.app_](https://vue-next-template-explorer.netlify.app/) 食用更佳。

### 大部分可选特性目前可被“摇树”

在“next-template-explorer”中，如果你使用了例如v-on或者v-model等选项，可以在右侧清楚的发现对应选项通过摇树的方式单独打包进入最终的代码，相比于2.x版本需要包含完整runtime而言是非常大的优化。

### 最基本的HelloWorld示例打包大小约为13.5kb

> 如果选择只包含Composition API支持的模式，打包体积可以减小至11.75kb。

### 包含所有Runtime的打包体积约为22.5kb

## Fragment, Teleport, Suspense

### Fragment

碎片的概念有些类似于[React的Fragment概念](https://zh-hans.reactjs.org/docs/fragments.html)，Vue 3版本支持更多的使用方式，比如可以只有字符串，或者利用数组构成一段Fragment。

### Teleport(有译为：占位传递组件）

Teleport与[React的Portals概念](https://zh-hans.reactjs.org/docs/portals.html)类似。

> Portal 提供了一种将子节点渲染到存在于父组件以外的 DOM 节点的优秀的方案。

> 尤大在直播中提到，为何没有直接使用Portal来命名还有另外一个原因：Chrome的iframe“替代方案”——[Portal](https://www.chromestatus.com/feature/4828882419056640)

Teleport功能可以用来将部分组件代码传递到DOM树的其他位置，可以在很多场景下使用，比如窗口resize等，简单说明：

```javascript
<!-- In some nested Vue component -->
<NestedComponent>
  <v-fragment target="#popup-target">
    <PopUp />
  </v-fragment>
</NestedComponent>
<!-- before closing body tag -->
<div id="popup-target"></div>
```

### Suspense

同样的，其对应了[React的Suspense概念](https://zh-hans.reactjs.org/docs/concurrent-mode-suspense.html)，要注意的是，__当前Suspense特性在React中同样也是试验性功能，暂时不适合投入生产环境__ 。

React社区中有一些第三方库对其进行了实现，比如zeit.co推出的[swr库](https://github.com/zeit/swr)，主要是用于作为等待与实现异步，Suspense部分会进行等待，直到异步任务完成继续，非常适合用来实现loading态。

## 何时才能使用Vue 3.0（生态进度）

> 建议随时参考官方的[Vue-next仓库](https://github.com/vuejs/vue-next)，了解生态各部分的开发进展。

目前Vue 3.0已经进入了Beta版本，预计年中会推出可以投入生产的版本。

- Vue Router：已知会 __有部分API改动__ ，目前alpha阶段；
- Vuex：目前已知没有API改动，同样处于alpha阶段；
- Vetur：其作者预计在五月份会进行跟进开发工作；
- Nuxt：目前已经实现了demo版本，正在跟进中；
- vue-cli：目前实验性支持；

需要注意的是，Vue 3.0 __beta目前不支持IE11__，在未来会推出针对IE11的专用build，如果需要兼容则需要开启对应的开关，会在最终打包时加入部分的fallback策略。

## 2.x版本的未来

2.x版本会在3.0稳定后推出一个Minor版本，之后会进入为期18个月的LTS，LTS过后只进行安全修复不会做版本更新。这个版本会包括部分2.x版本可兼容的3.0新特性。