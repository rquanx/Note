

#### 简述

#### 面板

##### Activities

###### 说明 

最重要，最常用的工具面板。所有可用的活动都可以在这个面板中找到。

由于功能太多，通过Search Activities可以根据关键字快速查找



###### 控件

WriteLine

> **Write Line** 是一个向 **Output** 面板输出文本的控件。这个控件通常用来输出变量的数据，方便调试。



Asign

> 初始值设置



Sequence

> 序列模块









##### Properties

###### 简述

控件属性面板，也能看到动态错误信息



##### Output

###### 简述

它呈现程序在运行过程中产生的错误、警告、消息、追踪等信息。在程序调试中非常有用。通常它和 **Write Line** 或者 **Log Message** 一起配合使用，在适当的时候告知我们程序运行的状态以及变量的数据。



#### 基础知识

##### 项目类别

- Sequences - 序列 适合执行线性执行的步骤，允许你平滑地从活动切换到另一个活动，而不会使你的项目变得细碎。
  - 适合顺序执行的程序逻辑，可以与编程结构的顺序执行作类比；
- Flowcharts - 流程图 适合更加复杂的业务逻辑，通过多重流程控制逻辑，允许你集成判断和连接多个活动等更加多样的形式来自动化执行流程
  - 用于比序列更高的层级，可以用序列来构建一个个模块，然后用流程图链接起来。相对于序列，流程图更适合于灵活地连接
- StateMachines - 状态机 适合大型的项目。它们在执行过程中使用有限的状态，这些状态是由条件(转换)或活动触发的。
  - 你可以将大型的项目分割成由序列和流程图组成的模块，然后在状态机内部把它们组织起来



##### 文本

UiPath 中所有的文本都应该用 **英文双引号** 括起来

> VB.NET 的字符串类型

##### 动态错误检测机制

例：

当文本框输入的文本缺少双引号时

- 会有蓝色感叹号图标提示
- 运行时也会报错
- 将鼠标悬停到感叹号可以看到错误提示信息

##### 包

UiPath Studio 中有 3 类包：

- 官方提供的包
- 来自社区的包
- 自定义的包



通过 Mananger Package可以对安装的包进行管理，类似于Nuget

###### 自定义activity

可以编写继承自 CodeActivity 或者 NativeActivity 的自定义活动
NativeActivity 更加强大

创建自定义活动需要两个步骤：

1. 编写自定义活动的代码
2. 在 UiPath 内添加外部程序集（.dll）

从编程角度来看，Activity 其实是一个类。因此，创建自定义活动就需要相应的编程工具。在这里，我们需要使用以下组件来创建自定义活动：

- [Microsoft Visual Studio](https://www.visualstudio.com/)  以及安装了.NET  桌面开发组件
- [NuGet Package Explorer](https://github.com/NuGetPackageExplorer/NuGetPackageExplorer/releases). 点击 [链接](https://github.com/NuGetPackageExplorer/NuGetPackageExplorer/releases) 即可下载



通过VS编写自定义Activity



##### 文件

Project.json

> 一个自动生成的文件，它包含在由 Studio 创建的每个自动化项目文件夹中。该文件包含有关项目依赖关系的信息。



##### UI Interaction

屏幕抓取

> 抓取相同的数据，自动翻页

数据抓取

> 抓取表格



##### Selector

可以在selector中使用* ,?等正则字符串？

full selector

> 直接是整体的窗口 basic record
> 包含程序名，文件名，....

partical selector

> 有部分窗口作上下文，desktop record

dynamic selector

> 使用变量控制，选中



Anchor

> 通过屏幕位置定位,不能再后台运行



Relative Selector

> 依赖于结构，可运行在后台