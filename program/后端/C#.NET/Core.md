### 基本

环境检查

> Dotnet –info



### ASP.NET Core

#### 项目架构

##### Program.cs

main函数执行，创建web服务



**CreateDefaultBuilder：new** WebHostBuilder对象并读取或设置了一些默认配置，如应用目录，WebServer，应用配置，环境变量，日志对象等



**UseStartup**：将Starup类注册到容器中,Startup类中包含了配置服务与Middleware



**Build**：使用之前的配置构造了new WebHost所需的一系列对象，包括：已创建的服务对象集合，容器对象，配置对象等，然后执行WebHost的初始化方法返回WebHost对象



##### Startup.cs

**中间件**

本质洋葱模型，next()函数执行下一个步骤



app.Use ==> 使用一个中间件

app.Map ==> 可以对特定路由注册完全单独的管道

app.Run ==> 最后步骤，完成所有中间件注册，进行运行



除了use，还可以通过继承或实现接口的房间来使使用方式更优雅





##### 配置文件

不使用web.config作为配置文件，默认使用appsettings.json

> 除支持普通值类型，也可以支持仅包含基础类型属性的对象，== 普通json对象
>
> 对标web.config，子节点
>
> 读取时可以通过json对象序列化获取子节点属性



支持从从多处地方读取配置



##### 服务器



ASP.NET Core“内置”了两个WebServer,Kestrel与HTTP.sys,作为进程内的HTTP服务器，其主要功能是监听HTTP请求并将一系列请求功能组成HttpContext提供Web应用使用



通过Program.cs中BuildWebHost方法中的IWebHostBuilder对象来进行配置使用哪一个，默认使用Kestrel



**Kestrel**

Kestrel可以单独使用或者配合iis,nginx等组合使用



**Http.sys**

Windows平台内核功能，IIS就是基于此运行的



##### IOC

自带有IOC

IOC生命周期

- Transient，每次被使用到时就创建新的实例。

- Scoped，每次请求创建一个实例。

- Singleton，在第一次被用到时创建之后都是用这个实例，也就是单例模式



##### 其他



**环境变量**

ASP.NET Core会读取系统中环境变量ASPNETCOREENVIRONMENT的值来确定当前的环境，有默认支持的类型值，也可以自定义值



**launch.json**

存在于Properties文件夹的文件用于在开发时对Web应用运行环境进行配置，包括WebServer与环境变量



**StaticFiles**

默认将应用目录下的wwwroot文件夹作为静态文件的根目录，也可以通过UseStaticFiles自定义目录



##### 资料

[认识ASP.NET Core / 基础](https://zhuanlan.zhihu.com/p/39692934)



### 问题

##### 配置文件读取问题

Xunit使用ConfigurationManager读取配置文件，需要将配置文件命名为testhost.dll.config，并且复制到生成路径





##### MIME

mime配置IIS无效，需要在代码里设置



##### Error 500.19

部署站点还需要安装Hosting Bundle


