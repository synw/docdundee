<template>
  <div class="container p-3 mx-auto">
    home
  </div>
</template>

<script setup lang="ts">
import RenderMdFilePython from '@/widgets/RenderMdPython.vue';
import { onMounted } from 'vue';



async function init() {
  const data = import.meta.glob('../autodoc/*.json');
  for (const path in data) {
    const res = await data[path]()
    console.log("Data", res)
  }
}
</script>
