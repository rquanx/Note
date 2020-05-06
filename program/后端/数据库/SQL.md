## SQL

### Quick

结构化查询语言，是一种ANSI的标志计算机语言

> ANSI：美国国家标准化组织

 

#### 分类

DBMS：数据库管理系统

RDBMS：关系型数据库



**现代的 SQL 服务器构建在 RDBMS 之上。**

 

#### 书写

##### 顺序

select -> from -> where -> group by -> having



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


### 数据类型
#### 字符

由于NCHAR类型是一种不可变长的数据类型,所以应用的场合非常狭隘,因为如果长度设定的非常的大,那么剩余的字节将会用空格代替
char：    固定长度，存储ANSI字符，不足的补英文半角空格。
nchar：   固定长度，存储Unicode字符，不足的补英文半角空格
varchar：  可变长度，存储ANSI字符，根据数据长度自动变化。
nvarchar： 可变长度，存储Unicode字符，根据数据长度自动变化。



#### 值

null 和 空字符串，为什么数据库使用is null 来判断null

> 在数据库中null标识unkonw值，不能当作一个值来判定，所以不一样
>
> 除了oracle，oracle是将空字符串和null都当中空值，会自动将空字符串转化为Null
>
> 
>
> 对于unknow的数据库
>
> 例：bit类型
>
> a <> 1  不包含有null




### 基本语法

#### 符号

为何字符串建议使用单引号

> 在不同数据库的实现中 ''，“”，``会有不同作用，有的是非法、有的是定义时用....,只有作为字符串时用单引号是统一的，只使用单引号即不产生疑惑



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



当使用group by时需要进行过滤，不能用where，但可以使用having





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



##### 视图

视图是基于 SQL 语句的结果集的可视化的表，视图总是显示最近的数据。每当用户查询视图时，数据库引擎通过使用 SQL 语句来重建数据



###### 特点

视图不能被修改，表修改或者删除后应该删除视图再重建

视图的数量没有限制，但是命名不能和视图以及表重复，具有唯一性

视图可以被嵌套，一个视图中可以嵌套另一个视图

视图不能索引，不能有相关联的触发器和默认值，sql server不能在视图后使用order by排序





###### 场景

使用视图，可以定制用户数据，聚焦特定的数据

简化数据操作

基表中的数据就有了一定的安全性

可以合并分离的数据，创建分区视图



##### 聚合函数

group_concat

> 对字段数据拼接，join





##### 开窗函数

over

开窗函数的特点就是,**输入几行,输出还是几行**,但**参与计算的字段有多行**

> 既想使用聚合函数又想保留原所有数据时，聚合函数的结果作为新列带给所有数据



##### 触发器

可设置在进行特定操作前后触发操作，执行特定的sql

> 例：在A表插入新数据后，触发器往B表特定字段+1





### 设计

第一范式：所有字段值都是不可分解的原子值

> 根据需求包含足够的基础信息
>
> 不容易产生冗余
>
> ---满足第一范式不一定满足第二范式



第二范式：在一个数据库表中，一个表中只能保存一种数据，不可以把多种数据保存在同一张数据库表中。

> 当基础信息（非直接相关的），会产生多条相同的数据抽离出另一个表
> 
> ---满足第二范式不一定满足第三范式



第三范式：每一列数据都和主键直接相关，而不能间接相关。

> 不直接关联的数据抽离新表
> 
> ---所以第一范式，第二范式，第三范式都是有区别的。





#### 主键

##### UUID/GUID 作为主键

优点：

  在所有分片数据中都是唯一，容易跨数据库迁移合并

  插入数据库前就知道主键值

  相比数字主键更不容易泄漏信息

缺点：

  不直观

  不能用于聚集索引，排序效率低，sql server的newsequentialid()

  开销大

[UUID相关文章和讨论](https://tomharrisonjr.com/uuid-or-guid-as-primary-keys-be-careful-7b2aa3dcb439)



### 索引



作用：被用来加速搜索/查询

注意点

- 较频繁的作为查询条件的字段应该创建索引；

- 唯一性太差的字段不适合单独创建索引，即使该字段频繁作为查询条件；

- 更新非常频繁的字段不适合创建索引



更新一个包含索引的表需要比更新一个没有索引的表更多的时间，这是由于索引本身也需要更新。因此，理想的做法是仅仅在常常被搜索的列（以及表）上面创建索引



```sql
CREATE INDEX index_name
ON table_name (column_name)
```



#### 数据结构

##### 哈希表

优点：可快速查找特定的数据,时间复杂度O(1)

风险：可能存在哈希碰撞，但即使碰撞，仍能快速定位

缺点：无法高效进行范围查找



##### 二叉树

优点：虽然单点查找是比哈希表慢，但由于树的关系，可以让左侧树为小于，右侧树为大于，可快速进行范围查询，相当于二分查找，时间复杂度O(logn)

缺点：二叉树可能会不平衡，极端情况下树可能退变为链表，导致效率大幅降低，复杂度降低为O(N)





##### 红黑树

可自动调整树形态的树结构

优点：当二叉树处于不平衡的状态时可自行调整，来保持基本平衡，时间复杂度O(logn)

缺点：当数据按顺序插入时，会产生右倾，虽然没退变成链表，但效率仍然大幅度下降



##### AVL树

绝对平衡的二叉树

优点：不错的查找性能（O（logn）），不存在极端的低效查找的情况；可以实现范围查找、数据排序

缺点：当使用AVL树后会发现，查询瓶颈在磁盘读取中，虽然时间复杂度合适了，但是由于磁盘瓶颈仍不适用



##### B树

每个节点限制最多存储两个 key，一个节点如果超过两个 key 就会自动分裂，节点中存储数据

优点：一个节点存储多个数据，一次读取磁盘获取到更多的数据，降低瓶颈影响，B 树的查找性能等于 O（h*logn），其中 h 为树高，n 为每个节点关键词的个数



##### B+树

mysql底层使用的数据结构，节点中存储索引（地址）

优点：相比于B树的存储数据，存储索引能存储更多的数据

#### 聚集/非聚集索引

索引和数据是分开不同文件存储还是存储在一起



##### 非聚集

索引文件更小，查询性能更好



##### 聚集

相对非聚集，会冗余更多的数据在文件中



### 知识点



查询瓶颈：数据结构、磁盘读取（从磁盘读取 1B 数据和 1KB 数据所消耗的时间是基本一样）









## SQLServer

#### 备份

将数据导出成sql
[数据库导出、导入，通过sql](https://blog.csdn.net/weicoliang/article/details/80324346)



#### 

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

###### 时间存储问题
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
- 3、int只能到2038年
- 4、bigint存的是时间戳，是绝对时间，而且搜索快。至于缺点其实可以忽略，一般你也不会去数据库看这个字段的时间



###### 类型问题
时间类型存储null时会变成 0001-01-01T00:00:00

###### 字符串自动补全空格问题
字段类型为char


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



#### 安全

数据库可以有只读权限

#### 博客

[sql防注入](https://www.zhihu.com/question/22953267 )



#### 性能优化

##### 执行计划

Sql执行计划：查看开销



##### 索引

添加索引



##### 其他

减少不必要的join

减少不必要的子查询

With as提取子查询？



##### 原因

大数据排序

视图没有索引，对视图进行排序会慢

#### 应用

##### 刷数据

Update a set a.c1 = b.c2 from a,b where a.ID = b.ID

> 将a表的c1字段值更新为b表的c2值


