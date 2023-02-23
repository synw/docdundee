<template>
  <div v-if="nav.isReady.value == true">
    <render-nav-node :node="nav.tree.root" :root="false"></render-nav-node>
    <!-- div class="my-3 text-xl">Python</div>
    <render-nav-node :node="nav.tree.sections['python_api']"></render-nav-node>
    <div class="mt-2 mb-3 text-lg">Types</div>
    <render-nav-node :node="nav.tree.sections['types']"></render-nav-node -->
  </div>
</template>

<script setup lang="ts">
import RenderNavNode from '@/widgets/RenderNavNode.vue';
import { nav } from "@/state";
</script>