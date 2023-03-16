<template>
  <div class="autoindex">
    <div class="icontent">
      <render-nav-node v-if="node.content.length > 0" :node="node" :on-open="onOpen" class="inode"></render-nav-node>
      <div v-for="child in node.children" class="iauto">
        <auto-nav-node :node="child" :on-open="onOpen" start-state="all"></auto-nav-node>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { DirNavListing } from '@docdundee/nav';
import AutoNavNode from "./AutoNavNode.vue"
import RenderNavNode from './RenderNavNode.vue';

defineProps({
  node: {
    type: Object as () => DirNavListing,
    required: true
  },
  onOpen: {
    type: Function,
    required: true
  }
})
</script>