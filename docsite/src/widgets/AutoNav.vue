<template>
  <div class="flex flex-col">
    <div v-for="node in nodes">
      <auto-nav-node :node="node" :start-state="startState"></auto-nav-node>
    </div>
  </div>
</template>

<script setup lang="ts">
import { DirNavListing } from '@docdundee/nav';
import AutoNavNode from './AutoNavNode.vue';

defineProps({
  nodes: {
    type: Object as () => Array<DirNavListing>,
    required: true
  },
  startState: {
    type: String as () => "collapsed" | "all" | "one",
    default: "one"
  }
})
</script>