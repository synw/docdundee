<template>
  <div class="mb-3 text-xl">Dataframe</div>
  <auto-nav :nav="nav" :nodes="[nav.findNode('dataframe')]" :on-open="$router.push"
    class="space-y-1 nav-panel"></auto-nav>
</template>

<script setup lang="ts">
import { nav } from "@/state";
import { AutoNav } from '@docdundee/vue';
</script>