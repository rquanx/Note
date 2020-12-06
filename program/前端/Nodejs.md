### NodeJS

[import默认文件](https://www.cnblogs.com/goloving/p/8889585.html)



#### 日志

#### 知识点

##### 日志

- AccessLog: 这是最常见的日志类型，一般在 nginx 等方向代理中也有日志记录，但在业务系统中有时需要更详细的日志记录，如 API 耗时，详细的 request body 与 response body

- SQLLog: 关于数据库查询的日志，记录 SQL、涉及到的 table、以及执行时间，「从此可以筛选出执行过慢的SQL，也可以筛选出某条API对应的SQL条数」

- RequestLog: 请求第三方服务产生的日志

- Exception: 异常

- RedisLog: 缓存，也有一些非缓存的操作如 zset 及分布式锁等

- Message Queue Log: 记录生产消息及消费消息的日志

- CronLog: 记录定时任务执行的时间以及是否成功

\- 关键业务逻辑



##### 大文件复制
[Stream pipe](https://segmentfault.com/a/1190000021582224)

#### 问题

##### browser' doesn't contain a valid alias configuration

使用多种工具安装依赖后可能产生的异常，例：npm装后再用cnpm装

解决：重装依赖





##### 请求时出现read ECONNRESET

Headers增加：Connection: 'keep-alive'



##### 执行child_process.exec报错maxBuffer exceeded

options. stdio 设置有关, child_process.exec(x,{maxBuffer: 111},cb);



##### child_process.spawn 方法调用shell脚本发现控制台无法监听用户的输入

options. stdio 设置有关



##### nodejs 调用 shell 后，shell里面的命令找不到

options.env有关



##### 内存泄漏
[记录一次由一行代码引发的“血案”](https://cnodejs.org/topic/5aaba2dc19b2e3db18959e63)
[一行 delete require.cache 引发的内存泄漏血案](https://zhuanlan.zhihu.com/p/34702356)



##### **内存不足**

解决方式：通过设置加大内存

- Script设置：`"build": "NODE_OPTIONS=--max_old_space_size=4096 umi build "`

- 设置环境变量
  - `windows`：临时-`set NODE_OPTIONS=--max_old_space_size=4096`，永久-`setx NODE_OPTIONS --max_old_space_size=4096`



#### 文件操作



#### 路径操作



require.resolve拼接好路径以后，它会主动去帮你判断这个路径下的文件是否存在

#### 模块

##### 引入

当存在多个版本的库时，require可能出现错误




##### 技巧

###### 不需要引入即可使用的模块

把 API 挂载到 global 对象上就行

例：在我们使用 Mocha 编写测试用例时，我们不需要手动引入 Mocha 提供的任何模块，就能够直接使用 describe、it 等一系列 API。

#### NPM

##### 安装

###### cnpm安装

类似指令安装问题通用解决方法

- 安装结束重启cmd
- 修改环境变量
- 还不能行直接copy到nodejs文件目录中



 

安装cnpm没能安装到全局c盘，反而安装到当前目录，是由于权限问题，导致无法下载上,会用管理员运行再下载或者copy



##### package.json

###### 版本
~自动更新至最新的小版本
> ~2.3.0  不会更新到2.4

^自动更新至最新的当前大版本
> ^2.3.0     不会更新到3.0以上

没有符号
> 固定版本


###### 指令

npm i  ==>  npm install   自动安装所有依赖

npm outdated  查看包的版本情况

npm outdated -g 查看全局包的版本情况

###### Script

快速指令  npm run xxx

###### dependencies

生产环境依赖

打包生产环境资源时， dependencies 中的依赖会被打包，而 devDependencies 中的依赖不会被打包。

生产环境依赖安装到 devDependencies，在本地时没问题，到生产环境会因为缺少依赖而无法正常运行。

npm i module_name  -S  = >  npm install module_name --save    
​	写入到 dependencies 对象		小写s无效

###### devDependencies

开发环境依赖

如果将开发环境依赖安装到 dependencies ，本地和生产环境都没问题，就是生成的文件会大一点。

npm i module_name  -D  => npm install module_name --save-dev   
​	写入到 devDependencies 对象  



#### 修改node_modules



**一、利用webpack别名**



别名原理：将import路径中的字符串进行替换，再进行查找，对node_modules中的路径同样有效

1、复制node_modules要修改的文件到src，然后修改，将文件的import路径进行修正

2、通过webpack别名，对引入这个文件的路径进行替换



**二、利用patch-package包**



#### NVM

多版本node.js管理

[nvm下载nodejs，下载失败，修改镜像](https://blog.csdn.net/qq_25479327/article/details/105609021)

> nvm install fails with stream error: stream ID 7; INTERNAL_ERROR - yet reports complete.



#### PM2

应用管理

##### 启动

```bash
pm2 start app.js  # 启用程序
pm2 start app.js -i 4        # cluster mode 模式启动4个app.js的应用实例
pm2 start app.js --watch      # 当文件变化时自动重启应用
pm2 start app.js --name="api" # 启动应用程序并命名为 "api"
```

##### 查看

```bash
pm2 list                      # 列表 PM2 启动的所有的应用程序
```



##### 自动启用



```bash
pm2 save                      # 保存当前应用列表
pm2 resurrect                # 重新加载保存的应用列表
```

