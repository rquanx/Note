# 开始

## 环境安装

[官网教程](https://flutter.dev/docs/get-started/install)

1.安装flutter sdk

2.安装android-studio

3.环境变量设置

```
PUB_HOSTED_URL=https://pub.flutter-io.cn
FLUTTER_STORAGE_BASE_URL=https://storage.flutter-io.cn
flutter\bin   // Path设置sdk解压路径
```

4.cmd 执行 flutter doctor 按提示进行设置

## 创建项目

环境安装完毕后



### VSCode

指令栏输入：flutter，选择New Project进入项目创建引导



## 设备模拟

创建项目后使用VSCode打开，可以看到右下角有No device的文字，点击选择要使用的设备（模拟的话需要先通过安装开发工具创建一个虚拟设备）



## 运行

按F5等待运行



# 开发

## APP名称

默认APP名称使用工程文件夹名，修改较麻烦，可网上查询资料



## 应用入口

```dart
void main() => runApp(MyApp());
```





## 依赖库

### 公开库

#### 库

[Flutter Packages](https://pub.flutter-io.cn/flutter)



#### 添加

在pubspec.yaml的dependencies下dev_dependencies前增加对应的库和版本

```yaml
dependencies:
  flutter:
    sdk: flutter
  cupertino_icons: ^0.1.2
  english_words: ^3.1.0 # 增加english_words库

dev_dependencies:
  flutter_test:
    sdk: flutter
```



#### 安装

一、命令行界面指向 flutter packages get

二、编辑器自动下载



#### 使用

import xxx



### 私有库

#### 本地

```yaml
dependencies:
  plugin1:
    path: ../plugin1/
```



#### Git

```yaml
dependencies:
  plugin1:
    git:
      url: git://github.com/flutter/plugin1.git
      
      
# 仓库的某个路径下
dependencies:
  package1:
    git:
      url: git://github.com/flutter/packages.git
      path: packages/package1  
```







## 添加图片资源

1、建立文件夹存放资源

2、添加图片

3、pubspec.yaml以assets标签包含文件

```yaml
  assets:
   - lib/assets/img/t.jpg
```



## 使用ICON资源



```yaml
  fonts:
    - family: wxcIconFont
      fonts:
        - asset: static/font/iconfont.ttf
```



```dart
  ///使用Icons
new Tab(
      child: new Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: <Widget>[new Icon(Icons.list, size: 16.0), new Text("趋势")],
      ),
    );

///使用iconfont
new Tab(
      child: new Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: <Widget>[
          new Icon(IconData(0xe6d0, fontFamily: "wxcIconFont"), size: 16.0),
          new Text("我的")
        ],
      ),
    );
```







## 发起请求

```dart
import 'dart:io';

var httpClient = new HttpClient();

get() async {
  var httpClient = new HttpClient();
  var uri = new Uri.http(
      'example.com', '/path1/path2', {'param1': '42', 'param2': 'foo'});
  var request = await httpClient.getUrl(uri);
  var response = await request.close();
  var responseBody = await response.transform(UTF8.decoder).join();
}
```



## 数据转换



### JSON

```dart
import dart:convert
Map data = json.decode(responseBody);
// Assume the response body is something like: ['foo', { 'bar': 499 }]

int barValue = data[1]['bar']; // barValue is set to 499
```



## 文件获取

```dart
import 'package:path_provider/path_provider.dart';
```



### 临时目录

获取临时目录的路径

系统可随时清除的临时目录（缓存）

```dart
getTemporaryDirectory// ==> 对应于ios的  NSTemporaryDirectory()   android的getCacheDir()  
```



### 文档目录

用程序的目录，用于存储只有自己可以访问的文件。只有当应用程序被卸载时，系统才会清除该目录



```dart
getApplicationDocumentsDirectory()// ios上是NSDocumentDirectory	Android上是AppData
```



### 存储卡路径

获取sd卡的根路径

```dart
getExternalStorageDirectory() ///在iOS上，抛出异常，在Android上，这是getExternalStorageDirectory的返回值
```



### 获取文件对象

> ```dart
> import 'package:path_provider/path_provider.dart' as fileProvider;
> import 'dart:io';
> var name = "test.txt";
> String dir = (await fileProvider.getTemporaryDirectory()).path;
> var file = new File('$dir/$name');
> ```



## 文件、文件夹操作

```dart
import 'dart:io';
```



### Directory

目录对象



#### 方法

create

> 创建文件夹
>
> recursive：为真时会递归创建缺少的文件夹
>
> 
>
> ```dart
> await (new Directory("$dir/$folder").create(recursive: true)
> ```



exists

> 检查目录是否存在
>
> 
>
> ```dart
> await (new Directory("$dir/$folder").exists())
> ```



### File

文件对象



#### 方法

copy

> 文件保存至指定路径
>
> 
>
> ```dart
> await file.copy(path)
> ```



delete

> 文件删除







#### 属性

path

> 文件所在的路径，包含文件名



#### 使用

##### 获取文件名

> ```dart
> import 'package:path/path.dart' as path;
> var fileName = path.basename(file.path);
> ```



### 相机图片读取

```dart
import 'package:image_picker/image_picker.dart';

// ImageSource 为枚举
// ImageSource.camera   打开相机进行拍照
// ImageSource.gallery	从相册中选择图片
Future<File> getImage(ImageSource source) async {
    // ImageSource.camera
    return await ImagePicker.pickImage(source: source);
  }
```



## 路由跳转

```dart
///不带参数的路由表跳转
Navigator.pushNamed(context, routeName);

///跳转新页面并且替换，比如登录页跳转主页
Navigator.pushReplacementNamed(context, routeName);

///跳转到新的路由，并且关闭给定路由的之前的所有页面
Navigator.pushNamedAndRemoveUntil(context, '/calendar', ModalRoute.withName('/'));

///带参数的路由跳转，并且监听返回
Navigator.push(context, new MaterialPageRoute(builder: (context) => new NotifyPage())).then((res) {
      ///获取返回处理
    });

```



## 调试

### devtools

vscode   执行dart Open DevTools

可以打开本地网页查看到渲染树



select widget mode

开启后在手机点击元素会自动找到相应的节点







# 基础

## Material 

原生提供的组件库，安卓风格



### 页面

#### MaterialApp

应用顶层widget，配置主题、路由、多语言



##### 属性

title

> ??



theme

> App整体主题
>
> 接收new ThemeData()



home

> 首页widget？



#### Text

基础组件，渲染文字



##### 属性

style

> 设置文字的样式，通过new TextStyle()创建样式变量





#### Scaffold

provides a default app bar, title, and a body property that holds the widget tree for the home screen.

提供了默认的导航栏、标题和包含主屏幕widget树的body属性，整体的App，一个Scaffold == 一个页面



包含appbar、snackbar、drawer等material design的设定



##### 属性

appBar

> 放置导航栏组件



body

> 放置中间内容组件





#### AppBar

提供顶部导航栏



##### 属性

title

> 导航栏标题



actions

> 标题后放置的按钮，数组形式==>可以有多个按钮



#### RichText

富文本，通过设置`TextSpan`，可以拼接出富文本场景



#### TextField

文本输入框

```da
new TextField(
controller: //文本控制器, 
obscureText: "hint文本");
```



在Row中使用TextField需要使用Expanded包含



#### Image

图片加载

```dart
// 从网络加载图片
new FadeInImage.assetNetwork( 
    placeholder: "预览图", 
    fit: BoxFit.fitWidth, 
    image: "url");
```



#### FlatButton

按键

```dart
new FlatButton(
    onPressed: () {},
    child: new Container());
```







### IconButton

以图标显示的按钮



#### 属性



#### 方法

onPressed

> 点击按钮时进行的操作



### ListTile

列表标题组件



#### 属性

Title

> 显示的标题
>
> 输入new Text()



trailing

> 标题后面显示的内容



#### 方法

onTap

> 点击事件



divideTiles

> 将数组titles转换成对应的数组组件



### Divider

分割线组件



### Icon

图标组件



#### 属性

Icons.favorite

> 红心图标



Icons.favorite_border

> 红心图标，但是只有边框



color

> 根据color枚举这定颜色



### Navigator

导航组件



### MaterialPageRoute

页面路由组件



### 布局

#### 资料
[fltter布局](https://mp.weixin.qq.com/s/ms2ZKsYPiku6CkLh2FZEMw)

#### Container 

只有一个子 Widget。默认充满，包含了padding、margin、color、宽高、decoration 等配置。   



#### Padding 

只有一个子 Widget。只用于设置Padding，常用于嵌套child，给child设置padding。  

 

#### Center

 只有一个子 Widget。只用于居中显示，常用于嵌套child，给child设置居中。

   

#### Stack 

可以有多个子 Widget。 子Widget堆叠在一起。   

 



#### Column 

可以有多个子 Widget。垂直布局。

  

####  Row 

可以有多个子 Widget。水平布局。   



#### Expanded	

 只有一个子 Widget。在  Column 和  Row 中充满。  



#### ListView 

可以有多个子 Widget



##### 属性

child

> List<widget>



##### 方法

builder

> 创建列表
>
> padding
>
> itemBuilder：接收context和index为参数，定义生成函数





## Cupertino

[组件库，IOS风格](https://flutterchina.club/widgets/cupertino/)



### CupertinoSwitch

开关,switch按钮



## widget

部件

provide a `build()` method that describes how to display the widget in terms of other, lower level widgets



Widget变量不能为null



### StatelessWidget

无状态组件

继承StatelessWidget的类都是无状态组件



### Stateful widget

#### 创建有状态组件

1、创建State类

```dart
class RandomWordsState extends State<RandomWords> {
    @override
  Widget build(BuildContext context) {
    final wordPair = WordPair.random();
    return Text(wordPair.asPascalCase);   // 返回一个Text
  }
}
```



2、创建StatefulWidget

```dart
class RandomWords extends StatefulWidget {
  @override
  RandomWordsState createState() => RandomWordsState();
}
```



#### 状态变化

声明变量后，通过setState可以进行状态更新



#### 生命周期

##### initState

初始化，理论上只有初始化一次



##### didChangeDependencies

在 initState 之后调用，此时可以获取其他 State



##### dispose

销毁，只会调用一次



### 布局

#### Container 

只有一个子 Widget。默认充满，包含了padding、margin、color、宽高、decoration 等配置。   



#### Padding 

只有一个子 Widget。只用于设置Padding，常用于嵌套child，给child设置padding。  

 

#### Center

 只有一个子 Widget。只用于居中显示，常用于嵌套child，给child设置居中。

   

#### Stack 

可以有多个子 Widget。 子Widget堆叠在一起。   



#### Column 

可以有多个子 Widget。垂直布局。

  

####  Row 

可以有多个子 Widget。水平布局。   



#### Expanded	

 只有一个子 Widget。在  Column 和  Row 中充满。  



#### ListView 

可以有多个子 Widget






## Dart



### 变量

Dart 不需要给变量设置 `setter getter`   方法。

Dart 中所有的基础类型、类等都继承 Object ，默认值是 NULL， 自带 getter 和 setter 

> 如果是 final 或者 const 的话，那么它只有一个 getter 方法。



#### 变量声明

var

> ```dart
> var str = "123";
> var f = new File("");
> ```



final

> 不严格的常量
>
> 用于修饰变量，表示单赋值（single-assignment），使用final修饰的变量必须进行初始化，一旦被赋值之后，不能够再次被赋值,否则编译会报错。
>
> 值可以是表达式，不需要是确认的值
>
> 如果是对象，内部值也可变



const

> 严格的常量
>
> 声明常量，必须是明确的值
>
> 如果是对象，内部值也不可变



#### 类型声明

```dart
final _suggestions = <WordPair>[] // 声明私有变量_suggestions,并且类型是WordPair数组
```





### 私有变量

以_为开头声明的变量都被强制设为是私有变量



### 字符串

单引号、双引号均表示字符串.

```dart
var str = "123";
var str = '123';
String str = "123";
```





### 数组



### Set



### 函数



#### Async

返回Future对象 === Promise

```dart
 fun()  async {
String data = await request();
data = "ok from request";
return data;
}
```







#### 构造函数

##### 多构造函数

```dart
class ModelA {
  String name;
  String tag;
  
  //默认构造方法，赋值给name和tag
  ModelA(this.name, this.tag);

  //返回一个空的ModelA
  ModelA.empty();
  
  //返回一个设置了name的ModelA
  ModelA.forName(this.name);
}


作者：恋猫de小郭
链接：https://juejin.im/post/5b631d326fb9a04fce524db2
来源：掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
```







### 符号

#### 普通四则运算



#### 特殊

~/

> i ~/ 2 ==> *表示i除以2，但返回值是整形（向下取整）*



??

简写三目运算符

> `AA ?? "999"` 表示如果 AA 为空，返回999；
>
> `AA ??= "999"` 表示如果 AA 为空，给 AA 设置成 999



$字符串

> ```dart
> var name = "n";
> var str = "$name.txt";
> ```



### 模块

#### 引入模块

import 'xxx';



### 定时

```dart
new Future.delayed(const Duration(seconds: 1), () {
      // code
    });
```



# 问题

#### 安装Package

##### 一直get running

删除.packages文件，任务管理器结束dart.exe,删除flutter/.../cache下的lock文件，重新执行get

