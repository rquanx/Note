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

产生：git tag -a



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

##### 数据查看

git cat-file -t [hash]

> 查看objects存储的数据类型



git cat-file -p [hash]

> 查看objects中存储的内容



##### 日志

git log 

> 查看提交的日志



git relog

> 显示所有历史记录



##### 分支

git checkout xxx

> 切换分支



git reset

> 重置版本至回个分支



git cherry-pick

> 将某个分支加入到现有，场景：在错误的分支下进行了commit，不需要重写





##### 回滚

add前

> git checkout -- filename 将某个文件内容回滚
>
> git checkout -- .     一次性回滚多个文件



commit前

> 1、git reset HEAD filename
>
> 2、git reset HEAD 多个文件



push前

> 1、git log 找到hash
>
> 2、git revert hash 



push后

> 1、git reset --hard hash
>
> 2、git push --force  可以不用force?



##### 源切换

git remote add upstream xxxx

> 将某个仓库作为只读的更新源



##### 更新

git pull upstream xxx

> 从更新源拉起特定分支



##### 提交

commit --amend

> 修改最近的一次提交



##### 其他

git tag -a

> 添加附注，创建tag



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

##### commit

```bash
<type>: <subject>
// 空一行
<body>
// 空一行
<footer>

type：提交类型，可选值如下
* work: 开发中(work in progress)
* feature：新功能(new feature)
* fix：修补bug(fix bug)
* doc：文档(documentation changes)
* style： 格式(change code format)
* refactor：重构(modify code but not feature)
* test：增加测试(test code)
* chore：构建过程或辅助工具的变动(changes don't modify src and test files, only config or tasks)
* none: 不写明

subject：commit 目的的简短描述。

body: 对本次 commit 的详细描述

footer: 描述一些特殊情况，不兼容变动和issue关闭。
```



