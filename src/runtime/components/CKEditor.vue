<script setup lang="ts">
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
  case 'semi':
    buildEditor = await import('ckeditor5-build-full')
    break
  case 'full':
    buildEditor = await import('@blowstack/ckeditor5-full-free-build')
    buildEditor.defaultConfig = defu(buildEditor.defaultConfig, { removePlugins: ['Title'] })
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
const editorConfig = defu(
  buildEditor.defaultConfig,
  config
)

function onDocumentReady (editor) {
  // Insert the toolbar before the editable area.
  editor.ui.getEditableElement().parentElement.insertBefore(
    editor.ui.view.toolbar.element,
    editor.ui.getEditableElement()
  )
}

function onBalloonReady(editor) {
  editor.ui.getEditableElement().parentElement.insertBefore(
    editor.ui.element ?? editor.ui.view.element,
    editor.ui.getEditableElement()
  )
}

function onInlineReady (editor) {
  editor.ui.getEditableElement().parentElement.insertBefore(
    editor.ui.element ?? editor.ui.view.element,
    editor.ui.getEditableElement()
  )
}

function onBalloonBlockReady (editor) {
  editor.ui.getEditableElement().parentElement.insertBefore(
    editor.ui.element ?? editor.ui.view.element,
    editor.ui.getEditableElement()
  )
}

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
