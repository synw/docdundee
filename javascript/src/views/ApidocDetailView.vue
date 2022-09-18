<template>
  <div class="container p-3 mx-auto">
    <render-md-file-js :file-url="`/apidoc/${file}.md`"></render-md-file-js>
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import RenderMdFileJs from '@/widgets/RenderMdFileJs.vue';
import router from '@/router';

const file = ref("")

watchEffect(() => {
  file.value = router.currentRoute.value.params?.file.toString() ?? ""
})
</script>

