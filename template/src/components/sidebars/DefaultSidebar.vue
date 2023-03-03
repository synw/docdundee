<template>
  <auto-nav :nodes="nav.tree?.children ?? []" class="space-y-1 nav-panel"></auto-nav>
</template>

<script setup lang="ts">
import { nav } from "@/state";
import { AutoNav } from "@docdundee/vue";
</script>