#### 问题



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