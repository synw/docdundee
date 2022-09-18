<template>
  <div class="container p-3 mx-auto">
    <render-md-file-js file-url="/README.md"></render-md-file-js>
  </div>
</template>

<script setup lang="ts">
import RenderMdFileJs from '@/widgets/RenderMdFileJs.vue';
</script>
