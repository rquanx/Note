#### 配置

[output](https://blog.csdn.net/whh181/article/details/80613633)

- `libraryTarget`:  导出为什么，var以一个对象保存，window附加到window对象上
- `library`： 导出的模块命名



#### Tapable

- 普通型basic：按照tap的注册顺序一个个向下执行。
- 流水型water：虽然也是按照tap的顺序一个个向下执行，但是如果上一个tap有返回值，那么下一个tap的传入参数就是上一个tap的返回值。

- 熔断型bail：如果返回了null以外的值，就不继续执

 

`AsyncHook`同时支持`tap`、`tapAsync`、`tapPromise`

Tap: 增加同步事件?

tapAsync:增加异步回调型事件

tapPromise: 增加Promise型事件



#### Loader

函数 只做一件事，输入，文件转换或获取文件

- 不写Include   会处理全部符合正则的代码
- Exclude  排除
- 写include 处理include路径下所有符合条件的文件
- 在最后的 loader 首先被执行



#### 热更新

[一年前，我去面试，小姐姐问我webpack热更新原理，我跟她说了一小时](https://mp.weixin.qq.com/s/gG_FwVGHiJGjQOvt5rZheA)
[彻底搞懂 vite 中的 HMR 原理](https://mp.weixin.qq.com/s/xRAg_6I5QLbsVjL4YH6qeQ)



监听本地文件的变化主要是通过文件的生成时间是否有变化



**原理**

webpack 模块都是缓存在 module 对象中，热更新则是将旧的 value 删除然后以新的值替换

- 热更新代码请求：通过 jsonp 请求 js 获取 js 代码，然后创建 script 标签执行
- 调用全局方法 webpackHotUpdate，移除缓存中的过期模块，存储新模块
- 通过**webpack_require**执行新的模块代码



#### 插件

类，监听不同生命周期进行工作 输出，更改输出的内容



##### dll plugin

**问题**

Call undefined 报错： 可能dll打包缺少
Object is not a function都可能是缺少dll



##### HTML

HtmlWebpackPlugin(耗时长)

全局导入(webpack.ProvidePlugin)

```javascript
new webpack.ProvidePlugin({
    React:'react',
    ReactDOM:'react-dom',
    Component:['react','Component']
})
```



##### NamedModules

new webpack.NamedModulesPlugin(), //用于启动HMR时可以显示模块的相对路径




##### CSS

**[style loader](https://github.com/webpack-contrib/style-loader)**

**[css-module](https://github.com/gajus/react-css-modules)**

```javascript
 {
                test: /\.css$/,
                loaders: [
                    'style-loader?sourceMap',
                    'css-loader?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]'
                ]
            }
```



**postcss**

Postcsss 只处理import的

precss 

> 支持Sass语法，使用css变量 需先@import对于的css



提示没有使用插件问题
> [require("postcss-import")处理](https://github.com/postcss/postcss/issues/1247)




##### JS

[typescript css modules](https://www.colabug.com/2303193.html)
如果是typescript需要定义声明文件

```javascript
declare module "*.css" {
    var content: any;
    export default content;
}
```





##### TypeScript

使用ts-loader或者awesome-typescript-loader进行编译

Typescript 直出 ES5 已经非常成熟，用 ts-loader 即可，如果有需要使用 Babel 进行 ES6 到 ES3 编译的可以使用 awesome-typescript-loader





##### 压缩

**ParallelUglifyPlugin**

多线程压缩

现在不维护合并到`UglifyJsPlugin`



#### 常见问题

##### Invalid Host/Origin header

[webpack `Invalid Host/Origin header`问题](https://blog.csdn.net/u013243347/article/details/85223016)

##### require引入错误的同名文件

require的时候对应相同路径但不同后缀的文件可能会查找错误，例：require("xxx") 想要找xxx.js但找了xxx.css，

> 解决：需要在webpack中设置resolve的顺序



##### 触发多次刷新

配置了devServer.watchContentBase 为 true 的时候，Server 会监听这些配置文件夹中静态文件的变化
> watchContentBase: true, // 会导致多次刷新


##### 打包出错

- 文件内容缺少、未定义
  检查webpack和webpack-cli版本是否不对应
- There are multiple modules with names that only differ in casing.
  This can lead to unexpected behavior when compiling on a filesystem with other case-semantic.
  Use equal casing. Compare these module identifiers:
- 看被多处地方引用时引入的文件和变量名是否有不同

package.json中@types/react-dom版本问题？
TypeScript: Duplicate identifier 'LibraryManagedAttributes
​	直接删除



react route 问题
Cannot GET /CalloutNestedExample



##### 打包node程序忽略自带模块

忽略打包node模块
	webpack-node-externals
    Target: node


```javascript
const nodeModules = {};
fs.readdirSync("node_modules")
    .filter(function (x) {
        return [".bin"].indexOf(x) === -1;
    })
    .forEach(function (mod) {
        nodeModules[mod] = "commonjs " + mod;
    });

node: {
        fs: 'empty',
        child_process: 'empty',
        tls: 'empty',
        net: 'empty'
    },
        
externals: nodeModules
```



##### Dll TreeShaking

建立一个js

```js
export { Spinner, SpinnerSize } from 'office-ui-fabric-react/lib/Spinner';
// xxx
```

以这个js为入口进行dll打包

#### 知识点

##### 魔术注释

```js
import (
  /* webpackChunkName: “my-chunk-name” */ 	// 设置chunk name
  /* webpackMode: lazy */					// 设置懒加载模式
  /* webpackPrefetch: true */				// 类似<link rel=“prefetch”> 在空闲时加载所需资源，确保代码在未来一定会用到时，再开启该
  './footer'
)
```



##### CodeSplit

```js
// 静态分割固定路径
const getModal = () => import('./src/modal.js') 

// 动态加载
const getTheme = (themeName) => import(`./src/themes/${themeName}`)

// 实现
// Webpack 会在构建时将你声明的目录下的所有可能分离的代码都抽象为一个文件（这被称为 contextModule 模块）
```





##### SouceMap

sourceMap:报错信息显示正确的变量名、行数

- inline 是以dateURL的形式添加map，不额外生成map文件
- cheap     是没有列信息
- module 是包含了loader的sourcemap
- source-map     则是映射到源文件



##### hash
| hash类型    | 区别                                                         |
| ----------- | :----------------------------------------------------------- |
| hash        | hash是根据整个项目构建，只要项目里有文件更改，整个项目构建的hash值都会更改，并且全部文件都共用相同的hash值 |
| chunkhash   | chunkhash根据不同的入口文件(Entry)进行依赖文件解析、构建对应的代码块（chunk），生成对应的哈希值，某文件变化时只有该文件对应代码块（chunk）的hash会变化 |
| contentHash | 每一个代码块（chunk）中的js和css输出文件都会独立生成一个hash，当某一个代码块（chunk）中的js源文件被修改时，只有该代码块（chunk）输出的js文件的hash会发生变化 |


#### 文章

[webpack-dev-server](https://webpack.js.org/configuration/dev-server/#devserver-hot)

[webpack 插件总结归类](https://segmentfault.com/a/1190000016816813)

[webpack入门说明](https://juejin.im/post/5bd66efcf265da0a8a6af2d2)

[入门博客](https://www.jianshu.com/p/3066d96aec8b)

[webpart实现js包](https://juejin.im/post/5bfca0e8f265da611204b3ca)

[webpack详解](https://github.com/ruizeng/blog/blob/master/Frontend/dive-into-webpack/article.md?hmsr=toutiao.io&utm_medium=toutiao.io&utm_source=toutiao.io)

[你真的会拆分代码吗,好](https://mp.weixin.qq.com/s?__biz=MzUxMzcxMzE5Ng==&mid=2247490234&idx=1&sn=a57614db8d5570eb4cf71c39d376ab46&chksm=f951aff9ce2626ef928250381d1914629393d75d75bbb124da6a3370bef94820132b07d11c6b&mpshare=1&scene=23&srcid=01094hCOdOckeg4crRiHe5xz#rd)

[JavaScript性能优化之摇树，一般](http://mp.weixin.qq.com/s?__biz=MzUxMzcxMzE5Ng==&mid=2247490230&idx=1&sn=7c407256e1d144631ea143f593311153&chksm=f951aff5ce2626e3c362361ac5473dcc231ffee12c8e5e9e34fd5b9b664b2cce3122b517e992&mpshare=1&scene=23&srcid=0109fyVv66SYSRewfZ52NGZV#rd)

![img](..\..\..\Note.assets\16b978c70362f7a4)