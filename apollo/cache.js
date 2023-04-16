import { InMemoryCache, makeVar } from '@apollo/client'
import { concatPagination } from '@apollo/client/utilities'

export const isLoggedVar = makeVar({ state: true, expired: false })
const mergeArraysWithDuplicates = (existing = [], incoming = [], max = Infinity, uniqueKey = null) => {
  const merged = existing ? existing.slice(0) : []
  if (Array.isArray(incoming)) {
    for (let i = 0; i < incoming.length && merged.length < max; ++i) {
      const item = incoming[i]
      if (uniqueKey) {
        const index = merged.findIndex((existingItem) => {return existingItem[uniqueKey] === item[uniqueKey]})
        if (index >= 0) {
          merged[index] = item
        } else {
          merged.push(item)
        }
      } else {
        merged.push(item)
      }
    }
  }
  return merged
}


export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        isLogged: {
          read: () => {return isLoggedVar()}
        },
        allPosts: concatPagination(),
        getOnePedidoStore: {
          keyArgs: ['pCodeRef'],
          merge(existing, incoming) {
            if (!incoming) return existing
            if (!existing) return incoming

            // Creamos una copia de los resultados existentes y entrantes
            const merged = {
              ...existing,
              ...incoming,
              getAllPedidoStore: [
                ...(existing.getAllPedidoStore || []),
                ...(incoming.getAllPedidoStore || [])
              ]
            }

            return merged
          }
        },
        getAllPedidoStoreFinal: {
          keyArgs: ['idStore', 'search', 'statusOrder'],
          merge(existing, incoming, { args: { max = Infinity } }) {
            try {
              // Verificar que el objeto exista y tenga la propiedad getAllPedidoStore
              const existingResults = existing?.getAllPedidoStore ?? []
              const incomingResults = incoming?.getAllPedidoStore ?? []
              // Concatenamos los resultados entrantes con los existentes
              const merged = [...existingResults]
              for (let i = 0; i < incomingResults.length && merged.length < max; ++i) {
                const incomingResult = incomingResults[i]
                // Verificar que el objeto exista y tenga la propiedad pdpId
                if (incomingResult?.pdpId && !merged.some(existingResult => {return existingResult.pdpId === incomingResult.pdpId})) {
                  merged.push(incomingResult)
                }
              }
              return {
                ...incoming,
                getAllPedidoStore: merged
              }
            } catch (error) {
              return existing
            }
          }
        },
        productFoodsAll: {
          keyArgs: ['categories', 'desc', 'fromDate', 'gender', 'pState', 'search', 'toDate'],
          merge(existing, incoming, { args: { max = Infinity } }) {
            const merged = existing ? existing.slice(0) : []
            for (let i = 0; i < incoming.length && merged.length < max; ++i) {
              const item = incoming[i]
              const index = merged.findIndex((existingItem) => {return existingItem.pId === item.pId})
              if (index >= 0) {
                merged[index] = item
              } else {
                merged.push(item)
              }
            }
            return merged
          }
        },
        getCatProductsWithProduct: {
          keyArgs: ['search', 'min', 'max', 'gender', 'desc', 'categories'],
          merge(existing, incoming, { args: { max = Infinity } }) {
            const merged = {
              ...incoming,
              catProductsWithProduct: mergeArraysWithDuplicates(
                existing?.catProductsWithProduct,
                incoming?.catProductsWithProduct,
                max,
                'carProId'
              )
            }
            return merged
          }
        }
      }
    }
  }
})
