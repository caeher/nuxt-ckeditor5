import { defineNuxtConfig } from 'nuxt/config'
import MyModule from '..'

export default defineNuxtConfig({
  // ssr: false,
  alias: {
    // '@caeher/nuxt-ckeditor5': '@caeher/nuxt-ckeditor5/dist/caeher.js',
    '@caeher/build-ckeditor': '@caeher/build-ckeditor/dist/caeher.js',
    '@ckeditor/ckeditor5-vue': '@ckeditor/ckeditor5-vue/dist/ckeditor.js'
  },
  modules: [
    // @ts-ignore
    MyModule
  ],
  ckeditor: {
    // disabledModule: true, // Disable module module
    height: 500,
    // disabled: true, // Disable editor
    config: {

    }
  },
  vite: {
    // vue: {
    //   template: {
    //     compilerOptions: {
    //       isCustomElement: (tag:string) => tag.startsWith('Caeh')
    //     }
    //   }
    // }
  }
})
