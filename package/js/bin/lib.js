const { execute } = require("./exec");
const path = require('path');

async function listFiles(dir) {
  const _data = await execute("ls", [dir]);
  const elems = new Set();
  _data.forEach((item) => {
    if (item.length > 0) {
      if (item.includes(".")) {
        //console.log(item)
        elems.add(item)
      }
    }
  });
  return elems
}

function cleanFileList(files) {
  const l = [];
  files.forEach((f) => {
    if (f != "index.json") {
      l.push(path.parse(f).name)
    }
  })
  return l;
}

module.exports = { listFiles, cleanFileList }