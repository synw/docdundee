import { usePython } from "usepython";
import { User } from "@snowind/state";
import { pipPackages, pyodidePackages, loadHljsTheme } from "@/conf";
import { useDocloader } from "./composables/loader";
import { useNav } from "./composables/nav";


const user = new User();
const py = usePython();
const nav = useNav(useDocloader);
nav.init()
/*.then(() => {
  console.log("NAV", JSON.stringify(nav.tree, null, "  "));
})*/


async function initPy() {
  await py.load(pyodidePackages, pipPackages)
}

function initState() {
  loadHljsTheme(user.isDarkMode.value);
  initPy();
}


export { py, user, nav, initPy, initState }