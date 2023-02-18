<template>
  <render-md-file :file-url="`${path}.md`" :hljs="hljs"></render-md-file>
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';
import RenderMdFile from '@/widgets/RenderMdFile.vue';
import { hljs } from "@/conf";

const props = defineProps({
  filepath: {
    type: Array,
  }
});

const path = ref("");

onBeforeMount(() => {
  console.log("FP", props.filepath);
  path.value = "/" + props.filepath?.join("/")
})
</script>

