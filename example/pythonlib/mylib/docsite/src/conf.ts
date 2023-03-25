const libName = "example";
const libTitle = "Example";
const repoUrl = "https://github.com/synw/docdundee/example/pythonlib/mylib";

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

/** Import the languages you need for highlighting */
import hljs from 'highlight.js/lib/core';
import python from 'highlight.js/lib/languages/python';
//import bash from 'highlight.js/lib/languages/bash';
//import typescript from 'highlight.js/lib/languages/typescript';
//import xml from 'highlight.js/lib/languages/xml';
hljs.registerLanguage('python', python);
//hljs.registerLanguage('typescript', typescript);
//hljs.registerLanguage('bash', bash);
//hljs.registerLanguage('html', xml);

// some Python code to run after install
const initCode: string | undefined = undefined;

export {
  libName,
  libTitle,
  repoUrl,
  pipPackages,
  examplesExtension,
  pyodidePackages,
  links,
  hljs,
  initCode,
  loadHljsTheme
}