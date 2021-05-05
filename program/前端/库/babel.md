##### 版本差异

**6**

babel preset stage 转换语法，API 则交给 babel-plugin-transform-runtime 或者 babel-polyfill 来实现

**7**

babel preset stage 以及 es2015 es2016 废弃，取而代之的是 `@babel/preset-env`，即转换语法也提供API转换(polyfill),polyfill会污染全局

`@babel/plugin-transform-runtime`：polyfill不污染全局，防止自动polyfill的全局污染，一旦采用 `@babel/plugin-transform-runtime`, `@babel/preset-env` 中的 targets 将会失效