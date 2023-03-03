<template>
  <dispatch-route-py :py="py" :nav="nav" :url="$route.path"></dispatch-route-py>
</template>

<script setup lang="ts">
import { DispatchRoutePy } from '@docdundee/vue';
import { py, nav } from "@/state";
</script>