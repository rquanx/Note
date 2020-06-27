function bundle(entry, graph) {
  let modules = "";
  for (let filename in graph) {
    let mod = graph[filename];
    modules += `'${filename}': [
          function(require, module, exports) {
            ${mod.code}
          },
          ${JSON.stringify(mod.mapping)},
        ],`;
  }
  return `
      (function(modules) {
        const moduleCache = {};
        function require(moduleId) {

          console.log("require " + moduleId);
          if(moduleCache[moduleId]) {
            console.log(moduleId + " is cache");
            return moduleCache[moduleId].exports;
          }

          const [fn, mapping] = modules[moduleId];

          function localRequire(name) {
            return require(mapping[name]);
          }

          const module = {exports: {}};
          fn(localRequire, module, module.exports);
          
          moduleCache[moduleId] = module;
          return module.exports
        }
        require('${entry}')
      })({${modules}})
    `;
}

module.exports = {bundle};
