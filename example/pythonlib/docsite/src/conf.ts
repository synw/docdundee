const libName = "Example Doc";

const links: Array<{ href: string; name: string }> = [
  { href: "/mylib", name: "My lib" },
  { href: "/requests", name: "Requests" },
  { href: "/dataframe", name: "DataFrame" },
];

const mylib = new URL(`../mylib-0.0.1-py3-none-any.whl`, import.meta.url).href;
// python runtime
const pipPackages = ["requests", mylib];
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