import { usePython } from "usepython";
import { useApi } from "restmix";
import { User } from "@snowind/state";
import { pipPackages, pyodidePackages, loadHljsTheme } from "@/conf";
import { useDocloader } from "./composables/loader";
import { useNav } from "./composables/nav";

const user = new User();
const py = usePython();
const api = useApi({
  serverUrl: import.meta.env.MODE == "production" ? import.meta.env.BASE_URL : "",
});
const docloader = useDocloader(api);
const nav = useNav(docloader, api);
nav.init().then(() => {
  console.log("NAV", JSON.stringify(nav.tree, null, "  "));
})


async function initPy() {
  await py.load(pyodidePackages, pipPackages)
}

function initState() {
  loadHljsTheme(user.isDarkMode.value);
  initPy();
}


export { py, user, nav, api, initPy, initState }