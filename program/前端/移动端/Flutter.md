# 开始

## 环境安装

[英文官网教程](https://flutter.dev/docs/get-started/install)

[中文](https://flutter-io.cn/docs/get-started/install)

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





## 打包

### Andorid

#### 设置启动图标







#### 签名

1、创建密钥库

mac/linx

```bash
keytool -genkey -v -keystore ~/key.jks -keyalg RSA -keysize 2048 -validity 10000 -alias key
```



window

```bash
keytool -genkey -v -keystore c:/Users/USER_NAME/key.jks -keyalg RSA -keysize 2048 -validity 10000 -alias key
# c:/Users/USER_NAME/key.jks是密钥库保存路径
```



如果无法找到keytool，以通过路径找到或设置环境变量

> keytool位置，执行flutter doctor -v 在输出的’Java binary at:’ 后的路径中





2、key.properties

 创建`<app dir>/android/key.properties`文件

内容

```properties
storePassword=<上一步骤中的密码>
keyPassword=<上一步骤中的密码>
keyAlias=key
storeFile=<密钥库的位置，e.g. /Users/<用户名>/key.jks>
```



3.gradle配置签名

1、打开<app dir>/android/app/build.gradle

2、在android {  前增加

```properties
def keystoreProperties = new Properties()
   def keystorePropertiesFile = rootProject.file('key.properties')
   if (keystorePropertiesFile.exists()) {
       keystoreProperties.load(new FileInputStream(keystorePropertiesFile))
   }
```

3、将buildTypes替换

```properties
   signingConfigs {
       release {
           keyAlias keystoreProperties['keyAlias']
           keyPassword keystoreProperties['keyPassword']
           storeFile file(keystoreProperties['storeFile'])
           storePassword keystoreProperties['storePassword']
       }
   }
   buildTypes {
       release {
           signingConfig signingConfigs.release
       }
   }
```



#### 混淆压缩



#### App Manifest配置

设置<app dir>/android/app/src/main下的AndroidManifest.xml

application标签的android:label： app名

权限标签

在manifest标签下增加

```xml
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
    <uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
    <uses-permission android:name="android.permission.CAMERA" />
<uses-permission android:name="android.permission.INTERNET"/>
```



#### 构建配置



`<app dir>/android/app` 下的 [Gradle build file](https://developer.android.google.cn/studio/build/#module-level)

defaultConfig

> - `applicationId`：指定最终的，唯一的（Application Id）[appid](https://developer.android.google.cn/studio/build/application-id)。
> - `versionCode` & `versionName`：指定 app 的内部版本号，以及用于显示的版本号，这可以通过设置 pubspec.yaml 文件中 `version` 属性来做。具体可以参考 [版本文档](https://developer.android.google.cn/studio/publish/versioning) 中的版本信息指南。
> - `minSdkVersion` & `targetSdkVersion`：指定支持的最低 API 版本，以及我们 app 的目标 API 版本。具体可以参考 [版本文档](https://developer.android.google.cn/studio/publish/versioning) 中的 API 版本部分



#### 发布

##### Bundle(官方推荐)



##### APK

1、cmd进入app目录

2、执行 flutter build apk --split-per-abi

> 没有 --split-per-abi将会生成一个包含_所有_目标 ABI 平台的 fat APK 文件
>
> 占用空间没必要



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

// 直接传输[{}]时使用stream.xxx

```



## 状态管理

### InheritedWidget



### Provider

基于InheritedWidget



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
> 
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
> 
> ```



exists

> 检查目录是否存在
>
> 
>
> ```dart
> await (new Directory("$dir/$folder").exists())
> 
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
> 
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
> 
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



### Ios调试

#### mac

安装xcode

安装cocoapods

 

#### cmd

Flutter

Flutter build ios

Flutter run   

 

#### 要求

mac

1、需要开发者账号，注册设备（可通过xcode自动注册？）

2、根据flutter run 提示操作

3、debug

 

#### 操作

Xcode,点击runner文件夹可以看到project setting


### android调试

#### webview

webview的复用池，例如最多只存在3个webview，每次从池子里获取webview，达到复用的目的


安卓 webview调试
1、手机use连接电脑，打开调试模式
2、代码webview中设置debugenable
3、手机打开webview
4、浏览器打开chrome://inspect/#devices
5、在显示的remote target中找到对应的webview,点击inspect即可
注：不需要代码在debug模式中，直接连接即可调试webview；如遇到http 1.1 404 nofound, 翻墙即可



## 版本

Pubspec.yaml

1.0.0+1

Version = 1.0.0

Buildnumber = 1



## flutter cmd



 flutter -v输出更详细的信息




# 基础

## Flutter

Flutter在Rlease模式下直接将Dart编译成本地机器码



#### 颜色

Color:0xff + rgb



#### 路由

popUntil

pushAndRemoveUntil 和 pushNamedAndRemoveUntil

maybePop

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



### 对话框

本质是通过路由增加一个透明的页面？



向showDialog/showCupertinoDialog传入context可以弹框对话框、loading等

> context属于widget的属性，可以直接访问



关闭：Navigator.pop弹出路由

> 注意同步、异步问题，再弹框出现前弹出会把页面弹出
>
> pop("ok") / pop("cancel")   



返回future对象

> pop的时候将pop的数据传递？



#### AlertDialog

AlertDialog



### ButtonTheme

给Button类设置样式



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

[文档](https://api.flutter.dev/flutter/material/Icons-class.html)



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



### 滚动

#### Scrollbar

提供滚动条，为SingleChildScrollView的父元素



#### SingleChildScrollView

让页面可以滚动，如果父级不是Scrollbar可滚动，但不会显示滚动条



#### 应用

##### 将内容限制在指定大小，且可滚动

使用container包裹且设定宽高

> 固定/根据MediaQuery读取屏幕宽高然后设置



### 布局

#### 资料

[fltter布局](https://mp.weixin.qq.com/s/ms2ZKsYPiku6CkLh2FZEMw)

https://mp.weixin.qq.com/s/Pzbfoszuoj_JDz1KvBGieA

#### Container 

只有一个子 Widget。默认充满，包含了padding、margin、color、宽高、decoration 等配置。   



#### Padding 

只有一个子 Widget。只用于设置Padding，常用于嵌套child，给child设置padding。  

 

#### Center

 只有一个子 Widget。只用于居中显示，常用于嵌套child，给child设置居中。

   

#### Stack 

可以有多个子 Widget。 子Widget堆叠在一起。   


#### Flexible
和expaned类似，但是不会自动占满，包裹？ 



#### Column 

可以有多个子 Widget。垂直布局。

  

#### Row 

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



### 页面

#### CupertinoApp



#### CupertinoTabScaffold

tab + 页面



#### CupertinoTabBar

底部TabBar



#### BottomNavigationBarItem



#### CupertinoTabView

一个Tab视图



#### CupertinoPageScaffold

页面内容

顶部导航+页面内容

CupertinoNavigationBar会覆盖child内容

> 需要用safeArea



#### CupertinoNavigationBar



### 对话框

本质是通过路由增加一个透明的页面？



向showCupertinoDialog传入context可以弹框对话框、loading等

> context属于widget的属性，可以直接访问



关闭：Navigator.pop弹出路由

> 注意同步、异步问题，再弹框出现前弹出会把页面弹出
>
> pop("ok") / pop("cancel")   



返回future对象

> pop的时候将pop的数据传递？



#### CupertinoAlertDialog



### CupertinoSwitch

开关,switch按钮


## WebView

### 问题

#### 无法发出请求，无法访问

```xml
 <application android:usesCleartextTraffic="true">
    </application>
```

只需在main的AndroidManifest.xml的application标签设置即可

### 知识点

#### 插件版本处理
版本号用any.可自动处理版本问题 

#### 加载
支持字符串方式解析html

Loadurl,直接加载字符串，但是location也是对应的字符串，不是正常url，有大小限制

通过file:///加载  文件

#### 通讯
通过javascriptChannel进行通讯
channel名
_Action 	可以
__Action	X
__Action__	X
_Action_	X


js调用APP
通过全局变量然后postMessage发送字符串信息

APP调用js
在全局作用域下执行js代码


#### 文件交互

通过url路径可以加载文件，但是无法获取到文件数据？？

将文件转uri进行传递，需要注意mime类型


## 动画

在widget中实现运行动画，首先需要加入TickerProviderStateMixin，并且声明一个controller和动画(Animation)本身



## widget

部件

provide a `build()` method that describes how to display the widget in terms of other, lower level widgets



Widget变量不能为null

监听Widget是否绘制完毕
    WidgetsBinding.instance.addPostFrameCallback(_getRenderBox);


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

  

#### Row 

可以有多个子 Widget。水平布局。   


##### 属性

textBaseline
> 文本对齐


#### Expanded	

 只有一个子 Widget。在  Column 和  Row 中充满。  

##### 属性
flex
> 占比



#### ListView 

可以有多个子 Widget





### GestureDetector

给widget增加操作功能，如点击等



### SafeArea

根据屏幕尺寸进行内容适配，避免由于屏幕形状导致内容显示不全



### 类

```dart
// 状态类模板，无自身状态
import 'package:flutter/material.dart';

class TabContainer extends StatefulWidget {
  TabContain(
      {Key key,
      this.leading,
      this.middle,
      this.trailing,
      this.width = 200})
      : super(key: key);

  final Widget leading;
  final Widget middle;
  final Widget trailing;
  final double width;

  @override
  State<StatefulWidget> createState() {
    // TODO: implement createState
    return TabContainerState();
  }
}

class TabContainerState extends State<TabContain> {
  @override
  Widget build(BuildContext context) {
    return Container(
      width: widget.width,
      child: Stack(alignment: AlignmentDirectional.center, children: <Widget>[
        if (widget.leading != null)
          Positioned(
            left: 0,
            child: widget.leading,
          ),
        if (widget.middle != null)
          Row(
            children: <Widget>[
              Expanded(
                child: widget.middle,
              )
            ],
          ),
        if (widget.trailing != null)
          Positioned(
            right: 0,
            child: GestureDetector(
              child: widget.trailing,
            ),
          ),
      ]),
    );
  }
}

// 无状态类模板
class TabContainer extends StatelessWidget {
  TabContainer(
      {Key key, this.leading, this.middle, this.trailing, this.width = 200})
      : super(key: key);

  final Widget leading;
  final Widget middle;
  final Widget trailing;
  final double width;

  @override
  Widget build(BuildContext context) {
    return Container(
      width: width,
      child: Stack(alignment: AlignmentDirectional.center, children: <Widget>[
        if (leading != null)
          Positioned(
            left: 0,
            child: leading,
          ),
        if (middle != null)
          Row(
            children: <Widget>[
              Expanded(
                child: middle,
              )
            ],
          ),
        if (trailing != null)
          Positioned(
            right: 0,
            child: GestureDetector(
              child: trailing,
            ),
          ),
      ]),
    );
  }
}

```





## Dart



### 变量

Dart 不需要给变量设置 `setter getter`   方法。

Dart 中所有的基础类型、类等都继承 Object ，定义后默认值是 NULL， 自带 getter 和 setter 

> 如果是 final 或者 const 的话，那么它只有一个 getter 方法。



#### 变量声明

var

> ```dart
> var str = "123";
> var f = new File("");
> 
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



### 枚举

| Flutter 枚举tostring会得到 | 枚举.枚举名 |
| -------------------------- | ----------- |
|                            |             |

### 字符串

#### 单引号、双引号均表示字符串.

```dart
var str = "123";
var str = '123';
String str = "123";

```



#### 多行字符串

```dart
var str = """ ab
c""";

var str = '''ab
c''';

```



#### raw

```dart
var str = r"this is raw \n str"; // 不会进行转义

```





#### 模板字符串

```dart
var name = "n";
var str = "$name.txt";
var str = "${fun()}.txt";

```





### 数组

#### 方法

##### map

popUntil

pushAndRemoveUntil 和 pushNamedAndRemoveUntil

maybePop

#### 

### Set



### 函数



#### 类型声明

```dart
typedef int Compare(String a, String b);
Function f(Compare fun) {
    return fun;
}
var ff = f((String a,String b) => 1);

```





#### 箭头函数

```dart
bool isNoble(int atomicNumber) => _nobleGases[atomicNumber] != null;
/// () => expr; 箭头后只能是一个表达式

```



#### 参数

##### 普通参数

```dart
void fun(int par) {};

```

##### 可选参数

```dart
void fun(int par, {String par2,String par3}) {}

fun(1,par2:"par2");

```



##### 可选位置参数

```dart
void fun(int par, [String par2]) {}

fun(1,"par2");

```





##### 默认参数

默认值只能设置常量，没设置默认值默认为null

```dart
void fun(int par, {String par2 = "par2",String par3,
                   List<int> list = const [1,2,3],
                  Map<String,String> m = const {}
                  }
        ) {}

fun(1);


void fun1(int par, [String par2 = "par2",String par3]) {}

fun1(1);

```



##### 函数参数

返回函数（闭包）

```dart
Function makeAdder(num addBy) {
  return (num i) => addBy + i;
}

Function f(int fun(String a, String b)) {
    return fun;
}

main() {
  // Create a function that adds 2.
  var add2 = makeAdder(2);

  // Create a function that adds 4.
  var add4 = makeAdder(4);

  assert(add2(3) == 5);
  assert(add4(3) == 7);
}

```



参数

```dart
Function add(Function f,int num1) {
  return f(num);
}

Function fun(int num2) {
  return (v)  => num2 + v;
}

Function addNum = add(f,1);
var r = addNum(2);

```



### Class

既是类也是接口

implements  是实现接口

extends 是继承



#### 构造函数

```dart
class Point {
  num x;
  num y;

  Point(num x, num y) {
    // There's a better way to do this, stay tuned.
    // 如果参数名不冲突可以不用this.xxx
    this.x = x;
    this.y = y;
  }
}

// 等价于

class Point {
  num x;
  num y;

  // Syntactic sugar for setting x and y
  // before the constructor body runs.
  Point(this.x, this.y);
}

```



多构造函数

```dart
class Point {
  num x;
  num y;

  // Syntactic sugar for setting x and y
  // before the constructor body runs.
  Point(this.x, this.y);
    
  Point.empty();
}

var point = new Point(1,2);
var point = new Point.empty();

// new可以不用
var point = Point(1,2);
var point = Point.empty();

```



初始化

```dart
class Point {
  num x;
  num y;

  Point(this.x, this.y);

  // Initializer list sets instance variables before
  // the constructor body runs.
  Point.fromJson(Map jsonMap)
      : x = jsonMap['x'],
        y = jsonMap['y'] {
    print('In Point.fromJson(): ($x, $y)');
  }
}

```



重定向构造函数

```dart
class Point {
  num x;
  num y;

  // The main constructor for this class.
  Point(this.x, this.y);

  // Delegates to the main constructor.
  Point.alongXAxis(num x) : this(x, 0);
}

```



工厂方法构造函数

如果一个构造函数并不总是返回一个新的对象，则使用 `factory` 来定义 这个构造函数

```dart
class Logger {
  static final Map<String, Logger> _cache =
      <String, Logger>{}

  // The main constructor for this class.
  factory Logger(String key) {
     if (_cache.containsKey(name)) {
      return _cache[name];
    }
}

```



类函数调用

```dart
// 通过call可以让类进行调用
class WannabeFunction {
  call(String a, String b, String c) => '$a $b $c!';
}

var out = wf("Hi","there,","gang");

```



### 操作符

#### 四则运算

~/

> i ~/ 2 ==> *表示i除以2，但返回值是整形（向下取整）*



#### 类型操作

##### 转换

```dart
var a = [];
(a as List<int>).add(1);

```



##### 判断

```dart
if(a is List<int>) {} // 为null结果是false

if(a is! List<int>) {}

```





#### 特殊

??/??=

简写三目运算符

> `AA ?? "999"` 表示如果 AA 为空，返回999；
>
> `AA ??= "999"` 表示如果 AA 为空，给 AA 设置成 999



..

cascade(级联调用，链式调用)

对对象进行链式操作

```dart
var list = [1,2,3];
list.add(4); // 返回值为空
list..add(4)..add(5)..add(6);

```



?.

条件成员访问

```dart
var v = foo?.bar; // bar 为null 则为null

```



### 操作符重载

可重载操作符

| `<`  | `+`  | `|`  | `[]`  |
| ---- | ---- | ---- | ----- |
| `>`  | `/`  | `^`  | `[]=` |
| `<=` | `~/` | `&`  | `~`   |
| `>=` | `*`  | `<<` | `==`  |
| `–`  | `%`  | `>>` |       |



```dart
class Vector {
  final int x;
  final int y;
  const Vector(this.x, this.y);

  /// Overrides + (a + b).
  Vector operator +(Vector v) {
    return new Vector(x + v.x, y + v.y);
  }
}

```



### 模块

#### 引入模块

```dart
// 引入全部内容
import 'xxx';

// 以别名Module引入
import 'xxx' as Module;

// 只导入foo
import 'xxx' show foo;

// 不导入foo
import 'xxx' hide foo;

// 懒加载
import 'package:deferred/hello.dart' deferred as hello;

// 懒加载使用时loadLibrary
greet() async {
  await hello.loadLibrary();
  hello.printGreeting();
}

```





### 异步编程

#### Async

返回Future对象 === Promise

```dart
 fun()  async {
String data = await request();
data = "ok from request";
return data;
}

```



##### 循环中使用

```dart
var list = [1,2,3];
for(var i in list) {
    // await expression;
}

await for(var i in list) {
    // expression;
}

```



### isolate



### 定时

```dart
new Future.delayed(const Duration(seconds: 1), () {
      // code
    });

```



# 问题

#### 问题集
[flutter常见问题](https://blog.iw3c.com/archive/1166)

[Textfield placrholde 对齐](https://github.com/flutter/flutter/issues/40248)

[flutter笔记](https://www.yuque.com/zhiwa/deepin/vqc6y1)

#### 初始化
run app前执行 WidgetsFlutterBinding.ensureInitialized();
> 不执行，在Dart 2.7runapp 前初始化会报错

#### 安装Package

##### 一直get running

删除.packages文件，任务管理器结束dart.exe,删除flutter/.../cache下的lock文件，重新执行get



#### minSdkVersion

某些包可能有minSdk版本要求导致不能编译，需要修改以下内容的minSdkVersion

```dart
// ./android/app/build.gradle修改
defaultConfig {
    // TODO: Specify your own unique Application ID (https://developer.android.com/studio/build/application-id.html).
    applicationId "com.example.projectname"
    minSdkVersion 19 //*** This is the part that needs to be changed, previously was 16
    targetSdkVersion 28
    versionCode 1
    versionName "1.0"
    testInstrumentationRunner "android.support.test.runner.AndroidJUnitRunner"
}

```



#### 权限问题

当插件需要使用权限，且已同意时仍然提示没权限

flutter clean清空旧的打包，然后重新打包



#### app:transformClassesWithMultidexlistForDebug

package依赖重复了，pubspec.yaml注释可能冲突的项

#### import

Flutter import not fount  可能有地方import的时候使用了双斜杠，导致查找出错（错误信息中可以看出双斜杠问题）

#### keepalive没能保持

在实现keepalive的组件的build中需要super.build(context);否则还是会丢失状态



#### dart操作、更新一直显示running

1、任务管理器终止dart.exe

2、删除flutter/bin/cache下的lockfile（可选？）



#### mac无法运行程序问题

Ideviced_id（xxx） 无法验证开发者，找打文件打开即可信任







# 资料

[dart语言教程](https://www.dartcn.com/guides/language/language-tour)

> 简单过一遍



[Flutter实战](https://book.flutterchina.club/)



[Flutter-learning](https://github.com/AweiLoveAndroid/Flutter-learning)



[awesome-flutter](https://github.com/Solido/awesome-flutter)

[规范](%5bhttps:/github.com/alibaba/flutter-go/blob/develop/Flutter_Go%20%E4%BB%A3%E7%A0%81%E5%BC%80%E5%8F%91%E8%A7%84%E8%8C%83.md%5d(https:/github.com/alibaba/flutter-go/blob/develop/Flutter_Go%20代码开发规范.md))