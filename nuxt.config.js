export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  target: 'static',// Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'rsiscan',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins

  plugins: ['~/plugins/lodash.js'],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/pwa',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap

    '@nuxtjs/onesignal',
    '@nuxtjs/pwa',
    'bootstrap-vue/nuxt',
    '@nuxtjs/moment',
  ],
  pwa: {
    manifest: {
      name: 'RSI Scanner',
      lang: 'vi',
      useWebmanifestExtension: false,
      short_name: 'RSI',
    }
  },
  server: {
    port: 3001 // default: 3000
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },
  oneSignal: {

    cdn: true,

    init: {
      appId: 'e3e0074e-abff-4ff2-80a7-8e6aaea73bf1',
      allowLocalhostAsSecureOrigin: true,
      welcomeNotification: {
        disable: true
      }
    }
  }
}
