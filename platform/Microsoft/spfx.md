## *环境*

### 链接	

[使用Fabric-react](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/web-parts/get-started/use-fabric-react-components)

runquantan@weinteckdev.onmicrosoft.com

K(int)k(int)

[开发者账号测试页面](https://weinteckdev.sharepoint.com/sites/Test/SitePages/testPage.aspx)

[开发者账号APP管理页](https://weinteckdev.sharepoint.com/sites/App/AppCatalog/Forms/AllItems.aspx)

[开发者账号网站管理页](https://weinteckdev-admin.sharepoint.com/_layouts/15/online/AdminHome.aspx#/siteManagement)



### 资料

[官方文档](https://docs.microsoft.com/zh-cn/sharepoint/dev/spfx/set-up-your-development-environment)
[微软官网文档](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/sharepoint-framework-overview)
[微软官网文档](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/known-issues-and-common-questions )



[陈希志博客](https://www.cnblogs.com/chenxizhang/category/967796.html)
[微软开发者论坛](https://social.msdn.microsoft.com/Forums/en-US/home
https://social.msdn.microsoft.com/Forums/en-US/c3180339-8111-4025-a174-46d87afc00c8/sharepoint-framework-in-onpremise-sp-2013?forum=sharepointdevelopment
https://social.msdn.microsoft.com/Forums/en-US/77c90214-a5c0-430a-b8c7-05483c76a9d8/sharepoint-framework?forum=sharepointadmin
https://rencore.com/blog/sharepoint-framework-webinar-qa-follow-part-1-sharepoint-framework/
https://github.com/SharePoint/sp-dev-fx-webparts)
[modern web stack](https://github.com/SharePoint/sp-dev-samples/tree/dev )





## *Quick Start*


### 项目结构

```js
│  .editorconfig 		// 编辑器配置
│  .gitignore			// git提交忽略设置
│  .yo-rc.json			// 记录模板生成器的信息
│  gulpfile.js			// 打包脚本
│  package-lock.json	// 依赖版本锁定
│  package.json			// 项目信息、依赖、指令记录
│  README.md			// 官方README文档
│  tsconfig.json		// typescript编译设置
│  tslint.json			// typescript语法规则设置
├─config				
│      config.json		// 打包信息，入口、manifest、输出路径...
│      copy-assets.json
│      deploy-azure-storage.json
│      package-solution.json	// 部署打包相关的信息，打包路径等
│      serve.json				// 本地调试信息
│      write-manifests.json
│      
├─dist
│      3ba21ca6-544f-49ee-b098-c7732d6469b0.manifest.json
│      hello-world-web-part.js
│      hello-world-web-part.js.map
│      
├─lib
│  │  index.d.ts
│  │  index.js
│  │  index.js.map
│  │  
│  └─webparts
│      └─helloWorld
│          │  HelloWorldWebPart.d.ts
│          │  HelloWorldWebPart.js
│          │  HelloWorldWebPart.js.map
│          │  HelloWorldWebPart.manifest.json
│          │  
│          ├─components
│          │      HelloWorld.d.ts
│          │      HelloWorld.js
│          │      HelloWorld.js.map
│          │      HelloWorld.module.css
│          │      HelloWorld.module.scss.d.ts
│          │      HelloWorld.module.scss.js
│          │      HelloWorld.module.scss.js.map
│          │      IHelloWorldProps.d.ts
│          │      IHelloWorldProps.js
│          │      IHelloWorldProps.js.map
│          │      
│          └─loc
│                  en-us.js
├─sharepoint			// 打包后的文件
│  └─ solution
│  	   │  hello.sppkg	// 部署webpart，可解压出文件
│  	   │
│  	   └─debug
│      	   │  AppManifest.xml
│      	   │  feature_3ba21ca6-544f-49ee-b098-c7732d6469b0.xml
│      	   │  feature_3ba21ca6-544f-49ee-b098-c7732d6469b0.xml.config.xml
│      	   │  [Content_Types].xml
│      	   │
│      	   ├─3ba21ca6-544f-49ee-b098-c7732d6469b0
│      	   │      WebPart_3ba21ca6-544f-49ee-b098-c7732d6469b0.xml
│      	   │
│      	   └─_rels
│             	   .rels
│             	   AppManifest.xml.rels
│             	   feature_3ba21ca6-544f-49ee-b098-c7732d6469b0.xml.rels
│                  
├─src
│  │  index.ts
│  │  
│  └─webparts
│      └─helloWorld
│		   │  MockHttpClient.ts	// mock数据文件，需要自行创建
│          │  HelloWorldWebPart.manifest.json // 定义webpart的一些信息:版本、id、属性等
│          │  HelloWorldWebPart.ts			  // 程序入口点，继承BaseClientSideWebPart
│          │  
│          ├─components
│          │      HelloWorld.module.scss
│          │      HelloWorld.module.scss.ts	  // 根据HelloWorld.module.scss生成
│          │      HelloWorld.tsx
│          │      IHelloWorldProps.ts
│          │      
│          └─loc
│                  en-us.js
│                  mystrings.d.ts
│                  
├─temp
│  │  manifests.js
│  │  manifests.json
│  │  tslint.json
│  │  workbench.html
│  │  
│  └─stats
│          spfxTest.stats.html
│          spfxTest.stats.json
│          
└─typings
    │  tsd.d.ts
    │  
    └─@ms
            odsp.d.ts
```





### 运行环境

SPO or SP 2016 Feature Pack 2以上



### 开始

#### 一、注册O365开发者（可跳过）

[O365 tenant环境](<https://docs.microsoft.com/zh-cn/sharepoint/dev/spfx/set-up-your-developer-tenant>)

> 加入devloper program其中部分操作需要翻墙



[管理中心](https://weinteckdev-admin.sharepoint.com/)

>  xxx[-admin.sharepoint.com](https://weinteckdev-admin.sharepoint.com/)
>
> runquantan@weinteckdev.onmicrosoft.com



创建应用程序目录网站

管理中心-->经典模式-->应用程序-->应用程序目录



#### 二、环境安装

[官方文档](<https://docs.microsoft.com/zh-cn/sharepoint/dev/spfx/set-up-your-development-environment>)



1、[安装node.js最新稳定版](<https://nodejs.org/>)

2、全局安装开发工具

```bash
npm i -g yo gulp @microsoft/generator-sharepoint
```

3、创建项目

创建时会提示是否使用最新版本

- online only
  -  安装最新版

- SP2016
  - SP2016只支持旧版，安装旧版，v1.1

- SP2016 and online    
  - 安装旧版



[生成首个webpart](<https://docs.microsoft.com/zh-cn/sharepoint/dev/spfx/web-parts/get-started/build-a-hello-world-web-part>)

```bash
yo @microsoft/sharepoint
```



4、创建完毕

```bash
# 执行
gulp trust-dev-cert
```



#### 三、调试

1、本地运行

```bash
gulp serve
```



2、在线预览

打开online站点，进入/_layouts/15/workbench.aspx，添加webpart即可预览



#### 四、部署

[部署文档]([https://docs.microsoft.com/en-us/sharepoint/use-app-catalog?redirectSourcePath=%252fen-us%252farticle%252fuse-the-app-catalog-to-make-custom-business-apps-available-for-your-sharepoint-online-environment-0b6ab336-8b83-423f-a06b-bcc52861cba0](https://docs.microsoft.com/en-us/sharepoint/use-app-catalog?redirectSourcePath=%2fen-us%2farticle%2fuse-the-app-catalog-to-make-custom-business-apps-available-for-your-sharepoint-online-environment-0b6ab336-8b83-423f-a06b-bcc52861cba0))

1、打包

```bash
 # 不打包静态资源，需要CDN或本地运行服务提供资源
 gulp package-solution
 
 gulp serve --nobrowser # 本地运行服务提供资源
 
 # 打包静态资源，分别执行以下指令，如果启用CND，部署后会将资源托管到CDN,否则托管到SP列表中
 gulp bundle --ship
 gulp package-solution --ship
```



2、部署

- 打开通过应用程序目录创建的站点
- 选择第一个Distribute apps for SharePoint
- 上传打包的.sppkg文件，部署
- App Package Error Message*字段可以查看是否部署失败
- 进入网站内容，add an app,添加到网站中
  - 如果选择允许所有网站使用，则不需要add app
- 部署完成后在编辑页面的时候就能看到webpart



3、使用

- 进入网站内容，add an app,添加到网站中

- 部署完成后在编辑页面的时候就能看到webpart



##### SP2016下部署

1、修改config/write-manifests.json的cdnBasePath路径为资源文件上传路径

2、执行打包指令

```bash
 gulp bundle --ship
 gulp package-solution --ship
```

3、将打包文件.sppkg部署

4、将temp/deploy/下的文件上传至cdnBasePath路径下

5、部署即可



#### 五、资源托管

- O365 CDN

- Azure CDN
- SharePoint库



##### 使用PowerShell设置托管

1、安装[SharePoint Online Management Shell](<https://www.microsoft.com/en-us/download/details.aspx?id=35588>)

2、PowerShell执行以下指令

```bash
# 连接站点，需要输入账号、密码 
Connect-SPOService -Url https://xxx-admin.sharepoint.com

# 检查当前的CDN设置状态,返回value为true
Get-SPOTenantCdnEnabled -CdnType Public

# 查看CDN源列表，后缀有config pennding 表示还没准备好
Get-SPOTenantCdnOrigins -CdnType Public

# 检查支持托管的文件类型，IncludeFileExtensions
Get-SPOTenantCdnPolicies -CdnType Public 

# 启用cdn
Set-SPOTenantCdnEnabled -CdnType Public
```



##### 使用O365 cli设置托管

[cli开始文档](<https://pnp.github.io/office365-cli/>)

[cli指令文档](<https://pnp.github.io/office365-cli/cmd/spo/login/>)

```bash
npm i -g @pnp/office365-cli # 安装o365 cli

office365 # 进入O365指令模式

spo login https://xxx-admin.sharepoint.com # 登录

help # 查看帮助

exit # 退出

spo cdn get [options]

spo cdn set [options]
```



#### 六、无框架开发

组件

```js
// 创建组件文件
export default class MyAccordionTemplate {
    public static templateHtml: string =  `<div></div>`;
}

// 在入口文件
import MyAccordionTemplate from './MyAccordionTemplate';
render() {
    this.domElement.innerHTML = MyAccordionTemplate.templateHtml;
}

```



### 开发

#### 常用指令

```bash
gulp serve # 进行本地调试

gulp package-solution # 打包

gulp serve --nobrowser # 本地运行服务，为了提供资源

npm install mypackage@newversion --save # 更新包版本

gulp clean # 清除旧的构建内容
```



#### webpart入口点

extends

> 继承BaseClientSideWebPart才是有效的客户端webpart
> BaseClientSideWebPart实现了webpart所需的基本功能，并且提供了
>
> displayMode
> web part properties
> web part context
> web part **instanceId**,
> the web part **domElement**
>
> 等参数,this.xxx获取
>
> *this*.domElement.innerHTML 可以直接对节点进行操作



render

> ```tsx
> // 如果要用jsx，需要将文件后缀改成tsx
>  const element: React.ReactElement<IHelloWorldProps> = (
>    <HelloWorld description={this.properties.description} />
>  );
> ```



getPropertyPaneConfiguration

> 定义属性panel



#### 给webpart增加属性

1、入口文件

```ts
import {					// 引入属性组件
  PropertyPaneTextField,	// 输入框
  PropertyPaneCheckbox,		// check box
  PropertyPaneLabel,		
  PropertyPaneLink,					
  PropertyPaneSlider,
  PropertyPaneToggle,
  PropertyPaneDropdown
} from '@microsoft/sp-webpart-base';

// 入口组件声明，在getPropertyPaneConfiguration中增加属性时也相应的增加定义
export interface IHelloWorldWebPartProps {
  description: string;
}

// 当更新属性时，会自动render组件，如果不需要自动刷新增加以下函数
// Non-reactive or Reactive
protected get disableReactivePropertyChanges(): boolean { 
  return true; 
}

// panel设置
protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          // panel的header信息
          header: {
            description: strings.PropertyPaneDescription
          },
          // 属性组
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                // 属性组件				属性名
                PropertyPaneTextField("目标属性", {
                  // 属性的属性设置
                  label: strings.DescriptionFieldLabel，
                    onGetErrorMessage 
                    // 检验函数，接收输入返回字符串的函数，但设置不正确时会提示
                    // 可以是返回promise的异步校验函数，校验列表是否存在
                    deferredValidationTime
                    // 可以设置延迟校验的时间，
                })
              ]
            }
          ]
        }
      ]
    };
  }

// strings 在ioc的mystrings.d.ts中声明类型，建议同步更新
// en-us.js是多语言设置？
```



2、manifest.json

```js
// 给属性设置初始值
"properties": {
  "description": "HelloWorld",
  "test": "Multi-line text field",
  "test1": true,
  "test2": "2",
  "test3": true
}
```



#### webpart.manifest.json



[说明文档](https://docs.microsoft.com/zh-cn/sharepoint/dev/spfx/web-parts/guidance/simplify-adding-web-parts-with-preconfigured-entries#predefined-modern-groups)

```js
{
  "$schema": "https://developer.microsoft.com/json-schemas/spfx/client-side-web-part-manifest.schema.json",
  "id": "",
  "alias": "HelloWorldWebPart",
  "componentType": "WebPart",

  // The "*" signifies that the version should be taken from the package.json
  "version": "*",
  "manifestVersion": 2,

  // 如果为真只能部署在运行Custom Script的站点上
  // [Components that allow authors to embed arbitrary script code should set this to true.
  // https://support.office.com/en-us/article/Turn-scripting-capabilities-on-or-off-1f2c515f-5d7e-448a-9fd7-835da935584f
  "requiresCustomScript": false,
      
  "supportedHosts": ["SharePointWebPart"],
	"supportsFullBleed" : 'true' //  需要全宽布局支持时需要设置
  "preconfiguredEntries": [{
    "groupId": "5c03119e-3074-46fd-976b-c60198311f70", // Other
      // 新页面添加时所属的组，分类？，sharepoint有预定义组的id，如果id没填对自动到其他组
    "group": { "default": "Other" },
      // 经典页面添加时所属的组，分类？
    "title": { "default": "HelloWorld" },
      // 添加时工具箱中显示的 Web 部件标题。
    "description": { "default": "HelloWorld description" },
      // 工具箱工具提示中显示的 Web 部件说明。
    "officeFabricIconFontName": "Page", 
      // 设置添加部件时的图标，看fabric react
    "iconImageUrl": "https://assets.contoso.com/weather.png", 
      // 不使用officeFabricIconFontName，使用外部图标,或base64
      "properties": {
      "description": "HelloWorld",
    }
      // 组件默认属性
  }]
    // preconfiguredEntries是数组，可以设置多套默认值，在添加的时候可展开选择
}
```



#### MockHttpClient.ts

> 继承**MockHttpClient** 



#### 内置Rest请求

```ts
import {
  SPHttpClient,
  SPHttpClientResponse   
} from '@microsoft/sp-http';
import { escape } from '@microsoft/sp-lodash-subset';
private _getListData(): Promise<ISPLists> {
    return this.context.spHttpClient.get(this.context.pageContext.web.absoluteUrl + `/_api/web/lists?$filter=Hidden eq false`, SPHttpClient.configurations.v1)
      .then((response: SPHttpClientResponse) => {
        console.log(response.json());
        return response.json();
      });
  }
```



#### Environment

```ts
// 引入环境信息
import {
  Environment,
  EnvironmentType
} from '@microsoft/sp-core-library';

// Environment.type 当前环境类型
// EnvironmentType	Local、SharePoint、ClassicSharePoint  环境类型枚举

```



#### package-solution.json

打包配置信息文件

```js
{
  "$schema": "https://developer.microsoft.com/json-schemas/spfx-build/package-solution.schema.json",
  "solution": {
    "name": "hello-client-side-solution",
    "id": "b2ffa604-c624-4e21-b829-76031d2d3efd",
    "version": "1.0.0.0",
    "includeClientSideAssets": true,	
      // 打包时会自动打包资源
      // spfx v1.4才生效
      // o365或sp列表托管设为true,其他托管方式时设为false
          "isDomainIsolated": true
    // build web parts that securely communicate with APIs secured with Azure AD without exposing the access token to other components on the page or even scripts in the tenant.
      "skipFeatureDeployment": false
      // 是否自动部署到全部的站点，只适用于webpart,extensions仍需要手动设置
      // extensions需要使用CSOM或REST以编程方式将CustomAction添加到每个Web（如通过迭代或包括进入一些配置代码，use CSOM or REST to add a CustomAction programmatically to each web as you need；need to take care of the programmatic association/registration to each site/web you require, using CustomAction/ClientSideComponentId.
  },
  "paths": {
    "zippedPackage": "solution/hello.sppkg"
  }
}
```



#### config.json

```js
// 打包时不打到webpart的主js中，会提取出来，但仍在部署内容中
// 建议使用externals，这样既是部署多个Webpart也可以复用下载的资源
"externals": {
    "jquery":"node_modules/jquery/dist/jquery.min.js",
    "jqueryui":"node_modules/jqueryui/jquery-ui.min.js"
  }
```



#### SPComponentLoader加载外部资源

```js
// 在入口文件构造函数中进行外部资源加载
import { SPComponentLoader } from '@microsoft/sp-loader';

public constructor() {
  super();
  SPComponentLoader.loadCss('//code.jquery.com/ui/1.11.4/themes/smoothness/jquery-ui.css');
}
```



#### 加载css

直接在代码里import即可



#### 加载图片

- css中使用background: url()
- js中使用require("")



#### 单一部件页

1、

```js
// webpart.manifest.json
"supportedHosts": ["SharePointFullPage"]
```

2、 部署后

- 创建新页面

- 在页面上添加 Web 部件并根据需要进行配置

- 将页面布局类型更改为 `SingleWebPartAppPage`[设置方式](<https://docs.microsoft.com/zh-cn/sharepoint/dev/spfx/web-parts/single-part-app-pages>)



#### 资源预定义

[可自动创建列表](<https://docs.microsoft.com/zh-cn/sharepoint/dev/spfx/web-parts/get-started/provision-sp-assets-from-package#create-feature-framework-files-for-initial-deployment>)



#### 独立部件

构建可与由 Azure AD 保护的 API 进行安全通信的 Web 部件，而无需将访问令牌公开给页面上的其他组件甚至租户中的脚本

```js
// package-solution.json
isDomainIsolated: true
```



#### 部件间通信

1、cookies

2、localstorage

3、全局变量



#### JSOM使用

1、

```js
require('sp-init');
  require('microsoft-ajax');
  require('sp-runtime');
  require('sharepoint');
```

2、SPComponentLoader.loadScript



#### Element.xml

[Provision SharePoint assets from your SharePoint client-side web part](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/web-parts/get-started/provision-sp-assets-from-package)

### 操作

#### 在线预览

> 站点地址增加/_layouts/15/workbench.aspx即可打开在线拖拽开发页面
>
> 代码变化，打包后需要刷新生效



#### 经典页面添加web部件

> 页面编辑-->添加部件-->上载部件
>
> 只能添加*.webpart 或 *.dwp的文件，旧的.wsp不可行



#### 修改SP默认语言

1、修改语言设置

2、修改region



#### 新建页面

新建web部件页：和旧方式一样，可插入部件

> 编辑部件属性-->配置-->可进行组件属性设置，会实时render



新建网站页面：会以workbench的方式进行编辑...

两种方式均可通过本地提供资源来进行预览

### 记录



#### Script editor

创建站点时需要选择发布站点才能使用script editor

> team site不能进行script editor设置

> 默认禁用，需要在管理中心-->经典管理中心-->设置-->下面自定义脚本（需要时间生效,最长24小时）
>
> [自定义脚本设置](<https://weinteckdev-admin.sharepoint.com/_layouts/15/online/TenantSettings.aspx>)



#### Webpart更新

同一个webpart重新打包上传，所有引用的页面会自动变，不需要删除再添加







#### 问题

Deployment failed.  Correlation ID: 0f07949e-c0e6-0000-33c4-1eb944d469ff

> 删除重新部署



gulp serve 无法访问

> 尝试将Serve.json的https设为false，v1.1才有问题



### Webpart for teams

#### 步骤

1、src下supportedHosts增加TeamsTab

2、打包部署后同步至teams

3、修改manifests.json，压缩zip

4、teams中上传



#### manifests.json

```json
{
  "$schema": "https://developer.microsoft.com/en-us/json-schemas/teams/v1.2/MicrosoftTeams.schema.json",
  "manifestVersion": "1.2",
    
    // 显示的应用名，随意？
  "packageName": "TeamsTabWebPart",
     
  // 随便生成一个，用于teams进行识别？
  "id": "98a1e964-bcdd-4e60-8406-8be3e0755070",
  "version": "0.1",
  "developer": {
    "name": "Parker Porcupine",
    "websiteUrl": "https://products.office.com/en-us/sharepoint/collaboration",
    "privacyUrl": "https://privacy.microsoft.com/en-us/privacystatement",
    "termsOfUseUrl": "https://www.microsoft.com/en-us/servicesagreement"
  },
    // 显示的应用名，随意？
  "name": {
    "short": "TeamsTabWebPart"
  },
    // 描述，随意，可根据spfx项目中的描述
  "description": {
    "short": "My awesome HelloWorld tab",
    "full": "My awesome HelloWorld tab which is brilliantly created using SPFx"
  },
      // 一起压缩的图标
  "icons": {
    "outline": "parker_outline.png",
    "color": "parker_color.png"
  },
  "accentColor": "#004578",
  "configurableTabs": [
    {
        // 其他不需要改，componentId的id为xxxwebpart.manifest.json中的id
      "configurationUrl": "https://{teamSiteDomain}{teamSitePath}/_layouts/15/TeamsLogon.aspx?SPFX=true&dest={teamSitePath}/_layouts/15/teamshostedapp.aspx%3FopenPropertyPane=true%26teams%26componentId={{componentId}}%26forceLocale={locale}",
      "canUpdateConfiguration": true,
      "scopes": [
        "team"
      ]
    }
  ],
  "validDomains": [
    "*.login.microsoftonline.com",
    "*.sharepoint.com",
    "*.sharepoint-df.com",
    "spoppe-a.akamaihd.net",
    "spoprod-a.akamaihd.net",
    "resourceseng.blob.core.windows.net",
    "msft.spoppe.com"
  ],
  "webApplicationInfo": {
    "resource": "https://{teamSiteDomain}",
    "id": "00000003-0000-0ff1-ce00-000000000000"
  }
}

```





#### 问题

解压失败???

> 用example的修改压缩，注意文件名！！！



### Extensions

#### 功能



- **Application Customizers**. Adds scripts to the page, and accesses well-known HTML element placeholders and extends them with custom renderings.

  > 对页面固有元素进行设置或者调整，嵌入js代码
  >
  > 这种类型不支持列表类型设置
  >
  > RegistrationId="101"
  >
  > RegistrationType="List"

- **Field Customizers**. Provides modified views to data for fields within a list.

  > 给列表显示字段进行处理

- **Command Sets**. Extends the SharePoint command surfaces to add new actions, and provides client-side code that you can use to implement behaviors

  > 给界面增加操作？



#### 开发

##### 环境

如果开发SP2019,会使用V1.4版本，V1.4版本有https问题



##### 位置

- 命令栏 (`location: ClientSideExtension.ListViewCommandSet.CommandBar`)
- 上下文菜单 (`location: ClientSideExtension.ListViewCommandSet.ContextMenu`)
- 命令栏和上下文菜单 (`location: ClientSideExtension.ListViewCommandSet`)



##### 说明



##### Field Customizer



##### ListView Command Set

onInit



onRenderCell



onDisposeCell



只能在SP环境进行预览





##### Page placeholders

通过this.context.placeholderProvider.tryCreateContent获取到placeholders元素对象



#### 调试

无法本地调试，但也不需要部署到应用程序目录就可调试

##### serve.json

- serveConfigurations无效，要在另一个obj中设置pageUrl

- https：V1.4需要设置为false



#### 打包



##### ClientSideInstance

[租户范围部署文档](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/extensions/basics/tenant-wide-deployment-extensions)



##### Element.xml

CustomAction中运行的列表RegistrationId

- 100为列表

- 101为文档库



如果要同时在列表和文档库生效，则需要两个CustomAction

```xml
<Elements xmlns="http://schemas.microsoft.com/sharepoint/">

    <CustomAction 
        Title="SPFxListViewCommandSet"
        RegistrationId="100"
        RegistrationType="List"
        Location="ClientSideExtension.ListViewCommandSet.CommandBar"
        ClientSideComponentId="5fc73e12-8085-4a4b-8743-f6d02ffe1240"
        ClientSideComponentProperties="{&quot;sampleTextOne&quot;:&quot;One item is selected in the list.&quot;, &quot;sampleTextTwo&quot;:&quot;This command is always visible.&quot;}">
    </CustomAction>

    <CustomAction 
        Title="SPFxListViewCommandSet"
        RegistrationId="101"
        RegistrationType="List"
        Location="ClientSideExtension.ListViewCommandSet.CommandBar"
        ClientSideComponentId="5fc73e12-8085-4a4b-8743-f6d02ffe1240"
        ClientSideComponentProperties="{&quot;sampleTextOne&quot;:&quot;One item is selected in the list.&quot;, &quot;sampleTextTwo&quot;:&quot;This command is always visible.&quot;}">
    </CustomAction>

</Elements>
```





##### package

###### SP2019

```bash
gulp bundle	--ship

gulp package-solution	--ship
```









#### 部署



Even though you would not require the solution to be installed on the site, you'd need to associate **ClientSideComponentId** to specific objects for the extension to be visible



部署方式和webpart一致，会自动应用到整个网站？



##### 扩展应用

[以代码的方式讲扩展应用到多个地方](https://www.sharepointnutsandbolts.com/2017/09/manage-tenant-scoped-spfx-extensions.html)





### 通用



#### antd编译类型错误

tsc版本问题，antd使用新的ts语法，SPFX编译工具使用低版本的tsc

- 删除```node_modules/@microsoft/rush-stack-compiler-x```下```node_modules```的```typescript```包，并且修改```package.json```的版本
- ```yarn.lock```、```package.lock```中修改```@microsoft/rush-stack-compiler-x```依赖的```typescript```版本，



#### antd运行错误

antd代码中使用了较新的方法，```Array.from```、```Array.includes```，在IE下运行时需添加polyfill

- 全量polyfill引入，```import "@babel/polyfill";```
- 按需polyfill引入，```import "core-js/es6/array";import "core-js/es7/array";```



#### polyfill

spfx打包时会自动附带上基础polyfill包的引用（从SP内置站点内容中请求）

- ```es6-collections```：WeakMap 、Map 、Set、WeakSet 
- ```whatwg-url```：URLSearchParams
- ```es6-promise```
- ```whatwg-fetch```



#### 调试

IE打开证书错误：```gulp trust-dev-cert```



#### 标识

feature id，product id 、component id、打包名均一样时则为新的webpart



#### 更新

在网站内容会提示可以更新？？



#### 调试

ctrl + F12可以打开自带的调试工具



#### 打包

##### webpack扩展

[扩展webpack](https://docs.microsoft.com/zh-cn/sharepoint/dev/spfx/toolchain/extending-webpack-in-build-pipeline)



##### 分析

[打包分析](https://docs.microsoft.com/zh-cn/sharepoint/dev/spfx/toolchain/optimize-builds-for-production)



##### 清理

会保留多个版本的js,如果不需要可以gulp clean清除



##### 问题

###### ES6编译问题

```js
// gulp文件增加
const gulp = require('gulp');
const merge = require('webpack-merge');
build.addSuppression(`Warning - [sass] The local CSS class 'ms-Grid' is not camelCase and will not be type-safe.`);

build.configureWebpack.setConfig({
  additionalConfiguration: function (config) {
    let newConfig = config;
    config.plugins.forEach((plugin, i) => {
      if (plugin.options && plugin.options.mangle) {
        config.plugins.splice(i, 1);
        newConfig = merge(config, {
          plugins: [
            new TerserPlugin()
          ]
        });
      }
    });

    return newConfig;
  }
});
```





#### 部署

##### 应用程序网站

每个web应用都有自己的应用程序网站



##### 创建App Catalog 网站集.

- In Central Administration, on the Apps page, in the App Management section, click Manage App Catalog.

- If no App Catalog exists for the farm, the Web Application page opens, so you can select a web application.

- On the Web Application page, select the web application for which you want to create a catalog.

- In the App Catalog Site section, select Create a new app catalog site, and then click OK.



##### 步骤

1、管理中心

2、Apps分类

3、管理app catalog

4、创建



线下版应用程序网站： http://192.168.20.47:8102/sites/AppCollection



##### 问题



添加app时报错The System Account cannot perform this action

> 账号问题，管理员不一定能添加app



webpart安装后，添加的时候无法找到

> 到其他站点，或者用旧webpart的安装方式进行安装后，再回到页面试试



#### 删除

删除app有两个阶段，网站内容删除后进入回收站删除、还要第二阶段回收站需要删除