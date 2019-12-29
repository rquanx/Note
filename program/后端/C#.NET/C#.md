### 基本语法



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

### 知识点

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


// 2
"{\"salesIndexInfo\":[{\"indexName\":\"Discount Rate(%)\",\"rowNum\":\"15\",\"data\":[\"1\",\"2\",\"3\",\"4\",\"5\",\"6\",\"7\",\"\",\"\",\"\",\"\",\"\",\"\",\"\",\"\",\"\",\"\",\"\",\"\",\"\",\"\",\"\",\"\",\"\"]},{\"indexName\":\"Discount Rate(%)\",\"rowNum\":\"16\",\"data\":[\"1\",\"2\",\"3\",\"4\",\"5\",\"6\",\"7\",\"\",\"\",\"\",\"\",\"\",\"\",\"\",\"\",\"\",\"\",\"\",\"\",\"\",\"\",\"\",\"\",\"\"]}],\"costIndexHeadInfo\":[{\"indexName\":\"Duty on royalty(%)\",\"rowNum\":\"100\"},{\"indexName\":\"Commission and PPV(%)\",\"rowNum\":\"101\"},{\"indexName\":\"Royalty(%)\",\"rowNum\":\"102\"},{\"indexName\":\"Royalty add back(%)\",\"rowNum\":\"103\"},{\"indexName\":\"Selling Commission(%)\",\"rowNum\":\"104\"},{\"indexName\":\"Freight in(%)\",\"rowNum\":\"105\"},{\"indexName\":\"Stock loss(%)\",\"rowNum\":\"106\"},{\"indexName\":\"Stock provision(%)\",\"rowNum\":\"107\"},{\"indexName\":\"Freight out(%)\",\"rowNum\":\"108\"}],\"scrIndexInfo\":[{\"indexName\":\"Footwear(%)\",\"rowNum\":\"120\"},{\"indexName\":\
"Apparel(%)\",\"rowNum\":\"121\"},{\"indexName\":\"Accessary(%)\",\"rowNum\":\"122\"}],\"opexIndexHeadInfo\":[{\"indexName\":\"In-Store Communication Rate(%)\",\"rowNum\":\"300\"},{\"indexName\":\"Training expenses per Year\",\"rowNum\":\"301\"},{\"indexName\":\"Travel Expenses per Year\",\"rowNum\":\"302\"},{\"indexName\":\"Normal Repair Rate(%)\",\"rowNum\":\"303\"},{\"indexName\":\"IT Servise Fee per Year\",\"rowNum\":\"304\"},{\"indexName\":\"Communication Fee per Month\",\"rowNum\":\"306\"},{\"indexName\":\"Public Resouce Fee per Month\",\"rowNum\":\"307\"},{\"indexName\":\"Credit Card/Check Fee Rate(%)\",\"rowNum\":\"308\"},{\"indexName\":\"Entertainment Fee per Month\",\"rowNum\":\"309\"},{\"indexName\":\"Other Taxes Rate(%)\",\"rowNum\":\"310\"}],\"opexIndexInfo\":[{\"indexName\":\"Other personnel paid\",\"rowNum\":\"403\"},{\"indexName\":\"External EDP/Account./Warehouse\",\"rowNum\":\"419\"},{\"indexName\":\"Bank Costs\",\"rowNum\":\"426\"},{\"indexName\":\"Insurance\",\"rowNum\":\"428\"},{\"indexNam
e\":\"External Visual Merchandising\",\"rowNum\":\"431\"},{\"indexName\":\"Other Operating Expenses\",\"rowNum\":\"434\"},{\"indexName\":\"Other Operating Income\",\"rowNum\":\"435\"}],\"assumptionIndexHeadInfo\":[{\"indexName\":\"Salary Increase Rate(%)\",\"rowNum\":\"322\"},{\"indexName\":\"Commission Rate(%)\",\"rowNum\":\"323\"},{\"indexName\":\"Fix Commission per Month\",\"rowNum\":\"320\"},{\"indexName\":\"Social Insurance Base commission\",\"rowNum\":\"324\"},{\"indexName\":\" Social Insurance Rate(%)\",\"rowNum\":\"325\"},{\"indexName\":\"Outing Fee per Year\",\"rowNum\":\"480\"},{\"indexName\":\"Personal Filing Fee per Year\",\"rowNum\":\"481\"},{\"indexName\":\"Retail Awards per Year\",\"rowNum\":\"482\"},{\"indexName\":\"Annual Dinner per Year\",\"rowNum\":\"483\"},{\"indexName\":\"Shopping Bags Rate(%)\",\"rowNum\":\"484\"},{\"indexName\":\"Uniform Cost per Year\",\"rowNum\":\"485\"},{\"indexName\":\"Additional Fixture per Month\",\"rowNum\":\"486\"},{\"indexName\":\"Stationaries per Year\",\"rowNu
m\":\"487\"},{\"indexName\":\"Traffic Count Rental per Year\",\"rowNum\":\"488\"},{\"indexName\":\"Mystery Shopper per Year\",\"rowNum\":\"489\"},{\"indexName\":\"BPO Cost per Year\",\"rowNum\":\"490\"},{\"indexName\":\"Store Operation Rate(%)\",\"rowNum\":\"491\"},{\"indexName\":\"Customer Service Rate(%)\",\"rowNum\":\"492\"}],\"assumptionIndexInfo\":[{\"indexName\":\"Overtime Rate(%)\",\"rowNum\":\"343\"}]}"
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
下载dll-->dll放置好位置(防止bin下？)-->引用dll-->重启vs？-->toolbox choose item --> browser加入dll--> 直接拖拽即可



### 问题

#### 包出错
\bin\roslyn\csc.exe
找不到，语法编译器问题，nuget重装、重新生成即可