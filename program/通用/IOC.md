### IOC

Ioc是把对象的控制权较给框架或容器，容器中存储了众多我们需要的对象，然后我们就无需再手动的在代码中创建对象。需要什么对象就直接告诉容器我们需要什么对象，容器会把对象根据一定的方式注入到我们的代码中。

​	

IOC(`Inversion Of Control`，反转控制)，包含DI和DL，一般也被理解为DI(`Dependency Injection`，依赖注入)，实际上两者还是略微有些区别，虽然它们经常性的出现在一起。

> DI + DL + 对象注册？



一种设计模式，一种概念，主要包含的内容如下：

- 对象的生命周期的管理

- 依赖的解析与注入

- 依赖的查询

- 应用的配置



**DI**：注入的过程被称为DI。有时候需要动态的指定我们需要什么对象，这个时候要让容器在众多对象中去寻找，容器寻找需要对象的过程，称为DL(Dependency Lookup, 依赖查找)。



**DL**：依赖查找



**本质**：一个工厂



#### 作用

Ioc是把对象的控制权较给框架或容器，容器中存储了众多我们需要的对象，然后我们就无需再手动的在代码中创建对象。需要什么对象就直接告诉容器我们需要什么对象，容器会把对象根据一定的方式注入到我们的代码中。



#### 形式

- 构造函数注入
- 属性注入
- 方法注入



#### 实现

##### 映射容器

私有类型映射缓存容器：`Dictionary<string,Type>` / `Dictionary<Type,Type>`? 

> string是`fullName`,能用Type来替代？
>
> 为了实现其他附加功能，适当调整Dictionary



##### 映射注册

向映射缓存中存储映射，类型约束，映射之间应存在泛型约束

##### 构造参数注入

**基础构造**

直接创建对象，默认使用无参数构造函数

**参数最多**

取参数最多的构造函数，进行参数注入构造

**超集**

取参数包含全部的，如果有不包含的报错

**指定构造函数**

提供额外信息，如利用`Attribute`进行标记构造函数，处理时优先取有标记的



**参数构造及构造内new**

构造参数内new实例和构造参数传递实际作参数的区别

当实际所需的参数变化时需要修改多处地方



##### 依赖查找

应对当构造函数参数又依赖于其他对象情况，调整为对参数进行递归处理



##### 属性注入

**全量属性注入**

在实例创建后，遍历属性，对容器注册的属性进行实例化赋值注入

> 需对属性类型进行过滤？只处理包含映射的属性？防止处理了意外的属性



**特定属性注入**

提供额外信息，利用`Attribute`进行标记属性



##### 方法注入

**全量方法出入**

在实例创建后，遍历方法参数，对容器注册的属性进行实例化赋值注入



难以实现，继承了Object或者其他，遍历方法时由于参数问题无法构造

> 能否屏蔽掉一些难以处理的方法，通过相对通用的方式



**特定方法注入**

提供额外信息，利用`Attribute`进行标记属性，然后对方法参数进行注入?



##### 参数注入

构造函数/函数中可能存在有非映射的对象，或者基础类型，无法生成足够的参数



增加常量字典，注册时声明参数，固定int等类型参数的，处理时先根据key取常量，在构造参数时根据类型从常量中获取



##### 多映射

增加参数进行标识，如Name

1、修改/添加字典以支持

2、存放时使用fullName + shortName



##### 声明周期管理

对象重用管理

- 瞬时：每次都是新的，默认
- 单例：全局单例，修改存储方法，映射中存储单例实例

- Scope：请求过程中单例,利用了框架引擎的机制（`CallContext`?旧框架才有），建立Scope容器，提供容器克隆，每次产生新的Scope时克隆旧容器的映射关系，但Scope容器则重置，利用多个容器+ 克隆实现 映射公用，但Scope分离



#### 应用

- 简化对象创建
- 对象生命周期管理：`DBContext`
- 对象工厂解耦