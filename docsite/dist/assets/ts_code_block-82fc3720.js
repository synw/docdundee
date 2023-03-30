import{t as a}from"./typescript-f40a959d.js";import{d as i,o as p,c as d,a as t,b as s,u as e,H as o,M as n,e as m}from"./index-03ef2cc8.js";const u={class:"prosed"},b=t("h1",null,"Typescript code block",-1),_=t("p",null,"An editable and executable Typescript code block is available. In a template:",-1),h=t("p",null,"In a script setup tag:",-1),y=t("h2",null,"Rendering",-1),j={class:"not-prose"},x=i({__name:"ts_code_block",setup(f){const r=`<template>
  <ts-code-block :code="code" :transpile="transpile" :hljs="hljs">
  </ts-code-block>
</template>`,l=`import { transpile } from "typescript";
import { TsCodeBlock } from "@docdundee/vue";
import { hljs } from "@/conf";

const code = \`interface MyObj {
  myString: string;
  myNumber: number;
}
const obj: MyObj = { "myString": "x", "myNumber": 0 }
return JSON.stringify(obj)\`;`,c=`interface MyObj {
  myString: string;
  myNumber: number;
}
const obj: MyObj = { "myString": "x", "myNumber": 0 }
return JSON.stringify(obj)`;return(g,k)=>(p(),d("div",u,[b,_,t("p",null,[s(e(n),{class:"not-prose",hljs:e(o),code:r,lang:"html"},null,8,["hljs"])]),h,t("p",null,[s(e(n),{class:"not-prose",hljs:e(o),code:l,lang:"typescript"},null,8,["hljs"])]),y,t("p",j,[s(e(m),{code:c,transpile:e(a.transpile),hljs:e(o)},null,8,["transpile","hljs"])])]))}});export{x as default};
