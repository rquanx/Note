# 知识点

## OverView



[TOC]



# 计算机、开发知识

## 现代简单的网络堆栈通常构建

数据库：数据库用于永久或临时存储应用程序的数据。您可以选择关系数据库，文档数据库，树形数据库，键值数据库等。这一切都归结为您需要存储的数据类型以及您需要对数据进行的操作类型。
你几乎总是有一个数据库，并且在一个项目中使用多种类型的数据库来处理不同类型的数据是相当普遍的。
后端：您需要一些后端代码来为您的文件和数据提供服务。这可以基于各种语言：Python，Ruby，PHP，C＃，Java，JavaScript和各种通常提供一些常用功能和库的框架，如：Django，Rails，Symfony，Zend，CakePHP，IgnitePHP，Play Framework， Node.js等。另外，您可以找到几乎能够以任何语言执行常见任务的库。
在过去，几乎所有的网站逻辑和功能都是在后端实现的。然而，现代网络应用程序要求速度非常快，响应速度非常快，并且通常在客户端提供大量功能 - 无需刷新页面。因此，一些较新的Web应用程序依赖于后端，并且在前端很厚。
前端：几乎总是基于HTML，JavaScript和CSS的组合。通常，HTML通常定义页面内容，JavaScript定义功能，CSS优化定义样式，设计和布局。在客户端（浏览器）或服务器上有各种模板引擎HTML和CSS侧（后端）。这主要是个人品味的问题。JavaScript也有很多库。jQuery允许您轻松操作页面，Underscore允许常用操作。有关于任何事情的库。Backbone.js和Ember.js允许某种框架来帮助保持你的代码更有条理。
如今，您几乎可以将任何后端与任何公用数据库混合使用，并且无论后端和数据库如何，您都可以使用前端所需的任何库或框架。
底线，这是我的建议：
根据您需要存储的数据类型和您需要对其执行的操作类型（表，文档，树，对等）选择一个数据库。
选择你最熟悉的后端语言，让你开心。这并不重要。一旦选择了一种语言，最好使用框架来避免样板代码，并保持事物的安全性和结构性。再次，这是你的需求和个人喜好的问题。
使用HTML，JavaScript和CSS构建前端。使用JavaScript处理HTML非常麻烦，所以我建议你使用像jQuery，Zepto或类似的库来做到这一点。如果你认为你有几千行JS代码，可以考虑使用一个MVC框架，比如Angular.js，Backbone.js或者Ember.js。如果您的网站是HTML或CSS，请考虑使用HTML模板引擎或SASS / LESS等语言。
根据您选择的数据库和后端，找出承载您的应用的最佳位置。Heroku，Amazon EC2，Rackspace Cloud，Google AppEngine和EngineYard等几种常见选项



## 知识点

IO密集型和CPU密集型任务

CDN 指的是[内容分发网络](https://en.wikipedia.org/wiki/Content_delivery_network)

置



[消息队列](<https://zhuanlan.zhihu.com/p/55712984>)



## 小技巧

### 取余

取余

> 如果用户访问，当数据量足够大的时候，可以通过取余进行均分
>
> % 2 平分
>
> % 3 、%4 ...  可以实现数据不同概率的分布
>
> 视频缓存?

## WEB前端

github教程   https://github.com/wxyyxc1992/Web-Series		(现代 Web 开发基础与工程实践)

### 移动开发

##### 响应式布局

对需要适配的屏幕尺寸进行划分

移动优先和PC优先

- 移动优先使用min-width
- PC优先用max-width

百分比布局（计算困难）

rem布局（根据font-size变化）



### 性能

#### 缓存

service worker

​	必须是https



### 知识点

#### 数据模拟

mock.js

easy-mock

#### 跨域

[九种跨域方式实现原理](https://zhuanlan.zhihu.com/p/56718905?utm_source=wechat_session&utm_medium=social&utm_oi=881835120850501632&from=groupmessage)



#### 消息推送

##### 短轮询

指在特定的的时间间隔（如每10秒），由浏览器对服务器发出HTTP request，然后由服务器返回最新的数据给客户端的浏览器。

优点：后端编写非常简单，逻辑不复杂。
缺点：请求中大部分中是无用的，浪费了带宽和服务器资源。



##### 长轮询

客户端向服务器发送Ajax请求，服务器接到请求后hold住连接，直到有新消息才返回响应信息并关闭连接，客户端处理完响应信息后再向服务器发送新的请求；

优点：在无消息的情况下不会频繁的请求，耗费资小并且实现了服务端主动向前端推送
缺点：服务器hold连接会消耗资源，返回数据顺序无保证，难于管理维护。



##### 长连接

在页面中的iframe发送请求到服务端，服务端hold住请求并不断将需要返回前端的数据封装成调用javascript函数的形式响应到前端，前端不断收到响应并处理。

优点：消息即时到达，不发无用请求，管理起来也相对方便。
缺点：服务端维护一个长连接会增加开销。



##### Flash XMLSocket



##### Server-sent

HTML5规范中提供的服务端事件EventSource



##### WebSocket

WebSocket是HTML5下一种新的协议，是基于TCP的应用层协议，只需要一次连接，便可以实现全双工通信，客户端和服务端可以相互主动发送消息



##### 缓存

[浏览器缓存](<https://www.jianshu.com/p/54cc04190252>)



#### 日志上报

##### sendBeacon

##### img.src

```javascript
var img = new Image();
img.src = API + '?' + '数据参数'
```



### 单元测试

Test.assertEquals(hello(), "hello edabit.com", "Did you *return* the result?");

[前端单元测试探索](https://github.com/ecmadao/Coding-Guide/blob/master/Notes/UnitTest/%E5%89%8D%E7%AB%AF%E5%8D%95%E5%85%83%E6%B5%8B%E8%AF%95%E6%8E%A2%E7%B4%A2.md)

### 库

#### Ajax异步请求库

- [superagent](https://github.com/visionmedia/superagent)
- [axios](https://github.com/axios/axios)
- [fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)

#### JQuery

jquery ajax 跨越 jsonp

#### 正则表达式

[Rex](https://areknawo.github.io/Rex/#/)

#### lodash

通用功能库

#### revealjs

md或html生成ppt

[https://revealjs.com](https://revealjs.com/)

#### Codelf

[Codelf(变量命名神器)](https://github.com/unbug/codelf)

#### whistle

基于Node实现的跨平台抓包调试代理工具

[whistle](https://cloud.tencent.com/developer/article/1334698)

#### RXJS

[理解响应式编程和RxJS](https://www.jianshu.com/p/4244e527c838)

#### moment

[momentjs](http://momentjs.com/)



[bootCDN](https://www.bootcdn.cn/)     

> 公共资源库链接,不用下载库，直接引用此链接
> 也可通过查看有哪些常用库	

download.js	下载库
saveAs.js		保存库
keypress.js	键盘按键监听库
gif.js		生成gif  

### 文章

##### Promise

[JavaScript Promise迷你书](http://liubin.org/promises-book/?hmsr=toutiao.io&utm_medium=toutiao.io&utm_source=toutiao.io#how-to-write-promise)

[Promise之深度解析](https://www.jianshu.com/p/e0bb0083220e)

[使用Promise解决多层异步调用的简单学习](https://www.jianshu.com/p/29da9aef4c1c)

[promise细节(题目)](https://juejin.im/post/5bd697cfe51d454c791cd1d5)

##### 小工具

[前端开发工具](https://segmentfault.com/a/1190000017515552)

###### 杂

[框架说明](https://www.jianshu.com/p/aa733914c65d)

[前端数据驱动的框架之下，我们不得不掌握的数据处理方法（一）](https://juejin.im/post/5bcc730ff265da0ad13bb60f  )

 [布局博客](https://juejin.im/user/5930c4382f301e006bd42795/posts)

[react折腾博客](https://juejin.im/user/575ebdbd5bbb5000638173fb/posts)

[react折腾](https://juejin.im/post/5bcc104ce51d450e543edd70)

[js算法数据结构](https://github.com/trekhleb/javascript-algorithms/blob/master/README.zh-CN.md)

[用JS写一个JS解释器](https://segmentfault.com/a/1190000017241258)

### 书籍

深入浅出node js
JavaScript权威指南
《You Don’t Know JS》系列书，GitHub上有作者开放的免费版可以看；
《Speaking JavaScript》从实现原理角度讲解JS，进阶必备；
《精通CSS（第二版）》名字很俗但是一本入门好书；
《CSS Secrets》CSS进阶书籍，让你看看CSS到底有多少种用法
吴军博士写的所有书，通俗易懂，看完之后会对整个计算机行业和计算机发展历史有一个宏观的了解；
《Algorithms to Live By: The Computer Science of Human Decisions》
​	这本书讲了很多算法在日常生活中的应用，能帮助你开拓眼界，非常有趣；
《程序员跳槽全攻略》
​	不讨论观点对错，这本书的重点是提出了许多新想法，能帮你从不同角度分析跳槽这件事，读完会有很多启发

H5 匠人手册
Web测试囧事
Speaking JavaScript
精通CSS
CSS Secrets

### 站点

[ScriptOJ](http://scriptoj.mangojuice.top/problems?tag=all)

> 刷题

[js,html,json美化  格式化](https://beautifier.io/)

[learn x in y](https://learnxinyminutes.com/)

> 学习网站



[前端收集，博客，社区....](https://github.com/foru17/front-end-collect)

[前端清单，略旧](https://github.com/JacksonTian/fks)

[js疑难杂症，奇技淫巧](https://github.com/justjavac/the-front-end-knowledge-you-may-not-know/issues)

[前端路线](https://github.com/goodjack/developer-roadmap-chinese)

[前端精读](https://github.com/dt-fe/weekly)

[前端资源](https://github.com/helloqingfeng/Awsome-Front-End-learning-resource)  

[前端知识点](https://juejin.im/entry/5b94d9d9e51d450e9704a4cb)

[typescript](https://github.com/semlinker/awesome-typescript)

[pdf.js	官网示例](http://mozilla.github.io/pdf.js/examples/)

[博客集合](https://github.com/kilimchoi/engineering-blogs)

[js算法，数据结构](https://github.com/trekhleb/javascript-algorithms/blob/master/README.zh-CN.md)

[33-js-concepts](https://github.com/leonardomso/33-js-concepts)

redux

> https://www.jianshu.com/p/1a2f3db4af61
> https://www.jianshu.com/p/1a2f3db4af61
> http://www.ruanyifeng.com/blog/2016/09/redux_tutorial_part_one_basic_usages.html
> https://segmentfault.com/a/1190000012976767

[es6](http://es6.ruanyifeng.com/#docs/number)

> 阮一峰

[http](http://blogread.cn/it/article/7277?f=wb_blogread)

> 细节说明

[awesomes，前端框架大全](https://www.awesomes.cn/)



[bootCDN](https://www.bootcdn.cn/)     

> 公共资源库链接,不用下载库，直接引用此链接
> 也可通过查看有哪些常用库	  

[免费图库](https://www.yuque.com/ruanyf/share/free-photos)



### 杂

#### Base64

经base64编码后只能为大小写字母、数字、＋和／、＝。
base64_encode(base64_decode("union select 1,2,3")) == "unionselect12w=="

#### API

[和风天气](http://www.heweather.com/documents/city)

[jquery天气](jquery.zweatherfeed.min.js)

[雅虎天气](http://query.yahooapis.com )

[天气api](https://www.tianqiapi.com/api/?version=v1)

[页面编辑插件](https://github.com/GoogleChromeLabs/ProjectVisBug)

#### 多语言解决方案

##### js对象

将所有多语言定义为对象，存在语言.js中，通过对象属性方式读取



#### 体验、规范

##### 表格

###### 数据

不定长的  	左对齐		看起来会有层级性
定长		居中
??     		右对齐??

##### 文档规范

命名规范，对照，常用
不需要太细，合并
有疑问设置标记



## 后端



### 开发问题

#### 服务器获取客户端IP

​	有代理/网络负载平衡(NLB) 情况下，服务器可能无法通过常规的方式读取到真实的ip，一般代理会有在http的某处设置真实ip，可根据这个特定的东西来获取到真实的Ip



#### 异常，站点不能访问

503,检查application pool是否挂了；检查windows事件日志查看有没错误；检查sharepoint日志

ping 服务器	ping ip

ping被禁，使用telnet

### 站点

[后端架构师技术图谱](https://github.com/xingshaocheng/architect-awesome)



## 杂

[知识清单](https://mp.weixin.qq.com/s?__biz=MzAxOTc0NzExNg==&mid=2665514860&idx=1&sn=641187383bb8d9d3f56009a7ed1e2696&chksm=80d67f2fb7a1f639384a807b0496a03794cf3f47b24d8c41ddc49b02f43bb1924becbd7cf035&scene=21#wechat_redirect)

[Useful websites for programmers](https://dev.to/sahilrajput/useful-websites-for-programmers-36k)

[习题](https://edabit.com/challenges)

### 博客

[酷壳](https://coolshell.cn/)

### 站点、文章

[程序猿应该要知道](https://github.com/mtdvio/every-programmer-should-know)

[黑客](https://github.com/Hack-with-Github/Awesome-Hacking)

[go](https://github.com/avelino/awesome-go)

[机器学习](https://github.com/josephmisiti/awesome-machine-learning)

[pyhthon](https://github.com/vinta/awesome-python)  

[资料集合](https://www.jianshu.com/p/d74934b49ba3)

[awesome集合](https://github.com/sindresorhus/awesome)

[免费的编程中文书籍索引](https://github.com/justjavac/free-programming-books-zh_CN)

[编程论文](https://github.com/zziz/pwc)

[The Book of Secret](https://github.com/trimstray/the-book-of-secret-knowledge)

[公共API大全](https://public-apis.xyz/category/health)



# 其他知识

## 颜色

##### RGB

![img](E:\electronic\programandcompli\Github\Note\Note.assets\16a1fb8bf6df6913)



###### 饱和度

颜色的刺激或者鲜艳===RGB的差异大

rgb三种色值的差距缩小，饱和度为0就是三原色的差距为0

饱和度的数学概念：三原色的最大值和最小值之间的差

饱和度为0：取rgb的最大值和最小值的中间值。让三种颜色同时趋于这个中间值



###### 明度

某个颜色看起来是偏黑还是偏白

暗意味着三种颜色对三种视锥细胞的刺激都很小，相反意味着三种颜色都比较多

明度变化，三种颜色同时增大或缩小



##### HSL

![img](E:\electronic\programandcompli\Github\Note\Note.assets\16a1fb8cb560596e)

![img](E:\electronic\programandcompli\Github\Note\Note.assets\16a1fb8cd46fb42a)

hsl(#f00, 100%, 50%)  颜色,饱和度,明度

hsl(0, 100%, 50%)   通过色相环将颜色设成角度0~360度

互补色：两种颜色：色相环相差180，三种：相差120



##### HSV

HSL中的明度换成亮度

和HSL类似，HSV注重亮度，HSL注重明度，PS常用HSV



## 阅读

[关于阅读理解，我们学的，都是错的  超视角](<<https://mp.weixin.qq.com/s?__biz=MzI0MjA1Mjg2Ng==&mid=2649867922&idx=1&sn=4288b071f068130a31aa77ec7d9da250&chksm=f1075cffc670d5e9fb6c21d3e654f7bad93dcfa69b68d38e63a5107cd1158882e03c615effdd&scene=21#wechat_redirect>>)

> 超视角，通过不同角度看待事情



# 软件\工具





## 原型设计

Xiaopiu

[墨刀](<https://modao.cc/>)

mockup

## 编辑器

### VSCode

#### 快捷键

ctrl + D 往下选中匹配项
alt + shift + 鼠标选中 列选择

c + space 智能提示

#### 插件

[插件](https://medium.com/@wesharehoodies/immensely-upgrade-your-development-environment-with-these-visual-studio-code-extensions-9cd790478530)

[VS Code插件](https://segmentfault.com/a/1190000017339754)

### Visual Studio

#### 更新office开发人员工具

​	需要更新office tool for vs 
​	将csproj文件里得MinimumOfficeToolsVersion改为14.0

visual studio installer 的sharepoint开发有visual studio tools for office可选

#### 快捷键

切换光标模式  insert键



### Typora

typora 模糊可以进行缩放

markdown流程，使用\<br/>可以进行换行

## 操作系统

### Windows

#### 远程控制

\\10.182.21.12\c$\inetpub\wwwroot\wss\VirtualDirectories\portal.toyotsu-ea.com443\App_GlobalResources
​	在文件夹输入路径可直接访问

​	

#### Cmd

service.msi   打开服务

cls		清屏





##### ping

不需要加http头前缀

```shell
ping http://192.168.1.1 # error
ping 192.168.1.1        # right
```



##### 目录树生成

tree 指令   

```bash
tree # 显示当前路径的目录，不显示子文件夹的
tree /F # 显示子文件夹的，目录树
tree /? # 查看其它参数

tree /F > xxx.txt # 将目录树生成文件，可自动新建文件

```





#### Hosts

##### 配置Hosts

```shell
#不需要加http:// 
192.168.20.40 api.medalsoft.com
```

#### 输入/快捷键

编辑时输入的字母大一号   全角 半角 符号 问题 shift + space 
c + s + f  微软输入法切换繁体

ins键   insert   切换输入的插入或覆盖模式

ctrl + alt + 方向键 屏幕旋转

Home 回到光标选中的地方

#### 优化

[Windows10资源管理器占用CPU过高解决办法,打开慢](https://blog.csdn.net/sinat_34104446/article/details/70878075)   禁用cotana(小娜) + 禁用问题收集服务

#### 异常

域服务器，事件查看器，事件ID2896,错误码8453

- [support.hpe](https://support.hpe.com/hpsc/doc/public/display?docId=emr_na-c02912597)
- [social.technet.microsoft问答](https://social.technet.microsoft.com/Forums/en-US/41835492-9d50-4dee-a847-a5291fc610d4/a-client-made-a-dirsync-ldap-request-for-a-directory-partition-access-was-denied-due-to-the?forum=ocssecurity)
- [support.microsoft](https://support.microsoft.com/en-in/help/2022387/active-directory-replication-error-8453-replication-access-was-denied)
- [mickputley](http://www.mickputley.net/2013/11/event-id-2896-in-directory-service-log.html)



#### 计划任务

控制面板中的管理工具，或者开始菜单中管理工具中查找

​	选择第一层级可以看到当前启用的定时任务



#### Hyper-v

##### 备份

复制

导出



#### 账号

账号设置分布

- iis 应用池 账号设置
- windows服务账号设置
- sharepoint   邮件传出、nintex提示、UserProfile



#### windows打开文件编码问题

控制面板-->语言设置-->非unicode编码使用语言



#### 工具

snipping

> 自带截图工具

## 版本控制

### Github

#### 编程

```bash
# 遍历当前文件夹下的.git ，进行git pull;
for i in */.git; do ( echo $i; cd $i/..; git pull;); done

for i in */.git; do ( echo $i; cd $i/..; git add -A; 
git commit -m "commit message"; 
git push;); done
# 提交
git add -A; 
git commit -m "commit message"; 
git push
```



#### 凭证

windows凭据会记录SharePoint、Office...的账号密码



#### 库

[Git的奇技淫巧--操作指令](https://github.com/521xueweihan/git-tips)

#### 服务器

[搭建自己的 Git 服务器](https://www.aneasystone.com/archives/2018/12/build-your-own-git-server.html#at)

#### 使用规范

##### 格式

```bash
<type>: <subject>
// 空一行
<body>
// 空一行
<footer>

type：提交类型，可选值如下
* work: 开发中(work in progress)
* feature：新功能(new feature)
* fix：修补bug(fix bug)
* doc：文档(documentation changes)
* style： 格式(change code format)
* refactor：重构(modify code but not feature)
* test：增加测试(test code)
* chore：构建过程或辅助工具的变动(changes don't modify src and test files, only config or tasks)
* none: 不写明

subject：commit 目的的简短描述。

body: 对本次 commit 的详细描述

footer: 描述一些特殊情况，不兼容变动和issue关闭。
```



### Svn

#### 新建分支

通过文件浏览器新建一个文件夹，将文件上传至文件夹中。
随便找个地方拉下来，进行清理，对所有的bin和package选择增加到忽略列表，再更新一次

### 通用

改bug	每次只做一个改动，提交      尽量写更新日志

## 办公

### O365

#### 问题

[o365登录问题，用户被隐藏？凭证没有、通过删除注册表搞掂(15文件夹下没东西，16文件夹有，删去冲突的用户信息)	Sorry, another account from your organization is already signed in on](https://support.microsoft.com/en-us/help/2750229/sorry-another-account-from-your-organization-is-already-signed-in-on-t)

### Excel

#### 诀窍

- 制作excel要利用好横栏和竖栏，将对比项进行优化
- 利用好颜色，美观

#### 快捷键

换行：alt + enter

#### 公式

单元格运算
=IF(K292<>0,"GROUP",IF(J292<>0,"部",IF(I292<>0,"SBU",IF(H292<>0,"部门",IF(G292<>0,"集团","")))))

if else if......



### Word

分页：插入分页符







## 微软开发

### 总览

#### 文档

[微软Office开发文档](https://developer.microsoft.com/zh-CN/office/docs)



#### 工具

sharepoint manager tool



#### 文件上传

可在管理中心设置不允许上传的文件类型(根据扩展名)

### SharePoint

#### 学习记录

##### 概述

企业级 基于数据存储和协同办公信息化平台软件



##### 功能点

- 点赞
- 评论
- 调查问卷
- 空间使用



#### 页面

考勤默认页面文字， 编辑页面->编辑属性->页面内容->编辑源...



#### Webpart

##### 部署时问题

###### 对象ID重复

> 右键package打开设计器，右下角可修改solution ID  guid



###### feature has already installed

> 点击feature文件夹下的xxxfeature,右下属性选强制安装



###### step 'activate features' Failed to load receiver assembly

> 右键项目属性，签名，新建强名称密钥文件，随便写名字，密码随意



###### Could not load file or assembly  The system cannot find the file specified

> 确实少了dll



###### wsp包打包文件还原

- 新建一个同名的sharepoint项目，自带package和feature生成
- 将package复制到需要还原的项目中，feature为空不需要
- 项目总包含package,排除其他代码文件
- 重新包含其他代码文件
- webpart需在package设计页面中拉取
- 部署



###### 版本问题？ 部署后aspx中的aspx无效，要移动到layout下



###### webpart打包，在wsp中添加依赖的dll，选择package ==>高级==>添加





#### 开发框架

##### SharePointFrameWork

###### 文档

[官方文档](https://docs.microsoft.com/zh-cn/sharepoint/dev/spfx/set-up-your-development-environment)
[微软官网文档](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/sharepoint-framework-overview)
[微软官网文档](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/known-issues-and-common-questions )

###### 博客、文章

[陈希志博客](https://www.cnblogs.com/chenxizhang/category/967796.html)
[微软开发者论坛](https://social.msdn.microsoft.com/Forums/en-US/home
https://social.msdn.microsoft.com/Forums/en-US/c3180339-8111-4025-a174-46d87afc00c8/sharepoint-framework-in-onpremise-sp-2013?forum=sharepointdevelopment
https://social.msdn.microsoft.com/Forums/en-US/77c90214-a5c0-430a-b8c7-05483c76a9d8/sharepoint-framework?forum=sharepointadmin
https://rencore.com/blog/sharepoint-framework-webinar-qa-follow-part-1-sharepoint-framework/
https://github.com/SharePoint/sp-dev-fx-webparts)
[modern web stack](https://github.com/SharePoint/sp-dev-samples/tree/dev )

#### 操作、知识点

##### 查看站点存储
site setting --> (转到首要网站设置) --> 存储标准 --> file    不一定准



##### sharepoint文件批量下载、获取

在文件夹中输入网页地址能直接访问sharepoint文件夹



##### 隐藏用户表,用户信息表

http://192.168.20.40:8091/sites/rgciland/_catalogs/users/simple.aspx
/_catalogs/users/simple.aspx



##### 隐藏账号

everyone: 表示所有账号		默认隐藏？所以查找不出来，要实际查找点击一次才会出来
​	默认ID 13？



##### 日志

日志路径：C:\Program Files\Common Files\microsoft shared\Web Server Extensions\15\LOGS
ULSViewe-log工具	查看工具



##### 权限

通过组可对Item项设置权限

流程可以设置item权限



##### 强制重新登录

xxx/_layouts/closeConnection.aspx?loginasanotheruser=true

>  自动登录后自动跳转顶层站点？



https://team.cargill.com/sites/Metals_Supply_China_E-chop_Test/_layouts/15/closeConnection.aspx?loginasanotheruser=true&Source=https://team.cargill.com/sites/Metals_Supply_China_E-chop_Test/eChop

> 增加source参数指定跳转



##### 隐藏新建item页面的字段

list setting,在contenType中点击，进入List Content Type页面，点击字段，可以选择Hidden

##### 导出excel

sharepoint list export to excel   需要IE

> 导出数据到excel，进行备份
>
> 使用ie打开列表
>
> 导出下载query.iqy
>
> 使用excel打开query.iqy



##### sharepoint复制列表

> list setting保存模板，且包含数据
>
> 创建list,在app中查找



##### 网站集备份、还原

```bash
#  备份
Restore-SPSite -Identity "http://10.182.21.33/sites/attendance" -Path C:\Users\farmadmin\Desktop\site\attend.bak -Force  

# 还原
Backup-SPSite -Identity "https://portal.toyotsu-ea.com" -Path C:\backup\deb\site.bak
```



##### 导航隐藏

权限判断隐藏导航



```html
<Sharepoint:SPSecurityTrimmedControl ID="SPSecurityTrimmedControl2" runat="server" PermissionsString="ManageWeb">                           
          <script type="text/javascript">
             $('#suiteBarDelta').css('display', 'block'); 
          	 $("#s4-ribbonrow").css('display', 'block');
         </script>         
</Sharepoint:SPSecurityTrimmedControl>

```



##### 模板停用

​	site settingg --> solutions --> 停用



##### 爬虫搜索加工

网站设置-> 母版页和页面布局-> Display Templates -> 可以找到搜索时使用的模板和js，从而对搜索结果做一些处理



##### OWA

owa有对应的服务器、站点

> 通过获取到的css路径可以找到css，从而进行隐藏
>
> 编辑权限和读取权限的编辑按钮不同





#### 特性

##### 阈值

[说明](https://blog.csdn.net/shrenk/article/details/39217223)

###### 通过索引列避免

索引列：  可以通过索引列进行多数据操作，查询，但是结果返回值不能超过阈值
非索引列：只要数据量超过阈值就不能进行操作

筛选条件含有索引列后，只要通过索引列查询的最大数不超过阈值，可以添加其他非索引列的字段筛选
单个索引列筛选超过阈值时，可通过设置符合索引列组合筛选，只有一个索引列通过多次caml联合减少查询亦可
​	当两个非复合索引进行and查询时，先根据一个索引返回，再在返回的数据里进行另一个字段的筛选

###### 使用文件夹分割

##### 限制

###### 文件名符号限制

###### 文件名长度限制

url最长为260？



[阈值相关官方文档](https://support.office.com/en-us/article/manage-lists-and-libraries-with-many-items-for-sharepoint-2010-1f4985e4-6d67-4e0c-a473-ea17e7058585?ocmsassetID=HA010378155&redir=0&CorrelationId=9a4c067a-7dbd-4deb-8a02-69b73d0255d0&ui=en-US&rs=en-US&ad=US#_Toc268174141)

[How to overcome SharePoint 5000 item limit threshold](https://sharepointmaven.com/how-to-overcome-sharepoint-5000-item-limit-threshold/)

  [sharepoint 阈值查询](https://social.msdn.microsoft.com/Forums/sharepoint/en-US/db54d1c7-e19b-414d-84b9-d6c22ea3b676/how-can-i-overcome-limitations-of-list-view-threshold-when-querying-sharepoint-2013-online)

[sharepoint阈值说明](https://www.abelsolutions.com/working-with-list-view-thresholds-in-sharepoint/)

sql查询超过5000条的时候会锁定整张表  

#### 开发



##### 交互模型

Sharepoint  csom,jsom,update后会自动更新对象内容



##### 用户

用户组和用户的lookupid应该是公用一个计数，不会重叠

##### List

###### 权限

不同用户查询列表时结果不同,权限问题



###### 文档库

文档库文件fileref字段是包含当前站点的，除顶层站点外

###### Item

字段含有内部名称和显示名称

字段值由不同类型，查阅项，url，text，number，bool.....

直接浏览器输出sharepointl 列表项数据可以看到数据对应的类型 如： SP.FieldUser...

lookup值如果当文本读取的话是id+姓名；可以这样检索到



###### 版本控制

连续更新数据时，由于隐藏的xxxx,会认为时旧版本，产生版本冲突，不能更新
​	解决方法，重新获取context

##### Designer

通过站点连接进入可进入对应的站点文档库中操作

##### Webpart

C#组件

webpart属性设置可以设置参数

wsp包部署出问题    打开浏览器管理，进入系统设置  ---  管理场解决方案  --- 处理  即可

##### Jsom

###### 前置

使用SP.UserProfiles需加载_layouts/15/SP.UserProfiles.js



sp.js和sp.runtime.js, 其位于_layouts/15/###.js下

使用sharepoint jsom api所需文件
sp.js
sp.runtime.js
microsoftajax.js



```html

```

```javascript
// 等待加载函数   SP.SOD.executeFunc()   在init.js
```



###### 参数相关

单个文件上传不能超过2M

###### 相关文章

[jsom操作示例](http://www.thesharepointguide.com/sharepoint-javascript/#userperms)

[读取列表权限](https://sharepoint.stackexchange.com/questions/129309/how-to-get-permission-of-a-sharepoint-list-for-a-user-using-rest-api/129311#129311)

[权限枚举](https://docs.microsoft.com/en-us/previous-versions/office/developer/sharepoint-2010/ee556747(v=office.14))

castTo(...)   service.Me  sharepointService.js  490行，获取字段所有选项

[查阅项更新](https://social.msdn.microsoft.com/Forums/en-US/7e7f359b-2e8d-44d2-8cb3-816852d4a06c/sharepoint-update-lookup-column-jsom?forum=sharepointdevelopment)

[update  多个lookupvalue](https://stackoverflow.com/questions/22694749/sharepoint-2013-multivalue-lookup-field-with-javascript)

[微软官方jsom操作](https://docs.microsoft.com/en-us/sharepoint/dev/sp-add-ins/complete-basic-operations-using-javascript-library-code-in-sharepoint#create-read-update-and-delete-files)

[文档库操作1](https://sharepoint.stackexchange.com/questions/157769/adding-a-new-item-to-a-document-library-using-jsom)

[文档库操作2](https://stackoverflow.com/questions/29699830/get-file-name-from-document-library
http://ramdotnetdeveloper.blogspot.com/2017/07/to-get-file-and-folder-from-document.html)

[How to get sharepoint file from document library if I know file url (JSOM)?](https://sharepoint.stackexchange.com/questions/209170/how-to-get-sharepoint-file-from-document-library-if-i-know-file-url-jsom)

[Uploading file to document library using JSOM](https://sharepoint.stackexchange.com/questions/213789/uploading-file-to-document-library-using-jsom)

[微软jsom含有文件操作](https://docs.microsoft.com/zh-cn/sharepoint/dev/sp-add-ins/complete-basic-operations-using-javascript-library-code-in-sharepoint#create-read-update-and-delete-files)

[Using JavaScript or JQuery and JSOM in SharePoint](http://www.thesharepointguide.com/sharepoint-javascript/#querying-list)

[Working with the ECMAScript Client Object Model (JSOM) in SharePoint 2010](https://docs.microsoft.com/de-de/previous-versions/office/developer/sharepoint-2010/hh372944(v=office.14))

[Top 51 JSOM SharePoint Examples ](https://www.sharepointsky.com/jsom-sharepoint/)

[SharePoint Online: JSOM Examples](http://www.migee.com/2016/03/20/sharepoint-online-jsom-examples/#SPWebPerms)

###### 错误信息

mException from HRESULT: 0x80131904，有以下可能	

- caml中值问题       例lookupid使用了字符串



###### 示例

```javascript
// 读取文档库
//以对象形式读取所有属性,返回{xx:xx,xx:xx}
item.get_objectData()
id.get_methodReturnObjects()
i.$m_dict.xxxxx

// get_fieldValues()  获取所有属性
```



##### Rest api

###### 主要事项

rest api 更新时字段内容不能含有"\\"  转义字符

###### 参数相关

REST最大上传文件2G

###### 文章

[rest api odata](https://docs.microsoft.com/zh-cn/previous-versions/dynamicscrm-2015/developers-guide/gg490659(v%3dcrm.7))

 https://blog.csdn.net/zhoulu001/article/details/53189085

https://www.cnblogs.com/fengzheng/p/3149717.html

http://www.cnblogs.com/wolf-sun/p/4603199.html  

[rest api说明](https://docs.microsoft.com/en-us/sharepoint/dev/sp-add-ins/working-with-folders-and-files-with-rest)

[微软rest api odata查询](https://docs.microsoft.com/en-us/sharepoint/dev/sp-add-ins/use-odata-query-operations-in-sharepoint-rest-requests
https://blog.csdn.net/abrahamcheng/article/details/12612455)

[rest上传文件 ](https://docs.microsoft.com/en-us/sharepoint/dev/sp-add-ins/upload-a-file-by-using-the-rest-api-and-jquery)

[rest api 更新文档库的列表项会不同](http://www.cs.yale.edu/homes/aspnes/classes/223/notes.html)

[How to Check User Permission in SharePoint 2013 Using REST API](https://www.c-sharpcorner.com/UploadFile/sagarp/how-to-check-user-permission-in-sharepoint-2013-using-rest-a/)

###### 库

[pnpjs](https://github.com/pnp/pnpjs)
[pnpjs io](https://pnp.github.io/pnpjs/)	

> pnp.js要在线下版本的sp上运行，且在node.js运行时，由于原生的是支持线上版sp的，需要使用sp-pnp-node来创建认证信息

##### Csom

###### UpdateItem

更新前的设置操作必须连续

###### 批量操作

csom可以批量修改,并且跨表修改也可以
当只修改一个表时，在update时就会马上更新，
但是马上去修改另一个表的话，执行完update()并不会马上生效
最后调用exectquery()可以确保数据更新

##### Caml

###### 排序

查询条件中每个字段按照排列的顺序依次为首要查询条件、次要查询条件、第三查询条件


###### 嵌套

嵌套层数不能超过160！===> 最多2^160的条件

###### In条件

in条件内部超过500不行 	   in可以查lookup

###### 时间查询

注意：使用SPQuery查询时间，默认查询会忽略 时分秒，只检查日期，如果要检查时间，则必须添加 IncludeTimeValue='TRUE'

[caml datetime处理，搜索对比](http://www.cnblogs.com/qijiage/p/4059462.html)

###### 查阅项数组

对于多选查阅项和多选用户也应使用Eq操作符

####### RowLimit数量

rowlimit 返回的记录条数，默认为100，如果不需要限制，将值设为0

###### 指定文件夹

```c#
query.Folder = docLib.RootFolder.SubFolders["system"];
```

```javascript
camlQuery.set_folderServerRelativeUrl(folderPath) // "/site/list/folder"   需包含站点
```



###### 文章

[列表查询中的阈值限制](http://www.myexception.org/sharepoint/1905232.html)

[caml groupby](https://piyushksingh.com/2016/11/21/retrieve-grouped-listitems-sharepoint/)

[joins,列表多表联合查询](https://blog.csdn.net/linyustar/article/details/28232229)

[rest api文档库文件上传，下载，拷贝，剪切，删除文件，创建文件夹，修改文件夹属性，删除文件夹，获取文档列表](https://www.cnblogs.com/dmyao/p/7069944.html)

[camljs archive](https://archive.codeplex.com/?p=camljs)

[camljs github](https://github.com/andrei-markeev/camljs)

[camljs console](https://www.crx4chrome.com/crx/5002/)

[camlsql-js github](https://github.com/dlid/camlsql-js)

[caml C# SPQuery对象](https://archive.codeplex.com/?p=camldotnet)

[caml view子属性](https://www.cnblogs.com/erucy/p/4439016.html)

[查询-1](https://www.cnblogs.com/erucy/p/4296940.html)

[查询-2](https://www.cnblogs.com/erucy/p/4439016.html  )

[查询](https://www.cnblogs.com/jaxu/archive/2009/03/23/1419717.html)

[caml查询 Sharepoint文档的CAML分页及相关筛选记录](https://www.cnblogs.com/poissonnotes/p/3494439.html)

[caml一些使用，关键词](https://www.cnblogs.com/carysun/archive/2011/01/12/moss-caml.html)

[SharePoint服务器端对象模型 之 使用CAML进行数据查询](https://www.cnblogs.com/liyuxin/p/5575950.html)

[官方文档](https://docs.microsoft.com/zh-CN/sharepoint/dev/schema/collaborative-application-markup-language-caml-schemas)

###### 阈值查询

 caml查询第一个条件必须筛选到阈值以下(复合索引未知)

caml设置路径后可以RecursiveAll和Recursive，在指定路径下进行
时间索引可用来筛选

ContentType可以设置索引，区分文件夹
filedirref不能加索引，也不能作索引进行查询

In可以用于索引筛选
lookup value不能被索引到  



###### 索引

索引设置后，caml查询时可能对字段类型有一致要求





##### 分页

[分页](https://code.msdn.microsoft.com/SharePoint-JSOM-list-5104ca92)

下一页的pageinfo可以通过collListItem.get_listItemCollectionPosition().get_pagingInfo()直接获取

###### 排序

sharepoint分页排序与不排序只差了查询条件和在pageinfo中的排序字段信息

如果有多个排序则继续按相应的格式进行拼接

###### 示例

```javascript
var nextPageInfo = "Paged=TRUE&p_ID=218"
var prevPageInfo = "PagedPrev=TRUE&Paged=TRUE&p_ID=208"
// 排序继续添加&p_field=value
```

```c#
var clientContext.Load(listItems,items => items.Include(item => item.Id), items => items.ListItemCollectionPosition);
var pos =  spItems.get_listItemCollectionPosition()	
    // 可以知道有没有下一页,为null则没有下一页了
    
// 取GUID
SPList list = web.Lists["test"];
Guid id = list.ID;
```

###### 翻页信息

collListItem.get_listItemCollectionPosition() 

​	总是返回往下翻页的翻页信息，但是当是往上翻页时，要取15条，但只有14条时，翻页信息会为空



sharepoint分页，规避最后一条删除，规避往上翻页删除最后一条

> 会为空



##### 插件

[sharepoint Dialog](https://docs.microsoft.com/en-us/previous-versions/office/developer/sharepoint-2010/ff410058(v=office.14))

##### 流程



启动Workflows can use app permissions   active  服务才能让管理员启动流程

#### 杂

##### 博客

[sharepoint blog](https://piyushksingh.com/category/sharepoint-online/)

[sharepoint 博客](http://blog.51cto.com/joycode)



##### 文章

[列表权限设置只控制自己创建的](https://sharepointmaven.com/how-to-enable-item-level-permissions-in-sharepoint/)

##### 论坛

[论坛sharepoint板块](https://sharepoint.stackexchange.com/)

#### 问题

##### 启动流程超时

流程操作超时： 服务器流程服务问题



##### 错误信息显示，Debug模式

![9f1ed5f7040cfb2f514787bc096ca86](.\Note.assets\9f1ed5f7040cfb2f514787bc096ca86.png)



##### 搜索结果预览的时候遮罩层不隐藏

Nintex自带的代码产生的遮罩层，可能有Bug导致不隐藏



##### AD组用户变更后 SharePoint没有及时生效

1. User Profile Service      Full sync
2. CA- > Service applications      -> user profile Service -> start profile sync(under sync) ->      start full sync
3. <https://sergeluca.wordpress.com/2013/07/06/sharepoint-2013-use-ag-groups-yes-butdont-forget-the-security-token-caching-logontokencacheexpirationwindow-and-windowstokenlifetime/
4. <https://sharepoint.stackexchange.com/questions/76313/users-added-to-ad-group-not-granted-access-in-sharepoint>



##### 网站使用率报告问题

1. <https://social.technet.microsoft.com/Forums/en-US/1b42b517-79cc-43b9-b6f0-2e4639461cb1/empty-usage-data-in-sharepoint-2013>



##### 清除登陆Token（解决AD组用户变化及时更新问题）

clear-spdistributedcacheitem -containerType DistributedLogonTokenCache



##### Sharepoint designeder 连不上服务器，提示xxx

代理会影响designeder连接服务器



##### 流程删除

先删除item项，才能删work flow task数据，否则会自动产生新数据



### Azure

### O365

[exchange头像上传问题,备份](http://techgenix.com/user-photo-exchange-lync-and-active-directory/)

## 浏览器

### Chrome

#### 调试

##### console

Console.table()

##### 操作

勾选在Console标签下的保存日志选项，你可以使DevTools的console继续保存日志而不会在每个页面加载之后清除日志。

颜色选择器
当我们在样式编辑器中选择一种颜色时，你可以点击颜色预览，颜色选择器就会弹出。



console.table()将数据以一个漂亮的表格的形式打印出来

##### 快捷键

- ctrl+p 项目中定位文件
- Ctrl + Shift + F   全局代码搜索
- ctrl+shif+o 文件中定位成员函数
- source左下角 { }  格式化代码  



##### 元素选择

- $() : document.querySelector()的缩写，返回第一个与之匹配的CSS选择器的元素(例如：$('div') 它将返回本页的第一个div元素)。

- $$() : document.querySelectorAll()的缩写，返回一个数组，里面是与之匹配的CSS选择器的元素。

- $0?$4 : 依次返回五个最近你在元素面板选择过的DOM元素的历史记录，$0是最新的记录，以此类推。

##### 功能

###### 代码片段

  保存代码片段随时可用

  chrome=> source => snip

###### 编辑

拖动文件到chrome调试器，可以同步修改文件，   内置于编辑器

###### 事件

event listener breakpoint   勾上click，当点击事件发生时就会断点

#### 杂

chrome设置的默认语言与程序多语言冲突问题

### IE

#### 开发

##### 兼容性

ie10 不支持 函数默认值 、多行字符串拼接、object.assign
日期对象new Date("2018/09/09 00:00:00")    new Date("2018-9-9 00:00:00")会报错
​	不支持缺少0 	有时间时ie不支持-	无时间时支持

[让ie  兼容es6](http://www.hangge.com/blog/cache/detail_1691.html)

- 使用polyfill
  1、页面全局引用
  2、react内引入，在最顶部引入，或在webpack中设置打包

##### 特性

对于输入框，会自带有叉和查看密码
::-ms-clear,
::-ms-reveal
{
display:none;
}	  通过css清除



# 其他、做事

## 工作

### 项目

- 了解数据库结构，询问使用背景，使用场景！！！

### 会议

确认会议后，使用邮件的日历添加会议，发送会议邀请

### 开发

#### 更新

花了比较多时间写的东西都用邮件的形式发出，抄送相关人员，并且写明需要测试的点、副作用和可能影响的地方

代码修改记录，校对；正式环境慎重更新



#### 工时

如何能评估比较准的工期呢？一个很简单的公式送给大家：

- 需求非常明确而且经常这样做：自己评估时间 * 1.5
- 需求不够清晰，有可能变，但是代码和技术方案熟悉：自己评估的时间 * 2
- 需求不够清晰，代码和技术方案也是新的，需要探索：自己评估的时间 * 2.5 or 3



### 沟通



沟通方式：
需要我来做？ =>  是否需要我协助做？



#### 邮件

邮件回复注意书写，潜在语气

开头

​	Hi, Abc	逗号后空格，称呼第一个字母大写

内容

​	去除不必要的空行





### 效率

邮件分类
​	项目文件夹分类	序号、中文

### 简历

[冷熊简历](http://cv.ftqq.com/)

### 招聘

#### 面试提问

##### 提问方法

- 根据简历的资料进行解读，学习过的课程、掌握的技能、进行过的项目进行提问
- 根据试题进行提问
- 通常针对某一点进行三个层次的提问
  - 对这个点的概念，了解，进行描述
  - 对这个点进一步细化的问某些问题
  - 再进一步细化，到具体的场景应用上

- 如果对应的点确实很简单可根据情况进行省略



##### 技能相关

**懂的知识点**



**不懂的知识点**

直接问这个是什么，什么的一个概念，进行一个描述，看是否能说明白；重复三部曲



##### 个人相关

**检验学习**

- 最近是否有在学习什么

**检验个人能力，志向，态度**

- 发展方向，职业规划，职位定位

**面试的时候沟通能力的体现,眼神等等**

**笔试的时候个人的主动性或独立解决问题的能力**

**笔试和机试的做题中感觉这些题目的难度怎样？你对你的答题怎么看？你觉得哪些没做好？没做好的原因？**

- 希望有自我意识，自我进步、优化的追求



**加班、出差的接受程度、看法，工作环境，不能忍受xxx**



##### 示例

**学过数据结构**

- 描述下数据结构有哪些？
- 数组和链表有什么区别，能否详细说明
- 什么情况下使用

**做过项目**

- 一、多功能的系统开发
  - 项目的整体描述
  - 项目中负责的模块，功能是什么
  - 开发时使用了什么？为什么要使用？遇到什么问题？

- 二、相对单一个小作品
  - 这个小作品是干什么的
  - 功能是怎么实现的，功能细节
  - 作品使用场景，根据使用场景进行一定的提问

**用过stringBuilder**

- 为什么用，好处是什么

**试题**

- 为什么这样写
- 题目有发现什么信息

**学过Bootstrap**

- 简单说一下Bootstrap的特点和一些基本的概念
- 基本布局东西，什么是栅栏格、column,row
- 以简历为例，应该如果进行栅栏的分割

**学过Python爬虫**

- 有没用爬虫做过什么？
- ->项目小作品三部曲



##### 中级面试

1、之前的公司的团队有多大技术、开发人员、测试人员比例是多少？

> 主要考察候选人的带队能力，以及一个团队里人员配比的合理性。



2、你如何应对未过试用期的技术人员离职？

> 主要考察候选人的管理能力及应对突发事件的能力。



3、你在项目当中碰到的最大困难是什么，如何解决？

> 通过候选人回答的最大困难，考察候选人有没有真正碰到过重大困难，以及他的解决问题的思路及能力。



4、团队中技术人员技术参差不齐，你如何保证团队开发的质量？

> 考察候选人在技术把控上的管理方法，比如有没有安排代码code review的习惯等，有没有安排单元测试的习惯等。

5、现在团队只有你一个人，但是公司要求在2个月之内完成一个新项目，你有什么工作思路？

> 考察候选人的工作推进能力，能否借力和充分利用现有资源，比如可以通过自有资源快速建立团队，可以使用外包等。



6、在之前的开发中使用到那些新技术，对这种技术有什么看法？

> 考察候选人对新技术的应用情况及理解，同时考察候选人的学习能力。



7、觉得自身有哪些优点和不足，有哪些需要提升的地方？

> 通过候选人的回答来确定候选人的品行，是否诚实、谦逊为人等品行。



8、对新人怎么培训和管理，有没有什么方法？

> 通过候选人的回答，考察其有没有真正的带队经验，团队建设的能力。



9、在技术架构，技术选型的时候，主要考虑哪方面的因素，有哪些注意事项？

> 考查技术架构能力，比如能否根据业务不同选择不同的技术解决方案，有没有考虑并发、分库分表等方面。



10、对未来的职业规划？

考察候选人对自己的未来有没有清晰的计划和目标，如果一个技术经理、CTO对自己未来没有清晰的认识的话，单纯是为了挣钱而工作的话，建议慎重考虑。



11、有哪些技术标准规范是比较重要的？

【特定标准】具体包含哪些内容？



12、你认为项目管理最重要的是什么？



### 面试

面试需要知道

- 岗位的技术栈
- 团队的规模、话语权、重要性
- 工作时间
- 公司的行业信息和所处的地位
- 工作内容
- 项目的开发流程：从需求评审到发布上线，会经历哪些步骤
- 公司的代码规范制定以及技术分享的频率和形式(`code review`)
- 对于加班这块公司的规定是什么
- 接下来要做的项目是什么
- 公司或团队的发展方向

### 管理

[如果我是一线技术主管](<https://mp.weixin.qq.com/s/dPbxBLypSA94ZGPcmlD_xw>)

> 任务分配
>
> 重要&紧急：能力强的人处理
>
> 重要不紧急：给人提供锻炼机会
>
> 技术想法：给积极的人
>
> 无关重要：能力一般的人
>
> 
>
> 积极的人
>
> 1、主动发现、提醒、处理问题
> 2、即使是小事情也能做得好且有亮点
>
> 
>
> 做事
>
> 不仅完成基本的，还得完成额外的，考虑到更多的





## 英语

[英语学习](https://github.com/byoungd/English-level-up-tips-for-Chinese)

[An English Guide for Programmers](https://github.com/yujiangshui/An-English-Guide-for-Programmers?from=timeline&isappinstalled=0)

## 梯子

#### 被墙检查

- [国内](http://tool.chinaz.com/port)
- [国外](https://www.yougetsignal.com/tools/open-ports/)

# 杂

## 日常

### 动漫

#### 动画

悲惨世界

### 手机

#### Apple

##### 切换地区

苹果账号地区	上官网设置即可切换地区 

## 资源

[资源下载](https://www.gratisexam.com/microsoft/70-347-exam/)