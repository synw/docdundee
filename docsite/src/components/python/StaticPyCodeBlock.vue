<template>
  <div>
    <pre><code v-html="parsedCode" style="white-space: pre"></code></pre>
  </div>
</template>

<script setup lang="ts">
import hljs from 'highlight.js/lib/core';
import python from 'highlight.js/lib/languages/python';
hljs.registerLanguage('python', python);

const props = defineProps({
  code: {
    type: String,
    required: true
  },
});

hljs.registerLanguage('python', python);

const parsedCode = hljs.highlight(props.code, { language: "python" }).value;
</script>