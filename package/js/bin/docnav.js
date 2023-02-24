#!/usr/bin/env node
import { parseDir } from "./lib.js";

(async () => {
  const args = process.argv.slice(2);
  //console.log("Args", args);
  let baseDir = args.length > 0 ? args[0] : (process.cwd() + "/public/doc");
  parseDir(baseDir)
})();
