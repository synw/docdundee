<template>
  <div class="not-prose">
    <render-ts :code="code" v-if="isReady"></render-ts>
    <loading-spinner v-else class="flex items-center justify-center p-5 text-2xl"></loading-spinner>
  </div>
</template>

<script setup lang="ts">
import RenderTs from "./RenderTs.vue";
import { onBeforeMount, ref } from 'vue';
import { api } from '@/state';
import LoadingSpinner from "./LoadingSpinner.vue";

const props = defineProps({
  fileUrl: {
    type: String,
    required: true
  },
})

const isReady = ref(false);
let code = ref("");

async function load() {
  code.value = await api.get<string>(props.fileUrl);
  if (code.value.startsWith("// @ts-nocheck")) {
    code.value = code.value.replace("// @ts-nocheck\n", "")
  }
  //console.log("CODE", code.value)
  isReady.value = true;
}

onBeforeMount(() => load())
</script>