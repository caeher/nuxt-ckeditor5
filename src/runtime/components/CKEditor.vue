<script setup>
import { component as CKEditor } from '@ckeditor/ckeditor5-vue'

const { public: { ckeditor: { height, config, disabled, editor } } } = useRuntimeConfig()

const props = defineProps({
  modelValue: {
    type: String,
    default: '<p></p>'
  },
  editor: {
    type: String,
    default: 'classic'
  }
})
let buildEditor
switch (props.editor) {
  case 'inline':
    buildEditor = await import('@ckeditor/ckeditor5-build-inline')
    break
  case 'balloon':
    buildEditor = await import('@ckeditor/ckeditor5-build-balloon')
    break
  case 'balloon-block':
    buildEditor = await import('@ckeditor/ckeditor5-build-balloon-block')
    break
  case 'document':
    buildEditor = await import('@ckeditor/ckeditor5-build-decoupled-document')
    break
  default:
    buildEditor = await import('@ckeditor/ckeditor5-build-classic')
    break
}
const emit = defineEmits(['update:modelValue'])

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
      children: `.ck-editor__editable[role="textbox"] { min-height: ${height}px; }`,
      type: 'text/css'
    }
  ]
})

</script>

<template>
  <CKEditor :id="editor" v-model="value" :editor="buildEditor.default" :config="config" :disabled="disabled" />
</template>
