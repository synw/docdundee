<template>
  <div class="prosed">
    <h1 v-if="title">{{ title }}</h1>
    <slot></slot>
    <p v-html="docstring.description"></p>
    <p class="codedef not-prose">
    <pre class="w-max"><code v-html="parsedCode" style="white-space: pre"></code></pre>
    </p>
    <p v-if="docstring.long_description" v-html="docstring.long_description"> </p>
    <template v-if="Object.keys(docstring.params).length > 0">
      <h3>Parameters</h3>
      <ul class="space-y-2">
        <li v-for="param in Object.keys(docstring.params)">
          <kbd class="mr-1 font-bold" v-html="param"></kbd> <span class="hljs-built_in"
            v-html="docstring.params[param].type"></span>:
          <span v-html="docstring.params[param].description"></span>
        </li>
      </ul>
    </template>
    <template v-if="docstring?.returns?.type">
      <h3>Returns</h3>
      <p class="hljs-built_in" v-html="docstring.returns.type"></p>
    </template>
    <div class="mt-5" v-if="Object.keys(docstring.raises).length > 0">
      <h3>Raises</h3>
      <div class="mt-3" v-for="raise in docstring.raises">
        <span class="hljs-built_in" v-html="raise.type"></span>:
        <span v-html="raise.description"></span>
      </div>
    </div>
    <div class="mt-5" v-if="docstring.example">
      <div class="mt-3" v-if="docstring.example.is_executable">
        <h2>Executable example</h2>
        <slot name="executable-example" :code="docstring.example.code"></slot>
      </div>
      <div class="mt-3" v-else>
        <h2>Example</h2>
        <static-code-block :hljs="hljs" :lang="lang" class="static-code not-prose"
          :code="docstring.example.code"></static-code-block>
      </div>
    </div>
    <div class="mt-5" v-if="docstring.extra_examples">
      <div v-for="example in docstring.extra_examples">
        <div class="mt-3" v-if="example.is_executable">
          <h2>Executable example</h2>
          <slot name="extra-executable-example" :code="example.code"></slot>
        </div>
        <div class="mt-3" v-else>
          <h2>Example</h2>
          <static-code-block :hljs="hljs" :lang="lang" class="static-code not-prose"
            :code="example.code"></static-code-block>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import _hljs from 'highlight.js/lib/core';
import { ParsedDocstring } from '@docdundee/nav';
import StaticCodeBlock from './StaticCodeBlock.vue';

const props = defineProps({
  docstring: {
    type: Object as () => ParsedDocstring,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  darkMode: {
    type: Boolean,
    default: false
  },
  hljs: {
    type: Object as () => typeof _hljs,
    required: true
  },
  lang: {
    type: String,
    required: true
  },
});

const parsedCode = ref("");

function load() {
  parsedCode.value = props.hljs.highlight(props.docstring.funcdef, { language: props.lang }).value;
  //console.log(JSON.stringify(props.docstring, null, "  "))
}

watchEffect(() => load())
</script>

<style lang="sass">
.prosed:not(.not-prose)
  @apply prose dark:prose-invert max-w-none prose-h1:txt-light prose-h2:txt-light prose-h3:txt-light
  em
    @apply font-semibold txt-light not-italic
  & .codedef
    @apply ml-8
  kbd
    @apply px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500
  .code-editor
    @apply bg-gray-100 dark:bg-black dark:text-neutral-200 pb-0 p-3 rounded-md max-w-[100ch] xl:min-w-[100ch] overflow-x-auto border border-gray-200 dark:border-neutral-800
  .static-code
    @apply bg-gray-100 dark:bg-black dark:text-neutral-200 p-3 rounded-md max-w-[100ch] xl:min-w-[100ch] overflow-x-auto border border-gray-200 dark:border-neutral-800
</style>