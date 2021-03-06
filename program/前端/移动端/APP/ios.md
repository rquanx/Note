### 知识点



#### CocoaPods

用 Ruby 编写的包管理器



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



### 发布

#### app图标

ios不支持透明和Alpha通道，png是自带Alpha的，所以建议图标原图使用jpg，然后生成出所需的图标



#### 上架（testflight + app store）

上架testflight需要发布证书

- 申请distribute证书
- 配置好InfoList，建议所有权限配置均配置
- scheme中analyze和archive都要设置release模式
- 上传新包只需要修改build number不用改version（ios中每个版本的build number可从1重新开发，android不可，只可增加）
- archive
- App Store Connect
- upload







#### 蒲公英

蒲公英要正常安装需要扫描信任蒲公英的证书



- 蒲公英账号创建
- 链接电脑查看设备uuid
- provision设置好设备uuid
- archive
- Ad Hoc
- export
- upload到蒲公英



#### 企业发布

- archive
- enterprise
- 发布到下载网站



### 打包、账号相关

#### 账号
分为个人、公司、企业，分布对应能开头的开发者被发布者数量不同

#### 证书
类型分开发者和发布者

对于已占用满发布者后，如果其他设备要进行发布需要对应发布者机器发布.ipa文件，描述文件可从官网开发者中进行获取



##### 基本步骤


- 创建cer或者使用现有的cer(导出.p12),(证书安装后要在账号prefrence中加载？)
- 创建appid(应用标识)
- 创建provision profile

[上传testflight](https://medium.com/%E5%BD%BC%E5%BE%97%E6%BD%98%E7%9A%84-swift-ios-app-%E9%96%8B%E7%99%BC%E6%95%99%E5%AE%A4/testflight-%E4%B8%8A%E5%82%B3%E6%95%99%E5%AD%B8-99aabc6c91dd)



##### appid

- Explicit App ID：唯一的App ID，用于唯一标识一个应用程序。例如“com.apple.garageband”这个App ID，用于标识Bundle Identifier为“com.apple.garageband”的App。
- Wildcard App ID：含有通配符的App ID，用于标识一组应用程序。例如“*”（实际上是Application Identifier Prefix）表示所有应用程序；而“com.apple.*”可以表示Bundle Identifier以“com.apple.”开头（苹果公司）的所有应用程序



##### 描述文件

Provisioning Profile，每年过期，需提前处理

描述文件==provisioning profile



**步骤**

- 新建Provisioning Profile 
- 选择：企业证书 In House；App ID（app的bundleID）；选择Certificates 账号
- 设置好后到Certificates中下载选中账号的Certificates并在mac中双击进行安装，查看钥匙串可知是否安装
- 重新打包app，手动/自动选择Profile ；xcode可以自动下载Provisioning Profile 

**查看过期时间**

`ipa`修改后缀为`.zip`，解压后可以得到`XXX.mobileprovision`

使用命令`security cms -D -i XXX.mobileprovision` 查看描述文件，可以查看描述文件信息、过期时间

> mac自带security命令



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



##### 证书Invalid

- 由App ID改变而导致签名文件变为无效状态不会影响之前使用该文件签名过的应用程序，变为无效状态只是提示开发者必须要更新/生成新的签名文件来反映其关联的App ID的变化，之后才能再次使用它进行代码签名。

- 证书过期或吊销不会影响该证书已经签名过的任何应用程序，签名证书无效状态时必须重新生成/更新配置文件才能与新的有效证书相关联。

**Certificate**
如果和签名文件相关的代码签名证书过期或者被吊销，这个签名文件就必须要重新编辑并且关联到一个新的证书，才能从invalid状态恢复到active状态，并被重新用于代码签名



**App ID**
当App ID发生改变时，比如在Xcode中打开或者关闭Capabilities中的某个功能，和App ID相关的签名文件必须被更新来相应的反应某个功能的关闭或开启。

Xcode自动生成管理的签名文件会自动更新，而手动创建的必须要重新生成，进入开发者账号Certificates, Identifiers & Profiles下，对Provisioning Profiles下的签名文件进行edit编辑，然后generate重新生成即可。




#### 开发调试
需要给设备设置开发证书，然后在Identify里设置对于的bundle id，

iOS调试时如果设备未注册，连接设备，打开xcode点击开始运行（图标），会提示可以自动注册



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



#### 打包产物

**ipa**

ipa是压缩文件，修改后缀为.zip，解压后可以看到相关信息文件



#### 问题

##### 此应用需要开发者更新以在此ios版本上运行

- Build Settings，Valid Architectures中设置好支持的架构

- 打包时选择`Generic iOS Device`



##### Rebuild from Bitcode失败

```
ipatool failed with an exception: #<CmdSpec...
`block in CompileOrStripBitcodeInBundle`
```

去掉Rebuild from Bitcode勾选



##### Specs satisfying the `sqflite (from `.symlinks/plugins/sqflite/ios`)` dependency were found, but they required a higher minimum deployment target.

依赖对部署的设备有最低版本要求，要在xcode中修改deploytarget系统版本，具体可查看 `.symlinks/plugins/sqflite/ios/xxx.podspec`内容



##### 提交审核缺少推送配置

- appid里勾选推送（应该是勾选后才出此错误）
- 创建推送证书
- xcode的Capability中添加push Notifications




##### cocoapods未设置

sudo gem install cocoapods

> 安装失败时换brew install cocoapods



##### Ios build Archive 提示  library not found for…

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


