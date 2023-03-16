import{t as n}from"./typescript-f40a959d.js";import{d as c,u,b as p,r as h,o as _,c as f,e as o,i as e,f as s,w as m,g as t,H as l,h as a}from"./index-5eca0ead.js";const g={class:"prosed"},b=o("h1",null,"useDocloader",-1),k=o("a",{href:"https://www.npmjs.com/package/@docdundee/nav"},"@docdundee/nav",-1),w=o("h2",null,"loadDocstrings",-1),D=o("p",null,"A function to load docstrings from a docstrings.json file referenced in the doc folder",-1),v=o("h3",null,"Params",-1),j=o("ul",null,[o("li",null,[o("kbd",null,"routePath"),e(),o("span",{class:"hljs-built_in"},"string | null | undefined"),e(" the path to the folder where a docstrings.json file is. If not provided defaults to doc/")])],-1),x=o("h2",null,"loadMarkdown",-1),y=o("p",null,"A function to load markdown content from a file referenced in the doc folder",-1),N=o("h3",null,"Params",-1),P=o("ul",null,[o("li",null,[o("kbd",null,"filepath"),e(),o("span",{class:"hljs-built_in"},"string"),e(" the path to the file to get the content from")])],-1),E=c({__name:"use_docloader",setup(T){globalThis.useDocloader=u,globalThis.api=p;const d=`//import { ParsedDocstring, useDocloader } from "@docdundee/nav";

const docloader = useDocloader(api);

const docstrings: Record<string, ParsedDocstring> = await docloader.loadDocstrings('/python/2.api');
return '<pre>'+JSON.stringify(docstrings, null, "  ")+'</pre>'`,r=`//import { useDocloader } from "@docdundee/nav"

const docloader = useDocloader(api);

const md: string = await docloader.loadMarkdown('/frontend/1.get_started/1.install.md');
return '<pre>'+md+'</pre>'`;return(A,B)=>{const i=h("router-link");return _(),f("div",g,[b,o("p",null,[e("A composable from the "),k,e(" package to manage the loading of docstring and markdown data from files in the doc folder. This is used by the "),s(i,{to:"/frontend/navigation/composables/use_nav"},{default:m(()=>[e("useNav")]),_:1}),e(" composable and is not meant to be used directly")]),w,D,o("p",null,[s(t(a),{hljs:t(l),code:d,transpile:t(n.transpile)},null,8,["hljs","transpile"])]),v,j,x,y,o("p",null,[s(t(a),{hljs:t(l),code:r,transpile:t(n.transpile)},null,8,["hljs","transpile"])]),N,P])}}});export{E as default};
