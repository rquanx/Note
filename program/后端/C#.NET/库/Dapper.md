#### 使用

##### 执行多个sql

```C#
var count = connection.Execute(@"insert MyTable(colA, colB) values (@a, @b)",
    new[] { new { a=1, b=1 }, new { a=2, b=2 }, new { a=3, b=3 } }
  );
```

##### In 

```C#
connection.Query("select * from table where Id in @Ids", new { Ids = new int[] { 1, 2, 3 } });
```

##### 复杂类型映射

```C#
var sql =
@"select * from #Posts p
left join #Users u on u.Id = p.OwnerId
Order by p.Id";

// post中包含有user
// post数据给post,user属性给user,最后进行属性合并,不需要分开查询
// <>定义了有两个参数分别是post和user并且返回post

var data = connection.Query<Post, User, Post>(sql, (post, user) => { post.Owner = user; return post;});
```

##### 多结果获取

```C#
var sql =
@"
select * from Customers where CustomerId = @id
select * from Orders where CustomerId = @id
select * from Returns where CustomerId = @id";
using (var multi = connection.QueryMultiple(sql, new {id=selectedId}))
{
   var customer = multi.Read<Customer>().Single();
   var orders = multi.Read<Order>().ToList();
   var returns = multi.Read<Return>().ToList();
   ...
}
```

##### 动态类型

```C#
var qqModeList = conn.Query("select Id,Name,Count from QQModel").ToList();
```

