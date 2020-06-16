### 语法



#### 应用

##### 从包中获取变量

```js
@return {import('webpack').Configuration}
```



##### 声明一个类型

```js
/** @types  {import('webpack').Configuration} */

Var config;
```



```js
// @typedef和@property，声明一个临时的类型
/**
 * ajax方法
 *
 * @example `ajax('url', options)`
 *
 * @typedef {Object} IAjaxOptions
 * @property {boolean} [jsonp] 是否jsonp
 * @property {boolean} [async] 是否async
 * @property {'GET'|'POST'} [methods] 请求方法
 * @property {(options: any)=>void} [success] 成功回调函数
 *
 * @param {string} url url
 * @param {IAjaxOptions} [options] 参数
 * @param { Promise }
 */
```



##### 关闭当前文件检查

顶部注释是// @ts-nocheck



##### 忽略下一行错误

// @ts-ignore



