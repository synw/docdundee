<template>
  <div>
    <template v-if="node.md.length > 0">
      <div v-for="doc in node.md">
        <button class="px-1 text-left truncate cursor-pointer btn" v-html="doc.title" @click="onClick(doc.url)"></button>
      </div>
    </template>
    <template v-if="node.docstrings.length > 0">
      <div v-for="ds in node.docstrings">
        <button class="px-1 truncate cursor-pointer btn" v-html="ds.title"
          @click="onClick(node.url + '/' + ds.name)"></button>
      </div>
    </template>

  </div>
</template>

<script setup lang="ts">
import { DirNavListing } from '@docdundee/nav';
import { useRouter } from 'vue-router';

const props = defineProps({
  node: {
    type: Object as () => DirNavListing,
    required: true
  },
});

const router = useRouter();

function onClick(url: string) {
  router.push(url)
}
</script>