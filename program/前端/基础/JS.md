[TOC]

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

##### Symbol

普通的方式无法获取到symbol生成的结果

某种程度上可实现私有变量，但是Reflect.ownKeys()能获取到以symbol为key的属性



###### 唯一性

每次产生都是唯一值，不会冲突







##### 运算符

运算符优先级   类型隐式转换

a ? a : b ==> a || b

##### ==
[== 时的类型转换](https://tc39.es/ecma262/#sec-abstract-equality-comparison)
> 数字/字符串/bool == 数字/字符串/bool   类型不一致时，会将另一方转成数字 

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

```javascript
export * from './components/DatePicker/index'; // 直接从导出另一个文件的模块

export default api as NotificationApi; // 对导出模块进行重命名
```





##### 模块化说明

###### 模块化定义

- 将复杂的代码，按一定的规则(规范)封装成几个块(文件), 并进行组合在一起
- 块的内部相对是私有的, 只向外部暴露一些接口(方法)与外部其它模块通信



###### 没有模块化

- js文件中包含太多内容，文件大且不便于维护
- 一些通用的操作的重复编写，包含



###### 模块化作用

- 分开后，功能单一，便于维护、管理
- 提高复用性
- 降低耦合



###### 模块化分类

- Common.js
- AMD
- CMD
- ES6



###### 模块化实现方式变化历史

1、单纯的全局函数

> 缺点：全局污染，命名冲突



2、namespace模式

> 使用全局对象包装
>
> 优点：减少了全局污染
>
> 缺点：对象内部是暴露的，可被随意修改



3、IIFE

> immediately-invoked function expression 自动执行函数
>
> 优点：内部数据不暴露，可只暴露部分接口，通过传参可实现依赖的传入
>
> 缺点：？



###### 现代模块化

1、CommonJS

> 服务器模块规范，Node.js的模块化规范
> 	使用`Browserify`打包后，也可用于浏览器
>
> 使用：
> 	通过require("./xxx.js")和module.exports = { module} 或 exports.module = xxx实现 
>
> module是一个全局变量，module.exports = exports 
>
> 特点：同步加载，有缓存



2、AMD

> 异步模块定义规范，RequireJS 遵循的是 AMD（异步模块定义）规范
>
> 官网: http://www.requirejs.cn/
> github : https://github.com/requirejs/requirejs
> 将`require.js`导入项目: js/libs/require.js
>
> 由于浏览器和服务器的差异，浏览器使用同步加载是不现实的，AMD规范则是非同步加载模块，允许指定回调函数。故浏览器端一般会使用AMD规范。
>
> 使用:
>
> 导出
>
> ```javascript
> // 模块定义
> 
> // 无依赖
> define(function () {
> let msg = 'hello world lyuya';
> function dataServer() {
>  return msg.toUpperCase();
> }
> // 暴露这个模块
> return dataServer;
> });
> 
> // 有依赖
> // define(['模块1', '模块2', '模块3'], function (m1, m2，m3) {})
> // 一定要注意一一对应，前面有，后面一定要有，别忘记后面的传参
> define(['dataServer'],function (dataServer) {
> let msg = dataServer();
> function alerter() {
>  alert(msg);
> }
> return alerter;
> });
> 
> ```
>
> 导入
>
> ```javascript
> // 配置模块的路径
> requirejs.config({
> baseUrl:'./',  // 配置所有引入模块的公共路径（基本路径）
> // 模块标识名与模块路径映射
> paths : {
>  // 模块名称（一定要与引入的模块名称一一对应）: 模块的路径
>  dataServer: 'modular/dataServer',  
>  // 一定不能写文件的后缀名，它会自动补全
>  alerter: 'modular/alerter',
>  // 库/框架自己实现模块化的功能，定义了暴露模块的名称
>  jquery: 'libs/jquery-1.10.1'
> }
> })
> 
> // 主模块,下面requirejs可以用require代替,require是异步可缓存的
> requirejs(['alerter','jquery'],function (alerter,$) {
> alerter();
> $('body').css('background','pink')
> });
> 
> ```
>
> 特点：异步加载，有缓存



3、CMD

> 通用模块定义
> CMD是根据CommonJS和AMD基础上提出的。
>
> SeaJS 遵循的是 CMD （通用模块定义）规范。
>
> > `seaJS` 是国人阿里建立的，代表着海纳百川之意。
>
> 官网: http://seajs.org/
> github : https://github.com/seajs/seaj
> 将`sea.js`导入项目: libs/sea.js
>
> 使用：
>
> 导出
>
> ```javascript
> define(function (require, exports, module) {
>  /*
>    require: 引入依赖模块
>    exports: 暴露模块
>    module: 暴露模块
>   */
>  const msg = 'moduleone';
>  function getMsg() {
>    console.log('module1 getMsg() ' + msg);
>    return msg;
>  }
>  //暴露模块
>  module.exports = getMsg;  // 参考commond.js
> })
> ```
>
> 导入
>
> ```javascript
> // 异步引入模块
> require.async('./module2', function (m2) {
>    console.log(m2.msg1, m2.msg2);
>  })
>  console.log('module4执行了~~~');
> })
> 
> // 同步导入
> define(function (require) {
>  const m3 = require('./module3');
>  require('./module4');
> 
>  console.log(m3.msg);
> })
> 
> ```



4、UMD

> Universal Module Definition,AMD 和 CommonJS 的兼容性处理
>
> 应用 UMD 规范的 JS 文件其实就是一个立即执行函数，通过检验 JS 环境是否支持 CommonJS 或 AMD 再进行模块化定义。
>
> ```javascript
> (function (root, factory) {
>  if (typeof exports === 'object') {
>      // commonJS
>      module.exports = factory();
>  } else if (typeof define === 'function' && define.amd) {
>      // AMD
>      define(factory);
>  } else {
>      // 挂载到全局
>      root.eventUtil = factory();
>  }
> })(this, function () {
>  function myFunc(){};
> 
>  return {
>      foo: myFunc
>  };
> });
> 
> ```
>
> 

5、ES6模块化

> 动态引入（按需加载），没有缓存





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

##### 偏应用和柯里化
柯里化
> n个参数的函数，转化为n个一元函数的嵌套

偏应用
> 通过预先提供部分参数，当实际使用时可以自动填上(不限于返回一个一元函数)



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



将null或者是undefined作为this的绑定对象传入call、apply或者是bind,这些值在调用时会被忽略，实际应用的是默认绑定规则



默认绑定
隐式绑定
强制绑定
New绑定



#### 对象

使用obj[key]来判断，如果value是false的就会有问题



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



#### async/await

[async/await 原理与实现](https://github.com/zexiplus/theory/blob/master/async/async.md)

```javascript
// Promise.reslove().then
Promise.reslove = (data) => {
	return new Promise((res) => {  res(data); });
}

// 在then 中return而不是res()/rej();
Promise.reslove(1).then(() => {})

// resolve传入参数为Promise时，会等待传入的Promise完成
// data is Promise,  data --> xxx
((data) => {
	return new Promise((res) => {  res(data); });
}).then(xxx)
// Promise.resolve(new Promise)

```



#### 装饰器

ES7 中的 decorator 同样借鉴了这个语法糖，不过依赖于 ES5 的 `Object.defineProperty` 方法

decorator ===  高阶函数，通过Object.defineProperty进行处理

> 通过高阶函数可以实现装饰器传参



#### 存储

##### LocalStorage

localstorage的key也会占用空间



### 原型、类

#### 概述

原型(可类比父类)是一个对象他的构造函数指向对应的function，是由这个function实例化的对象
​	原型的property又指向它的父原型
​	function又有property属性，它指向的是实例化的原型

原型是一个实例

对象没有prototype,只有__proto__,函数才有prototype

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



#### SetTimeOut递归

递归调用时，清除上一次操作形成的闭包占用的内存。使用递归定时，可以用clearTimeOut清除？

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


##### 基础
[] 
> 集合
>
> [123] ==> 匹配1、2、3
>
> [0-9]、[a-z]


{}
> 范围
>
> {2}  匹配两次
>
> {2,}至少匹配两次

()
> 分组



匹配中文
> [\u4e00-\u9fa5]


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



初始

t1().then(t2).then(t3); 

T1返回Promise   .then  产生基于t2的Promise,将Promsie的resolve存在t1的回调中，返回基于t2的新Promise

T3存在基于T2的Promise中，完成

 

回调

T1完成，回调t2，t2返回Promise，是异步操作，等待t2完成，resolve基于t2的新Promise

回调t3的Promise





#### Json

对象数据转json字符串    JSON.stringify(this._cellData)	对象会被序列成json字符串   
字符串转json     eval(""+ ？+"")或 JSON.parse?



#### Canvas

##### Methods

- toDataURL     将canvas内容转成base64编码的数据
- getActiveObject  获取当前图层
- sendBackwards  将图层往后一层?
- bringForward    图层往前一层
- renderAll      强制重新渲染



#### Event

##### 阻值默认功能

e.preventdefault

> 阻值默认的功能
> 如 a 可以阻值跳转和页面刷新

其他阻值默认行为方式

> 直接return false;
> javascript:;
> javascript:void 0;
> javascript:void 1;



##### MouseEvent

​	onclick触发时传递一个参数，是MouseEvent类型的对象，里面包含了相关的鼠标信息

##### 键盘

e.keycode

> 记录按下键盘的键值
> 32 space
> 8 backsapce
> 13 enter



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



##### 事件绑定

绑定事件使用addevent ，直接使用onxxx= 容易被覆盖

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

#### 节流、防抖

quick增加防抖和节流

> 防抖：只有足够的空闲时间，才执行代码一次。
>
> > 当停止输入一定时间后才执行代码
>
> 节流：一定的时间内只执行一次代码
>
> > 连续 多次点击搜索按钮



#### 异常捕获

[各种方式的异常捕获](<http://news.51cto.com/art/201903/593360.htm>)



##### window.onerror 

> 当 `JS` 运行时错误发生时，`window` 会触发一个 `ErrorEvent` 接口的 `error` 事件，并执行 `window.onerror()`。
>
> 可以进行一个错误拦截
>
> `window.onerror` 函数只有在返回 `true` 的时候，异常才不会向上抛出，否则即使是知道异常的发生控制台还是会显示 `Uncaught Error: xxxxx`
>
> 
>
> 注意
>
> - `onerror` 最好写在所有 `JS` 脚本的前面，否则有可能捕获不到错误；
> - `onerror` 无法捕获语法错误；
>
> 
>
> 使用场景
>
> `onerror` 主要是来捕获预料之外的错误，而 `try-catch`则是用来在可预见情况下监控特定的错误
>
> ```javascript
> window.onerror = function (msg, url, lineno, colno, stack) {
>     // 上报 【js错误】事件
> }
> // 无法捕获promise的内部错误
> ```



##### unhandledrejection

promise抛出的错误，onerror无法捕获的异常，可用	window.addEventListener('unhandledrejection')  进行捕获处理

```javascript
window.addEventListener('unhandledrejection', function (e) {
    var reg_url = /\(([^)]*)\)/;
    var fileMsg = e.reason.stack.split('\n')[1].match(reg_url)[1];
    var fileArr = fileMsg.split(':');
    var lineno = fileArr[fileArr.length - 2];
    var colno = fileArr[fileArr.length - 1];
    var url = fileMsg.slice(0, -lno.length - cno.length - 2);}, true);
    var msg = e.reason.message;
    // 上报 【js错误】事件
}
```



##### React 异常捕获

componentDidCatch

> 可以非常简单的获取到 `react` 下的错误信息

error boundary

> 不会捕捉下面这些错误。
>
> 1.事件处理器
> 2.异步代码
> 3.服务端的渲染代码
> 4.在 `error boundaries` 区域内的错误



#### 模态框

##### 基本要素

- 模态框的蒙层：`modal-overlay`
- 模态框头部：`modal-header`
- 模态框主体：`modal-body`
- 模态框脚部：`modal-footer`
- 关闭按钮：`modal-close`
  - 取消按钮
  - 关闭按钮
  - `ECS`键
  - 点击模态框窗体外的区域关闭模态框



##### 知识点

- CSS的`transition`或`animation`相关知识点
- JavaScript DOM操作相关知识点
- JavaScript 构造器和构造函数
- JavaScript 事件监听
- JavaScript 函数



#### SourceMap

1、生成的js会有路径，浏览器会去拉取对应的map

2、为了安全吗，不暴露源码，可以将sourcemap，放在内部网络的路径下



### 兼容编译

#### babel

[babel详细说明](http://www.cnblogs.com/jiebba/p/9613248.html?hmsr=toutiao.io&utm_medium=toutiao.io&utm_source=toutiao.io)
babel只转换语法不转换api   如：map,set,object.assign





### 编码规范

#### ESLint

[eslint规范](https://codexu.github.io/docs/2-basics/5-eslint.html)