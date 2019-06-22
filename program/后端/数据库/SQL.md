### SQLServer


#### 存储过程

##### 小知识

多条sql语句用;连接

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


#### 博客

[sql防注入](https://www.zhihu.com/question/22953267 )


