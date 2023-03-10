const libName = "Docdundee";
const libTitle = "Docdundee";

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

/** Import the languages you need for highlighting */
import hljs from 'highlight.js/lib/core';
import python from 'highlight.js/lib/languages/python';
import bash from 'highlight.js/lib/languages/bash';
import typescript from 'highlight.js/lib/languages/typescript';
import xml from 'highlight.js/lib/languages/xml';
hljs.registerLanguage('python', python);
hljs.registerLanguage('typescript', typescript);
hljs.registerLanguage('bash', bash);
hljs.registerLanguage('html', xml);


export { libName, libTitle, pipPackages, examplesExtension, pyodidePackages, links, hljs, loadHljsTheme }