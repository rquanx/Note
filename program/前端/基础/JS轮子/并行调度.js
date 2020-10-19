var list = [];
var maxCount = 2;
var count = 0;
async function add(fn) {
  count >= maxCount
    ? await new Promise((resolve) => {
        this.list.push(resolve);
      })
    : "";

  count++;
  var r = await fn();
  count--;
  list.shift()();

  return r;
}
