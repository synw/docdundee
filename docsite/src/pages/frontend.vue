<template>
  <div class="prosed" v-if="isNavReady">
    <h1>Frontend</h1>
    <div class="py-3">The Vuejs documentation website</div>
    <render-nav-node :node="nav.findNode('frontend')" :root="false" :on-open="$router.push"></render-nav-node>
  </div>
</template>

<script setup lang="ts">
import { nav, isNavReady } from "@/state";
import { RenderNavNode } from '@docdundee/vue';
</script>