### CentOS



#### mongodb

##### 安装

```bash
touch /etc/yum.repos.d/mongodb-org-4.2.repo

vi /etc/yum.repos.d/mongodb-org-4.2.repo

​```
[mongodb-org-4.2]
name=MongoDB Repository
baseurl=https://repo.mongodb.org/yum/redhat/$releasever/mongodb-org/4.2/x86_64/
gpgcheck=1
enabled=1
gpgkey=https://www.mongodb.org/static/pgp/server-4.2.asc
// $releasever 填系统版本？
​```


yum install -y mongodb-org

systemctl start mongodb

systemctl status mongodb

systemctl enable mongodb // 永久启动
```



##### 配置文件

/etc/mongod.conf

> 将bindIp 注释掉开放远程访问





#### Issue

**service: command not found**

```bash
yum list | grep initscripts

yum install initscripts -y
```



**Failed to start mongod.service:until not found**



```bash
touch /etc/systemd/system/mongodb.service
```

```
[Unit]



Description=High-performance, schema-free document-oriented database



After=network.target



[Service]



User=mongodb      



ExecStart=/usr/bin/mongod --quiet --config /etc/mongod.conf



[Install]



WantedBy=multi-user.target

// User=root 看登录的用户
```



#### YAPI

##### Docker

```bash
docker run  -d 
-p 9090:9090 -p 9091:80 -p 9092:8080 -p 9093:8081 -p 9097:27017 
-it --network bri_dns --privileged  
--name yapi -v /usr/local/source:/usr/local/source 
centos 
/usr/sbin/init

docker exec -it yapi /bin/bash
```



##### 初始化

```bash
yum install -y nodejs

yum install -y git

service mongod start

npm install -g yapi-cli --registry https://registry.npm.taobao.org

yapi server 
```

