#### 编程

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



#### 凭证

windows凭据会记录SharePoint、Office...的账号密码



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



