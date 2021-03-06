### 基础

#### 语法

选择器 { 属性: 值 }



#### 选择器

##### 子选择器

必须是父子关系

```css
li > a { }
```

##### 后代选择器

```css
li  a { }
```



##### 相邻选择器

```css
li+a { }
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

== nth-of-type(1)

**last-of-type**

== nth-last-of-type(1)

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

选择根元素



**empty**

选择没有任何内容的元素



#### 优先级

##### 样式优先级

!important > 内联(元素标签) > style(head标签) > link(外部文件)
同级的 后一个会覆盖前一个



##### 选择器优先级

!important > 内联 > id选择器 > class选择器  > 元素选择器，当一个元素被多个不同级别的css选中，且冲突时，按优先级应用



#### 标签

##### Link

**属性**

media

> 可以设置不同的值来表示这个文件用于不同的设备
>
> 根据页面宽度和指定宽度加载不同的css文件

rel

> 可设置为候选样式，候选样式表可供用户选择切换，跟title关联



#### 单位

##### px

比起设置px,设成百分比或者em更易维护

em相对父级大小，rem相对根元素大小



##### rem





##### em



##### vh



##### vw



##### 像素定义

px 是viewport像素

在PC上px == 逻辑像素



物理像素

> 反映显示屏的硬件条件
>
> 反映的就是显示屏内部led灯的数量，
>
> 简单理解，一组三色led代表一个物理像素，当然根据屏幕物理属性以及处理led的方法不一样。强调这是物理的，因为这是一个纯硬件指标。
>
> 比如我把屏幕锯了一半，物理像素就只有一半



逻辑像素

> 是为了调和距离不一样导致的差异，将所有设备根据距离，透视缩放到一个相等水平的观看距离之后得到的尺寸，是一个抽象的概念，这个单位就是ios开发的px，安卓开发的dp。对于pc，包括win（8+） linux，mac，由各自系统的或者对应软件（比如webview内部）提供的图像界面处理引擎处理进行缩放
>
> 
>
> 假设一个ppi160，2寸x3寸的屏幕，物理像素应该是320x480
>
> 同理ppi320，同样尺寸的屏幕，物理像素是640x960
> 调和不同设备，不同dpr，不同屏幕，不同分辨率，不同观看距离之间的如何解决显示问题的方案





渲染像素

> 在系统内部对物理像素的分配进行再一次的调整
>
> 在pc上，渲染像素 == 设置里边的分辨率。
>
> 对于显示设备，系统为显示设备提供渲染尺寸，由显示设备的“缩放引擎”（带存储器阵列的数字视频处理器）处理。这种“缩放引擎”一般内部有一系列的合理分辨率和一个推荐分辨率。
>
> 一般推荐分辨率就是最大渲染像素，也是设备的物理分辨率（为了最佳表现）。这是一个软硬件（偏硬）结合的缩放方案。
>
> 根据物理像素进行缩放？



#### 指令

##### @import

引入css文件 

```css
<style type="text/css">
@import url(CSS文件路径地址);
</style>

```



#### 伪元素

:before 、:after...

根据input的类型，有的支持伪元素，有的不支持



#### 伪类

##### 链接伪类

:link
:visited

##### 动态伪类

动态伪类理论上可以应用于任何元素，具体看浏览器支持

:hover
:active
:focus

##### 逻辑伪类

:not 

> :not(:foucs)：不是聚焦的时候
>
> :not(:hover)



##### 伪类连用

a:visited:hover {xxx}



##### 其他

**:empty**

匹配内容为空的标签

可实现对空内容的标签进行填充/隐藏处理



**:only-child**

匹配没有任何兄弟元素的元素



**:invalid**

输入框非法时显示的样式





#### 盒模型

除inline元素外，每个元素都有盒模型，inline设置了也无效


box-sizing:content-box （标准盒模型）
box-sizing:border-box （IE盒模型）



##### margin 

用于元素之间隔离



`margin: auto`

对长度或宽度进行智能计算，对拉伸部分进行分配



**`margin: 0 atuo` 为什么可以水平居中？**

> 会将元素进行拉伸，拉伸后如果没有宽度默认会占满，但是当有强制宽度后，由于进行了auto分配，没被占用的地方会被自动分配，所有水平居中
>
> 如果要实现右对齐： 
>
> 一、margin-left: auto即可，剩余的空间会自动分配给左侧形成右对齐
>
> 二、使用绝对定位，top、bottom、right、left为0，则就会进行宽和高的拉伸
>
> 拉伸后进行宽高设置，这时再进行atuo，就可以右对齐、水平居中、垂直居中等....
>
> 三、为什么margin: auto 0 不能实现垂直居中
>
> 因为margin-top,margin-bottom不能进行拉伸
>
> 
>
> flex布局下所有元素就处于一个可拉伸的上下文中，所以使用margin-top: auto就可以实现顶部对齐 



##### padding

用于元素和自身内容的隔离



**特性**

不支持负值的

支持百分比值，但和 height 等属性的百分比计算规则有些差异

> 差异在于：padding 百分比值无论是水平方向还是垂直方向均是相对于宽度计算的



对于内联元素，其 padding 是会断行的

> padding 区域是跟着内联盒模型中的行框盒子走的，由于文字比较多，一行显示不了，于是“若干”两字换到了下一行，于是，原本的 padding 区域也跟着一起掉下来了，根据后来居上的层叠规则，“内有”两字自然就正好被覆盖，于是看不见了



##### display

###### 内外盒子

为了应对如inline-block等场景，对display实现了内外盒子的处理

> 外盒子负责是否换行显示，内盒子绝对能否进行宽高等设置



`display: block ==> display: block-block` // 非官方

`display: inline ==> display: inline-inline` // 非官方

> 例：display: inline-table,可以让元素同行显示，同时内部可进行表格处理



**display: contents**




display: contents 的元素本身不会被渲染，但是其子元素能够正常被渲染

- 充当无语义的包裹框
- 让代码更加符合语义化

```html
<!--  不想要button的样式和行为，自己进行控制，但单纯的p标签会导致语义化降低  -->
<p class="button">
  <button style="display: contents">Button</button>
</p>
<p class="button">
  <button style="display: contents">Click Me</button>
</p>
```

- 对于一些常见的可替换元素、表单元素,相当于 display: none



###### 块级元素

具有换行特性（所以能配合clear实现清除浮动???）



block    

list-item：li默认

table：table默认



###### 行内/内联元素

内联元素的 padding 在垂直方向同样会影响布局，影响视觉表现

内联元素没有可视宽度和可视高度的说法（clientHeight 和 clientWidth 永远是0），垂直方向的行为表现完全受 line-height 和 vertical-align 的影响，视觉上并没有改变和上一行下一行内容的间距，因此，给我们的感觉就会是垂直 padding 没有起作用



inline-block	可以和别人同行的块元素，可设置宽高

inline	只占元素大小的空间，一般不可设置宽高



width、height：无效

padding：左右有效 ，但是由于设置padding上下不占页面空间，无法显示效果，所以无效。

> 上下会扩展到上下的元素上，但不会占用空间



###### 标记盒子

display: list-item的元素会附带一个存放圆点的附加盒子



#### 定位

top、bottom、left、right是相对于父元素的

非static 可用 top.bottom....设置坐标，用z-index设置显示层次



##### static

默认值	top、left...都不生效



##### relative

和默认值表现一样，但是可以使用top等属性

> 修改坐标时相对原本的位置更改	
> ​改变坐标时不会对其他元素产生影响	



##### absolute

以第一个非static的父元素作参考，没有的话就相对整个html，然后根据坐标设置便宜，不随页面滚动变化

> 块元素宽度默认根据内容设置
>
> z-index默认会覆盖在其他元素上
>
> 脱离文档流
>



##### fixed

脱离文档流，基于窗口绝对定位，不管怎么滚动，总是处于窗口的指定位置窗口，===随滚动走



设置fixed后直接以窗口为基准，位置设置需要用top、bottom…. 



**顶部固定**

```css
position: fixed;
width: 100%; // ？
top: 0;
z-index: 9999;
```





#### 流

浏览器默认的 HTML 布局方式，此时浏览器不对页面做任何布局控制，

position为static或relative，且float为none时会触发普通流，普通流有以下特性：

- 普通流中，所有的盒一个接一个排列

- BFC 中，盒子会竖着排列

- IFC 中，盒子会横着排列

- 静态定位中（position 为 static），盒的位置就是普通流里布局的位置

- 相对定位中（position 为 relative），盒的偏移位置由 top，right，bottom，left 定义，即使有偏移，仍然保留原有的位置，其它普通流不能占用这个位置

> 会霸占元素位置 + 偏移位置的空间？待验证



##### 浮动

- 浮动定位中，盒称为浮动盒（Floating Box）

- 浮动盒会脱离普通流，浮动到当前行的开头或结尾

- 普通流会环绕在浮动盒周围，除非设置 clear 属性



##### BFC

以下元素会创建 BFC：

- 根元素（<html>?）

- 浮动元素（float 不为 none）

- 绝对定位元素（position 为 absolute 或 fixed）

- 表格的标题和单元格（display 为 table-caption，table-cell）

- 匿名表格单元格元素（display 为 table 或 inline-table）

- 行内块元素（display 为 inline-block）

- overflow 的值不为 visible 的元素

- 弹性元素（display 为 flex 或 inline-flex 的元素的直接子元素）

- 网格元素（display 为 grid 或 inline-grid 的元素的直接子元素）



**特点**

- BFC之间是隔离的
  - 一个元素不能同时存在于两个 BFC 中，当BFC嵌套的时候,内层元素只属于内层BFC

- 盒子竖着排列：普通流排列

- bfc和相邻的元素不产生上下边距折叠
  - 使用bfc包裹子元素后，bfc内容子元素不会和bfc的相邻元素产生边距折叠

- 浮动时：不可重叠

- 计算高度时不会忽略浮动元素的高度，可用来解决高度塌陷



##### FFC

flex布局产生

在css2.1中也属于BFC



**GFC**

grid布局产生

在css2.1中也属于BFC

#### 层叠

[层叠关系有七层](http://www.w3help.org/zh-cn/kb/013)

[css层叠顺序探究](https://aotu.io/notes/2015/11/08/css-stack-order/)

##### 层叠上下文

上下文可认为是一个Block

Block内遵循统一的关系，多个同级Block间遵循统一关系？



##### z-index   

当多个元素重叠时，会被后来的盖住，通过设置z-index的大小来定义谁覆盖的层次级，可随意设置，数字越大层次越高



同一层叠上下文中,当我们给元素一个z-index，那么这个值只会和在相同 context 下的其他元素竞争。z-index 不是全局的

显式创建上下文isolation: isolate; }



#### 浮动

默认的块元素占宽100%,当浮动后默认占内容宽度，呈包裹



##### 高度坍塌

默认情况下父元素的高度会根据子元素高度定，当设置浮动后子元素脱离文档流，父元素高度变为0

脱离文档流后，内容不会相互覆盖，而是根据相对定位进行排放



##### overflow

hidden

当内容太多，设成Hidden,会把多出的内容隐藏



auto

父元素中形成滚动条可以滚动查看溢出的内容



scroll

不管内容是否超出，总是显示滚动条



overflow-x / -y 可以单独对x和y进行设置



##### 清除浮动

1、clear: both  此元素左右两侧不允许出现浮动元素，利用清除浮动来把外层的div撑开

2、父元素中使用伪类清除 

```css
.clearfix:after {
    content: "\0020";	/*空白符*/
    display: block;
    clear: both；		/* 确保这个空白字符是非浮动的独立区块*/
    height: 0；			/* 让content不显示*/
}
```



#### 字体图标

页面在渲染文字的时候，会先将文字转换为对应的 unicode 编码，然后根据 css 中配置的 @font-face url 找到对应的字体文件（eot ttf woff 等），接下来在该字体文件中找到这个 unicode 编码对应的绘制外形，最后绘制在页面上



##### 使用

1、css中引入字体文件

2、定义字体类

3、

- 通过伪类写unicode

```html
<I class="fa fa-xx"></i>
```

- 对标签增加字体类同时内容中直接写unicode

```html
<I class="fa fa-xx">unicode</i>
```









### 布局

#### 浮动布局

##### 基本套路

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



##### 要点

html标签围绕的元素（不进行float的）必须要浮动的元素后





##### 小知识点

浮动时形成正方形，设置宽度，然后设置padding-top / padding-bottom: 100%;

> 对于padding-top,会将内容挤到下面去，可能会溢出，需要配合top、left来重新定位,一般优先使用padding-bottom





#### 弹性布局（Flex）

display: position不参与flex布局，所以对于这样的元素会被挤出去，同时占用对应的空间





##### flex

默认时会忽略伪元素宽度，挤压空间

flex-grow，flex-shrink，flex-basis的缩写



默认值

> 0 1 auto，【父控件有剩余控件也不放大，父控件空间不足按1缩小，保持本身的空间大小】



**flex:1**

> 1 1 0%，【父控件有剩余空间占1份放大，父控件空间不足按1缩小，自身的空间大小是0%

> 占满空间，对空间进行分配，如果多个元素会等分？
>





**flex: auto**

>
> width: 100%也一样的效果
>
> width: -webkit-fill-available



##### flex-direction : row / column


justify- 操作的是主轴（main axis）对齐，对齐方向与 flex-direction 方向一致。

align- 操作的是交叉轴（cross axis）对齐，对齐方向与 flex-direction 方向垂直

> Align-items 对单行和多行都有效
> Align-content 只对多行有效
> Align-self 对元素自己单独设置



##### Place-content    

justify和align的简写  ==> margin和margin-right等的关系



##### flex-grow

当父控件还有剩余空间的时候，是否进行放大(grow)其中数值代表的是放大比例，值为0的时候表示不放大；



##### flex-shrink

当父控件空间不够的时候，是否进行缩小(shrink)其中数值代表的是与控件大小有关的缩小比例；



##### flex-basis

当子空间含有这个属性的时候，代表了子元素的初始大小，主轴就是flex的主方向row是横向，column是向；(这里第一个链接中只说了width，如果flex方向是column也可以是height)；



#### 弹性布局（**inline-flex**）

可以使用绝对定位



flex：父元素的尺寸不由子元素尺寸动态调整，不设置时默认是100%

inline-flex：使父元素尺寸跟随子元素们的尺寸动态调整，包裹性？



#### Table



##### 等分

> 祖先设置table，table-layout：fixed;
>
> 然后子元素设置tale-cell就可以自动等分



### CSS属性

#### 好用的属性

Attr()	

> 获取元素属性值



currentColor	

> 返回当前的标签所继承的文字颜色



user-select	

> 可以控制用户能否选中内容



direction

> 指定块元素的文字方向



text-align: start

> 设置后可自动根据direction进行调整



resize:both

> 设置resize:both后，除了 textarea 元素之外，其他元素想要使用缩放，必须设置 overflow 属性（overflow:visible 除外）



outline

> 会占用focus事件，导致tabIndex无法选中，可以用box-shadow实现同样的效果



#### 背景

任何元素都能设置background为图片，从而实现一些功能



##### background

-repeat	将图片复制，铺满整个页面
-image	图片
-color	颜色
-attachment	背景是否随页面滚动



##### background-clip

 padding-box / content-box 限制背景色不影响border / padding



#### 圆角

`border-radius`  ===  `border-top-left-radius` + `border-top-right-radius` + `border-bottom-right-radius` + `border-bottom-left-radius`

```css
/* 百分比是用的是父级的长度，按钮宽度远大与高度，所以用百分比写得到的弧度是不一样的 */
{
  border-radius: 2em
}

{
  border-radius: 10%
}

```





#### 边框

outline类似于border但不会影响布局



#### 变形

##### transition

设置元素渐变,配合形变transform、opacity变化等可形成简单动画效果



 transition : arg1 arg2 ,arg1 arg2		可以一次设置多个属性效果
`arg1`  哪个属性变化后产生动画
`arg2`	 动画持续时间



**transition过渡效果**

用于指定为一个或多个 CSS 属性添加过渡效果

```sass
<!-- 对max-hight进行处理 -->
{
    max-height: 0;
    transition: max-height 0.3s linear;

    &.up {
        max-height: 0;
    }
    &.down {
        max-height: 1000px;
    }
}
```


##### transform

应用于元素的2D或3D转换。这个属性允许你将元素旋转，缩放，移动，倾斜等



**位移**

```css
{
  /* 平移 x轴长度，y轴平移长度*/
  transform: translate(x, y);
}

{
    transform:translateY(-50%)		/* 以自身原本为参考，往上移动50%  */
}
```

**放大**

transform: scale(1.2)

> 例：hover时元素放大



#### 字体

##### 要点


- 基线：书写英语字母时，字母 X 底部所在的位置
- 行高( line-height )：两行文字基线之间的距离
- content area : 围绕文字看不见的 Box，其大小与 font-size 有关，修改 font-size 实际是对这款区域大小的修改?
- inline boxes: 不会成块显示，而是并排显示在一行的 boxes ，如 span,a,em 等标签以及匿名 inline boxes（即不含把标签的裸露的文字）
- line boxes: 由一个一个的 inline boxes 组成，一行即为一个 line box
- containing box: 外层盒子模型,包含了其他的 boxes




**vertical-align**

起作用的前提：元素为 inline 水平元素或 table-cell 元素，包括 span , img , input , button , td 以及通过 display 改变了显示水平为 inline 水平或者 table-cell 的元素。这也意味着，默认情况下， div , p 等元素设置 vertical-align 无效

> float 和 position: absolute ，一旦设置了这两个属性之一，元素的 display 值被忽略，强制当成 block 方式处理，因此，vertical-align 也就失去了作用

- baseline: vertical-align 的默认值，其意思是指基线对齐,可以把每一个行框盒子的后面想象有一个看不见的节点 x 元素就是和这个字母 x 的下边缘对齐
- top 与 bottom: 元素的顶部（底部）和当前行框盒子的顶部（底部）对齐；即与 line-box 的顶部（底部）对齐 对于 table-cell 元素，指的是元素的顶 padding 边缘和表格行的顶部对齐
- middle:元素的垂直中心点与行框盒子基线往上 1/2x-height 处对齐,就是字母 X 的中心位置对齐
- text-top: 盒子的顶部和父级内容区域的顶部对齐，即与 content-area 顶部对齐

##### 换行与不换行

word-break:break-all;只对英文起作用，以字母作为换行依据

word-wrap:break-word; 只对英文起作用，以单词作为换行依据

white-space:pre-wrap; 只对中文起作用，强制换行

white-space:nowrap; 强制不换行，都起作用

white-space:nowrap; overflow:hidden; text-overflow:ellipsis;不换行，超出部分隐藏且以省略号形式出现（部分浏览器支持）



##### line-height

单纯设置数字的话，不便于维护，可以设置成font-size的x倍，便于维护



##### transform

Transform缩放可以超出限制

例：显示10px，chrome默认最小12px 



##### font weight

Font weight从100->200没有变化 ==> 字体支持问题













### CSS3



#### 模糊滤镜

```css
.x {
	backdrop-filter: blur(10px);
}
```



#### 动画


[网页动画的十二原则](https://cssanimation.rocks/cn/principles/)
> 动画分类、理解



**@keyframes**

指定动画名、初始态、中间态，最终态，

```css
@keyframes name {
  0% { transform: translate(0, 0); }
  25% {}
  100% { transform: translate(0, -$height); }
}
/**
animation-name: 对元素要应用的动画名

animation-duration: 定义动画初态到终态的时间，动画一个周期的时间

animation-timing-function： 动画速度曲线 (line、ease、cubic-bezier等函数)
  - cubic-bezier(0.21, 0.85, 1, 1); 贝塞尔曲线

 animation-delay: 动画延时时间;

animation-iteration-count: 动画重复播放的次数

animation-direction: 下一周期是否逆向(normal、alternate);

animation-play-state:动画当前状态(paused、running);

animation-fill-mode：动画外的状态
  - 过渡动画执行完后，为了将让元素应用动画最后一帧的属性值
**/
```



##### 动画技巧

**波浪**

多个不规则圆 + 动画


**GraphicsLayer**

浏览器为了提升动画的性能，为了在动画的每一帧的过程中不必每次都重新绘制整个页面。在特定方式下可以触发生成一个合成层，合成层拥有单独的 GraphicsLayer，需要进行动画的元素包含在这个合成层之下，这样动画的每一帧只需要去重新绘制这个 Graphics Layer 即可，从而达到提升动画性能的目的

创建GraphicsLayer层

- 硬件加速的 iframe 元素（比如 iframe 嵌入的页面中有合成层）
- 硬件加速的插件，比如 flash 等等
- 使用加速视频解码的 <video> 元素
- 3D 或者 硬件加速的 2D Canvas 元素
- 3D 或透视变换(perspective、transform) 的 CSS 属性
- 对自己的 opacity 做 CSS 动画或使用一个动画变换的元素
- 拥有加速 CSS 过滤器的元素
- 元素有一个包含复合层的后代节点(换句话说，就是一个元素拥有一个子元素，该子元素在自己的层里)
- 元素有一个 z-index 较低且包含一个复合层的兄弟元素

坑

- GPU 硬件加速也会有坑，当我们希望使用利用类似 transform: translate3d() 这样的方式开启 GPU 硬件加速，一定要注意元素层级的关系，尽量保持让需要进行 CSS 动画的元素的 z-index 保持在页面最上方（z-index在下的话，GraphicsLayer层会包含其他上层元素，会引起不必要的性能损耗）




#### 变量

```js
// 通过js设置变量

element.style.setProperty("name","value") // 可设置为动态值，例当事件触发时设置

// 设置变量后在css中可以通过var(name)来自动获取，实现CSS变量动态变化从而样式动态调整
```



// 通过js设置变量

element.style.setProperty("name","value") // 可设置为动态值，例当事件触发时设置

// 设置变量后在css中可以通过var(name)来自动获取，实现CSS变量动态变化从而样式动态调整

\```



#### 计数器

##### counter-reset

设置计数器的名字和初始值

```css
.xxx 
{ 
    counter-reset: calc1 2 calc2 3; 
} 
/* 定义了两个计数器 ,初始值分别是2和3*/
```

##### counter-increment

css中每出现一次 counter-increment，则对应的计数器+n，默认+1

```css
.counter:before { 
    counter-increment: calc1 calc2; 
}
```

##### counter(name, style)

读取计数器的值，读取值是读取当前值，不会最新值

style 使用 list-style-type的枚举值，显示不同的计数值，数字、字符、罗马？？

```css
.counter:before { content: counter(calc1); } 
```

##### counters(name, string);

string表示嵌套的计数器时连接字符

html嵌套来配合使用，counters可以让计数器在每一个父层级进行嵌套，保留之前的值作为前缀

```css
.counter { counters(calc1,'.') }
```



### 规范

#### ？？

- .以块+元素命名。 class="Contains-Div-Input ...."	简明，量大，不易复用
- 以功能效果命名,然后将功能进行组合。 class = " bg-xxx   size-xxx .... "  复用，易懂，明显

#### BEM





### 兼容

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

#### CSSpointer-events
设置为none时
- 阻止用户的点击动作产生任何效果
- 阻止缺省鼠标指针的显示
- 阻止CSS里的hover和active状态的变化触发事件
- 阻止JavaScript点击动作触发的事件




#### 给图标换颜色

- 使用filter滤镜进行颜色转换
- 使用遮罩实现，使用mask属性
- background-blend-mode：需图标为白底黑字



#### Canvas



##### Canvas实现事件系统

RGB --> ID元素定位
> 设计两个画布，同样大小真实画布与影子画布，真是画布为显示颜色内容，影子画布根据元素设计id -> rgba的映射，即可通过坐标获取影子画布的颜色然后反向计算出当前位置对应的id，从而找到元素

事件系统
> 借用canvas元素的原生事件、原生事件组合 + 元素定位实现Canvas内的元素的事件监听




#### 基础今天

#### 滚动条

Chrome 浏览器是子元素超过 content box 尺寸触发滚动条显示

IE 和 Firefox 浏览器是超过 padding box 尺寸触发滚动条显示



#### 根节点样式

根据不同浏览器的实现，body和html在被设置属性前可能是不被激活的，或者已经被预设了一定的作用

 浏览器会自动使用被激活的最顶层结点作为根节点，根节点属性必定作用于整个屏幕？（例设置background + border，但是background会被全屏使用）

 ```css
body 
{ 
    background: black; 
    margin: 100px; 
    border: 10px solid red; 
}
 ```



#### Height百分比高度

height: 100%

要往上遍历祖先元素要有高度可寻（非auto or 没设置）

```css
body{ background:#039; border:50px solid #C00; }
/* 给body设置背景色后可发现 默认body不是height: 100%的 */
```





#### 宽度

内容总宽度超过100%会下滑（非flex，flex可以使用wrap）



width: 100%

> 对于 width 属性，就算父元素 width 为 auto，其百分比值也是支持的



#### 自适应

height不设置就会根据内容自适应



#### 间隙

**描述**

在标签中回车符，回车符相当于空白符，多个连续的空白符会合并成一个空白符，而产生“空白间隙”，在inline-block时会容易影响

**影响**

1、两个元素间无法合并

 2、可能会导致总宽度大于100%，影响布局

**解决**

1、标签连着写，不换行

2、增加父元素设置font-size:0;由于继承的原因子元素需要重设font-size

3、取消两个div之间的空格，需要在div上加上 vertical-align:bottom，消除底部间隙？



[去除inline-block元素间间距的N种方法](http://www.zhangxinxu.com/wordpress/?p=2357)



#### overflow: scroll不能平滑滚动

`iphone` :`-webkit-overflow-scrolling: touch;`

### 工具

#### clip-path生成

[clip-path生成](https://bennettfeely.com/clippy)



### 原理

#### margin: auto

##### display: block 下 margin: auto 垂直方向无法居中元素的原因

If both margin-left and margin-right are auto, their used values are equal, causing horizontal centring.
> —CSS2 Visual formatting model details: 10.3.3

If margin-top, or margin-bottom are auto, their used value is 0.
> —CSS2 Visual formatting model details: 10.6.3

规定水平上平分，垂直上都是0



##### FFC 下 margin: auto 垂直方向可以居中元素的原因

在FFC(flex formatting context)，GFC(grid formatting context) 均可

Prior to alignment via justify-content and align-self, any positive free space is distributed to auto margins in that dimension.
> CSS Flexible Box Layout Module Level 1 -- 8.1. Aligning with auto margins

Note: If free space is distributed to auto margins, the alignment properties will have no effect in that dimension because the margins will have stolen all the free space left over after flexing.
> CSS Flexible Box Layout Module Level 1 -- 8.1. Aligning with auto margins



##### 总结

- 块格式化上下文中margin-top 和 margin-bottom 的值如果是 auto，则他们的值都为 0
- flex 格式化上下文中，在通过 justify-content 和 align-self 进行对齐之前，任何正处于空闲的空间都会分配到该方向的自动 margin 中去
- 单个方向上的自动 margin 也非常有用，它的计算值为该方向上的剩余空间
- 使用了自动 margin 的 flex 子项目，它们父元素设置的 justify-content 以及它们本身的 align-self 将不再生效

### 规范分类



#### **OOCSS**

面向对象的CSS，是由Nicole Sullivan提出的css理论


- Separate structure and skin（分离结构和主题）减少对 HTML 结构的依赖
- Separate container and content（分离容器和内容）增加样式的复用性

特点：

- 使用class，避免使用id等
- 抽象化，命名不再特指具象的事物
- 追求复用性



#### SMACSS

##### 设计规范

- Categorizing CSS Rules（为css分类）
    - Base: 基础规范,描述的是任何场合下，页面元素的默认外观。它的定义不会用到class和ID。css reset也属于此类。常见的如normalize.css,CSS Tools
    - Layout: 作为高层级的布局，或者低层级的容器，栅格系统、左右布局等，约定了一个前缀l-/layout-来标识布局的class `.layout-header {}; .layout-container {}; .l-header {}； .l-container {}`
    - Module: 按模块（领域？）划分增加前缀 `.todolist{}; .todolist-title{};`
    - State: 描述的是任一元素在特定状态下的外观,如消息框可能有success和error等状态，有较强的复用性 `.is-hidden { display: none; }`
    - Theme Or Skin: 描述了页面主题外观，一般是指颜色、背景图。Theme Rules可以修改前面4个类别的样式，且应和前面4个类别分离开来（分开定义）（便于切换，也就是“换肤”）,如果是单独的定义使用theme前缀 `.theme-a-background`
- Naming Rules（命名规范）
    - Base: 无特殊要求
    - Layout: l-/layout-前缀
    - Module: 模块名作为前缀
    - State: is-作为前缀
    - Theme: 修饰已有的延用类名，否则theme-作为前缀
- Minimizing the Depth of Applicability（最小化适配深度）
  
    - 最小适配深度原则，样式尽量不依赖于html结构
    
    

#### BEMCSS

BEM 分别代表着：Block（块）、Element（元素/子块/组成部分）、Modifier（修饰符），是一种组件化的 CSS 命名方法和规范，由俄罗斯 Yandex 团队所提出

命名: .[Block 块]__[Element 元素]_[Modifier 修饰符]（常见模式）

- Block: 一个独立的实体，即通常所说的模块或组件 `header、menu、search`
  
    - 块名需能清晰的表达出，其用途、功能或意义，具有唯一性
- Element: 块中的组成部分，对应块中的子元素/子节点 `header title、menu item、list item`
  
    - 元素名需能简单的描述出，其结构、布局或意义，并且在语义上与块相关联
- Modifier: 定义块和元素的外观、状态或类型 `color、disabled、size`
  
    - 修饰符需能直观易懂表达出，其外观、状态或行为
    
    

#### METACSS

原子css
- 功能性css
- 原子性css



### 应用



#### Loading

[100种Loading](https://dev.to/afif/i-made-100-css-loaders-for-your-next-project-4eje)



#### 内容伸展

##### 菜单

可以通过js动态增删 一个隐藏的类即可实现



##### 动画

max-height从0变为足够小的安全值，可较好的实现如收起、展开的动画（浏览器自带）



#### 居中 

##### 水平居中

1、inline inline-block文字：text-align: center

2、div居中：margin:0 auto + 定宽

3、display:block; + text-align:center; 实现文字水平居中



##### 垂直居中

在明确页面高度的情况下设置line-hight: 页面高度

父元素line-height === 高度，让文字垂直居中    button内文字默认居中



#### 数据上报

##### 通过伪类来上传按钮点击数据

```css
.button-1:active::after {

  content: url(./pixel.gif?action=click&id=button1);

  display: none;

}

.button-2:active::after {

  content: url(./pixel.gif?action=click&id=button2);

  display: none;

}
```





#### 障眼法



#### 图标

absolute、relative配合使用常用于实现图标定位



##### 小尾巴

原理：设置伪元素，描出特定（左右）边框，设置特定的border-radius

两根一定宽度的竖线，然后进行圆角处理得到

> border-left: 0.6em solid;
>
> border-right: 0.6em solid;
>
> border-top-left-radius: 40% 50%;
>
> border-top-right-radius: 40% 50%;



##### 三角形

原理：设置了4个相对的三角形，

1、将内容宽高设置为0，然后根据需求将其他边框颜色处理掉即可

2、伪元素默认就是宽高为0，只需将四个三角均设置透明，然后设置要留下的边框的颜色和边框宽度

> border: solid transparent;  
>
> border-width: xx



##### 长方形

> 用box-shadow or 背景色绘制



##### 音量喇叭图标

> 可看作长方形 + 三角形组合 or 长方形 + 梯形组合



##### 圆弧边

> 只可见部分border，且是border-radius



##### 双圆弧

> 单纯的圆，然后利用background-clip隔开一个空白边
