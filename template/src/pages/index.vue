<template>
  <div class="prosed">
    <h1>Vuecodit</h1>
    <p>A little code editor for Vuejs 3 with syntax highlighting</p>
    <auto-nav v-if="isNavReady" :nodes="nav.tree?.children ?? []" class="space-y-1" :on-open="$router.push"></auto-nav>
  </div>
</template>

<script setup lang="ts">
import { nav, isNavReady } from "@/state";
import { AutoNav } from "@docdundee/vue";
</script>