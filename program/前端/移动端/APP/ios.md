### 知识点

#### XCode

XCode 12 仅支持 iOS 9.0 以上的版本，因此 Flutter 项目已将默认支持的版本从 8.0 更新到了1



#### infolist

##### 权限

<key>NSPhotoLibraryUsageDescription</key>
<string>使用相簿需要您的同意</string>

<key>NSCameraUsageDescription</key>
<string>使用相机需要您的同意</string>

<key>NSContactsUsageDescription</key>
<string>使用联络资料需要您的同意</string>

<key>NSMicrophoneUsageDescription</key>
<string>使用麦克风需要您的同意</string>

##### flutter国际化
localized resources can be mixed  yes



#### WebView

##### 加载本地文件

ios13 loadrequest可以直接加载？

ios9~12需要通过Loadfileurl进行加载？

> loadfileurl不能带参数/路由，只能是xxx.html




##### 调试
1、手机设置启用检查器
2、mac设置菜单选项
3、浏览器菜单-->开发-->对应的设备进行调试



### 打包、账号相关

#### 账号
分为个人、公司、企业，分布对应能开头的开发者被发布者数量不同

#### 证书
类型分开发者和发布者

对于已占用满发布者后，如果其他设备要进行发布需要对应发布者机器发布.ipa文件，描述文件可从官网开发者中进行获取

##### 描述文件

Provisioning Profile，每年过期，需提前处理

**步骤**

- 新建Provisioning Profile 
- 选择：企业证书 In House；App ID（app的bundleID）；选择Certificates 账号
- 设置好后到Certificates中下载选中账号的Certificates并在mac中双击进行安装，查看钥匙串可知是否安装
- 重新打包app，手动/自动选择Profile ；xcode可以自动下载Provisioning Profile 



##### 推送证书

APN Push

**创建方式**

1、`Certificates`新建证书--`>Apple Push Notification service SSL (Sandbox & Production)`-->选择AppiD --> 需要上传cer文件

2、Mac钥匙串左上角选择 钥匙串访问--> 证书助理-->从证书颁发机构请求证书

3、证书存储到磁盘、填入邮件和名称（随意）--> 生成Cer文件

4、上传cer文件-->创建证书完成-->下载推送证书

5、mac中双击下载的推送证书，安装后

6、钥匙串-->我的证书-->右键已安装的推送证书导出.p12 （不是点击我的证书，会不可选p12）

7、导出时输入证书密码 + Mac登陆密码，完成导出

8、证书上传第三方平台




#### 开发调试
需要给设备设置开发证书，然后在Identify里设置对于的bundle id

#### 打包发布

需要发布证书（数量限制较大），同时在profile中设置描述文件

- 如果发布证书已经满了，可以在已认证设备中到处.pa文件，以供其他设备使用
- 安装好.pa后，需要在开发者中心创建对应的描述文件，然后进行archive打包，打包完成后进行发布时需要输入电脑开机密码
- 发布时，.pa和profile的签名需要相匹配



##### 发布步骤

- 选择 enterprise
  - rebuid from bitcode 删除不必要的内容，可减少ipa体积
  - strip swift symbols 部分库需要用到？
  - Include manifest for over-the-air installation ?

- 设置app下载url, .ipa结尾，设置图片





#### 问题

**cocoapods未设置**

sudo gem install cocoapods

> 安装失败时换brew install cocoapods



**Ios build Archive 提示  library not found for…**
https://www.jianshu.com/p/026f54eef568
https://github.com/flutter/flutter/issues/10654

##### WebView渲染

IOS 系统中的 WebView 并没有将首屏直出的这部分 HTML 页面显示出来。
HTML 中直出的 DOM 结构会等待外部 CSS 和 JS 加载执行后**统一进行渲染**

解决办法：通过onload事件动态加载资源

##### webvoew动态渲染
由于首页骨架屏的代码量本身并不大，待其加载后再去动态引入静态资源，时间影响不大（后面有实验数据）


#### manifest.plist
Manifest.plist  文件名可随意变化，能正确指向即可
内容：
platform-identifier	com.apple.platform.iphoneos	
> 不能变

Kind	Software	
> 不能变类型确保

bundle-version		
> 随意

bundle-identifier		
> 高版本Ios会校验？

Title	app	
> 安装提示的内容


#### 安装
打包完成后可以导出，如果没有设置manifest的话默认不导出，设置有打包结果会有manifest.plist
ipa安装需要将manifest的内容设置好，同时发布到https的网站上


对于iis需要设置mime类型
.ipa   .apk  application/octet-stream
.plist application/xml

ios的发布后，要等很久才批准，可以适当 蚊蚜。

ios需要准备HTTPS网站才能下载安装？（ios13可以直接下载，其他的可能需要工作人员才能知道，ios11、12需要绑定域名才可安装）


### 消息推送
推送证书分开发证书和生产证书，生产证书可用于开发环境，可在官网登录直接生成证书文件，数量应该无限制，且生产环境证书可用于开发环境

环境自动区分
开发环境：通过连接mac安装
生产环境：通过mac打包后再安装

[生成p12推送证书](https://www.jianshu.com/p/5b0552f72b7f)



### 开发

#### Podfile

[Podfile 的解析逻辑](https://zhuanlan.zhihu.com/p/248308670)

> XCode Project简述，Podfile内容解析

#### Target

最小可编译单元,可设置编译时的一些设置

- Build Setting：比如指定使用的编译器，目标平台、编译参数、头文件搜索路径等；
- Build 时的前置依赖、执行的脚本文件；
- Build 生成目标的签名、Capabilities 等属性；
- Input：哪些源码或者资源文件会被编译打包；
- Output：哪些静态库、动态库会被链接；

#### Project

Targets 的载体,Project 就是一个独立的 Xcode 工程，作为一个或多个 Targets 的资源管理器，本身无法被编译

- 至少包含一个或多个可编译的 Target；
- 为所包含的 Targets 定义了一份默认编译选项，如果 Target 有自己的配置，则会覆盖 Project 的预设值；
- 能将其他 Project 作为依赖嵌入其中；


#### Workspace

作为纯粹的项目容器，Workspace 不参与任何编译链接过程，仅用于管理同层级的 Project

- Workspace 可以包含多个 Projects；
- 同一个 Workspace 中的 Proejct 文件对于其他 Project 是默认可见的，这些 Projcts 会共享 workspace build directory ；
- 一个 Xcode Project 可以被包含在多个不同的 Workspace 中，因为每个 Project 都有独立的 Identity，默认是 Project Name；

#### Scheme

描述 Build 过程


