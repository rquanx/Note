

#### Branch

```bash
Merge branch 'Beta' into GA

Merge branch branchA into branchB

--no-ff会产生新的commit

fast则不会有此commit
```





#### Hook

##### 前端

`package.json`中配置`githooks`

根据需要在提供的构子中执行相应的命名



如： `pre-commit`（提交前进行格式校验）中执行`lint-staged`（配置不同文件类型执行的命令）



**配合prettier**

`lint-staged`执行`prettier`命令 `prettier --write`

`prettier`根据`.prettier.js`(格式化配置)、`.prettierignore`（格式化忽略）





#### 存储系统

##### 存储类型

**Blob**

作用：存储文件内容

特点： 不记录文件名

优点： 由于不记录文件名，当文件名发生变化时，内容不变可直接复用object,只需新增tree

产生：新增或修改文件内容时生成



**Tree**

作用：存储目录结构，目录快照

内容：

- 记录了目类中每个文件的权限、objects类型、hash名(SHA1值)、普通文件名
- 文件 -> blob
- 文件夹 -> tree

特点：tree只存储当前层次的目录信息，然后通过子tree来完整记录整棵树



**Commit**

作用：记录commit信息

内容：

- 对应目录结构的快照tree的哈希值
- 上一个提交的哈希值（第一个提交没有父节点。在一个merge提交中还会出现多个父节点）
- 提交的作者以及提交的具体时间
- 该提交的信息。

产生：提交时生成



**Tag**

产生：`git tag -a`



##### 资料

[Git内部原理](https://zhuanlan.zhihu.com/p/96631135)

##### QNA

**git如何存储文件**

对每个文件生成git objects，存储到.git/objects中



**提交文件变动时会做什么**

1、对变动的文件生成新的blob objects

2、生成新的目类快照tree objects

3、生成新的commit objects

4、新commit指针指向前一个commit

5、分支header指针指向新的commit



```
head -> master -> new commit -> pre commit -> old tree
                             -> new tree -> sub blob
                                         -> sub tree
```



**git objects的好处**

提交、目类、内容分别拆成objects,当发生变化时，只需将指针从旧objects指向新的objects即可，没有发生的objects可以全部复用



**为什么tree和object分离**

复用，分离后文件名修改或目类结构发生变化，但文件内容不变时，只需生产新的tree即可，blob可以复用，大部分时候tree是更轻量的



**为何每次文件变化均生成完整新的object**

性能、使用取舍

> 如果只存储变化的内容，当想要获取到完整的内容时，则需要从第一个commit一直计算到最新的commit才能得到



**每次生成新的object是否会造成空间占用**

Git会有垃圾回收机制gc，不仅会清除无用的object，还会把已有的相似object打包压缩,生成一个pack和index文件



**历史记录篡改问题**

SHA1哈希算法和哈希树，参考区块链

当某个节点的哈希发生变化时，后面所有的节点哈希都要修改



假设你偷偷修改了历史变更记录上一个文件的内容，那么这个文件的blob object的SHA1哈希值就变了，与之相关的tree object的SHA1也需要改变，commit的SHA1也要变，这个commit之后的所有commit SHA1值也要跟着改变。又由于Git是分布式系统，即所有人都有一份完整历史的Git仓库，所以所有人都能很轻松的发现存在问题。

#### 快捷键

q

> 退出当前指令





#### 命令

##### 初始化

```bash
git init 					# 初始化一个新本地仓库，生成.git的隐藏文件夹

git remote add origin <url> # 将本地仓库与远程仓库关联
```



##### 数据查看

```bash
git cat-file -t [hash] # 查看objects存储的数据类型

git cat-file -p [hash] # 查看objects中存储的内容
```





##### 日志

```bash
git log  # 查看提交的日志

git relog # 显示所有历史记录
```



##### 暂存

```bash
git stash save <name>  # 将当前工作区修改保存，名字为name并进入栈区，保存后所有文件回归未修改状态
git stash pop 		   # 弹出最近一条保存的记录
git stash apply <name> # 弹出特定名字的记录
git stash 			   # 查看栈中所有记录
```





##### 还原

```bash
git revert -n <commit id>	  # 代码回滚指特定commit,不会抹除已有提交记录 
# 将文件内容还原到特定节点的时候的样子，但是是通过产生新节点来实现

# revert后需要提交一次，留存revert记录
# revert会回退到特定commit前，并把commit的内容add
```



##### 重置

```bash
git reset --soft [<commit-id>/HEAD~n>] # 已将更改提交到本地，需要撤回提交，更改项还原到暂存区，HEAD~n 前几个commit

git reset --mixed [<commit-id>/HEAD~n>] # 已将更改提交到本地，需要撤回提交，更改项还原到工作区

git reset --hard <commit id>  # 代码回滚指特定commit,会抹除回滚commit之后的提交记录
```



###### 软重置

指针跳回之前的某个节点，但是已修改的文件保留



###### 硬重置

文件不保留



##### 合并

合并会根据当前代码情况产生两种变化

```bash
# 撤销合并，撤回到 merge 前的特定 commit
```



###### merge

fast-forward（直进式合并）

> 合并的时候主分支从分出分支后没有任何提交，即可直接将分支所有的提交合并到主分支
>
> 
>
> 将master分支的指向移动到最后一个commit节点上
>
> 在合并两个没有分叉的分支时的默认行为



no-fast-forward（非直进式合并）

> 两边都有修改，会创建一个新的提交节点，并且指针同时指向两个分支的合并节点
>
> 
>
> --no-ff 合并后会产生一个单独的节点，利于保持commit信息的清晰和以后的回滚







###### rebase

git rebase 指令会 复制 当前分支的所有最新提交，然后将这些提交添加到指定分支提交记录之上。



交互式变基

> 变基时可对分支的commit进行修改

> 6种操作



###### **Recursive**

合并两个有分叉的分支时的默认行为

递归寻找路径最短的唯一共同祖先节点，然后以其为base节点进行递归三向合并，如果满足条件的祖先节点不唯一，那么Git会继续递归往下寻找直至唯一



**Ours & Theirs**

保留双方的历史记录，但完全忽略掉这一方的文件变更



****Octopus****





##### 分支

```bash
git checkout xxx # 切换分支

git checkout -b xxx # 切换并创建分支

git cherry-pick <commit id> # 将某个分支节点加入到现有，场景：在错误的分支下进行了commit，不需要重写

git push origin --delete fea-xx # 删除远端分支

git branch -m <oldbranch> <newbranch> # 分支重命名

git branch --contains <commit-id> # 检查分支是否包含特定commit
```





##### 源切换

```bash
git remote add upstream xxxx # 将某个仓库作为只读的更新源
```



##### 更新

```bash
git fetch # 从远程其他分支拉取代码到远程分支上，但是本地分支代码不受影响
git merge # 

git pull upstream xxx # 从更新源拉起特定分支
# pull == fetch + merge
```





##### 提交

```bash
git commit --amend # 修改最近的一次提交，会打开编辑器窗口

git commit --amend -m 'xxx' # 修改最近的一次提交
# 如果暂存区有发生变化的文件，会一起提交到仓库。还可以整个把上一次提交替换掉
```



###### 回滚

add前

```bash
git checkout -- filename # 将某个文件内容回滚

git checkout -- .     # 一次性回滚多个文件
```



commit前

```bash
git reset HEAD filename
git reset HEAD # 多个文件
git reset .  

# 撤销暂存
git rm --cached [filename]
```



push前

```bash
git log # 找到hash
git revert <hash>
```



push后

```bash
git reset --hard hash
git push --force  # 可以不用force?
```



##### Tag 	

```bash
git tag
# 列出所有的tag

git tag -l "1.0*"
# 筛选tag


git show <tag_name>
# Eg. git show v1.0.1
# 显示tag详情

git tag -d <tag_name>
# 删除tag

git fetch --tags
# 拉起tags

git tag <tag_name>
# Eg. git tag v1.0.1

git tag -a <tag_name> -m "message"
# Eg. git tag -a v1.0.1 -m "First release"

git tag <tag_name> <commit_sha>
# 以特定commit打tag

git push --tags
# 推送tag至远程服务器
```



##### 场景

**需忽略的文件已提交上去**

1、删除本地文件 commit
2、git rm --cached filename,不需要删除本地文件


**提交空文件夹**

git 会忽略空文件夹,空文件夹下随便建个文件即可/.gitkeep



**创建空分支，文件保持，但无历史**

git checkout --orphan emptyBranchName

该命令会生成一个叫 emptybranch 的分支，该分支会包含父分支的所有文件。但新的分支不会指向任何以前的提交，就是它没有历史，如果你提交当前内容，那么这次提交就是这个分支的首次提交。

想要空分支，所以需要把当前内容全部删除，用 git 命令
git rm -rf .



**自动定位 bug commit**

git bisect start [终点哈希] [起点哈希]

> 开始后会自动用二分法进行

git bisect good

> 当前段正常，继续往前进行二分法

git bisect bad

> 已经出现错误，往后进行二分法

一直到没有时会提示 xxx is the first bad commit

git bisect reset

> 退出查找

git bisect run script

> 可以执行自定义脚本,然后执行单元测试，就可以自动化找出异常 commit



##### 资料

[Git的奇技淫巧--操作指令](https://github.com/521xueweihan/git-tips)

[git常用操作](https://github.com/k88hudson/git-flight-rules/blob/master/README_zh-CN.md)

#### 脚本



##### 批量提交

```bash
# 遍历当前文件夹下的.git ，进行git pull;
for i in */.git; do ( echo $i; cd $i/..; git pull;); done

for i in */.git; do ( echo $i; cd $i/..; git add -A; 
git commit -m "commit message"; 
git push;); done
# 提交
git add -A; 
git commit -m "commit message"; 
git push
```



#### 规范

模板

```xml
<!-- 简化 -->
<type>: <subject>

<!-- 完整 -->
<type>: <subject>
// 空一行
<body>
// 空一行
<footer> 
```



##### type（必选）

- ```feat```：新增功能、行为
- ```fix```：修复bug
- ```docs```：文档修改
- ```style```：格式（不影响代码运行的变动）
- ```refactor```：重构（即不是新增功能，也不是修改bug的代码变动）
- ```test```：增加测试
- ```chore```：构建过程、辅助工具、项目配置相关的变动
- ```merge```：解决冲突后的合并提交
- ```update```：未定义/不明确type



##### subject（必选）

commit 目的的简短描述，不超过50个字符



##### Body（可选）

对本次 commit 的详细描述，可以分成多行。



##### Footer(可选)

描述一些特殊情况，不兼容变动和issue关闭。



#### 开发流程

[5中gitflow介绍](https://zepel.io/blog/5-git-workflows-to-improve-development/)

[不同项目类型的实践](https://zhuanlan.zhihu.com/p/257158164)



##### 管理规范

- 每个需求必须新开一个本地分支，并备注好需求描述。
- 每个分支只做一个需求，切勿需求交叉修改。
- 合并后或无用的分支需立即删除，如果有修改，再重新拉一个新分支。
- 约束命名规则，如采取master、dev、feat、release、hotfix命名方式。



##### git flow



**协作方式**

常驻两个分支，根据需要拉出临时分支，进行合并合并后临时分支删除；相对复杂，频繁发布（持续发布）时常驻分支差异不大



**常驻分支**

- master,供给用户使用的正式版本

- develop



**临时分支**

- 功能（feature）分支

- 预发布（release）分支

- 修补bug（fixbug）分支

  > master拉取hotfix,合并至dev和master





##### github flow

**协作方式**

常驻master,开发或修bug时拉出新分支，修改完毕后发起PR

符合持续发布，假设更新和发布是同时的，但实际根据应用类型可能不能马上发布从而存在差异（app审核、定期发布）



**常驻分支**

- master



##### gitlab flow

协作方式：严格规得上游和下游，prod --> pre-prod --> master，不管什么时候，均从master拉取分支，然后一步一步向上合并，只有紧急情况才能跳过



**常驻**

- prod

- pre-prod

- master



#### 文件

**.git/config**

可通过修改`remote url`修改所关联的git仓库地址



**.gitignore**

每个目录都可以有自己的 ignore，当仓库存放多端代码时可以各自管理



#### 小知识

##### SSH

1、生成 ssh-keygen -t rsa -C "xxxxx@xxxxx.com"

2、查看.pub，cat ~/.ssh/id_rsa.pub（windows user/.ssh）

3、赋值内容粘贴到 github/gitlab 中

4、测试是否联通,ssh -T git@github.com




#### 问题

##### Could't find the binary git

git安装问题，导致终端找不到git这个文件去执行

1、检查git是否安装

2、检查终端是否未把最新的环境变量加载

> 打开终端后再安装git



##### 无法切换账号

检查windows凭据管理


