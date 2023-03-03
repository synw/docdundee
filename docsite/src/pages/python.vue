<template>
  <div class="prosed" v-if="isNavReady">
    <h1>Python package</h1>
    <div class="my-3">The docdundee Python package is used to generate static json
      files from docstrings
    </div>
    <div class="my-3 text-xl cursor-pointer">Python api</div>
    <render-nav-node :node="nav.findNode('python/doc')" :on-open="$router.push"></render-nav-node>
    <div class="my-3 text-lg cursor-pointer" :on-open="$router.push">Functions</div>
    <render-nav-node :node="nav.findNode('python/api')" :on-open="$router.push"></render-nav-node>
    <div class="my-3 text-lg cursor-pointer">Types</div>
    <render-nav-node :node="nav.findNode('python/types')" :on-open="$router.push"></render-nav-node>
  </div>
</template>

<script setup lang="ts">
import { nav, isNavReady } from "@/state";
import { RenderNavNode } from '@docdundee/vue';
</script>