<template>
  <div v-if="isNavReady">
    <default-sidebar v-if="sidebar == 'default'"></default-sidebar>
    <mylib-sidebar v-else-if="sidebar == 'mylib'"></mylib-sidebar>
    <requests-sidebar v-else-if="sidebar == 'requests'"></requests-sidebar>
    <dataframe-sidebar v-else-if="sidebar == 'dataframe'"></dataframe-sidebar>
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import { isNavReady } from "@/state";
import DefaultSidebar from "@/components/sidebars/DefaultSidebar.vue";
import MylibSidebar from "@/components/sidebars/MylibSidebar.vue";
import RequestsSidebar from "@/components/sidebars/RequestsSidebar.vue";
import DataframeSidebar from "@/components/sidebars/DataframeSidebar.vue";

const route = useRoute();
const sidebar = ref<"default" | "mylib" | "requests" | "dataframe">("default");

watchEffect(() => {
  if (route.path.startsWith('/mylib')) {
    sidebar.value = "mylib";
  } else if (route.path.startsWith('/requests')) {
    sidebar.value = "requests";
  } else if (route.path.startsWith('/dataframe')) {
    sidebar.value = "dataframe";
  } else {
    sidebar.value = "default";
  }
  console.log("Sidebar", sidebar.value)
})
</script>