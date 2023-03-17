<template>
  <div class="prosed" v-if="isNavReady">
    <h1>Docdundee</h1>
    <div class="pt-3">Compose documentation websites in Vuejs: components, markdown documents and auto docstrings</div>
    <div class="flex flex-row space-x-5">
      <div>
        <h2 class="pt-3">Frontend</h2>
        <auto-nav :nodes="nav.findNode('frontend').children ?? []" :on-open="$router.push" start-state="all"></auto-nav>
      </div>
      <div>
        <h2 class="pt-3">Python</h2>
        <auto-nav :nodes="nav.findNode('python').children ?? []" :on-open="$router.push" start-state="all"></auto-nav>
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
import { RenderNavNode } from '@docdundee/vue';
import { onMounted } from 'vue';
import { AutoNav } from "@docdundee/vue";

onMounted(() => {
  //nav.findNode(["frontend", "test"])
})
</script>
