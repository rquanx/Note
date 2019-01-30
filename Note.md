# 知识点

## OverView



[TOC]

# 编程语言

## javascript

### 基本语法

#### 简介

ES2015（ES6）

#### 基本类型

##### 概述

当访问变量时,虽然基本类型不是对象，但是调用方法时会自动产生一个对象，从而实现调用方法,执行完马上销毁对象

```javascript
var s  = "1"; 
var s2 = s.xxxx();
/*
内部细节
1、创建string实例
2、在实例上调用函数
3、销毁实例
*/

// 语法错误会可能导致整段代码无法运行
```

##### number

避免了短整型溢出
infinity表示大于1.79.....e+308的值
Number(xx)  和 new Number(xx)  不同,一个是类型转换

##### 字符串

 ${name}字符串模板进行拼接，ie不兼容

##### Null

null === 没有对象，object原型的原型就是null



#### 循环

##### for

```javascript
// for of  本质通过迭代器(symbol.iterator)的next()   可自定义
for(var i of array) { 
    
}  

// for in 遍历所有可枚举的属性
for(var i in obj) {
    
}



```

#### 小知识点

##### 逻辑运算

a || b       结果返回其中为真的值，按顺序判断
​	if( "123" || "456")  ==> "123"
a && b    a、b均为真 返回b,否则返回a
==  可进行隐式变换    === 不进行隐士变换
​	坑0 == "\n"  // true

##### Arguments

es6废除了arguments

#### 注释

块注释和正则表达式可能会有冲突

#### 模块

import自动置顶，提前运行
import是静态的，不能运算

##### default

​	不使用default的话，需要知道变量名才能加载

​	export default y   	import k from 'xxx'   不需要知道变量名即可加载

​	

##### 使用

整体加载:：import * as x

在一个js中有多个export时,import * as x;  可以使用x.xx获取

export{x}     import{x}  from path 	可以直接使用x

import{x as y} from xxx 重命名引入的变量
​		如果xxx不是路径，只是一个模块名，则需要提前进行配置

export {x,y,xxx}   import {xxx}	会自动解析出来对于的模块



#### 函数

arguments.callee   指向当前函数声明的==>函数名，由于函数名是一个存储指针的变量如果在内部使用函数名即变量名进行调用，后续如果变量名改变了那么就可能会影响内部，使用callee则可避免

caller属性  记录着被调函数的引用，
​	函数名.caller
​	arguments.caller
​	arguments.callee.caller 
​	可能已被禁用

##### 匿名函数

没有name标识符，这会导致：

- 调试栈更难追踪；
- 自我引用（递归、事件（解除）绑定，等等）更难；
- 代码（稍微）更难理解。



#### 类型判断

##### typeof

##### instanceof

使用前提：需要可以在作用域中找到对应的类声明  
只对对象有效对基本类型无效

```javascript
var caml = new Caml()
caml instanceof Caml     //  ==>   true
caml instanceof Object   //  ==>   true
```



#### This

this会自动绑定为依赖的对象
例:全局调用函数，依赖的是window对象
obj.xxx()调用函数，依赖的是obj



#### 对象

##### defineProperty

```javascript
var obj = {};
obj.defineProperty(x,y,z);	
	/*
	三个参数分别是对象，属性名，这个属性的特性配置
	特性{  writable: boolean  ,value:  any ,configurable:  boolean , enumerable: boolean  }
	分别是值是否可以修改，对应的值，是否可以delete和访问器设置，是否可以被for-in遍历
	
	访问器
		setter,getter
		在特性配置中get,set
	*/
```

##### hasownproperty

只能访问到实例的属性，访问不到原型的属性

##### haspropertyproperty 

只可以访问到原型属性

##### getownpropertyNames

包含不可枚举的属性，但也仅限于实例拥有的

##### 属性访问

```javascript
// in操作符,即使属性在原型也可以检查到
var obj = { a: 1};
"a"  in obj ? 1 : 0;

// object.keys() 要获取所有可枚举的属性
var propertys = object.keys(obj); 

// for in 只能获取实例所拥有的属性
for(var i in obj) { console.log(i,obj[i]) };
```

##### 访问器

```javascript
var obj = { 
	get a() {  return x }
	set a(val) {
	xxx
	}
 }  
// 设置get和set后对属性的访问会变成调用函数
```

### 原型、类

#### 概述

原型(可类比父类)是一个对象他的构造函数指向对应的function，是由这个function实例化的对象
​	原型的property又指向它的父原型
​	function又有property属性，它指向的是实例化的原型

原型是一个实例

ES5：
通过xx.property.x = xx   定义的属性是所有实例共享的
​	如果实例重新设置可以屏蔽原型的属性，但如果是引用值,修改它的内容会影响所有的实例



\__proto__  原型链属性,指向原型
​	修改\__proto__对象的属性
​	所有对象都有

prototype

```javascript
new F().__proto__ === F.prototype
```

​	构造函数的prototype指向原型
​	构造函数，函数才有

#### 原型链

原型指向的是一个对象

#### 构造函数

寄生构造函数？
​	和工厂模式一模一样
​	可用于对一个类进行特定的修饰，而又不想影响它原本的构造函数时使用

借用构造函数
​	通过原型链继承后，所有的属性都会被共享，对于引用类型就又产生问题了
​	通过借用构造函数，即在内部调用父类的构造函数，对其重新进行初始化，这样对于引用类型就会产生新的副本，从而避免
​	但是这样就又不能对函数进行复用

组合继承：原型链实现方法的继承，借用构造函数实现属性的复制继承，但会调用两次父类构造函数

寄生式组合继承: 最理想的方式



#### 应用

##### 模拟抽象类

构造函数中抛出异常来防止不重写直接调用

### 作用域

#### 说明

#### 原理

#### 小知识点

{    }手动给let添加块作用域，回收垃圾

prototype方法无法访问 构造函数var 变量，作用域，无法访问

#### 闭包

##### 说明

###### 防止污染全局变量



###### 模块化

​	通过闭包返回值，可以实现私有变量；隐藏对象api;

##### 原理

​	利用了js的作用域,在外部通过特定的方式使用了闭包函数内的作用域

##### 示例

###### 模块化

```javascript

/** 模块化 */
var module = (function() { 
	var private = ""; 
	function privateFun () {
	// any Code
	}; 
    
    function setPrivate(value) {
        private = value;
    }
    
    return {
        value : privateFun,
        setPrivate: setPrivate
    }
	})();

module.value();

/** 模块化注入参数 */
var argModule = (function(jquery) { 
    var inject = jquery; 
    return { } 
})($);

```

###### 私有变量

[私有变量实现方式](https://juejin.im/post/5bf41990e51d4552ee424d2c)

### 常用基本对象

#### Global

所有全局的属性和函数都是在global下的,global又是window对象的一部分,形成循环引用

##### 内置方法

编码：
编码作用：
将url进行编码，方便发送给服务器，当含有非法字符(有效的URI不能包含某些字符)时也可以替换

encodeURI   编码时会忽略某些特殊编码
encodeURIComponent	全部编码
decode...



#### Array

array.sort   返回 1，0，-1      1则放后面，-1就放前面

slice(0,3)  从0到第三个  切出3个
slice(1,3)	从0到第三个 切除2个    头不包含
slice(start,end)     

splice可以对数据进行删除，替换，插入

数组一般方法
every
filter
foreach
map
some
reduce(f(pre,cur,index,arr))
红书P96   传入函数f (item,index,arr)  后两个参数没用到可忽略

[js数组操作](https://www.itcodemonkey.com/article/9916.html)

```javascript
// 判断是否是数组
var x = [];
Array.isArray(x);
```

##### map

```javascript
var list = [1,2,3];
// 遍历list的长度此，并且将return的结果拼接成数
list.map((item,index) => { return 1; }) // ==> [1,1,1]

// 手动实现
list.map = function(fn) {
    var result = [];
    this.foreach((item,index) => {
        result.push(fn(item,index));
    });
    return result;
}
```







#### Date

使用set函数可以设置日期 
日期间可以直接通过运算符进行比较
new的时候可以传入日期产生对应的(低版本ie对格式有要求)

new date(xxxx-xx-xx)   会自动调用date.parse(xxxx-xx-xx)

Date()构造函数是有日期字符串可能会出问题	

```javascript
// 可接受年月日时分秒参数，是本地时间。
new Date(year, month[, day[, hour[, minutes[, seconds[, milliseconds]]]]]);
```

// 构造时设置day为0，读取getdate可以读取对于月份的天数

#### File

```javascript
// file slice  可以变成blob
// filesaver保存文件

var blob = new Blob([data]);
SaveAs(blob, fileName);

// 文件重命名
// 修改input file 的文件对象 的属性，修改文件名. ie不可以进行重命名
var newFile = new File([file],name)
```



#### Math

##### 概述

数学、计算对象

##### 方法

ceil()	向上取整
floor()   向下
round()   四舍五入

#### Regex

设置正则表达式时不能随便添加空格

/xxx/mode
mode
g全局，匹配所有的，否则只匹配一个
i不区分大小写
m多行
红书p104

##### 网站

[regexr正则拼接测试](https://regexr.com/)

[regex101拼接测试生成](https://regex101.com/)

[Debuggex](https://www.debuggex.com/)

[Regexper](https://regexper.com/)

#### Promise

- promise中调用resolve()不等于结束，后续代码也会执行   resolve()不是return,所以函数剩下的内容还是会执行
- 连续多次resolve()或reject()
  Promise 只能 resolve 一次，剩下的调用都会被忽略。 所以 第二次的 resolve('success2'); 也不会有作用。
- Promise.resolve 方法的参数如果是一个原始值，或者是一个不具有 then 方法的对象，则 Promise.resolve 方法返回一个新的 Promise 对象，状态为resolved，Promise.resolve 方法的参数，会同时传给回调函数。
- then 方法接受的参数是函数，而如果传递的并非是一个函数，它实际上会将其解释为 then(null)，这就会导致前一个 Promise 的结果会穿透下面（即使是promise对象也不行）
- fanilly会返回上一个promise的值包装成的新promise，并且finally也不接收参数，上一个参数传递到下一步去

#### Json

对象数据转json字符串    JSON.stringify(this._cellData)	对象会被序列成json字符串   
字符串转json     eval(""+ ？+"")或 JSON.parse?



### 其他内置对象

#### XML对象

```javascript
// 以字符串创建xml dom对象
var parser = new DOMParser(); 
var xmlobject = parser.parseFromString(s, "text/xml"); 

// 创建xml dom对象
// https://developer.mozilla.org/en-US/docs/Web/API/DOMImplementation/createDocument
var body = document.createElementNS('http://www.w3.org/1999/xhtml', 'body');

// dom对象转字符串
(new XMLSerializer()).serializeToString(x)
```



#### BOM

##### 概述

全称：brower object model

##### Location

管理URL对象,读取，改变，跳转

- .host	主机地址	xxx.xxx.com

- .href		url

- .port		读取或修改访问端口

- .protocol		协议

- .search	修改或取得？和之后的参数信息

- .reload()		刷新(可能会读缓存)，给一个参数true会刷新缓存

- .replace(url)	页面替换，跳转但不会产生记录

- .assign(url)     打开新的url

  - location.href = url,window.location = url   都回调用assign 

- .hash            最后追加/xxx。不重新加载页面，会产生新的历史记录

- .hostname      读取或修改  www--com这段

- .pathname     读取或修改com后的/xx

##### 应用

[[535种使用JavaScript重新加载页面的方法](https://segmentfault.com/a/1190000017376047)](https://segmentfault.com/a/1190000017376047?utm_medium=hao.caibaojian.com&utm_source=hao.caibaojian.com&share_user=1030000000178452)


##### Navigator

管理浏览器信息

- .userAgent	查出运行在什么设备
- .platform		运行系统
- .plugins	查看安装的插件（非IE）
- .registerProtocolHandler()	注册处理程序  让站点指明它可以处理特定类型的信息



##### History

管理历史记录

- .length		长度
- .back()		后退
- .forward()		前进
- .go(x)		根据正负数，前进或后退x步，前进、后退或跳转历史记录
- .pushState	改变链接地址但不跳转

##### Screen

管理屏幕

##### Window

管理所有浏览器的东西，对象根节点
每个框架都会有自己的window(Iframe属于一个框架)

- .open(url,target,features)    可以导航到特定url或者打开新窗口
  - target ="x"  可以把页面加载到对应的target上，如果没有则新开窗口并且命名为x
  - _self,_parent,_top,_blank是特殊的窗口名称
  - 通过.open()的返回值可以判断 弹框是否被屏蔽,如果浏览器是禁止弹框的话open会抛异常
- .close()  只能打开通过open打开的窗口

##### Top

始终指向最外层的框架

##### Parent

始终指向当前框架的直接上层框架,没有框架时parent === top === window

##### self

始终指向window

#### DOM

##### Document

- documentFrament  在批量添加元素时，可通过片段直接添加，避免反复渲染

### 内置方法

#### SetTimeOut

settimeout告诉js多长时间后把这个任务加入到队列中，如果队列没有任务会马上执行，否则等待，会返回id用于取消

建议用settimeout来模拟setinterval ，因为setinterval有可能在前一次没完成前就又来了第二次



#### 弹框

- alert
- confirm
- prompt



### 异步请求

#### XML

XMLHttpRequest(XHR)，jQuery实现的AJAX，Primise实现Fetch

```javascript
var x = new XMLHttpRequest()				// 建立对象
x.open("GET",'url',true)						// 设置方式
xsetrequestheader(‘content-type’,'appliction/json')	// 设置数据格式
x.onreadystatechange = function(data){			 // 回调函数
}											// readystate状态有各种意思
x.send(data)									// 发送请求

// readystate	响应状态
// responseurl	服务器地址
// responseText  返回的原始信息
```



##### Ajax



[ajax请求二进制流](https://www.cnblogs.com/cdemo/p/5225848.html)



##### Fetch

##### 说明

使用时注意兼容性,fetch实现依赖于promise

##### 示例

```javascript 
fetch(url, options)
    .then(function(response) { 
	// handle HTTP response
}, function(error) {
 	// handle network error
})
```





#### 跨域

### 事件模型

微任务优先于宏任务执行？

### JS编写规范

#### 三目运算符

```javascript
// 三目运算符使用
// bad
const foo = a ? a : b;
const bar = c ? true : false;
const baz = c ? false : true;

// good
const foo = a || b;
const bar = !!c;
const baz = !c;
```

#### 注释规范

#### [jsdoc](https://www.tslang.cn/docs/handbook/type-checking-javascript-files.html)

### 运行处理



vo顺序
函数参数
函数声明
变量声明

[javascript 从定义到执行，你不知道的那些事](http://www.webhek.com/post/javascript-from-define-to-execute.html)

### JS应用

#### 拦截注入JS

js请求拦截,重定向至自定义js，从而使页面加载自定义的js

#### 变量监听

监听，绑定Object.defineProperty

#### DIV拖动

可拖拽 onmousedown + onmouseup + onmousemove 
onmousedown 获取拖拽对象原始位置
onmousemove  更新拖拽对象位置，增加移动样式
onmouseup 清楚拖拽对象，卸载样式
以上3个事件可实现div可拖拽
但会有小问题

为更加稳定和流畅
改用drag相关事件较好

#### 即使搜索下拉

[方案1](https://www.jb51.net/article/94401.htm)
通过给失焦事件设置延迟触发。

[方案2](https://blog.csdn.net/ligang2585116/article/details/51764828)
将按钮的点击（click）事件改为按下（mousedown）事件

#### 拖拽上传

建议使用 drag事件

```javascript
window.onload =  function () {
    document.addEventListener("dragleave", function (e) {
    e.preventDefault();
  }, false);
    
  document.addEventListener("drop", function (e) {
    e.preventDefault();
  }, false);
    
  document.addEventListener("dragenter", function (e) {
    e.preventDefault();
  }, false);
    
  document.addEventListener("dragover", function (e) {
    e.preventDefault();
  }, false);
    
  var box = document.getElementById("drag");    //一个div
  box.addEventListener("drop", function (e) {
    e.preventDefault(); //取消默认浏览器拖拽效果
    var fileList = e.dataTransfer.files; //获取文件对象
    if (fileList.length == 0) { return false; }
    //var img = window.URL.createObjectURL(fileList[0]);
    var filename = fileList[0].name;
    //var Datatype = filename.split(".")[1];
    //var formData = new FormData();
    //formData.append("name", fileList[0], Datatype);  //name:为一半表单上传时的元素name是和后台约定好的
  }, false);
}
```

#### excel解析

[js  excel解析 ](https://www.cnblogs.com/yinqingvip/p/6743213.html)

#### 操作Object标签

[js获取object标签对象失败](https://haizhiyan.iteye.com/blog/1262351)
​	被包裹在form标签内，不能直接读取，只能通过dom api拿到元素，一样

#### 复制粘贴

[Javascript中的复制粘贴功能](http://blog.poetries.top/2018/12/23/js-copy/?utm_medium=hao.caibaojian.com&utm_source=hao.caibaojian.com)

#### 图片

[图片简介和前端图片优化](https://segmentfault.com/a/1190000017481260)

[js压缩](https://www.cnblogs.com/007sx/p/7583202.html)

#### js可视化

[可视化js运行](http://latentflip.com/loupe/?code=JC5vbignYnV0dG9uJywgJ2NsaWNrJywgZnVuY3Rpb24gb25DbGljaygpIHsKICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gdGltZXIoKSB7CiAgICAgICAgY29uc29sZS5sb2coJ1lvdSBjbGlja2VkIHRoZSBidXR0b24hJyk7ICAgIAogICAgfSwgMjAwMCk7Cn0pOwoKY29uc29sZS5sb2coIkhpISIpOwoKc2V0VGltZW91dChmdW5jdGlvbiB0aW1lb3V0KCkgewogICAgY29uc29sZS5sb2coIkNsaWNrIHRoZSBidXR0b24hIik7Cn0sIDUwMDApOwoKY29uc29sZS5sb2coIldlbGNvbWUgdG8gbG91cGUuIik7!!!PGJ1dHRvbj5DbGljayBtZSE8L2J1dHRvbj4%3D)

#### 常用技巧

[前端常用数据类型转换](https://juejin.im/post/5c00e8a66fb9a049db72dbd0)

### TypeScript

#### 安装

  安装ts声明文件  cnpm i @types/react-router-dom

#### 语法

declare var SP: any;
​	可以去掉引用外部js东西时报错

#### 使用

##### 预声明

模块的预声明.d.ts，要和对应模块在同一路径下
​	/caml.js
​	/caml.d.ts     声明对于js的一些定义，方便编译器提示

##### 别名

import ObserverableArray = kendo.data.ObservableArray;
type  str  = string;

[typescript的一些基础说明](https://www.jianshu.com/p/103933b7c2b4)

[typescript一些小细节说明，文档生成](http://taobaofed.org/blog/2017/03/09/head-first-typescript/)

##### 配置

tsconfig.json allowjs : true  ts会提供一些类型检查和智能提示  

[tsconfig.json](http://www.css88.com/doc/typescript/doc/handbook/tsconfig.json.html)

### NodeJS

[import默认文件](https://www.cnblogs.com/goloving/p/8889585.html)

### 文章

[前端基础进阶系列，只看原型](https://www.jianshu.com/p/cd3fee40ef59)



## HTML

### 概述



### 基本元素

#### 元素简述

元素都可以是由于初始属性设置不同而产生？
只要设置好属性，元素也可以自定义？
​	通过设置属性可以让<hh></hh>==<div></div>?

#### Label

会解析html

#### Span

纯标签，可以用于提前内容作单独处理
跟div相比，少了display属性的设置

#### DIV

DIV直接使用“focus”和“blur”两个方法是无效的,需要修改可编辑属性才能

[div的blur事件](https://www.cnblogs.com/klbc/p/5303134.html)

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

#### A

```html
<a  href="..." target="..." ></a>
```

a标签默认是以当前网页的相对路径去跳转，如果要跳到其他页面则需要写上 http://xxxxxx  要把协议头写全download属性即可通过点击下载herf中的url文件
target="_blank" 在新窗口打开页面，如果是文件根据浏览器会打开或下载

#### IMG

alt属性：规定在图像无法显示时的替代文本

#### Script

```html
<script src="test.js" type="text/javascript"></script>
```

#### Link

```html
<link  rel="stylesheet" type="text/css" href="..." />
```



#### 注释

注释也是一个节点，可通过代码读取

#### IFrame

跨域iframe不能被父窗口操作

#### Meta

[能够放在文档的 <head> 中的各种配置元素](https://www.awesomes.cn/repo/joshbuchea/head)

### 通用属性

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

## CSS

### 基础

#### Link标签

##### 属性

media

> 可以设置不同的值来表示这个文件用于不同的设备

rel

> 可设置为候选样式，候选样式表可供用户选择切换，跟title关联



#### @import

引入css文件 

```css
<style type="text/css">
@import url(CSS文件路径地址);
</style>

```



#### 盒模型

除inline元素外，每个元素都有盒模型，inline设置了也无效
​	margin   与别人的距离
​	border	边框
​		solid
​	padding	内容与边框的距离

#### 占位

元素占的区域因素display
​	block   块元素  必须独占一行
​	inline-block	可以和别人同行的块元素，可设置宽高
​	inline	只占元素大小的空间，一般不可设置宽高

#### 定位

##### position	元素定位

​	static	默认
​	relative	相对定位
​		修改坐标时相对原本的位置更改	
​		改变坐标时不会对其他元素产生影响	
​	absolute	绝对定位	
​		以第一个非static的父元素作参考，然后根据坐标设置标号
​		页面滚动也会固定在那个位置
​	fiex	基于窗口绝对定位，不管怎么滚动，总是处于窗口的指定位置
​		窗口，===随滚动走

非static 可用 top.bottom....设置坐标，用z-index设置显示层次

##### 层次

##### z-index   

当多个元素重叠时，会被后来的盖住，通过设置z-index的大小来定义谁覆盖的层次级，可随意设置，数字越大层次越高

#### 浮动

##### overflow

​	hidden		对于溢出区域的内容隐藏
​	visible		默认
​	atuo			溢出时自动加滚动条	
​	scroll		强制滚动条，横向竖向都加

#### 边框

##### border

​	border:width color style		三个值时分别代表
​		border-width
​		border-color
​		border-style
​	对于上下左右都有以上三个属性
​		border-radius
​		width = height   
​		boder-radius:50% 切成圆
​		设置%可以切圆，px则是其他

#### 背景

##### background

-repeat	将图片复制，铺满整个页面
-image	图片
-color	颜色
-attachment	背景是否随页面滚动

#### 优先级

##### 样式优先级

！important > 内联(元素标签) > style(head标签) > link(外部文件)
同级的 后一个会覆盖前一个

##### 选择器优先级

！important > 内联 > id选择器 > class选择器  > 元素选择器
​	当一个元素被多个不同级别的css选中，且冲突时，根据优先级  

#### 动画

  transition : arg1 arg2 ,arg1 arg2		可以一次设置多个属性效果
​	arg1  哪个属性变化后产生动画
​	arg2	 动画持续时间

transform:translateY(-50%)		以自身原本为参考，往上移动50%  

### 应用

#### 项目css编写方式

- .以块+元素命名。 class="Contains-Div-Input ...."	简明，量大，不易复用
- 以功能效果命名,然后将功能进行组合。 class = " bg-xxx   size-xxx .... "  复用，易懂，明显

#### 菜单伸展

​	可以通过js动态增删 一个隐藏的类来完成

#### 居中

block居中  margin:0 auto
inline inline-block居中	text-align:center	

outline类似于border但不会影响布局  

### 杂

#### 站点

[浏览器css支持](https://caniuse.com/)



## C#

### 基本语法

#### 异常捕获

[多重异常捕获时，保留堆栈信息处理](https://blog.csdn.net/i_like_cpp/article/details/273819)
​	此文章有问题，需要使用innerexception构造一个新的异常
​		throw  new exception("message",old ex)
try catch 可以中断当前层次余下的操作，
要中断上一层则需要throw
log4net可以记录到innerexception的信息

### 知识点

#### 多线程



#### Json

[json对象后台处理](https://www.cnblogs.com/zxtceq/p/6610214.html)
[同上](https://www.cnblogs.com/Donnnnnn/p/6020353.html)

```c#
// 1
using Newtonsoft.Json
string jsonText = "{\"zone\":\"海淀\",\"zone_en\":\"haidian\"}";
JObject jo = (JObject)JsonConvert.DeserializeObject(jsonText);
string zone = jo["zone"].ToString();
string zone_en = jo["zone_en"].ToString();

/*
jobject对象  json["x"]后如果值得类型是jtoken
	jtoken使用。Value<string>("key")读取
*/


// 2
"{\"salesIndexInfo\":[{\"indexName\":\"Discount Rate(%)\",\"rowNum\":\"15\",\"data\":[\"1\",\"2\",\"3\",\"4\",\"5\",\"6\",\"7\",\"\",\"\",\"\",\"\",\"\",\"\",\"\",\"\",\"\",\"\",\"\",\"\",\"\",\"\",\"\",\"\",\"\"]},{\"indexName\":\"Discount Rate(%)\",\"rowNum\":\"16\",\"data\":[\"1\",\"2\",\"3\",\"4\",\"5\",\"6\",\"7\",\"\",\"\",\"\",\"\",\"\",\"\",\"\",\"\",\"\",\"\",\"\",\"\",\"\",\"\",\"\",\"\",\"\"]}],\"costIndexHeadInfo\":[{\"indexName\":\"Duty on royalty(%)\",\"rowNum\":\"100\"},{\"indexName\":\"Commission and PPV(%)\",\"rowNum\":\"101\"},{\"indexName\":\"Royalty(%)\",\"rowNum\":\"102\"},{\"indexName\":\"Royalty add back(%)\",\"rowNum\":\"103\"},{\"indexName\":\"Selling Commission(%)\",\"rowNum\":\"104\"},{\"indexName\":\"Freight in(%)\",\"rowNum\":\"105\"},{\"indexName\":\"Stock loss(%)\",\"rowNum\":\"106\"},{\"indexName\":\"Stock provision(%)\",\"rowNum\":\"107\"},{\"indexName\":\"Freight out(%)\",\"rowNum\":\"108\"}],\"scrIndexInfo\":[{\"indexName\":\"Footwear(%)\",\"rowNum\":\"120\"},{\"indexName\":\
"Apparel(%)\",\"rowNum\":\"121\"},{\"indexName\":\"Accessary(%)\",\"rowNum\":\"122\"}],\"opexIndexHeadInfo\":[{\"indexName\":\"In-Store Communication Rate(%)\",\"rowNum\":\"300\"},{\"indexName\":\"Training expenses per Year\",\"rowNum\":\"301\"},{\"indexName\":\"Travel Expenses per Year\",\"rowNum\":\"302\"},{\"indexName\":\"Normal Repair Rate(%)\",\"rowNum\":\"303\"},{\"indexName\":\"IT Servise Fee per Year\",\"rowNum\":\"304\"},{\"indexName\":\"Communication Fee per Month\",\"rowNum\":\"306\"},{\"indexName\":\"Public Resouce Fee per Month\",\"rowNum\":\"307\"},{\"indexName\":\"Credit Card/Check Fee Rate(%)\",\"rowNum\":\"308\"},{\"indexName\":\"Entertainment Fee per Month\",\"rowNum\":\"309\"},{\"indexName\":\"Other Taxes Rate(%)\",\"rowNum\":\"310\"}],\"opexIndexInfo\":[{\"indexName\":\"Other personnel paid\",\"rowNum\":\"403\"},{\"indexName\":\"External EDP/Account./Warehouse\",\"rowNum\":\"419\"},{\"indexName\":\"Bank Costs\",\"rowNum\":\"426\"},{\"indexName\":\"Insurance\",\"rowNum\":\"428\"},{\"indexNam
e\":\"External Visual Merchandising\",\"rowNum\":\"431\"},{\"indexName\":\"Other Operating Expenses\",\"rowNum\":\"434\"},{\"indexName\":\"Other Operating Income\",\"rowNum\":\"435\"}],\"assumptionIndexHeadInfo\":[{\"indexName\":\"Salary Increase Rate(%)\",\"rowNum\":\"322\"},{\"indexName\":\"Commission Rate(%)\",\"rowNum\":\"323\"},{\"indexName\":\"Fix Commission per Month\",\"rowNum\":\"320\"},{\"indexName\":\"Social Insurance Base commission\",\"rowNum\":\"324\"},{\"indexName\":\" Social Insurance Rate(%)\",\"rowNum\":\"325\"},{\"indexName\":\"Outing Fee per Year\",\"rowNum\":\"480\"},{\"indexName\":\"Personal Filing Fee per Year\",\"rowNum\":\"481\"},{\"indexName\":\"Retail Awards per Year\",\"rowNum\":\"482\"},{\"indexName\":\"Annual Dinner per Year\",\"rowNum\":\"483\"},{\"indexName\":\"Shopping Bags Rate(%)\",\"rowNum\":\"484\"},{\"indexName\":\"Uniform Cost per Year\",\"rowNum\":\"485\"},{\"indexName\":\"Additional Fixture per Month\",\"rowNum\":\"486\"},{\"indexName\":\"Stationaries per Year\",\"rowNu
m\":\"487\"},{\"indexName\":\"Traffic Count Rental per Year\",\"rowNum\":\"488\"},{\"indexName\":\"Mystery Shopper per Year\",\"rowNum\":\"489\"},{\"indexName\":\"BPO Cost per Year\",\"rowNum\":\"490\"},{\"indexName\":\"Store Operation Rate(%)\",\"rowNum\":\"491\"},{\"indexName\":\"Customer Service Rate(%)\",\"rowNum\":\"492\"}],\"assumptionIndexInfo\":[{\"indexName\":\"Overtime Rate(%)\",\"rowNum\":\"343\"}]}"
*/
// 定义modal类
namespace JsonReceive
{
    public class PerformanceModel
    {
        public string indexName { get; set; }
        public int rowNum { get; set; }
        public object data { get; set; }
    }
}

JavaScriptSerializer json = new JavaScriptSerializer();
var joArray = json.Deserialize<Dictionary<string, object>>(jsonText);
Dictionary<string, List<PerformanceModel>> dic = 
    new Dictionary<string,List<PerformanceModel>>();
foreach (var jo in joArray)
{
    string json2 = JsonConvert.SerializeObject(jo.Value);
    dic.Add(jo.Key, JsonConvert.DeserializeObject<List<PerformanceModel>>(json2));
}
string tableName;
int rowNum;
object data;
foreach (var rowData in dic)
{
	tableName = rowData.Key;
    foreach(var objData in rowData.Value)
    {
     	rowNum = objData.rowNum;
        data = objData.data;
    }
}


```





### ASP.NET

框架

label属性  提示标题title === tooltip   均有效



#### Httpmodule

编写代码，继承http，拦截请求或在预处理，asp.net的请求流程

```xml
webconfig 增加
<modules>
<add name="随意"  type="YHSD.TTC.HttpModule.Statement" /> 
</modules>

dll存放在bin中
```





## Go

### 基本概念

#### 包

每个 Go 程序都是由包组成的。

程序入口package main包

函数外的每个语句都必须以关键字开始（`var`、`func`、等等）

### 基本语法

#### 变量

##### 语法

```go
var name string = "123"; // var name type = xx;    type可以省略
const n = "1"; // 常量
a := 1;   // 自动定义变量   === var a = 1	
		 //`:=` 结构不能使用在函数外
a,b,c = 1,2,"no"    // 多个赋值
```

##### 零值

变量在定义时没有明确的初始化时会赋值为_零值_。

零值是：

- 数值类型为 `0`，
- 布尔类型为 `false`，
- 字符串为 `""`（空字符串）

#### 基本类型

##### 概述

类型可自动推断，浮点数根据精度推断

```go
bool

string

int  int8  int16  int32  int64
uint uint8 uint16 uint32 uint64 uintptr

byte // uint8 的别名

rune // int32 的别名
     // 代表一个Unicode码

float32 float64

complex64 complex128

int(1.2)	//类型转换    需显示转换 
```



##### string

##### bool

##### int

##### uint64

##### complex128

##### uint8 

byte的别名

##### int32

```go
rune // int32 的别名
     // 代表一个Unicode码
```

##### 结构体

```go
type Vertex struct {
	X int
	Y int
}

v := Vertex{1, 2}  // 定义结构体变量
v.X = x;		 
p := &v  p.X = x// 通过指针操作

```

##### 数组

###### 语法

```go
// var arr [number]type
var arr [10]string   // 数组大小固定
len(a)		//获取长度

```

##### slice

类数组？

###### 概述

slice的零值是nil
一个 nil 的 slice 的长度和容量是 0。

###### 语法

```go
// slice	[]T
p := []int{2, 3, 5, 7, 11, 13}
p := []int // 空slice
var a = p[1:x]   //对数组切片得到    [1:]  取第一个后所有的

a := make([]int, 5)  // 通过make产生
a := make(type,len,cap);  // 可以指定cap和len
len(a)		// 获取当前长度?
cap(b)      // 容量
```

###### 操作

```go
// 追加
// append(slice,...par)
var a []int
a = append(a, 1)
a = append(a, 1,2,3)
```

##### map

字典

###### 语法

```go
 // make(map[string]type)
var m = make(map[string]Vertex)
type Vertex struct {
	Lat, Long float64
}

// 初始化多个
var m = map[string]Vertex{
	"Bell Labs": Vertex{
		40.68433, -74.39967,
	},
	"Google": Vertex{
		37.42202, -122.08408,
	},
}

// 省略类型名
var m = map[string]Vertex{
	"Bell Labs": {40.68433, -74.39967},
	"Google":    {37.42202, -122.08408},
}
```



###### 操作

```go
m[key] = elem // 插入
elem = m[key]  // 读取
delete(m, key)  // 删除
elem, ok = m[key] // 检测是否存在，ok是bool值
```



#### 接口

```go
type Abser interface {
	Abs() float64
}

```



#### 操作符

##### 位

<< 

\>>

##### 延迟

defer
延迟的函数调用被压入一个栈中。当函数返回时， 会按照后进先出的顺序调用被延迟的函数调用。

```go
func defTest() {
	defer fmt.Println("world")
	fmt.Println("hello")
}  // 输出 hellp world
```

##### 指针

*、&

没有指针运算

```go

```



##### range

返回数据的索引和值

#### 循环

##### for

跟普通的相比没有(),但是必须有{}
没有while

```go
for i := 0; i < 10; i++ {
		sum += i
	}
for sum < 1000 {	// 置空初始条件和后续..		==> while
		sum += sum
	}

for{	// 死循环
    
}
```

#### 分支判断

##### if

没有(),必须有{}

```go
if x < 0 {
		return sqrt(-x) + "i"
	}
if v := math.Pow(x, n); v < lim {	// 可以定义在判断内部作用域的变量
		return v
	} else {
		fmt.Printf("%g >= %g\n", v, lim)
	}
```

##### switch

从上往下判断条件

```go
switch os := runtime.GOOS; os {	// 不需要break，隐含有break
	case "windows":
		fmt.Println("windows-.")
    case "darwin":
		fmt.Println("OS X.")
		fallthrough				// 如果需要往下跑，可以用fallthrough
	default:
		// freebsd, openbsd,
		// plan9, windows...
		fmt.Printf("%s.", os)
	}

// 从上往下，符合某一个条件时停止
switch {
	case t.Hour() < 12:
		fmt.Println("Good morning!")
	case t.Hour() < 17:
		fmt.Println("Good afternoon.")
	default:
		fmt.Println("Good evening.")
	}
```





#### 函数

##### 概述

##### 语法

```go
func test() {
    
}
func t(x int) (int,int){
    return 1,2		//可返回多个值,后面的括号是返回类型
}
a,b := t(1)		// :=  可自动声明变量

func split(sum int) (x, y int) {
	x = sum * 4 / 9
	y = sum - x
	return
}					// 可以给返回值定义变量名，返回的时候，return如果为空则自动匹配变量

func t1(x,y int) {} // x,y都是int,多个参数类型相同可以只写最后一个 
```



##### 闭包

```go
func adder() func(int) int {
	sum := 0
	return func(x int) int {
		sum += x
		return sum
	}
}


```



#### 模块(包)

##### 概述

​	



##### 语法

导入

```go
import "fmt" //引入fmt模块
import (
	"fmt"
	"math/rand"
) // 引入了两个包
```

导出

首字母大写的名称是被导出的。

> math.pi  和math.Pi

### 标准库

### fmt

#### 输出

%s   字符串
%d   数字
%v   默认值？the value in a default format 

Println

>  打印且换行

Printf

>  打印



#### 接口

Stringer 

### math

Abc

> 取绝对值

### math/rand

Intn

> 取随机整数

### Error

system.net.http未加载    引用的版本不同

多线程时HttpContext.Current.Server.MapPath("/") 未将对象设置到对象的实例异常。

并发请求时，容易连接被强制关闭
​	isbackground = true

## Bash

### 基本语法

#### 变量

```bash
name=1 # 不能用有空格
echo $name # 读取变量值，echo、printf输出
```

#### 作用域

```bash
(cd ../x;
 echo "x"     
 # .... 默认按shell窗口的路径调用指令，但在括号内指令均以cd进入的路径为路径
)
```

#### 控制

##### if

```bash
if condiction
then 			# 必须
	# ...
else 		#  else 可选
	# ...
fi			# 结束必须
```

##### for

```bash
for i in x;
do
	# ...
done
```



#### 参数

```bash
# $0 对应文件名  $1~$n 按顺序对应参数
./test.sh  1 2
# $1 = 1  ,$2 = 2

```



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

## WEB前端

github教程   https://github.com/wxyyxc1992/Web-Series		(现代 Web 开发基础与工程实践)

### 开发框架

#### React

##### 使用

使用polyfill
1、页面全局引用
2、react内引入，在最顶部引入，或在webpack中设置打包



使用react，两个js库
1、单独出来，全局引用,如果要配合polyfill则polyfill也只能全局引用
2、打包进verdon中，需要有一个入口js import两个库然后调用render，进行组件挂载
https://www.cnblogs.com/mianbaodaxia/p/6170726.html

##### 生命周期

###### willmount

  在render前,被后续版本会被取消

###### didmount 

 在render后,建议用于异步的数据加载

###### shouldComponentUpdate

最好只用于性能优化  

###### willreceive

对于willreceive尽量不要无条件的更新状态，即做些判断？
​	判断
​	脱离willreceive的控制
​	当多个复用的时候，通过key重新创建组件，如果元素简单可能会有略微的性能差异，但是复杂的时候直接创建新的可以避免差异对比，可能会更快

控制好willreceive更新的状态，如一个输入框，如果在willreceive里有更新的话，这样本来应该受手动输入影响的就会多了父组件的render影响

###### getDerivedStateFromProps

返回状态对象来更新，不更新返回null =>  替代willreceive?

[react 16后生命周期](https://blog.hhking.cn/2018/09/18/react-lifecycle-change/?hmsr=toutiao.io&utm_medium=toutiao.io&utm_source=toutiao.io)

##### Context

组件间隔层传递数据，全局，但是需要通过provider和consumer来使用
​	例如将某个组件的状态属性和状态更新函数传递给某个子组件

```javascript
// provide  
var value = {  data: "a" , changeData: () => { xxx } }
// consumer  
this.context.changeData();
```
[context](https://www.cnblogs.com/mengff/p/9511419.html)

##### Protal

将组件render到悬浮最顶层，常用为dialog

##### Hook

usestate
usecontext
useeffect
​	返回函数在unmount调用？？

##### 小知识点

###### refs

隐含的对象，  ref=x    this.refs.x   可以拿到元素

ref 中使用回调函数
​	ref={(ref) => { this.myRef = ref; }}
​	有缺点，每次都是重新绑定

###### key

key值并不是需要全局唯一，而只需要在相邻的兄弟元素中唯一就好,用于渲染

###### this 

如果不绑定this.handleClick方法，那么在事件发生并且精确调用这个方法时，方法内部的this会丢失指向。
这不是React的原因，这是JavaScript中本来就有的。如果你传递一个函数名给一个变量，然后通过在变量后加括号()来调用这个方法，
　此时方法内部的this的指向就会丢失

###### childrenthis

this.props.children属性。它表示组件的所有子节点

###### 兼容性

[浏览器兼容](https://reactjs.org/docs/react-dom.html#browser-support)

##### 国际化

 [react-intl](https://segmentfault.com/a/1190000005824920#articleHeader8)

##### 文章

[官方文档博客](https://reactjs.org/docs/implementation-notes.html)

[React-Css模块化](https://github.com/gajus/react-css-modules)

[React实践细节](https://juejin.im/entry/5a614d226fb9a01cac183cc9)

[React Conf 2018](https://juejin.im/post/5bfcbc83e51d450fb3263a35)

[react更新对象状态](https://www.cnblogs.com/chris-oil/p/8215756.html)

[渲染](https://www.jianshu.com/p/100a55978253)

[通讯](https://yq.aliyun.com/articles/66083)

[react组件资料](https://www.jianshu.com/p/788a82dac136  )

[React Router	](https://www.jianshu.com/p/e3adc9b5f75c)NavLink比link多了激活样式

[Airbnb React/JSX 代码规范](https://github.com/BingKui/javascript-zh/tree/master/react)
[Airbnb JS 规范](https://github.com/BingKui/javascript-zh)

[React 项目构建与开发入门](https://icepy.gitbook.io/simple-react-book/)

##### Redux

###### 文章

[redux Blob](https://github.com/lulujianglab/blog/issues/34)

[redux](https://segmentfault.com/a/1190000012976767)
[redux](https://segmentfault.com/a/1190000011474522)

##### Fabric react

TextField 的type会影响显示,number 、string

defaultValue={this._editDate.item["Remark"]} onChanged={this._getRemark}
设置默认值和读取新值

##### 错误处理

[Objects are not valid as a React child 错误处理	可能把对象给了元素](https://blog.csdn.net/isaisai/article/details/78083677)

##### JSX

###### 编译

```html
<!--如果不提前对js代码进行编译，进行jsx解析-->
<script src="JSXTransformer.js"></script>
<!--对应js加上type="text/jsx"-->
```



##### 应用

###### 拖拽上传

```react
render()	{
    var fileElements = "";
    (<div className="upload-form" id="dragDiv" 
         onDrop={(e) => this._getFile(e)} 
         onDragEnter={(e) => this._handleDragHover(e)} 
         onDragOver={(e) => this._handleDragHover(e)} 
         onDragLeave={(e) => this._handleDragHover(e)}>
              {fileElements}
     </div>
    )
}


 @autobind
  private _getFile(e) {
    var self = this;
    e.preventDefault(); //取消默认浏览器拖拽效果
    var fileList = e.dataTransfer.files; //获取文件对象
    if (fileList.length == 0) { return false; }
    self.setState({
      files: fileList
    })
  }

  @autobind
  private _handleDragHover(e) {
    e.stopPropagation()
    e.preventDefault()
  }
```

###### PDF预览

react-pdf
canvas渲染
​	chrome
​		部分文件很快（1~2s），部分文件慢(10s左右)
​	ie11   
​		部分文件较快（8~10s），部分文件慢(1m),浏览器会无响应
svg
​	chrome
​		小文件很快，大文件略慢，样式会乱（下方按钮）
​	ie11
​		小文件很快，大文件略慢，样式会乱（下方按钮、组件高度样式有bug），而且显示速度略慢，页面内容显示的顺序错乱，观感不好
​			新版本的组件会修复组件样式问题但是目前新版本还没正式发布	

​	api	onrenderSuccess

[React实现全局组件：Toast轻提示](https://segmentfault.com/a/1190000016473517)

#### Angular



#### Vue

[vue绑定简析](https://blog.csdn.net/u011277123/article/details/58597638)  [更多例子](https://www.cnblogs.com/weiqu/p/5860945.html)



### 构建工具

#### NPM

##### 安装

###### cnpm安装

类似指令安装问题通用解决方法

- 安装结束重启cmd
- 修改环境变量
- 还不能行直接copy到nodejs文件目录中

##### package.json

###### 指令

npm i  ==>  npm install   自动安装所有依赖

###### Script

快速指令  npm run xxx

###### dependencies

生产环境依赖

打包生产环境资源时， dependencies 中的依赖会被打包，而 devDependencies 中的依赖不会被打包。

生产环境依赖安装到 devDependencies，在本地时没问题，到生产环境会因为缺少依赖而无法正常运行。

npm i module_name  -S  = >  npm install module_name --save    
​	写入到 dependencies 对象		小写s无效

###### devDependencies

开发环境依赖

如果将开发环境依赖安装到 dependencies ，本地和生产环境都没问题，就是生成的文件会大一点。

npm i module_name  -D  => npm install module_name --save-dev   
​	写入到 devDependencies 对象  



#### Webpack

##### 配置

[output](https://blog.csdn.net/whh181/article/details/80613633)
​	libraryTarget:  导出为什么，var以一个对象保存，window附加到window对象上
​	library： 导出的模块命名
module.rules.use数组中，loader 的位置。根据 webpack 规则：放在最后的 loader 首先被执行



##### 插件

###### 通用

HtmlWebpackPlugin(耗时长)

全局导入(webpack.ProvidePlugin)

```javascript
new webpack.ProvidePlugin({
    React:'react',
    ReactDOM:'react-dom',
    Component:['react','Component']
})
```



###### Css相关

[style loader](https://github.com/webpack-contrib/style-loader)

[css-module](https://github.com/gajus/react-css-modules)

```javascript
 {
                test: /\.css$/,
                loaders: [
                    'style-loader?sourceMap',
                    'css-loader?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]'
                ]
            }
```

[typescript css modules](https://www.colabug.com/2303193.html)
如果是typescript需要定义声明文件

```javascript
declare module "*.css" {
    var content: any;
    export default content;
}
```





###### TypeScript

使用ts-loader或者awesome-typescript-loader进行编译

Typescript 直出 ES5 已经非常成熟，用 ts-loader 即可，如果有需要使用 Babel 进行 ES6 到 ES3 编译的可以使用 awesome-typescript-loader

##### 常见问题

###### 打包出错

- 文件内容缺少、未定义
  检查webpack和webpack-cli版本是否不对应
- There are multiple modules with names that only differ in casing.
  This can lead to unexpected behavior when compiling on a filesystem with other case-semantic.
  Use equal casing. Compare these module identifiers:
- 看被多处地方引用时引入的文件和变量名是否有不同

package.json中@types/react-dom版本问题？
TypeScript: Duplicate identifier 'LibraryManagedAttributes
​	直接删除



react route 问题
Cannot GET /CalloutNestedExample

##### 文章

[webpack-dev-server](https://webpack.js.org/configuration/dev-server/#devserver-hot)

[webpack 插件总结归类](https://segmentfault.com/a/1190000016816813)

[webpack入门说明](https://juejin.im/post/5bd66efcf265da0a8a6af2d2)

[入门博客](https://www.jianshu.com/p/3066d96aec8b)

[webpart实现js包](https://juejin.im/post/5bfca0e8f265da611204b3ca)

[webpack详解](https://github.com/ruizeng/blog/blob/master/Frontend/dive-into-webpack/article.md?hmsr=toutiao.io&utm_medium=toutiao.io&utm_source=toutiao.io)

[你真的会拆分代码吗,好](https://mp.weixin.qq.com/s?__biz=MzUxMzcxMzE5Ng==&mid=2247490234&idx=1&sn=a57614db8d5570eb4cf71c39d376ab46&chksm=f951aff9ce2626ef928250381d1914629393d75d75bbb124da6a3370bef94820132b07d11c6b&mpshare=1&scene=23&srcid=01094hCOdOckeg4crRiHe5xz#rd)

[JavaScript性能优化之摇树，一般](http://mp.weixin.qq.com/s?__biz=MzUxMzcxMzE5Ng==&mid=2247490230&idx=1&sn=7c407256e1d144631ea143f593311153&chksm=f951aff5ce2626e3c362361ac5473dcc231ffee12c8e5e9e34fd5b9b664b2cce3122b517e992&mpshare=1&scene=23&srcid=0109fyVv66SYSRewfZ52NGZV#rd)

#### Gulp

[文件匹配规则](http://www.siyuweb.com/gulp/3207.html)



##### 安装

全局安装后看安装信息的最后，看安装路径，如果在命令窗找不到指令，可以手动设置环境变量的path增加安装路径

### 编译工具

#### babel

[babel详细说明](http://www.cnblogs.com/jiebba/p/9613248.html?hmsr=toutiao.io&utm_medium=toutiao.io&utm_source=toutiao.io)
babel只转换语法不转换api   如：map,set,object.assign



#### ESLint

[eslint规范](https://codexu.github.io/docs/2-basics/5-eslint.html)

#### TSLint

##### 使用说明

- 创建tslint.json
- 配置tslint.json
- 安装tslint
- package.json的script中设置指令

##### 设置

[tslint规则](https://palantir.github.io/tslint/rules/)

### 性能

#### 缓存

service worker

​	必须是https

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

[](http://scriptoj.mangojuice.top/problems?tag=all)

[js,html,json美化  格式化](https://beautifier.io/)

[learn x in y](https://learnxinyminutes.com/)

[Front End Books](https://github.com/lisposter/frontend-books)

[You-Dont-Know-JS](https://github.com/getify/You-Dont-Know-JS)

[前端收集，博客，社区....](https://github.com/foru17/front-end-collect)

[前端清单，略旧](https://github.com/JacksonTian/fks)

[js疑难杂症，奇技淫巧](https://github.com/justjavac/the-front-end-knowledge-you-may-not-know/issues)

[前端路线](https://github.com/goodjack/developer-roadmap-chinese)

[前端精读](https://github.com/dt-fe/weekly)

[前端资源](https://github.com/helloqingfeng/Awsome-Front-End-learning-resource)  

[前端知识点](https://juejin.im/entry/5b94d9d9e51d450e9704a4cb)

[typescript](https://github.com/semlinker/awesome-typescript)

[html2canvas
将html转pdf库](http://html2canvas.hertzen.com/configuration)

[jspdf](https://github.com/MrRio/jsPDF)

html to pdf

> https://github.com/pwcong/how-transform-html-into-multipage-pdf
> https://github.com/linwalker/render-html-to-pdf
> https://github.com/wojtekmaj/react-pdf

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

[http](http://blogread.cn/it/article/7277?f=wb_blogread)

[js异步](https://juejin.im/post/59e85eebf265da430d571f89)

[awesomes，前端框架大全](https://www.awesomes.cn/)

### 博客

[berwin 360奇舞团](https://github.com/berwin/Blog)
[冴羽](https://segmentfault.com/u/yayu)
[hateonion](https://hateonion.me/posts/457c/)
[godbmw每天一个设计模式Blob](https://godbmw.com/)
[抓住时间的尾巴吧博客](https://www.jianshu.com/u/5ebd924cd5dc)
[HK Talk](https://blog.hhking.cn/)
[林鑫](http://blog.gdfengshuo.com/page/2/)

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

### 站点

[后端架构师技术图谱](https://github.com/xingshaocheng/architect-awesome)

## 人工智能

[微软人工智能api 1.0](https://westcentralus.api.cognitive.microsoft.com/vision/v1.0)
​	密钥 1: b3e7c9c65918405e8f62fc7b97fd4964

[微软人工智能api 2.0](https://westcentralus.api.cognitive.microsoft.com/vision/v2.0)
​	密钥 2: 5f603b8cd02748ed8305941c6a0b2a3c

## SQL

### SQLServer

#### 存储过程

##### 小知识

多条sql语句用;连接

###### 快捷键

f5进行语句使用

###### 操作

```sql
 两个表先排序后合并    加一个别名  加多一层
select * from (
	SELECT TOP 1 [TemplateID]	FROM [dbo].[TaskHistory] 
    	where templateID='T2018BU000001' and Status=0 order by ID desc) t1
	UNION ALL
	SELECT * from (
  		SELECT TOP 1 [TemplateID]	FROM [dbo].[TaskHistory] 
        	where templateID='T2018BU000001' and Status=0 order by ID desc) t2

select (
	ISNULL(
        	(
             	(select IndexName from SalesIndexInfo 
                 	where DataKey='T201900000001' and RowNum = a.ParentID   
                 	and  ParentID=0 ) + '_'),'')
				+  (IndexName)
		) as 'IndexName' ,FormKey	from SalesIndexInfo as a 
						where DataKey='T201900000001'	and IsMasschange=@IsMasschange
```

存储过程

```sql
/****** Object:  StoredProcedure [dbo].[SP_GetMassChange]    Script Date: 2018/6/6 9:11:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
--获取预算表单信息
ALTER PROCEDURE [dbo].[SP_GetMassChange]
@DataKey varchar(200),
@IsMassChange bit
AS
BEGIN
	declare @tabHead table(
	IndexName nvarchar(200),
	FormKey nvarchar(50)
	)

	insert into @tabHead (IndexName,FormKey) 
	(select IndexName,FormKey from CostIndexHeadInfo where DataKey=@DataKey and IsMasschange=@IsMassChange )
	insert into @tabHead (IndexName,FormKey) 
	(select IndexName,FormKey from OpexIndexHeadInfo where DataKey=@DataKey and IsMasschange=@IsMassChange )
	insert into @tabHead (IndexName,FormKey) 
	(select IndexName,FormKey from AssumptionIndexHeadInfo where DataKey=@DataKey and IsMasschange=@IsMassChange )
	insert into @tabHead (IndexName,FormKey) 
	(select Title,FormKey from MasterIndex where DataKey=@DataKey and IsMasschange=@IsMassChange )

	select * from @tabHead


	declare @tabBody table(
	IndexName nvarchar(200),
	FormKey nvarchar(50)
	)

	insert into @tabBody (IndexName,FormKey) 
	(select 
		(ISNULL(((select IndexName from SalesIndexInfo where DataKey=@DataKey and RowNum = a.ParentID   and  ParentID=0 ) + '_'),'')
		+(IndexName)) as 'IndexName' ,FormKey
		from SalesIndexInfo as a where DataKey=@DataKey and IsMasschange=@IsMassChange)
	 
	insert into @tabBody (IndexName,FormKey) 
	(select 
		(ISNULL(((select IndexName from CostIndexInfo where DataKey=@DataKey and RowNum = a.ParentID   and  ParentID=0 ) + '_'),'')
		+(IndexName)) as 'IndexName' ,FormKey
		from CostIndexInfo as a where DataKey=@DataKey and IsMasschange=@IsMassChange) 

	insert into @tabBody (IndexName,FormKey) 
	(select 
		(ISNULL(((select IndexName from OpexIndexInfo where DataKey=@DataKey and RowNum = a.ParentID   and  ParentID=0 ) + '_'),'')
		+(IndexName)) as 'IndexName' ,FormKey
		from OpexIndexInfo as a where DataKey=@DataKey and IsMasschange=@IsMassChange) 

	insert into @tabBody (IndexName,FormKey) 
	(select 
		(ISNULL(((select IndexName from AssumptionIndexInfo where DataKey=@DataKey and RowNum = a.ParentID   and AssumptionIndexInfo.ParentID=0 ) + '_'),'')
		+(IndexName)) as 'IndexName' ,FormKey
		from AssumptionIndexInfo as a where DataKey=@DataKey and IsMasschange=@IsMassChange) 

	insert into @tabBody (IndexName,FormKey) 
	select IndexName,FormKey from MasterByMonth where DataKey = 'T201900000001' and IsMasschange=@IsMassChange

	insert into @tabBody (IndexName,FormKey) 
	select IndexName,FormKey from SCRIndexInfo where DataKey = 'T201900000001' and IsMasschange=@IsMassChange

	select * from @tabBody
END

--exec [SP_GetMassChange] 'T201900000001',1

/****** Object:  StoredProcedure [dbo].[SP_GetMassChange]    Script Date: 2018/6/5 16:45:03 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
--获取预算表单信息
ALTER PROCEDURE [dbo].[SP_GetMassChange]
@DataKey varchar(200),
@IsMassChange bit
AS
BEGIN
CREATE TABLE #t 
( 
     [IndexName] [nvarchar()]  NOT NULL , 
     [Oid] [ int ]  NOT NULL , 
) 

	declare @tabHead()

	declare @tabBody()
	select * from SalesIndexInfo where DataKey=@DataKey  and IsMasschange=@IsMasschange order by ID
	select * from SCRIndexInfo where DataKey=@DataKey  and IsMasschange=@IsMasschange order by ID
	select * from CostIndexInfo where DataKey=@DataKey  and IsMasschange=@IsMasschange order by ID
	select * from OpexIndexInfo where DataKey=@DataKey  and IsMasschange=@IsMasschange order by ID
	select * from AssumptionIndexInfo where DataKey=@DataKey  and IsMasschange=@IsMasschange order by ID
	select * from MasterByMonth where DataKey=@DataKey  and IsMasschange=@IsMasschange

	select * from CostIndexHeadInfo where DataKey=@DataKey  and IsMasschange=@IsMasschange order by ID	
	select * from OpexIndexHeadInfo where DataKey=@DataKey  and IsMasschange=@IsMasschange order by ID
	select * from AssumptionIndexHeadInfo where DataKey=@DataKey and IsMasschange=@IsMasschange order by ID
	select * from MasterIndex where DataKey=@DataKey  and IsMasschange=@IsMasschange
	
END

--exec [SP_GetMassChange] 'T','T201900000001',1

/****** Object:  StoredProcedure [dbo].[SP_GetTemplateData]    Script Date: 2018/6/5 10:29:19 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
--获取预算表单信息
ALTER PROCEDURE [dbo].[SP_GetTemplateData]
@DataType nvarchar(200),
@DataKey varchar(200)
AS
BEGIN
	select * from SalesIndexInfo where DataKey=@DataKey and DataType=@DataType order by ID
	select * from CostIndexHeadInfo where DataKey=@DataKey and DataType=@DataType order by ID
	select * from SCRIndexInfo where DataKey=@DataKey and DataType=@DataType order by ID
	select * from CostIndexInfo where DataKey=@DataKey and DataType=@DataType order by ID
	select * from OpexIndexHeadInfo where DataKey=@DataKey and DataType=@DataType order by ID
	select * from OpexIndexInfo where DataKey=@DataKey and DataType=@DataType order by ID
	select * from AssumptionIndexHeadInfo where DataKey=@DataKey and DataType=@DataType order by ID
	select * from AssumptionIndexInfo where DataKey=@DataKey and DataType=@DataType order by ID
	select * from MasterIndex where DataKey=@DataKey and DataType=@DataType
	select * from MasterByMonth where DataKey=@DataKey and DataType=@DataType

	if @DataType='F'
	begin
		select * from StoreBudgetAsset  where FormID=@DataKey
	end

	
END

--exec SP_GetTemplateData 'T','T201900000001'


--分别在两个表查出一列合并
select count(1) as 'count',(select count(1) as 'completed' from  MassChangeSchedule with(nolock) where State = 0) as 'completed'  from MassChangeSchedule with(nolock)


--???
select IndexName,FormKey from SalesIndexInfo where ParentID=0 and  DataKey='T201900000001'
Union All 
select 
((
select IndexName from SalesIndexInfo where DataKey='T201900000001' and RowNum = a.ParentID   and  ParentID=0 
)
+'_'+(IndexName)) as 'IndexName' ,FormKey
from SalesIndexInfo as a where DataKey='T201900000001' and ParentID <> 0

//////////////////////////////////////////////////////////////////////////////////////
select 
(ISNULL (
select IndexName from SalesIndexInfo where DataKey='T201900000001' and RowNum = a.ParentID   and  ParentID=0 
,'')
+'_'+(IndexName)) as 'IndexName' ,FormKey
from SalesIndexInfo as a where DataKey='T201900000001'

select FormKey,(
select IndexName from SalesIndexInfo where RowNum = a.ParentID and DataKey='T201900000001'  and  ParentID=0
)+'_'+(IndexName) 
from SalesIndexInfo as a where ID=871 
```



##### 参数化

如果存储过程中使用字符串拼接sql的话，上面的参数化将不会起作用，单引号必须经过判断并替换，在数据库中，用2个单引号代表1个实际的单引号。所以，如果是拼接sql字符串的方式，需要用Replace(@para,'''', '''''')来替换一下，将1个单引号替换为2个就没有问题了。

使用这种参数化查询的办法，防止SQL注入的任务就交给ADO.NET了, 如果在项目中统一规定必须使用参数化查询，就不用担心因个别程序员的疏忽导致的SQL注入漏洞了。     但是，问题还没有完，SQL注入的漏洞是堵住了，但是查询结果的正确性，参数化查询并不能帮上什么忙。



#### 博客

[sql防注入](https://www.zhihu.com/question/22953267 )



## 网络

[http缓存](https://juejin.im/post/5bf3c28ee51d4514df5b7625)
​	ajax rest api会有缓存		返回状态码304 Not Modified
​	http header 加上  no-store   或no-cahce来   不缓存信息   
​		1、Cache-Control: no-cache ...
​		2、ajax去缓存  加时间戳?t=xxx  

### 常见状态码

- 200 OK，表示从客户端发来的请求在服务器端被正常处理了。
- 204 No content，表示请求处理成功，但没有资源返回。
- 205 Reset Content，表示请求成功，但响应报文不含实体的主体部分，但是与 204 响应不同在于要求请求方重置内容
- 206 Partial Content，进行范围请求



3xx

- 301 moved permanently，表示永久性重定向。该状态码表示请求的资源已被分配了新的URI，以后应使用资源现在所指的URI。
- 302 found，表示临时性重定向。
- 303 see other，表示资源存在着另一个 URL，应使用 GET 方法获取资源
- 304 not modified，表示客户端发送附带条件的请求时（指采用GET方法的请求报文中包含if-matched,if-modified-since,if-none-match,if-range,if-unmodified-since任一个首部）服务器端允许请求访问资源，但因发生请求未满足条件的情况后，直接返回304Modified（服务器端资源未改变，可直接使用客户端未过期的缓存）
- 307 temporary redirect，临时重定向，和302含义类似，但是期望客户端保持请求方法不变向新的地址发出请求



4xx

- 400 bad request，表示请求报文中存在语法错误。当错误发生时，需修改请求的内容后再次发送请求。
- 401 unauthorized，表示未授权（Unauthorized)，当前请求需要用户验证
- 403 forbidden，表示对请求资源的访问被服务器拒绝了
- 404 not found，表示服务器上无法找到请求的资源。除此之外，也可以在服务器端拒绝请求且不想说明理由时使用。



5xx

- 500 internal sever error，表示服务器端在执行请求时发生了错误。也有可能是Web应用存在的bug或某些临时的故障。
- 501 Not Implemented，表示服务器不支持当前请求所需要的某个功能
- 503 service unavailable，表示服务器暂时处于超负载或正在进行停机维护，现在无法处理请求。

### HTTP 首部

| 通用字段          | 作用                                            |
| ----------------- | ----------------------------------------------- |
| Cache-Control     | 控制缓存的行为                                  |
| Connection        | 浏览器想要优先使用的连接类型，比如 `keep-alive` |
| Date              | 创建报文时间                                    |
| Pragma            | 报文指令                                        |
| Via               | 代理服务器相关信息                              |
| Transfer-Encoding | 传输编码方式                                    |
| Upgrade           | 要求客户端升级协议                              |
| Warning           | 在内容中可能存在错误                            |

| 请求字段            | 作用                               |
| ------------------- | ---------------------------------- |
| Accept              | 能正确接收的媒体类型               |
| Accept-Charset      | 能正确接收的字符集                 |
| Accept-Encoding     | 能正确接收的编码格式列表           |
| Accept-Language     | 能正确接收的语言列表               |
| Expect              | 期待服务端的指定行为               |
| From                | 请求方邮箱地址                     |
| Host                | 服务器的域名                       |
| If-Match            | 两端资源标记比较                   |
| If-Modified-Since   | 本地资源未修改返回 304（比较时间） |
| If-None-Match       | 本地资源未修改返回 304（比较标记） |
| User-Agent          | 客户端信息                         |
| Max-Forwards        | 限制可被代理及网关转发的次数       |
| Proxy-Authorization | 向代理服务器发送验证信息           |
| Range               | 请求某个内容的一部分               |
| Referer             | 表示浏览器所访问的前一个页面       |
| TE                  | 传输编码方式                       |



| 响应字段           | 作用                       |
| ------------------ | -------------------------- |
| Accept-Ranges      | 是否支持某些种类的范围     |
| Age                | 资源在代理缓存中存在的时间 |
| ETag               | 资源标识                   |
| Location           | 客户端重定向到某个 URL     |
| Proxy-Authenticate | 向代理服务器发送验证信息   |
| Server             | 服务器名字                 |
| WWW-Authenticate   | 获取资源需要的验证信息     |



| 实体字段         | 作用                           |
| ---------------- | ------------------------------ |
| Allow            | 资源的正确请求方式             |
| Content-Encoding | 内容的编码格式                 |
| Content-Language | 内容使用的语言                 |
| Content-Length   | request body 长度              |
| Content-Location | 返回数据的备用地址             |
| Content-MD5      | Base64加密格式的内容 MD5检验值 |
| Content-Range    | 内容的位置范围                 |
| Content-Type     | 内容的媒体类型                 |
| Expires          | 内容的过期时间                 |
| Last_modified    | 内容的最后修改时间             |



### 文章

[http](https://segmentfault.com/a/1190000017514417)

## 数据结构

### 图

#### 概念

有向边
无向边
混合图
度数 关联边数
出度  出去边数
入度  进入边数
自环
通路  一条路线  包含n个点 n-1条边
（通路边互异，顶点可能相同）
简单通路  路线上顶点互异

起点=终点  环路  （边互异）
环路上边互异，但顶点可能重复
如果所有的点均互异则为简单环路

欧拉环路
经过全部边一次，的环路  长度等于边总数

经过全部顶点且一次  哈密尔顿环路



## 系统

## 安全

[安全技术精粹](https://paper.seebug.org/)

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

# 软件\工具

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

#### 快捷键

切换光标模式  insert键

## 操作系统

### Windows

#### 远程控制

\10.182.21.12\c$\inetpub\wwwroot\wss\VirtualDirectories\portal.toyotsu-ea.com443\App_GlobalResources
​	在文件夹输入路径可直接访问

​	

#### Cmd

service.msi   打开服务

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



#### 优化

[Windows10资源管理器占用CPU过高解决办法,打开慢](https://blog.csdn.net/sinat_34104446/article/details/70878075)   禁用cotana(小娜) + 禁用问题收集服务

#### 异常

域服务器，事件查看器，事件ID2896,错误码8453

- [support.hpe](https://support.hpe.com/hpsc/doc/public/display?docId=emr_na-c02912597)
- [social.technet.microsoft问答](https://social.technet.microsoft.com/Forums/en-US/41835492-9d50-4dee-a847-a5291fc610d4/a-client-made-a-dirsync-ldap-request-for-a-directory-partition-access-was-denied-due-to-the?forum=ocssecurity)
- [support.microsoft](https://support.microsoft.com/en-in/help/2022387/active-directory-replication-error-8453-replication-access-was-denied)
- [mickputley](http://www.mickputley.net/2013/11/event-id-2896-in-directory-service-log.html)





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



## 流程

### flowportal

#### 概述

#### 基础知识

  流程属性
关联模式   taskid或其他
流程号格式    对应字段和格式设置
​		缺省表单，每个步骤都可以设置表单，设置缺省表单，可以通用   
流程描述：支持html
范本夹   模板
代发申请   代人发的申请
参办任务   参与审批的
任务查询  根据权限显示

流程步骤 活动属性   权限勾选
​	不同步骤的权限不同，针对的用户不同
​	取回  设置什么时候可取回
​	删除，逻辑删除，标记
​	撤销，产生撤销状态，计时暂停，冻结
​	委托   任务让别人代办
​	知会	知会任务打开只有已知按钮，不按，会一直在
​	阅示	系统发通知，任务结束会消失
​	公开	针对权限，增加查看权限
​	阅示（加签） 表单意见栏，
​	调度	把流程从当前步骤节点，跳到任意流程节点
​	手机上审批
​	退回重填	直接返回开始
​	拒绝		单据关闭
​	批量同意
​	退回某步
  通知  单纯发邮件
  知会  会参与流程，产生权限

数据控制
​	Owner
​	AgentUser
​	LoginUser
​	Initiator
​	包含数据表，在提交时才会更新上去

处理人
​	第一人处理，  第一类人处理
​	共享处理      多个人可以处理，而且只需其中一人处理即可
​			获取处理权，释放处理权
​	发给所有人
​	
​	无对应处理人	~
​	自动同意

通知
​	使用缺省   继承服务器设置

连接弧
​	流程连接线，会变成按钮
超时
​	日历	应对不同时区的工作时
​	截止时间开始的计时
​	
​	催办
​	过时处理~
​	
​	自动同意规则，凌驾于处理人的自动同意上

自由签核
​	自由流	让某个步骤的人来设置这个

层级审批
​	关卡设置	设置审批条件，关卡层级  多个审批打包在一起
​		关卡条件不满足进入下一关卡，满足跳出结束

流程建模-- 管理工具---工作日历


合流  分流

流程运维
 	数据恢复  

  分流
合流
常规合流
​	等待所有分流到达，然后合并成一个
表决合流
​	通过通过和否决规则进行表决决定流程的进行
合流和分流可以嵌套使用

知会
​	根据规定设置知会人

快照
​	xsnapshotlist控件，根据快照次数显示版本
​		记录快照次数
子流程
​	跨服务器调用，可以进行多服务器流程处理
​	存储TaskID 	数据库中存储子id
​	同异步   是否等待子流程
​	开始活动，第一个节点自动提交
​	数据传入	
​	数据返回	返回数据给父流程
​	规则	传入数据筛选
结束
​	承认结束
​	拒绝结束	

数据库适配器
​	配对数据，对数据库update和insert
​	xml适配器	导出xml，只能做一级层级，否则写代码
​	附件适配器	用http方式存储附件
​	
时间触发器	多种流程触发器

文件触发器	监听文件 

自定义插件
​	sql插件	自己写代码
​	c#插件	代码
​	.NET插件	把dll放到UserDll里，可以使用
自己写的事件放在根目录下，然后再.net环境中写上dll名字，和using
 ‘

高级  
​	短名		设置简略名

移动端
大菜单 --  移动管理  --  流程库  --  申请单
可以对移动端显示进处理
​	可以修改顺序，显示名，数据类型

​	输入：录入意见？
​	图片附件	可以显示为图片
​	文字附件	只显示名字
​	设置数据格式
​	高级          加入配置，影响控件

流程版本
​	流程处理时间问题，多版本流程同时进行，兼容不同版本流程  

 接口
获取账号信息
owner	任务发起人
agent		代理人	外出？
recipient  当前接收人，任务当前在谁列表里
handler		实际任务处理人

finishAt 	是否待办？

表单
​	明细表	可以动态增加，删除
​	orderIndex	可以设置顺序
开窗查询使用XDateBrowserButton控件
​	开窗，可单选，多选
datamap数据映射    将字段值赋值给数据表？

TextBox的ValueToDisplayText可实现数据根据主键带出  

XDateBrowserButton数据绑定设置
DisplayColumns宽度
可以指定列宽，如果为-1则
DataMap
数据映射，绑定的数据会回填到表单上
数据映射到绑定字段，提交后数据将在BPM数据库中保存一个副本，再次打开表单时数据从BPM数据库中加载，不从外部数据库重新读取。

数据映射到变量后，提交时带出信息不在BPM数据库中保留副本，再次打开表单时附加信息重新读取，每一次都显示最新信息。

使用映射到变量可以实现，表单中只保存主键，显示时带出附加信息的功能。\

fileter
数据过滤，根据选择的字段信息过滤

XChildFormLink
通过连接按钮实现子表单
​	设置FormApplication属性
​	FormApplication使用的是表单应用，是使用现有的表单进行包装而成在“应用管理”门户中“表单服务”模块中可添加表单应用

子表单带出到主表单数据
​	配置XChildFormLink的ParamsFill属性，可将主表单数据通过url参数传递给子表单。

子表单数据带回主表单
​	借助TextBox的数据带出功能（ValueToDiaplayText）将数据带回给主表单

关联表单
​	XHistoryFormLink实现表单关联
​	使用XDataBrowserButton控件选择历史表单，并带出TaskID到XHistoryFormLink。

带出更多业务数据
​	利用XDataBrowser的DataMap功能
导出数据到EXCEL
​	ExcelDataExportButton设置ExportTableID
从EXCEL导入数据
​	XExcelDataImportButton
​	ColumnCount控制可导入列，会影响数据映射中源数据列出；
​	TitleRowIndex标题在Excel中位于第几行（从1开始计数）；
​	DataRowIndex Excel文件中数据开始行（从1开始计数）
​	替换导入
​		清空已有数据，替代，设置AppendModel为ClearAndAppend实现

表单验证
​	提交表单上，进行表单数据校验
​	

```
使用验证控件
自定义代码验证
后台验证

常规验证
	验证控件Validator Controls
非空验证		XRequiredFieldValidator		必填字段验证
范围验证		XRangeValidator		输入值是否在指定范围
比较验证		XCompareValidator		按设定比较输入值
```

正则表达式验证	XRegularExpressionValidator		检查输入信息格式
​	自定义验证	XCustomValidator	用javascript自定义验证逻辑，检查用户输入
​	使用，将控件拖出，指定验证目标

```
ValidationGroup指定验证组，并在流程设置好，可只在指定流程进行验证
动态验证，根据disableexpree进行设置
自定义验证
	XCustomValidator控件，支持使用自定义js函数执行验证逻辑
	js函数两个参数source,args,args有两个值value和isVAlid
后台验证  

```

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



#### 页面

考勤默认页面文字， 编辑页面->编辑属性->页面内容->编辑源...

#### Webpart

##### 部署时问题

对象ID重复

> 右键package打开设计器，右下角可修改solution ID  guid



feature has already installed

> 点击feature文件夹下的xxxfeature,右下属性选强制安装



step 'activate features' Failed to load receiver assembly

> 右键项目属性，签名，新建强名称密钥文件，随便写名字，密码随意



Could not load file or assembly  The system cannot find the file specified

> 确实少了dll



wsp包打包文件还原

- 新建一个同名的sharepoint项目，自带package和feature生成
- 将package复制到需要还原的项目中，feature为空不需要
- 项目总包含package,排除其他代码文件
- 重新包含其他代码文件
- webpart需在package设计页面中拉取
- 部署

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

可对Item项设置权限
流程可以设置item权限



##### 强制重新登录

xxx/_layouts/closeConnection.aspx?loginasanotheruser=true

>  自动登录后自动跳转顶层站点？



https://team.cargill.com/sites/Metals_Supply_China_E-chop_Test/_layouts/15/closeConnection.aspx?loginasanotheruser=true&Source=https://team.cargill.com/sites/Metals_Supply_China_E-chop_Test/eChop

> 增加source参数指定跳转



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

启动流程超时，流程操作超时： 服务器流程服务问题

![9f1ed5f7040cfb2f514787bc096ca86](.\img\9f1ed5f7040cfb2f514787bc096ca86.png)

### Azure

### O365

[exchange头像上传问题,备份](http://techgenix.com/user-photo-exchange-lync-and-active-directory/)

## 浏览器

### Chrome

#### 调试

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



花了比较多时间写的东西都用邮件的形式发出，抄送相关人员，并且写明需要测试的点、副作用和可能影响的地方

代码修改记录，校对；正式环境慎重更新

### 沟通

- 邮件回复注意书写，潜在语气
- 沟通方式：
  需要我来做？ =>  是否需要我协助做？



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