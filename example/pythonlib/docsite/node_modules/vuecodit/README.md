# Vuecodit

[![package](https://img.shields.io/npm/v/vuecodit)](https://www.npmjs.com/package/vuecodit)

A little code editor for Vuejs 3. Syntax highlighting with [Highlightjs](https://highlightjs.org/)

[Demo](https://synw.github.io/vuecodit/) - [Example](example/)

## Install

```
npm install vuecodit
# or
yarn add vuecodit
```

## Usage

### Initialize

Import the code editor widget and it's style

```ts
import { CodeEditor } from "vuecodit";
import "vuecodit/style.css";
```

Import Highlightjs and register a language

```ts
import hljs from 'highlight.js/lib/core';
import python from 'highlight.js/lib/languages/python';
hljs.registerLanguage('python', python);
```

Refer to the list of [available languages](https://github.com/highlightjs/highlight.js/tree/main/src/languages) in Highlightjs

Import an Highlightjs theme for the code highlight style

```ts
import "highlight.js/styles/stackoverflow-light.css";
```

Use any [highlight.js theme](https://github.com/highlightjs/highlight.js/tree/main/src/styles) for
the code block. [Themes preview](https://highlightjs.org/static/demo/)

### Code editor

Use the code editor widget:

```vue
<template>
  <div class="container mx-auto">
    <div class="p-8">
      <code-editor :code="code" lang="python" @edit="codeChange($event)" :hljs="hljs"></code-editor>
    </div>
  </div>
</template>

<script setup lang="ts">
import { CodeEditor } from "vuecodit";
import "vuecodit/style.css";
import "highlight.js/styles/stackoverflow-light.css";
import python from 'highlight.js/lib/languages/python';
import hljs from 'highlight.js/lib/core';
hljs.registerLanguage('python', python);

const code = `print('hello world')`;

function codeChange(e) {
  console.log("Code change", e)
}
</script>
```

## Css

The styling of the widgets is made with Tailwind css classes. If you don't have
Tailwind installed import the necessary css manualy:

```ts
import "vuecodit/twstyle.css"
```

If you use Tailwind css add this to your *tailwind.config.js* file:

```js
  content: [
    // ...
    './node_modules/vuecodit/**/*.{vue,js,ts}',
  ],
```

## Example

An [example](example/README.md) is available

Full example for javascript code:

```vue
<template>
  <div class="container mx-auto dark">
    <div class="w-full h-full p-8 background">
      <code-editor :code="initialCode" lang="javascript" @edit="codeChange($event)" :hljs="hljs"></code-editor>
      <button class="mt-5 btn secondary" @click="runCode()">Run</button>
    </div>
    <div class="mt-5">{{ result }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { CodeEditor } from "vuecodit";
import "vuecodit/style.css";
import "highlight.js/styles/vs2015.css";
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
hljs.registerLanguage('javascript', javascript);

const initialCode = `console.log('starting script');
const a = 1;
const b = 2;
console.log(a+b);
a+b`;
let editedCode = initialCode;
const result = ref("");

function codeChange(e) {
  // update the code
  editedCode = e;
}

function runCode() {
  // execute the code
  result.value = eval(editedCode)
}
</script>
```