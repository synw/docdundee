<template>
  <div class="prosed">
    <h1>useNav</h1>
    <p>A composable from the <a href="https://www.npmjs.com/package/@docdundee/nav">@docdundee/nav</a> package to manage
      the navigation. This is used in the navigation components and is not
      meant to be used directly
    </p>
    <h2>loadFromRoutePath</h2>
    <p>Load some content from an url</p>
    <p>
      <ts-code-block :hljs="hljs" :code="code1"></ts-code-block>
    </p>
    <h3>Params</h3>
    <ul>
      <li><kbd>routePath</kbd> <span class="hljs-built_in">string</span> the url to
        get the content from</li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import TsCodeBlock from '@/packages/TsCodeBlock.vue';
import { useDocloader, useNav } from "@docdundee/nav";
import { hljs } from '@/conf';
import { api, nav } from '@/state';

globalThis["useDocloader"] = useDocloader;
globalThis["useNav"] = useNav;
globalThis["api"] = api;
globalThis["nav"] = nav;

const code1 = `// import { useNav, useDocloader } from "@docdundee/nav";

// const docloader = useDocloader(api);
// const nav = useNav(docloader);

const payload = await nav.loadFromRoutePath('/frontend/get_started/install');
return '<pre>'+JSON.stringify(payload, null, "  ")+'</pre>'`;
</script>