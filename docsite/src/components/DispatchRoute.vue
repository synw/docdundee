<template>
  <div v-if="isReady">
    <render-docstring class="max-w-[105ch]" v-if="type == 'docstring'" :method="method" :example="extraExample"
      :name="name"></render-docstring>
    <render-md-python :code="markdown"></render-md-python>
  </div>
</template>

<script setup lang="ts">
import { watchEffect, ref } from 'vue';
import RenderDocstring from '@/widgets/RenderDocstring.vue';
import RenderMdPython from '@/widgets/RenderMdPython.vue';
import { useRouter } from "vue-router";

const router = useRouter();
const isReady = ref(false);
const name = ref();
const cat = ref("");
const method = ref({});
const markdown = ref("");
const extraExample = ref<{ code: string, is_executable: boolean } | undefined>();
const type = ref<"docstring" | "markdown">();

async function checkExtraExample(): Promise<{ code: string, is_executable: boolean } | undefined> {
  let code = "";
  let exec = false;
  try {
    const data = await import(`../assets/doc/${cat.value}/examples/${name.value}.py?raw`);
    code = data.default;
    if (code.startsWith("# exec")) {
      exec = true;
      code = code.replace("# exec\n", "")
    }
  } catch (e) {
    //console.log("No example")
    return undefined
  }
  return { code: code, is_executable: exec }
}

async function loadDocstring(): Promise<boolean> {
  try {
    const data = await import(`../assets/doc/${cat.value}/index.json`);
    method.value = { name: name.value, docstring: data[name.value] };
    //console.log("DATA", method)
    extraExample.value = await checkExtraExample()
    return true
  } catch (e) {
    return false
  }
}

async function loadMarkdown(): Promise<boolean> {
  try {
    const data = await import(`../assets/doc/${name.value}.md?raw`);
    markdown.value = data.default;
    console.log(markdown.value)
    return true
  } catch (e) {
    return false
  }
}

watchEffect(async () => {
  //console.log(router.currentRoute.value.params);
  isReady.value = false;
  name.value = router.currentRoute.value.params["id"].toString();
  if ("category" in router.currentRoute.value.params) {
    cat.value = router.currentRoute.value.params["category"].toString();
    const hasDocstring = await loadDocstring();
    if (hasDocstring) {
      type.value = "docstring";
      isReady.value = true;
      return
    }
  }
  const hasMarkdown = await loadMarkdown();
  if (!hasMarkdown) {
    throw new Error("No document found")
  }
  type.value = "markdown";
  isReady.value = true;
})
</script>