<template>
  <div class="autonav">
    <div v-for="nod in node.children">
      <auto-nav-node :node="nod" :start-state="startState" :on-open="onOpen"></auto-nav-node>
    </div>
  </div>
</template>

<script setup lang="ts">
import { DirNavListing } from '@docdundee/nav';
import AutoNavNode from './AutoNavNode.vue';

defineProps({
  node: {
    type: Object as () => DirNavListing,
    required: true
  },
  startState: {
    type: String as () => "collapsed" | "all" | "one",
    default: "one"
  },
  onOpen: {
    type: Function,
    required: true
  }
})
</script>