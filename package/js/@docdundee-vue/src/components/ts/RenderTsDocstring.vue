<template>
  <render-docstring :docstring="docstring" :hljs="hljs" lang="typescript" :title="title">
    <template #executable-example="slotProps">
      <ts-code-block :hljs="hljs" :transpile="transpile" class="not-prose" :controls="true" id="example_0"
        :code="slotProps.code" :theme="darkMode ? 'dark' : 'light'">
      </ts-code-block>
    </template>
    <template #extra-executable-example="slotProps">
      <ts-code-block :hljs="hljs" :transpile="transpile" class="not-prose" :controls="true" :id="'example_' + Date()"
        :code="slotProps.code" :theme="darkMode ? 'dark' : 'light'">
      </ts-code-block>
    </template>
  </render-docstring>
</template>

<script setup lang="ts">
import RenderDocstring from '../RenderDocstring.vue';
import _hljs from 'highlight.js/lib/core';
import { ParsedDocstring } from '@docdundee/nav';
import TsCodeBlock from './TsCodeBlock.vue';

defineProps({
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
  transpile: {
    type: Function,
    required: true
  }
});
</script>