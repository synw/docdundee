<template>
  <div>
    <div class="p-3 bg-black rounded-md txt-background dark:txt-background code-content w-max">
      <code-editor :code="props.code" lang="typescript" @edit="codeChange($event)" :hljs="hljs"></code-editor>
    </div>
    <button class="mt-3 btn secondary" @click="runCode()">Run</button>
    <div class="p-3 mt-5 rounded-md code-content w-max block-lighter" v-if="result.length>0">
      <pre><code v-html="result"></code></pre>
    </div>
  </div>
</template>

<script setup lang="ts">
import * as ts from "typescript";
import { ref } from 'vue';
import { CodeEditor } from "vuecodit";
import "vuecodit/style.css";
import "highlight.js/styles/stackoverflow-dark.css";
import { api, apiDemo } from '@/state';
import { hljs } from "@/conf"
import { ResponseError } from "restmix";

const props = defineProps({
  code: {
    type: String,
    required: true
  }
});

let editedCode = ref("");
const result = ref("");

function codeChange(e: string) {
  // update the code
  editedCode.value = e;
}
async function runCode() {
  // execute the code
  const c = ts.transpile(editedCode.value)
  globalThis["api"] = apiDemo;
  globalThis["ResponseError"] = ResponseError;
  const res = await Object.getPrototypeOf(async function () { }).constructor(c)();
  //console.log(typeof res, res);
  let code: string;
  if (res) {
    if (typeof res == 'string') {
      code = hljs.highlight(res, { language: "json" }).value;
    } else {
      code = hljs.highlight(JSON.stringify(res, null, "  "), { language: "json" }).value;
    }
    result.value = code;
  }

}
</script>

<style lang="sass" scoped>
  .code-content
    min-width: 100ch
</style>