<template>
  <div class="flex flex-col space-y-3">
    <auto-nav :nav="nav" :nodes="[nav.findNode('mylib/get_started')]" :on-open="$router.push"
      class="space-y-1 nav-panel"></auto-nav>
    <auto-nav :nav="nav" :nodes="[nav.findNode('mylib/api')]" :on-open="$router.push"
      class="space-y-1 nav-panel"></auto-nav>
  </div>
</template>

<script setup lang="ts">
import { nav } from "@/state";
import { AutoNav } from '@docdundee/vue';
</script>