import colors from "vuetify/es5/util/colors";
require("dotenv").config();

export default {
  env: {
    GOOGLE_OAUTH_CLIENT_ID: process.env.GOOGLE_OAUTH_CLIENT_ID,
    BASE_SERVER_URL: process.env.BASE_SERVER_URL,
  },
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: "%s - TUP Election",
    title: "TUP Election",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },

  router: {
    middleware: ["auth"],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: "~/plugins/axios-port.plugins" },
    // { src: "~/plugins/vuex-persist", mode: "client" },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    "@nuxt/typescript-build",
    // https://go.nuxtjs.dev/vuetify
    "@nuxtjs/vuetify",
    // https://typed-vuex.roe.dev/getting-started/getting-started-nuxt
    "nuxt-typed-vuex",
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    "@nuxtjs/axios",
    // https://go.nuxtjs.dev/pwa
    "@nuxtjs/pwa",
    "@nuxtjs/auth-next",
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  publicRuntimeConfig: {
    axios: {
      // baseURL: "https://tup-voting-server-dev.herokuapp.com/",
      baseURL: process.env.BASE_SERVER_URL || "http://localhost:5000",
      progress: true,
    },
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: "en",
    },
  },

  auth: {
    redirect: false,
    rewriteRedirects: true,
    resetOnError: true,
    strategies: {
      google: {
        scheme: "oauth2",
        clientId: process.env.GOOGLE_OAUTH_CLIENT_ID,
        redirectUri: process.env.GOOGLE_OAUTH_REDIRECT_URI,
        accessType: "offline",
        responseType: "code",
        scope: ["profile", "email"],
        prompt: "consent",
        state: "UNIQUE_AND_NON_GUESSABLE",
        codeChallengeMethod: "",
        responseMode: "",
        acrValues: "",
        endpoints: {
          token: "http://localhost:5000/api/v1/auth/voter/google/token", // somm backend url to resolve your auth with google and give you the token back
          userInfo: "http://localhost:5000/api/v1/auth/voter/me", // the endpoint to get the user info after you recived the token
        },
      },
      local: {
        token: {
          property: "token",
          global: true,
          // required: true,
          // type: 'Bearer'
        },
        user: {
          property: "user",
          // autoFetch: true
        },
        endpoints: {
          login: { url: "/api/v1/auth/voter/login", method: "post" },
          logout: { url: "/api/v1/auth/voter/logout", method: "post" },
          user: { url: "/api/v1/auth/voter/me", method: "get" },
        },
      },
    },
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ["~/assets/variables.scss"],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
      },
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
};
