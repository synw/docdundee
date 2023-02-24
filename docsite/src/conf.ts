const libName = "Docdundee";

const links: Array<{ href: string; name: string }> = [
  { href: "/frontend", name: "Frontend" },
  { href: "/python", name: "Python api" },
];

const sidebar = [
  { "Python api": "api" }
]

// const lib = new URL("../docdundee/docdundee-0.0.2-py3-none-any.whl", import.meta.url).href;
// python runtime
const pipPackages = ["docdundee"];
const pyodidePackages = [];
const examplesExtension = "py";

async function loadHljsTheme(isDark: boolean) {
  if (isDark) {
    await import("../node_modules/highlight.js/styles/base16/material-darker.css")
  } else {
    await import("../node_modules/highlight.js/styles/stackoverflow-light.css")
  }
}

export { libName, pipPackages, examplesExtension, pyodidePackages, sidebar, links, loadHljsTheme }