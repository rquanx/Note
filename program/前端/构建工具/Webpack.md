#### 配置

[output](https://blog.csdn.net/whh181/article/details/80613633)
​	libraryTarget:  导出为什么，var以一个对象保存，window附加到window对象上
​	library： 导出的模块命名
module.rules.use数组中，loader 的位置。根据 webpack 规则：放在最后的 loader 首先被执行



#### Tapable

- 普通型basic：这个比较好理解就是按照tap的注册顺序一个个向下执行。
- 流水型water：这个相对于basic的区别就是，虽然也是按照tap的顺序一个个向下执行，但是如果上一个

tap有返回值，那么下一个tap的传入参数就是上一个tap的返回值。

- 熔断型bail：这个相对于water的区别就是，如果返回了null以外的值，就不继续执

 

tapable的各AsyncHook都同时支持tap、tapAsync、tapPromise

Tap: 增加同步事件?
 tapAsync:增加异步回调型事件

tapPromise: 增加Promise型事件

 

部分Hook功能~无用/重复



#### Loader

Loader  不写Include   会处理全部符合正则的代码

​	Exclude  排除

​	写include 处理include路径下所有符合条件的文件



#### 插件

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



##### Css

###### [style loader](https://github.com/webpack-contrib/style-loader)

###### [css-module](https://github.com/gajus/react-css-modules)

```javascript
 {
                test: /\.css$/,
                loaders: [
                    'style-loader?sourceMap',
                    'css-loader?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]'
                ]
            }
```

###### postcss

Postcsss 只处理import的

precss ?  

> 支持Sass语法，使用css变量 需先@import对于的css

提示没有使用插件问题



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

###### ParallelUglifyPlugin

多线程压缩

现在不维护合并到UglifyJsPlugin



#### 常见问题

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



#### 文章

[webpack-dev-server](https://webpack.js.org/configuration/dev-server/#devserver-hot)

[webpack 插件总结归类](https://segmentfault.com/a/1190000016816813)

[webpack入门说明](https://juejin.im/post/5bd66efcf265da0a8a6af2d2)

[入门博客](https://www.jianshu.com/p/3066d96aec8b)

[webpart实现js包](https://juejin.im/post/5bfca0e8f265da611204b3ca)

[webpack详解](https://github.com/ruizeng/blog/blob/master/Frontend/dive-into-webpack/article.md?hmsr=toutiao.io&utm_medium=toutiao.io&utm_source=toutiao.io)

[你真的会拆分代码吗,好](https://mp.weixin.qq.com/s?__biz=MzUxMzcxMzE5Ng==&mid=2247490234&idx=1&sn=a57614db8d5570eb4cf71c39d376ab46&chksm=f951aff9ce2626ef928250381d1914629393d75d75bbb124da6a3370bef94820132b07d11c6b&mpshare=1&scene=23&srcid=01094hCOdOckeg4crRiHe5xz#rd)

[JavaScript性能优化之摇树，一般](http://mp.weixin.qq.com/s?__biz=MzUxMzcxMzE5Ng==&mid=2247490230&idx=1&sn=7c407256e1d144631ea143f593311153&chksm=f951aff5ce2626e3c362361ac5473dcc231ffee12c8e5e9e34fd5b9b664b2cce3122b517e992&mpshare=1&scene=23&srcid=0109fyVv66SYSRewfZ52NGZV#rd)