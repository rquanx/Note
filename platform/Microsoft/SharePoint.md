### 总览

#### 文档

[微软Office开发文档](https://developer.microsoft.com/zh-CN/office/docs)



#### 工具

sharepoint manager tool



#### 文件上传

可在管理中心设置不允许上传的文件类型(根据扩展名)

### SharePoint

#### 学习记录

##### 概述

企业级 基于数据存储和协同办公信息化平台软件



##### 功能点

- 点赞
- 评论
- 调查问卷
- 空间使用

- 温度分析



#### 页面

考勤默认页面文字， 编辑页面->编辑属性->页面内容->编辑源...



#### Webpart

##### 开发

| Featurel       | 设置要部署的控件===》部署后网站集功能的Featurel？ |
| -------------- | ------------------------------------------------- |
| Package        |                                                   |
| webpart        |                                                   |
| Ascx           | 控件内容                                          |
| Cs             | 控件方法、属性                                    |
| *Elements.xml* | 包含项目中的功能定义文件用于部署Web部件的信息     |

 

| 方案类型           | 说明                        |
| ------------------ | --------------------------- |
| Sandbox   solution | 无法部署Farm only   webpart |
| Farm   solution    |                             |


##### 开发时问题

###### 提示InitializeControl不存在
右键ascx文件，run custom tool

##### 部署时问题

###### 对象ID重复

> 右键package打开设计器，右下角可修改solution ID  guid



###### feature has already installed

> 点击feature文件夹下的xxxfeature,右下属性选强制安装



###### step 'activate features' Failed to load receiver assembly

> 右键项目属性，签名，新建强名称密钥文件，随便写名字，密码随意



###### Could not load file or assembly  The system cannot find the file specified

> 确实少了dll



###### wsp包打包文件还原

- 新建一个同名的sharepoint项目，自带package和feature生成
- 将package复制到需要还原的项目中，feature为空不需要
- 项目总包含package,排除其他代码文件
- 重新包含其他代码文件
- webpart需在package设计页面中拉取
- 部署



###### 版本问题？ 部署后aspx中的aspx无效，要移动到layout下



###### webpart打包，在wsp中添加依赖的dll，选择package ==>高级==>添加





#### 开发框架

##### SharePointFrameWork

###### 文档

[官方文档](https://docs.microsoft.com/zh-cn/sharepoint/dev/spfx/set-up-your-development-environment)
[微软官网文档](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/sharepoint-framework-overview)
[微软官网文档](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/known-issues-and-common-questions )

###### 博客、文章

[陈希志博客](https://www.cnblogs.com/chenxizhang/category/967796.html)
[微软开发者论坛](https://social.msdn.microsoft.com/Forums/en-US/home
https://social.msdn.microsoft.com/Forums/en-US/c3180339-8111-4025-a174-46d87afc00c8/sharepoint-framework-in-onpremise-sp-2013?forum=sharepointdevelopment
https://social.msdn.microsoft.com/Forums/en-US/77c90214-a5c0-430a-b8c7-05483c76a9d8/sharepoint-framework?forum=sharepointadmin
https://rencore.com/blog/sharepoint-framework-webinar-qa-follow-part-1-sharepoint-framework/
https://github.com/SharePoint/sp-dev-fx-webparts)
[modern web stack](https://github.com/SharePoint/sp-dev-samples/tree/dev )





#### 操作、知识点

##### 查看站点存储

site setting --> (转到首要网站设置) --> 存储标准 --> file    不一定准



##### sharepoint文件批量下载、获取

在文件夹中输入网页地址能直接访问sharepoint文件夹



##### 隐藏用户表,用户信息表

http://192.168.20.40:8091/sites/rgciland/_catalogs/users/simple.aspx
/_catalogs/users/simple.aspx



##### 隐藏账号

everyone: 表示所有账号		默认隐藏？所以查找不出来，要实际查找点击一次才会出来
​	默认ID 13？



##### 日志

日志路径：C:\Program Files\Common Files\microsoft shared\Web Server Extensions\15\LOGS
ULSViewe-log工具	查看工具



##### 权限

通过组可对Item项设置权限

流程可以设置item权限



##### 强制重新登录

xxx/_layouts/closeConnection.aspx?loginasanotheruser=true

> 自动登录后自动跳转顶层站点？



https://team.cargill.com/sites/Metals_Supply_China_E-chop_Test/_layouts/15/closeConnection.aspx?loginasanotheruser=true&Source=https://team.cargill.com/sites/Metals_Supply_China_E-chop_Test/eChop

> 增加source参数指定跳转



##### 隐藏新建item页面的字段

list setting,在contenType中点击，进入List Content Type页面，点击字段，可以选择Hidden

##### 导出excel

sharepoint list export to excel   需要IE

> 导出数据到excel，进行备份
>
> 使用ie打开列表
>
> 导出下载query.iqy
>
> 使用excel打开query.iqy



##### sharepoint复制列表

> list setting保存模板，且包含数据
>
> 创建list,在app中查找



##### 网站集备份、还原

```bash
#  备份
Restore-SPSite -Identity "http://10.182.21.33/sites/attendance" -Path C:\Users\farmadmin\Desktop\site\attend.bak -Force  

# 还原
Backup-SPSite -Identity "https://portal.toyotsu-ea.com" -Path C:\backup\deb\site.bak
```



##### 导航隐藏

权限判断隐藏导航



```html
<Sharepoint:SPSecurityTrimmedControl ID="SPSecurityTrimmedControl2" runat="server" PermissionsString="ManageWeb">                           
          <script type="text/javascript">
             $('#suiteBarDelta').css('display', 'block'); 
          	 $("#s4-ribbonrow").css('display', 'block');
         </script>         
</Sharepoint:SPSecurityTrimmedControl>

```



##### 模板停用

​	site settingg --> solutions --> 停用



##### 爬虫搜索加工

网站设置-> 母版页和页面布局-> Display Templates -> 可以找到搜索时使用的模板和js，从而对搜索结果做一些处理



##### OWA

owa有对应的服务器、站点

> 通过获取到的css路径可以找到css，从而进行隐藏
>
> 编辑权限和读取权限的编辑按钮不同





##### 搜索

Kql

关键字查询，SharePoint根据文档名、内容进行了关键字提取，搜索时会根据搜索的关键词进行搜索，如果搜索的是非关键词则搜索不到

缺点：查询逻辑与常用的不同，关键词不明确，导致搜索不稳定,只支持前缀匹配: a*  , *a不行

 

| 普通关键字查询 |                                            |
| -------------- | ------------------------------------------ |
| 指定属性查询   | Filename:   123/ filename: "123"           |
| 双引号查询     | "123 456"和123 456，没有""会由于空格被拆分 |
| 逻辑组合       | (a) OR   (b) / (a) AND (b) /NOT            |
| 通配符查询     | a*                                         |

 

 

Fql

开发人员使用，默认不开放



#### 特性

##### 阈值

[说明](https://blog.csdn.net/shrenk/article/details/39217223)

###### 通过索引列避免

索引列：  可以通过索引列进行多数据操作，查询，但是结果返回值不能超过阈值
非索引列：只要数据量超过阈值就不能进行操作

筛选条件含有索引列后，只要通过索引列查询的最大数不超过阈值，可以添加其他非索引列的字段筛选
单个索引列筛选超过阈值时，可通过设置符合索引列组合筛选，只有一个索引列通过多次caml联合减少查询亦可
​	当两个非复合索引进行and查询时，先根据一个索引返回，再在返回的数据里进行另一个字段的筛选

###### 使用文件夹分割



##### 限制

###### 文件名符号限制



###### 文件名长度限制

url最长为260？



[阈值相关官方文档](https://support.office.com/en-us/article/manage-lists-and-libraries-with-many-items-for-sharepoint-2010-1f4985e4-6d67-4e0c-a473-ea17e7058585?ocmsassetID=HA010378155&redir=0&CorrelationId=9a4c067a-7dbd-4deb-8a02-69b73d0255d0&ui=en-US&rs=en-US&ad=US#_Toc268174141)

[How to overcome SharePoint 5000 item limit threshold](https://sharepointmaven.com/how-to-overcome-sharepoint-5000-item-limit-threshold/)

  [sharepoint 阈值查询](https://social.msdn.microsoft.com/Forums/sharepoint/en-US/db54d1c7-e19b-414d-84b9-d6c22ea3b676/how-can-i-overcome-limitations-of-list-view-threshold-when-querying-sharepoint-2013-online)

[sharepoint阈值说明](https://www.abelsolutions.com/working-with-list-view-thresholds-in-sharepoint/)

sql查询超过5000条的时候会锁定整张表  

#### 开发



##### 交互模型

Sharepoint  csom,jsom,update后会自动更新对象内容



##### 用户

用户组和用户的lookupid应该是公用一个计数，不会重叠

##### List

###### 权限

不同用户查询列表时结果不同,权限问题



###### 文档库

文档库文件fileref字段是包含当前站点的，除顶层站点外

###### Item

字段含有内部名称和显示名称

字段值由不同类型，查阅项，url，text，number，bool.....

直接浏览器输出sharepointl 列表项数据可以看到数据对应的类型 如： SP.FieldUser...

lookup值如果当文本读取的话是id+姓名；可以这样检索到



###### 版本控制

连续更新数据时，由于隐藏的xxxx,会认为时旧版本，产生版本冲突，不能更新
​	解决方法，重新获取context

##### Designer

通过站点连接进入可进入对应的站点文档库中操作

##### Webpart

C#组件

webpart属性设置可以设置参数

wsp包部署出问题    打开浏览器管理，进入系统设置  ---  管理场解决方案  --- 处理  即可

##### Jsom

[SharePoint 模型对比](https://docs.microsoft.com/zh-cn/sharepoint/dev/general-development/choose-the-right-api-set-in-sharepoint#client-object-models-for-managed-code)

###### 前置

contextinfo只是认证信息

使用SP.UserProfiles需加载_layouts/15/SP.UserProfiles.js



sp.js和sp.runtime.js, 其位于_layouts/15/###.js下

使用sharepoint jsom api所需文件
sp.js
sp.runtime.js
microsoftajax.js



```html

```

```javascript
// 等待加载函数   SP.SOD.executeFunc()   在init.js
```
###### 版本冲突

更新前获取getbyid可以避免版本冲突
	但是先getbycaml,再update不行

updateListItemByCaml，由于共用上下文信息所以可以不受版本冲突影响?


###### 参数相关

单个文件上传不能超过2M

###### 相关文章

[jsom操作示例](http://www.thesharepointguide.com/sharepoint-javascript/#userperms)

[读取列表权限](https://sharepoint.stackexchange.com/questions/129309/how-to-get-permission-of-a-sharepoint-list-for-a-user-using-rest-api/129311#129311)

[权限枚举](https://docs.microsoft.com/en-us/previous-versions/office/developer/sharepoint-2010/ee556747(v=office.14))

castTo(...)   service.Me  sharepointService.js  490行，获取字段所有选项

[查阅项更新](https://social.msdn.microsoft.com/Forums/en-US/7e7f359b-2e8d-44d2-8cb3-816852d4a06c/sharepoint-update-lookup-column-jsom?forum=sharepointdevelopment)

[update  多个lookupvalue](https://stackoverflow.com/questions/22694749/sharepoint-2013-multivalue-lookup-field-with-javascript)

[微软官方jsom操作](https://docs.microsoft.com/en-us/sharepoint/dev/sp-add-ins/complete-basic-operations-using-javascript-library-code-in-sharepoint#create-read-update-and-delete-files)

[文档库操作1](https://sharepoint.stackexchange.com/questions/157769/adding-a-new-item-to-a-document-library-using-jsom)

[文档库操作2](https://stackoverflow.com/questions/29699830/get-file-name-from-document-library
http://ramdotnetdeveloper.blogspot.com/2017/07/to-get-file-and-folder-from-document.html)

[How to get sharepoint file from document library if I know file url (JSOM)?](https://sharepoint.stackexchange.com/questions/209170/how-to-get-sharepoint-file-from-document-library-if-i-know-file-url-jsom)

[Uploading file to document library using JSOM](https://sharepoint.stackexchange.com/questions/213789/uploading-file-to-document-library-using-jsom)

[微软jsom含有文件操作](https://docs.microsoft.com/zh-cn/sharepoint/dev/sp-add-ins/complete-basic-operations-using-javascript-library-code-in-sharepoint#create-read-update-and-delete-files)

[Using JavaScript or JQuery and JSOM in SharePoint](http://www.thesharepointguide.com/sharepoint-javascript/#querying-list)

[Working with the ECMAScript Client Object Model (JSOM) in SharePoint 2010](https://docs.microsoft.com/de-de/previous-versions/office/developer/sharepoint-2010/hh372944(v=office.14))

[Top 51 JSOM SharePoint Examples ](https://www.sharepointsky.com/jsom-sharepoint/)

[SharePoint Online: JSOM Examples](http://www.migee.com/2016/03/20/sharepoint-online-jsom-examples/#SPWebPerms)

###### 错误信息

mException from HRESULT: 0x80131904，有以下可能	

- caml中值问题       例lookupid使用了字符串



###### 示例

```javascript
// 读取文档库
//以对象形式读取所有属性,返回{xx:xx,xx:xx}
item.get_objectData()
id.get_methodReturnObjects()
i.$m_dict.xxxxx

// get_fieldValues()  获取所有属性
```



##### Rest api

###### 主要事项

rest api 更新时字段内容不能含有"\\"  转义字符

Rest 过滤 filter=date ge datetime'xxxx'

##### 知识点

###### 复制/移动
move + copy
1、可选所有的站点：搜索所有的站点（子站点下的子站点都可选，拍平）
2、可选站点下所有文档库：搜索所有文档库
3、进入文档库后可创建文件夹	必要
4、move/copy 支持批量操作：CreateCopyJobs api	必要
5、目标路径面包屑导航	必要
6、文件夹可move/copy：紧复制文件夹	必要
7、进度查看：GetCopyJobProgress api
8、oneDrive

###### CreateCopyJobs

[CreateCopyJobs](https://gist.github.com/zplume/21248c3a8a5f840a366722442cf9ee97)


###### RenderListDataAsStream
RenderListDataAsStream 使用caml进行查询
```js
fetch(
`http://eip.carsgen.com/Management/InfoTechnal/_api/web/GetList(@listUrl)/RenderListDataAsStream?@listUrl='/Management/InfoTechnal/KnowledgeLibrary'`,
{
method: "Post",
headers: {
accept: "application/json;odata=nometadata",
"content-type": "application/json;odata=nometadata"
},
body: JSON.stringify({
parameters: {
ViewXml: `<View Scope='RecursiveAll' ><Query><Where><Contains><FieldRef Name='FileLeafRef' /><Value Type='Text' >16Z</Value></Contains></Where></Query><RowLimit>1</RowLimit></View>`
}
})
}
);


// pnp使用
sp.web.lists.getByTitle("信息技术部文档库").renderListDataAsStream({
ViewXml: `<View Scope='RecursiveAll' ><Query><Where><Contains><FieldRef Name='FileLeafRef' /><Value Type='Text' >16Z</Value></Contains></Where></Query><RowLimit>1</RowLimit></View>`
});
```

##### 版本冲突

rest不会有版本冲突？
	第一次测试：无

###### 参数相关

REST最大上传文件2G

###### 文章

[rest api odata](https://docs.microsoft.com/zh-cn/previous-versions/dynamicscrm-2015/developers-guide/gg490659(v%3dcrm.7))

 https://blog.csdn.net/zhoulu001/article/details/53189085

https://www.cnblogs.com/fengzheng/p/3149717.html

http://www.cnblogs.com/wolf-sun/p/4603199.html  

[rest api说明](https://docs.microsoft.com/en-us/sharepoint/dev/sp-add-ins/working-with-folders-and-files-with-rest)

[微软rest api odata查询](https://docs.microsoft.com/en-us/sharepoint/dev/sp-add-ins/use-odata-query-operations-in-sharepoint-rest-requests
https://blog.csdn.net/abrahamcheng/article/details/12612455)

[rest上传文件 ](https://docs.microsoft.com/en-us/sharepoint/dev/sp-add-ins/upload-a-file-by-using-the-rest-api-and-jquery)

[rest api 更新文档库的列表项会不同](http://www.cs.yale.edu/homes/aspnes/classes/223/notes.html)

[How to Check User Permission in SharePoint 2013 Using REST API](https://www.c-sharpcorner.com/UploadFile/sagarp/how-to-check-user-permission-in-sharepoint-2013-using-rest-a/)

###### 库

[pnpjs](https://github.com/pnp/pnpjs)
[pnpjs io](https://pnp.github.io/pnpjs/)	

> pnp.js要在线下版本的sp上运行，且在node.js运行时，由于原生的是支持线上版sp的，需要使用sp-pnp-node来创建认证信息

##### Csom

###### UpdateItem

更新前的设置操作必须连续

###### 批量操作

csom可以批量修改,并且跨表修改也可以
当只修改一个表时，在update时就会马上更新，
但是马上去修改另一个表的话，执行完update()并不会马上生效
最后调用exectquery()可以确保数据更新

##### Caml

###### 排序

查询条件中每个字段按照排列的顺序依次为首要查询条件、次要查询条件、第三查询条件

###### 嵌套

嵌套层数不能超过160！===> 最多2^160的条件

###### In条件

in条件内部超过500不行 	   in可以查lookup

###### 时间查询

注意：使用SPQuery查询时间，默认查询会忽略 时分秒，只检查日期，如果要检查时间，则必须添加 IncludeTimeValue='TRUE'

[caml datetime处理，搜索对比](http://www.cnblogs.com/qijiage/p/4059462.html)



###### 查阅项数组

对于多选查阅项和多选用户也应使用Eq操作符

查阅项可以用in操作判断，查阅项数组用in亦可



###### RowLimit数量

rowlimit 返回的记录条数，默认为100，如果不需要限制，将值设为0

###### 范围
Scope
> Recursive:遍历所有文档 RecursiveAll:遍历所有文档和文件夹 


###### 指定文件夹

​```c#
query.Folder = docLib.RootFolder.SubFolders["system"];
```

​```javascript
camlQuery.set_folderServerRelativeUrl(folderPath) // "/site/list/folder"   需包含站点
```

###### 字段

FSObjType
> 0:文档 1：文件夹


###### 文章

[列表查询中的阈值限制](http://www.myexception.org/sharepoint/1905232.html)

[caml groupby](https://piyushksingh.com/2016/11/21/retrieve-grouped-listitems-sharepoint/)

[joins,列表多表联合查询](https://blog.csdn.net/linyustar/article/details/28232229)

[rest api文档库文件上传，下载，拷贝，剪切，删除文件，创建文件夹，修改文件夹属性，删除文件夹，获取文档列表](https://www.cnblogs.com/dmyao/p/7069944.html)

[camljs archive](https://archive.codeplex.com/?p=camljs)

[camljs github](https://github.com/andrei-markeev/camljs)

[camljs console](https://www.crx4chrome.com/crx/5002/)

[camlsql-js github](https://github.com/dlid/camlsql-js)

[caml C# SPQuery对象](https://archive.codeplex.com/?p=camldotnet)

[caml view子属性](https://www.cnblogs.com/erucy/p/4439016.html)

[查询-1](https://www.cnblogs.com/erucy/p/4296940.html)

[查询-2](https://www.cnblogs.com/erucy/p/4439016.html  )

[查询](https://www.cnblogs.com/jaxu/archive/2009/03/23/1419717.html)

[caml查询 Sharepoint文档的CAML分页及相关筛选记录](https://www.cnblogs.com/poissonnotes/p/3494439.html)

[caml一些使用，关键词](https://www.cnblogs.com/carysun/archive/2011/01/12/moss-caml.html)

[SharePoint服务器端对象模型 之 使用CAML进行数据查询](https://www.cnblogs.com/liyuxin/p/5575950.html)

[官方文档](https://docs.microsoft.com/zh-CN/sharepoint/dev/schema/collaborative-application-markup-language-caml-schemas)

###### 阈值查询

 caml查询第一个条件必须筛选到阈值以下(复合索引未知)

caml设置路径后可以RecursiveAll和Recursive，在指定路径下进行
时间索引可用来筛选

ContentType可以设置索引，区分文件夹
filedirref不能加索引，也不能作索引进行查询

In可以用于索引筛选
lookup value不能被索引到  



###### 索引

索引设置后，caml查询时可能对字段类型有一致要求





##### 分页

[分页](https://code.msdn.microsoft.com/SharePoint-JSOM-list-5104ca92)

下一页的pageinfo可以通过collListItem.get_listItemCollectionPosition().get_pagingInfo()直接获取

###### 排序

sharepoint分页排序与不排序只差了查询条件和在pageinfo中的排序字段信息

如果有多个排序则继续按相应的格式进行拼接

###### 示例

```javascript
var nextPageInfo = "Paged=TRUE&p_ID=218"
var prevPageInfo = "PagedPrev=TRUE&Paged=TRUE&p_ID=208"
// 排序继续添加&p_field=value
```

```c#
var clientContext.Load(listItems,items => items.Include(item => item.Id), items => items.ListItemCollectionPosition);
var pos =  spItems.get_listItemCollectionPosition()	
    // 可以知道有没有下一页,为null则没有下一页了
    
// 取GUID
SPList list = web.Lists["test"];
Guid id = list.ID;
```

###### 翻页信息

collListItem.get_listItemCollectionPosition() 

​	总是返回往下翻页的翻页信息，但是当是往上翻页时，要取15条，但只有14条时，翻页信息会为空



sharepoint分页，规避最后一条删除，规避往上翻页删除最后一条

> 会为空



##### 插件

[sharepoint Dialog](https://docs.microsoft.com/en-us/previous-versions/office/developer/sharepoint-2010/ff410058(v=office.14))



#### 杂

##### 博客

[sharepoint blog](https://piyushksingh.com/category/sharepoint-online/)

[sharepoint 博客](http://blog.51cto.com/joycode)



##### 文章

[列表权限设置只控制自己创建的](https://sharepointmaven.com/how-to-enable-item-level-permissions-in-sharepoint/)

##### 论坛

[论坛sharepoint板块](https://sharepoint.stackexchange.com/)

#### 问题

##### 启动流程超时

流程操作超时： 服务器流程服务问题



##### 错误信息显示，Debug模式

![9f1ed5f7040cfb2f514787bc096ca86](../Note.assets/9f1ed5f7040cfb2f514787bc096ca86.png)



##### 搜索结果预览的时候遮罩层不隐藏

Nintex自带的代码产生的遮罩层，可能有Bug导致不隐藏



##### AD组用户变更后 SharePoint没有及时生效

1. User Profile Service      Full sync
2. CA- > Service applications      -> user profile Service -> start profile sync(under sync) ->      start full sync
3. <https://sergeluca.wordpress.com/2013/07/06/sharepoint-2013-use-ag-groups-yes-butdont-forget-the-security-token-caching-logontokencacheexpirationwindow-and-windowstokenlifetime/
4. <https://sharepoint.stackexchange.com/questions/76313/users-added-to-ad-group-not-granted-access-in-sharepoint>



##### 网站使用率报告问题

1. <https://social.technet.microsoft.com/Forums/en-US/1b42b517-79cc-43b9-b6f0-2e4639461cb1/empty-usage-data-in-sharepoint-2013>



##### 清除登陆Token（解决AD组用户变化及时更新问题）

clear-spdistributedcacheitem -containerType DistributedLogonTokenCache



##### Sharepoint designeder 连不上服务器，提示xxx

代理会影响designeder连接服务器



##### 流程删除

先删除item项，才能删work flow task数据，否则会自动产生新数据



##### Sp-rest-proxy

请求失败、查看返回的html，有可能是账号、密码出错



#### Workflow

启动Workflows can use app permissions   active  服务才能让管理员启动流程



流程状态

在item项中选 …  ,选择workflow,  可以进入流程信息界面，查看流程状态

未开始、已完成、挂起

流程详细界面

在流程状态界面选择对应的流程，进入对应的详细信息界面，可以查看到异常的提示信息

流程终止

在流程详细信息界面，选择stop  workflow

启动

流程状态界面，选择流程，进入流程启动界面，点击启动