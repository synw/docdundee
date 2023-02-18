const libName = "Docdundee";

const links: Array<{ href: string; name: string }> = [
  { href: "/apidoc", name: "Api doc" },
  { href: "/examples", name: "Examples" },
];

const sidebar = [
  { "Python api": "api" }
]

// python specific
const pipPackages = ["http:localhost:5173/docdundee-0.0.1-py3-none-any.whl"];
const pyodidePackages = [];
const examplesExtension = ".py";

async function loadHljsTheme(isDark: boolean) {
  if (isDark) {
    await import("../node_modules/highlight.js/styles/base16/material-darker.css")
  } else {
    await import("../node_modules/highlight.js/styles/stackoverflow-light.css")
  }
}

export { libName, pipPackages, examplesExtension, pyodidePackages, sidebar, links, loadHljsTheme }