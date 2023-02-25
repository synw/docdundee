<template>
  <div class="flex flex-col items-start space-y-2">
    <div class="mb-3 text-xl cursor-pointer">Doc site</div>
    <render-nav-node :node="nav.findNode('frontend')" :root="false"></render-nav-node>
  </div>
</template>

<script setup lang="ts">
import { nav } from "@/state";
import RenderNavNode from '@/widgets/RenderNavNode.vue';
</script>