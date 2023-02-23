<template>
  <div class="container p-3 mx-auto">
    <render-nav-node :node="nav.tree.root" :root="false"></render-nav-node>
    <div class="text-xl">Python</div>
    <render-nav-node :node="nav.tree.sections['python_api']"></render-nav-node>
  </div>
</template>

<script setup lang="ts">
import { nav } from '@/state';
import RenderNavNode from '@/widgets/RenderNavNode.vue';


/*async function init() {
  const data = import.meta.glob<boolean, string, string>('../assets/doc/*.md');
  console.log("DDD", data)
  for (const path in data) {
    const res = await data[path]()
    console.log("Data", res)
  }
}
onMounted(() => init())*/
</script>
