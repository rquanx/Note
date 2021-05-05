- source-map: 生成单独的source map 文件，js中附带定位,可定位原始代码
- eval: 不生成source map 文件，内容通过eval全包含在js文件中，可自行对压缩后代码进行定位，自行定位压缩后代码
- hidden-source-map: 生成sourcemap文件，js中不附带定位，浏览器无法自动找出source map进行映射，需自行进行映射，可定位原始代码
- inline-source-map: 不生成source map 文件,内容包含在js文件中，但会经过Base64编码，可定位原始代码
- eval-source-map: 不生成source map 文件，内容通过eval全包含在js文件中,并且eval的内容会经过Base64编码，可定位原始代码
- cheap-source-map: 生成sourcemap文件，但通过sourceMap无法定位代码位置，自行定位压缩后代码？

[官方推荐](https://webpack.js.org/configuration/devtool/#special-cases)

> 生产环境: source-map(完整，但不允许外部访问)、hidden-source-map、none

