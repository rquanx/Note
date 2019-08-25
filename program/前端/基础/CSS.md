### 基础

#### 语法

##### 组成

选择器 { 属性: 值 }

#### 选择器

##### 子选择器

必须是父子关系

```css
li > a {

}
```

##### 后代选择器

```css
li  a {

}
```



##### 相邻选择器

```css
li+a {

}
```

##### 属性选择器

```css
[title] {/*有title的属性*/}
a[href][title] {/* 同时有href和title的 a标签 */}
a[href="x"][title="y"] {/* 同时有href和title且值为对应值的 a标签 */}
a[src^="x"] {/* 以x为开头 */}
a[src$="y"]{/* 以y为结尾 */}
a[src*="z"] {/**包含/}
```

##### 复合选择器

```css
li.a {/* li且class = a */}
```



##### 伪类选择器

**nth-child(n)**

```css
li:nth-child(1) {
    /* 某个父元素下的第1个子元素且是li
    	n则为全部 
    	2n表示复数的
    	n+5  从第5个起的全部
    */}
```



**nth-last-child(n)**

和nth-child顺序相反



**nth-of-type(n)**

```css
li: nth-of-type(1) {
    /* 某个父元素下的第1个li
    	n则为全部 
    	2n表示复数的
    	n+5  从第5个起的全部
    */}
```

**nth-last-of-type(n)**



**firts-of-type**

​	等于nth-of-type(1)

**last-of-type**

​	等于nth-last-of-type(1)

**last-child**

```css
/* 最后一个子元素 */
```

**only-child**

```css
p:only-child { /* 只有一个子元素且为p */}
```

**only-of-type**



**root**

选择跟元素



**empty**

选择没有任何内容的元素





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

box-sizing:content-box /*（标准盒模型）*/
box-sizing:border-box /*（IE盒模型）*/

#### 占位

元素占的区域因素display
​	block   块元素  必须独占一行
​	inline-block	可以和别人同行的块元素，可设置宽高
​	inline	只占元素大小的空间，一般不可设置宽高

#### 定位

top、bottom、left、right是相对于父元素的



##### position	元素定位

​	static	默认值	top、left...都不生效
​	relative	和默认值表现一直，但是可以使用top等属性
​		修改坐标时相对原本的位置更改	
​		改变坐标时不会对其他元素产生影响	

**绝对定位**

> 块元素宽度默认根据内容设置
>
> z-index默认会覆盖在其他元素上
>
> 脱离文档流，类似float
>
> absolute和fixed都是

​	

​	absolute	绝对定位	
​		以第一个非static的父元素作参考，没有的话就相对整个html，然后根据坐标设置标号
​		页面滚动也会固定在那个位置
​	
	position: absolute 的元素自动对齐父元素 border 外边缘
	所以设置padding，可以挤开border === 让absolute的元素远离

​	fiex	基于窗口绝对定位，不管怎么滚动，总是处于窗口的指定位置
​		窗口，===随滚动走

非static 可用 top.bottom....设置坐标，用z-index设置显示层次

##### 层次

##### z-index   

当多个元素重叠时，会被后来的盖住，通过设置z-index的大小来定义谁覆盖的层次级，可随意设置，数字越大层次越高

#### 浮动

默认的块元素占宽100%,当浮动后默认占内容宽度



默认情况下父元素的高度会根据子元素高度定，当设置浮动后子元素脱离文档流，父元素高度变为0 ==> 高度坍塌



脱离文档流后，内容不会相互覆盖，而是根据相对定位进行排放



###### overflow

hidden

当内容太多，设成Hidden,会把多出的内容隐藏

auto

父元素中形成滚动条可以滚动查看溢出的内容

scroll

不管内容是否超出，总是显示滚动条



overflow-x / -y 可以单独对x和y进行设置



###### 清除浮动

1、clear: both  此元素左右两侧不允许出现浮动元素，利用清除浮动来把外层的div撑开

2、父元素中使用伪类清除 

```css
.clearfix:after {
content: "\0020";	/*空白符*/
display: block;
clear: both；		
    /* 确保这个空白字符是非浮动的独立区块*/
height: 0；			/* 让content不显示*/
}
```

3、overflow

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



#### 字体图标

引入css和字体文件后

<I class="fa fa-xx"></i>

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



###### 水平居中

文字

 text-align: center



div居中

margin-left: auto;

margin-rigth: auto;

自动计算两侧



###### 垂直居中

在明确页面高度的情况下设置line-hight: 页面高度





### 兼容性

浏览器兼容

```css
/*
	条件注释控制
https://www.cnblogs.com/kenan9527/p/4539673.html
*/
<!--[if !IE]> <!--> 
	除IE外都可识别 
<!-- <![endif]--> 

.transform {
    -webkit-transform: rotate(-3deg);
    -moz-transform: rotate(-3deg);
    -ms-transform: rotate(-3deg);
    -o-transform: rotate(-3deg);
    transform: rotate(-3deg);
}
/* 
	-webkit- chrome,safari
	-moz- 火狐
	-m  IE
	-o opera
	各个浏览器可能会有自己的实现，为兼容使用前缀，且写全，下面的有效会覆盖上面的,所以默认的标准属性写在最后，postcss 帮助。。。
*/

```
### 应用

##### margin: atuo

对长度或宽度进行智能计算，对拉伸部分进行分配

margin: 0 atuo 为什么可以水平居中？

> 会将元素进行拉伸，拉伸后如果没有宽度默认会占满，但是当有强制宽度后，由于进行了auto分配，没被占用的地方会被自动分配，所有水平居中
>
> 如果要实现右对齐： 
>
> 一、
>
> margin-left: auto即可，剩余的空间会自动分配给左侧形成右对齐
>
> 二、
>
> 使用绝对定位，top、bottom、right、left为0，则就会进行宽和高的拉伸
>
> 拉伸后进行宽高设置，这时再进行atuo，就可以右对齐、水平居中、垂直居中等....
>
> 为什么margin: auto 0 不能实现垂直居中
>
> 因为margin-top,margin-bottom不能进行拉伸
>
> 
>
> flex布局下所有元素就处于一个可拉伸的上下文中，所以使用margin-top: auto就可以实现顶部对齐


##### Flex

flex:1;

> 占满空间，对空间进行分配，如果多个元素会等分？
>
> flex: auto
>
> width: 100%也一样的效果
>
> width: -webkit-fill-available

###### 属性

Flex-direction : row , column


justify- 操作的是主轴（main axis）对齐，对齐方向与 flex-direction 方向一致。

align- 操作的是交叉轴（cross axis）对齐，对齐方向与 flex-direction 方向垂直

> Align-items 对单行和多行都有效
> Align-content 只对多行有效
> Align-self 对元素自己单独设置


Place-content    
> justify和align的简写  ==> margin和margin-right等的关系

##### table

> 祖先设置table，table-layout：fixed;
>
> 然后子元素设置tale-cell就可以自动等分



##### border

> border颜色会默认基础color



##### 左右间距

> 实际开发左右1rem,通过大的结构元素控制；
>
> :not(:last-child) {margin-right: 1rem;}设置，这种方式不需要重置
>
> 单纯使用:last-child/first-child亦可，但是需要重置


### 小知识

#### 自适应

height不设置就会根据内容自适应



#### display:inline-block在什么时候会显示间隙

##### 描述

在标签中回车符，回车符相当于空白符，多个连续的空白符会合并成一个空白符，而产生“空白间隙”

##### 解决

1、全局font-size设置成0；

2、取消两个div之间的空格，需要在div上加上 vertical-align:bottom，消除底部间隙



#### overflow: scroll不能平滑滚动

##### 解决

ipone 上解决方法是这样的， -webkit-overflow-scrolling:
touch;



#### Fixed

设置fixed后直接以窗口为基准，位置设置需要用top、bottom…. 



##### 顶部固定

```css
position: fixed;
width: 100%; // ？
top: 0;
z-index: 9999;
```



#### 强制（自动）中、英文换行与不换行

word-break:break-all;只对英文起作用，以字母作为换行依据

word-wrap:break-word; 只对英文起作用，以单词作为换行依据

white-space:pre-wrap; 只对中文起作用，强制换行

white-space:nowrap; 强制不换行，都起作用

white-space:nowrap; overflow:hidden; text-overflow:ellipsis;不换行，超出部分隐藏且以省略号形式出现（部分浏览器支持）



#### line-height

单纯设置数字的话，可以设置成font-size的x倍，便于维护



#### px

比起设置px,设成百分比或者em更易维护

em相对父级大小，ren相对根元素大小

### 应用

#### float基本套路
  float套路
  区域->版心->内容;内容通过float、absolute、relative进行布局
  一般absolute、relative配合使用

```html
	<!-- 一般情况使用以下模板套即可，一些相对有规律，简单的布局基本类型  -->
  <div class="area1">
    <div class="content(版心)">
      <div class="subArea11"></div>
      <div class="subArea12"></div>
    </div>
  </div>
  <div class="area2">
    <div class="content(版心)">
      <div class="subArea21"></div>
      <div class="subArea22"></div>
    </div>
	</div>
```

#### 技巧

	absolute、relative配合使用常用于实现图标定位

  

	父元素line-height === 高度让文字垂直居中    button内文字默认居中

  

	display:block; + text-align:center; 实现文字水平居中

  

	定宽 + margin 0 auto  实现水平居中


### 杂

#### 站点

[浏览器css支持](https://caniuse.com/)

