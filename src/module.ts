import { fileURLToPath } from 'url'
import { defineNuxtModule, addPlugin, createResolver } from '@nuxt/kit'
import consola from 'consola'
import defu from 'defu'

const logger = consola.withScope('nuxt:ckeditor')

export interface ModuleOptions {
  disabledModule: boolean,
  height: number,
  disabled: boolean,
  config: object
}

const defaults:ModuleOptions = {
  disabledModule: false,
  height: 300,
  disabled: false,
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

      // const component = resolve(runtimeDir, 'components/CKEditor.vue')

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
