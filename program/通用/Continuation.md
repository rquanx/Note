#### CPS

##### 特点

- 每个函数的最后一个参数都是它的 continuation
- 函数内部不能显式地使用 return
- 函数只能通过调用 continuation 以传递它完成的计算结果



#### callCC（call with current continuation）

本质：一个高级版本的能够处理函数表达式的 Goto 语句



##### 特点

- 接受一个函数为唯一参数
-  该函数也有唯一一个参数 cont，代表 callCC 的后续计算
- callCC 会立即调用其函数参数
- 执行过程中，cont 可以接受一个参数作为 callCC 的返回值，一旦调用，则忽略后续所有计算，程序控制流跳转会 callCC 的调用处继续执行



##### 优点

- 可中断程序，并且将中断值作为结果返回
- 可恢复 == 中断中断操作
- 能够暴露给用户程序从而可以在恰当时机恢复执行





##### 实现生成器



```js
var next = 0;

while(1) {
  switch(next) {
    case: 0
      // code
      next = 1;
      break;
    case: 1:
      // code
      next = 2;
      break;
    case: 2: 
      return next;
  }
}

// 基于此示例扩展
```

[参考资料](https://zhuanlan.zhihu.com/p/94611888)

