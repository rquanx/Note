### 仓库

#### 分支

设置中主分支可以切换， protect可现在commit和merge权限？





### CI

#### 基础知识

**Pipeline**: 一个ci流程就是pipeline，pipeline上包含有多个任务节点，每个任务节点都是一个stage

**stage**: 有至少一个Job

**Job**: 每个Job都会配置一个stage属性，来表示这个Job所处的阶段

**Runner**: 在特定机器上根据项目的.gitlab-ci.yml文件，对项目执行pipeline的程序

- Shared Runner: Gitlab平台提供的免费使用的runner程序，但有一定限制，Google云平台提供支持
  - 项目无关
  - 对运行环境有要求
  -  使用有限制

- Specific Runner： 自定义，通过gitlab提供的gitlab-runner来设置
  - 针对特定项目
  - 运行环境无关
  - 无限制

**Executor**：



#### .gitlab-ci.yml

gitlab平台会扫描根目录的.gitlab-ci.yml文件，并据此处理ci流程

> 每次push/merge均会触发处理



关键字： stages、stage、script、tags



**stages**：在最外层，内容是数组，用于定义一个pipeline不同的流程节点

**install**: 对象，包含有stage、script（数组）、tags（数组）

**stage**： 字符串



#### gitlab-runner

从gitlab交互界面获取的token即可绑定机器和ci流程，即：每次跑ci都在绑定的平台上进行。



#### 特点

##### 隔离

不同push/merge所触发的CI流程不会互相影响，也就是说，你的一次push引发的CI流程并不会因为接下来另一位同事的push而阻断，它们是互不影响的



##### 可视化

.gitlab-ci的所有流程都是可视化的，每个流程节点的状态可以在gitlab的交互界面上看到，包括执行成功或失败





### Release

写了release note才会有release



### 实操

#### 前端

**阶段内容**

- install阶段：执行yarn,安装node_modules

- eslint阶段：安装eslint后，根据项目根目录下配置的.eslintrc进行

- build阶段：打包

- deploy阶段：将打包内容部署到服务器



**yml**

```yml
stages: # 分段
  - install
  - eslint
  - build
  - deploy

cache: # 全局缓存，将JOB产生的一些资源备注为缓存，便于被其他JOB使用
  paths:
    - node_modules
  policy: pull-push

install-job:
  tags:
    - <Tag>       # 跟runner绑定，Runner只执行注册时设置Tag
  stage: install
  script:
    - npm install
#   cache:     # 局部缓存，会覆盖全局缓存设置
#     paths:
#       - binaries/

eslint-job:
  tags:
    - <Tag>
  stage: eslint
  script:
    - npm run eslint

build-job:
  tags:
    - <Tag>
  stage: build
  script:
    - npm run build
  artifacts:    # 标注产物，防止文件被下一个JOB清除
    name: bundle
    paths:
      - build/

deploy-job:
  tags:
    - <Tag>
  stage: deploy
  script:
    - sshpass -p $PASSWORD scp -r ./build $CUSTOM_USERNAME@$CUSTOM_IP:/var/www/html  # 文件压缩然后，调用某个接口？
```







### YML

由对象，数组，以及对象和数组的嵌套结构组成的

- YML通过缩进组织层级

- YML里允许通过#符号编写注释



#### 数据类型

**数组**

```yml
colors

 - red

 - blue

 - yellow

# { "colors": ["red","blue","yellow"] }
```



**对象**

```yml
people:
  name: zhangsan
  age: 14

# {
#   "people": {
#      "name": "zhangsan"
#      "age": 14
#   } 
# }
```



#### Cache语法

```yml
- paths(数组)相对路径
- 全局缓存与局部缓存
- 不能用来存储build的结果,只能用来作为临时项目依赖的存储,build需要使用artifacts
- 根据设置的policy,每个 job 会在开始执行前将对应路径的文件下载下来，并在任务结束前重新上传


rspec:
  script: test
  cache:
    paths:
      - binaries/*.apk
      - .config
```



**key**

用于防止cache被覆盖或共享



**policy**

- -pull-push :默认，如果有 cache 的配置，那么每个 job 会在开始执行前将对应路径的文件下载下来，并在任务结束前重新上传，不管文件是否有变化都会如此操作

- pull: 只获取文件，不进行上传



**继承**

<<: cacheKey: 继承key为cacheKey的配置



### 问题

**Runner未激活**

重启runner

```bash
sudo gitlab-runner verify
sudo gitlab-runner restart
```

**Job挂起，没有Runner执行**

1、检查Runner激活
2、是否配置正确的Tag
3、多个Runner间冲突（使用相同的Token...）



**前一个JOB生成的资源被删除**

使用artifact



**AD组织架构变化、账号被禁用**

Ad关联后组织结构变化，账号会被禁