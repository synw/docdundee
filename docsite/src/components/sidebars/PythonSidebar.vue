<template>
  <div class="mb-3 text-xl cursor-pointer">Python api</div>
  <render-nav-node :node="nav.findNode('python_doc')"></render-nav-node>
  <div class="my-3 text-lg cursor-pointer">Functions</div>
  <render-nav-node :node="nav.findNode('python_api')"></render-nav-node>
  <div class="my-3 text-lg cursor-pointer">Types</div>
  <render-nav-node :node="nav.findNode('python_types')"></render-nav-node>
</template>

<script setup lang="ts">
import { nav } from "@/state";
import RenderNavNode from '@/widgets/RenderNavNode.vue';
</script>