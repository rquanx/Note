#### 字段设置

设置自增 

> 字段修改 --> 标识规范 --> 是标识（是）



设置索引

> 字段右键索引，添加
>
> 索引名全局唯一



#### 备份

**将数据导出成sql**

右键任务--> 生成脚本-->选中数据库/表-->设置中选中架构/数据

[数据库导出、导入，通过sql](https://blog.csdn.net/weicoliang/article/details/80324346)



#### 导入

**导入SQL文件**

文件内容过大时：```sqlcmd -S myServer\instanceName -i C:\myScript.sql```

> 待验证



#### 语法知识

关键字可以用[]  [Delete]



##### 修改表名/列名

```sql
-- 列表改名
EXEC sp_rename 'oldTableName', 'newTableName';

-- 表xxx字段 x to y
EXEC SP_RENAME 'table.column', 'newColumnName', 'COLUMN';

```



##### 创建表

```sql
-- 创建CRType表
CREATE TABLE CRType (
	-- int 类型， not null 非空  identity(1,1) 从1开始自增1  primary key 主键
	ID int not null identity(1,1) primary key,
	TypeName nvarchar(255),

	-- null 可以为空	unique  唯一约束  bit字节（0/1）
	CostImpact bit null,
	"Delete" bit null,
	-- foreign key(columnName) references targetTable(targetColumn) 外键
		CRTypeId int foreign key(CRTypeId) references CRType(ID),
)
```


##### 增加表字段，修改字段

```sql
-- 表Stations增加字段LeadPlants，引用LeadPlants的ID字段
ALTER TABLE Stations ADD  LeadPlants int foreign key(LeadPlants) references LeadPlants(ID);
```



##### JSON

**模式**

- 宽松模式：属性不存在返回`null`

- 严格模式：属性不存在异常



**json_value**

读取json字符串中的属性值，不存在属性返回`null`，只能读取json基础值

```sql
select json_value(Column,'$.prop') as value from table
```



只能不能用于text类型字段，可用于nvarchar



**json_modify**

修改json对象属性，对于宽松模式下不存在属性会尝试进行添加，设置为null会删除属性

```sql
-- 更新单个属性
update  table set column = JSON_MODIFY(column,'$.a','123') where ID  = 1;

-- 更新多个属性 递归叠加
update  table set column = JSON_MODIFY(	JSON_MODIFY(column,'$.b','123'),'$.a','123') where ID  = 1;
```



**JSON_QUERY**

读取json中的对象或数组，无法读取基本值







#### 函数

##### datediff

```sql
- 计算当前事件是一小时内的
datediff(hh,DateTime,now()) <= 1

- 字段说明
DATEDIFF(datepart,startdate,enddate)
```



##### STUFF 

STUFF ( character_expression , start , length , replaceWith_expression )

> character_expression中，将从start开始的length长度的的字符串替换成replaceWith_expression



##### FOR xml path

> 将select 的结果 输出xml格式的结果
>
> FOR xml path     ==> ```<row><field>v1</field></row> <row><field>v2</field></row>```
>
> FOR xml path('')   ==> ```<field>v1</field><field>v2</field>```
>
> FOR xml path('table') ==> ```<table><field>v1</field></table> <table><field>v2</field></table>```



##### STUFF + XML Path

```sql
SELECT ',' + [value] 
FROM temp t 
WHERE t.id = temp.id 
-- 得到 ,v1 ; ,v2  两行数据


SELECT ',' + [value] 
FROM temp t 
WHERE t.id = temp.id 
FOR xml path('')
-- SELECT ',' + [value]  == field为空,去除field的xml，同时FOR xml path('') row也为空,最终得到,v1,v2

stuff((
SELECT ',' + [value] 
FROM temp t 
WHERE t.id = temp.id 
FOR xml path('')) , 1 , 1 , '')
-- 将,v1,v2第1个长度为1的内容替换成''
```

##### string_agg

```sql
select string_agg(field,',') from table where xxx group by xxx 
```





#### 执行追踪

**Sql Profiler**
追踪数据库执行的操作，可以看到执行的语句、用户、时间、资源等

使用：工具->profiler

需要较高的权限才能追踪




#### 存储过程

**使用**： exec name



##### 参数化

如果存储过程中使用字符串拼接sql的话，上面的参数化将不会起作用，单引号必须经过判断并替换，在数据库中，用2个单引号代表1个实际的单引号。所以，如果是拼接sql字符串的方式，需要用Replace(@para,'''', '''''')来替换一下，将1个单引号替换为2个就没有问题了。

使用这种参数化查询的办法，防止SQL注入的任务就交给ADO.NET了, 如果在项目中统一规定必须使用参数化查询，就不用担心因个别程序员的疏忽导致的SQL注入漏洞了。



#### 小知识



**内存占用高**

数据库占用内存偏高是正常的？是sql 提前占用的缓存空间



**时间存储问题**

数据库时间存储方式：Datetime、时间戳、整数

不同类型的影响：直观性影响，存储空间影响

类型范围

> DateTime ：1000-01-01 00:00:00 ~ 9999-12-31 23:59:59
> Timestamp： 1970-01-01 00:00:01 ~ 2037-12-31 23:59:59
>
> Sql server中datetime就是timestamp?

问题点：

- 1、timestamp 依赖于Mysql的时区配置，存进去之后，手动去数据库改这个时间也没用，而且只能到2038年。
- 2、datetime 不依赖Mysql的时区配置，但是存储的是一个时间，所以实际上你不知道到底表示的是哪个时区下的。
- 3、int只能到2038年???
- 4、bigint存的是时间戳，是绝对时间，而且搜索快。至于缺点其实可以忽略，一般你也不会去数据库看这个字段的时间



**类型问题**

时间类型存储null时会变成 0001-01-01T00:00:00/1970-01-01 00:00:01

> C#接收时，DateTime无法为null，所以变成初始值
>
> 代码中使用string存储



**字符串自动补全空格问题**

字段类型为char会自动补全



**快捷键**

f5进行语句使用



**操作**

```sql
 两个表先排序后合并    加一个别名  加多一层
select * from (
	SELECT TOP 1 [TemplateID]	FROM [dbo].[TaskHistory] 
    	where templateID='T2018BU000001' and Status=0 order by ID desc) t1
	UNION ALL
	SELECT * from (
  		SELECT TOP 1 [TemplateID]	FROM [dbo].[TaskHistory] 
        	where templateID='T2018BU000001' and Status=0 order by ID desc) t2

select (
	ISNULL(
        	(
             	(select IndexName from SalesIndexInfo 
                 	where DataKey='T201900000001' and RowNum = a.ParentID   
                 	and  ParentID=0 ) + '_'),'')
				+  (IndexName)
		) as 'IndexName' ,FormKey	from SalesIndexInfo as a 
						where DataKey='T201900000001'	and IsMasschange=@IsMasschange
```



#### 角色权限

##### 角色

| 角色名称          | 功能描述                                                     |
| ----------------- | ------------------------------------------------------------ |
| **bulkadmin**     | 可以运行 bulk insert 语句  bulk insert 详细 http://blog.csdn.net/jackmacro/article/details/5959321 |
| **dbcreator**     | 创建，修改，删除，还原任何数据库                             |
| **diskadmin**     | 管理磁盘文件                                                 |
| **processadmin**  | 可以终止在数据库引擎实例中运行的程序                         |
| **securityadmin** | 可以管理登录名及其属性，具有grant,deny,和revoke服务器和数据库级别权限，还可以重置sql server 登录名的密码 |
| **serveradmin**   | 可以更改服务器范围的配置选项和关闭服务器                     |
| **setupadmin**    | 可以添加和删除链接服务器，并对可以执行某些系统执行存储过程(如，sp_serveroption) |
| **sysadmin**      | 在sql server中进行任何活动，该觉得的权限跨越所有其他固定服务器角色，默认情况下，windows builtin\admin组(本地管理员组)的所有成员都是sysadmin 固定服务器角色的成员 |



##### 权限

deny权限优先级更高，例：设置了owner和denywriter，仍然是不可写的

| 角色名称              | 功能描述                                                     |
| --------------------- | ------------------------------------------------------------ |
| **db_owner**          | 可以执行数据库中技术所有动作的用户                           |
| **db_accessadmin**    | 可以添加，删除用户的用户                                     |
| **db_datareader**     | 可以查看所有数据库中用户表内数据的用户                       |
| **db_datawrite**      | 可以添加，修改，删除所有数据库用户表内数据的用户             |
| **db_ddladmin**       | 可以在数据库中执行ddl操作的用户，DDL（Data Definition Language）数据表的创建以及管理 |
| **db_securityadmin**  | 可以管理数据库中与安全权限有关所有动作的用户                 |
| **db_backoperator**   | 可以备份数据库的用户(可以发布dbcc和checkPoint语句，这两个语句一般在备份前使用 |
| **db_denydatareader** | 不能看到数据库中任何数据的用户                               |
| **db_denydatawrite**  | 不能修改数据库中任何数据的用户                               |



#### 博客

[sql防注入](https://www.zhihu.com/question/22953267 )



#### 性能优化

##### 批量插入

SqlBulkCopy，性能是普通插入的几百倍
> 原理是采用了SQL Server的BCP协议进行数据的批量复制



##### 执行计划

Sql执行计划：查看开销



##### 其他

减少不必要的join

减少不必要的子查询

With as提取子查询？

##### 常见缓慢原因

大数据排序

视图没有索引，对视图进行排序会慢



#### 问题



##### 账号启用问题

[sa用户启用问题，sql启动sa后仍报错，需要修改的登录模式，重启sql服务](https://blog.csdn.net/ytm15732625529/article/details/72630050)

> 账号未启用



##### favtory库

存储过程设置参数，要设置空值DBNull.Value;



#### 元数据操作



##### 表操作

```sql
if Exists(
    select top 1 * 
    from sysObjects 
    where Id=OBJECT_ID('[TableName]') and xtype='U') 
-- 检查数据库表是否存在

select * from sysObjects where  xtype='U'
-- 查询所有的表？

-- sysObjects系统对象表（存储所有表？）
```



**表PROPERTIES**

```sql
IF NOT EXISTS (
  SELECT NULL
  FROM SYS.EXTENDED_PROPERTIES
  WHERE
  [major_id] = OBJECT_ID('[TableName]')
  AND [name] = N'[PROPERTIESName]'
  AND [minor_id] = 0
)
-- 检查表是否存在属性

SELECT *
  FROM SYS.EXTENDED_PROPERTIES
  WHERE
  [major_id] = OBJECT_ID('TableName')
  AND [minor_id] = 0
-- 查询表所有的属性

-- SYS.EXTENDED_PROPERTIES系统属性表？

```



```sql
-- 存储过程
exec sys.sp_addextendedproperty '[PROPERTIESName]','[描述信息]','SCHEMA','dbo','table','[TableName]';
-- 向表增加特定的属性字段，内容为描述信息

exec sys.sp_updateextendedproperty '[PROPERTIESName]','[描述信息]','SCHEMA','dbo','table','[TableName]';
-- 更新表特定的属性字段，内容为描述信息

```









##### 列操作



```sql
IF EXISTS ( 
    SELECT 1 
    FROM SYSOBJECTS T1 
    INNER JOIN SYSCOLUMNS T2 
    ON T1.ID=T2.ID    
  	WHERE T1.NAME='[TableName]' AND T2.NAME='[ColumnName]')
-- 检查表是否存在特定列

SELECT 1 
FROM SYSOBJECTS T1 
INNER JOIN SYSCOLUMNS T2 
ON T1.ID=T2.ID    
WHERE T1.NAME='[TableName]'
-- 查询表所有的列

-- SYSCOLUMNS系统列表？

```



**列PROPERTIES**

```sql
IF NOT EXISTS (
  SELECT NULL
  FROM SYS.EXTENDED_PROPERTIES
  WHERE
  [major_id] = OBJECT_ID('[TableName]')
  AND [name] = N'[PROPERTIESName]'
  AND [minor_id] = (
      SELECT [column_id]
      FROM SYS.COLUMNS
      WHERE [name] = '[ColumnName]'
      AND [object_id] = OBJECT_ID('[TableName]')
  )
)
-- 检查特定表的特定列是否存在属性

SELECT [name] FROM SYS.COLUMNS WHERE
       [object_id] = OBJECT_ID('[TableName]')
-- 获取特定表的所有列

-- SYS.COLUMNS所有列的表？
```



```sql
-- 存储过程

 exec sys.sp_addextendedproperty '[PROPERTIESName]','[描述信息]','SCHEMA',N'dbo','TABLE','[TableName]','COLUMN','[ColumnName]';
-- 向特定表的特定列增加属性

 exec sys.sp_updateextendedproperty '[PROPERTIESName]','[描述信息]','SCHEMA','dbo','TABLE','[TableName]','COLUMN','[ColumnName]';

```



**查询表字段、类型**

```sql
select  t2.TABLE_NAME,t2.COLUMN_NAME,t2.data_type,t2.character_maximum_length,
* FROM information_schema.columns t2
where table_name='tableName'
```





#### 使用

##### 大文件SQL执行

大量SQL执行



```bash
sqlcmd -S serverName -i xxx.sql

sqlcmd -S 192.168.30.235 -U  sa -P 123456789 -i ./1.sql

# 执行大.sql文件
```





##### 字符串拼接

**2017**

string_agg



**其他**

STUFF ( character_expression , start , length , replaceWith_expression )

FOR xml path



##### 获取最新插入的ID

```sql
select id = @@IDENTITY  -- 获取最新的ID,刚插入
```





##### join第一条

```sql
-- 1
SELECT
  Orders.OrderNumber,
  LineItems.Quantity,
  LineItems.Description
FROM
  Orders
  JOIN LineItems ON LineItems.LineItemGUID = (
    SELECT
      TOP 1 LineItemGUID
    FROM
      LineItems
    WHERE
      OrderID = Orders.OrderID
  )

-- 2
select * from users join (
    select * from widgets
    where id in (
        select max(id) from widgets group by user_id
    )
) as most_recent_user_widget
on users.id = most_recent_user_widget.user_id
```



##### 刷数据

Update a set a.c1 = b.c2 from a,b where a.ID = b.ID

> 将a表的c1字段值更新为b表的c2值

