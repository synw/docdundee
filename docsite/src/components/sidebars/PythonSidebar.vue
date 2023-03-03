<template>
  <div class="mb-3 text-xl font-semibold txt-light">Python api</div>
  <!-- render-nav-node :node="nav.findNode('python/doc')"></render-nav-node -->
  <auto-nav :nodes="nodes" class="space-y-1 nav-panel"></auto-nav>
</template>

<script setup lang="ts">
import { nav } from "@/state";
import AutoNav from "@/widgets/AutoNav.vue";
import RenderNavNode from '@/widgets/RenderNavNode.vue';

const nodes = [
  nav.findNode('python/get_started'),
  nav.findNode('python/api'),
  nav.findNode('python/types'),
]
</script>