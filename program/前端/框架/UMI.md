### CSS

#### 图片import

react, style里写background-image:url() 字符串无法被处理（路径处理）

需要使用import/require css才能处理路径问题（注意：需要webpack设置）



umi/webpack不会对这种纯字符串，没有引入的资源进行处理

[umi特意设置成不生效不会生效](https://github.com/umijs/umi/pull/5031)