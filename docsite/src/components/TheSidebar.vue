<template>
  <div class="flex flex-col space-y-1">
    <div>
      <button class="pl-0 cursor-pointer btn" @click="$router.push(`/install`)">Install</button>
    </div>
    <div>
      <button class="pl-0 cursor-pointer btn" @click="$router.push(`/quickstart`)">Quickstart</button>
    </div>
    <div v-for="section in sections">
      <div class="my-3 text-xl">{{ section.name }}</div>
      <div v-for="row in section.content">
        <button v-if="row != 'default'" class="pl-0 cursor-pointer btn" v-html="row"
          @click="$router.push(`/${section.path}/${row}`)"></button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { sidebar } from "@/conf";
import { onBeforeMount } from "vue";

const sections = reactive<Array<Record<string, any>>>([]);

async function indexFrom(path: string): Promise<Array<string>> {
  const data = await import(`../assets/doc/${path}/index.json`);
  return Object.keys(data)
}

async function load() {
  sidebar.forEach(async (row) => {
    for (const [name, path] of Object.entries(row)) {
      const content = await indexFrom(path);
      sections.push({
        name: name,
        path: path,
        content: content,
      })
    }
  })
}

onBeforeMount(() => load())
</script>