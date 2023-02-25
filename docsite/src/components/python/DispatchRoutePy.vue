<template>
  <div v-if="isReady">
    <render-py-docstring v-if="page.data.hasDocstring === true" class="max-w-[105ch]" :docstring="page.data.docstring"
      :title="page.data.name">
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
import RenderPyDocstring from '@/components/python/RenderPyDocstring.vue';
import RenderMdPy from '@/components/python/RenderMdPy.vue';
import { useRouter } from "vue-router";
import { nav } from "@/state";
import { RouteDataPayload } from '@/interfaces';

const router = useRouter();
const page = reactive<{ data: RouteDataPayload }>({ data: {} as RouteDataPayload });
const isReady = ref(false);

watchEffect(async () => {
  const routePath = router.currentRoute.value.path;
  //console.log("ROUTE", routePath)
  isReady.value = false;
  page.data = await nav.loadFromRoutePath(routePath);
  //console.log("DATA", toRaw(page.data));
  isReady.value = true;
})
</script>