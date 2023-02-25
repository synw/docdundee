<template>
  <div class="prosed">
    <h1 class="mb-3">Requests</h1>
    <render-nav-node :node="nav.findNode('requests')" :root="false"></render-nav-node>
  </div>
</template>

<script setup lang="ts">
import { nav } from "@/state";
import RenderNavNode from '@/widgets/RenderNavNode.vue';
</script>