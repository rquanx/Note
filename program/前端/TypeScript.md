#### 安装

  安装ts声明文件  cnpm i @types/react-router-dom

#### 语法




##### declare

声明全局变量



declare var SP: any;

> 可以去掉引用外部js东西时报错

##### 类型声明

利用is / in来判断




##### type and interface

```typescript
// 可以进行 | 枚举
type a = {
	b: string
}

/** x */ 
// 可重复声明来追加属性
interface b {
    
}

type bb = b[];

type t = typeof { b: "1"}
```



##### 联合类型

使用|连接符要么满足 A 的约束，要么满足 B 的约束

```typescript
let myFavoriteNumber: string | number;
```

只能访问此联合类型的所有类型里共有的属性或方法



##### 函数

```typescript
// 函数类型声明
interface SearchFunc { 
(source: string, subString: string): boolean; 
(source: string, subString: string) => boolean; 
}

interface Document {
    helloWorld(a:string): void;
	helloWorld: (a:string) => void;
}

// 函数类型接口
interface discount2{
  (price:number):number
}


// 箭头函数+泛型
const fun = <T extends {}>(config: Config<T>) => props =>  {};

// 含有构造函数且包含只读props	
 type con = {
	  new (props: Readonly<EnhancedComponentProps>);
	}

```

##### 对象索引
```ts
interface ObjMap {
    // 这意思是对象键名类型为 string 其对应的值类型为 User
    [uid: string]: User;
    // string => User
}
```



##### 高级

##### ？ -？

```ts
interface A {
  a: string;
  b?: number;
}

// -? 将所有字段变为必填
type B<T> = {
    [key in keyof T]-?: T[key];
}

// ? 将所有字段变为选填
type C<T> = {
    [key in keyof T]?: T[key];
}
```





###### In



```ts
// 嵌套解析
interface t {
    a: number;
    b: string;
}

type P<T> = {
    [k in keyof T]?: T[k] extends object ? P<T[k]> : T[k]
}

//定义一个泛型T，并且要从T中选出需要的属性，则要定义K 的类型是T所有public **属性名** 的联合类型
type MyPick<T,K extends keyof T> = {
// K是一个联合类型，我们需要遍历K，使用映射类型的语法[K in Keys]
  [P in K]:T[P]// P是属性名，T[p]则可以拿到属性类型
}
type name = MyPick<User,"name"> // 取出name属性


// 遍历属性，全部可选
type MyPartial<T>={
  // keyof T 可以拿到泛型T中所有pubilc的属性名
  // in 可以遍历所有属性名，并将属性名赋值给K
  // 则T[K]就是属性类型
  //？代表可选
  
  [K in keyof T]?:T[K]
}
```



###### Omit

复用一个类型，但是又不需要此类型内的全部属性，因此需要剔除某些属性

```typescript
interface User {
    username: string
    id: number
    token: string
    avatar: string
    role: string
}
type UserWithoutToken = Omit<User, 'token'>;
```



###### Record

从Union类型中创建新类型，Union类型中的值用作新类型的属性

```typescript
type Car = 'Audi' | 'BMW' | 'MercedesBenz'
type CarList = Record<Car, {age: number}>

const cars: CarList = {
    Audi: { age: 119 },
    BMW: { age: 113 },
    MercedesBenz: { age: 133 },
}
```



Record<any, any> 和 object的区别

> ts中定义obj类型，实际是不允许再自定义Key的



###### 交叉类型

多个类型合并为一个类型？既要满足 A 的约束，也要满足 B 的约束

<A & B>   同时有A、B的属性

```typescript
type a = b & c & d
```





###### Keyof 

从对象类型中取出键名集合，约束类型为集合的某一个



只能获取类型上的 public 属性名，属性名为字符串类型

返回的是联合类型



```ts
interface Person {
    name: string;
    age: number;
    sex: 0 | 1; // 0 代表女士；1 代表男士
}

type KeyOfPerson = keyof Person; // 'name' | 'age' | 'sex'



// 通过泛型取任意对象的key

// 把 T 上面的字段对应的值全部设置为 number
type ObjToNum<T> = {
    [key in keyof T]: number;
}

type Person = {
    name: string;
    address: string;
}

type Test = ObjToNum<Person>;
// Test = { name: number, address: number }

// 示例2
interface OP {
    a: number;
    b: string
}
type ko = keyof OP; // a,b

type p = OP[ko] // number | string
```


###### Partial<x> 

 使用这个类型时，x的属性不完整也不会报错



###### Pick<x>



###### infer

推断类型：自动将参数提取出来进行使用

extends的条件语句中推断待推断的类型



使用场景:

React推断reducer返回值

对于联合类型进行推断

```ts
type ReturnType<T> =  T extends (...args: any[]) => infer P ? P :any;
type Func = () => User;
type Test = ReturnType<Func> // Test == User
// infer 将返回值提取成P,并在后续的返回值中使用



type Ids = number[];
type Names = string[];
//  获取数组里的元素类型
type Unpacked<T> = T extends Names ? string : T extends Ids ? number : T;
type idType = Unpacked<Ids>; // idType 类型为 number
type nameType = Unpacked<Names>; // nameType 类型为string


// 使用infer
type Unpacked<T> = T extends (infer R)[] ? R : T;

type idType = Unpacked<Ids>; // idType 类型为 number
type nameType = Unpacked<Names>; // nameType 类型为string



// 模板字符串配合infer
type Whitespace = ' ' | '\n' | '\r' | '\t'  // 空格类型

type TrimStart<S extends string, P extends string = Whitespace> =
  S extends `${P}${infer R}` ? TrimStart<R, P> : S
TrimStart<'---value','-'> // ==> value

// ---value 是否继承于`${P}${infer R}` ==> ${P} == -, ${infer R} == --value
// 是继承，infer提取出R即--value,再进行TrimStart<R, P>
// 递归进行去除-
```



###### never

永不存在的值的类型

```ts
interface T {
    a: never;
    b: string;
}

type keys = [keyof T] // 取T得所有key   ==> a | b
type tt = T[keyof T] // 提取T所有属性的类型，但由于never永不存在的值的类型,所以会被去除
// string    通过索引取never是会被去除
```



###### 修饰符

**-？**
减去可选 ==> 必选

**-readonly**
减去只读 ==> 非只读



```ts
// IfEquals
// 如果泛型X 和 泛型 Y相同，则返回 A，否正返回B
// IfEquals是一个函数 ==> <T>() => xx
type IfEquals<X, Y, A = X, B = never> = 
(<T>() => T extends X ? 1 : 2)
 extends 
 <T>() => T extends Y ? 1 : 2
   ? A
   : B;
```





###### 声明扩展
要向现有的ts类型中扩展出新的属性
1、建立xxx.d.ts文件
2、直接定一个同名的声明类名
3、在tsconfig中设置include新增的声明文件

>  向现有的Windows类型定义中增加一个自定义的属性



#### 资料

[typescript的一些基础说明](https://www.jianshu.com/p/103933b7c2b4)

[typescript一些小细节说明，文档生成](http://taobaofed.org/blog/2017/03/09/head-first-typescript/)



#### 声明查找

1、只要声明文件的前缀和 JS 文件前缀相同，VSCode 就会自动关联声明文件

> /caml.js
> /caml.d.ts

2、包内自带的声明文件可以不和源码放一起，单独放在某个文件夹维护，只要在 package.json 中指定声明文件的入口，VSCode 就会自动去找这个文件

> typings: "path"



#### 文件查找

##### Place

当我提及被检查的 `place` 时，我想表达的是在这个 `place`，TypeScript 将会检查以下内容（例如一个 `foo` 的位置）：

- 如果这个 `place` 表示一个文件，如：`foo.ts`，done！
- 否则，如果这个 `place` 是一个文件夹，并且存在一个文件 `foo/index.ts`，done！
- 否则，如果这个 `place` 是一个文件夹，并且存在一个 `foo/package.json` 文件，在该文件中指定 `types` 的文件存在，done！
- 否则，如果这个 `place` 是一个文件夹，并且存在一个 `package.json` 文件，在该文件中指定 `main` 的文件存在，done！





##### 动态查找

当导入路径不是相对路径时，模块解析将会模仿 [Node 模块解析策略](https://nodejs.org/api/modules.html#modules_all_together)，以下我将给出一个简单例子：

- 当你使用

  ```
  import * as foo from 'foo'
  ```

  将会按如下顺序查找模块：

  - `./node_modules/foo`
  - `../node_modules/foo`
  - `../../node_modules/foo`
  - 直到系统的根目录

  

- 当你使用

  ```
  import * as foo from 'something/foo'
  ```

  将会按照如下顺序查找内容

  - `./node_modules/something/foo`
  - `../node_modules/something/foo`
  - `../../node_modules/something/foo`
  - 直到系统的根目录



#### 命名空间

```ts
namespace Utility {
  export function log(msg) {
    console.log(msg);
  }
  export function error(msg) {
    console.log(msg);
  }
}
    
// 编译结果
(function (Utility) {
  // 添加属性至 Utility
})(Utility || Utility = {});
```



#### import非js文件

在 TypeScript 中，甚至可以允许你导入任何文件，例如 `.css` 文件（如果你使用的是 webpack 样式加载器或 css 模块），你只要添加如下代码（放在 `globals.d.ts`）：

```typescript
declare module '*.css';
```

现在你可以使用 `import * as foo from './some/file.css'`。

与此相似，如果你想使用 html 模版（例如：angular），你可以：

```typescript
declare module '*.html';
```

图片、svg资源等一样处理即可



注：编写的.d.ts需要被tsconfig.json的include包含，建议在include最前

```json
 "include": [
    "modules.d.ts",
    "src/**/*"
  ]
```







#### 推断规则

TypeScript 默认我们数组中的元素是可变的，所以它会「悲观的」推断我们可能会改变元素的顺序

```ts
function swap<T, K>(v1: T, v2: K) {
  return [v2, v1]
}
// 会被推断为 (T | K) []

function swap<T, K>(v1: T, v2: K) {
  return [v2, v1] as const
}
// 固定推断为[K,T]
```





#### TSLint

已废弃，建立用eslint



##### 使用说明

- 创建tslint.json
- 配置tslint.json
- 安装tslint
- package.json的script中设置指令

##### 属性

paths属性

> import提示时会按顺序进行匹配



##### 设置

[tslint规则](https://palantir.github.io/tslint/rules/)



#### TsConfig

```json
jsxFactory": "h",// preact设置   编译成h
```

```json
{
    "compilerOptions": {

        /**************基础配置**************/
        /**************基础配置**************/
        /**************基础配置**************/

        /* 开启增量编译：TS 编译器在第一次编译的时候，会生成一个存储编译信息的文件，下一次编译的时候，会根据这个文件进行增量的编译，以此提高 TS 的编译速度 */
        // "incremental": true,
        /* 指定存储增量编译信息的文件位置 */
        // "tsBuildInfoFile": "./",

        /* 打印诊断信息 */
        // "diagnostics": true,
        /* 打印输出的文件 */
        // "listEmittedFiles": true,
        /* 打印编译的文件（包括引用的声明文件）*/
        // "listFiles": true,

        /* 指定 ECMAScript 的目标版本: 'ES3' (default), 'ES5', 'ES2015', 'ES2016', 'ES2017', 'ES2018', 'ES2019' or 'ESNEXT'. */
        // "target": "es5",
        /* 指定模块代码的生成方式: 'none', 'commonjs', 'amd', 'system', 'umd', 'es2015', or 'ESNext'. */
        // "module": "commonjs",

        /* 指定要包含在编译中的库文件——引用类库——即申明文件，如果输出的模块方式是 es5，就会默认引入 "dom","es5","scripthost"  */
        /* 如果在 TS 中想要使用一些 ES6 以上版本的语法，就需要引入相关的类库 */
        // "lib": [],

        /* 允许编译 JS 文件 */
        // "allowJs": true,
        /* 检查 JS 文件*/
        // "checkJs": true,

        /* 指定 JSX 代码生成的模式: 'preserve', 'react-native', or 'react'. */
        /* 'react' 模式下：TS 会直接把 jsx 编译成 js */
        /* 'preserve' 模式下：TS 不会把 jsx 编译成 js，会保留 jsx */
        // "jsx": "preserve",


        /**************声明文件相关配置**************/
        /**************声明文件相关配置**************/
        /**************声明文件相关配置**************/

        /* 生成相应的类型声明文件 —— '.d.ts' */
        // "declaration": true,
        /* 声明文件的输出路径 */
        // "declarationDir": "./d",
        /* 只生成声明文件，不生成 JS */
        // "emitDeclarationOnly": true,
        /* 声明文件目录，默认 node_modules/@types */
        // "typeRoots": [],
        /* 要导入的声明文件包，默认导入上面声明文件目录下的所有声明文件 */
        // "types": [],


        /* 将多个相互依赖的文件合并并且把编译后的内容输出到一个文件里
         * 可以用在产出 AMD 模块的场景中
         * "module":"amd" 时，当一个模块引入了另外一个模块，编译的时候会把这两个模块的编译结果合并到一个文件中
         */
        // "outFile": "./",
        /* 指定编译文件的输出目录 */
        // "outDir": "./out",
        /* 指定输入文件的根目录，用于控制输出目录的结构 */
        // "rootDir": "./",

        /* 启用项目编译 */
        // "composite": true,

        /*  输出的时候移除注释 */
        // "removeComments": true,

        /* 不输出文件 */
        // "noEmit": true,
        /* 发生错误时不输出文件 */
        // "noEmitOnError": true,

        /* 不生成 helper 函数，以前的话设置为 true 后，需要额外安装 ts-helpers */
        /* 类似于 babel ，会给每个文件都生成 helper 函数，会使得最终编译后的包的体积变大 */
        // "noEmitHelpers": true,
        /* 现在可以通过 tslib（TS 内置的库）引入 helper 函数，！！！文件必须是模块 ！！！ */
        /* 编译后自动引入 var tslib_1 = require("tslib") */
        // "importHelpers": true,

        /* 当目标是 ES5 或 ES3 的时候提供对 for-of、扩展运算符和解构赋值中对于迭代器的完整支持 */
        // "downlevelIteration": true,

        /* 把每一个文件转译成一个单独的模块 */
        // "isolatedModules": true,


        /**************严格检查配置**************/
        /**************严格检查配置**************/
        /**************严格检查配置**************/

        /* 开启所有的严格检查配置 */
        "strict": true,
        /* 不允许使用隐式的 any 类型 */
        // "noImplicitAny": true,

        /* 不允许把 null、undefined 赋值给其他类型变量 */
        // "strictNullChecks": true,

        /* 不允许函数参数双向协变 */
        // "strictFunctionTypes": true,

        /* 使用 bind/call/apply 时，严格检查函数参数类型 */
        // "strictBindCallApply": true,

        /* 类的实例属性必须初始化 */
        // "strictPropertyInitialization": true,

        /* 不允许 this 有隐式的 any 类型，即 this 必须有明确的指向*/
        // "noImplicitThis": true,

        /* 在严格模式下解析并且向每个源文件中注入 "use strict" */
        // "alwaysStrict": true,

        /**************额外的语法检查配置，这种检查交给 eslint 就行，没必要配置**************/
        /**************额外的语法检查配置，这种检查交给 eslint 就行，没必要配置**************/
        /**************额外的语法检查配置，这种检查交给 eslint 就行，没必要配置**************/

        /* 有未使用到的本地变量时报错 */
        // "noUnusedLocals": true,

        /* 有未使用到的函数参数时报错 */
        // "noUnusedParameters": true,

        /* 每个分支都要有返回值 */
        // "noImplicitReturns": true,

        /* 严格校验 switch-case 语法 */
        // "noFallthroughCasesInSwitch": true,

        /**************模块解析配置**************/
        /**************模块解析配置**************/
        /**************模块解析配置**************/

        /* 指定模块的解析策略: 'node' (Node.js) or 'classic' (TypeScript pre-1.6)*/
        /* 若未指定，那么在使用了 --module AMD | System | ES2015 时的默认值为 Classic，其它情况时则为 Node */
        // "moduleResolution": "node",

        /* 在解析非绝对路径模块名的时候的基准路径 */
        // "baseUrl": "./",

        /* 基于 'baseUrl' 的路径映射集合 */
        // "paths": {},

        /* 将多个目录放在一个虚拟目录下，用于运行时 */
        /* 当自己编写的库和开发的代码都输出到一个目录下时，开发代码和库的位置不一样，开发代码引入库的路径就会不对 */
        // "rootDirs": [],
        // "rootDirs": ["src","out"],

        /* 允许 export = xxx 导出 ，并使用 import xxx form "module-name" 导入*/
        // "esModuleInterop": true,

        /* 当模块没有默认导出的时候，允许被别的模块默认导入，这个在代码执行的时候没有作用，只是在类型检查的时候生效 */
        // "allowSyntheticDefaultImports": true,


        /* 不要 symlinks 解析的真正路径 */
        // "preserveSymlinks": true,

        /* 允许在模块中以全局变量的方式访问 UMD 模块内容 */
        // "allowUmdGlobalAccess": true,


        /************** Source Map 配置**************/
        /************** Source Map 配置**************/
        /************** Source Map 配置**************/

        /* 指定 ts 文件位置 */
        // "sourceRoot": "",

        /* 指定 map 文件存放的位置 */
        // "mapRoot": "",

        /* 生成目标文件的 sourceMap */
        // "sourceMap": true,

        /* 将代码与sourcemaps生成到一个文件中，要求同时设置了--inlineSourceMap 或--sourceMap 属性*/
        // "inlineSources": true,

        /* 生成目标文件的 inline sourceMap —— 源文件和 sourcemap 文件在同一文件中，而不是把 map 文件放在一个单独的文件里*/
        // "inlineSourceMap": true,

        /* 生成声明文件的 sourceMap */
        // "declarationMap": true,

        /************** 实验性的配置**************/
        /************** 实验性的配置**************/
        /************** 实验性的配置**************/

        /* 启用装饰器 */
        // "experimentalDecorators": true,

        // "emitDecoratorMetadata": true,         /* Enables experimental support for emitting type metadata for decorators. */


        /**************高级配置**************/
        /**************高级配置**************/
        /**************高级配置**************/

        /* 强制区分大小写 */
        // "forceConsistentCasingInFileNames": true

}

    /* 指定需要编译的单个文件列表 */
    // "files": [],

    /* 指定需要编译的文件/目录 */
    // "include": [
    //    // 只写一个目录名等价于 "./src/**/*"
    //    "src"
    //  ]

    /* 需要排除的文件或目录 */
    // "exclude": []

    /* 配置文件继承 */
    // "extends": "./tsconfig.base.json"
	// "jsRules": { "no-empty": true } 对js文件不进行规则检验
}
```



#### TS类型编程

##### 数据类型

- Boolean
- Number
- String
- Array
- Tuple
- Enum
- Unknow
- Any
- Void
- Null and Undefined
- Never
- Object
- 自定义类型，class、interface、type



##### 函数

泛型，泛型根据传入的参数T然后返回处理后的类型

```ts
// 此类型函数会给参数T增加一个属性，输入类型返回类型，输入变量返回变量
type B<T> = T & {
    attrB: "anthor value"
}

// 函数名
// B

// 函数括号和函数参数列表
// <T>

// 函数体
// T & {
//     attrB: "anthor value"
// }
```

**参数类型**

```ts
// <K extends keyof T> 表示参数K的类型是属于keyof T的
type MyRequired<T, K extends keyof T> = T &
  {
    [key in K]-?: T[key];
  };
```

##### 表达式

```ts
// 条件表达式/带三元运算符的条件表达式
type ToDeclareType<T> = T extends (args: any) => PromiseLike<infer R> ? R : never; 

// 函数调用表达式
type ToDeclareType = Omit<App>; 

// 循环表达式，遍历T的key进行Omit处理
type ToDeclareType<T> = { 
    [key in keyof T]: Omit<T[key], '_id'>
}
```



#### 示例

##### 不重复声明，将对象设置为类型使用

```ts
var store = {}
export type Store = typeof store	
```



##### 把函数的参数、返回值解promise/action

```ts
// { [P in keyof T]: T[P] extends Function ? P : never } 构造出函数为有效，非函数为nerver的类型
// [keyof T] ==> 所有key的联合类型
// type[key]的时候会忽略never类型
// { [P in keyof T]: T[P] extends Function ? P : never }[keyof T]  获取对象函数的key

// 提取函数名key
type FuncName<T> = {
  [P in keyof T]: T[P] extends Function ? P : never;
}[keyof T];


// 函数类型改造
type TT<T> = 
T extends (input: Promise<infer U>) => Promise<Action<infer V>>
  ? (input: U) => Action<V>
  : 
    T extends (action: Action<infer U>) => Action<infer V>
  	? (action: U) => Action<V>
  	: never;

type Names = FuncName<EffectModule>;

type Result = {
   [M in Names]: TT<EffectModule[M]>
}


// 不通过中间类型，一次性处理
type A<T> = {
  [k in 
    
    {[{P} in keyof T]: T[P] extends Function ? P : never; }[keyof T]
    
    ]: T[k] extends Function
    ? 
    	T[k] extends (input: Promise<infer U>) => Promise<Action<infer V>>
      	? (input: U) => Action<V>
      	: T[k] extends (action: Action<infer U>) => Action<infer V>
      		? (action: U) => Action<V>
      		: never
    : never;
};
```



