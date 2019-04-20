##### 简述



##### 注意

- rollup无法识别node_modules中的包，需要安装插件npm install --save-dev rollup-plugin-node-resolve，然后在plugins中使用：
- node_modules中的包大部分都是commonjs格式的，要在rollup中使用必须先转为ES6语法，为此需要安装插件 [rollup-plugin-commonjs](https://github.com/rollup/rollup-plugin-commonjs)
- 如果打包代码有使用node.js的基本库，需要增加忽略







##### 注意

rollup识别`../util/`时，并不会自动去查找util目录下的`index.js`文件