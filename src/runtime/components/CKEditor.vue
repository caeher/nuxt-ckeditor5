<script setup lang="ts">
// @ts-ignore
import { component as CKEditor } from '@ckeditor/ckeditor5-vue'
import defu from 'defu'
import { computed } from 'vue'
import { useRuntimeConfig, useHead } from '#app'

const { public: { ckeditor: { height, config, disabled } } } = useRuntimeConfig()

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

let buildEditor: any
switch (props.editor) {
  case 'inline':
    // @ts-ignore
    buildEditor = await import('@ckeditor/ckeditor5-build-inline')
    break
  case 'balloon':
    // @ts-ignore
    buildEditor = await import('@ckeditor/ckeditor5-build-balloon')
    break
  case 'balloon-block':
    // @ts-ignore
    buildEditor = await import('@ckeditor/ckeditor5-build-balloon-block')
    break
  case 'document':
    // @ts-ignore
    buildEditor = await import('@ckeditor/ckeditor5-build-decoupled-document')
    break
  case 'semi':
    // @ts-ignore
    buildEditor = await import('ckeditor5-build-full')
    break
  case 'full':
    // @ts-ignore
    buildEditor = await import('@blowstack/ckeditor5-full-free-build')
    buildEditor.defaultConfig = defu(buildEditor.defaultConfig, { removePlugins: ['Title'] })
    break
  default:
    // @ts-ignore
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
      children: `.ck-editor__editable[role="textbox"] { min-height: ${height}px; }`
    }
  ]
})
const editorConfig = defu(
  buildEditor.defaultConfig,
  config
)
// @ts-ignore
function onDocumentReady (editor) {
  // Insert the toolbar before the editable area.
  editor.ui.getEditableElement().parentElement.insertBefore(
    editor.ui.view.toolbar.element,
    editor.ui.getEditableElement()
  )
}
// @ts-ignore
function onBalloonReady (editor) {
  editor.ui.getEditableElement().parentElement.insertBefore(
    editor.ui.element ?? editor.ui.view.element,
    editor.ui.getEditableElement()
  )
}
// @ts-ignore
function onInlineReady (editor) {
  editor.ui.getEditableElement().parentElement.insertBefore(
    editor.ui.element ?? editor.ui.view.element,
    editor.ui.getEditableElement()
  )
}
// @ts-ignore
function onBalloonBlockReady (editor) {
  editor.ui.getEditableElement().parentElement.insertBefore(
    editor.ui.element ?? editor.ui.view.element,
    editor.ui.getEditableElement()
  )
}
// @ts-ignore
function onReady (editor) {
  if (props.editor === 'document') {
    onDocumentReady(editor)
  } else if (props.editor === 'balloon') {
    onBalloonReady(editor)
  } else if (props.editor === 'inline') {
    onInlineReady(editor)
  } else if (props.editor === 'balloon-block') {
    onBalloonBlockReady(editor)
  }
}

</script>

<template>
  <CKEditor v-model="value" :editor="buildEditor.default" :config="editorConfig" :disabled="disabled" @ready="onReady" />
</template>
