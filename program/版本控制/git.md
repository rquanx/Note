#### 快捷键

q

> 退出当前指令





#### 命令

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

#### 脚本

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



#### 库

[Git的奇技淫巧--操作指令](https://github.com/521xueweihan/git-tips)



#### 服务器

[搭建自己的 Git 服务器](https://www.aneasystone.com/archives/2018/12/build-your-own-git-server.html#at)



#### 使用规范

##### 格式

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



