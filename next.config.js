/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable consistent-return */
/** @type {import('next').NextConfig} */

const {
  PHASE_DEVELOPMENT_SERVER,
  PHASE_PRODUCTION_BUILD
} = require('next/constants')
const runtimeCaching = require('next-pwa/cache')
const withTM = require('next-transpile-modules')(['pkg-components']) // pass the modules you would like to see transpiled
const withPWA = require('next-pwa')({
  dest: 'public'
})

module.exports = (phase) => {
  // npm run dev or next dev
  const isDev = phase === PHASE_DEVELOPMENT_SERVER
  // npm run build or next build
  const isProd = phase === PHASE_PRODUCTION_BUILD && process.env.STAGING !== '1'
  // npm run build or next build
  const isStaging = phase === PHASE_PRODUCTION_BUILD && process.env.STAGING === '1'
  const env = {
    NAMEDB: (() => {
      if (isDev) return 'app'
      if (isProd) return 'railway'
    })(),
    USERDB: (() => {
      if (isDev) return 'root'
      if (isProd) return 'root'
    })(),
    PASSDB: (() => {
      if (isDev) return ''
      if (isProd) return '8jpgm70bhVjWIxEFbsrt'
    })(),
    HOSTDB: (() => {
      if (isDev) return 'localhost'
      if (isProd) return 'containers-us-west-65.railway.app'
    })(),
    DIALECTDB: 'mysql',
    LOCAL_SALES_STORE: 'app.cart.sales',
    SESSION_NAME: 'vp.store',
    SESSION_KEY: '12ba105efUaGjihGrh0LfJHTGIBGu6jXa',
    URL_BASE: (() => {
      if (isDev) return 'http://localhost:3001/'
      if (isProd) return 'http://localhost:3000/'
      // if (isStaging) return 'Title Stg'
    })(),
    MAIN_URL_BASE: (() => {
      if (isDev) return 'http://localhost:3000/'
      if (isProd) return 'http://localhost:3000/'
      if (isStaging) return 'Title Stg'
    })(),
    // URL_BASE_WS
    URL_ADMIN_SERVER: (() => {
      if (isDev) return 'http://localhost:4000/'
      // if (isDev) return 'https://server-image-food.herokuapp.com/'
      if (isProd) return 'http://localhost:4000/'
    })(),
    // BANCOLOMBIA
    BANCOLOMBIA_CLIENT_KEY: '55929729-85fe-4ffe-928d-0bd317817be4',
    BANCOLOMBIA_SECRET_KEY: 'E1aM2bV2lD7vS8cH1qJ8oN0nD7eN0eP0rM8gU0cG2lL6uY5sO7',
    JWT_EXPIRY: 333300,
    REFRESH_TOKEN_EXPIRY: '604800',
    AUTHO_USER_KEY: '12ba105efUaGjihGrh0LfJHTGIBGu6jXV',
    ACCESS_SID_TWILIO: 'AC7c9ccbdb50400c504faf629e35aea8e4',
    REACT_APP_API_KEY_GOOGLE_MAPS: 'AIzaSyAy0SY1G3OFqesWSTQRHJvzyJzNgURPoN8',
    ACCESS_TOKEN_AUTH_TWILIO: '22e090d4d776ace7bb596ca77cba6b18'
  }
  const headers = async () => {
    return [
      {
        source: '/',
        headers: [
          {
            key: 'x-custom-header-1',
            value: 'my custom header 1'
          }
        ]
      }
    ]
  }
  // const redirects = async () => {
  //   return [
  //     {
  //       source: '/',
  //       destination: '/',
  //       permanent: false
  //     }
  //   ]
  // }
  // const basePath = ''
  // puedes sobre escribir la ruta
  // const rewrites = async () => {
  //   return [
  //     {
  //       source: '/ab',
  //       destination: '/about'
  //     }
  //   ]
  // }
  const images = {
    domains: ['http2.mlstatic.com', 'localhost', 'server-image-food.herokuapp.com', '*']
  }
  return withPWA(withTM({
    env,
    pwa: {
      register: true,
      dest: 'public',
      runtimeCaching,
      disable: process.env.NODE_ENV === 'development'
    },
    images,
    reactStrictMode: true,
    // rewrites,
    headers,
    // redirects,
    // basePath,
    optimizeFonts: false,
    swcMinify: false,
    webpack: (config) => {
      config.resolve.alias = {
        ...config.resolve.alias,
        // Will make webpack look for these modules in parent directories
        'pkg-components': require.resolve('pkg-components')
      // ...
      }
      return config
    }
  }))
}
