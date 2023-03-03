<template>
  <div class="mb-3 text-xl font-semibold txt-light">Python api</div>
  <auto-nav :nodes="nodes" class="space-y-1 nav-panel" :on-open="$router.push"></auto-nav>
</template>

<script setup lang="ts">
import { nav } from "@/state";
import { AutoNav } from "@docdundee/vue";

const nodes = [
  nav.findNode('python/get_started'),
  nav.findNode('python/api'),
  nav.findNode('python/types'),
]
</script>