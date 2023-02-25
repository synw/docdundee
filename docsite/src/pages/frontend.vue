<template>
  <div class="prosed" v-if="nav.isReady.value === true">
    <h1>Frontend</h1>
    <div class="py-3">The Vuejs documentation website</div>
    <render-nav-node :node="nav.findNode('frontend')" :root="false"></render-nav-node>
  </div>
</template>

<script setup lang="ts">
import { nav } from "@/state";
import RenderNavNode from '@/widgets/RenderNavNode.vue';
</script>