<template>
  <the-header :lib-name="libName" :links="links"></the-header>
  <div class="p-5 pb-16 mt-16 md:ml-48">
    <router-view></router-view>
  </div>
  <the-sidebar class="fixed left-0 hidden w-48 h-screen p-3 top-16 sm:block secondary"></the-sidebar>
</template>

<script setup lang="ts">
import { onBeforeMount } from "vue";
import TheHeader from "./components/TheHeader.vue";
import TheSidebar from "./components/TheSidebar.vue";
import { libName, links } from "@/conf";
import { initState } from "./state";
import { useRouter } from "vue-router";

const router = useRouter();

function openLink(url: string) {
  router.push(url)
}

// global helper for markdown links to open them with router
window["openLink"] = openLink;

onBeforeMount(() => initState())
</script>

<style lang="sass">
.maxw-100
    max-width: 100ch
.prosed:not(.not-prose)
  @apply prose dark:prose-invert max-w-none prose-h1:txt-light prose-h2:txt-light prose-h3:txt-light
  @apply prose-h1:mb-3 prose-h2:mt-2 prose-h3:mt-3
  em
    @apply font-semibold txt-light not-italic
kbd
  @apply px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500
</style>

