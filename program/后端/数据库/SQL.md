### Quick

结构化查询语言，是一种ANSI的标志计算机语言

> ANSI：美国国家标准化组织

 



#### 书写/规范

##### 书写顺序

select -> from -> where -> group by -> having -> order by

##### 执行顺序

form --> where --> group by --> having --> select --> order by --> limit



##### 大小写

**Linux**

MySQL 数据库名、表名、变量名是严格区分大小写的，而字段名是忽略大小写



**Windows** 

MySQL 不区分大小写

 SQLServer大小写不区分



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



**列存储**：列式数据库，数据展示还是行，但是数据读取是列，可以读取某一列的数据；把一列的数据都串起来进行存储，然后再存储下一列。这样做的话，相邻数据的数据类型都是一样的，更容易压缩，压缩之后就自然降低了 I/O

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



### 术语/概念

####  数据库范式及编程规范

根据实际情况取舍



##### 数据库范式

- student(id, name)

- class(id, description)

- student_class(student_id, class_id)

三张表，查询时需要join，数据量大时容易产生性能问题



##### 编程规范

**理论**

表设计按照范式来，越符合则产生越多的表，查询数据时就需要联表查询

通过冗余数据则无需联表，当数据量大时性能会提高很多



**示例**

student_class_full(student_id, class_id, name, description)

使用一张大表存储所有字段，虽然字段有冗余，但是不需要join





#### 连接

##### 等值连接

```sql
select * from a,b where a.x = b.x
```



##### 非等值连接

```sql
SELECT * FROM a, b WHERE a.x BETWEEN b.x AND b.x
```



##### 外连接

```sql
select * from a join b on a.x = b.x
```



##### 自连接

```sql
select * from a as aa,a as bb where aa.x = x and bb.x < x
```



##### 对比

外连接（join?）相比其他连接，外连接是取小表进行hash连接，其他则是先将表进行笛卡尔积再进行过滤，会占用更多资源？



### 基本

#### 变量

```sql
declare @roomID nvarchar(1000) -- 有的数据库不需要声明？
set @roomID = 'xx'

select * form room where roomID = @roomID
```







##### 游标

数据指针，可在存储过程中作为变量



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

##### **Exists**

判断子查询得到的结果集是否是一个空集



##### VALUES()

VALUES可以创建临时表



select * from (  VALUES(1),(2),(3)  ) t

不支持values可以用select 1 as a from DUAL union all xx  

> oracle可以这样用



##### with as

临时表缓存

CTE後面必須直接跟使用CTE的SQL語句

> with as 只能在下一句sql中生效



```sql
with tableName as (select * from [table])
-- 将查询结果作为tableName表
```



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



**MySQL中排序有两种**

- `Index`：索引可以保证数据的有序性，因此不需要再进行排序。

- `FileSort`：一般在内存中进行排序，占用CPU较多。如果待排结果较大，会产生临时文件I/O到磁盘进行排序，效率较低。



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



`oracle`：单个参数最大数量1000，超过时可用`where x in () or x in () `

`Sql Server`：单个参数最大数量1000，超过时可用`where x in () or x in () `

`MySQL`: 无限制，但对sql大小有限制，默认`4M`



**in返回顺序**

当不进行`order by`时，返回的结果顺序是无法保证的



##### Between

选出介于a和b间的,可以是数组，文本，日期



数据库类型如果是data 则包括两端

如果是datatime 则不包括右边



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



自连接性能消耗更大

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



**为什么group by后无法取非聚合字段**

group by 后属于进行了分组,此时每条结果均表示一个集合，非聚合字段包含了集合中所有数据的可能性，不能应用于表述集合



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



**关联子查询**

 ***外部查询返回的每一行数据，内部查询都要执行一次***

必须先执行外层查询，接着对所有通过过滤条件的记录，执行内层查询。

外层查询和内层查询相互依赖，因为外层查询会把数据传递给内层查询



```sql
select * from dept d where exists(select * from emp e where e.deptno = d.deptno);
```



**非关联子查询**

***子查询只执行一次***

必须先完成内层查询之后，外层查询才能介入

```sql
select * from emp where sal = (select max(sal) from emp);
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



**优点**

- SQL的聚合，屏蔽底层复杂SQL
  - 隐藏了底层的表结构，简化了数据访问操作，客户端不再需要知道底层表的结构及其之间的关系
- 安全，视图操作不会影响底层数据表
  - 供了一个统一访问数据的接口。（即可以允许用户通过视图访问数据的安全机制，而不授予用户直接访问底层表的权限），从而加强了安全性，使用户只能看到视图所显示的数据
- 聚合需要的数据进行展示

**特点**

- 不能被修改，表修改或者删除后应该删除视图再重建

- 数量没有限制，但是命名不能和视图以及表重复，具有唯一性

- 可以被嵌套，一个视图中可以嵌套另一个视图

- 不能有相关联的触发器和默认值，sql server不能在视图后使用order by排序
  - 有些 RDBMS 不支持对视图创建索引（有些 RDBMS 则支持，比如新版本的 SQL Server）



**场景**

- 定制用户数据，聚焦特定的数据

- 简化数据操作

- 基表中的数据就有了一定的安全性

- 合并零散的数据，创建分区视图



##### 存储过程



**优点**

- 一次编译多次使用
- 模块化



**缺点**

- 可移植性差

- 调试困难，只有少数数据库支持调试
- 开发、维护困难
- 不适合高并发



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



##### 事务

A C I D

原子性（Atomicity）：原子的概念就是不可分割，进行数据处理操作的基本单位

一致性（Consistency）：数据库在进行事务操作后，会由原来的一致状态，变成另一种一致的状态。当事务提交后，或者当事务发生回滚后，数据库的完整性约束不能被破坏。

隔离性（Isolation）：它指的是每个事务都是彼此独立的，不会受到其他事务的执行影响。一个事务在提交之前，对其他事务都是不可见的。

持久性（Durability）：事务提交之后对数据的修改是持久性的，即使在系统出故障的情况下，比如系统崩溃或者存储介质发生故障，数据的修改依然是有效的。因为当事务完成，数据库的日志就会被更新，这时可以通过日志，让系统恢复到最后一次成功的更新状态。



**事务异常**

脏读（Dirty Read）：读取到了未提交的事务产生的数据

不可重复读（Nnrepeatable Read）：一个事务内根据同一个条件对行记录进行多次查询，读取的结果不同，数据变化。**一个事务同样的操作读取的数据内容不同（更新）**

幻读（Phantom Read）：事务 A 根据条件查询得到了 N 条数据，但此时事务 B 更改或者增加了 M 条符合事务 A 查询条件的数据，这样当事务 A 再次进行查询的时候发现会有 N+M 条数据，产生了幻读，数量变化。**一个事务同样的操作读出的数据数量不同（创建/删除）**



**隔离级别**

读未提交（READ UNCOMMITTED ）：全部允许，不会使用锁

读已提交（READ COMMITTED）：允许不可重复读，常见的默认隔离级别（Oracle 和 SQL Server）

可重复读（REPEATABLE READ）：允许幻读，MySQL 默认的隔离级别

可串行化（SERIALIZABLE）:避免所有异常，将事务进行串行化，也就是在一个队列中按照顺序执行，牺牲了系统的并发性



隔离级别越低，意味着系统吞吐量（并发程度）越大，出现异常问题的可能性会更大



### 进阶

#### 数学角度

##### 谓词

谓词可以简单理解为函数



**阶**

根据谓词运算时接收的参数形式，会存在阶的划分

- 一阶：接收一行数据，= 、 > 、 < 、 like ....
- 二阶：接收集合, exists、group by 
- 三级：接收集合的集合,SQL最多出现3阶
- 四阶：接收集合的集合的集合



#### SQL注入

##### 参数化

变量不直接拼接而是以执行参数的方式设置占位符，待数据库自行处理

SQL Server：参数化数量最大2100



##### 转义

通过内置/外置函数进行转义



#### 存储方式

##### 概念

- **页**：记录是按照行来存储的，但是数据库的读取并不以行为单位，每次都是加载一页

- **区(Extent)**：比页大一级的存储结构,一个区会分配 64 个连续的页

- **段（Segment)**:由一个或多个区组成





##### 数据结构

**平衡二叉树**

搜索树、红黑树、数堆、伸展树

二叉树容易变得很高，通过增加节点可以降低深度



**B树**

节点：多个节点（> 2），M为B树的阶

关键字：存储M - 1个关键字，每一个节点会有M个指针，通过M - 1个关键字可以将M个指针进行划分（间隔开来）

> 8 12  --> 3  5     9  10      13  15
>
> 8和12  (M - 1)(2)个关键字将3  5     9  10      13  15 M(3)个子节点进行划分



**B+树**

节点数 == 关键字数 （父节点的关键字会存一份到子节点关键字中,此关键字只用于作索引）

> 子节点除了用于划分的关键字外额外会有把父节点划分的关键字存储起来
>
> 一层一层传递后，相当于叶节点会包含所有关键字，所以可以将数据存储到叶节点中



- 每一个叶子节点都有一个指向下一个节点的指针，这样就形成了一个链表
- 中间节点并不直接存储数据，每次只有访问到叶子节点才能找到对应的数据

**优点**

磁盘读写代价更低：B+树的内部节点并没有指向关键字具体信息的指针，因此其内部节点相对B树更小，盘块所能容纳的关键字数量越多，一次性读入内存的需要查找的关键字也就越多，相对IO读写次数就降低了



数据都存储在叶子结点中，只需要扫一遍叶子结点即可,B树因为其分支结点同样存储着数据，需要进行一次中序遍历按序来扫，所以B+树更加适合在区间查询的情况，所以通常B+树用于数据库索引



**B/B+对比**

- B树非叶子结点存储数据；B+树非叶子结点不存储数据只存索引。

- B树叶子结点没有使用双向链表串连；B+树叶子结点使用双向链表进行串连，为了支持区间查询



#### In/Not In VS  Exisit/Not Exists

##### In/EXISTS

`In`：把外表和内表作hash 连接

`Exists`：对外表作loop 循环，每次loop 循环再对内表进行查询



一般IN/EXISTS都能得到相同的结果，建立索引的情况下，看外部查询的主表的大小

- 外部查询主表 > 内部查询子表 ==> IN效率高，对内部查询子表进行了索引
- 外部查询主表 < 内部查询子表 ==> EXISTS效率高，对外部查询主表进行了索引

总结：外表大，用IN；内表大，用EXISTS



##### Not in/Not exists

`not in`：内外表都进行全表扫描，没有用到索引

`not extsts`：的子查询依然能用到表上的索引,not exists > not in



#### Hash连接

用第一个表（小表）建hash table，第二个表在hash table中查找匹配的项，复杂度是n，hash table占的内存可能会比较大

##### 原理

两个表做hash连接，使用较小的表作为`驱动表`（这里指运用了过滤条件后结果集较小的表），另一个表称为`探测表`



**流程**

- 对驱动表的关联列使用两个内置函数计算hash值，两个hash值分别记为`hash_value_1`和`hash_value_2`,`hash_value_1`相同的记录存放在一个`hash bucket`中，这里注意`hash bucket`只需要记录该sql语句的查询列、关联列及`hash_value_2`即可，hash bucket组成`hash table`

- 利用连接列上的hash函数，将从驱动表上获取的结果集做成hash table存放在内存中，hash table中单元是hash bucket，key/value，value就是hash bucket

- 取探测表的数据，对每一个数据都做关联列上的hash函数（和驱动表的hash函数相同），定位到hash table中的hash bucket，找到hash bucket就进去看看有没有匹配的数据

- 如果hash bucket里没有数据，则丢弃探测表中的这一行数据。如果有，则进一步查看里面的数据是否和探测表的这条记录匹配

- 循环处理，直到处理完探测表中的所有记录，返回结果集



#### Join



连接表的数量尽量不要超过 3 张

每增加一张表就相当于增加了一次嵌套的循环，数量级增长会非常快，严重影响查询的效率



##### Nested loop join 嵌套连接

两个表读一行数据进行两两对比，复杂度是n^2



##### Block nested loop join

从两个表读很多行数据，然后进行两两对比，复杂度也是n^2



##### Index nested loop join

从第一个表读一行，然后在第二个表的索引中查找这个数据，索引是B+树索引，复杂度可以近似认为是nlogn



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

- <>
- 负向比较（例如：!=）
- NULL
- NOT IN
- where 类型转换
  - 对char类型使用number值作条件（字符集不同，存储空间不同）
- 子查询？
  - 子查询的结果会产生一张新表，不过如果不加限制大量使用中间表的话，会带来两个问题，一是展示数据需要消耗内存资源，二是原始表中的索引不容易用到
- or,可能会导致全表扫描，此时可以优化为 union 查询
- 数据编码
  - 相 join 的两个表的字符编码不同，不能命中索引，会导致笛卡尔积的循环计算（nested loop）
- 条件表达式的左侧不为原始字段
  - `where c * 2 > 1 ==> where c > 1 / 2 -- 不可索引 ==> 可索引`
  - `where substr(col) = '1' -- 不可索引`





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
- Where和Order尽量使用索引，where可以避免全表扫描，order可以避免`FileSort`排序
- 通常在重复度超过 10% 的情况下，可以不创建这个字段的索引

- 多个单列索引在多条件查询时只会生效一个索引？



**什么情况下适合创建索引**

- 唯一值

- 频繁作为where条件

- 经常Group By / Order By



更新一个包含索引的表需要比更新一个没有索引的表更多的时间，这是由于索引本身也需要更新。因此，理想的做法是仅仅在常常被搜索的列（以及表）上面创建索引



```sql
CREATE INDEX index_name
ON table_name (column_name)
```

**失效**

- 索引进行了表达式计算，则会失效

- 对索引使用函数，也会造成失效

- 在 OR 前的条件列进行了索引，而在 OR 后的条件列没有进行索引，那么索引会失效

- LIKE 进行模糊查询的时候，前面不能是 %





#### 分类

##### 按功能划分



- 普通索引：没有任何约束，主要用于提高查询效率。

- 唯一索引：在普通索引的基础上增加了数据唯一性的约束，在一张数据表里可以有多个唯一索引。

- 主键索引：在唯一索引的基础上增加了不为空的约束，也就是 NOT NULL+UNIQUE，一张表里最多只有一个主键索引。

- MySQL 全文索引，自带的全文索引只支持英文。我们通常可以采用专门的全文搜索引擎，比如 ES(ElasticSearch) 和 Solr。



##### 按物理实现划分

- 聚集索引

- 非聚集索引（二级索引或者辅助索引）



##### 按数据结构划分

**hash**

避免将重构的多值列设置为索引



优点

- 等值查询时效率更高



缺点

- 无序：不能进行范围查询，不支持排序,无法进行模糊查询

- 不支持联合索引的最左侧原则

- Hash冲突



**B+**

- 有序：能进行范围查询,支持排序



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



#### 联合索引

有顺序关系的索引，根据最左匹配原则进行索引应用，按顺序向右应用当应用失败时，则索引利用停止，剩余范围内的数据进行普通遍历处理

- 有序：一般数据库使用联合索引时需要按设置的顺序才会有效，但有的数据库有实现顺序颠倒时亦可使用索引，但性能会稍差

- 可缺：联合索引三个字段，但查询条件只有两个字段，可以被应用索引



假设数据表中有两列，A and B,我们将A、B设置为联合索引，然后在where语句中调用where A = ? AND B = ?，该查询语句会使用AB联合索引，调用where A = ?，该查询语句也会使用AB联合索引，但当调用where B = ？时，它将不会使用AB联合索引（**视数据库实现，也有数据库可以使用**）





### 知识点

#### 查询瓶颈

数据结构、磁盘读取（从磁盘读取 1B 数据和 1KB 数据所消耗的时间是基本一样）



#### 执行顺序

语法检查 -> 语义检查 -> 权限检查 -> 缓存 -> 解析器 -> 优化器 -> 执行器



**语法检查**：检查 SQL 拼写是否正确，如果不正确

**语义检查**：检查 SQL 中的访问对象是否存在。

**缓存**：Oracle通过共享池进行缓存，MySQL新版本中已去除



### 从集合角度理解

#### 集合算法

##### 和(Union)

**Union 和 Union All**

Union会去除重复内容,为了方便去重，默认会进行排序

Union All不去除重复内容，不进行排序，性能会有所提升




##### 差(Except)

部分场景可用Not in 代替

```sql
select * from Test except select top 3 * from Test
-- 结果为所有Test内容 - 前3条
```

##### 积(cross join)



##### 交集(INTERSECT)

```sql
select * from Test INTERSECT  select top 3 * from Test
-- 交集为前3条，会返回前三条
```

##### 应用

**判断两个表相对**

理论：集合，A 和 B的交集 === A 和 B的并集

```sql
-- 交集  A INTERSECT B
select * from A INTERSECT select * from B
-- 并集 A Union B
select * from A Union select * from B

-- 相等判断
-- A INTERSECT B  -  A Union B = 0

select case when count(*) = 0 then '相对' else '不相等' end as result
from (
  (select * from A INTERSECT select * from B)
  Except
  (select * from A Union select * from B)
)

```





### 应用

#### 字符串处理

```select owner string_agg(name,',') as names from cats group by owner ```

对数据先用owner进行分组，然后将同组的name列使用,进行拼接，返回每组一行数据

> PostgreSQL、MSSQL(2017): string_agg  MySQL: group_concat MSSQL:stuff 



#### 分布式事务

在分布式系统分库情况下，由于涉及多库操作，传统事务难以满足需求

##### 串行事务方案 + 补偿事务

多库事务按顺序执行，事务1-->事务2-->事务3,从事务1提交后，到事务3结束间均可能产生异常且可异常时间长



对每个事务增加补偿事务,即反向操作，当事务失败时，执行反向事务操作

- 通用性差
- 需要增加大量业务判断，执行特定补偿事务
- 失败时难以处理



优点：吞吐量大，事务执行完立即释放



##### 后置提交优化方案



多个事务先执行，后提交，事务1执行 --> 事务2执行 --> 事务3执行 --> 事务1提交 --> 事务2提交 --> 事务3提交



将可异常时间缩短至事务2、3的提交，大大减少可异常时间，减少异常可能性

可在后置提交优化基础上适当加入补偿事务？



所有事务执行完毕才释放，吞吐量小



