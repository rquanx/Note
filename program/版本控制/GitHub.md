#### PR

[如何进行开源贡献](https://segmentfault.com/a/1190000021656000)

[进行pr](https://mp.weixin.qq.com/s/9eKleQ4CpWremJ3yHmvsuQ)

[Ant Design 开源项目经验分享](https://mp.weixin.qq.com/s/qpZB9tPiLrHIbJnwi-8KKg)



#### ReadMe

- 一句话描述：解决什么问题？

- Badges：这个项目靠不靠谱？

- 特性：有什么？有什么不一样？

- 使用方式：看一眼是什么

- 必要截图：看一眼是什么

- 开发指引：如何本地开发？



#### Github Action

自动化工具，可以进行持续集成，可以组合别人已完成的action(action共享)



##### 基本概念

- workflow （工作流程）：持续集成一次运行的过程，就是一个 workflow。
- job （任务）：一个 workflow 由一个或多个 jobs 构成，含义是一次持续集成的运行，可以完成多个任务。
- step（步骤）：每个 job 由多个 step 构成，一步步完成。
- action （动作）：每个 step 可以依次执行一个或多个命令（action）



##### 配置文件

`.github/workflows`的.yml文件，GitHub 只要发现`.github/workflows`目录里面有.yml文件，就会自动运行该文件



**字段**

- name: 名字，默认不设置时取文件名
- on: 触发条件，字符串/字符串数组

**on**

```yml
# 只有master分支发生push事件时，才会触发 workflow
on:
  push:
    branches:    
      - master 
```

**jobs**

```yml
jobs:
  job1:
    name: 'xxx' 
    runs-on: 'x'    # 执行的环境
  job2:
    name: 'xxx'
    needs: job1
  job3:
    needs: [job1, job2] # 任务的依赖关系
```

**steps**

```yml
jobs:
  job1:
    name: 'xxx' 
    steps: 
    - name: 'x'
      action: '' # 命令或Action
      env: '' # 所需的环境变量
    - name: 'x1'
```



##### 事件

- check_run
- check_suite
- create
- delete
- deployment
- deployment_status
- fork
- gollum
- issue_comment
- issues
- label
- milestone
- page_build
- project
- project_card
- project_column
- public
- pull_request
- pull_request_review
- pull_request_review_comment
- pull_request_target
- push
- registry_package
- release
- status
- watch
- workflow_run