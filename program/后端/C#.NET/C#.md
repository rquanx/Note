### 学习

#### 路线

[.net roadMap](https://zhuanlan.zhihu.com/p/62936714)



### 基本语法

#### 命名

**骚操作**

变量名可以使用不可见的Unicode空白字符



#### 类型

##### Null

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



#### struct

struct是值类型

适用于小的、生命周期短的类

选用struct可以在一些特定条件下改善程序性能





### 面向对象



#### 抽象类

一个类继承了某个抽象类表示它“是什么”

特点：抽象类中可以包含字段，构造函数，析构函数，静态成员，常量，接口不可以

#### 接口

实现了某个接口表示它“有什么功能”或者“会做什么事，接口只能定义方法



#### 继承

静态属性继承后会被共用，修改会影响



##### 泛型约束

**where**

类型约束,可以用来约束泛型



where T : struct 限制类型参数T必须继承自System.ValueType。

where T : class 限制类型参数T必须是引用类型，也就是不能继承自System.ValueType。

where T : new() 限制类型参数T必须有一个缺省的构造函数

where T : NameOfClass 限制类型参数T必须继承自某个类或实现某个接口。



以上这些限定可以组合使用



###  反射



```c#
Type t = typeof(T) // 获取Type类型的变量，记录类的类型
var constructors = t.GetConstructors() //获取所有的构造函数
var interfaces = t.GetInterfaces() // 获取继承的所有接口
var paramsInfos = constructors[0].GetParameters() // 获取构造函数的参数信息
parameterInfo.ParameterType // 读取参数信息的类型
```



### 集合 

#### DataTable/DataRow



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



### 多线程

#### Task

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





### 问题



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

