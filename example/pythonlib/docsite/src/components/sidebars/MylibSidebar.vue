<template>
  <div class="mb-3 text-xl cursor-pointer" @click="$router.push('/mylib')">My lib</div>
  <render-nav-node :node="nav.tree.sections.mylib"></render-nav-node>
</template>

<script setup lang="ts">
import { nav } from "@/state";
import RenderNavNode from '@/widgets/RenderNavNode.vue';
</script>