<template>
  <div class="mb-3 text-xl">Dataframe</div>
  <render-nav-node :node="nav.tree.sections.dataframe"></render-nav-node>
</template>

<script setup lang="ts">
import { nav } from "@/state";
import RenderNavNode from '@/widgets/RenderNavNode.vue';
</script>