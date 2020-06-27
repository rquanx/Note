const fs = require("fs");
const parse = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const { transformFromAst } = require("@babel/core");
const path = require("path");

/**
 * @typedef {Object} IAssets
 * @property {string} [code] 代码
 * @property {string[]} [dependencies] 依赖数组
 * @property {Object} [mapping] 依赖路径映射
 *
 * @param {string} sourceFile
 * @param {Boolean} isContent
 * @returns {IAssets}
 */
function readSource(sourceFile, isContent = false) {
  const content = isContent ? sourceFile : fs.readFileSync(sourceFile, "utf-8");

  // 将内容转为ast,目标类型是module,"unambiguous" 是让 @babel/parser 去猜测
  const ast = parse.parse(content, {
    sourceType: "module"
  });

  // 对ast进行编译转化
  const { code } = transformFromAst(ast, null, {
    presets: ["@babel/preset-env"]
  });

  const dependencies = [];
  // 遍历所有的 import 模块，并将相对路径放入 dependencies
  traverse(ast, {
    ImportDeclaration: ({ node }) => {
      dependencies.push(node.source.value);
    }
  });

  return {
    code,
    dependencies
  };
}

/**
 *
 * @typedef {Object} IAssets
 * @property {string} [code] 代码
 * @property {string[]} [dependencies] 依赖数组
 * @property {Object} [mapping] 依赖路径映射
 *
 * @param {string} fileName
 * @param {IAssets} assets
 * @param {Object} graph
 */
function recursionDep(fileName, assets, graph) {
  assets.mapping = {};
  const dir = path.dirname(fileName);
  assets.dependencies.forEach(importPath => {
    // alias?
    // 依赖?
    var absolutePath = getAssetsAbsolutePath(dir, importPath);
    // 建立import路径和模块资源路径的映射
    assets.mapping[importPath] = absolutePath;

    // 如果模块资源中找不到此模块，则解析内容
    if (!graph[absolutePath]) {
      let depaAssets = readSource(absolutePath);
      graph[absolutePath] = depaAssets;
      if (depaAssets.dependencies.length > 0) {
        recursionDep(absolutePath, depaAssets, graph);
      }
    }
  });
}

/**
 *
 * @param {string} dir
 * @param {string} importPath
 */
function getAssetsAbsolutePath(dir, importPath) {
  var absolutePath =
    importPath[0] === "." ? path.join(dir, importPath) : importPath;
  return absolutePath.replace(/\\/g, "/");
}

module.exports = {
  recursionDep,
  readSource
};
