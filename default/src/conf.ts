import hljs from 'highlight.js/lib/core';
import typescript from 'highlight.js/lib/languages/typescript';
import javascript from 'highlight.js/lib/languages/javascript';
hljs.registerLanguage('typescript', typescript);
hljs.registerLanguage('javascript', javascript);

const libName = "Mylib";

const links: Array<{ href: string; name: string }> = [
  { href: "/apidoc", name: "Api doc" },
  { href: "/examples", name: "Examples" },
];

const examplesExtension = ".ts";

export { libName, links, examplesExtension, hljs }