<template>
  <div class="mb-3 text-xl font-semibold txt-light">Frontend</div>
  <auto-nav :nodes="[nav.findNode('frontend/get_started')] ?? []" class="space-y-1 nav-panel"
    :on-open="$router.push"></auto-nav>
  <auto-nav :nodes="[nav.findNode('frontend/navigation')] ?? []" class="mt-2 space-y-1 nav-panel" :on-open="$router.push"
    start-state="collapsed"></auto-nav>
  <auto-nav :nodes="[nav.findNode('frontend/renderers')] ?? []" class="mt-2 space-y-1 nav-panel" :on-open="$router.push"
    start-state="collapsed"></auto-nav>
  <auto-nav :nodes="[nav.findNode('frontend/interfaces')] ?? []" class="mt-2 space-y-1 nav-panel" :on-open="$router.push"
    start-state="collapsed"></auto-nav>
</template>

<script setup lang="ts">
import { nav } from "@/state";
import { AutoNav } from "@docdundee/vue";
</script>