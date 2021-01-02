#### 资料

[SSH教程](https://wangdoc.com/ssh/index.html)

#### 简述

**概述**

历史上，网络主机之间的通信是不加密的，属于明文通信。一个典型的例子就是服务器登录，登录的时候需要将用户输入的密码传给服务器，如果这个过程是明文通信，就意味着传递过程中，线路经过的中间计算机都能看到密码，这是很可怕的。

SSH 就是为了解决这个问题而诞生的，它能够加密计算机之间的通信，保证不被窃听或篡改。它还能对操作者进行认证（authentication）和授权（authorization）。明文的网络协议可以套用在它里面，从而实现加密。



**定义**

SSH（Secure Shell 的缩写）是一种网络协议，用于加密两台计算机之间的通信，并且支持各种身份验证机制。
> 主要用于保证远程登录和远程通信的安全，任何网络服务都可以用这个协议来加密



**场景**
SSH 是 Linux 系统的登录工具，现在广泛用于服务器登录和各种加密通信



**实现**

`SSH 1`:1995年，芬兰赫尔辛基工业大学的研究员 `Tatu Ylönen` 设计了 SSH 协议的第一个版本（现称为 `SSH 1`），同时写出的第一个实现

`SSH 2`:由于`SSH 1`存在漏洞，于1996年提出，不兼容`SSH 1`的付费软件

`OpenSSH`:1999年，OpenBSD 的开发人员开发的`SSH 2` 协议的开源实现,后被移植到其他操作系统，成为最流行的 `SSH` 实现。目前，Linux 的所有发行版几乎都自带 OpenSSH

> 现在，SSH-2 有多种实现，既有免费的，也有收费的



#### 基本信息

##### 加密方式

密钥（key）是一个非常大的数字，通过加密算法得到。对称加密只需要一个密钥，非对称加密需要两个密钥成对使用，分为公钥（public key）和私钥（private key）

SSH 密钥登录采用的是非对称加密




##### 服务器密钥

SSH 服务器公钥的哈希值,服务器指纹可以防止有人恶意冒充远程主机

```bash
# 删除公钥指纹记录
$ ssh-keygen -R hostname
```



#### 架构

SSH 的软件架构是服务器-客户端模式（Server - Client）

OpenSSH 的客户端软件是 `ssh`，服务器软件是 `sshd`

##### 客户端

OpenSSH 的客户端是二进制程序 ssh。它在 Linux / Unix 系统的位置是`/usr/local/bin/ssh`，Windows 系统的位置是`\Program Files\OpenSSH\bin\ssh.exe`
```bash
# 安装
# Ubuntu 和 Debian
$ sudo apt install openssh-client

# CentOS 和 Fedora
$ sudo dnf install openssh-clients

$ ssh -h
```

###### 端口

ssh 默认连接服务器的22端口，-p参数可以指定其他端口
```bash
$ ssh -p 8821 foo.com
```

###### 登录服务器

```bash
$ ssh hostname
# hostname是主机名，它可以是域名，也可能是 IP 地址或局域网内部的主机名
# 不指定用户名的情况下，将使用客户端的当前用户名，作为远程服务器的登录用户名 ==> ssh hostname === ssh {当前登录用户}@hostname


# 指定用户名
$ ssh user@hostname

# 不用@连接
$ ssh -l username hostname
```



**连接流程**

1、第一次连接某一台服务器时（指纹陌生）会提示是否认识，是否需要连接

2、连接后，ssh会保存服务器指纹

> ssh 会将本机连接过的所有服务器公钥的指纹，都储存在本机的~/.ssh/known_hosts文件中



##### 服务端

```bash
# 安装
# Debian
$ sudo aptitude install openssh-server

# Red Hat
$ sudo yum install openssh-server

# 启动，一般安装后会随系统自动启动
sshd
```


```bash
# systemctl控制
# 启动
$ sudo systemctl start sshd.service

# 停止
$ sudo systemctl stop sshd.service

# 重启
$ sudo systemctl restart sshd.service

# 让 sshd 在计算机下次启动时自动运行
$ sudo systemctl enable sshd.service
```



**配置文件**

sshd 的配置文件在/etc/ssh目录，主配置文件是sshd_config，此外还有一些安装时生成的密钥。

/etc/ssh/sshd_config：配置文件
/etc/ssh/ssh_host_ecdsa_key：ECDSA 私钥。
/etc/ssh/ssh_host_ecdsa_key.pub：ECDSA 公钥。
/etc/ssh/ssh_host_key：用于 SSH 1 协议版本的 RSA 私钥。
/etc/ssh/ssh_host_key.pub：用于 SSH 1 协议版本的 RSA 公钥。
/etc/ssh/ssh_host_rsa_key：用于 SSH 2 协议版本的 RSA 私钥。
/etc/ssh/ssh_host_rsa_key.pub：用于 SSH 2 协议版本的 RSA 公钥。
/etc/pam.d/sshd：PAM 配置文件。

sshd 启动时会自动读取默认的配置文件。如果希望使用其他的配置文件，可以用 sshd 命令的-f参数指定
```bash
# 使用指定配置文件
$ sshd -f /usr/local/ssh/my_config

# 校验配置文件语法是否正确
$ sshd -t

# 配置文件修改以后，并不会自动生效，必须重新启动 sshd
$ sudo systemctl restart sshd.service
```



**登录流程**

预备步骤，客户端生成自己的公钥和私钥。

第一步，客户端的公钥放入远程服务器的指定位置。

第二步，服务器收到用户 SSH 登录的请求，发送一些随机数据给用户，要求用户证明自己的身份。

第三步，客户端收到服务器发来的数据，使用私钥对数据进行签名，然后再发还给服务器。

第四步，服务器收到客户端发来的加密签名后，使用对应的公钥解密，然后跟原始数据比较。如果一致，就允许用户登录



#### 使用场景

#####  客户端登录服务器


##### 端口转发(SSH 隧道（tunnel）)

SSH 除了登录服务器，还有一大用途，就是作为加密通信的中介，充当两台服务器之间的通信加密跳板，使得原本不加密的通信变成加密通信

作用：
（1）将不加密的数据放在 SSH 安全连接里面传输，使得原本不安全的网络服务增加了安全性，比如通过端口转发访问 Telnet、FTP 等明文服务，数据传输就都会加密。

（2）作为数据通信的加密跳板，绕过网络防火墙。

###### 分类

**动态转发**

概述：
本机与 SSH 服务器之间创建了一个加密连接，然后本机内部针对某个端口的通信，都通过这个加密连接转发

> 需要把本地端口绑定到 SSH 服务器，然后通过端口--> ssh服务器 --> 网站，完全是动态的，取决于原始通信，所以叫做动态转发
> 加密内网访问外网？

协议：SOCKS5 协议

命令：

```bash
# -D表示动态转发，local-port是本地端口，tunnel-host是 SSH 服务器，-N表示只进行端口转发，不登录远程 Shell(不能执行远程命令，只能充当隧道)
$ ssh -D local-port tunnel-host -N # 这种转发采用了 SOCKS5 协议。访问外部网站时，需要把 HTTP 请求转成 SOCKS5 协议，才能把本地端口的请求转发出去

# curl 的-x参数指定代理服务器，即通过 SOCKS5 协议的本地2121端口，访问http://www.example.com
$ curl -x socks5://localhost:2121 http://www.example.com
```



配置文件：
如果固定且常用可以配置到ssh客户端的配置文件中

```bash
DynamicForward tunnel-host:local-port
```



总结：本地计算机无法访问外网，但跳板机可访问外网，通过跳板机完成访问





**本地转发**

概述
本地转发（local forwarding）指的是，SSH 服务器作为中介的跳板机，建立本地计算机与特定目标网站之间的加密连接,本地转发是在本地计算机的 SSH 客户端建立的转发规则。

指定一个本地端口（local-port），所有发向那个端口的请求，都会转发到 SSH 跳板机（tunnel-host），然后 SSH 跳板机作为中介，将收到的请求发到目标服务器（target-host）的目标端口（target-port）。

协议：本地端口转发采用 HTTP 协议

命令：

```bash
# -L参数表示本地转发，local-port是本地端口，target-host是你想要访问的目标服务器，target-port是目标服务器的端口，tunnel-host是 SSH 跳板机。
$ ssh -L local-port:target-host:target-port tunnel-host

# SSH 跳板机tunnel-host，在本地2121端口与目标网站www.example.com的80端口之间建立 SSH 隧道
$ ssh -L 2121:www.example.com:80 tunnel-host -N
# 访问本机的2121端口，就是访问www.example.com的80端口
$ curl http://localhost:2121
```



配置文件：

```bash
Host test.example.com
LocalForward client-IP:client-port server-IP:server-port
```

总结：本地计算机可访问跳板，通过跳板发送信息到远程服务器（数据传输/命令控制等）



**远程转发**

概述:
远程端口指的是在远程 SSH 服务器建立的转发规则
主要针对内网的情况。本地计算机在外网，SSH 跳板机和目标服务器都在内网，而且本地计算机无法访问内网之中的 SSH 跳板机，但是 SSH 跳板机可以访问本机计算机
由于本机无法访问内网 SSH 跳板机，就无法从外网发起 SSH 隧道，建立端口转发。必须反过来，从 SSH 跳板机发起隧道，建立端口转发，这时就形成了远程端口转发

要求：远程端口转发要求本地计算机也安装了 SSH 服务器，这样才能接受 SSH 跳板机的远程登录



命令：

```bash
# 在 SSH 跳板机执行的，从跳板机去连接本地计算机
# -R参数表示远程端口转发，local-port是本地计算机的端口，target-host和target-port是目标服务器及其端口，local是本地计算机
$ ssh -R local-port:target-host:target-port -N local
```



配置文件

```bash
Host test.example.com
RemoteForward local-IP:local-port target-ip:target-port
```



总结：本地计算机不可访问跳板，但跳板可访问本地计算机，通过反向通道实现通过跳板发送信息到远程服务器（数据传输/命令控制等）



#### 实例

##### VPN

VPN 用来在外网与内网之间建立一条加密通道。内网的服务器不能从外网直接访问，必须通过一个跳板机，如果本机可以访问跳板机，就可以使用 ssh 本地转发，简单实现一个 VPN

> ssh可模拟实现vpn功能，但与真正vpn概念是不一样的
> vpn可以全局,ssh限制于端口
> SSH连接到特定的计算机，而VPN连接到网络



##### 两级跳板

端口转发可以有多级，比如新建两个 ssh 隧道，第一个隧道转发给第二个隧道，第二个隧道才能访问目标服务器



#### 问题

- SSH使用场景
- 什么是VPN
- SSH能否替代VPN
- 制作简易的vpn



