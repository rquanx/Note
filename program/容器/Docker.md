#### Quick Start

```bash
docker pull xxx # 获取基本镜像

docker images # 查看本地镜像清单

docker ceate --name containerName imageName # 创建容器
 
docker start containerName # 启动容器,如果没有执行任务会自动关闭
docker start name -a # 保持在前台运行

docker ps # 列出在运行的容器
docker ps -a #列出所有容器

docker exec -it containerID COMMAND  # 进入容器内部,COMMAND 进入时要执行的指令？

docker stop containerID/containerName # 停止容器运行

docker run -P -it ubuntu /bin/bash # 将所有端口隐射到docker中
docker run -P 80 -it ubuntu /bin/bash # 将容器的80端口随机映射到宿主机的一个端口上
docker run -p 8000:80 -it ubuntu /bin/bash # 将容器的80端口映射到宿主机的8000端口上

docker port container_ID # 查看映射端口配置

docker rm name # 删除容器，容器需先停止运行

sudo docker run -d --network bridgeName -p 8080:80 -it --name yapi centos /bin/bash
# -d 保持运行
# --network bridgeName 使用宿主网络虚拟??，默认就是host
# -p 8080:80 宿主网络8080映射至容器80 使用network host时无效

```





#### 安装

```bash
yum -y install docker-io  # centos
```



#### 命令

##### Hub

```bash
docker login
```



##### 通用

```bash
docker inspect imgID/containerID # 查看镜像/容器详细信息
```







##### images

**搜索**

```bash
docker search xxx
```





**查看**

```bash
docker images # 查看所有的镜像
```





**下载**

```bash
# docker pull 镜像名:TAG
docker pull centos:latest
```





**制作**

```bash
docker commit -a "rq" -m "node + git" nodejs rquanx/nodejs:v1
# -a 作者信息
# -m 信息
# nodejs 容器名字
# 仓库路径？ v1: tag

docker push rquanx/nodejs:v1
```





##### 进入容器

**docker exec id/name command**

需要附带要执行命令进入

-it 保持此次命令执行完不退出



**docker attach id/name**

直接进入

当多个窗口同时使用该命令进入该容器时，所有的窗口都会同步显示。如果有一个窗口阻塞了，那么其他窗口也无法再进行操作

exit，会导致容器的停止



**ssh**



**nsenter**



##### Run

```bash
sudo docker run  -d -p 8080:80 -p 8081:9090 
-it --network bri_dns 
--privileged  
--name yapi 
-v /usr/local/source:/usr/local/source 		# 文件映射？
centos 										# 基础images
/usr/sbin/init
# privileged 给容器提供更高权限,可以使用systemctl
# /usr/sbin/init：初始容器里的CENTOS，用于启动dbus-daemon
# 作用：不再报  Failed to connect to bus: Host is down
# -v 本地文件映射，-v p1 p2 p1是宿主路径
```



##### 日志



**查看容器日志**

```bash
docker logs containerID/name?
```







#### 网络

四种模式

##### bridge(默认)

这种模式会为每个容器分配一个独立的Network Namespace,同一个宿主机上的所有容器会在同一个网段下，相互之间是可以通信



默认的bridge不支持DNS解析



```bash
docker network create --driver bridge briName # 创建自定义的bridge

docker run --network briName # 将容器挂载到特定bri上
```



##### host

容器将不会虚拟出IP/端口，而是使用宿主机的IP和端口

host模式不能使用端口映射和自定义路由规则



#### Issue

**Cannot connect to the Docker daemon. Is the docker daemon running on this host?**

```bash
service docker restart
systemctl status docker.service 
```



**docker.socket failed with result 'service-start-limit-hit'**

可能是/etc/docker/daemon.json文件内容出错，不能为空

**容器无法联网（ping不通ip）**

```bash
sudo apt-get install bridge-utils -y
sudo service docker stop
sudo ip link set dev docker0 down  / sudo brctl delbr docker0(新系统被废弃) 
sudo service docker start
docker network inspect bridge
```



**ERROR: Couldn't connect to Docker daemon at http+docker://localunixsocket**

 is it running?





**使用docker命令一直没有权限时**

如果还没有 docker group 就添加一个：sudo groupadd docker

将用户加入该 group 内。然后退出并重新登录就生效啦：sudo gpasswd -a ${USER} docker

重启 docker 服务：sudo service docker restart

切换当前会话到新 group 或者重启 X 会话：newgrp - docker



**DNS解析**

修改防火墙设置

```bash
# 宿主
firewall-cmd --zone=public --add-masquerade --permanent
firewall-cmd --reload
systemctl stop firewalld
systemctl start firewalld
systemctl stop docker
systemctl start docker
docker run --name tracker1 --privileged -v /usr/local/source:/usr/local/source -d -i -t 470671670cac /usr/sbin/init
914e7dcb12983cc27302a7becf05833abab07d8a765bf11326ca0c9ecfa12e6a
docker exec -it tracker1 /bin/bash

# 容器
ping www.sina.com.cn
```



**容器无法上网**

```bash
more /etc/docker/daemon.json 
# {
#	"dns" : ["114.114.114.114","8.8.8.8"]
# }

more /etc/sysctl.conf

# net.ipv4.ip_forward = 1

# net.ipv4.conf.default.rp_filter = 0

# net.ipv4.conf.all.rp_filter = 0

sysctl -p

systemctl restart docker
```



