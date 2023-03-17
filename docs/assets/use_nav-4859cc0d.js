import{t}from"./typescript-f40a959d.js";import{d as n,g as l,h as r,i as d,n as c,o as i,c as u,a as e,b as p,u as o,H as h,e as _,f as a}from"./index-1bc86d25.js";const m={class:"prosed"},g=e("h1",null,"useNav",-1),v=e("p",null,[a("A composable from the "),e("a",{href:"https://www.npmjs.com/package/@docdundee/nav"},"@docdundee/nav"),a(" package to manage the navigation. This is used in the navigation components and is not meant to be used directly ")],-1),f=e("h2",null,"loadFromRoutePath",-1),b=e("p",null,"Load some content from an url",-1),N=e("h3",null,"Params",-1),T=e("ul",null,[e("li",null,[e("kbd",null,"routePath"),a(),e("span",{class:"hljs-built_in"},"string"),a(" the url to get the content from")])],-1),D=n({__name:"use_nav",setup(k){globalThis.useDocloader=l,globalThis.useNav=r,globalThis.api=d,globalThis.nav=c;const s=`// import { useNav, useDocloader } from "@docdundee/nav";

// const docloader = useDocloader(api);
// const nav = useNav(docloader);

const payload = await nav.loadFromRoutePath('/frontend/get_started/install');
return '<pre>'+JSON.stringify(payload, null, "  ")+'</pre>'`;return(y,j)=>(i(),u("div",m,[g,v,f,b,e("p",null,[p(o(_),{hljs:o(h),code:s,transpile:o(t.transpile)},null,8,["hljs","transpile"])]),N,T]))}});export{D as default};
