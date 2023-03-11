import{_ as n}from"./TsCodeBlock.vue_vue_type_script_setup_true_lang-0a87c0a2.js";import{d as c,u as i,b as u,r as h,o as _,c as p,e as o,h as e,f as t,w as f,g as s,H as l}from"./index-33a74dc9.js";const m={class:"prosed"},g=o("h1",null,"useDocloader",-1),b=o("a",{href:"https://www.npmjs.com/package/@docdundee/nav"},"@docdundee/nav",-1),k=o("h2",null,"loadDocstrings",-1),w=o("p",null,"A function to load docstrings from a docstrings.json file referenced in the doc folder",-1),D=o("h3",null,"Params",-1),v=o("ul",null,[o("li",null,[o("kbd",null,"routePath"),e(),o("span",{class:"hljs-built_in"},"string | null | undefined"),e(" the path to the folder where a docstrings.json file is. If not provided defaults to doc/")])],-1),j=o("h2",null,"loadMarkdown",-1),N=o("p",null,"A function to load markdown content from a file referenced in the doc folder",-1),P=o("h3",null,"Params",-1),x=o("ul",null,[o("li",null,[o("kbd",null,"filepath"),e(),o("span",{class:"hljs-built_in"},"string"),e(" the path to the file to get the content from")])],-1),V=c({__name:"use_docloader",setup(y){globalThis.useDocloader=i,globalThis.api=u;const a=`//import { ParsedDocstring, useDocloader } from "@docdundee/nav";

const docloader = useDocloader(api);

const docstrings: Record<string, ParsedDocstring> = await docloader.loadDocstrings('/python/2.api');
return '<pre>'+JSON.stringify(docstrings, null, "  ")+'</pre>'`,d=`//import { useDocloader } from "@docdundee/nav"

const docloader = useDocloader(api);

const md: string = await docloader.loadMarkdown('/frontend/1.get_started/1.install.md');
return '<pre>'+md+'</pre>'`;return(T,A)=>{const r=h("router-link");return _(),p("div",m,[g,o("p",null,[e("A composable from the "),b,e(" package to manage the loading of docstring and markdown data from files in the doc folder. This is used by the "),t(r,{to:"/frontend/navigation/composables/use_nav"},{default:f(()=>[e("useNav")]),_:1}),e(" composable and is not meant to be used directly")]),k,w,o("p",null,[t(n,{hljs:s(l),code:a},null,8,["hljs"])]),D,v,j,N,o("p",null,[t(n,{hljs:s(l),code:d},null,8,["hljs"])]),P,x])}}});export{V as default};
