#!/usr/bin/env node
import { parseInterfaces } from "./docstrings_lib.mjs";

(async () => {
  parseInterfaces("../../../docsite/public/doc/frontend/interfaces", { exec_ex: false });
})();