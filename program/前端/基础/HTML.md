### 概述



### 基本元素

#### 元素简述

元素都可以是由于初始属性设置不同而产生
只要设置好属性，元素也可以自定义？
​通过设置属性可以让<hh></hh>==<div></div>

#### Header/Footer

header放在事物的开始

footer放在事物的结尾

> 所谓“事物”，不仅指页面
>
> 这对元素可以在文档中任何具有清晰开始和结尾的内容块中使用。这些内容块可以是表单、文章、文章中的某个部分、社交媒体网站上的帖子、卡片等



##### 应用

网站真正的header,footer

section的header,footer



#### Main

主内容，只能出现一次



#### Section

结构上来说，它基本上就是一个具有特殊的语义的 <div>。

\<section> 开启一个新的“sectioning content”区域，所以它可以有自己的 <header>、<footer>。



#### Aside

侧栏

#### blockquote

定义块引用



#### Cite

包含的文本对某个参考文献的引用



#### del

中划线



#### ins

下划线

#### Dialog



#### Label

文字，可解析html

#### Span

纯标签，可以用于提前内容作单独处理
跟div相比，少了display属性的设置

#### DIV

DIV直接使用“focus”和“blur”两个方法是无效的,需要修改可编辑属性才能

[div的blur事件](https://www.cnblogs.com/klbc/p/5303134.html)

#### form
参考：张鑫旭 35期DOM小测
通过事件阻止DOM提交、防止二次提交
通过formData获取DOM数据
通过form属性标记表单数据



Form 表单中单选/多选最好(或一定)要配合 <fieldset> 和 <legend> 标签使用

- legend == label 

- fieldset最外层包裹



#### Button

点击时不会让选中项失去焦点



#### Input

##### type

- text
- calendar
- email
- color	点击可以取色
- range	滑动条



```html
<input type="..." />
```

文本框选择所有文本select方法：select事件



##### inputmode

单纯设置type键盘可能仍会有多余的键盘

input设置type = "text"同时设置inputmode可以影响显示的键盘

Inputmode：“tel”、“email”、“decimal”、“url”、“search”和“ none” 



##### autocomplete

one-time-code: 触发短信验证码自动提示

username, email, new-password, 

current-password: 触发浏览器提示密码建议



#### Template

在使用前不会被渲染，不会执行加载等操作，也能够实现隐藏标签内容，而且位置任意性，可以在<head>中，也可以在<body>或者<frameset>中



#### abbr

用于必填校验设置



```html
<abbr title="required" aria-label="required">*</abbr>
```







#### A

```html
<a  href="..." target="..." ></a>
```

a标签默认是以当前网页的相对路径去跳转，如果要跳到其他页面则需要写上 http://xxxxxx  要把协议头写全download属性即可通过点击下载herf中的url文件
target="_blank" 在新窗口打开页面，如果是文件根据浏览器会打开或下载



可以作外部引用和内部引用
内部引用：页面内位置跳转



##### 应用

- 组合ul、li、a,可通过hover伪类实现输入框下拉的选中高亮，不需要js



#### IMG



##### 属性

**alt**：规定在图像无法显示时的替代文本

**size**

> 给浏览器提供一个预估的图片显示宽度
>
> 
>
> sizes="(max-width: 320px) 300w, 1200w"
>
> 浏览器视口为 320px 时图片宽度为 300px，其他情况为 1200px



**srcset**

> 浏览器根据宽、高和像素密度来加载相应的图片资源
>
> 
>
> srcset="big.jpg 1440w, middle.jpg 800w, small.jpg 1x"
>
> 浏览器宽度达到 800px 则加载 middle.jpg ，达到 1400px 则加载 big.jpg





#### Link

```html
<link  rel="stylesheet" type="text/css" href="..." />
```

##### 作用

1. 比如用于 SEO，主要给搜索引擎看的：

<link rel="canonical" href="...">
在网站中常有多个 url 指向同一个页面的情况，上述标签告知搜索引擎页面的主 url 是什么，以便搜索引擎保留主要页面而去除其他重复页面。

- 提供 rss 订阅的：

<link rel="alternate" type="application/rss+xml" title="RSS" href="...">
上述标签除搜索引擎可以看懂以外，也能被很多浏览器插件识别。



- 表示页面 icon 的：

<link rel="icon" href="https://xxx.png">
多数浏览器会读取这个 link 的资源并展示在页面上。



- 对页面提供预处理的：

<link rel="dns-prefetch" href="//xxx.com">
提前对一个域名做 dns 查询。强制对域名进行预读取在有的情况下很有用。



#### 注释

注释也是一个节点，可通过代码读取



#### IFrame

跨域iframe不能被父窗口操作



#### Meta

##### 简述

[能够放在文档的 <head> 中的各种配置元素](https://www.awesomes.cn/repo/joshbuchea/head)

一种通用的元数据信息表示标签，一般以键值对出现，如：

<meta name="xxx" content="yyy">


##### 属性

**charset** 

<meta charset="UTF-8">
从 HTML5 开始，上述写法被推荐使用，用于声明当前文档所使用的字符编码，推荐放在 <head> 中的第一位。


**http-equiv**

<meta http-equiv="content-type" content="text/html; charset=UTF-8">
在 HTML4 中，上述代码用于声明字符集，但是现在已不被推荐。

除了 content-type ，还有其他几个值：

content-language （已过时）、set-cookie （已过时）、default-style 、refresh 、content-security-policy



**name** 

其实 <meta> 标签可以被自由定义，只要读取和写入的双方约定好 name 和 content 的格式就可以了。来看一个例子：

<meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no">
上面这种用法并不在 HTML 标准中，但是却移动端开发的事实标准。这里来解释一下 content 中的内容：
- width：页面宽度，可以是一个正整数；也可以一个字符串 "device-width" ，表示跟设备宽度相等。

- height：页面高度，可以是一个正整数；也可以一个字符串 "device-height" ，表示跟设备高度相等。

- initial-scale：初始缩放比例。

- minimum-scale： 最小缩放比例。

- maximum-scale： 最大缩放比例。

- user-scalable：是否允许用户缩放。

name 属性的值除了可以是 viewport 之外，还有相当多的值：

application-name 、author 、description 、generator 、keywords 、referrer 、robots 等。



#### Nav

自动实现导航



#### Head



#### Base

Head子标签

给页面上所有相对 URL 的提供一个基础。一份文档中只能有一个 <base> 标签。



#### Script



<script src="test.js" type="text/javascript"></script>
用于嵌入或引用可执行脚本



##### 属性

**async**

使浏览器使用另一个线程下载脚本，这时不会阻塞页面渲染。当脚本下载完成后，浏览器会暂停渲染，执行脚本，执行完毕后继续渲染页面。

async 无法保证脚本的执行顺序，哪个脚本先下载结束就会先执行。

**defer**

同样会使浏览器并行下载脚本，但是下载完毕不会立即执行，而是会等到 DOM 加载完成后（即刚刚读取完 </html> 标签）再执行脚本。

defer 可以保证脚本的执行顺序就是它们在页面上出现的顺序。

**src**

定义引用外部脚本的地址，指定此属性的 script 标签内不应再有嵌入的脚本。如果脚本文件使用了非英语字符，还应该注明字符的编码。如：

<script charset="utf-8" src="https://www.example.com/script.js"></script>
**type**

默认值是 text/javascript



#### NoScript

如果页面上的脚本类型不受支持或者当前在浏览器中关闭了脚本，则在此中定义脚本未被执行时的替代内容。



#### Datalist

与 input 元素配合使用该元素，来定义 input 可能的值，根据input输入，只显示相关的options,options模糊筛选



#### Table



##### 属性

**cellpadding**：表格内容padding



**cellspacing**



**border**：表格边框宽度





#### Ul

一系列类似的内容，且不关心顺序，常用ul作结构

li默认不会根据内容进行伸缩？可设置成display: table



### 通用属性

#### for

label的for属性 + input的id可以让label和input进行关联，点击label聚焦到Input



#### Contenteditable

元素内容可编辑

#### Title

属性使用title可以在鼠标移动上去的时候就可以显示，可配合省略...
title 属性：规定关于元素的额外信息。
​	这些信息通常会在鼠标移到元素上时显示一段工具提示文本（tooltip text）

#### InnetHtml

返回所有子元素，也可用于插入元素

#### InnerText

所有子节点的文本拼接，赋值会替换所有子节点

#### ClassList

操作类名

#### Data-

data-xxx   是自定义属性，看浏览器支持

读取和操作自定义属性： dom对象.dataset.xxx

#### 按键

shiftkey,altkey,ctrlkey,metakey,检测是否按下对应按键



#### Accesskey

##### 说明

h5标准中的一个全局快捷键访问属性，通过在任意元素上注入accesskey属性值，在浏览器中触发相应的快捷键，即可实现对相应元素的focus或click；

##### 使用

Chrome:Alt + key触发不同系统、浏览器都不一致

### 通用事件

**onchange** 焦点离开才会触发 
**keydown**   键盘按下输入时就会触发，在按下生效前触发
**keyup**      键盘
**onpaste** 复制粘贴文件   onpaste事件
**focus**    焦点事件，调用可手动获取焦点?

#### 剪切相关事件

- beforecopy   复制前触发
- copy    
- beforecut
- cut
- beforepaste
- paste
- clipboarddata	剪切板对象数据，只有处理事件期间才有效

### 通用操作

#### click

element.click()可手动触发点击事件

#### onbeforeunload

页面关闭、刷新、浏览器关闭前会调用onbeforeunload,onbeforeunload 尽量进行同步操作，异步操作可能不稳定

#### 选择器

##### QuerySelector

#### 属性设置

.getAttribute('属性名')   取属性的默认值
.attributes	获取所有属性

#### 元素操作

dom.createElement("div)  单纯创建不会自动添加
appendChild()插入子元素
先选中，再使用removeChild(child)
remove()		自杀

元素.addEventListener('事件名',函数)
​	绑定事件
​	触发函数传入参数，就是触发的对象，event.tatget
classList.add('xxx')    添加类？
classlist.remove('xxx')移除类



### 进阶

#### 渲染树与DOM树

`DOM`：原始的html DOM元素，与 HTML 标签一一对应，包括 head 和隐藏元素

`渲染树`：HTML + CSS形成

> 渲染树不包括 head、script?、注释?... 和隐藏元素（display : none），大段文本的每一个行都是独立节点，每一个节点都有对应的 css 属性
>
> 
>
> visibility: hidden仍会占据空间，存在于渲染树；display : none则完全不渲染



#### 加载阻塞

##### css加载阻塞

- 不会阻塞DOM树的解析
  
    > why? 推断：DOM树的解析是内部数据操作，可以并行
    
- 会阻塞DOM树的渲染
  
    > why? 推断：css会影响页面的显示，避免重绘/回流故会等待css加载完，然后计算渲染树
    
- 会阻塞后面js语句的执行(不阻塞js加载？)
  
    > why? 推断：js会对DOM和css进行操作，导致重新渲染，防止冲突？



##### JS加载、解析与执行阻塞

- 会阻塞DOM构建
- 会等待CSSOM的下载和构建，再执行js

容易产生的问题：
- 当js、css都放在较前的地方，且css在js前，DOM解析时先加载css然后加载js,cssom的构建和js加载并行，然后js由于需等待cssom构建完毕并且阻塞DOM构建，最终导致dom的加载时间大大延长
 > 将js放到最后执行，则cssom和dom的构建则是并行，得到优化









### 文档模式

设置meta 标签	

```html
<meta  http-equiv="X-UA-Compatible" content="IE=IEversion">
<!-- IEversion的值：edge表示始终使用最新版本的ie，9、8、7....	高程p299 -->
```

### 事件

#### 基本说明

**冒泡事件**：往下触发，并且最上层先返回

> even.cancelBubble = true   取消冒泡
>
> 捕获模式，最底层先返回
> 模式设置   通过addevenlisten的第三个参数设置



#### addEventListener 

第三个参数是指定是否在捕获阶段触发事件相应函数，默认 false，即默认事件是在冒泡阶段触发



#### stopImmediatePropagation/stopPropagation

是否会执行当前节点剩余的事件



#### stopImmediatePropagation

作用在当前节点以及事件链上的所有后续节点上，目的是在执行完当前事件处理程序之后，停止当前节点以及所有后续节点的事件处理程序的运行



#### **stopPropagation**

作用在后续节点上，目的在执行完绑定到当前元素上的所有事件处理程序之后，停止执行所有后续节点的事件处理程序





### 视频、音频

旧的html需要flash

controls属性可以提供开始，暂停，滑动条等



#### 视频

mp4视频封装,把画面和音频封装在一起



##### 属性

**source**： 视频源，可以设置多个source，解决浏览器支持问题





#### 音频

与video一样用法,含有api操作



##### 属性

volume
​playbackrate

##### 方法

play()
pause()

### 画图

#### canvas	

​	用于游戏等
​	particles.js	原子,粒子特效	
​	phase.js	做游戏的库

#### webgl	

​	游戏



### Shadow DOM

#### 简述

Shadow DOM允许在文档（document）渲染时插入一棵DOM元素子树，但是这棵子树不在主DOM树中，Shadow DOM可嵌套，Shadow DOM内嵌入Shadow DOM

#### 特点

**默认隐藏**

需Chrome 的开发者工具，点击右上角的`Settings`按钮，勾选`Show user agent shadow DOM`



**根节点**

`#shadow-root`，影子根



**隔离性**

Shadow DOM和主DOM间存在边界，主 DOM写的 CSS 选择器和 JavaScript 代码都不会影响到Shadow DOM



**事件重定向/阻塞**

click:影子DOM绑定的事件，在触发时触发元素会被定向到主元素的影子DOM父节点

abort、 error、 select 、change 、load 、reset 、resize 、scroll 、selectstart: 不进行重定向，被取消



#### 使用

```js
element.createShadowRoot();
```



#### 应用

##### 如何通过主DOM影响影子DOM?

**1、content + template**

- 需<content>和<template>配合才能实现？？？（推断：不一定，利用js动态创建content？）

- <content>:select属性为CSS选择器， 被select选中的元素会被content引用

- <template>:提前定义模板

- 最终将content内容拷贝到影子DOM中即可使用主DOM的元素内容



**2、::shadow**

通过::shadow设置的样式可影响影子DOM内的元素，但只能穿透一层边界
```css
主DOM中影子DOM Selector::shadow 影子DOM内元素Selector {}
```



**3、/deep/**

样式可穿透多层影子边界影响

```css
主DOM中影子DOM Selector/deep/ 影子DOM内元素Selector {}
```



##### 如何通过影子DOM影响主DOM?

- :host(x): 定义宿主样式、可被宿主覆盖,x为选择器
- ::content:对通过content复制到影子DOM内的元素的样式产生影响



### 应用

#### 语义化

```html
<header>
    <h1>Super duper best blog ever</h1>
    <nav><a href="/">Home</a><a href="/about">About</a><a href="/archive">Archive</a></nav>
</header>
<main>
    <article>
    <header><h1>Why you should buy more cheeses than you currently do</h1></header>
    <section>
        <header><h2>Part 1: Variety is spicy</h2></header>
        <!-- cheesy content -->
    </section>
    <section>
        <header><h2>Part 2: Cows are great</h2></header>
        <!-- more cheesy content -->
    </section>
</article>
</main>
<footer>
    <section class="contact" vocab="http://schema.org/" typeof="LocalBusiness">
        <h2>Contact us!</h2>
        <address property="email">
            <a href="mailto:us@example.com">us@example.com</a>
        </address>
        <address property="address" typeof="PostalAddress">
            <p property="streetAddress">123 Main St., Suite 404</p>
            <p>
                <span property="addressLocality">Yourtown</span>,
                <span property="addressRegion">AK</span>,
                <span property="postalCode">12345</span>   
            </p>
            <p property="addressCountry">United States of America</p>
        </address>
    </section>
</footer>
```





#### 登陆

form + button(submit) 

> 好处：点击自动提交，可以通过enter提交
>
> 登陆标题
>
> - fieldset + legend	语义化标签
> - <fieldset><legend></legend></fieldset>
> - h3/hx
> - div
>
> 
>
> 输入框
>
> - p
> - 会自动隔开一定距离
> - div



input

> - 默认类型是text
> - reqiure语义化，可自动增加必填提示
> - form中增加novalidate，自带提示不好看，通过属性去除
> - name 可提示历史输入
> - autocomplete="off"关闭历史提示
> - autofocus使用tap时第一个选中，防止导航等因素影响
> - 有兼容性问题，会受js影响
> - tapindex
> - 弥补autofocus的缺点，且可以设置自定义的tap选中顺序



span标签

> 无法通过tap来选中





### H5

#### Device API

**dial**: 拨打电话

**beep**: 发出蜂鸣声

**vibrate**: 设备振动

**setWakelock**: 设置应用是否保持唤醒（屏幕常亮）状态

**isWakelock**: 获取程序是否一直保持唤醒（屏幕常亮）状态

**setVolume**: 设置设备的系统音量

**getVolume**: 获取设备的系统音量



#### 应用程序缓存与浏览器缓存

浏览器缓存

> 针对单个文件,H5离线缓存针对整个应用



H5缓存(已废弃)

> 断网还能用,浏览器缓存断网就用不了，核心是applicationCache对象,浏览器缓存核心是cache-control



service worker

> 替代H5缓存，H5缓存已被废弃