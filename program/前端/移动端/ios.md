### 知识点

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


#### 开发调试
需要给设备设置开发证书，然后在Identify里设置对于的bundle id

#### 打包发布

需要发布证书（数量限制较大），同时在profile中设置描述文件
	如果发布证书已经满了，可以在已认证设备中到处.pa文件，以供其他设备使用，
		安装好.pa后，需要在开发者中心创建对应的描述文件，然后进行archive打包，打包完成后进行发布时需要输入电脑开机密码
	发布时，.pa和profile的签名需要相匹配

#### 问题
Ios build Archive 提示  library not found for…
https://www.jianshu.com/p/026f54eef568
https://github.com/flutter/flutter/issues/10654

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