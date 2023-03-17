<template>
  <div class="prosed">
    <h1>Python code block</h1>
    <p>An editable and executable Python code block is available from the <a
        href="https://github.com/synw/vuepython">Vuepython</a>
      package. In a template:</p>
    <p>
      <static-code-block class="not-prose" :hljs="hljs" :code="codet" lang="html"></static-code-block>
    </p>
    <p>In a script setup tag:</p>
    <p>
      <static-code-block class="not-prose" :hljs="hljs" :code="codes" lang="typescript"></static-code-block>
    </p>
    <h2>Rendering</h2>
    <p class="not-prose">
      <py-code-block id="1" :code="code" :py="py" namespace="codeblock" class="w-limited"></py-code-block>
    </p>
  </div>
</template>

<script setup lang="ts">
import { py } from "@/state";
import { PyCodeBlock } from "vuepython";
import { StaticCodeBlock } from "@docdundee/vue";
import { hljs } from "@/conf";

const codet = `<template>
  <py-code-block id="1" :code="code" :py="py"></py-code-block>
</template>`;

const codes = `import { PyCodeBlock } from "vuepython";
import { py } from "@/state";
import { hljs } from "@/conf"

const code = \`first_name = "Bob"
last_name = "Miller"
name = f"{first_name} {last_name}"
print("The name is", name)
name\``;

const code = `first_name = "Bob"
last_name = "Miller"
name = f"{first_name} {last_name}"
print("The name is", name)
name`;
</script>