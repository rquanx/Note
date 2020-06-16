### Quick

结构化查询语言，是一种ANSI的标志计算机语言

> ANSI：美国国家标准化组织

 



#### 书写

##### 书写顺序

select -> from -> where -> group by -> having

##### 执行顺序

form --> where --> group by --> having --> select --> order by --> limit



##### 大小写

对大小写不敏感

 

##### 引号

对于文本值，要加上引号

数值则不需要



#### 语法分类

##### DQL

**定义**：数据查询语言



Select + from + where



##### DML

**定义**：Data Manipulation Language 数据操纵语言



update、delete、insert 



##### DDL

**定义**：Data Definition Language数据定义语言

create、alter、drop

> Create database  创建数据库
>
> Alter database   修改数据库
>
> 
>
> create table     创建表
>
> alter  table     修改表
>
> Drop table     删除表
>
> 
>
> Create index     创建索引
>
> Drop index  删除索引 



##### DCL

**定义**：数据控制语言

GRANT、ROLLBACK、COMMIT



### 认知

在SQL中一切皆表

> 插入的时候也是把一个表插入



#### 起源

IBM研究员1974年发表SEQUEL，由于商标原因改为SQL



#### 分类

- 关系型

- 非关系型：键值型(redis)、文档型(mongodb)、列存储、搜索引擎(ES、Splunk、Solr)、图形



**列存储**：列式数据库，数据展示还是行，但是数据读取是列，可以读取某一列的数据

**图形**：利用了图(数据结构)存储，例子：社交关系



#### 定义

DBMS：数据库管理系统，DataBase Management System

RDBMS：关系型数据库



现代的 SQL 服务器构建在 RDBMS 之上。




### 数据类型与值
#### 字符

由于NCHAR类型是一种不可变长的数据类型,所以应用的场合非常狭隘,因为如果长度设定的非常的大,那么剩余的字节将会用空格代替
char：    固定长度，存储ANSI字符，不足的补英文半角空格。
nchar：   固定长度，存储Unicode字符，不足的补英文半角空格
varchar：  可变长度，存储ANSI字符，根据数据长度自动变化。
nvarchar： 可变长度，存储Unicode字符，根据数据长度自动变化。



#### 值

##### null

column = null / column != null 总是false



null == null ==> false



除Oracle外，判断null时需要用is null/ is not null



为什么数据库使用is null 来判断null

> 在数据库中null标识unkonw值，不能当作一个值来判定d
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

**单引号**

为何字符串建议使用单引号

> 在不同数据库的实现中 ''，“”，``会有不同作用，有的是非法、有的是定义时用....,只有作为字符串时用单引号是统一的，只使用单引号即不产生疑惑



**分号**

语句间用;分割



#### 查询

##### Select

```sql
SELECT 列名称 FROM 表名称       		-- 取具体列数据
SELECT * FROM 表名称                 -- 取所有列
SELECT C1,C2 FROM 表名称             -- 取指定列数据
SELECT DISTINCT 列名称 FROM 表名称	-- 去重

select * from table where column like '%a''b%' -- 查询包含'的数据
```



##### Where

```sql
SELECT 列名称 FROM 表名称 WHERE column 运算符 value
```



#### 操纵

##### Insert

```sql
insert into table values (v1,v2,v3,v4),(v11,v22,v33,v44) -- 可以插入多条
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

##### VALUES()

VALUES可以创建临时表



select * from (  VALUES(1),(2),(3)  ) t

不支持values可以用select 1 as a from DUAL union all xx  

> oracle可以这样用



##### with as

临时表缓存



```sql
with tableName as (select * from [table])
```



将...的查询结果作为tableName表



##### Having

having可以看作where使用，但是having可以使用统计函数(count())来进行过滤



##### Case when

**查询**

```sql
CASE column
      WHEN '长沙' THEN '湖南' 
      WHEN '衡阳' THEN '湖南'
      WHEN '海口' THEN '海南' 
      WHEN '三亚' THEN '海南'
    ELSE '其他' as columnAlias
-- 对特定列的值进行处理
```



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

-- 在返回里设置case?
SELECT b.DetailID AS TaskID
	, CASE b.RequestType
		WHEN '02' THEN '咨询'
		WHEN '03' THEN '投诉'
		WHEN '04' THEN '维修'
		ELSE '' END AS ProcessName
		FROM xxx
```





**更新**

根据数据进行不同的更新处理

```sql
UPDATE Salaries
SET salary = 
CASE 
    WHEN salary >= 10000 THEN salary * 0.9
    WHEN salary < 10000 THEN salary * 1.2
    ELSE salary END
```



**联合操作符**

```sql
case where name like '%xxx%' then 1 else 0
```







##### Distinct

去重

多列时，将多个字段完全相同的数据过滤

> 原理：当DISTINCT多个字段时，是将多个字段的值拼接，再进行DISTINCT



##### Order by



asc升序，desc降序



```sql
select * from table order by a,b,c,d ....
对a字段排序，然后在a基础上对重复的行以b排序....

select * from table order by a desc,b desc,c desc,d ....
desc 倒序
```



##### Top/Limit

根据数据库支持使用top/limit

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
>
>  __abc



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



##### join

join会先取两个表然后返回大的那一个作为计算?



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







##### GROUP BY

必须配合聚合函数进行使用

只会返回分组后的一条信息，返回的字段只能时聚合函数结果和包含在group by里的

当想要保留其它字段信息时用开窗函数



当使用group by时需要进行过滤，不能用where，但可以使用having



**步骤**

- 取出表数据，按分组字段进行分组
- 对统计函数列进行计算
- 结果合并成一个表
- 使用having过滤





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
SELECT name FROM world 
WHERE population 运算符 ALL (SELECT population FROM world WHERE continent='Europe')

-- 运算符可用 = > < in ....

-- 有的数据库在使用子查询时必须使用别名
SELECT name FROM world WHERE continent = (SELECT continent FROM world WHERE name='Brazil') AS brazil_continent

-- 做对比时如果子查询结果多于一条会出错，可以用all/ANY来处理  
```



##### 表复制

```sql
SELECT [fields]
INTO table_backup
FROM table_source
WHERE 条件
```



##### 视图

视图是基于 SQL 语句的结果集的可视化的表，视图总是显示最近的数据。每当用户查询视图时，数据库引擎通过使用 SQL 语句来重建数据



**特点**

视图不能被修改，表修改或者删除后应该删除视图再重建

视图的数量没有限制，但是命名不能和视图以及表重复，具有唯一性

视图可以被嵌套，一个视图中可以嵌套另一个视图

视图不能索引，不能有相关联的触发器和默认值，sql server不能在视图后使用order by排序



**场景**

使用视图，可以定制用户数据，聚焦特定的数据

简化数据操作

基表中的数据就有了一定的安全性

可以合并分离的数据，创建分区视图



##### 聚合函数

**group_concat**

对字段数据拼接，join





##### 开窗函数

**over**

开窗函数的特点就是,**输入几行,输出还是几行**,但**参与计算的字段有多行**

> 既想使用聚合函数又想保留原所有数据时，聚合函数的结果作为新列带给所有数据



##### 触发器

可设置在进行特定操作前后触发操作，执行特定的sql

> 例：在A表插入新数据后，触发器往B表特定字段+1



### 性能

#### Count

Count(*) ≈ count(1) > count(field)



#### 优化

##### 避免子查询

子查询无法命中索引，where可提取到最外面



参数是子查询时，使用 EXISTS 代替 IN

```sql
-- 慢
SELECT * 
  FROM Class_A
WHERE id IN (SELECT id 
               FROM  CLASS_B);

-- 快
SELECT *
  FROM Class_A A 
 WHERE EXISTS
(SELECT * 
   FROM Class_B  B
  WHERE A.id = B.id);
  
-- 可以用到索引，如果连接列 (id) 上建立了索引，那么查询 Class_B 时不用查实际的表，只需查索引就可以了。(子查询产生临时表后索引无效？)

-- 如果使用 EXISTS，那么只要查到一行数据满足条件就会终止查询， 不用像使用 IN 时一样扫描全表。在这一点上 NOT EXISTS 也一样

-- 详细原理：如果 IN 后面如果跟着的是子查询，由于 SQL 会先执行 IN 后面的子查询，会将子查询的结果保存在一张临时的工作表里（内联视图），然后扫描整个视图，显然扫描整个视图这个工作很多时候是非常耗时的，而用 EXISTS 不会生成临时表

```



##### 排序

会产生排序的语句

- GROUP BY 子句

- ORDER BY 子句
- 聚合函数(SUM、COUNT、AVG、MAX、MIN)
- DISTINCT
- 集合运算符(UNION、INTERSECT、EXCEPT)
- 窗口函数(RANK、ROW_NUMBER 等)



如果在内存中排序还好，但如果内存不够导致需要在硬盘上排序上的话，性能就会急剧下降

> 数据量大时会出现问题



##### 索引失效

索引失效的情况

- <>
- !=
- NOT IN
- 类型转换
  - 对char类型使用number值作条件

- 子查询？
  - 子查询的结果会产生一张新表，不过如果不加限制大量使用中间表的话，会带来两个问题，一是展示数据需要消耗内存资源，二是原始表中的索引不容易用到

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

**优点**

- 在所有分片数据中都是唯一，容易跨数据库迁移合并
- 插入数据库前就知道主键值
- 相比数字主键更不容易泄漏信息

**缺点**

- 不直观
- 不能用于聚集索引，排序效率低，sql server的newsequentialid()
- 开销大



[UUID相关文章和讨论](https://tomharrisonjr.com/uuid-or-guid-as-primary-keys-be-careful-7b2aa3dcb439)



#### 外键

**优点**

- 减少业务与数据耦合
- 保持数据一致性



**缺点**

- 产生额外开销
- 无法支持水平拆分、分库
- 高并发时容易出现性能问题





### 索引



**作用**：被用来加速搜索/查询

**注意点**

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

**优点**：可快速查找特定的数据,时间复杂度O(1)

**风险**：可能存在哈希碰撞，但即使碰撞，仍能快速定位

**缺点**：无法高效进行范围查找



##### 二叉树

**优点**：虽然单点查找是比哈希表慢，但由于树的关系，可以让左侧树为小于，右侧树为大于，可快速进行范围查询，相当于二分查找，时间复杂度O(logn)

**缺点**：二叉树可能会不平衡，极端情况下树可能退变为链表，导致效率大幅降低，复杂度降低为O(N)





##### 红黑树

可自动调整树形态的树结构

**优点**：当二叉树处于不平衡的状态时可自行调整，来保持基本平衡，时间复杂度O(logn)

**缺点**：当数据按顺序插入时，会产生右倾，虽然没退变成链表，但效率仍然大幅度下降



##### AVL树

绝对平衡的二叉树

**优点**：不错的查找性能（O（logn）），不存在极端的低效查找的情况；可以实现范围查找、数据排序

**缺点**：当使用AVL树后会发现，查询瓶颈在磁盘读取中，虽然时间复杂度合适了，但是由于磁盘瓶颈仍不适用



##### B树

每个节点限制最多存储两个 key，一个节点如果超过两个 key 就会自动分裂，节点中存储数据

**优点**：一个节点存储多个数据，一次读取磁盘获取到更多的数据，降低瓶颈影响，B 树的查找性能等于 O（h*logn），其中 h 为树高，n 为每个节点关键词的个数



##### B+树

mysql底层使用的数据结构，节点中存储索引（地址）

**优点**：相比于B树的存储数据，存储索引能存储更多的数据



#### 聚集/非聚集索引

索引和数据是分开不同文件存储还是存储在一起



**非聚集**

索引文件更小，查询性能更好



**聚集**

相对非聚集，会冗余更多的数据在文件中



### 知识点

#### 查询瓶颈

数据结构、磁盘读取（从磁盘读取 1B 数据和 1KB 数据所消耗的时间是基本一样）



#### 执行顺序

语法检查 -> 语义检查 -> 权限检查 -> 缓存 -> 解析器 -> 优化器 -> 执行器



**语法检查**：检查 SQL 拼写是否正确，如果不正确

**语义检查**：检查 SQL 中的访问对象是否存在。

**缓存**：Oracle通过共享池进行缓存，MySQL新版本中已去除



### 应用

#### 字符串处理

```select owner string_agg(name,',') as names from cats group by owner ```

对数据先用owner进行分组，然后将同组的name列使用,进行拼接，返回每组一行数据

> PostgreSQL、MSSQL(2017): string_agg  MySQL: group_concat MSSQL:stuff 





## SQLServer



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



#### 函数

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

##### 执行计划

Sql执行计划：查看开销



##### 索引

添加索引



##### 其他

减少不必要的join

减少不必要的子查询

With as提取子查询？



##### 场景缓慢原因

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



#### 使用

##### 字符串拼接

**2017**

string_agg



**其他**

STUFF ( character_expression , start , length , replaceWith_expression )

> character_expression中，将从start开始的length长度的的字符串替换成replaceWith_expression



FOR xml path

> 将select 的结果 输出xml格式的结果
>
> FOR xml path     ==> ```<row><field>v1</field></row> <row><field>v2</field></row>```
>
> FOR xml path('')   ==> ```<field>v1</field><field>v2</field>```
>
> FOR xml path('table') ==> ```<table><field>v1</field></table> <table><field>v2</field></table>```



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



