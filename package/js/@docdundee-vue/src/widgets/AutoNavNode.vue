<template>
  <div :class="`navnode-${level}`">
    <button class="flex items-center w-full btn navnode-header"
      :class="collapse ? ['navnode-closed'] : ['navnode-opened']" @click="onToggle()">
      <div>
        <svg v-if="collapse === true" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 256 256">
          <path fill="currentColor"
            d="M96 220a12.2 12.2 0 0 1-8.5-3.5a12 12 0 0 1 0-17L159 128L87.5 56.5a12 12 0 0 1 17-17l80 80a12 12 0 0 1 0 17l-80 80A12.2 12.2 0 0 1 96 220Z" />
        </svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 256 256">
          <path fill="currentColor"
            d="M128 188a12.2 12.2 0 0 1-8.5-3.5l-80-80a12 12 0 0 1 17-17L128 159l71.5-71.5a12 12 0 0 1 17 17l-80 80a12.2 12.2 0 0 1-8.5 3.5Z" />
        </svg>
      </div>
      <div class="ml-2">{{ node.title }}</div>
    </button>
    <div :class="collapse ? [
      'slideup', 'navnode-closed'
    ] : [
      'slidedown', 'navnode-opened'
    ]" class="duration-100 slide-y navnode-content">
      <div>
        <div v-if="(node.content ?? []).length > 0">
          <div v-for="item in node.content" class="nav-item-hspace">
            <button v-if="item.type != 'directory'" class="focus:ring-0 btn navnode-item navnode-md"
              @click="onOpen(item.url)">{{ item.title }}</button>
            <template v-else>
              <AutoNavNode :on-open="onOpen" :node="findDirNode(node.children ?? [], item.name)" :level="level + 1"
                :start-state="startState">
              </AutoNavNode>
            </template>

          </div>
        </div>
        <div v-if="(node.docstrings ?? []).length > 0">
          <div v-for="docstring in node.docstrings" class="nav-item-hspace">
            <button class="py-1 focus:ring-0 btn navnode-item navnode-docstring"
              @click="onOpen(docstring.url)">{{ docstring.name }}</button>
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
  },
  onOpen: {
    type: Function,
    required: true
  }
});

const collapse = ref(true);

function onToggle() {
  collapse.value = !collapse.value;
  //console.log("Toggle to", collapse.value)
}

function findDirNode(children: Array<DirNavListing>, name: string): DirNavListing {
  //console.log("Finding", name, "in", children);
  let n = {} as DirNavListing;
  for (const child of children) {
    if (child.name == name) {
      n = child
      break
    }
  }
  //console.log("NODE", JSON.stringify(n, null, "  "));
  return n
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
