<template>
  <div class="mb-3 text-xl cursor-pointer" @click="$router.push('/mylib')">My lib</div>
  <render-nav-node :node="nav.findNode('mylib')" :on-open="$router.push"></render-nav-node>
</template>

<script setup lang="ts">
import { nav } from "@/state";
import { RenderNavNode } from '@docdundee/vue';
</script>