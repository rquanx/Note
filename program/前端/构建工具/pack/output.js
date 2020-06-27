const fs = require("fs");
/**
 *
 * @param {string} entry
 * @param {{ path: string,filename: string  }} output
 * @param {string} content
 */
function writeFile(entry, output, content) {
  // 写入
  var fileName = `${output.path}/${resolveOutputFileName(
    entry,
    output.filename
  )}`;
  fs.writeFile(fileName, content, err => {
    if (err) throw err;
    console.log(`${fileName}已被保存`);
  });
}

/**
 *
 * @param {string} entry
 * @param {string} outputName
 */
function resolveOutputFileName(entry, outputName) {
  return outputName.replace("[name]", entry);
}

module.exports = { writeFile };
