<template>
  <div class="prosed">
    <h1>Javascript code block</h1>
    <p>An editable and executable Javascript code block is available. In a template:</p>
    <p>
      <static-code-block class="not-prose" :hljs="hljs" :code="codet" lang="html"></static-code-block>
    </p>
    <p>In a script setup tag:</p>
    <p>
      <static-code-block class="not-prose" :hljs="hljs" :code="codes" lang="typescript"></static-code-block>
    </p>
    <h2>Rendering</h2>
    <p class="not-prose">
      <js-code-block :code="code" :on-run="onRun" :hljs="hljs"></js-code-block>
    </p>
  </div>
</template>

<script setup lang="ts">
import { JsCodeBlock } from "@docdundee/vue";
import { StaticCodeBlock } from "@docdundee/vue";
import { hljs } from "@/conf";

const onRun = (code: string) => {
  const res = eval(code);
  console.log(typeof res)
  return res
};

const codet = `<template>
  <js-code-block :code="code" :on-run="onRun" :hljs="hljs"></js-code-block>
</template>`;

const codes = `import { JsCodeBlock } from "@docdundee/vue";
import { hljs } from "@/conf";

const onRun = (code: string) => {
  const res = eval(code);
  console.log(typeof res)
  return res
};

const code = \`const obj = { "myString": "x", "myNumber": 0 }
JSON.stringify(obj)\`;`;

const code = `const obj = { "myString": "x", "myNumber": 0 }
JSON.stringify(obj)`;
</script>