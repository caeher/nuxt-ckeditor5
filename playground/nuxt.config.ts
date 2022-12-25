import { defineNuxtConfig } from 'nuxt/config'
import MyModule from '..'

export default defineNuxtConfig({
  modules: [
    // @ts-ignore
    MyModule
  ],
  ckeditor: {
    // disabledModule: true, // Disable module module
    height: 500,
    // disabled: true, // Disable editor
    config: {
      // toolbar: ['code-block'],
    }
  }
})
