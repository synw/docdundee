<template>
  <div v-if="isReady">
    <render-py-docstring :py="py" v-if="page.data.hasDocstring === true" class="max-w-[105ch]"
      :docstring="page.data.docstring" :title="page.data.name">
      <template v-if="page.data.docstring.extra_md?.header">
        <render-md-py :code="page.data.docstring.extra_md.header"
          :class="page.data.hasDocstring ? 'mb-3' : ''"></render-md-py>
      </template>
    </render-py-docstring>
    <render-md-py v-if="page.data.docstring?.extra_md" :code="page.data.docstring.extra_md.footer"
      :class="page.data.hasDocstring ? 'mt-5' : ''"></render-md-py>
    <render-md-py v-if="page.data.hasMarkdown" :code="page.data.markdown"></render-md-py>
  </div>
</template>

<script setup lang="ts">
import { watchEffect, ref, reactive } from 'vue';
import { RouteDataPayload, useNav } from '@docdundee/nav';
import { usePython } from "usepython";
import RenderPyDocstring from './RenderPyDocstring.vue';
import RenderMdPy from './RenderMdPy.vue';

const props = defineProps({
  nav: {
    type: Object as () => ReturnType<typeof useNav>,
    required: true
  },
  py: {
    type: Object as () => ReturnType<typeof usePython>,
    required: true
  },
  url: {
    type: String,
    required: true
  }
});

const page = reactive<{ data: RouteDataPayload }>({ data: {} as RouteDataPayload });
const isReady = ref(false);

watchEffect(async () => {
  isReady.value = false;
  page.data = await props.nav.loadFromRoutePath(props.url);
  isReady.value = true;
})
</script>