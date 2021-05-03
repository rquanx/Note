### Travis CI

[教程](http://www.ruanyifeng.com/blog/2017/12/travis_ci_tutorial.html)

Travis CI 提供的是持续集成服务（Continuous Integration，简称 CI）。它绑定 Github 上面的项目，只要有新的代码，就会自动抓取。然后，提供一个运行环境，执行测试，完成构建，还能部署到服务器



#### 前置

Travis CI 只支持 Github，不支持其他代码托管服务

- 拥有 GitHub 帐号

- 该帐号下面有一个项目

- 该项目里面有可运行的代码

- 该项目还包含构建或测试脚本



#### .travis.yml


Travis 要求项目的根目录下面，必须有一个.travis.yml文件。这是配置文件，指定了 Travis 的行为

```yml
language: python    # 执行语言环境
sudo: required      # 需要sudo权限
before_install: sudo pip install foo    # 安装依赖之前需要安装foo模块
script: py.test # 要执行的脚本，true则不需要执行脚本,也可以是命令
# before_install --> script
```



##### 生命周期

- before_install
- install：安装依赖
- before_script
- script：允许脚本
- aftersuccess or afterfailure
- [OPTIONAL] before_deploy
- [OPTIONAL] deploy
- [OPTIONAL] after_deploy
- after_script



**install**

用来指定安装脚本/命令，多个command时，一个错误就会停止

```yml
# 单个动作
install: ./install-dependencies.sh

# 多个动作
install:    
  - command1
  - command2

# 直接完成
install: true
```



**script**

用来指定构建或测试脚本,配置方式类似于install，多个command时，错误了会继续执行，但一个错误整个阶段状态会是false

```yml
# 1完成才执行2
script: command1 && command2
```



##### 执行结果

Travis 每次运行，可能会返回四种状态

- passed：运行成功，所有步骤的退出码都是0
- canceled：用户取消执行
- errored：before_install、install、before_script有非零退出码，运行会立即停止
- failed ：script有非零状态码 ，会继续运行



##### 技巧

- 利用环境变量`env`

- Travis内容/文件加密



