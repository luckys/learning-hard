export default defineNuxtConfig({
  extends: [
    'docus'
  ],
  future: {
    compatibilityVersion: 5,
  },
  modules: [
    '@nuxtjs/i18n',
    '@nuxt/content',
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/scripts',
    '@nuxt/ui',
  ],
  i18n: {
    defaultLocale: 'en',
    locales: [{
      code: 'en',
      name: 'English',
    }, {
      code: 'es',
      name: 'Español',
    }],
  },
  content: {
    build: {
      markdown: {
        highlight: {
          langs: [
            'tsx'
          ]
        }
      }
    }
  }
})