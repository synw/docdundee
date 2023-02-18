#!/usr/bin/env node
const fs = require('fs');
const { listFiles, cleanFileList } = require('./lib');


(async () => {
  const args = process.argv.slice(2);
  let baseDir = args.length > 0 ? args[0] : (process.cwd() + "/public/apidoc");
  const _data = await listFiles(baseDir);
  const baseFile = baseDir + "/index.json";
  if (!_data.has("index.json")) {
    try {
      fs.writeFileSync(baseFile, '');
    } catch (e) {
      throw new Error(`Can not write docs index file ${e}`)
    }
  }
  const _li = cleanFileList(_data)
  const content = JSON.stringify(Array.from(_li));
  try {
    fs.writeFileSync(baseFile, content, {
      encoding: 'utf8',
      flag: 'w'
    })
  } catch (e) {
    throw new Error(`Can not write docs file ${e}`)
  }
})();

