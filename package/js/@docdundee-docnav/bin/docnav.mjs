#!/usr/bin/env node
import { parseDirTree, saveNav } from "./lib.mjs";

(async () => {
  const args = process.argv.slice(2);
  let baseDir = process.cwd() + "/public/doc";
  let parseTypes = true;
  if (args.length > 0) {
    if (args[0] == "-nt") {
      parseTypes = false
    }
  }
  const nav = parseDirTree(baseDir, parseTypes);
  saveNav(baseDir, nav)
})();
