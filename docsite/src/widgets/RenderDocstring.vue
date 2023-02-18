<template>
  <div>
    <div class="prosed">
      <h1 v-if="name">{{ name }}</h1>
      <div v-html="method.docstring.description"> </div>
    </div>
    <pre class="py-2 mt-5 w-max"><code v-html="parsedCode" style="white-space: pre"></code></pre>
    <div class="mt-5 prosed">
      <div class="mt-3" v-if="method.docstring.long_description" v-html="method.docstring.long_description"> </div>
      <div v-if="Object.keys(method.docstring.params).length > 0">
        <h3>Parameters</h3>
        <ul class="mt-3 space-y-2">
          <li v-for="param in Object.keys(method.docstring.params)">
            <kbd class="mr-1 font-bold" v-html="param"></kbd> <span class="hljs-built_in"
              v-html="method.docstring.params[param].type"></span>:
            <span v-html="method.docstring.params[param].description"></span>
          </li>
        </ul>
      </div>
      <div class="mt-5" v-if="method.docstring?.returns?.type">
        <h3>Returns</h3>
        <div class="mt-3">
          <span class="hljs-built_in" v-html="method.docstring.returns.type"></span>
        </div>
      </div>
      <div class="mt-5" v-if="Object.keys(method.docstring.raises).length > 0">
        <h3>Raises</h3>
        <div class="mt-3" v-for="raise in method.docstring.raises">
          <span class="hljs-built_in" v-html="raise.type"></span>:
          <span v-html="raise.description"></span>
        </div>
      </div>
    </div>
    <div class="mt-5 prosed" v-if="method.docstring.example">
      <div class="mt-3" v-if="method.docstring.example.is_executable">
        <h2>Executable example</h2>
        <py-code-block class="not-prose" :controls="true" :id="'example_' + method.name" :py="py"
          :code="method.docstring.example.code" :theme="user.isDarkMode.value == true ? 'dark' : 'light'" width="52rem">
        </py-code-block>
      </div>
      <div class="mt-3" v-else>
        <h2>Example</h2>
        <static-code-block class="static-code not-prose" :code="method.docstring.example.code"></static-code-block>
      </div>
    </div>
    <div class="mt-5 prosed" v-if="example">
      <div class="mt-3" v-if="example.is_executable">
        <h2>Executable example</h2>
        <py-code-block class="not-prose" :controls="true" :id="'example_' + Date()" :py="py" :code="example.code"
          :theme="user.isDarkMode.value == true ? 'dark' : 'light'">
        </py-code-block>
      </div>
      <div class="mt-3" v-else>
        <h2>Example</h2>
        <static-code-block class="static-code not-prose" :code="example.code"></static-code-block>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import hljs from 'highlight.js/lib/core';
import python from 'highlight.js/lib/languages/python';
import { PyCodeBlock } from "vuepython";
import StaticCodeBlock from './StaticCodeBlock.vue';
import { ref, watchEffect } from 'vue';
import { py, user } from '@/state';

const props = defineProps({
  method: {
    type: Object,
    required: true
  },
  example: {
    type: Object as () => { code: string, is_executable: boolean }
  },
  name: {
    type: String
  }
});

hljs.registerLanguage('python', python);
const parsedCode = ref("");

function load() {
  parsedCode.value = hljs.highlight(props.method.docstring["funcdef"], { language: "python" }).value;
  //console.log(JSON.stringify(props.method.docstring, null, "  "))
}

watchEffect(() => {
  load();
})
</script>

<style lang="sass">
.code-editor
  @apply bg-gray-100 dark:bg-black dark:text-neutral-200 pb-0 p-3 rounded-md max-w-[100ch] xl:min-w-[100ch] overflow-x-auto border border-gray-200 dark:border-neutral-800
</style>

<style lang="sass" scoped>
.static-code
  @apply bg-gray-100 dark:bg-black dark:text-neutral-200 p-3 rounded-md max-w-[100ch] xl:min-w-[100ch] overflow-x-auto border border-gray-200 dark:border-neutral-800
</style>