### 基本概念

#### 包

每个 Go 程序都是由包组成的。

程序入口package main包

函数外的每个语句都必须以关键字开始（`var`、`func`、等等）

### 基本语法

#### 变量

##### 语法

```go
var name string = "123"; // var name type = xx;    type可以省略
const n = "1"; // 常量
a := 1;   // 自动定义变量   === var a = 1	
		 //`:=` 结构不能使用在函数外
a,b,c = 1,2,"no"    // 多个赋值
```

##### 零值

变量在定义时没有明确的初始化时会赋值为_零值_。

零值是：

- 数值类型为 `0`，
- 布尔类型为 `false`，
- 字符串为 `""`（空字符串）

#### 基本类型

##### 概述

类型可自动推断，浮点数根据精度推断

```go
bool

string

int  int8  int16  int32  int64
uint uint8 uint16 uint32 uint64 uintptr

byte // uint8 的别名

rune // int32 的别名
     // 代表一个Unicode码

float32 float64

complex64 complex128

int(1.2)	//类型转换    需显示转换 
```



##### string

##### bool

##### int

##### uint64

##### complex128

##### uint8 

byte的别名

##### int32

```go
rune // int32 的别名
     // 代表一个Unicode码
```

##### 结构体

```go
type Vertex struct {
	X int
	Y int
}

v := Vertex{1, 2}  // 定义结构体变量
v.X = x;		 
p := &v  p.X = x// 通过指针操作

```

##### 数组

###### 语法

```go
// var arr [number]type
var arr [10]string   // 数组大小固定
len(a)		//获取长度

```

##### slice

类数组？

###### 概述

slice的零值是nil
一个 nil 的 slice 的长度和容量是 0。

###### 语法

```go
// slice	[]T
p := []int{2, 3, 5, 7, 11, 13}
p := []int // 空slice
var a = p[1:x]   //对数组切片得到    [1:]  取第一个后所有的

a := make([]int, 5)  // 通过make产生
a := make(type,len,cap);  // 可以指定cap和len
len(a)		// 获取当前长度?
cap(b)      // 容量
```

###### 操作

```go
// 追加
// append(slice,...par)
var a []int
a = append(a, 1)
a = append(a, 1,2,3)
```

##### map

字典

###### 语法

```go
 // make(map[string]type)
var m = make(map[string]Vertex)
type Vertex struct {
	Lat, Long float64
}

// 初始化多个
var m = map[string]Vertex{
	"Bell Labs": Vertex{
		40.68433, -74.39967,
	},
	"Google": Vertex{
		37.42202, -122.08408,
	},
}

// 省略类型名
var m = map[string]Vertex{
	"Bell Labs": {40.68433, -74.39967},
	"Google":    {37.42202, -122.08408},
}
```



###### 操作

```go
m[key] = elem // 插入
elem = m[key]  // 读取
delete(m, key)  // 删除
elem, ok = m[key] // 检测是否存在，ok是bool值
```



#### 接口

```go
type Abser interface {
	Abs() float64
}

```



#### 操作符

##### 位

<< 

\>>

##### 延迟

defer
延迟的函数调用被压入一个栈中。当函数返回时， 会按照后进先出的顺序调用被延迟的函数调用。

```go
func defTest() {
	defer fmt.Println("world")
	fmt.Println("hello")
}  // 输出 hellp world
```

##### 指针

*、&

没有指针运算

```go

```



##### range

返回数据的索引和值

#### 循环

##### for

跟普通的相比没有(),但是必须有{}
没有while

```go
for i := 0; i < 10; i++ {
		sum += i
	}
for sum < 1000 {	// 置空初始条件和后续..		==> while
		sum += sum
	}

for{	// 死循环
    
}
```

#### 分支判断

##### if

没有(),必须有{}

```go
if x < 0 {
		return sqrt(-x) + "i"
	}
if v := math.Pow(x, n); v < lim {	// 可以定义在判断内部作用域的变量
		return v
	} else {
		fmt.Printf("%g >= %g\n", v, lim)
	}
```

##### switch

从上往下判断条件

```go
switch os := runtime.GOOS; os {	// 不需要break，隐含有break
	case "windows":
		fmt.Println("windows-.")
    case "darwin":
		fmt.Println("OS X.")
		fallthrough				// 如果需要往下跑，可以用fallthrough
	default:
		// freebsd, openbsd,
		// plan9, windows...
		fmt.Printf("%s.", os)
	}

// 从上往下，符合某一个条件时停止
switch {
	case t.Hour() < 12:
		fmt.Println("Good morning!")
	case t.Hour() < 17:
		fmt.Println("Good afternoon.")
	default:
		fmt.Println("Good evening.")
	}
```





#### 函数

##### 概述

##### 语法

```go
func test() {
    
}
func t(x int) (int,int){
    return 1,2		//可返回多个值,后面的括号是返回类型
}
a,b := t(1)		// :=  可自动声明变量

func split(sum int) (x, y int) {
	x = sum * 4 / 9
	y = sum - x
	return
}					// 可以给返回值定义变量名，返回的时候，return如果为空则自动匹配变量

func t1(x,y int) {} // x,y都是int,多个参数类型相同可以只写最后一个 
```



##### 闭包

```go
func adder() func(int) int {
	sum := 0
	return func(x int) int {
		sum += x
		return sum
	}
}


```



#### 模块(包)

##### 概述

​	



##### 语法

导入

```go
import "fmt" //引入fmt模块
import (
	"fmt"
	"math/rand"
) // 引入了两个包
```

导出

首字母大写的名称是被导出的。

> math.pi  和math.Pi

### 标准库

### fmt

#### 输出

%s   字符串
%d   数字
%v   默认值？the value in a default format 

Println

> 打印且换行

Printf

> 打印



#### 接口

Stringer 

### math

Abc

> 取绝对值

### math/rand

Intn

> 取随机整数

### Error

system.net.http未加载    引用的版本不同

多线程时HttpContext.Current.Server.MapPath("/") 未将对象设置到对象的实例异常。

并发请求时，容易连接被强制关闭
​	isbackground = true

