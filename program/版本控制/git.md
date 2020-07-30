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
git reset --hard <commit id>  # 代码回滚指特定commit,会抹除回滚commit之后的提交记录
```



###### 软重置

指针跳回之前的某个节点，但是已修改的文件保留



###### 硬重置

文件不保留



##### 合并

合并会根据当前代码情况产生两种变化



###### merge

fast-forward

> 合并的时候主分支从分出分支后没有任何提交，即可直接将分支所有的提交合并到主分支



no-fast-forward

> 两边都有修改，会创建一个新的提交节点，并且指针同时指向两个分支的合并节点



###### rebase

git rebase 指令会 复制 当前分支的所有最新提交，然后将这些提交添加到指定分支提交记录之上。



交互式变基

> 变基时可对分支的commit进行修改

> 6种操作





##### 分支

```bash
git checkout xxx # 切换分支

git checkout -b xxx # 切换并创建分支

git cherry-pick <commit id> # 将某个分支节点加入到现有，场景：在错误的分支下进行了commit，不需要重写
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
commit --amend # 修改最近的一次提交
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



##### 资料

[Git的奇技淫巧--操作指令](https://github.com/521xueweihan/git-tips)

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



#### 问题

##### 无法切换账号

检查windows凭据管理


