<template>
  <the-header :lib-name="libName" :links="links"></the-header>
  <div class="absolute p-5 pb-16 top-16 md:ml-72 main-w main-h">
    <router-view></router-view>
  </div>
  <the-sidebar class="fixed left-0 hidden p-3 overflow-y-auto w-72 top-16 sm:block secondary main-h"></the-sidebar>
  <!-- main-css></main-css -->
</template>

<script setup lang="ts">
import { onBeforeMount } from "vue";
import TheHeader from "./components/TheHeader.vue";
import TheSidebar from "./components/TheSidebar.vue";
import { libName, links } from "@/conf";
import { initState } from "./state";
import { useRouter } from "vue-router";
//import MainCss from "./packages/MainCss.vue";

const router = useRouter();

function openLink(url: string) {
  router.push(url)
}

// global helper for markdown links
// use these links format in markdown files:
// <a href="javascript:openLink('/category/name')">My link</a>
window["openLink"] = openLink;

onBeforeMount(() => initState());
</script>

<style lang="sass">
.main-h
  height: calc(100vh - 4rem)
  @apply overflow-y-auto
.main-w
  width: calc(100vw - 18rem)
code:not([class]):not([style])
  @apply secondary py-1 px-2 rounded-md font-semibold
</style>
