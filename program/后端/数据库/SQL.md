## SQL

### Quick

结构化查询语言，是一种ANSI的标志计算机语言

> ANSI：美国国家标准化组织

 

#### 分类

DBMS：数据库管理系统

RDBMS：关系型数据库



**现代的 SQL 服务器构建在 RDBMS 之上。**

 

#### 书写

##### 大小写

对大小写不敏感

 

##### 引号

对于文本值，要加上引号

数值则不需要



#### 语法分类

##### DQL

> 数据查询语言



Select + from + where





##### DML

> Data Manipulation Language 数据操纵语言

update、delete、insert 



##### DDL

> Data Definition Language数据定义语言

​    Create database  创建数据库

​    Alter database   修改数据库

​    create table     创建表

​    alter  table     修改表

​    Drop table     删除表

​    Create index     创建索引

​    Drop index  删除索引 



##### DCL

> 数据控制语言

GRANT、ROLLBACK、COMMIT



### 基本语法

#### 查询

##### Select

```sql
SELECT 列名称 FROM 表名称       取具体列数据
SELECT * FROM 表名称                  取所有列
SELECT C1,C2 FROM 表名称             取指定列数据
SELECT DISTINCT 列名称 FROM 表名称	去重
```



##### Where

```sql
SELECT 列名称 FROM 表名称 WHERE column 运算符 value
```



#### 操纵

##### Insert

```sql
insert into table values (v1,v2,v3,v4)
insert into table (column1,column2) values (value1,value2)
```



##### Update

```sql
update table set column2 = v1,column2 = v2 where xxx
```



##### delete

```sql
DELETE FROM 表名称 WHERE 列名称 = 值	删除指定行
DELETE FROM table_name		删除所有
DELETE * FROM table_name	删除所有	//不是通用的	
```



#### 定义

##### 创建数据库

```sql
CREATE DATABASE my_db
```



##### 创建表

```sql
CREATE TABLE Persons
(
	Id_P int,
	LastName varchar(255),
	FirstName varchar(255),
	Address varchar(255),
	City varchar(255)
)
```



##### 表约束

```sql
NOT NULL  字段值不能为空
UNIQUE	唯一标识,可以有多个
PRIMARY KEY 主键，唯一标识，只能有一个
FOREIGN KEY 关联其他表的PRIMARY KEY
CHECK 约束用于限制列中的值的范围
DEFAULT		默认约束,设置默认值
AUTO_INCREMENT	自增主键


CREATE TABLE Persons
(
	Id_P int NOT NULL AUTO_INCREMENT,
    
	LastName varchar(255),
	FirstName varchar(255),
	Address varchar(255),
    
	City varchar(255) DEFAULT 'Sandnes',
    
    UNIQUE (Id_P),
    
    PRIMARY KEY (Id_P),
    
    FOREIGN KEY (Id_P) REFERENCES Persons(Id_P) 
    // Id_P int FOREIGN KEY REFERENCES Persons(Id_P)，
    
    CHECK (Id_P>0)
)
```



##### 删除库

```sql
DROP DATABASE 数据库名称
```





##### 删除表

```sql
DROP TABLE 表名称
```



##### 删除索引

```sql
DROP INDEX index_name ON table_name
```



##### 编辑表

```sql
添加列
ALTER TABLE table_name
ADD column_name datatype

删除列
ALTER TABLE table_name 
DROP COLUMN column_name

修改列
ALTER TABLE table_name
ALTER COLUMN column_name datatype
```







#### 关键词

##### order by

```sql
select * from table order by a,b,c,d ....
对a字段排序，然后在a基础上对重复的行以b排序....

select * from table order by a desc,b desc,c desc,d ....
desc 倒序
```



##### Top

不是所有数据库都支持top

```sql
Sql server
SELECT TOP number|percent column_name(s) FROM table_name  前n条或者前n%条

Mysql
SELECT column_name(s)  FROM table_name LIMIT number     
limit number == 前n条
limit pageNum,pagesZize == 分页

oracle
SELECT column_name(s) FROM table_name WHERE ROWNUM <= number
```



##### Like/Not Like

搜索

```sql
SELECT column_name(s)
FROM table_name
WHERE column_name LIKE pattern
```



##### 通配符

必须搭配Like进行使用

**%**

n个字符

> %a   a结尾
>
> a%  a开始
>
> %a%   包含a



**_**

单个字符

>  _abc   匹配 dabc   不匹配ddabc



**[字符列]** 

匹配字符列内任何一个字符



**[^字符列]/[!字符列]**

非字符列内的字符



##### In

选出在值列表包含的

 ```sql
SELECT column_name(s)

FROM table_name

WHERE column_name IN (value1,value2,...)
 ```



##### Between

选出介于a和b间的,可以是数组，文本，日期



##### Not Between a and b



##### as

临时创建一个自定义名字的临时表来进行操作



**表别名**

```sql
SELECT column_name(s) FROM table_name AS alias_name
```



**列别名**

```sql
SELECT column_name AS alias_name FROM table_name
等价于将列表重命名，返回
```





##### Inner join

查询多个表间互相匹配的数据，两表同时有才会输出

匹配上假设两表间是1对多关系，结果会查询出多条



每一条左表跟右表中匹配都产生一行，匹配多个则多行



##### Left join

输出左表全部数据与右表匹配的数据合并，如果不匹配仍然显示但是为null



左join,即使左表中有在右表不匹配的也可



##### Right join

输出右表全部数据与左表匹配的数据合并，如果不匹配仍然显示但是为null



即使右表中没有匹配，也从左表返回所有的行



##### Full join

输入匹配后的全部数据，即使其中一个表的数据不匹配也输出



只要其中一个表中存在匹配，就返回行



##### Cross join

进行笛卡尔积的结果查询

左表的每条记录都有和右表中所有记录相对应的信息



##### Union

合并两个或多个select的结果

UNION 内部的 SELECT 语句必须拥有相同数量的列。列也必须拥有相似的数据类型。同时，每条 SELECT 语句中的列的顺序必须相同，名字可以不一样 

>  两表查询结果上下拼接，a查出10，b查出20，union  30



单纯用union默认是去重复的，如果要重复的使用union all



##### case

```sql
在count中使用case 
COUNT(CASE WHEN isOrder > 0 THEN 1 END)

SELECT *, COUNT(CASE 
		WHEN isOrder > 0 THEN 1
	END) AS OrderNum, COUNT(account) AS total
FROM (
	SELECT a.projectNo AS projectNo, a.account AS account, b.isOrder
	FROM info a
		INNER JOIN main b
		ON a.projectNo = b.projectNo
			AND a.account = b.account
) t
GROUP BY account;

在返回里设置case?
SELECT b.DetailID AS TaskID
	, CASE b.RequestType
		WHEN '02' THEN '咨询'
		WHEN '03' THEN '投诉'
		WHEN '04' THEN '维修'
		ELSE '' END AS ProcessName
		FROM xxx
```







##### GROUP BY

必须配合聚合函数进行使用

只会返回分组后的一条信息，返回的字段只能时聚合函数结果和包含在group by里的

当想要保留其它字段信息时用开窗函数





#### 操作符

```
= 		等于
<>      不等于，某些版本支持!=
>       大于
<       小于
>=      大于等于
<=      	        小于等于
between             在指定范围内
like 			搜索
and     and前后的条件都成立
or      只要有一个成立                 通过()可以进行嵌套
```



#### 高级

##### 子查询

通过()划分子查询

```sql
SELECT name FROM world WHERE population 运算符 ALL (SELECT population FROM world WHERE continent='Europe')

运算符可用 = > < in ....

有的数据库在使用子查询时必须使用别名
SELECT name FROM world WHERE continent = (SELECT continent FROM world WHERE name='Brazil') AS brazil_continent

做对比时如果子查询结果多于一条会出错，可以用all/ANY来处理  
```





##### Select into

表复制

```sql
SELECT LastName,Firstname
INTO Persons_backup
FROM Persons
WHERE City='Beijing'
```



##### 索引

被用来加速搜索/查询



更新一个包含索引的表需要比更新一个没有索引的表更多的时间，这是由于索引本身也需要更新。因此，理想的做法是仅仅在常常被搜索的列（以及表）上面创建索引



```sql
CREATE INDEX index_name
ON table_name (column_name)
```



##### 视图

视图是基于 SQL 语句的结果集的可视化的表，视图总是显示最近的数据。每当用户查询视图时，数据库引擎通过使用 SQL 语句来重建数据



##### 聚合函数





##### 开窗函数

over

开窗函数的特点就是,**输入几行,输出还是几行**,但**参与计算的字段有多行**

> 既想使用聚合函数又想保留原所有数据时，聚合函数的结果作为新列带给所有数据









## SQLServer

#### 备份

将数据导出成sql
[数据库导出、导入，通过sql](https://blog.csdn.net/weicoliang/article/details/80324346)



#### 语法知识

关键字
用[]  [Delete]

##### 修改表名/列名
```sql
-- 列表改名
EXEC sp_rename 'oldTableName', 'newTableName';

-- 表xxx字段 x to y
EXEC SP_RENAME 'table.column', 'newColumnName', 'COLUMN';

```

##### 创建列表
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

#### 执行追踪
Sql profiler
追踪数据库执行的操作，可以看到执行的语句、用户、时间、资源等

使用：工具->profiler

需要较高的权限才能追踪


#### 存储过程



##### 小知识

多条sql语句用;连接


数据库占用内存偏高是正常的？是sql 提前占用的缓存空间

###### 类型问题
时间类型存储null时会变成 0001-01-01T00:00:00

###### 快捷键

f5进行语句使用

###### 操作

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

存储过程

```sql
/****** Object:  StoredProcedure [dbo].[SP_GetMassChange]    Script Date: 2018/6/6 9:11:14 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
--获取预算表单信息
ALTER PROCEDURE [dbo].[SP_GetMassChange]
@DataKey varchar(200),
@IsMassChange bit
AS
BEGIN
	declare @tabHead table(
	IndexName nvarchar(200),
	FormKey nvarchar(50)
	)

	insert into @tabHead (IndexName,FormKey) 
	(select IndexName,FormKey from CostIndexHeadInfo where DataKey=@DataKey and IsMasschange=@IsMassChange )
	insert into @tabHead (IndexName,FormKey) 
	(select IndexName,FormKey from OpexIndexHeadInfo where DataKey=@DataKey and IsMasschange=@IsMassChange )
	insert into @tabHead (IndexName,FormKey) 
	(select IndexName,FormKey from AssumptionIndexHeadInfo where DataKey=@DataKey and IsMasschange=@IsMassChange )
	insert into @tabHead (IndexName,FormKey) 
	(select Title,FormKey from MasterIndex where DataKey=@DataKey and IsMasschange=@IsMassChange )

	select * from @tabHead


	declare @tabBody table(
	IndexName nvarchar(200),
	FormKey nvarchar(50)
	)

	insert into @tabBody (IndexName,FormKey) 
	(select 
		(ISNULL(((select IndexName from SalesIndexInfo where DataKey=@DataKey and RowNum = a.ParentID   and  ParentID=0 ) + '_'),'')
		+(IndexName)) as 'IndexName' ,FormKey
		from SalesIndexInfo as a where DataKey=@DataKey and IsMasschange=@IsMassChange)
	 
	insert into @tabBody (IndexName,FormKey) 
	(select 
		(ISNULL(((select IndexName from CostIndexInfo where DataKey=@DataKey and RowNum = a.ParentID   and  ParentID=0 ) + '_'),'')
		+(IndexName)) as 'IndexName' ,FormKey
		from CostIndexInfo as a where DataKey=@DataKey and IsMasschange=@IsMassChange) 

	insert into @tabBody (IndexName,FormKey) 
	(select 
		(ISNULL(((select IndexName from OpexIndexInfo where DataKey=@DataKey and RowNum = a.ParentID   and  ParentID=0 ) + '_'),'')
		+(IndexName)) as 'IndexName' ,FormKey
		from OpexIndexInfo as a where DataKey=@DataKey and IsMasschange=@IsMassChange) 

	insert into @tabBody (IndexName,FormKey) 
	(select 
		(ISNULL(((select IndexName from AssumptionIndexInfo where DataKey=@DataKey and RowNum = a.ParentID   and AssumptionIndexInfo.ParentID=0 ) + '_'),'')
		+(IndexName)) as 'IndexName' ,FormKey
		from AssumptionIndexInfo as a where DataKey=@DataKey and IsMasschange=@IsMassChange) 

	insert into @tabBody (IndexName,FormKey) 
	select IndexName,FormKey from MasterByMonth where DataKey = 'T201900000001' and IsMasschange=@IsMassChange

	insert into @tabBody (IndexName,FormKey) 
	select IndexName,FormKey from SCRIndexInfo where DataKey = 'T201900000001' and IsMasschange=@IsMassChange

	select * from @tabBody
END

--exec [SP_GetMassChange] 'T201900000001',1

/****** Object:  StoredProcedure [dbo].[SP_GetMassChange]    Script Date: 2018/6/5 16:45:03 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
--获取预算表单信息
ALTER PROCEDURE [dbo].[SP_GetMassChange]
@DataKey varchar(200),
@IsMassChange bit
AS
BEGIN
CREATE TABLE #t 
( 
     [IndexName] [nvarchar()]  NOT NULL , 
     [Oid] [ int ]  NOT NULL , 
) 

	declare @tabHead()

	declare @tabBody()
	select * from SalesIndexInfo where DataKey=@DataKey  and IsMasschange=@IsMasschange order by ID
	select * from SCRIndexInfo where DataKey=@DataKey  and IsMasschange=@IsMasschange order by ID
	select * from CostIndexInfo where DataKey=@DataKey  and IsMasschange=@IsMasschange order by ID
	select * from OpexIndexInfo where DataKey=@DataKey  and IsMasschange=@IsMasschange order by ID
	select * from AssumptionIndexInfo where DataKey=@DataKey  and IsMasschange=@IsMasschange order by ID
	select * from MasterByMonth where DataKey=@DataKey  and IsMasschange=@IsMasschange

	select * from CostIndexHeadInfo where DataKey=@DataKey  and IsMasschange=@IsMasschange order by ID	
	select * from OpexIndexHeadInfo where DataKey=@DataKey  and IsMasschange=@IsMasschange order by ID
	select * from AssumptionIndexHeadInfo where DataKey=@DataKey and IsMasschange=@IsMasschange order by ID
	select * from MasterIndex where DataKey=@DataKey  and IsMasschange=@IsMasschange
	
END

--exec [SP_GetMassChange] 'T','T201900000001',1

/****** Object:  StoredProcedure [dbo].[SP_GetTemplateData]    Script Date: 2018/6/5 10:29:19 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
--获取预算表单信息
ALTER PROCEDURE [dbo].[SP_GetTemplateData]
@DataType nvarchar(200),
@DataKey varchar(200)
AS
BEGIN
	select * from SalesIndexInfo where DataKey=@DataKey and DataType=@DataType order by ID
	select * from CostIndexHeadInfo where DataKey=@DataKey and DataType=@DataType order by ID
	select * from SCRIndexInfo where DataKey=@DataKey and DataType=@DataType order by ID
	select * from CostIndexInfo where DataKey=@DataKey and DataType=@DataType order by ID
	select * from OpexIndexHeadInfo where DataKey=@DataKey and DataType=@DataType order by ID
	select * from OpexIndexInfo where DataKey=@DataKey and DataType=@DataType order by ID
	select * from AssumptionIndexHeadInfo where DataKey=@DataKey and DataType=@DataType order by ID
	select * from AssumptionIndexInfo where DataKey=@DataKey and DataType=@DataType order by ID
	select * from MasterIndex where DataKey=@DataKey and DataType=@DataType
	select * from MasterByMonth where DataKey=@DataKey and DataType=@DataType

	if @DataType='F'
	begin
		select * from StoreBudgetAsset  where FormID=@DataKey
	end

	
END

--exec SP_GetTemplateData 'T','T201900000001'


--分别在两个表查出一列合并
select count(1) as 'count',(select count(1) as 'completed' from  MassChangeSchedule with(nolock) where State = 0) as 'completed'  from MassChangeSchedule with(nolock)


--???
select IndexName,FormKey from SalesIndexInfo where ParentID=0 and  DataKey='T201900000001'
Union All 
select 
((
select IndexName from SalesIndexInfo where DataKey='T201900000001' and RowNum = a.ParentID   and  ParentID=0 
)
+'_'+(IndexName)) as 'IndexName' ,FormKey
from SalesIndexInfo as a where DataKey='T201900000001' and ParentID <> 0

//////////////////////////////////////////////////////////////////////////////////////
select 
(ISNULL (
select IndexName from SalesIndexInfo where DataKey='T201900000001' and RowNum = a.ParentID   and  ParentID=0 
,'')
+'_'+(IndexName)) as 'IndexName' ,FormKey
from SalesIndexInfo as a where DataKey='T201900000001'

select FormKey,(
select IndexName from SalesIndexInfo where RowNum = a.ParentID and DataKey='T201900000001'  and  ParentID=0
)+'_'+(IndexName) 
from SalesIndexInfo as a where ID=871 
```



##### 参数化

如果存储过程中使用字符串拼接sql的话，上面的参数化将不会起作用，单引号必须经过判断并替换，在数据库中，用2个单引号代表1个实际的单引号。所以，如果是拼接sql字符串的方式，需要用Replace(@para,'''', '''''')来替换一下，将1个单引号替换为2个就没有问题了。

使用这种参数化查询的办法，防止SQL注入的任务就交给ADO.NET了, 如果在项目中统一规定必须使用参数化查询，就不用担心因个别程序员的疏忽导致的SQL注入漏洞了。     但是，问题还没有完，SQL注入的漏洞是堵住了，但是查询结果的正确性，参数化查询并不能帮上什么忙。


##### 问题

[sa用户启用问题，sql启动sa后仍报错，需要修改的登录模式，重启sql服务](https://blog.csdn.net/ytm15732625529/article/details/72630050)


###### favtory库
存储过程设置参数，要设置空值DBNull.Value;



#### 博客

[sql防注入](https://www.zhihu.com/question/22953267 )


