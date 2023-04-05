import { InMemoryCache, makeVar } from '@apollo/client'
import { concatPagination } from '@apollo/client/utilities'

export const isLoggedVar = makeVar({ state: true, expired: false })
export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        isLogged: {
          read: () => {return isLoggedVar()}
        },
        allPosts: concatPagination(),
        productFoodsAll: {
          keyArgs: false,
          merge(existing, incoming, { args: { max = Infinity } }) {
            // Concatenamos los resultados entrantes con los existentes
            const merged = existing ? existing.slice(0) : []
            for (let i = 0; i < incoming.length && merged.length < max; ++i) {
              merged.push(incoming[i])
            }
            return merged
          }
        },
        getCatProductsWithProduct: {
          keyArgs: false,
          merge(existing, incoming, { args: { max = Infinity } }) {
            // Concatenamos los resultados entrantes con los existentes
            const merged = existing ? existing.catProductsWithProduct.slice(0) : []
            if (Array.isArray(incoming?.catProductsWithProduct)) {
              for (let i = 0; i < incoming.catProductsWithProduct.length && merged.length < max; ++i) {
                merged.push(incoming.catProductsWithProduct[i])
              }
            }
            return {
              ...incoming,
              catProductsWithProduct: merged
            }
          }
        }
      }
    }
  }
})
