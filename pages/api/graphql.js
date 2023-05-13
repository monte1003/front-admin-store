/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable no-undef */
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core'
import { ApolloServer, AuthenticationError, UserInputError } from 'apollo-server-micro'
import { getIronSession } from 'iron-session'
import jwt from 'jsonwebtoken'
import Cors from 'micro-cors'
import resolvers from '../api/lib/resolvers/index'
import typeDefs from '../api/lib/typeDefs'
import { getUserFromToken } from './auth'
import { requestDidStartPlugin } from './lib/hooks/apollo-plugin'
import httpHeadersPlugin from './lib/hooks/apollo-plugin-http-header'
import { parseCookies } from './lib/utils'
import { GraphQLError } from 'graphql'
const corsMultipleAllowOrigin = (options = {}) => {
  const { origin: optionsOrigin } = options || {}
  const multiple = Array.isArray(optionsOrigin)
  if (multiple && optionsOrigin.length === 0) {
    throw new Error('`options.origin` must not be empty')
  }
  return handler => {
    return (req, res, ...restArgs) => {
      if (multiple) {
        const { origin } = req.headers || {}
        if (optionsOrigin.includes(origin)) {
          options.origin = origin
        } else {
          options.origin = ' '
        }
      }

      return Cors(options)(handler)(req, res, ...restArgs)
    }
  }
}
const cors = corsMultipleAllowOrigin({ origin: ['*'] })
let serverCleanup = null

const apolloServer = new ApolloServer({
  resolvers,
  formatError: (error) => {
    if (error.originalError instanceof UserInputError) {
      return new Error('Entrada de usuario inválida')
    }

    if (error.originalError instanceof AuthenticationError) {
      return new Error('No autenticado')
    }
    return error
  },
  typeDefs,
  introspection: true,
  cache: 'bounded',
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground(),
    httpHeadersPlugin,
    {
      async serverWillStart() {
        return {
          async drainServer() {
            await serverCleanup?.dispose()
          }
        }
      }
    },
    requestDidStartPlugin],
  context: (async ({ req, res, next, connection }) => {
    try {
      const session = await getIronSession(req, res, {
        password: process.env.SESSION_KEY,
        cookieName: process.env.SESSION_NAME,
        cookieOptions: {
          maxAge: 60 * 60 * 8, // 8 hours,
          secure: process.env.NODE_ENV === 'production'
        }
      })
      const { user } = session || {}
      const { token } = user || {}
      parseCookies(req)
      res.setHeader('x-token-access', `${token}`)
      res.setHeader('Access-Control-Allow-Origin', '*')
      res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET', 'POST', 'PUT', 'DELETE', 'HEAD', 'PATCH')
      let tokenClient
      let User = {}
      if (connection) {
        // check connection for metadata
        return connection.context
      }
      //  Initialize Array empty
      const setCookies = []
      const setHeaders = []
      tokenClient = req.headers.authorization?.split(' ')[1]
      const restaurant = req.headers.restaurant || {}
      // eslint-disable-next-line
      const { error, message } = await getUserFromToken(tokenClient)
      const excluded = ['/login', '/forgotpassword', '/register']
      if (excluded.indexOf(req.session) > -1) return next()
      if (token) {
        User = await jwt.verify(token, process.env.AUTHO_USER_KEY)
        return { req, setCookies: setCookies || [], setHeaders: setHeaders || [], User: User || {}, restaurant: restaurant || {} }
      } else if (tokenClient) {
        User = await jwt.verify(tokenClient, process.env.AUTHO_USER_KEY)
        return { req, setCookies: setCookies || [], setHeaders: setHeaders || [], User: User || {}, restaurant: restaurant || {} }
      }
      return { req, setCookies: [], setHeaders: [], User: User || {}, restaurant: restaurant || {} }
    } catch (error) {
      if (error.message === 'jwt expired') throw new GraphQLError(error.message, {
        extensions: { code: 'FORBIDDEN', message:  { message: 'Token expired' } }
      })
    }
  }),
  subscriptions: {
    path: '/api/graphqlSubscriptions',
    keepAlive: 9000,
    // eslint-disable-next-line no-unused-vars
    onConnect: (connectionParams, webSocket, context) => { return console.log('connected') },
    onDisconnect: () => { return console.log('disconnected') }
  },
  playground: {
    subscriptionEndpoint: '/api/graphqlSubscriptions',
    settings: {
      'request.credentials': 'same-origin'
    }
  }
})
const startServer = apolloServer.start(
  {
    cors: {
      credentials: true, origin: ['http://localhost:3001']
    }
  }
)

export default cors(async (req, res) => {
  if (req.method === 'OPTIONS') {
    res.end()
    return false
  }
  await startServer
  const handler = (apolloServer.createHandler({
    cors: {
      methods: ['GET', 'POST'],
      origin: 'http://localhost:3001'
    },
    path: '/api/graphql'
  }))
  return handler(req, res)
})
export const config = {
  api: {
    bodyParser: false,
    playground: true
  }
}
