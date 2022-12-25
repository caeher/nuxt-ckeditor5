<template>
  <div>
    <template v-if="isEditor">
      <ClientOnly>
        <Ckeditor v-model="data" />
      </ClientOnly>
    </template>

    <button @click="isEditor = !isEditor">
      Toggle
    </button>
  </div>
</template>

<script setup lang="ts">
const data = ref('')
const config = reactive({})
const isEditor = ref(true)

</script>
