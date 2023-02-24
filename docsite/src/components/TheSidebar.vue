<template>
  <div v-if="nav.isReady.value == true">
    <default-sidebar v-if="sidebar == 'default'"></default-sidebar>
    <python-sidebar v-else-if="sidebar == 'python'"></python-sidebar>
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import { nav } from "@/state";
import DefaultSidebar from "@/components/sidebars/DefaultSidebar.vue";
import PythonSidebar from "@/components/sidebars/PythonSidebar.vue";

const route = useRoute();
const sidebar = ref<"default" | "python">("default");

watchEffect(() => {
  if (route.path.startsWith('/python')) {
    sidebar.value = "python";
  } else {
    sidebar.value = "default";
  }
})
</script>