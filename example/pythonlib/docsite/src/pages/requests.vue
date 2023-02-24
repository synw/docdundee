<template>
  <div class="prosed">
    <h1 class="mb-3">Requests</h1>
    <render-nav-node :node="nav.tree.sections.requests" :root="false"></render-nav-node>
    <!-- div class="text-xl">Python</div>
    <render-nav-node :node="nav.tree.sections['python_api']"></render-nav-node -->
  </div>
</template>

<script setup lang="ts">
import { nav } from "@/state";
import RenderNavNode from '@/widgets/RenderNavNode.vue';
</script>