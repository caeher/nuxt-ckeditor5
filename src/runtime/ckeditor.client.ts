import { defineNuxtPlugin } from '#app'
import CKEditor from './components/CKEditor.vue'
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('Ckeditor', CKEditor)
})
