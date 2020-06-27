### 版本控制和发布流程

![img](https://img-blog.csdn.net/20180423234418167?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2Rlbmdfc2Fp/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)

当出现特殊情况，trunk含有大量未测试的功能未发布时，以bug-fix的形式进行迭代

> 第一次发布：从主分支的特定版本创建product分支发布1.0.0
>
> 第二次发布：基于1.0.0创建分支，再将相应的功能从trunk中分离至新分支中
>
> ...



### 版本规范

版本号由三部分组成：<主版本号>.<子版本号>.<阶段版本号>

- 主版本号：当功能模块有较大的变动，比如增加多个模块或者整体架构发生变化。此版本号由项目决定是否修改。
- 子版本号：当功能有一定的增加或变化，比如增加了对权限控制、增加自定义视图等功能。此版本号由项目决定是否修改。
- 阶段版本号：一般是 Bug 修复或是一些小的变动，要经常发布修订版，时间间隔不限，修复一个严重的bug即可发布一个修订版。此版本号由项目经理决定是否修改。



### 代码提交规范

#### 分类

- build：修改项目的的构建系统（xcodebuild、webpack、glup等）的提交

- ci：修改项目的持续集成流程（Kenkins、Travis等）的提交

- chore：构建过程或辅助工具的变化

- docs：文档提交（documents）

- feat：新增功能（feature）

- fix：修复 bug

- pref：性能、体验相关的提交

- refactor：代码重构

- revert：回滚某个更早的提交

- style：不影响程序逻辑的代码修改、主要是样式方面的优化、修改

- test：测试相关的开发



### SVN架构

#### 整体架构

```
客户名					
	├─项目名1						
    └─项目名2				
        └─项目架构
```



#### 项目架构

```
项目名					  // 主干（相当于DEV）
	├─trunk				// 项目代码
    |  └─API
    ├─branches			// 一般要独立于主干单独发布或者紧急修复时使用
    │  └─prod_1.0.0		// 分支名_版本号，如果有多个分支可以再建立子文件夹
    |  	 └─API			// 项目代码
    └─tags				// 一般只有发版正式才会打标签
        └─1.0.0
          └─API	
```



### Branches

独立于主干单独发布或者紧急修复时使用



#### 分支创建

##### 检出

从svn中拉取特定版本的代码

![img](https://img-blog.csdn.net/20180831172950702?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2p1c3RyeV9kZW5n/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)

![img](https://img-blog.csdn.net/20180831173021642?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2p1c3RyeV9kZW5n/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)







##### 打分支

![img](https://img-blog.csdn.net/20180831173217362?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2p1c3RyeV9kZW5n/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)



![img](https://img-blog.csdn.net/20180908124115664?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2p1c3RyeV9kZW5n/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)

注：

- 创建分支时最后一层路径代表要将选定文件夹下的内容复制到最后一层路径的文件夹下
  - form: /a, to: /b  则会将a文件夹下的内容复制到b下
- message需要写明分支信息
- 版本号选择
  - 要将特定版本作为分支时，使用Specific revision选择版本
  - 当需要最新版本的选择Head in revision

- Createa intermediate folders：自动创建中间文件夹
  - 不勾选时中间路径如果文件夹不存在会失败
  - 最后一层文件夹不管是否勾选必定会自动创建



#### 分支合并

参照[TortoiseSVN打分支、合并分支、切换分支](https://blog.csdn.net/justry_deng/article/details/82259470)



### Tags

Tag是静态的，作为一个标记，一但创建就不再修改，Tag创建参照分支创建。

