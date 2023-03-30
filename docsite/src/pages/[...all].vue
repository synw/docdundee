<template>
  <template v-if="$route.path.startsWith('/python')">
    <dispatch-route-py :hljs="hljs" :py="py" :nav="nav" :url="$route.path" :on-open="$router.push"
      :base-title="libTitle"></dispatch-route-py>
  </template>
  <template v-else>
    <dispatch-route-ts :hljs="hljs" :nav="nav" :url="$route.path" :on-open="$router.push" :base-title="libTitle"
      :transpile="transpile">
    </dispatch-route-ts>
  </template>
</template>

<script setup lang="ts">
import { transpile } from 'typescript';
import { DispatchRoutePy, DispatchRouteTs } from '@docdundee/vue';
//import DispatchRoutePy from '@/packages/vue/components/python/DispatchRoutePy.vue';
//import DispatchRouteTs from '@/packages/vue/components/ts/DispatchRouteTs.vue';
//import DispatchRoute from '@/packages/vue/components/DispatchRoute.vue';
//import RenderDocstring from '@/packages/vue/components/RenderDocstring.vue';
//import RenderTsDocstring from '@/packages/vue/components/ts/RenderTsDocstring.vue';
import { py, nav } from "@/state";
import { hljs, libTitle } from "@/conf";
</script>