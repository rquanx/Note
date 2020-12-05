### ECMAScript

#### 概述

`Ecma International`： 是一个制定信息和通讯技术方面的国际标准的组织



`ECMAScript`是由`Ecma International` 颁布的一部语言标准，编号为 `262`，所以又称为 `ECMA-262`

`ECMA-262`由 `EMCA International` 的 `TC39（Technical Committee 39）`技术委员会编写



#### 工作流程



- Strawperson
- Proposal
- Draft
- Candidate
- Finished



#### QNA

**为什么 ECMAScript 会在两个网站上出现两个版本？为什么 TC39 会在 2020 年就发布了 2021 年的内容？应该以哪个为准？**

`TC39` 会在一年之内定期地多次发布新内容,`TC39` 的版本会比 `Ecma International` 官网上的更加新一些，其中包含一些已完成但暂未正式列入规范的新内容



 `TC39` 会每年将自己编写的内容整理出来，在上半年提交给 `Ecma International` 作为正式版于七月份发布。而当提交之后，TC39 在当年后续更新的内容即被标记为下一年的内容



### 风格指南

#### 三目运算符

```javascript
// 三目运算符使用
// bad
const foo = a ? a : b;
const bar = c ? true : false;
const baz = c ? false : true;

// good
const foo = a || b;
const bar = !!c;
const baz = !c;
```

#### 注释规范

#### [jsdoc](https://www.tslang.cn/docs/handbook/type-checking-javascript-files.html)



### 编码规范

#### ESLint

[eslint规范](https://codexu.github.io/docs/2-basics/5-eslint.html)