#### 安装

  安装ts声明文件  cnpm i @types/react-router-dom

#### 语法

declare var SP: any;
​	可以去掉引用外部js东西时报错



##### type

```typescript
type a = {
	b: string
}

/** x */
interface b {
    
}

type bb = b[];

type t = typeof { b: "1"}

```



#### 使用

##### 高级

Keyof 约束类型是一堆中的某一个

Partial<x> // 使用这个类型时，x的属性不完整也不会报错

Pick<x>


##### 预声明

模块的预声明.d.ts，要和对应模块在同一路径下
​	/caml.js
​	/caml.d.ts     声明对于js的一些定义，方便编译器提示

##### 别名

import ObserverableArray = kendo.data.ObservableArray;
type  str  = string;

[typescript的一些基础说明](https://www.jianshu.com/p/103933b7c2b4)

[typescript一些小细节说明，文档生成](http://taobaofed.org/blog/2017/03/09/head-first-typescript/)





##### 配置

tsconfig.json allowjs : true  ts会提供一些类型检查和智能提示  

[tsconfig.json](http://www.css88.com/doc/typescript/doc/handbook/tsconfig.json.html)



#### 文件查找

##### Place

当我提及被检查的 `place` 时，我想表达的是在这个 `place`，TypeScript 将会检查以下内容（例如一个 `foo` 的位置）：

- 如果这个 `place` 表示一个文件，如：`foo.ts`，欢呼！
- 否则，如果这个 `place` 是一个文件夹，并且存在一个文件 `foo/index.ts`，欢呼！
- 否则，如果这个 `place` 是一个文件夹，并且存在一个 `foo/package.json` 文件，在该文件中指定 `types` 的文件存在，那么就欢呼！
- 否则，如果这个 `place` 是一个文件夹，并且存在一个 `package.json` 文件，在该文件中指定 `main` 的文件存在，那么就欢呼！





##### 动态查找

当导入路径不是相对路径时，模块解析将会模仿 [Node 模块解析策略](https://nodejs.org/api/modules.html#modules_all_together)，以下我将给出一个简单例子：

- 当你使用

  ```
  import * as foo from 'foo'
  ```

  ，将会按如下顺序查找模块：

  - `./node_modules/foo`
  - `../node_modules/foo`
  - `../../node_modules/foo`
  - 直到系统的根目录

  

- 当你使用

  ```
  import * as foo from 'something/foo'
  ```

  ，将会按照如下顺序查找内容

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



#### 编码规范

#### TSLint

##### 使用说明

- 创建tslint.json
- 配置tslint.json
- 安装tslint
- package.json的script中设置指令

##### 设置

[tslint规则](https://palantir.github.io/tslint/rules/)



#### TsConfig

```json
jsxFactory": "h",// preact设置   编译成h
```



