### 基础

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



### 小知识

height不设置就会根据内容自适应

### 杂

#### 站点

[浏览器css支持](https://caniuse.com/)

