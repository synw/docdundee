<template>
  <!-- div class="mb-3 text-xl">Dataframe</div>
  <render-nav-node :node="nav.findNode('dataframe')" :on-open="$router.push"></render-nav-node -->
  <auto-nav :nav="nav" :nodes="[nav.findNode('dataframe')]" :on-open="$router.push"></auto-nav>
</template>

<script setup lang="ts">
import { nav } from "@/state";
import { AutoNav, RenderNavNode } from '@docdundee/vue';
</script>