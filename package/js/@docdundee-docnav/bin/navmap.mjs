#!/usr/bin/env node
import { createMdMap } from "./maplib.mjs";

(async () => {
  const args = process.argv.slice(2);
  if (args.length == 0) {
    console.log("Please provide a base url")
    return
  }
  let baseDir = process.cwd() + "/public/doc";
  const nav = createMdMap(baseDir, args[0]);
  //console.log("NAV", JSON.stringify(nav, null, "  "));
  //console.log(nav)
  //saveNav(baseDir, nav)
})();
