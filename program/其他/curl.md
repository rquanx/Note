### 简介

curl 是常用的命令行工具，用来请求 Web 服务器。它的名字就是客户端（client）的 URL 工具的意思

```bash
curl https://www.example.com # 发出get请求
```



### 参数

#### -A

User-Agent

```bash
curl -A 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.100 Safari/537.36' https://google.com

curl -A '' https://google.com # 移除User-Agent
```

#### -b

发送cookies

```bash
curl -b 'foo1=bar;foo2=bar2' https://google.com
curl -b cookies.txt https://www.google.com # cookies取自文件    里面是服务器设置的 Cookie（通过-c可获取）
```

#### -c

将服务器设置的 Cookie 写入一个文件

```bash
curl -c cookies.txt https://www.google.com
```

#### -d

用于发送 POST 请求的数据体

- HTTP 请求会自动加上标头Content-Type : application/x-www-form-urlencoded
- 自动将请求转为 POST 方法，因此可以省略-X POST

```bash
curl -d'login=emma＆password=123'-X POST https://google.com/login
# 或者
curl -d 'login=emma' -d 'password=123' -X POST  https://google.com/login

curl -d '@data.txt' https://google.com/login # 读取本地文件作为body
```

#### --data-urlencode

等价于 -d，但会对数据进行 URL 编码

```bash
curl --data-urlencode 'comment=hello world' https://google.com/login    # 发送的数据hello world之间有一个空格，需要进行 URL 编码
```

#### -e

设置 HTTP 的标头Referer，表示请求的来源

```bash
curl -e 'https://google.com?q=example' https://www.example.com
```

#### -F

用来向服务器上传二进制文件


```bash
curl -F 'file=@photo.png' https://google.com/profile 
# HTTP 请求加上标头Content-Type: multipart/form-data
# 文件photo.png作为file字段上传

curl -F 'file=@photo.png;type=image/png' https://google.com/profile
# 指定mime

curl -F 'file=@photo.png;filename=me.png' https://google.com/profile
# 指定文件名
```

#### -G

构造 URL 的查询字符串,get请求query

```bash
curl -G -d 'q=kitties' -d 'count=20' https://google.com/search # 没有-G 会变为Post

curl -G --data-urlencode 'comment=hello world' https://www.example.com # 结合--data-urlencode 进行编码
```

#### -H

添加/设置 HTTP 请求的标头

```bash
curl -H 'Accept-Language: en-US' https://google.com
curl -H 'Accept-Language: en-US' -H 'Secret-Message: xyzzy' https://google.com
```

#### -i

打印出服务器回应的 HTTP 标头

```bash
curl -i https://www.example.com
```

#### -I

向服务器发出 HEAD 请求，然会将服务器返回的 HTTP 标头打印出来

```bash
curl -I https://www.example.com
curl --head https://www.example.com  # --head === -I
```

#### -k

跳过 SSL 检测。

#### -L

让 HTTP 请求跟随服务器的重定向。curl 默认不跟随重定向

#### --limit-rate

限制 HTTP 请求和回应的带宽，模拟慢网速的环境

```bash
curl --limit-rate 200k https://google.com # 将带宽限制在每秒 200K 字节。
```

#### -o

将服务器的回应保存成文件，等同于wget命令

```bash
curl -o fileName https://www.example.com
```

#### -O

将服务器回应保存成文件，并将 URL 的最后部分当作文件名

#### -s

不输出错误和进度信息

#### -S

指定只输出错误信息，通常与-s一起使用

#### -u

设置服务器认证的用户名和密码

```bash
curl -u '账号:密码' https://google.com/login

curl https://bob:12345@google.com/login # 会自动识别账号、密码
```

#### -v / --trace

输出通信的整个过程，用于调试
--trace还会输出原始的二进制数据

#### -x

指定 HTTP 请求的代理

```bash
curl -x socks5://james:cats@myproxy.com:8080 https://www.example.com # 请求通过myproxy.com:8080的 socks5 代理发出
```

#### -X

指定 HTTP 请求的方法

```bash
curl -X POST https://www.example.com
```

