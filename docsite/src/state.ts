import { usePython } from "usepython";
import { User } from "@snowind/state";
import { pipPackages, pyodidePackages, loadHljsTheme } from "@/conf";


const user = new User();
const py = usePython();


async function initPy() {
  await py.load(pyodidePackages, pipPackages)
}

function initState() {
  loadHljsTheme(user.isDarkMode.value);
  initPy();
}


export { py, user, initPy, initState }