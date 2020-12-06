#### 环境变量设置

```bash
set NODE_OPTIONS=--max_old_space_size=4096
# set x=y  临时设置环境变量
# set x 读取环境变量

setx NODE_OPTIONS --max_old_space_size=4096
# setx x y  永久设置环境变量

# set临时设置,setx永久设置
```



#### 问题

##### 查找不到xxx.ps文件

Power Shell执行 yarn报错，查找不到xxx.ps文件



原因：设置了禁用执行不信任的脚本

解决方式：管理员启动`power shell` `set-ExecutionPolicy RemoteSigned`即可

> 查看设置`get-ExecutionPolicy`