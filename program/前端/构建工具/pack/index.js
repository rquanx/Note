// 获取配置文件
const config = require("./pack.config");
const Assets = require("./assets");
const Entry = require("./entry");
const Bundle = require("./bundle");
const Output = require("./output");

// 入口
const entry = config.entry;
const output = config.output;

for (let key in entry) {
  let graph = {};
  entry[key] = Array.isArray(entry[key]) ? entry[key] : [entry[key]];
  let content = Entry.createEntry(output.library, entry[key]);
  let assets = Assets.readSource(content, true);
  graph[output.library] = assets;
  Assets.recursionDep(output.library, assets, graph);

  // 打包
  const result = Bundle.bundle(output.library, graph);
  Output.writeFile(key, output, result);
}
