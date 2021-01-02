##### 包管理

**maven镜像**

下载jar包慢、失败

`android/build.gradle --> allprojects`中设置

```gradle
maven { url 'https://maven.aliyun.com/repository/jcenter' }
maven { url 'https://maven.aliyun.com/repository/google' }

替换

jcenter()
google()
```



##### 必备


**local.properties**   

运行必备

android文件夹下，配置sdk位置，`sdk.dir=C:\\Users\\userName\\AppData\\Local\\Android\\sdk`



**key.properties**

发布签名必备，命令生成



##### 问题

**Android项目卡在Gradle: Download gradle-6.5-bin.zip**

打开`C:\Users\用户名\.gradle\wrapper\dists\gradle-6.5-bin\6nifqtx7604sqp1q6g8wikw7p` 目录，将该目录下所有文件删除，将下载的文件放进去，然后再重新打开项目

同理可推至gradle-x.y-bin.zip





**Failed to launch emulator. Reason: No emulators found as an output of `emula...**

设置adb环境变量,路径`android studio  --> sdk manager --> android sdk location`