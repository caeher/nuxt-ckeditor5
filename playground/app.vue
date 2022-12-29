<template>
  <div>
    <template v-if="isEditor">
      <CaeherEditor v-model="data" />
    </template>
    {{ data }}
    <button @click="isEditor = !isEditor">
      Toggle
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import * as c from '#components'
// console.log(c)
const data = ref('')
const isEditor = ref(true)
</script>
