<script setup>
import { onMounted, onUnmounted, computed } from 'vue'
import { useRuntimeConfig, useHead } from '#app'
import { component as Ckeditor } from '@ckeditor/ckeditor5-vue'
import CaeherEditor from '@caeher/build-ckeditor'

const props = defineProps({
  modelValue: {
    type: String,
    default: '<p></p>'
  }
})

const emit = defineEmits(['update:modelValue'])

const { public: { ckeditor: { height, config, disabled } } } = useRuntimeConfig()

const editorConfig = {
  ...CaeherEditor.defaultConfig,
  ...config
}

const value = computed({
  get () {
    return props.modelValue
  },
  set (value) {
    emit('update:modelValue', value)
  }
})

useHead({
  style: [
    {
      children: `.ck-editor__editable[role="textbox"] { min-height: ${height}px; }`
    }
  ]
})

</script>

<template>
  <Ckeditor v-model="value" :editor="CaeherEditor" :config="editorConfig" :disabled="disabled" />
</template>
