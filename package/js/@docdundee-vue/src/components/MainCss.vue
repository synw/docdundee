<template>
</template>

<style lang="sass">
.prosed:not(.not-prose)
  @apply prose dark:prose-invert max-w-none prose-h1:txt-light prose-h2:txt-light prose-h3:txt-light
.md-content.prosed:not(.not-prose)
  & pre
    @apply bg-gray-100 text-black dark:bg-black dark:text-neutral-200 p-3 rounded-md max-w-[100ch] xl:min-w-[100ch] overflow-x-auto border border-gray-200 dark:border-neutral-800
em
  @apply font-semibold txt-light not-italic
.codedef
  @apply ml-8
kbd
  @apply px-2 py-1 font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500
.static-code:not(.raw)
  @apply p-3 bg-gray-100 dark:bg-black dark:text-neutral-200 rounded-md max-w-[100ch] xl:min-w-[100ch] overflow-x-auto border border-gray-200 dark:border-neutral-800
// nav
.nav-item-hspace
  @apply ml-8
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