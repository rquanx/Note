\\10.182.21.12\c$\inetpub\wwwroot\wss\VirtualDirectories\portal.toyotsu-ea.com443\App_GlobalResources



200 表示从客户端发来的请求在服务器端被正常处理了。

204 表示请求处理成功，但没有资源返回。

301 表示永久性重定向。该状态码表示请求的资源已被分配了新的URI，以后应使用资源现在所指的URI。

302 表示临时性重定向。

304 表示客户端发送附带条件的请求时（指采用GET方法的请求报文中包含if-matched,if-modified-since,if-none-match,if-range,if-unmodified-since任一个首部）服务器端允许请求访问资源，但因发生请求未满足条件的情况后，直接返回304Modified（服务器端资源未改变，可直接使用客户端未过期的缓存）

400 表示请求报文中存在语法错误。当错误发生时，需修改请求的内容后再次发送请求。

401 表示未授权（Unauthorized)，当前请求需要用户验证

403 表示对请求资源的访问被服务器拒绝了

404 表示服务器上无法找到请求的资源。除此之外，也可以在服务器端拒绝请求且不想说明理由时使用。

500 表示服务器端在执行请求时发生了错误。也有可能是Web应用存在的bug或某些临时的故障。

503 表示服务器暂时处于超负载或正在进行停机维护，现在无法处理请求。

Date()

Date()构造函数是有日期字符串可能会出问题	

```javascript
// 可接受年月日时分秒参数，是本地时间。
new Date(year, month[, day[, hour[, minutes[, seconds[, milliseconds]]]]]);

```



[图片简介和前端图片优化](https://segmentfault.com/a/1190000017481260)