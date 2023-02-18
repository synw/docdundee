<template>
  <div class="max-w-[105ch]">
    <render-md :source="code" :hljs="hljs"></render-md>
  </div>
</template>

<script setup lang="ts">
import RenderMd from '@/widgets/RenderMd.vue';
import hljs from 'highlight.js/lib/core';
import python from 'highlight.js/lib/languages/python';
import bash from 'highlight.js/lib/languages/bash';
hljs.registerLanguage('python', python);
hljs.registerLanguage('bash', bash);

defineProps({
  code: {
    type: String,
    required: true
  }
})
</script>