<template>
  <div v-if="isNavReady" class="overflow-y-auto">
    <default-sidebar v-if="sidebar == 'default'"></default-sidebar>
    <python-sidebar v-else-if="sidebar == 'python'"></python-sidebar>
    <case-studies-sidebar v-else></case-studies-sidebar>
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import { isNavReady } from "@/state";
import DefaultSidebar from "@/components/sidebars/DefaultSidebar.vue";
import PythonSidebar from "@/components/sidebars/PythonSidebar.vue";
import CaseStudiesSidebar from './sidebars/CaseStudiesSidebar.vue';

const route = useRoute();
const sidebar = ref<"default" | "python" | "cases">("default");

watchEffect(() => {
  if (route.path.startsWith('/python')) {
    sidebar.value = "python";
  } else if (route.path.startsWith('/frontend')) {
    sidebar.value = "default";
  } else {
    sidebar.value = "cases";
  }
})
</script>