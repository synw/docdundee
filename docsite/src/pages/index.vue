<template>
  <div class="prosed" v-if="isNavReady">
    <h1>Docdundee</h1>
    <div class="pt-3">Compose documentation websites in Vuejs: components, markdown documents and auto docstrings</div>
    <div class="flex flex-row space-x-5">
      <div>
        <h2 class="pt-3">Frontend</h2>
        <render-nav-node :node="nav.findNode('frontend')" :root="false"></render-nav-node>
      </div>
      <div>
        <h2 class="pt-3">Python</h2>
        <render-nav-node :node="nav.findNode('python/doc')"></render-nav-node>
        <!-- render-nav-node :node="nav.findNode('python_api')"></render-nav-node -->
      </div>
    </div>
    <p>
      Check the <a href="https://github.com/synw/docdundee/tree/main/example/pythonlib" target="_blank">example
        library</a>
    </p>
  </div>
</template>

<script setup lang="ts">
import { nav, isNavReady } from "@/state";
import RenderNavNode from '@/widgets/RenderNavNode.vue';
import { onMounted } from 'vue';

onMounted(() => {
  //nav.findNode(["frontend", "test"])
})
</script>
