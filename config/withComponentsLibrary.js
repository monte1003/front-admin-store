/* eslint-disable */
const path = require('path')

const resolveUniqueReactForHooks = {
    webpack: (config, options) => {
      config.resolve.alias = {
        ...config.resolve.alias,
        // Will make webpack look for these modules in parent directories
        'pkg-components': require.resolve('pkg-components')
        // ...
      }
      return config
    },
    domains: ['http2.mlstatic.com', 'localhost', 'server-image-food.herokuapp.com', '*']
}

module.exports = () => { return resolveUniqueReactForHooks }