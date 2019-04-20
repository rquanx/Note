### 基本语法

#### 变量

```bash
name=1 # 不能用有空格
echo $name # 读取变量值，echo、printf输出
```

#### 作用域

```bash
(cd ../x;
 echo "x"     
 # .... 默认按shell窗口的路径调用指令，但在括号内指令均以cd进入的路径为路径
)
```

#### 控制

##### if

```bash
if condiction
then 			# 必须
	# ...
else 		#  else 可选
	# ...
fi			# 结束必须
```

##### for

```bash
for i in x;
do
	# ...
done
```



#### 参数

```bash
# $0 对应文件名  $1~$n 按顺序对应参数
./test.sh  1 2
# $1 = 1  ,$2 = 2

```

