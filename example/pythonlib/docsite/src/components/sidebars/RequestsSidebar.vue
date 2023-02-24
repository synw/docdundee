<template>
  <div class="mb-3 text-xl">Requests</div>
  <render-nav-node :node="nav.tree.sections.requests"></render-nav-node>
</template>

<script setup lang="ts">
import { nav } from "@/state";
import RenderNavNode from '@/widgets/RenderNavNode.vue';
</script>