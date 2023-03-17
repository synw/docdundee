<template>
  <div class="prosed">
    <h1>Typescript code block</h1>
    <p>An editable and executable Typescript code block is available. In a template:</p>
    <p>
      <static-code-block class="not-prose" :hljs="hljs" :code="codet" lang="html"></static-code-block>
    </p>
    <p>In a script setup tag:</p>
    <p>
      <static-code-block class="not-prose" :hljs="hljs" :code="codes" lang="typescript"></static-code-block>
    </p>
    <h2>Rendering</h2>
    <p class="not-prose">
      <ts-code-block :code="code" :transpile="transpile" :hljs="hljs"></ts-code-block>
    </p>
  </div>
</template>

<script setup lang="ts">
import { transpile } from "typescript";
import { TsCodeBlock } from "@docdundee/vue";
import { StaticCodeBlock } from "@docdundee/vue";
import { hljs } from "@/conf";

const codet = `<template>
  <ts-code-block :code="code" :transpile="transpile" :hljs="hljs">
  </ts-code-block>
</template>`;

const codes = `import { transpile } from "typescript";
import { TsCodeBlock } from "@docdundee/vue";
import { hljs } from "@/conf";

const code = \`interface MyObj {
  myString: string;
  myNumber: number;
}
const obj: MyObj = { "myString": "x", "myNumber": 0 }
return JSON.stringify(obj)\`;`;

const code = `interface MyObj {
  myString: string;
  myNumber: number;
}
const obj: MyObj = { "myString": "x", "myNumber": 0 }
return JSON.stringify(obj)`;
</script>