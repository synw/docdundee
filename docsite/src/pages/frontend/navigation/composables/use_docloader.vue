<template>
  <div class="prosed">
    <h1>useDocloader</h1>
    <p>A composable from the <a href="https://www.npmjs.com/package/@docdundee/nav">@docdundee/nav</a> package to manage
      the loading of docstring and markdown data from files in the doc folder. This is used
      by the <router-link to="/frontend/navigation/composables/use_nav">useNav</router-link> composable and is not
      meant to be used directly</p>
    <h2>loadDocstrings</h2>
    <p>A function to load docstrings from a docstrings.json file referenced in the doc folder</p>
    <p>
      <ts-code-block :hljs="hljs" :code="code1" :transpile="transpile"></ts-code-block>
    </p>
    <h3>Params</h3>
    <ul>
      <li><kbd>routePath</kbd> <span class="hljs-built_in">string | null | undefined</span> the path to the folder where
        a
        docstrings.json file is. If not provided defaults to doc/</li>
    </ul>
    <h2>loadMarkdown</h2>
    <p>A function to load markdown content from a file referenced in the doc folder</p>
    <p>
      <ts-code-block :hljs="hljs" :code="code2" :transpile="transpile"></ts-code-block>
    </p>
    <h3>Params</h3>
    <ul>
      <li><kbd>filepath</kbd> <span class="hljs-built_in">string</span> the path to the file to
        get the content from</li>
    </ul>
    <h2>Type</h2>
    <p>
      <static-code-block class="not-prose" :hljs="hljs" :code="tcode" lang="typescript"></static-code-block>
    </p>
  </div>
</template>

<script setup lang="ts">
import { transpile } from 'typescript';
import { useDocloader } from "@docdundee/nav"
import { TsCodeBlock, StaticCodeBlock } from '@docdundee/vue';
import { hljs } from '@/conf';
import { api } from '@/state';

globalThis["useDocloader"] = useDocloader;
globalThis["api"] = api;

const code1 = `//import { ParsedDocstring, useDocloader } from "@docdundee/nav";

const docloader = useDocloader(api);

const docstrings: Record<string, ParsedDocstring> = await docloader.loadDocstrings(
  '/python/api'
);
return '<pre>'+JSON.stringify(docstrings, null, "  ")+'</pre>'`;

const code2 = `//import { useDocloader } from "@docdundee/nav"

const docloader = useDocloader(api);

const md: string = await docloader.loadMarkdown(
  '/frontend/get_started/1.install.md'
);
return '<pre>'+md+'</pre>'`;

const tcode = `declare const useDocloader: (api: ReturnType<typeof useApi>) => {
    loadDocstrings: (
      routePath: string | null | undefined
    ) => Promise<Record<string, ParsedDocstring>>;
    loadMarkdown: (
      filepath: string
    ) => Promise<string>;
};`
</script>