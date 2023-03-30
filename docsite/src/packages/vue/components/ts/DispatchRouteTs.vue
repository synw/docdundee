<template>
  <dispatch-route :nav="nav" :hljs="hljs" :url="url" :on-open="onOpen">
    <template #docstring="slotProps">
      <render-ts-docstring :transpile="transpile" :docstring="slotProps.data.docstring" :hljs="hljs"
        :title="slotProps.data.name" v-if="slotProps.data.hasDocstring">
        <template v-if="slotProps.data.docstring.extra_md?.header">
          <render-md :hljs="hljs" :source="slotProps.data.docstring.extra_md.header"
            :class="slotProps.data.hasDocstring ? 'mb-3' : ''"></render-md>
        </template>
      </render-ts-docstring>
    </template>
  </dispatch-route>
</template>

<script setup lang="ts">
import _hljs from 'highlight.js/lib/core';
import { useNav } from '@docdundee/nav';
import RenderTsDocstring from './RenderTsDocstring.vue';
import RenderMd from '../markdown/RenderMd.vue';
import DispatchRoute from '../DispatchRoute.vue';

defineProps({
  nav: {
    type: Object as () => ReturnType<typeof useNav>,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  hljs: {
    type: Object as () => typeof _hljs,
    required: true
  },
  onOpen: {
    type: Function,
    required: true
  },
  transpile: {
    type: Function,
    required: true
  }
});
</script>