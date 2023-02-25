<template>
  <div class="prosed" v-if="nav.isReady.value === true">
    <h1>Python package</h1>
    <div class="my-3">The docdundee Python package is used to generate static json
      files from docstrings
    </div>
    <div class="my-3 text-xl cursor-pointer">Python api</div>
    <render-nav-node :node="nav.findNode('python/doc')"></render-nav-node>
    <div class="my-3 text-lg cursor-pointer">Functions</div>
    <render-nav-node :node="nav.findNode('python/api')"></render-nav-node>
    <div class="my-3 text-lg cursor-pointer">Types</div>
    <render-nav-node :node="nav.findNode('python/types')"></render-nav-node>
  </div>
</template>

<script setup lang="ts">
import { nav } from "@/state";
import RenderNavNode from '@/widgets/RenderNavNode.vue';
</script>