import { fileURLToPath } from 'url'
import { defineNuxtModule, addPlugin, createResolver, addComponent } from '@nuxt/kit'

export interface ModuleOptions {
  disabledModule: boolean,
  height: number,
  disabled: boolean,
  config: object
}

const defaults: ModuleOptions = {
  disabledModule: false,
  height: 300,
  disabled: false,
  config: {}
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxt-ckeditor5',
    configKey: 'ckeditor'
  },
  defaults,
  setup (moduleOptions, nuxt) {
    if (!moduleOptions.disabledModule) {
      const { resolve } = createResolver(import.meta.url)
      const runtimeDir = fileURLToPath(new URL('./runtime', import.meta.url))

      // Configure config
      nuxt.options.runtimeConfig.public = nuxt.options.runtimeConfig.public || {}
      // @ts-ignore
      nuxt.options.runtimeConfig.public.ckeditor = {
        ...defaults,
        ...moduleOptions
      }

      nuxt.options.build.transpile.push(runtimeDir)

      addComponent({
        filePath: resolve(runtimeDir, 'components/Caeher.vue'),
        global: true,
        name: 'CaeherEditor',
        mode: 'client'
      })
    }
  }
})
