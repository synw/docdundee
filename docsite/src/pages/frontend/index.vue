<template>
  <div class="prosed" v-if="isNavReady">
    <h1>Frontend</h1>
    <p>The Vuejs documentation website</p>
    <p>
      <render-nav-node :node="nav.findNode('frontend/get_started')" :root="false"
        :on-open="$router.push"></render-nav-node>
    </p>

  </div>
</template>

<script setup lang="ts">
import { nav, isNavReady } from "@/state";
import { RenderNavNode } from '@docdundee/vue';
</script>