#### 环境

##### 初始化

`npx react-native init {projectName}`



##### 调试打包

```bash
npx react-native run-android --variant devDebug # debug运行，会输出详细信息，用于定位bug
```



##### 路径

- 不要单独使用常见的关键字作为项目名（如 class, native, new, package 等等）
- 不要使用与核心模块同名的项目名（如 react, react-native 等）
- 不要在目录、文件名中使用中文、空格等特殊符号。



#### 热更新

##### 问题

**应用版本已过期**

React-Native提示您的应用版本已过期，是否重新安装：手机安装的版本与pushy的版本不一致问题，需要上传安装包到pushy上



#### 打包

##### Android

- Android Studio 打开项目的 android 文件夹
- project 窗口选中 app
- 菜单: build -> Select Build Variant
- 弹出的 Build Variant 窗口中 MedalReactNativeApp.app（第一个）,右侧 Active Build Variant 中点击从下拉中选择需要应用的配置文件
- 菜单: build -> Build Bundle(s) / APK(s),进行打包，bundle 一般用于上架，apk 可直接发布安装
- apk 打包后，可在 android\app\build\outputs\apk\{dev | beta | ga}\{debug | release}下找到 apk,apk 会按不同架构分包



##### iOS