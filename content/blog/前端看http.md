---
tags:
- 前端
- HTTP
categories: Frontend
title: 前端看HTTP
date: 2019-08-18T16:00:00.000+00:00
excerpt: HTTP是每一个前端应该知道的基础知识，本文综合了几个来源，总结了一些常用的知识点。
thumbnail: ''

---
#### HTTP是什么

HTTP (超文本传输协议) 是用来在 Web 上传输文件的 __基础协议__ ，基于 __TCP/IP通信协议__ 来传递数据，最典型的是在浏览器和服务器之间传递以至于上网人员可以浏览他们。目前HTTP说明文档的版本是HTTP/2。

HTTPS 是 HTTP 协议的安全版本，HTTPS __在 HTTP 上加入套接字 SSL（TLS 为 SSL 最新版）层__ ，对网页进行加密传输。

HTTP 是 __基于文本__ (所有的通信都是以纯文本的形式进行) 以及 __无状态的 (当前通信不会发现以前的通信状态)__ 。这个特点对在www上访问网页的人是很理想的。而且，HTTP也可以让网站更加的灵活多变，利用在AJAX上等。

HTTP使用统一资源标识符（Uniform Resource Identifiers, URI）来传输数据和建立连接。 __URL是一种特殊类型的 URI__ 。

HTTP是用于传输诸如HTML的超媒体文档的 __应用层__ 协议。它被设计用于Web浏览器和Web服务器之间的通信，但它也可以用于其他目的。 HTTP遵循经典的 __客户端-服务端模型__ ，客户端打开一个连接以发出请求，然后等待它收到服务器端响应。 HTTP是无状态协议，意味着服务器不会在两个请求之间保留任何数据（状态）。该协议虽然通常基于TCP / IP层，但可以在任何可靠的传输层上使用；也就是说，一个不会像UDP协议那样静默丢失消息的协议。RUDP作为UDP的可靠的升级版本，是一种合适的替代选择。

#### 通过定义能够知道的特点

1. 基于TCP/IP通信协议
这部分的知识稍后开篇来讲
2. HTTP位于应用层
这部分的知识稍后开篇来讲
3. 遵循客户端-服务端模型
C/S(客户端/服务器)模型，是常用的服务器模型，包括现在说的B/S(浏览器/客户端)模型，都是对C/S结构的一种变化或者改进的结构。 TCP/IP协议在设计和实现上并没有客户端和服务器的概念，在通信过程中所有服务器都是对等的。但由于资源被数据提供者所垄断，于是产生了C/S模型：所有客户端都通过服务器获取所需资源。
4. 无状态
这里需要区分一下两个概念：
	- __无连接__：每次连接只处理一个请求，服务端处理完客户端一次请求，等到客户端作出回应之后便断开连接；
	- __无状态__：是指服务端对于客户端每次发送的请求都认为它是一个新的请求，上一次会话和下一次会话没有联系；
    
在后续的Web发展中需要带有一定的状态，则通过引入cookie和session体系机制来维护状态信息。即用户第一次访问服务器的时候，服务器响应报头通常会出现一个Set-Cookie响应头，这里其实就是在本地设置一个cookie，当用户再次访问服务器的时候，http会附带这个cookie过去，cookie中存有sessionId这样的信息来到服务器这边确认是否属于同一次会话。

#### HTTP与HTTPS
##### 什么是HTTPS
HTTPS（全称：Hyper Text Transfer Protocol over Secure Socket Layer），是以安全为目标的HTTP通道，简单讲是HTTP的安全版。即HTTP下加入SSL层，HTTPS的安全基础是SSL，因此加密的详细内容就需要SSL。 现在它被广泛用于万维网上安全敏感的通讯，例如交易支付方面。

##### HTTPS加密机制
HTTP中没有加密机制，可以通过 __SSL（Secure Socket Layer 安全套接层）__ 或 __TLS（Transport Layer Security 安全层传输协议）__ 的组合使用，加密HTTP的通信内容。

HTTPS是 HTTP Secure 或 HTTP over SSL。

SSL（Security Socket Layer）是最初由网景公司（NetScape）为了保障网上交易安全而开发的协议，该协议通过加密来保护客户个人资料，通过认证和完整性检查来确保交易安全。网景公司开发过SSL3.0之前的版本；目前主导权已转移给IETF（Internet Engineering Task Force），IETF以SSL3.0为原型，标准化并制定了TSL1.0，TLS1.1，TLS1.2。但 __目前主流的还是SSL3.0和TSL1.0__ 。

SSL工作在 __OSI七层模型中的表示层__ ，__TCP/IP 四层模型的应用层__ 。

SSL 和 TLS 可以作为基础协议的一部分（对应用透明），也可以嵌入在特定的软件包中（比如Web服务器中的实现）。

SSL 基于TCP，SSL不是简单地单个协议，而是两层协议；SSL记录协议（SSL Record Protocol）为多种高层协议（SSL握手协议，SSL修改密码参数协议，SSL报警协议）提供基本的安全服务。HTTP是为Web客户端/服务器交互提供传输服务的，它可以在SSL的顶层运行；SSL记录协议为SSL链接提供两种服务，机密性：握手协议定义了一个共享密钥，用于SSL载荷的对称加密。 消息完整性：握手协议还定义了一个共享密钥，它用来产生一个消息认证码（Message Authentication Code，MAC）。

SSL/TLS握手阶段分为五步(假定客户端叫做爱丽丝，服务器叫做鲍勃，整个握手过程)：
以下引自 [阮一峰的网络日志](http://www.ruanyifeng.com/blog/2014/09/illustration-ssl.html)
- 第一步，爱丽丝给出协议版本号、一个客户端生成的随机数（Client random），以及客户端支持的加密方法。
- 第二步，鲍勃确认双方使用的加密方法，并给出数字证书、以及一个服务器生成的随机数（Server random）。
- 第三步，爱丽丝确认数字证书有效，然后生成一个新的随机数（Premaster secret），并使用数字证书中的公钥，加密这个随机数，发给鲍勃。
- 第四步，鲍勃使用自己的私钥，获取爱丽丝发来的随机数（即Premaster secret）。
- 第五步，爱丽丝和鲍勃根据约定的加密方法，使用前面的三个随机数，生成"对话密钥"（session key），用来加密接下来的整个对话过程。

直白解释，在HTTPS使用时，客户端首先发起请求，服务端返回证书，客户端确认无误后，选择对应的公钥开始加密，服务端接收到数据后开始使用服务器的私钥解密。

#### HTTP Header
HTTP 消息头允许客户端和服务器通过 request和 response传递附加信息。一个请求头由名称（不区分大小写）后跟一个冒号“：”，冒号后跟具体的值（不带换行符）组成。该值前面的引导空白会被忽略。

根据不同上下文，可将消息头分为：
- 一般头: 同时适用于请求和响应消息，但与最终消息主体中传输的数据无关的消息头。
- 请求头: 包含更多有关要获取的资源或客户端本身信息的消息头。
- 响应头: 包含有关响应的补充信息，如其位置或服务器本身（名称和版本等）的消息头。
- 实体头: 包含有关实体主体的更多信息，比如主体长(Content-Length)度或其MIME类型。

常用的头部主要有：

|应答头|说明|
|--|--|
|Content-Length|表示内容长度。只有当浏览器使用持久HTTP连接时才需要这个数据。如果你想要利用持久连接的优势，可以把输出文档写入 ByteArrayOutputStream，完成后查看其大小，然后把该值放入Content-Length头，最后通过byteArrayStream.writeTo(response.getOutputStream()发送内容。|
|Content-Type|表示后面的文档属于什么MIME类型。Servlet默认为text/plain，但通常需要显式地指定为text/html。由于经常要设置Content-Type，因此HttpServletResponse提供了一个专用的方法setContentType。|
|Expires|应该在什么时候认为文档已经过期，从而不再缓存它|
|Last-Modified|文档的最后改动时间。客户可以通过If-Modified-Since请求头提供一个日期，该请求将被视为一个条件GET，只有改动时间迟于指定时间的文档才会返回，否则返回一个304（Not Modified）状态。Last-Modified也可用setDateHeader方法来设置。|
|Set-Cookie|设置和页面关联的Cookie。Servlet不应使用response.setHeader("Set-Cookie", ...)，而是应使用HttpServletResponse提供的专用方法addCookie。|