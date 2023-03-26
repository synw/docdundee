import{d as defineComponent,o as openBlock,c as createElementBlock,a as createBaseVNode,b as createVNode,u as unref,H as HighlightJS,M as Mt,r as rj}from"./index-e2c6cad5.js";const _hoisted_1={class:"prosed"},_hoisted_2=createBaseVNode("h1",null,"Javascript code block",-1),_hoisted_3=createBaseVNode("p",null,"An editable and executable Javascript code block is available. In a template:",-1),_hoisted_4=createBaseVNode("p",null,"In a script setup tag:",-1),_hoisted_5=createBaseVNode("h2",null,"Rendering",-1),_hoisted_6={class:"not-prose"},_sfc_main=defineComponent({__name:"js_code_block",setup(__props){const onRun=code=>{const res=eval(code);return console.log(typeof res),res},codet=`<template>
  <js-code-block :code="code" :on-run="onRun" :hljs="hljs"></js-code-block>
</template>`,codes=`import { JsCodeBlock } from "@docdundee/vue";
import { hljs } from "@/conf";

const onRun = (code: string) => {
  const res = eval(code);
  console.log(typeof res)
  return res
};

const code = \`const obj = { "myString": "x", "myNumber": 0 }
JSON.stringify(obj)\`;`,code=`const obj = { "myString": "x", "myNumber": 0 }
JSON.stringify(obj)`;return(e,o)=>(openBlock(),createElementBlock("div",_hoisted_1,[_hoisted_2,_hoisted_3,createBaseVNode("p",null,[createVNode(unref(Mt),{class:"not-prose",hljs:unref(HighlightJS),code:codet,lang:"html"},null,8,["hljs"])]),_hoisted_4,createBaseVNode("p",null,[createVNode(unref(Mt),{class:"not-prose",hljs:unref(HighlightJS),code:codes,lang:"typescript"},null,8,["hljs"])]),_hoisted_5,createBaseVNode("p",_hoisted_6,[createVNode(unref(rj),{code,"on-run":onRun,hljs:unref(HighlightJS)},null,8,["hljs"])])]))}});export{_sfc_main as default};
