### 版本差异

#### **6**

babel preset stage 转换语法，API 则交给 babel-plugin-transform-runtime 或者 babel-polyfill 来实现




使用提案阶段来划分支持的语法
- babel-preset-es2015
- babel-preset-es2016
- babel-preset-stage0
- babel-preset-stage1



##### **问题**

- 语法阶段会快速变化，导致插件和标记容易对标不上，需要频繁更新
- 统一编译为es5，对于支持新语法的环境产生冗余代码
- polyfill只能手动引入



#### **7**

babel preset stage 以及 es2015 es2016 废弃，取而代之的是 `@babel/preset-env`，即转换语法也提供API转换(polyfill),polyfill会污染全局

`@babel/plugin-transform-runtime`：polyfill不污染全局，防止自动polyfill的全局污染，一旦采用 `@babel/plugin-transform-runtime`, `@babel/preset-env` 中的 targets 将会失效





- 应对阶段快速变化：废除preset，变为支持所有标准的preset-env 和 特定提案的plugin-proposal-x
- 针对冗余代码产生：`@babel/compat-data`维护每个特性在不同环境的什么版本支持的数据，根据browserslist指定的环境只对不支持的语法进行编译
- 针对polyfill手动引入: env根据代码和target自动引入所需的polyfill

##### **问题**

- 存在场景，希望在引入polyfill的同时不污染全局（库？）
- 基于插件运行机制，`@babel/plugin-transform-runtime`无法使用target，只能全量引入

- 不污染全局，最新的`@babel/polyfills`会处理此问题，但暂时不稳定，且会内置到babel8中