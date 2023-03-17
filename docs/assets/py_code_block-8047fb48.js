import{d as i,o as m,c as r,a as e,b as o,u as t,H as s,O as a,p as d,s as _,f as n}from"./index-1bc86d25.js";const h={class:"prosed"},u=e("h1",null,"Python code block",-1),f=e("p",null,[n("An editable and executable Python code block is available from the "),e("a",{href:"https://github.com/synw/vuepython"},"Vuepython"),n(" package. In a template:")],-1),y=e("p",null,"In a script setup tag:",-1),b=e("h2",null,"Rendering",-1),k={class:"not-prose"},x=i({__name:"py_code_block",setup(g){const l=`<template>
  <py-code-block id="1" :code="code" :py="py"></py-code-block>
</template>`,c=`import { PyCodeBlock } from "vuepython";
import { py } from "@/state";
import { hljs } from "@/conf"

const code = \`first_name = "Bob"
last_name = "Miller"
name = f"{first_name} {last_name}"
print("The name is", name)
name\``,p=`first_name = "Bob"
last_name = "Miller"
name = f"{first_name} {last_name}"
print("The name is", name)
name`;return(B,j)=>(m(),r("div",h,[u,f,e("p",null,[o(t(a),{class:"not-prose",hljs:t(s),code:l,lang:"html"},null,8,["hljs"])]),y,e("p",null,[o(t(a),{class:"not-prose",hljs:t(s),code:c,lang:"typescript"},null,8,["hljs"])]),b,e("p",k,[o(t(_),{id:"1",code:p,py:t(d),namespace:"codeblock",class:"w-limited"},null,8,["py"])])]))}});export{x as default};
