<template>
  <dispatch-route-py :py="py" :nav="nav" :url="$route.path" :on-open="$router.push"></dispatch-route-py>
</template>

<script setup lang="ts">
import { DispatchRoutePy } from '@docdundee/vue';
import { py, nav } from "@/state";
</script>