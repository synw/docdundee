<template>
  <div class="mb-3 text-xl">Requests</div>
  <render-nav-node :node="nav.findNode('requests')" :on-open="$router.push"></render-nav-node>
</template>

<script setup lang="ts">
import { nav } from "@/state";
import { RenderNavNode } from '@docdundee/vue';
</script>