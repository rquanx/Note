#### 技巧

##### 局域网共享

[访问共享电脑的局域网ip](https://bbs.feng.com/read-htm-tid-10271954.html)

##### 自颁发https证书

Iis-->网站-->右侧绑定-->添加-->选择协议、选择证书(iis develop 证书)-->给localhost颁发https证书



##### Https设置

导入证书，需要生成pfx文件，

如果有中间证书，需要打开根证书和中间证书，将内容复制进去，然后进行

```bash
Pkcs12 -export -out x.pfx -inkey x.key -in x.crt
```



#### 应用

##### 反向代理

[IIS代理](https://www.cnblogs.com/xzlive/p/11175420.html)
在iis的顶级站点中有`Application Routing Request`功能，`Application Routing Request` -> `Server Proxy Settings`可以设置
- 是否启用代理
- 请求超时时间
- 代理请求头
- 缓存



##### 禁止浏览后端api目录

`webconfig --> system.webServer/directoryBrowse/enabled`



#### 问题



##### Iis被另一程序占用

`netstat -ano`:查看端口状态，找到占用程序`pid`，任务管理器关掉



##### 文件上传大小

[iis上传大小限制](https://www.cnblogs.com/budai/p/7810107.html)



##### 503错误

503 一般是应用程序池未启动 



##### 请求失败

已设置超时，请求满一定时间时会自动失败，浏览器显示net::err_failed

可能是服务器代理或其他设置了执行超时时间

> webconfig executimeout



##### This configuration section cannot be used at this path. This happens when the section is locked at a parent level. Locking is either by default (overrideModeDefault="Deny"), or set explicitly by a location tag with overrideMode="Deny" or the legacy allowOverride="false"

1、缺少安装windows服务

- Go to Server Manager, click add Roles and Features
- In the roles section choose: Web Server
- Under Security sub-section choose everything (I excluded digest, IP restrictions and URL authorization as we don't use them)
- Under Application Development choose .NET Extensibility 4.5 and ASP>NET 4.5, both ISAPI entries
- In the Features section choose: NET 3.5, .NET 4.5, ASP.NET 4.5
- In the Web server section choose: Web Server (all), Management Tools (IIS Management Console and Management Service), Windows

2、解除webconfig锁定

- Open IIS Manager
- Click the server name in the tree on the left
- Right hand pane, Management section, double click Configuration Editor
- At the top, choose the section system.webServer/security/authentication/anonymousAuthentication
- Right hand pane, click Unlock Section
- At the top, choose the section system.webServer/security/authentication/windowsAuthentication
- Right hand pane, click Unlock Section