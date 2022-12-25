<template>
  <div>
    <template v-if="isEditor">
      <ClientOnly>
        <Ckeditor v-model="data" editor="full" />
      </ClientOnly>
    </template>
    {{ data }}
    <button @click="isEditor = !isEditor">
      Toggle
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const data = ref('')
const isEditor = ref(true)
</script>
