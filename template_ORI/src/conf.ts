const libName = "Doc";

const links: Array<{ href: string; name: string }> = [
  //{ href: "/apidoc", name: "Api doc" },
];

// python runtime
const pipPackages = []; // standard pip packages not provided by Pyodide
const pyodidePackages = []; // https://pyodide.org/en/stable/usage/packages-in-pyodide.html#packages-in-pyodide
const examplesExtension = "py";

async function loadHljsTheme(isDark: boolean) {
  if (isDark) {
    await import("../node_modules/highlight.js/styles/base16/material-darker.css")
  } else {
    await import("../node_modules/highlight.js/styles/stackoverflow-light.css")
  }
}

export { libName, pipPackages, examplesExtension, pyodidePackages, links, loadHljsTheme }