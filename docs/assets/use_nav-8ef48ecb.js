import{_ as s}from"./TsCodeBlock.vue_vue_type_script_setup_true_lang-0a87c0a2.js";import{d as t,u as n,a as l,b as d,n as c,o as r,c as i,e,f as u,g as h,H as _,h as o}from"./index-33a74dc9.js";const p={class:"prosed"},m=e("h1",null,"useNav",-1),g=e("p",null,[o("A composable from the "),e("a",{href:"https://www.npmjs.com/package/@docdundee/nav"},"@docdundee/nav"),o(" package to manage the navigation. This is used in the navigation components and is not meant to be used directly ")],-1),v=e("h2",null,"loadFromRoutePath",-1),f=e("p",null,"Load some content from an url",-1),b=e("h3",null,"Params",-1),N=e("ul",null,[e("li",null,[e("kbd",null,"routePath"),o(),e("span",{class:"hljs-built_in"},"string"),o(" the url to get the content from")])],-1),D=t({__name:"use_nav",setup(T){globalThis.useDocloader=n,globalThis.useNav=l,globalThis.api=d,globalThis.nav=c;const a=`// import { useNav, useDocloader } from "@docdundee/nav";

// const docloader = useDocloader(api);
// const nav = useNav(docloader);

const payload = await nav.loadFromRoutePath('/frontend/get_started/install');
return '<pre>'+JSON.stringify(payload, null, "  ")+'</pre>'`;return(k,j)=>(r(),i("div",p,[m,g,v,f,e("p",null,[u(s,{hljs:h(_),code:a},null,8,["hljs"])]),b,N]))}});export{D as default};
