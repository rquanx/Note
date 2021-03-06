[TOC]

### 基本知识

#### 简介

ES2015（ES6）

#### 数据类型

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

##### Number

避免了短整型溢出
infinity表示大于1.79.....e+308的值
Number(xx)  和 new Number(xx)  不同,一个是类型转换

##### String

在 JavaScript 中，字符串值是一个由零或多个 Unicode 字符（字母、数字和其他字符）组成的序列。



###### 方法

**trim**

xxx.trim()，trim()不止过滤普通空格（Space键敲出来的空格）



**全角转换**

全角转半角String.fromCharCode(str.charCodeAt(i)-65248)是常规方法，适用于任何全角字符



###### 模板字符串

可以用来声明多行字符串

 ${name}字符串模板进行拼接，ie不兼容

###### 标签模板

通过模板字符串调用函数

```js
const func = (...arg) => console.logO(arg)
const a = 'hhh'
fun`asd${a}`

// 本质是一个array like的对象
```



###### 执行字符串代码

1、eval 

2、new Function



###### 其他

**换行**

当反斜线字符“\”位于一行的末尾（其后立即是代码文本中的换行）时，也用于表示连续的字符串声明







##### Null

null === 没有对象，object原型的原型就是null

> 底层是二进制数字为000???

##### Symbol

普通的方式无法获取到symbol生成的结果

某种程度上可实现私有变量，但是Reflect.ownKeys()能获取到以symbol为key的属性



###### 唯一性

每次产生都是唯一值，不会冲突



##### Undefined

###### void 0

Void 0 可以代表undefined,由于局部undefined实际也是可以被赋值的，所以void 0更准确,void后面跟1、2、3都一样

> void 运算符仅求值其操作数，然后返回 undefined。访问 undefined 的一种常见手法是 void 0



在ECMAScript 5后通过设置是否可写属性设置为false，所以全局上的undefined是不可修改的，但是局部在可被修改




#### 运算符

运算符优先级   类型隐式转换

##### 三元运算符

a ? a : b ==> a || b

##### ==

来源：原本是为了响应 alpha 用户的请求，以简化 JavaScript 同 HTTP / HTML 的集成。

例如，Netscape 的内部用户要求使用 == 来比较包含字符串值 "404" 的 HTTP 状态码与数字 404。他们还要求在

数字上下文中将空字符串自动转换为 0，从而为 HTML 表单的空字段提供默认值。这些类型转换规则带来了一些

意外，例如 `1 == '1' 且 1 == '1.0'，但 '1' != '1.0'`



[== 时的类型转换](https://tc39.es/ecma262/#sec-abstract-equality-comparison)

> 数字/字符串/bool == 数字/字符串/bool   类型不一致时，会将另一方转成数字 



##### +

[为什么 + 'b' === Nan](https://tc39.es/ecma262/#sec-unary-plus-operator)



**var x, y = 1; x + y = ?**

undefined+1 = NaN

运算符 + 的implicit type	conversion规则



##### ,

```js
(0, foo.fn)(args)
// 切断fn中的this于foo的绑定关系
// 逗号表达式表示先执行左边，再执行右边，最终返回右边，(0, person.getName)相当于返回了person.getName的引用
// 相当于const fn = foo.fn; fn(args)
```



##### 逻辑运算符

```js
// a || b       结果返回其中为真的值，按顺序判断
"123" || "456" // ==> "123"
a && b   //  a、b均为真 返回b,否则返回a
0 == "\n"  // true,弱等问题
```



#### 循环

##### 迭代器

解构赋值使用的是迭代器
For of可中断，中断时会调用return函数

> break / throw,均会执行return

##### for

```javascript
// for of  本质通过迭代器(symbol.iterator)的next()   可自定义
for(var i of array) {

}  

// for in 遍历所有可枚举的属性,

for(var i in obj) {}
```



**for in**

- 数组的键名是数字，但是`for...in`循环是以字符串作为键名“0”、“1”、“2”等等。
- `for...in`循环不仅遍历数字键名，还会遍历手动添加的其他键，甚至包括原型链上的键。
- 某些情况下，`for...in`循环会以任意顺序遍历键名。



#### 注释

块注释和正则表达式可能会有冲突



#### 模块

##### 定义

- 将复杂的代码，按一定的规则(规范)封装成几个块(文件), 并进行组合在一起
- 块的内部相对是私有的, 只向外部暴露一些接口(方法)与外部其它模块通信

##### 语法

import自动置顶，提前运行
import是静态的，不能运算

```javascript
// 整体加载
import * as x

// 在一个js中有多个export时,整体加载;  可以使用x.xx获取

// --------------------------------------------

export{x}     
import{x}  from path 

// --------------------------------------------

// 重命名引入的变量
import{x as y} from xxx

// --------------------------------------------




export * from './components/DatePicker/index'; // 直接从导出另一个文件的模块

export default api as NotificationApi; // 对导出模块进行重命名，不需要知道变量名即可加载，方便但有潜在问题
```



##### 作用

- 维护性：分开后，功能单一，便于维护、管理、降低耦合
- 复用性

##### 分类

- Common.js
- AMD
- CMD
- ES6



##### 进化史

###### 旧模块化

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
> [官网](http://www.requirejs.cn/) [github](https://github.com/requirejs/requirejs)
> 将`require.js`导入项目: js/libs/require.js
> 
>由于浏览器和服务器的差异，浏览器使用同步加载是不现实的，AMD规范则是非同步加载模块，允许指定回调函数。故浏览器端一般会使用AMD规范。
> 
>使用:
> 
>导出
> 
>```javascript
> // 模块定义
> 
> // 无依赖
> define(function () {
> let msg = 'hello world lyuya';
> function dataServer() {
> return msg.toUpperCase();
>  }
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
> alert(msg);
>  }
> return alerter;
> });
> 
> ```
> 
>导入
> 
>```javascript
> // 配置模块的路径
> requirejs.config({
> baseUrl:'./',  // 配置所有引入模块的公共路径（基本路径）
> // 模块标识名与模块路径映射
> paths : {
> // 模块名称（一定要与引入的模块名称一一对应）: 模块的路径
>  dataServer: 'modular/dataServer',  
>  // 一定不能写文件的后缀名，它会自动补全
>  alerter: 'modular/alerter',
>  // 库/框架自己实现模块化的功能，定义了暴露模块的名称
>  jquery: 'libs/jquery-1.10.1'
>  }
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
>特点：异步加载，有缓存



3、CMD

> 通用模块定义
> CMD是根据CommonJS和AMD基础上提出的。
>
> SeaJS 遵循的是 CMD （通用模块定义）规范，是国人阿里建立的，代表着海纳百川之意。
>
> [官网](http://seajs.org/) [github](https://github.com/seajs/seaj)
>将`sea.js`导入项目: libs/sea.js
> 
> 使用：
> 
>导出
> 
>```javascript
> define(function (require, exports, module) {
> /*
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
>```javascript
> // 异步引入模块
>require.async('./module2', function (m2) {
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



###### 模块化坑

对象解构(object destruct)的语法和 命名导出(named export)的语法长得一模一样
> 和import / export一起使用时不是对象解构，所以export default { } ; import { } from 会有问题，但是目前的打包修复了，但是建议不要这样？？？

> 禁止对复合对象字面量进行导出操作包括数组和对象



#### 函数

arguments.callee   指向当前函数声明的==>函数名，由于函数名是一个存储指针的变量如果在内部使用函数名即变量名进行调用，后续如果变量名改变了那么就可能会影响内部，使用callee则可避免

caller属性  记录着被调函数的引用，
​	函数名.caller
​	arguments.caller
​	arguments.callee.caller 
​	可能已被禁用



##### Function



##### AsyncFunction

**构造Async**

如`new Function`,async函数需要通过另外的方式构造
```js
const f async function(){}
console.log(f.constructor) // AsyncFunction() { [native code] }
const AsyncF = f.constructor // 使用方式和new Function一样
```



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
原理：沿着原型链查找对象原型是否匹配

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



- 默认绑定：作用域
- 隐式绑定：obj.xxx?
- 强制绑定： bind、apply
- New绑定



#### DOM

##### 自定义事件

```js
const event = document.createEvent('Event');
const evtType = 'fake-event';

// 初始化Event，并设置事件名
event.initEvent(evtType, false, false);


// 监听Event
const fakeNode = document.createElement('fake');
fakeNode.addEventListener(evtType, callCallback, false);

// 触发事件
fakeNode.dispatchEvent(event);
```





#### 对象

使用obj[key]来判断，如果value是false的就会有问题



##### URL

query 部分会对一些字符进行百分号编码，具体是 ASCII 码以外的字符（比如汉字）、ASCII 里的控制字符（0x00-0x1F，0x7F）、以及几个特殊符号：空格、"、#、<、> [规范](https://url.spec.whatwg.org/#c0-control-percent-encode-set)



##### 内存泄漏？
对象key

当key为数字时自动转化为字符串的key,可能会存在内存泄漏？
```js
var a = { 1: 1 } // 1会自动被转化为"1"
```

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



#### 解构赋值



##### 数组解构

本质是利用了迭代器

```js
var myIterable = {};
myIterable[Symbol.iterator] = function* () {
  yield 1;
  yield 2;
  yield 3;
};

[...myIterable]	// 让对象也支持类似数组解构
```



##### 对象解构

找到同名属性，然后再赋给对应的变量，数组本质是特殊的对象，可以通过索引作为kay进行对象解构



#### async/await

[async/await 原理与实现](https://github.com/zexiplus/theory/blob/master/async/async.md)





#### 装饰器（草案中）

ES7 中的 decorator 同样借鉴了这个语法糖，不过依赖于 ES5 的 `Object.defineProperty` 方法

decorator ===  高阶函数，通过Object.defineProperty进行处理

> 通过高阶函数可以实现装饰器传参


为何无法对普通函数使用？
> 由于存在函数提升，类不存在提升，所以普通函数无法使用装饰器，即使要使用也可以使用高阶函数替代

##### 类装饰器
接收一个类返回新的构造函数

```js
function HOF(class) {
    return function newClass() {this.x = ""}
}
@HOF
class Test {}

```

##### 方法装饰器
Object.defineProperty


#### 存储

##### LocalStorage

localstorage的key也会占用空间



##### sessionStorage

打开新页面会复制一份原有的sessionStorage 



### 原型、类

#### 概述

原型(可类比父类)是一个对象他的构造函数指向对应的function，是由这个function实例化的对象

- 原型的property指向它的父原型
- function有property属性，它指向的是实例化的原型
- 原型是一个实例（父类）
- 对象没有prototype,只有__proto__,函数才有prototype



ES5：
通过xx.property.x = xx   定义的属性是所有实例共享的，如果实例重新设置可以屏蔽原型的属性，但如果是引用值,修改它的内容会影响所有的实例



```javascript
new F().__proto__ === F.prototype
// 构造函数的prototype指向原型
```

#### 原型链

原型指向的是一个对象

#### 构造函数

**寄生构造函数**
​	和工厂模式一模一样，可用于对一个类进行特定的修饰，而又不想影响它原本的构造函数时使用

借用构造函数
​	通过原型链继承后，所有的属性都会被共享，对于引用类型就又产生问题了
​	通过借用构造函数，即在内部调用父类的构造函数，对其重新进行初始化，这样对于引用类型就会产生新的副本，从而避免
​	但是这样就又不能对函数进行复用

**组合继承**：原型链实现方法的继承，借用构造函数实现属性的复制继承，但会调用两次父类构造函数

**寄生式组合继承**: 最理想的方式

#### 文章

[从原型进行深入拓展探讨](https://zhuanlan.zhihu.com/p/87667349?utm_source=qq&utm_medium=social&utm_oi=583565170786308096)

> 要展开 JS 原型的复杂背景，我们需要将镜头拉远，看到不同编程语言和编程范式下，如何组织数据和行为。从这种宏观的，对比的角度中，了解 prototype 看待数据和行为的方式、其优势和劣势在哪里。如此得到更全面的理解
> 原型 === 部分功能的链表
>
> 
>
> ##### 重点
>
> 在规范里，prototype 被定义为：给其它对象提供共享属性的对象。
>
> 
>
> ###### react-hooks
>
> 对象这个概念的瓦解——数据、行为及其关联是三个维度，它们不应被捆绑在对象中。
>
> 数据可以单独声明（useState），行为也可以单独声明（useEffect），数据和行为可以进行可选的关联（custom-hooks）
>


#### 应用

##### 并发数量控制
使用Promise数组 + Promise.race来控制，当有完成的时候pop出对于的元素，然后push进下一个promise，可实现同时并发请求且控制数量



##### 模拟抽象类

构造函数中抛出异常来防止不重写直接调用



#### 类

Class X{  a = () => {} } 会将函数绑定到this（实例）上，无法共用

Class XX { a() {}}  会绑定到原型上，可共用



**属性枚举**

类内部声明的方法，是不可枚举的，而通过原型链声明的方法是可以枚举的



### 作用域

#### 初始化

vo顺序
函数参数
函数声明
变量声明

[javascript 从定义到执行，你不知道的那些事](http://www.webhek.com/post/javascript-from-define-to-execute.html)



#### 小知识点

{    }手动给let添加块作用域，回收垃圾

prototype方法无法访问 构造函数var 变量，作用域，无法访问






#### 闭包

##### 说明

在定义时就确定了作用域 ==> 执行栈
闭包主要使用了作用域链



##### 作用

- 防止污染全局变量
- 模块化：通过闭包返回值，可以实现私有变量；隐藏对象api;

##### 原理

​	利用了js的作用域,在外部通过特定的方式使用了闭包函数内的作用域

​	条件
> 1、用到上一个作用域链(函数)中的变量
> 2、在执行上下文中定义的函数（执行上下文，在执行函数的时候创建的环境）

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



##### 内存泄漏

闭包函数虽然没使用到外部变量，但是会隐式持有？？？



#### 作用域和调用栈



调用栈：表示当前函数环境调用的深度



作用域：作用域（词法环境）在静态代码中已限定，定义函数时的环境与调用时的环境会不用，所以与调用栈无关



```js
const fn1 = (f) => {
  var a = 1;
  f();
}

const fn2 = () => { var b = 2;console.log(b); }

fn1(fn2);
```



#### 变量提升

Let、const其实也会`提升`，但是不会被初始化，而var则会被初始化为undefined，class也会提升，但是一样不会进行初始化

所以访问let的时候才会报错

所以才产生暂时性死区



### 常用基本对象

#### Global

所有全局的属性和函数都是在global下的,global又是window对象的一部分,形成循环引用

##### 内置方法

**编码**
作用：将url进行编码，方便发送给服务器，当含有非法字符(有效的URI不能包含某些字符)时也可以替换

encodeURI   编码时会忽略某些特殊编码: ;,/?:@&=+$#
encodeURIComponent	全部编码
decode...

#### Map
map对象要通过.set,.get,.delete进行操作，key可以是对象

**this**

- Map|Set:内部存储的数据必须通过 this 来访问，无法被 Proxy 代理 set 操作,需要通过 get 代理进行 bind 绑定后才能进行 set
- Array: 由于历史原因，数组不会有 Map|Set 的问题

#### Array

**sort**   

返回 1，0，-1      1则放后面，-1就放前面

**slice**

slice(start,end) 

slice(0,3)  从0到第三个  切出3个
slice(1,3)	从0到第三个 切除2个    头不包含

**splice**     

对数据进行删除，替换，插入

**其他**
every
filter
foreach
some
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

##### reduce

```js
function add(a,b) {
    return a + b;
}

// 对两个参数的处理，加上reduce可以对多个进行处理
[1,2,3,4].reduce(add)

```



##### proxy



- push 的内部逻辑就是先给下标赋值，然后设置 length,触发 set
  > 第一次为插入元素
  > 第二次为 length 修改，但 length 已经是新值了
- shift 或 unshift,如果数组长度是 N，shift|unshift 就会触发 N set
  
  > 往前插入、删除一个，全部元素往前挪
- splice 同样会产生多次
  
  > 会产生元素索引挪动

影响: proxy 代理时会触发多次 set,push 可通过判断 length 来避免,shift 等（Vue 不解决，而是通过批量渲染来保证最终不会渲染多次）



#### Date

- 使用set函数可以设置日期
- 日期间可以直接通过运算符进行比较
- new的时候可以传入日期产生对应的(ie和safari有兼容性问题，见浏览器.md)
- new date(xxxx-xx-xx)   会自动调用date.parse(xxxx-xx-xx)	

```javascript
// 可接受年月日时分秒参数，是本地时间。
new Date(year, month[, day[, hour[, minutes[, seconds[, milliseconds]]]]]);
// 构造时设置day为0，读取getdate可以读取对于月份的天数

new Date('2020-02-10')   // 符合 ISO 8601 格式，所以被解析成為 UTC +0 的 2 月 10 號 0 點 0 分，所以我們看到的結果才會是 +8 時區的 8 點。
new Date('2020/02/10')   // 不符合 ISO 8601 格式，V8 會當作是 local time
// 2020-02-02 13:00:00      // 不符合 ISO 8601 格式，Safari  Invalid Date
// 2020-02-02T13:00:00      // 符合 ISO 8601 格式,Chrome Sun Feb 02 2020 13:00:00 GMT+0800,Safari Sun Feb 02 2020 21:00:00 GMT+0800,Safari当作utc进行处理
```

#### Console

console.log(object [, object, …])

占位符：根据占位符的位置填入后续递n个参数的内容
- %s: 字符串
- %d or %i: 整数
- %f: 浮点数
- %o: 收起的对象、收起的DOM
- %O: 收起的对象、展开的DOM
- %c: 传入css样式，会对输出的内容进行渲染



##### 应用

**利用console显示ASCII字符画**

利用工具生成字符串即可

- [picascii](http://picascii.com/)

- [img2txt](https://www.degraeve.com/img2txt.php)

- ASCII Generator



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

##### Mode	

/xxx/mode

- g:全局，匹配所有的，否则只匹配一个
- i:不区分大小写
- m:多行

##### 操作符

###### ?

如果在数量词 *、+、? 或 {}, 任意一个后面紧跟该符号（?），会使数量词变为非贪婪（ non-greedy） ，即匹配次数最小化
```js
// 尽量匹配多的a进行替换
console.log("aaabc".replace(/a+/g, "d")); // dbc

// 匹配少的a进行替换
console.log("aaabc".replace(/a+?/g, "d")); // dddbc
```



###### 开头 ^
```js
/^130/
// 匹配开头为130的
```

###### 结尾 $

```js
/130$/
// 匹配结尾为130的
```



###### 或 |
```js
/a|b/
// 匹配含有a或b的
```



**结合^ $应用**

```js
/^a|b$/ ==>  /^a$/ + /^b$/
// 匹配只有a或者只有b的
```



###### 集合 []

```js
/[abc]/
// 匹配a/b/c

/[0-9a-z]/
// 匹配 0~9和a~z
```



**集合下的 ^**

```js
/[^0-3]/
// 匹配不是0~3的
```



###### 范围 {}

```js
/^130\d{2,5}$/

// 130开头，至少2个，至多5个 \d

// {2,}  至少两个

// {2} 只有2个

// - ==> {1,}   * ==> {0,}   ? ==> {0,1}
```



**任意一个字符 .**

```js
/^130........$/

// 匹配130开头的11位字符串

// . ==> {1} ???
```



**至少一个字符 +**

```js
/^130\d+$/

// 130开头且后面至少有一个 \d 即数字

// + ==> {1,} 


```

**任意个字符 ***

```js
/^130\d*/
//  130开头,后面可以有任意个 \d 即数字

// * ==> {0,}
```



**最多一个 ?**

```js
/^130\d?/

// 130开始后面最多跟一个\d

// ? ==> {0,1}
```



###### 分组 ()
将内容作为整体进行匹配

```js
/^(Ho){3}~$/ 

// 匹配 HoHoHo~

/^性别：(男|女)，角色：(管理员|游客)$/

// 匹配 性别：男，角色：管理员、性别：男，角色：游客、性别：女，角色：管理员 或 性别：女，角色：游客。
```



###### 引用

将分组的结果重复使用，分组自动从1开始进行编号

```js
/^['"]\w+['"]$/

// 匹配 "a"、'b'、'c"、"d'

/^(['"])\w+\1$/

// 匹配 "a"、'b'， (['"])分组匹配出 ' / ", 通过\1重复使用它的匹配结果
```



##### 字符
实际根据引擎实现有所不同

###### 任意数字 \d

```js
/^130\d\d\d\d\d\d\d\d$/

// 匹配130开始的11为数字
```



###### 单词字符 \w
大写 + 小写 + 0~9 + _



###### 空白符 \s
空格 + 制表符(\t) + 换行符(\n) + 换页符(\f)



###### 单词边界\b

表示单词边界




##### 杂
###### 匹配中文

[\u4e00-\u9fa5]




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

为了处理异步resolve，用2个数组onFullfilledArray和onRejectedArray来保存异步的方法



##### 执行流程


初始

t1().then(t2).then(t3); 

T1返回Promise   .then  产生基于t2的Promise,将Promsie的resolve存在t1的回调中，返回基于t2的新Promise

T3存在基于T2的Promise中，完成

 

回调

T1完成，回调t2，t2返回Promise，是异步操作，等待t2完成，resolve基于t2的新Promise

回调t3的Promise



##### Promise.reslove

```js
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



- `Promise resolve`后，跟着的then中的回调会马上进入微任务队列

- `return`了`Promise.resolve()`后的then需要落后两个微任务队列



#### Json

对象数据转json字符串    JSON.stringify(this._cellData)	对象会被序列成json字符串   
字符串转json     eval(""+ ？+"")或 JSON.parse?

##### JSON.stringify
###### 第二个参数
替换器参数,可以是数组或函数
> 数组可用于过滤出想要的属性
> 函数可用于接收key,value，并通过返回值对输出的value进行自定义

###### 第三个参数
缩进处理，数字或字符串，如果是数字会以空格进行缩进

###### toJSON方法
如果对象函数toJSON方法，stringify时会调用这个函数
```js
const json = JSON.stringify({
  answer: { toJSON: () => 42 }
});

console.log(json); // {"answer":42}
```



**JSON.parse(objectString)的性能要比对象字面量**

JS是解释语言，对于 JS 引擎来说，不管对象字面量还是json字符串，在 JS 引擎眼里其实也就是字符串，处理流程都是首先需要解析整一句语句，然后对其进行词意分析，语义分析等等编译流程，最后生成变量和对象。

JSON.parse性能更好的原因：JSON 的关键字比 JS 少，JS 引擎对对象字面量做的编译，要考虑所有 JS 关键字和语法，而JSON.parse只需要考虑 JSON 的语法和关键字，处理时可以省略很多处理



##### JSON.Parse

特殊符号会无法解析



#### 编码

**escape**

返回一个字符的Unicode编码值

除了ASCII字母、数字、标点符号"@ * _ + - . /"以外，对其他所有字符进行编码。在\u0000到\u00ff之间的符号被转成%xx的形式，其余符号被转成%uxxxx的形式



#### Canvas

Canvas元素默认宽 300px, 高 150px
> CSS规范中定义的，作为替换元素，默认的尺寸是300*150,<svg>元素也是替换元素，因此，<svg>默认的尺寸也是300\*150



##### Canvas画布大小调整

通过css设置px的方式设定canvas宽高的时候会导致容器拉伸，但是内容画布仍以默认宽、高进行计算，从而呈现出意外的结果

canvas标签设置width和height的时候，有以下几种方式和产生的后果

方法一：
```html
<canvas width="500" height="500"></canvas>
```

方法二：使用HTML5 Canvas API操作
```js
var canvas = document.getElementById('欲操作canvas的id');
canvas.width = 500;
canvas.width = 500;
```



若通过如下方法设置宽高，那么Canvas元素将由原来大小被拉伸到所设置的宽高：
方法一：使用CSS 会被拉伸

```css
.canvas｛
    width:1000px;
    height:1000px;
｝
```
也包含了行间样式中的 style="" 。也就是上面的例子，也会产生拉伸的情况。

方法二：使用HTML5 Canvas API操作 会被拉伸
```js
var canvas = document.getElementById('欲操作canvas的id');
canvas.style.width = "1000px";
canvas.style.height = "1000px";
```

其它：canvas的width和height也不能用百分比表示。canvas会将百分值当成数值显示




##### Methods

- createRadialGradient:创建放射状/圆形渐变对象
    - addColorStop: 向渐变对象增加渐变色
- createLinearGradient：线性渐变
- strokeStyle: 设置画笔颜色
- fillStyle: 填充颜色
- fill: 填充图像,如果路径未关闭，那么 fill() 方法会从路径结束点到开始点之间添加一条线，以关闭该路径，然后填充该路径
- shadowBlur: 阴影相关

**getContext**

contextType

- 2d：创建 CanvasRenderingContext2D 二维渲染上下文，像图片这种二维空间的选这个类型。

- webgl/experimental-webgl：创建 WebGLRenderingContext 三维渲染上下文对象，适用于三维动画制作开发。

- webgl2/experimental-webgl2：创建一个 WebGL2RenderingContext 三维渲染上下文对象，webgl的升级版本。

- bitmaprenderer：将创建将canvas内容替换为指定ImageBitmap功能的ImageBitmapRenderingContext，canvas与位图的生成

**drawImage**

只在contextType为2d的时候才可以被调用

参数可设置位置、大小.....

可进行画图、组合图、剪切图、放大镜



**toDataURL**     

将canvas内容转成base64编码的数据, data:[<mediatype>][;base64],<data>

通过参数可设置质量



**getActiveObject**  

获取当前图层

**sendBackwards**  

将图层往后一层?

**bringForward**   

 图层往前一层

**renderAll**      

强制重新渲染



**save、restore**

存储/弹出画布状态，处理的不是画布内容，而是画布的绘制属性（即画笔设置）



##### 绘制圆形

```js
// 绘制圆形
ctx.beginPath();
ctx.arc(x,y,radius,0,Math.PI * 2);
ctx.closePath();
ctx.fillStyle;
ctx.fill();

// 清空
ctx.fillStyle = "rgba(255, 255, 255, .4)"; // 设置填充背景色
ctx.fillRect(0, 0, canvas.width, canvas.height);
```



##### 动画绘制步骤

1、绘出画布

2、绘出元素

3、定时计算元素位置、刷新画布、根据新的位置重绘元素，使用`requestAnimationFrame`

4、为元素设定运动轨迹（初始位置、位移量[速度]）

5、为元素设定物理特性（边界处理、碰撞处理...）




#### 其他

##### requestAnimationFrame

会在每次重绘前执行，在浏览器每一帧开始绘制之前会执行

每次 loop 结束发现需要渲染，在渲染之前执行的一个回调函数，不是宏微任务



[与屏幕刷新率有关](https://juejin.cn/post/6953541785217925151#heading-2)

缺点：页面处于后台时该回调函数不会执行



###### 使用requestAnimationFrame实现有哪些好处？

性能：相对于过去使用setInterval实现，requestAnimationFrame保证了每次改动样式后再进行回流重绘，setInterval可能使浏览器作出无效的回流和重绘。

稳定：requestAnimationFrame在每一帧的生命周期都会触发，会使动画更加流畅，而setInterval不能保证每一帧都能触发。

兼容：向下兼容IE10。对于IE9及其以下，可以降级使用setTimeout或者setInterval实现requestAnimationFrame的polyfill。

使用：自己写就可以实现各种不同的滚动速度了，可以实现线性速度，也可以实现先加速后减速的效果。



##### requestIdleCallback

该函数的回调方法会在浏览器的空闲时期(每一帧的空闲时间)依次调用， 可以让我们在事件循环中执行一些任务，并且不会对像动画和用户交互这样延迟敏感的事件产生影响

一秒只能调用回调 20 次（React Issue）



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

#### Intl

国际化对象，有自己的标准

**Intl.RelativeTimeFormat**

> 可以实现本地区域化相对时间格式。“昨天”，“20秒前”或“1个月”之类的短语



#### Math

**Max**

```js
// 取最大值
Math.max(...[1,2,3])
Math.max(1,2,3)
Math.max.apply(null,[1,2,3])
```





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



#### **BOM和WebPlatform**

BOM（旧有概念）其实是非标准的东西（维基百科），所以w3c也没有明确的说明文档，反而是有很多window扩展的标准文档



[WebPlatform](https://webplatform.github.io/docs/apis/): 新提出来的为了整合零散API，包含旧有的BOM概念



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

#### Document

Document.execCommand
富文本核心api，对信息进行加工处理,bold、insertImage、undo、redo….

#####  append

ie不兼容 append()

##### elementsFromPoint


获取到当前视口内指定坐标处，由里到外排列的所有元素

```js
 var elements = document.elementsFromPoint(x, y);
```

##### createElement

createElement不区分大小写

创建的dom元素是对象，引用类型，在dom树上只能存在一份

> 创建一个div，appendChild到body下作为最后一个子元素，再向body下的第一个div（非创建的） appendChild，会被转移到第一个div下，body最后一个子元素不是创建的div
>
> 如果进行循环引用的appendChild，会异常

应用: react组件缓存



##### Queryselector

兼容性较好，比getElement好用

#### Selection

可控制光标选中，获取选中信息

#### Notification

浏览器通知



#### Navigator

##### 视频

```js
var promise = navigator.mediaDevices.getUserMedia(constraints);
```

##### 定位

```js
var nav = navigator.geolocation
```







#### DOM

##### Document

- documentFrament  在批量添加元素时，可通过片段直接添加，避免反复渲染



##### 事件绑定

绑定事件使用addevent ，直接使用onxxx= 容易被覆盖

```xml
<button onclick="doSomethingWhenClicked()">
  Click me
</button>
<!--
处理完 HTML 元素后，浏览器将创建一个 JavaScript 函数，并将其赋为按钮对象 onclick 属性的值。
onclick 的代码片段会被用作函数体。当被 JavaScript 事件处理器监听的事件发生时，它将被放入未决（pending）事件池中。
一旦没有正在执行的 JavaScript 代码，浏览器就会从事件池中获取一个未决事件，并调用与其关联的函数。和脚本一样，事件处理器函数也是运行到完成为止的。
-->
```




##### 事件生命周期

[dom加载事件](https://javascript.info/onload-ondomcontentloaded)



##### 获取元素宽高

**getBoundingClientRect**

```js
dom.getBoundingClientRect().width
//dom.getBoundingClientRect().height
// 计算一个元素的绝对位置（相对于视窗左上角），它能拿到元素的left、top、width、height 4个属性
```



**getComputedStyle**

```js
window.getComputedStyle(dom).width
// window.getComputedStyle(dom).height
// 获取的也是浏览器渲染以后的元素的宽和高，但这种写法兼容性更好
```







##### MutationObserver

监测某个范围内DOM的变动，如节点的增减、属性的变动，文本节点的变化等，异步





###### 应用

**Dom节点变动检测并录制**

使用MutationObserver监听整个页面，每当有页面变动，则将页面的html转换成图片进行存储，回放用户操作即不停从队列中取出元素进行展示

html2canvas配合canvas.toDataURL实现录制图像



**长按截图**

监听长按的操作，然后html2canvas配合canvas.toDataURL实现



### 内置方法

#### SetTimeOut

settimeout告诉js多长时间后把这个任务加入到队列中，如果队列没有任务会马上执行，否则等待，会返回id用于取消

建议用settimeout来模拟setinterval ，因为setinterval有可能在前一次没完成前就又来了第二次



**setTimeout多久执行?** 

html5规范里规定最少4ms执行



#### 弹框

- alert
- confirm
- prompt



### Object

#### Object.is

判断两个值是否为同一个值,基础类型之间比对值，引用类型比对引用,+0 !== -0、Number.NaN == NaN

> === 会将+0 == -0,Number.NaN !== NaN

```js
Object.is(0, -0); // false
Object.is(0, +0); // true
Object.is(-0, -0); // true
Object.is(NaN, 0 / 0); // true
```



#### Object.keys

**顺序**

先对整数类型的key进行从小到大排序，然后其他类型的按创建时间排序




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

responseType indicates the type of data that the server will respond with options are 
    'arraybuffer', 
    'blob', 
    'document', 
    'json', 
    'text', 
    'stream'

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



##### 坑

xhr.open ie11 url为空字符串会抛异常



#### 跨域



### WebWorker

web worker的postMessage是深拷贝的

#### 数据传递方式
1、深拷贝
2、移交：传递实现了Transferable接口的数据时， 数据会被移交到目标线程的上下文中
> 不存在复制，因此性能会得到比较明显的提高



#### 竞争/锁

1、单纯使用共享内存，当多个worker运行时，容易竞争

2、为了解决竞争，浏览器提供了Atomics API，可以将操作封装成原子操作，不会被中断（锁）

3、基于Atomics API进行封装锁，从而解决竞争问题



### 迭代器



#### ... 解构运算符？

对象没实现`Symbol.iterator`，所以无法使用[...obj]

调用`Symbol.iterator`的场景

- for...of

- 数组和 Set 解构

- 扩展运算符

- yield* 



### 事件模型/事件循环/Event Loop

#### 概述

JS规范中是没有这个概念的，反而在html规范中定义，是宿主的东西

事件循环本质上是 user agent (如浏览器端) 用于协调用户交互（鼠标、键盘）、脚本（如 JavaScript）、渲染（如 HTML DOM、CSS 样式）、网络等行为的一个机制



#### 多队列

事件循环中可能会有一个或多个任务队列，这些队列分别为了处理：

- 鼠标和键盘事件
- 其他的一些 Task

浏览器会在保持任务顺序的前提下，可能分配四分之三的优先权给鼠标和键盘事件，保证用户的输入得到最高优先级的响应，而剩下的优先级交给其他 Task，并且保证不会“饿死”它们
> 这个规范也导致 Vue 2.0.0-rc.7 这个版本 nextTick 采用了从微任务 MutationObserver 更换成宏任务 postMessage 而导致了一个 [Issue](https://github.com/vuejs/vue/issues/3771#issuecomment-249692588)
> 在用户持续滚动的情况下 nextTick 任务被延后了很久才去执行，导致动画跟不上滚动了,后续又改回microTask 去实现 nextTick

**任务队列的分类标准之一**

一个线程可以拥有多个任务队列。每一个任务队列都对应某一任务源，并包含了一堆来自该任务源的任务。像setTimeout/Promise/DOM事件/AJAX等都是任务源，来自同类任务源的任务我们称它们是同源的，比如setTimeout与setInterval就是同源的

**任务队列的分类标准之二**

在ES6中，我们用另一种方式对任务队列进行分类。宏任务、微任务

#### 渲染

- 不是每次任务循环都会附带有渲染，有可能执行两次settimeout才进行一次渲染，所以定时器宏任务可能会直接跳过渲染

- resize和scroll事件其实自带节流，它只在 Event Loop 的渲染阶段去派发事件到 EventTarget 上



#### 运作

每一轮执行完宏任务后会清理所有的微任务

一般渲染后会执行宏任务



常见宏任务：setTimeout、MessageChannel、postMessage、setImmediate

常见微任务：MutationObsever 和 Promise.then，process.nextTick(Node.js 环境)



#### 执行顺序

- 执行同步代码，即script脚本，这属于宏任务
- 执行完所有同步代码后，执行栈清空
- 从微任务队列中逐个取出回调任务，放入执行栈中执行，直至所有微任务执行完成。注意：如果在执行微任务的过程中，产生了新的微任务，那么这个微任务会加入到队列的末尾，同样会在这个周期内被执行。
- 当执行完所有微任务后，如果有必要会开始渲染页面

​	

#### 优先级

宏任务：主代码块 > setImmediate（兼容性，Node.js 环境和ie） > MessageChannel > setTimeout / setInterval

> setImmediate指定的回调函数，总是排在setTimeout前面



#### QA



##### 执行微任务过程中产生微任务

执行完microtask queue中的所有的microtask，如果microtask执行过程中又添加了microtask，那么仍然会执行新添加的microtask，当然，这个机制好像有限制，一轮microtask的执行总量似乎有限制(1000?)，数量太多就执行一部分留下的以后再执行？



#### MessageChannel

MessageChannel的postMessage传递的数据是深拷贝的，可以拷贝undefined和循环引用的对象，但对于函数会报错



MessageChannel可作为两个worker之间传递消息使用

> 通过worker.postmessage的第二个参数将控制权转移来实现，直接传递由于消息传递时深拷贝，而messageChannel是不能拷贝的（控制权问题？）



##### 使用

```js
var channel = new MessageChannel();
var port1 = channel.port1;
var port2 = channel.port2;
port1.onmessage = function(event) {
  console.log("port1收到来自port2的数据：" + event.data);
};
port2.onmessage = function(event) {
  console.log("port2收到来自port1的数据：" + event.data);
};

port1.postMessage("发送给port2");
port2.postMessage("发送给port1");
```



#### Why

引入微任务的初衷是为了解决异步回调的问题

- 方案 1：将异步回调进行宏任务队列的入队操作
- 方案 2：将异步回调放到当前宏任务的末尾

如果采用第一种方式，那么执行回调的时机应该是在前面所有的宏任务完成之后，倘若现在的任务队列非常长，那么回调迟迟得不到执行，造成应用卡顿







### 小知识

#### AO

在新规范中，AO为广义的抽象，而不再是狭义的定义：`每当函数被调用的时候，其都会创建一个活跃对象。该对象对开发者不可见，是一个隐藏的数据结构，其中包含了一些函数在执行时必要的信息和绑定，以及返回值的地址等等`。



##### 类比

在 C 语言中，这个对象会在一个栈中被分配生成。当函数返回的时候，该对象会被销毁（或者出栈）。



JavaScript 与 C 语言不同，它是从堆中分配该对象。且这个活跃对象并不会在函数返回时被自动销毁，它的生命周期与普通对象的垃圾回收机制类似，是根据引用数量决定的



##### 旧规范中定义

在 ECMAScript 1 和 ECMAScript 3 中，的确是有着关于活跃对象的定义

当控制进入函数代码的执行上下文时，创建一个活动对象并将它与该执行上下文相关联， 并使用一个名为 arguments、特征为 {DontDelete} 的属性初始化该对象。该属性的初始值是稍后将要描述的一个参数对象



##### 新规范中替换

在 ES5 及之后的 ES 版本，已经不存在活跃对象（AO）及一系列周边内容的概念了。取而代之，是一个叫词法环境（Lexical Environments）的定义



##### 从AO角度理解闭包

一个拥有外层函数对象所对应的活跃对象引用的函数对象就被称为闭包。



#### 赋值

- 如果对象上该属性不存在，会查找原型链上的属性，然后创建一个自有属性并赋值
  
    > 坑：如果原型链上有此属性且writable为false，则会异常（？？），通过Object.defineProperty设置属性则不会触发原型链查找
- 如果对象上该属性已存在，则修改该属性的值，修改过程会触发该属性上的 data descriptor（writable 配置）检测或 accessor descriptor (setter 配置) 的调用。



#### 存储

值类型与调用栈（函数帧），一起打包存储到栈中，当函数出栈后，内存也就被释放

> 闭包变量是存在堆内存中的,否则当函数出栈时就被释放丢失



#### 支持URL协议

`javascript`:是浏览器可识别的特殊 URL 协议,这意味着要对后面的 JavaScript 代码求值，并使用将其转换为字符串的结果

```XML
<a href='javascript: void 0' />

<!-- 除非获得 undefined，否则 <a> 元素将尝试继续处理该响应文档。通常 Web 开发者想要的只是在单击链接时对 JavaScript 表达式求值而已。给表达式加上前缀 void 即可允许以这种方式使用该表达式，避免 <a> 元素的进一步处理 -->
```



#### 严格模式

类和模块内部都说严格模式，ES6把将代码都提升到了严格模式？



#### 按键

##### 绑定事件

一般绑定keydown事件

##### key和keyCode

Event.key和event.keyCode，如果不需要兼容IE8下，建议使用.key，不用考虑不同系统间keycode不一致的问题，也更方便理解

#### 事件绑定

##### 绑定移除

移除dom时浏览器会自动移除监听事件

##### 全局绑定

全局绑定事件可能会冲突，如为了实现点击上下选择东西，可能会与浏览器的上下滚动冲突

### JS应用

#### 跨域

- jsonp：通过插入一个 script 标签，利用 script 可以跨域请求来实现的，所以只支持get请求



#### 性能优化

- 使用for循环
- 数据结构优化尽量统一，减少类型变化？复用Shape?
- new Function：代码动态生成，对于遍历的数据可直接拍平计算，不用遍历进行计算
- 构造正则：正则是可以被jit编译成原生??



#### 中断事件

##### **AbortController**


```js
const controller = new AbortController();
const { signal } = controller;

el.addEventListener('mousemove', callback, { signal });
el.addEventListener('pointermove', callback, { signal });
el.addEventListener('touchmove', callback, { signal });

// 之后某个时刻，移除所有的三个监听器：
controller.abort();
```


#### 模拟实现准时的setTimeout

- while: 准确但阻塞主线程，不可用
- Worker: 准确且不阻塞
- requestAnimationFrame： 不准确
- setTimeout 时间补偿：每次以当前时间进行计算，调整时间



#### 字符串转DOM

**Range**

script脚本会执行，使用时候需要注意

```js
let elements = document.createRange().createContextualFragment(html).children;
```

**innerHTML**

**insertAdjacentHTML**

**DOMParser**

- HTML字符串、XML字符串，SVG字符串解析
- 反转义html(已转移的html字符串反转义)
- script脚本不会执行
- 性能最差

```js
new DOMParser().parseFromString(html, 'text/html').body.childNodes;
```



#### 请求缓存


- 缓存请求结果：在请求函数中内置对象进行缓存：

  - 缺点当短时间进行多次请求时，仍会产生多次请求
- Promise缓存：不缓存结果而是缓存promise，请求前判断是否存在promise缓存，存在则返回缓存的promise，即使短时间产生多次promise，由于共用同一个promise，请求结束后then会被遍历回调（请求成功/失败后需对缓存进行处理），promise完成状态变更后再被使用时会马上执行回调（reject可以使用Promise.reject(cb)）,Promise对象自动缓存了请求结果
- 多Promise缓存：针对同时发起多个请求请求数据时进行缓存，底层使用Primise缓存，封装循环调用即可

  - Promise缓存 + 循环请求 --> 多Promise缓存
- 时间缓存：设置请求过期时间




#### 瀑布流

本质：寻找各列之中高度最小的一列，并将新的元素添加到该列后面，只要有新的元素需要排列，就继续寻找所有列中的高度最小列，把后来的元素添加到高度最小列上



#### 禁用控制台

[防止打开控制台](https://segmentfault.com/a/1190000021459140)



#### 移动端缓存方案
h5要想做到返回某个页面时具有历史状态，必须借助一些方式:
1.利用浏览器的历史记录，可行但不便利，有些用户交互是不记录在浏览器的历史行为的。
2.利用全局store存储页面的数据以及交互状态，简单的可以，复杂的难，工作量较大，需要区分来源是首次正常加载还是从链路页面返回。
3.利用视觉效果，类似于app内的页面栈，页面层级管理，将新页面展示内容变为模态框全屏覆盖展示，返回时取消模态框显示。简单的1-2级链路可考虑。
4.组件缓存效果，比如vue本身组件支持keep-alive

#### 懒加载
方案
1、原始高度等属性+window.scroll
2、getBoundingClientRect+window.scroll
3、IntersectionObserver	监听元素是否可见，可用于懒加载（图片/单页应用资源）
4、chrome loading=lazy

#### 画图

橡皮擦功能：使用当前背景色作为画笔

撤回：每次画完将结果保存并且push，撤销时pop



#### 上传文件至后端

##### FormData
1、formData ajax
```js 
var formData = new FormData();
formData.append()// file?

// ajax...
```

2、formData submit
```js

```

##### ajax
```js
var r = ...(e.target.files).map((f) => {
    return new Promise((res,rej) => {
        let xhr = new XMLHttpRequest();// ??
        xhr.upload.onProgress = () => {};
        xhr.onload = () => {};
        // ...
        xhr.open(...);
        xhr.send(f);
    });
});
```





#### 请求后端下载文件


请求目标，WebServices,只能用Post请求，contentType也设置为json
> 后台 context.response.write(binary);context.response.flush

```js
// 通过ajax请求下载
function downloadVidAjax(url, value) {
        $.ajax({
            url: url,
            method: 'POST', data: JSON.stringify({ type: value }), contentType: "application/json; charset=utf-8",
            xhrFields: {
                responseType: 'blob'
            },
            success: function (data) {
                var a = document.createElement('a');
                var url = window.URL.createObjectURL(data);
                a.href = url;
                a.download = 't.' + value;
                document.body.append(a);
                a.click();
                a.remove();
                window.URL.revokeObjectURL(url);
            }
        });
    }

// 通过Form提交下载
    function downloadViaForm(url, key, value) {
        var form = document.createElement("form");
        form.action = url;
        form.method = "post";
        var input = document.createElement("input");
        input.type = "hidden";
        input.name = key;
        input.value = value;
        form.appendChild(input);
        document.body.appendChild(form);
        form.submit();
        document.body.removeChild(form);
    }
```

#### 拦截注入JS

js请求拦截,重定向至自定义js，从而使页面加载自定义的js

#### 变量监听

监听，绑定Object.defineProperty

监控对象的变化，根据调用栈找到源头

#### DIV拖动

可拖拽 onmousedown + onmouseup + onmousemove 
onmousedown 获取拖拽对象原始位置
onmousemove  更新拖拽对象位置，增加移动样式
onmouseup 清楚拖拽对象，卸载样式
以上3个事件可实现div可拖拽
但会有小问题

为更加稳定和流畅
改用drag相关事件较好

#### 即时搜索下拉

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



#### 操作Object标签

[js获取object标签对象失败](https://haizhiyan.iteye.com/blog/1262351)
​	被包裹在form标签内，不能直接读取，只能通过dom api拿到元素，一样

#### 复制粘贴

[Javascript中的复制粘贴功能](http://blog.poetries.top/2018/12/23/js-copy/?utm_medium=hao.caibaojian.com&utm_source=hao.caibaojian.com)

#### 图片

有现成压缩库

[图片简介和前端图片优化](https://segmentfault.com/a/1190000017481260)

[js压缩](https://www.cnblogs.com/007sx/p/7583202.html)

#### js可视化

[可视化js运行](http://latentflip.com/loupe/?code=JC5vbignYnV0dG9uJywgJ2NsaWNrJywgZnVuY3Rpb24gb25DbGljaygpIHsKICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gdGltZXIoKSB7CiAgICAgICAgY29uc29sZS5sb2coJ1lvdSBjbGlja2VkIHRoZSBidXR0b24hJyk7ICAgIAogICAgfSwgMjAwMCk7Cn0pOwoKY29uc29sZS5sb2coIkhpISIpOwoKc2V0VGltZW91dChmdW5jdGlvbiB0aW1lb3V0KCkgewogICAgY29uc29sZS5sb2coIkNsaWNrIHRoZSBidXR0b24hIik7Cn0sIDUwMDApOwoKY29uc29sZS5sb2coIldlbGNvbWUgdG8gbG91cGUuIik7!!!PGJ1dHRvbj5DbGljayBtZSE8L2J1dHRvbj4%3D)



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



### 异常

#### 异常类型

##### JS内置异常

**异常类型**

- SyntaxError（语法错误）
- ReferenceError（引用错误）
- RangeError（范围错误）
- TypeError（类型错误）
- URLError（URL错误）
- EvalError（eval错误）



**捕获方式**

- onerror: 会被覆盖，建议弃用
- addEventListener: 存在兼容性问题，结合attachEvent一起使用
- attachEvent: ie8前使用，监听时需增加on前缀



##### Promise未处理异常

**捕获**：window.onunhandledrejection



**注意**？？

如果一个Promise错误最初未被处理，但是稍后又得到了处理，则会触发rejectionhandled事件。因此最好在监听到unhandledrejection事件时，不要立刻触发上报，可以选择等待一定时间(settimeout)，监听是否被处理了，到时再进行上报处理。尤其在混合开发的时候容易遇到

> 监听rejectionhandled判断事件是否真的被处理，然后再上报，已处理则取消上报




##### 资源加载异常

img、script里的src和link标签里的href属性存在时，会请求对应的资源。如果错误资源报错，该标签会触发error事件，执行DOM的onerror方法，但并不会冒泡到全局，需对元素进行onerror监听

坑:使用onerror事件去获取一个默认地址的图片,如果刚好onerror去获取的图片也不在，那么就会一直触发onerror事件，这个标签一直在请求一个不存在的图片。也就是会一直循环请求



##### 网络请求异常

XMLHttpRequest、fetch

重写内置对象，对对象的事件进行重写从而实现请求时各个阶段的监听




#### 异常捕获

[各种方式的异常捕获](<http://news.51cto.com/art/201903/593360.htm>)



只能捕获捉到运行时非异步错误，对于语法错误和异步错误就捕捉不到。

> 语法错误，由于是编译阶段，非运行阶段，即使在catch内也无法捕获



##### window.onerror 

> 当 `JS` 运行时错误发生时，`window` 会触发一个 `ErrorEvent` 接口的 `error` 事件，并执行 `window.onerror()`。
>
> 可以进行一个错误拦截
>
> `window.onerror` 函数只有在返回 `true` 的时候，异常才不会向上抛出，否则即使是知道异常的发生控制台还是会显示 `Uncaught Error: xxxxx`
>
> 
>
> 网络异常错误不会事件冒泡，因此必须在捕获阶段将其捕捉到才行，但是这种方式虽然可以捕捉到网络请求的异常，但是无法判断 HTTP 的状态是 404 还是其他比如 500 等等
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





#### 异常上报

**img标签上报**

```js
function report(error) {

 var reportUrl = 'http://xxxx/report';

 new Image().src = reportUrl + 'error=' + error;

}
```







### 常用技巧

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



#### 截取整数和小数

[截取整数和小数](<https://github.com/akira-cn/FE_You_dont_know/issues/5>)







### 兼容编译

#### babel

[babel详细说明](http://www.cnblogs.com/jiebba/p/9613248.html?hmsr=toutiao.io&utm_medium=toutiao.io&utm_source=toutiao.io)
babel只转换语法不转换api   如：map,set,object.assign


