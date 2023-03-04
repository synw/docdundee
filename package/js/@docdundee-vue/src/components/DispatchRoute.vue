<template>
  <div v-if="isReady">
    <slot name="docstring" :data="page.data"></slot>
    <render-md :hljs="hljs" v-if="page.data.docstring?.extra_md" :source="page.data.docstring.extra_md.footer"
      :class="page.data.hasDocstring ? 'mt-5' : ''"></render-md>
    <render-md :hljs="hljs" v-if="page.data.hasMarkdown" :source="page.data.markdown"></render-md>
  </div>
</template>

<script setup lang="ts">
import { watchEffect, ref, reactive } from 'vue';
import _hljs from 'highlight.js/lib/core';
import { RouteDataPayload, useNav } from '@docdundee/nav';
import RenderMd from './markdown/RenderMd.vue';

const props = defineProps({
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
});

const page = reactive<{ data: RouteDataPayload }>({ data: {} as RouteDataPayload });
const isReady = ref(false);

watchEffect(async () => {
  isReady.value = false;
  page.data = await props.nav.loadFromRoutePath(props.url);
  isReady.value = true;
})
</script>