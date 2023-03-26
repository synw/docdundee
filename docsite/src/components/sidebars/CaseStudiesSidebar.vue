<template>
  <div class="mb-3 text-xl font-semibold txt-light">Case studies</div>
  <auto-nav-children :node="nav.findNode('case_studies')" class="space-y-1 nav-panel"
    :on-open="$router.push"></auto-nav-children>
</template>

<script setup lang="ts">
import { nav } from "@/state";
import { AutoNavChildren } from "@docdundee/vue";
</script>