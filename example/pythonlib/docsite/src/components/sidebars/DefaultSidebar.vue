<template>
  <div class="flex flex-col items-start space-y-2">
    <div class="mb-3 text-xl">Demo docs</div>
    <button class="btn" @click="$router.push('/mylib')">My lib</button>
    <button class="btn" @click="$router.push('/requests')">Requests</button>
    <button class="btn" @click="$router.push('/dataframe')">Dataframe</button>
  </div>
</template>