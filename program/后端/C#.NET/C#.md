### 学习

#### 路线

[.net roadMap](https://zhuanlan.zhihu.com/p/62936714)



### 基本语法

#### 声明

##### Const vs ReadOnly

**初始化位置**

- `const`:必须在声明的同时赋值；
- `readonly`:可以在声明处赋值，也可以在静态构造方法（必须是静态构造方法，普通构造方法不行）里赋值。

**修饰对象**

- `const`:可以修饰类的字段和局部变量；
- `readonly`:只能修饰类的字段

**编译**

- `const`: 编译时常量
- `readonly`: 运行时常量




#### 命名

**骚操作**

变量名可以使用不可见的Unicode空白字符



#### 类型

##### String

**string.Empty和""**

"" 和String.Empty的区别

String.Empty是固定的静态变量，可公用，""每次都想新分配



##### Null

**初始值**

null表示不分配内存空间

```c#
String a = null;
// 初始化对象，不会分配内存空间

var a = "";
// 初始化对象，分配内存空间
```





**类型比较**

null 可以和任意类型比较

```c#
null == 1 // false
null == true // false
null == null // true
```



#### Records



#### 解构

对象实现Deconstruct方法即可被解构

```C#
// 按此格式对类定义Deconstruct方法接口
class type
{
    private typeA A;
    private typeB B;
    public void Deconstruct(out typeA a, out typeB b)
    {
        a = A;
        b = B;
    }
}



class MyDeconstruct
{
    private int A => 1;
    private int B => 2;
    public void Deconstruct(out int a, out int b)
    {
        a = A;
        b = B;
    }
}
var x = new MyDeconstruct();
var (o, u) = x;
```


#### Range

只要类可以被计数（拥有 Length 或 Count 属性），并且可以被切片（拥有一个 Slice(int, int) 方法），那么就可以用该特性

```C#
Range range = 1..4;  // 表示一个范围从索引为1的到索引为4的
string[] names = { "Archimedes", "Pythagoras", "Euclid", "Socrates", "Plato" };
foreach(var item in names[range]) {}

foreach(var item in names[1..4]) {}

// 两端均除去一个
foreach(var item in names[1..^1]) {}
// [..] == [0..^0]  全部
// [1..] == [1..^0]  除去第一个
```

#### 索引

Indexes 用于索引，例如使用 ^1 索引倒数第一个元素

使用：
1、内部维护一个数组属性，然后通过属性时是读取特定的属性
2、返回特定的计算值

```C#
// 按以下方式定义后，可以对变量进行索引访问
// 可以定义多个
<return type> this[<parameter type> index]
{
    get{
        //  自定义通过索引读取时操作
        // return the value from the specified index of an internal collection
    }
    set{
        // 自定义通过索引赋值时操作
        // set values at the specified index in an internal collection
    }
}

class StringDataStore
{
    private string[] strArr = new string[10]; // internal data storage

    public string this[int index]
    {
        get
        {
            if (index < 0 &&  index >= strArr.Length)
                throw new IndexOutOfRangeException("Index out of range");

                return strArr[index];
        }

        set
        {
            if (index < 0 ||  index >= strArr.Length)
                throw new IndexOutOfRangeException("Index out of range");

            strArr[index] = value;
        }
    }
}

StringDataStore strStore = new StringDataStore();

strStore[0] = "One";
strStore[1] = "Two";
strStore[2] = "Three";
strStore[3] = "Four";
```



##### Option Chain

**?. ?[]**

```c#
// 对于null的变量，正常
List<string> l = null;
var a = l?[0];

// 对于字典
// 读取不为null的字典中不存在的key，不可
Dictionary<string,string> d?[""]  

// 读取值为null的字典则正常忽略掉
Dictionary<string, string> d = null;
d?[""]

// 总结： ?. 、?[]  针对的是前面的变量是否为null，而不是判断是否存在key 
```





#### 枚举

C#的枚举值toString()会返回枚举的文本值

```c#
enum Test {
	abc,
    b
}
Console.WriteLine(Test.abc); // abc

Enum.GetValues(typeof(Test)) // 0,1
Enum.GetNames(typeof(Test))  // abc,a
    
```



#### 异常捕获

[多重异常捕获时，保留堆栈信息处理](https://blog.csdn.net/i_like_cpp/article/details/273819)
​	此文章有问题，需要使用innerexception构造一个新的异常
​		throw  new exception("message",old ex)
try catch 可以中断当前层次余下的操作，
要中断上一层则需要throw
log4net可以记录到innerexception的信息



####  泛型

用object来实现，但Object类型会发生装箱拆箱的操作



##### 协变和逆变

只能在接口和委托上使用

###### 协变

out根据类型参数作用，等式左边泛型参数是右边泛型参数的父类，即可赋值
out修饰后，泛型类型只能作为返回值类型

```C#
// Child继承Parent
List<Parent> ps = new List<Child>() // 不可，List<Parent>和 List<Child>不是继承关系

IEnumerable<Parent> ips = new List<Child>() // 可

ips.Select((i) => i);  // 被使用时i会是Parent,实质会拿ps的元素当作Parent类型使用，符合子类 --> 父类
// 只能作为结果值被使用，使用时会将原来的子类转化为父类使用
```

###### 逆变

in根据类型参数作用，等式左边泛型参数是右边泛型参数的子类，即可赋值
in修饰后，泛型类型只能作为入参值类型

```C#
// BB继承AA

Action<AA> aa = (i) => { };
Action<BB> bb = aa;
bb(new BB());  // 调用bb时只能传入BB类，bb的调用实质是调用了aa,BB被当作AA类型使用，符合子类 --> 父类
// 只能传入子类参数被使用，最终子类会被转化为父类使用

```




#### struct

struct是值类型

适用于小的、生命周期短的类

选用struct可以在一些特定条件下改善程序性能



#### 委托

委托本质是类

##### .Net 1.0

1、声明属性
2、实例化赋值
3、调用

##### .Net 2.0

优化多余代码，作用域得到优化

1、声明属性
2、通过delegate标记匿名函数使用
3、调用

##### .Net 3.0

**lambda**

生成类中类然后绑定到委托中

优化多余代码，delegate标记匿名方法 --> lambda(箭头函数)  -->  可省略类型声明，自动推断  -->  可省略{} --> 省略委托属性new实例，直接写lambda(自动补全new委托代码，只需写方法参数)

**Action/Func**

最多16个参数

**Linq**

延迟计算: IEnumerable + yeild --> 状态机


##### 事件

```C#
// 事件驱动，基于委托 === 埋点？
// 暴露event属性，可以被+=绑定并且在特定事件调用
public event Action Handle;
```


#### 函数

##### 构造函数

在调用构造函数前已经分配好对象，可以使用this，构造函数进行初始化



##### 指定参数

```c#
a.(para2: xxxx); // 给para2指定参数，不影响其他参数
```



##### 不限参数

``params object[]ps`

**作用**

```c#
// 当传递多个参数时，自动将参数合并成数组
pass(1,2,new List() { 1,2 }) // ps = [1,2,new List(){1,2}]

// 当传入一个object[]时，直接用传入的object[]
pass(new object[] {1,2,new List() { 1,2 }}) //  ps = [1,2,new List(){1,2}]

// 当存在有前置参数，再传入一个object[]时，直接用传入的object[]
pass("a",new object[] {1,2,new List() { 1,2 }}) 
// a = ""; ps = [1,2,new List(){1,2}]
// new object[] {}  --> param object[] ps    是不会产生再嵌套的

// 当传入多个参数，即使有object[]会被处理为嵌套
pass("a",
     new object[] {1,2,new List() { 1,2 }}，
     new P{})
// a = ""; ps = [[1,2,new List(){1,2}],{1,2}]

```



##### 参数修饰符

**ref**

- 按引用类型进行传递

- 属性不是变量不能作为ref

- 需要初始化

**out**

- 按引用类型进行传递

- 属性不是变量不能作为out

- 不需要初始化

应用：当方法有多个返回值时，out非常有用





##### 通用方法

**Equals**

用于判断变量是否一致，引用判断



### 面向对象

#### 修饰符

- `public`
- `protected`:类或子类可访问
- `virtual`: 虚函数，有默认实现主体，可以被子类`override`
- `abstract`:抽象方法，没有默认实现主体，子类必须实现



#### 类

##### 执行顺序

父类 --> 子类 --> 静态块 --> 静态字段 --> 非静态块 --> 非静态字段 --> 构造器 --> 方法

##### 静态构造函数

没有参数、没有修饰符、自动在合适的时候被调用，可以被用来初始化静态变量





#### 抽象类

一个类继承了某个抽象类表示它“是什么”

abstract 方法会要求子类重写



特点：抽象类中可以包含字段，构造函数，析构函数，静态成员，常量，接口不可以

抽象类里可以包含两种抽象成员，分别是`抽象方法`声明和`抽象属性`，同时可以包含其他非抽象成员





#### 接口

实现了某个接口表示它“有什么功能”或者“会做什么事，接口只能定义方法



#### 继承

构造器Constructor不能被继承

静态属性继承后会被共用，修改会影响



##### 泛型约束

**where**

类型约束,可以用来约束泛型

- `where T : struct` ：值类型限制，限制类型参数T必须继承自`System.ValueType`。

- `where T : class`： 引用类型限制，限制类型参数T必须是引用类型，也就是不能继承自`System.ValueType`。

- `where T : new()`：限制类型参数T必须有一个缺省的构造函数，当与其他约束一起使用时，new() 约束必须最后指定

- `where T : NameOfClass`： 限制类型参数T必须继承自某个类或实现某个接口。



### 对象

#### ExpandoObject

可以通过 instance.field来读取和设置值



动态可扩展对象，实现了`IDictionary<string, object>`接口，`(IDictionary<string, object>)`强转后，可以通过instance[field]来读取或设置值





### 高级

#### 表达式目录树

```C#
Expression<Func<string, bool>> e = (s) => s.Length > 0;

// (a,b)=>a*3+b*4 中表达式会被拆分处理  a * 3和b * 4然后再拆分为 a  3和b 4
```

##### 应用

- 表达式目录树拼接 + 反射 + 泛型缓存  --> 自动映射
- SQL解析
- any



##### ExpressionVisitor

继承Visitor,然后重写内部的一些方法，会在遍历时调用，然后将值处理成目标值

**方法？**

- VisitBinary: 二元运算符

- VisitConstant: 常量



**节点类型**

- Parameter: 声明参数

- Property: 声明属性

- Lambda

- Add： 加法运算

- Subtract: 减

- Multiply： 乘

- Assign： 赋值

- Call： 调用方法



**运算符**

- ExpressionType.Add：加法运算符



#### IL

中间语言（Intermediate Language）

C#编译后的代码（类似于汇编？），介于机器码和高级代码间，目的：机器的兼容，在运行时再编译为机器码？

IL会在CLR上运行



##### **Metadata**

C#编译后会产生IL和Metadata，Metadata记录了代码的元数据



**程序集的说明**

- 标识（名称、版本、区域性、公钥）。
- 导出的类型。
- 该程序集所依赖的其他程序集。
- 运行所需的安全权限。



**类型的说明**

- 名称、可见性、基类和实现的接口。
- 成员（方法、字段、属性、事件、嵌套的类型）。
- 属性。
- 修饰类型和成员的其他说明性元素。



反射实际就是读取Metadata里的信息



#### 扩展方法

##### 要求

1、在静态类中定义

2、第一个参数必须写this

3、不能与调用方在同一个类中



#### Attribute

对类、属性、字段、方法进行额外标记

##### 应用

标记后可以通过反射进行特定处理

- IOC：类构造参数、函数参数、示例属性 注入
- ORM：标记表名、字段名，自动拼接SQL
- 别名：标记别名、显示名等
- 数据校验：非空等规则校验，校验抽离在对象内



##### 框架提供

`AuthorizeAttribute`：MVC提供的特性，可以用来进行校验

`handleErrorattribute`：MVC提供的特性

`HttpGet/Post`: 标记api请求



####  反射



```c#
Type t = typeof(T) // 获取Type类型的变量，记录类的类型
var constructors = t.GetConstructors() //获取所有的构造函数
var interfaces = t.GetInterfaces() // 获取继承的所有接口
var paramsInfos = constructors[0].GetParameters() // 获取构造函数的参数信息
parameterInfo.ParameterType // 读取参数信息的类型
```



##### Type

**泛型类**

`makrgenerictype`后再进行实例化



**BaseType**

读取基类



##### Assembly

- 动态加载DLL
  - Load 当前路径下加载dll
  - LoadFrom  当前路径下加载dll
  - LoadFile  指定特定路径下加载Dll
- 读取DLL中的信息（Type.....）



**读取Assembly**

`Assembly`是懒加载的，`AppDomain.CurrentDomain.GetAssemblies`只会取到已加载的Dll，可能有遗漏



##### propertyinfo

获取属性信息时得到的操作对象



获取属性对象：`Getproperties`

设置属性值：`setvalue`

读取属性值：`getvalue`



静态属性和普通属性一样读取





##### fieldinfo

获取字段信息时得到的操作对象

获取字段对象：`Getfields`

静态字段和普通字段一样读取



##### Method

**bindingflags**

通过配置`bindingflags`参数可以强行读取私有方法



**Getmethod** 

根据方法名获取方法，可通过传入type参数来查找方法重载

静态方法：同样可通过`getmethod`读取调用

重载方法：

```C#
// 方法重载时根据参数查找
instance.Getmethod("Name",new Type[] { typeof(int) });
```

泛型方法：

`getmethod`后通过`makegenericmethod`，设置/生成泛型方法，然后进行调用



##### 技巧

**类型转换**

(Type) 和 as Type的区别

```C#
var type = typeof(string);

var t1 = (int)Activator.CreateInstance(type);   // 失败时抛出异常
var t2 = Activator.CreateInstance(type) as int; // 失败时t2为null
```





**表达式树**

通过代码和lambda，在运行时计算出一个表达式树，并且compiler后生成一个委托可以被使用

应用：`SQLBuilder`等内部DSL



**泛型缓存**

泛型类在执行时会生成一个临时类存在内存中，通过设置静态属性，可以将一些计算数据存储起来进行复用

- 两个类的数据转换
- 缓存反射结果

优化：通过编译将部分泛型提前编译？会占用内存，但速度会加快



静态构造函数利用：利用静态构造函数进行缓存只执行一次，线程安全?

注意：实例化或查找实现接口类，可能由于dll懒加载,导致遗漏



**反射缓存**

反射 --> 表达式树 + 字典缓存 --> 表达式树 + 泛型缓存



#### 集合 

##### DataTable/DataRow



**DataRow创建**

```c#
// 根据特定的数据产生
object[] objs = dataRow.itemArray;
dataRow.Table.Rows.Add(objs);


// 自动产生空行，如果列存在not null等限制，会无法创建
dataRow.Table.Rows.Add()
```





**注意点**

- 单元格存在readonly可导致无法赋值

- 单元格值长度有max限制，会导致无法赋值

- 单元格有Not Null限制，导致无法创建空白Row



#### 多线程

##### Task

**Task.Factory.StartNew**

内部如果是async的话，不会等待

1、改成async function，不套Task.Factory.StartNew
2、使用Task.Run



##### void vs Task

```C#
async void Bar();// 不可等待，调用后就不管了

async Task Foo(); // 可等待
```











### 知识点

#### 装箱、拆箱

装箱：把值类型转换成引用类型

拆箱：把引用类型转换成值类型



#### ICloneable

 ICloneable接口的Clone()方法，并调用MemberwiseClone()方法来实现浅克隆



#### Using

- 可以在 using 语句之中声明对象。
  - using 语句中使用的对象必须实现 IDisposable 接口。此接口提供了 Dispose 方法，该方法将释放此对象的资源。

- 命名空间引入alias



#### 区分类和基本类型

```c#
type.IsPrimitive // int bool double...
Type.Equals(typeof(string)) // 字符串要单独处理
```





#### 装饰器模式

通过类继承实现

1、定义父类

2、实际操作类继承付类

3、装饰类 实现父类，增加属性存储操作类，实现的方法中调用操作类的方法

4、实例化后，将操作类赋值给装饰类，调用装饰类的方法

5、装饰类与操作类间可通过继承嵌套多层，最终实例化时将操作类赋值给需要的装饰类



#### 内存泄漏

##### Event订阅

**描述**：A类劫持了B类的函数，且A类生命周期较长，会造成A无法释放



**解决**

- 注销订阅事件

- 使用弱句柄（weak-handler）模式，类似Weak map?

- 使用匿名函数进行订阅，并且不要捕获任何类成员



##### 在匿名方法中捕获类成员

引用对象这个事情在匿名方法中捕获类成员



```c#
public class MyClass

{

  private JobQueue _jobQueue;

  private int _id;

 

  public MyClass(JobQueue jobQueue)

  {

    _jobQueue = jobQueue;

  }

 

public void Foo()

 {

    _jobQueue.EnqueueJob(() =>

    {
      Logger.Log($"Executing job with ID {_id}");

      // do stuff 

});



    // 解决

    var local = _id;

   // ... 

  }

}
```





**解决**

将值分配给局部变量，不会有任何内容被捕获，并且避免了潜在的内存泄漏



##### 静态变量

静态变量不会被回收，如果静态变量是类似List，可以在运行时不断增加，但是不会被回收，可能会导致



##### 缓存变量



##### 不停止的线程

不停止的线程或引用启动它的类



##### Alloc

手动分配内存后，需手动释放或添加Dispose



##### 添加Dispose无效

使用using() {}



#### 函数传递

```c#
// 方法委托，存储函数

// === Func(Type) { return object; }

public Func<Type, object> GetParameterInstance { get; set; }
```





#### 拓展

```c#
DeliveryStatus.YQD.GetRemark();

public enum DeliveryStatus
    {
        [Remark("SignCount")]
        YQD = 01,
        [Remark("AssignCheckCount")]
        YPY = 02,
        [Remark("CheckCount")]
        YYF = 03,
        [Remark("ToSignCount")]
        YQY = 04,
        [Remark("ToReceiptCount")]
        YSK = 05,
        [Remark("RejectCount")]
        YJS = 06
    }

    [AttributeUsage(AttributeTargets.Field, AllowMultiple = false, Inherited = true)]
    public class RemarkAttribute : Attribute
    {
        public string Remark { get; private set; }

        public RemarkAttribute(string remark)
        {
            this.Remark = remark;
        }
    }

    public static class AttributeExtend
    {
        public static string GetRemark(this Enum value)
        {
            var type = value.GetType();
            var field = type.GetField(value.ToString());
            if (field.IsDefined(typeof(RemarkAttribute), true))
            {
                RemarkAttribute attr = (RemarkAttribute)field.GetCustomAttribute(typeof(RemarkAttribute), true);
                return attr.Remark;
            }
            else
            {
                return value.ToString();
            }
        }
    }
```





#### HTTP
响应可自定义响应头

#### 多线程

##### .Net 1.0、1.1

**Thread**

- 灵活：提供丰富、底层的api
- 安全、管控差：没有管控，可以随意产生无数的线程
- 响应差异：本质会去操作计算机系统底层api，是由计算机系统进行控制的，实际响应和预想间存在一定差异

##### .Net 2.0

**ThreadPool**
进行池化管理，避免频繁的申请和销毁，且自动进行池内资源管理（扩容、销毁），但提供API太少，线程顺序控制能力弱

- 线程复用
- 管控最大线程数量

##### .Net 3.0

**Task**

- 底层利用线程池
- 包含丰富API

Task.WaitAll(TaskList): 阻塞主线程等待所有Task完成
TaskFactory.ContinueWhenAll: 不阻塞主线程，但一堆Task完成后执行


**Parallel**

进行多线程操作，同时主线程也作为其中一个进行执行，不必浪费主线程等待时间，可以通过Options控制并发数量

##### 线程安全

多线程同修改一个对象时容易出现问题
> 多线程对List进行add，可能会产生数据丢失，多个线程同时往同一个内存存数据，导致覆盖丢失

##### 锁

**lock**
语法糖，{}内的代码操作，任意时刻只会由一个线程操作，多的进行排队
```c#
lock(object) { }
```
Lock对象一般建议是private、static、readonly的，唯一且防止被其他因素影响（看实际情况）
原理：锁定对象内存引用地址，占用前后进行标记，阻止其他线程占用

注1：字符串的内存引用可能共用，所以导致锁字符串时会出现问题
注2：泛型对同一个类型的泛型只会产生一个内存类，可能存在共用锁

##### Async/Await

同一个函数中的多个await，每次遇到新的await，所有剩余的代码都会交给新的线程进行处理  




#### 获取Post数据

System.Web.HttpContext.Current.Request.Form["key"]

#### 文件上传接收

```c#
[HttpPost]
        public HttpResponseMessage ReceiveFile()
        {
           var f = HttpContext.Current.Request.Files[0];
           return ReturnResponseMsg.ResponseMsg<string>("成功", 1);
        }

 private async Task GetFile()
        {
            if (!Request.Content.IsMimeMultipartContent())
                throw new HttpResponseException(HttpStatusCode.UnsupportedMediaType);

            var provider = new MultipartMemoryStreamProvider();
            await Request.Content.ReadAsMultipartAsync(provider);
            var fileName = provider.Contents[0].ToString();
            var file = provider.Contents[1];
            var buffer = await file.ReadAsByteArrayAsync();
            var m = new MemoryStream(buffer);
        }

```

#### 文件发送
[Webapi返回文件](https://blog.csdn.net/lbx_15887055073/article/details/82765059)  
> 会遗留文件

```c#
        private void FlushFile(MemoryStream ms, string type)
        {
            Context.Response.ClearContent();
            Context.Response.ClearHeaders();
            Context.Response.Buffer = true;
            
            // 跨域需要设置响应头
            Context.Response.ContentType = "application/octet-stream";
            Context.Response.AddHeader("Content-Disposition", string.Format("attachment; filename={0}." + type,
                HttpUtility.UrlEncode("港口作业包干费客户对账清单" + "_" + DateTime.Now.ToString("yyyyMMddHHmmssfff"), System.Text.Encoding.UTF8)));
            Context.Response.BinaryWrite(ms.ToArray());
            Context.Response.Flush();
            // Context.Response.End(); // End可能会引起线程异常

            // 不会产生线程问题？ SuppressContent必须要有，否则返回的数据可能会由于多出数据引起异常，无法使用，例返回word文档无法打开
            // Context.Response.SuppressContent = true;  // Gets or sets a value indicating whether to send HTTP content to the client.
            // Context.ApplicationInstance.CompleteRequest();
        }

```

#### Json

[json对象后台处理](https://www.cnblogs.com/zxtceq/p/6610214.html)
[同上](https://www.cnblogs.com/Donnnnnn/p/6020353.html)

```c#
// 1
using Newtonsoft.Json
string jsonText = "{\"zone\":\"海淀\",\"zone_en\":\"haidian\"}";
JObject jo = (JObject)JsonConvert.DeserializeObject(jsonText);
string zone = jo["zone"].ToString();
string zone_en = jo["zone_en"].ToString();

/*
jobject对象  json["x"]后如果值得类型是jtoken
	jtoken使用。Value<string>("key")读取
*/

// 定义modal类
namespace JsonReceive
{
    public class PerformanceModel
    {
        public string indexName { get; set; }
        public int rowNum { get; set; }
        public object data { get; set; }
    }
}

JavaScriptSerializer json = new JavaScriptSerializer();
var joArray = json.Deserialize<Dictionary<string, object>>(jsonText);
Dictionary<string, List<PerformanceModel>> dic = 
    new Dictionary<string,List<PerformanceModel>>();
foreach (var jo in joArray)
{
    string json2 = JsonConvert.SerializeObject(jo.Value);
    dic.Add(jo.Key, JsonConvert.DeserializeObject<List<PerformanceModel>>(json2));
}
string tableName;
int rowNum;
object data;
foreach (var rowData in dic)
{
	tableName = rowData.Key;
    foreach(var objData in rowData.Value)
    {
     	rowNum = objData.rowNum;
        data = objData.data;
    }
}


```





### ASP.NET

框架

label属性  提示标题title === tooltip   均有效



#### HelpPage

说明文档xml更新

1、项目属性设置-->生成-->生成的xml路径

2、将xml拷贝至app_data



#### Httpmodule

编写代码，继承http，拦截请求或在预处理，asp.net的请求流程

```xml
webconfig 增加
<modules>
<add name="随意"  type="YHSD.TTC.HttpModule.Statement" /> 
</modules>


dll存放在bin文件夹中，type要到具体的类
```

#### ascx
通过cs代码在后端，将html内容通过字符串方式拼接然后返回

##### 嵌入代码
产生cs代码对象的方式，在.g.cs？的方式下
1、runat="server" 就是有cs代码,通过cs创建一个对象然后add到html树中
2、<%=xxx%>  拼接时直接嵌入变量
3、<%# %> 生成databind方法



##### 第三方控件使用：
下载dll-->dll放置好位置(bin下？)-->引用dll-->重启vs？-->toolbox choose item --> browser加入dll--> 直接拖拽即可



### 应用

#### StringBuilder

默认容量是16,当字符串超过容量时才会扩容

> 对于简单的字符串连接操作，在性能上stringbuilder不一定总是优于string
>
> 因为stringbulider对象的创建也消耗大量的性能，在字符串连接比较少的情况下，过度滥用stringbuilder会导致性能的浪费而非节约，只有大量无法预知次数的字符串操作才考虑stringbuilder的使用

#### ORM

##### In的处理

```C#
// in会被拆分拼接为key + i的SQL
connection.Query<int>($@"
	select * from (
		select 1 as Id union all 
		select 2 union all 
		select 3) as X 
where Id in @Ids", new { Ids = new int[] { 1, 2, 3 } });

// Will be translated to:

// select * from (
//		select 1 as Id union all 
//		select 2 union all 
//      select 3) as X 
// where Id in (@Ids1, @Ids2, @Ids3)" 
// @Ids1 = 1 , @Ids2 = 2 , @Ids2 = 3
```



connection.Query<int>("select * from (select 1 as Id union all select 2 union all select 3) as X where Id in @Ids", new { Ids = new int[] { 1, 2, 3 } });



// Will be translated to:



select * from (select 1 as Id union all select 2 union all select 3) as X where Id in (@Ids1, @Ids2, @Ids3)" // @Ids1 = 1 , @Ids2 = 2 , @Ids2 = 3

\```



##### Join表实现

- 建视图
- 表达式目录树

##### SQL注入

将参数换成SqlParameter对象来进行参数化修正



#### Dynamic

```c#
var a = new { uu = "123", i = 123 };
var type = a.GetType();
var property = type.GetProperty("uu");
var value = property.GetValue(a);
```





#### 动态载入DLL

```c#
//载入dll中的函数
//Assembly asm = Assembly.Load(strDllPath);//载入当前根文件夹的dll
Assembly asm = Assembly.LoadFile(@"F:\WorkSpace\VS測试代码\反射測试001\反射message方法\reflect\reflect\bin\Debug\reflect.dll");//依据dll文件实际路径载入

//用类型的命名空间和类获得类型
System.Type FromClass = asm.GetType("reflect.Form1");

//须要实例化类型,才干够使用,參数能够人为的指定,也能够无參数,静态实例能够省略
Object obj = System.Activator.CreateInstance(FromClass);

//通过方法名称获得方法(调试走到以下这一步的时候，就能够弹出“动态载入Dll測试”这个消息了)
MethodInfo method = FromClass.GetMethod("TestReflect");

//获取TestReflect函数的返回值，在这里会获取到"TestReflect返回值"，假设没有返回值，能够省略这一步
object o = method.Invoke(obj, new object[] { });
```


### 资料
#### 博客

[老赵](http://blog.zhaojie.me/)

### 问题

#### app_global.asax.dll 和app_global.asax.compiled

文件作用???



#### CodeDOM（csc.exe not found）

CodeDomProvider低版本存在没有复制csc.exe bug，更新新版即可

> 会修改webconfig中的codeDom



#### 发布后提示各种dll依赖找不到，但是文件却有的时候

彻底清理bin再重新打包



#### 调试时一直说找不到dll且debug模式却用的release的路径

重启vs



#### system.badimageformatexception 未能加载文件或程序集问题解决

[system.badimageformatexception 未能加载文件或程序集问题解决](https://blog.csdn.net/weixin_33881753/article/details/85745198)

> 原因是项目CPU默认X86我的系统是X64，将目标平台改为 Any CPU就可以了;

#### 包出错
\bin\roslyn\csc.exe
找不到，语法编译器问题，nuget重装、重新生成即可



#### vs打开项目后全部报错，提示找不多类

可能是项目配置改了，记录：ServiceMe.Apps.CRM.Core.csproj



#### WebServices 处理请求时出错

```xml
<!--可能是返回的json文本太长了，于是在webconfig加了如下的配置：-->

<system.web.extensions>
    <scripting>
        <webServices>
           <!--单位为字节-->
           <jsonSerialization maxJsonLength="1024000" />
         </webServices>
   </scripting>
</system.web.extensions>
```

