<template>
  <div class="prosed">
    <h1>Example documentation</h1>
    <render-md-py :code="md"></render-md-py>
  </div>
</template>

<script setup lang="ts">
import md from "@/assets/doc/1.overview.md?raw";
import RenderMdPy from '@/components/python/RenderMdPy.vue';
</script>
