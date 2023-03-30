import{t as l}from"./typescript-f40a959d.js";import{d as u,h as p,j as h,r as _,o as f,c as m,a as o,f as t,b as s,w as g,u as e,H as n,e as a,M as D}from"./index-03ef2cc8.js";const k={class:"prosed"},w=o("h1",null,"useDocloader",-1),b=o("a",{href:"https://www.npmjs.com/package/@docdundee/nav"},"@docdundee/nav",-1),j=o("h2",null,"loadDocstrings",-1),v=o("p",null,"A function to load docstrings from a docstrings.json file referenced in the doc folder",-1),y=o("h3",null,"Params",-1),P=o("ul",null,[o("li",null,[o("kbd",null,"routePath"),t(),o("span",{class:"hljs-built_in"},"string | null | undefined"),t(" the path to the folder where a docstrings.json file is. If not provided defaults to doc/")])],-1),T=o("h2",null,"loadMarkdown",-1),x=o("p",null,"A function to load markdown content from a file referenced in the doc folder",-1),M=o("h3",null,"Params",-1),N=o("ul",null,[o("li",null,[o("kbd",null,"filepath"),t(),o("span",{class:"hljs-built_in"},"string"),t(" the path to the file to get the content from")])],-1),A=o("h2",null,"Type",-1),H=u({__name:"use_docloader",setup(B){globalThis.useDocloader=p,globalThis.api=h;const r=`//import { ParsedDocstring, useDocloader } from "@docdundee/nav";

const docloader = useDocloader(api);

const docstrings: Record<string, ParsedDocstring> = await docloader.loadDocstrings(
  '/python/api'
);
return '<pre>'+JSON.stringify(docstrings, null, "  ")+'</pre>'`,d=`//import { useDocloader } from "@docdundee/nav"

const docloader = useDocloader(api);

const md: string = await docloader.loadMarkdown(
  '/frontend/get_started/1.install.md'
);
return '<pre>'+md+'</pre>'`,i=`declare const useDocloader: (api: ReturnType<typeof useApi>) => {
    loadDocstrings: (
      routePath: string | null | undefined
    ) => Promise<Record<string, ParsedDocstring>>;
    loadMarkdown: (
      filepath: string
    ) => Promise<string>;
};`;return(C,R)=>{const c=_("router-link");return f(),m("div",k,[w,o("p",null,[t("A composable from the "),b,t(" package to manage the loading of docstring and markdown data from files in the doc folder. This is used by the "),s(c,{to:"/frontend/navigation/composables/use_nav"},{default:g(()=>[t("useNav")]),_:1}),t(" composable and is not meant to be used directly")]),j,v,o("p",null,[s(e(a),{hljs:e(n),code:r,transpile:e(l.transpile)},null,8,["hljs","transpile"])]),y,P,T,x,o("p",null,[s(e(a),{hljs:e(n),code:d,transpile:e(l.transpile)},null,8,["hljs","transpile"])]),M,N,A,o("p",null,[s(e(D),{class:"not-prose",hljs:e(n),code:i,lang:"typescript"},null,8,["hljs"])])])}}});export{H as default};
