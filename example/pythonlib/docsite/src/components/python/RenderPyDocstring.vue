<template>
  <div>
    <div class="prosed">
      <h1 v-if="title">{{ title }}</h1>
      <slot></slot>
      <div v-html="docstring.description"></div>
    </div>
    <pre class="py-2 mt-5 w-max"><code v-html="parsedCode" style="white-space: pre"></code></pre>
    <div class="mt-5 prosed">
      <div class="mt-3" v-if="docstring.long_description" v-html="docstring.long_description"> </div>
      <div v-if="Object.keys(docstring.params).length > 0">
        <h3>Parameters</h3>
        <ul class="mt-3 space-y-2">
          <li v-for="param in Object.keys(docstring.params)">
            <kbd class="mr-1 font-bold" v-html="param"></kbd> <span class="hljs-built_in"
              v-html="docstring.params[param].type"></span>:
            <span v-html="docstring.params[param].description"></span>
          </li>
        </ul>
      </div>
      <div class="mt-5" v-if="docstring?.returns?.type">
        <h3>Returns</h3>
        <div class="mt-3">
          <span class="hljs-built_in" v-html="docstring.returns.type"></span>
        </div>
      </div>
      <div class="mt-5" v-if="Object.keys(docstring.raises).length > 0">
        <h3>Raises</h3>
        <div class="mt-3" v-for="raise in docstring.raises">
          <span class="hljs-built_in" v-html="raise.type"></span>:
          <span v-html="raise.description"></span>
        </div>
      </div>
    </div>
    <div class="mt-5 prosed" v-if="docstring.example">
      <div class="mt-3" v-if="docstring.example.is_executable">
        <h2>Executable example</h2>
        <py-code-block class="not-prose" :controls="true" :id="'example_0'" :py="py" :code="docstring.example.code"
          :theme="user.isDarkMode.value == true ? 'dark' : 'light'" width="52rem">
        </py-code-block>
      </div>
      <div class="mt-3" v-else>
        <h2>Example</h2>
        <static-code-block class="static-code not-prose" :code="docstring.example.code"></static-code-block>
      </div>
    </div>
    <div class="mt-5 prosed" v-if="docstring.extra_examples">
      <div v-for="example in docstring.extra_examples">
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
  </div>
</template>

<script setup lang="ts">
import hljs from 'highlight.js/lib/core';
import python from 'highlight.js/lib/languages/python';
import { PyCodeBlock } from "vuepython";
import StaticCodeBlock from './StaticPyCodeBlock.vue';
import { ref, watchEffect } from 'vue';
import { py, user } from '@/state';
import { ParsedDocstring } from '@/interfaces';

const props = defineProps({
  docstring: {
    type: Object as () => ParsedDocstring,
    required: true
  },
  title: {
    type: String,
    required: true
  }
});

hljs.registerLanguage('python', python);
const parsedCode = ref("");

function load() {
  parsedCode.value = hljs.highlight(props.docstring.funcdef, { language: "python" }).value;
  //console.log(JSON.stringify(props.docstring, null, "  "))
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