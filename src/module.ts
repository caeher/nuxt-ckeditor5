import { fileURLToPath } from 'url'
import { defineNuxtModule, addPlugin, createResolver, addTemplate, addComponent, addComponentsDir } from '@nuxt/kit'
import consola from 'consola'
import defu from 'defu'
// import svgLoader from 'vite-svg-loader'
// import XMLLoader from 'vite-plugin-xml-loader'

// import { CKEditorTranslationsPlugin } from '@ckeditor/ckeditor5-dev-translations'
// import { styles } from  '@ckeditor/ckeditor5-dev-utils'
import { ckOptions } from './vue.config'
const logger = consola.withScope('nuxt:ckeditor')
export interface ModuleOptions {
  disabledModule: boolean,
  height: number,
  disabled: boolean,
  editor: 'inline' | 'balloon' | 'balloon-block' | 'document' | 'classic',
  config: object
}

const defaults:ModuleOptions = {
  disabledModule: false,
  height: 300,
  disabled: false,
  editor: 'classic',
  config: {}
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'my-module',
    configKey: 'ckeditor'
  },
  defaults,
  setup (moduleOptions, nuxt) {
    if (!moduleOptions.disabledModule) {
      logger.info('Start to add module `nuxt-ckeditor`')
      const { resolve } = createResolver(import.meta.url)
      const runtimeDir = fileURLToPath(new URL('./runtime', import.meta.url))

      const options = defu(moduleOptions, {
        defaults
      })

      const component = resolve(runtimeDir, 'components/CKEditor.vue')

      // Configure config
      nuxt.options.runtimeConfig.public = nuxt.options.runtimeConfig.public || {}
      nuxt.options.runtimeConfig.public.ckeditor = options

      nuxt.options.build.transpile.push(runtimeDir)

      // Add plugin
      addPlugin(resolve(runtimeDir, 'ckeditor.client'))

      logger.success('`nuxt-ckeditor` has added successfully')
    } else {
      logger.info('`nuxt-ckeditor` is disabled')
    }
  }
})
