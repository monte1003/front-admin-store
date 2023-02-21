/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable consistent-return */
/** @type {import('next').NextConfig} */
const {
  PHASE_DEVELOPMENT_SERVER,
  PHASE_PRODUCTION_BUILD
} = require('next/constants')
const runtimeCaching = require('next-pwa/cache')
const withPlugins = require('./scripts/next-compose-plugins/lib')
const withTM = require('next-transpile-modules')(['pkg-components']) // pass the modules you would like to see transpiled

const prod = process.env.NODE_ENV === 'production'

const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  disable: !prod ? false : true
})

module.exports = async (phase) => {
  /** @type {import('next').NextConfig} */
  // npm run dev or next dev
  const isDev = phase === PHASE_DEVELOPMENT_SERVER
  // npm run build or next build
  const isProd = phase === PHASE_PRODUCTION_BUILD && process.env.STAGING !== '1'
  // npm run build or next build
  const isStaging = phase === PHASE_PRODUCTION_BUILD && process.env.STAGING === '1'
  const env = {
    NAMEDB: (() => {
      // if (isDev) return 'app'
      if (isDev) return 'app'
      if (isProd) return 'bsm58gjtynob5wvyvpo3'
    })(),
    USERDB: (() => {
      // if (isDev) return 'root'
      if (isDev) return 'root'
      if (isProd) return 'um6z9noxxvjg5b1v'
    })(),
    PASSDB: (() => {
      // if (isDev) return ''
      if (isDev) return ''
      if (isProd) return 'qcV3ROSpVDim28bmmutN'
    })(),
    HOST_DB: (() => {
      if (isDev) return 'localhost'
      if (isProd) return 'bsm58gjtynob5wvyvpo3-mysql.services.clever-cloud.com'
    })(),
    MYSQL_PORT: (() => {
      if (isDev) return 3306
      if (isProd) return 3306
    })(),
    DIALECTDB: 'mysql',
    LOCAL_SALES_STORE: 'app.cart.sales',
    SESSION_NAME: 'vp.store',
    SESSION_KEY: '12ba105efUaGjihGrh0LfJHTGIBGu6jXa',
    URL_BASE: (() => {
      if (isDev) return 'http://localhost:3001/'
      if (isProd) return 'http://localhost:3000/'
      if (isStaging) return 'Title Stg'
    })(),
    MAIN_URL_BASE: (() => {
      if (isDev) return 'http://localhost:3000/'
      if (isProd) return 'http://localhost:3000/'
      if (isStaging) return 'Title Stg'
    })(),
    // URL_BASE_WS
    URL_ADMIN_SERVER: (() => {
      if (isDev) return 'http://localhost:4000/'
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
  const images = {
    domains: ['http2.mlstatic.com', 'localhost', 'server-image-food.herokuapp.com', '*']
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
  // eslint-disable-next-line
  const redirects = async () => {
    return [
      {
        source: '/',
        destination: '/',
        permanent: false
      }
    ]
  }
  // eslint-disable-next-line
  const basePath = ''
  // puedes sobre escribir la ruta
  // eslint-disable-next-line
  const rewrites = async () => {
    return [
      {
        source: '/ab',
        destination: '/about'
      }
    ]
  }
  const nextConfig = {
    env,
    images,
    reactStrictMode: true,
    headers,
    runtimeCaching,
    // rewrites,
    // redirects,
    // basePath,
    optimizeFonts: true,
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
  }

  const defaultConfig = nextConfig

  return withPlugins( [withTM], [withPWA], nextConfig)(phase, { defaultConfig })
}