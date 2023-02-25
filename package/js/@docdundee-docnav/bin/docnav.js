#!/usr/bin/env node
import { parseDirTree, saveNav } from "./lib.js";

(async () => {
  const args = process.argv.slice(2);
  //console.log("Args", args);
  let baseDir = args.length > 0 ? args[0] : (process.cwd() + "/public/doc");
  //parseDir(baseDir);
  const nav = parseDirTree(baseDir);
  //console.log("NAV", JSON.stringify(nav, null, "  "));
  saveNav(baseDir, nav)
})();
