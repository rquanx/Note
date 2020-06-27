/**
 * @param {string} library
 * @param {[]} entrys
 */
function createEntry(library, entrys) {
  let mainEntry = "";
  entrys.forEach((item, index) => {
    if (index === entrys.length - 1) {
      mainEntry += `
        import * as ${library} from "${item}";
        export default ${library};`;
    } else {
      mainEntry += `
        import "${item}";`;
    }
  });
  return mainEntry;
}

module.exports = { createEntry };
