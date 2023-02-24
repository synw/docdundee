<template>
  <div v-if="nav.isReady.value === true">
    <template v-if="node.md.length > 0">
      <div v-for="doc in node.md">
        <button class="px-1 text-left truncate cursor-pointer btn" v-html="doc.title" @click="onClick(doc.name)"></button>
      </div>
    </template>
    <template v-if="node.docstrings.length > 0">
      <div v-for="ds in node.docstrings">
        <button class="px-1 truncate cursor-pointer btn" v-html="ds.title" @click="onClick(ds.name)"></button>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { DirNavListing } from '@/interfaces';
import { nav } from '@/state';
import { useRouter } from 'vue-router';

const props = defineProps({
  node: {
    type: Object as () => DirNavListing,
    required: true
  },
});

const router = useRouter();

function onClick(name: string) {
  let _u = `/${props.node.name}/${name}`;
  if (props.node.name == "doc") {
    _u = `/${name}`;
  }
  router.push(_u)
}
</script>