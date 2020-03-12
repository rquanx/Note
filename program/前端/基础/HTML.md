### 概述



### 基本元素

#### 元素简述

元素都可以是由于初始属性设置不同而产生？
只要设置好属性，元素也可以自定义？
​	通过设置属性可以让<hh></hh>==<div></div>?

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

会解析html

#### Span

纯标签，可以用于提前内容作单独处理
跟div相比，少了display属性的设置

#### DIV

DIV直接使用“focus”和“blur”两个方法是无效的,需要修改可编辑属性才能

[div的blur事件](https://www.cnblogs.com/klbc/p/5303134.html)

#### form
张鑫旭 35期DOM小测
通过事件阻止DOM提交、防止二次提交
通过formData获取DOM数据
通过form属性标记表单数据

#### Button

点击时不会让选中项失去焦点

#### Input

##### type

text
calendar
email
color	点击可以取色
range	滑动条



```html
<input type="..." type="..." />
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

alt属性：规定在图像无法显示时的替代文本

size

> 给浏览器提供一个预估的图片显示宽度
>
> 
>
> sizes="(max-width: 320px) 300w, 1200w"
>
> 浏览器视口为 320px 时图片宽度为 300px，其他情况为 1200px



srcset

> 浏览器根据宽、高和像素密度来加载相应的图片资源
>
> 
>
> srcset="big.jpg 1440w, middle.jpg 800w, small.jpg 1x"
>
> 浏览器宽度达到 800px 则加载 middle.jpg ，达到 1400px 则加载 big.jpg



#### Script

```html
<script src="test.js" type="text/javascript"></script>
```

#### Link

```html
<link  rel="stylesheet" type="text/css" href="..." />
```

##### 作用

1. 比如用于 SEO，主要给搜索引擎看的：

<link rel="canonical" href="...">
在网站中常有多个 url 指向同一个页面的情况，上述标签告知搜索引擎页面的主 url 是什么，以便搜索引擎保留主要页面而去除其他重复页面。



1. 提供 rss 订阅的：

<link rel="alternate" type="application/rss+xml" title="RSS" href="...">
上述标签除搜索引擎可以看懂以外，也能被很多浏览器插件识别。



1. 表示页面 icon 的：

<link rel="icon" href="https://xxx.png">
多数浏览器会读取这个 link 的资源并展示在页面上。



1. 对页面提供预处理的：

<link rel="dns-prefetch" href="//xxx.com">
提前对一个域名做 dns 查询。强制对域名进行预读取在有的情况下很有用。



#### 注释

注释也是一个节点，可通过代码读取

#### IFrame

跨域iframe不能被父窗口操作

#### Meta

[能够放在文档的 <head> 中的各种配置元素](https://www.awesomes.cn/repo/joshbuchea/head)

一种通用的元数据信息表示标签，一般以键值对出现，如：

<meta name="xxx" content="yyy">



charset 属性

<meta charset="UTF-8">
从 HTML5 开始，上述写法被推荐使用，用于声明当前文档所使用的字符编码，推荐放在 <head> 中的第一位。



http-equiv属性

<meta http-equiv="content-type" content="text/html; charset=UTF-8">
在 HTML4 中，上述代码用于声明字符集，但是现在已不被推荐。

除了 content-type ，还有其他几个值：

content-language （已过时）、set-cookie （已过时）、default-style 、refresh 、content-security-policy



name 属性

其实 <meta> 标签可以被自由定义，只要读取和写入的双方约定好 name 和 content 的格式就可以了。来看一个例子：

<meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no">
上面这种用法并不在 HTML 标准中，但是却移动端开发的事实标准。这里来解释一下 content 中的内容：

width：页面宽度，可以是一个正整数；也可以一个字符串 "device-width" ，表示跟设备宽度相等。

height：页面高度，可以是一个正整数；也可以一个字符串 "device-height" ，表示跟设备高度相等。

initial-scale：初始缩放比例。

minimum-scale： 最小缩放比例。

maximum-scale： 最大缩放比例。

user-scalable：是否允许用户缩放。

name 属性的值除了可以是 viewport 之外，还有相当多的值：

application-name 、author 、description 、generator 、keywords 、referrer 、robots 等。



#### Nav

自动实现导航



#### Head



#### Base

Head子标签

给页面上所有相对 URL 的提供一个基础。一份文档中只能有一个 <base> 标签。



#### Script

用于嵌入或引用可执行脚本。来看几个 script 标签常见的全局属性：

1. async

使浏览器使用另一个线程下载脚本，这时不会阻塞页面渲染。当脚本下载完成后，浏览器会暂停渲染，执行脚本，执行完毕后继续渲染页面。

async 无法保证脚本的执行顺序，哪个脚本先下载结束就会先执行。

1. defer

同样会使浏览器并行下载脚本，但是下载完毕不会立即执行，而是会等到 DOM 加载完成后（即刚刚读取完 </html> 标签）再执行脚本。

defer 可以保证脚本的执行顺序就是它们在页面上出现的顺序。

1. src

定义引用外部脚本的地址，指定此属性的 script 标签内不应再有嵌入的脚本。如果脚本文件使用了非英语字符，还应该注明字符的编码。如：

<script charset="utf-8" src="https://www.example.com/script.js"></script>
1. type

默认值是 text/javascript



#### NoScript

如果页面上的脚本类型不受支持或者当前在浏览器中关闭了脚本，则在此中定义脚本未被执行时的替代内容。



#### Datalist

与 input 元素配合使用该元素，来定义 input 可能的值，根据input输入，只显示相关的options,options模糊筛选



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

onchange 焦点离开才会触发 
keydown   键盘按下输入时就会触发，在按下生效前触发
keyup      键盘
onpaste 复制粘贴文件   onpaste事件
focus    焦点事件，调用可手动获取焦点?

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



### 文档模式

设置meta 标签	

```html
<meta  http-equiv="X-UA-Compatible" content="IE=IEversion">
<!-- IEversion的值：edge表示始终使用最新版本的ie，9、8、7....	高程p299 -->
```

### 事件

#### 基本说明

冒泡事件，往下触发，并且最上层先返回
​	even.cancelBubble = true   取消冒泡
捕获模式，最底层先返回
模式设置   通过addevenlisten的第三个参数设置



### 视频、音频

旧的html需要flash

controls属性可以提供开始，暂停，滑动条等

#### 视频

​		controls控制器属性   source 视频源
​		可以有多个source，解决浏览器支持问题

mp4视频封装,把画面和音频封装在一起

#### 音频

​		和video一样用法,含有api操作
​		属性
​			.volume
​			.playbackrate
​		方法
​			.play()
​			.pause()
​			....

### 画图

#### canvas	

​	用于游戏等
​	particles.js	原子,粒子特效	
​	phase.js	做游戏的库

#### webgl	

​	游戏

### 存储

#### 本地存储

​	localstorage
​		需要使用clear,remove来主动删除
​	每个页面都有自己的localstrorage，即使关闭浏览器重新打开还是会有
​	默认最大5M,只能存储string	

sessionstorage
​		关闭浏览器后被删除



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

dial: 拨打电话

beep: 发出蜂鸣声

vibrate: 设备振动

setWakelock: 设置应用是否保持唤醒（屏幕常亮）状态

isWakelock: 获取程序是否一直保持唤醒（屏幕常亮）状态

setVolume: 设置设备的系统音量

getVolume: 获取设备的系统音量



#### 应用程序缓存与浏览器缓存

浏览器缓存

> 针对单个文件,H5离线缓存针对整个应用



H5缓存(已废弃)

> 断网还能用,浏览器缓存断网就用不了，核心是applicationCache对象,浏览器缓存核心是cache-control



service worker

> 替代H5缓存，H5缓存已被废弃