<template>
  <div :class="level > 0 ? ['nav-header-hspace', `navnode-${level}`] : [`navnode-${level}`]">
    <button class="flex items-center w-full btn navnode-header"
      :class="collapse ? ['navnode-closed'] : ['navnode-opened']" @click="onToggle()">
      <div>
        <i-ph:caret-right-bold v-if="collapse === true"></i-ph:caret-right-bold>
        <i-ph:caret-down-bold v-else-if="collapse === false"></i-ph:caret-down-bold>
      </div>
      <div class="ml-2">{{ node.title }}</div>
    </button>
    <div :class="collapse ? [
      'slideup', 'navnode-closed'
    ] : [
      'slidedown', 'navnode-opened'
    ]" class="duration-100 slide-y navnode-content">
      <div v-if="(node?.children ?? []).length > 0">
        <div v-for="child in node.children">
          <AutoNavNode :node="child" :level="level + 1" :start-state="startState"></AutoNavNode>
        </div>
      </div>
      <div v-else>
        <div v-if="(node.md ?? []).length > 0">
          <div v-for="md in node.md" class="nav-item-hspace">
            <button class="py-1 focus:ring-0 btn navnode-item navnode-md"
              @click="$router.push(md.url)">{{ md.title }}</button>
          </div>
        </div>
        <div v-if="(node.docstrings ?? []).length > 0">
          <div v-for="docstring in node.docstrings" class="nav-item-hspace">
            <button class="py-1 focus:ring-0 btn navnode-item navnode-docstring"
              @click="$router.push(docstring.url)">{{ docstring.name }}</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onBeforeMount } from 'vue';
import { DirNavListing } from '@docdundee/nav';

const props = defineProps({
  node: {
    type: Object as () => DirNavListing,
    required: true
  },
  level: {
    type: Number,
    default: 0,
  },
  startState: {
    type: String as () => "collapsed" | "all" | "one",
    default: "one"
  }
});

const collapse = ref(true);

function onToggle() {
  collapse.value = !collapse.value;
  //console.log("Toggle to", collapse.value)
}

onBeforeMount(() => {
  if (props.startState == "all") {
    collapse.value = false
  } else if (props.startState == "one") {
    if (props.level == 0) {
      collapse.value = false
    }
  }
})
</script>

<style lang="sass" scoped>
.nav-item-hspace
  @apply ml-8
.nav-header-hspace
  @apply ml-5
.nav-panel
  & .navnode-0
    > .navnode-header
      @apply bg-neutral-200 text-neutral-600 border-neutral-400 border rounded-t-md py-3 pl-5
      @apply dark:text-neutral-200 dark:bg-neutral-800 dark:border-neutral-600
    > .navnode-header.navnode-opened
      @apply rounded-b-none border-b-neutral-300
      @apply dark:border-b-neutral-700
    > .navnode-header.navnode-closed
      @apply rounded-b-md
    > .navnode-content
      @apply bg-neutral-100 text-neutral-600 rounded-b-md border border-t-0 border-neutral-400
      @apply dark:text-neutral-200 dark:bg-neutral-700 dark:border-neutral-600
    > .navnode-content.navnode-opened
      @apply pb-2
  & .navnode-item, .navnode-header.navnode-opened
    @apply hover:bg-neutral-200 hover:rounded-none focus:bg-neutral-300 w-full text-left
    @apply dark:focus:bg-neutral-800 dark:hover:bg-neutral-600
</style>