# Unoficial CKEditor5 for Nuxt 3

This module makes use of the official ckeditor component for vuejs, you can check [here](https://ckeditor.com/docs/ckeditor5/latest/installation/frameworks/vuejs-v3.html)


## Setup

```
npm i @caeher/nuxt-ckeditor5
```

Add an alias and module in nuxt.config

```javascript
export default defineNuxtModule<ModuleOptions>({
  alias: {
    '@caeher/build-ckeditor': '@caeher/build-ckeditor/dist/caeher.js',
    '@ckeditor/ckeditor5-vue': '@ckeditor/ckeditor5-vue/dist/ckeditor.js'
  },
  modules: [
    '@caeher/nuxt-ckeditor5'
  ],
  // setting
  ckeditor: {
    // disabledModule: true, // Disable module module
    height: 500, // Height for editor content
    // disabled: true, // Disable editor
    config: {
      // You can review the settings of each plugin for free: https://ckeditor.com/docs/ckeditor5/latest/features/index.html
    }
  }
})
```
Adding the configuration completely resets the default one, so you need to make sure to use free ckeditor5 plugins

## Usage

```html
<CaeherEditor v-model="data" />
```

## Contributing

- Clone this repository `https://github.com/caeher/nuxt-ckeditor5`
- Install dependencies using yarn install or npm install
- Run npm run dev:prepare to generate type stubs.
- Use npm run dev to start playground in development mode.

