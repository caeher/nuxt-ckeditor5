import { defineNuxtConfig } from 'nuxt/config'
import MyModule from '..'

export default defineNuxtConfig({
  modules: [
    MyModule
  ],
  ckeditor: {
    // disabledModule: true, // Disable module module
    height: 500,
    // disabled: true, // Disable editor
    config: {
      // toolbar: ['bold', 'italic', 'undo', 'redo']
    }
  }
})
