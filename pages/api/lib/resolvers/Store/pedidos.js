import { Op } from 'sequelize'
import productModelFood from '../../models/product/productFood'
import pedidosModel from '../../models/Store/pedidos'
import ShoppingCard from '../../models/Store/ShoppingCard'
import StatusOrderModel from '../../models/Store/statusPedidoFinal'
import Users from '../../models/Users'
import { deCode, getAttributes } from '../../utils/util'

export const createOnePedidoStore = async (_, { input }) => {
  const {
    id,
    idStore,
    ShoppingCard,
    pCodeRef,
    payMethodPState,
    pPRecoger
  } = input || {}
  try {
    await pedidosModel.create({
      ...input,
      pPStateP: 1,
      id: deCode(id),
      idStore: deCode(idStore),
      ShoppingCard:  deCode(ShoppingCard),
      pCodeRef,
      pPRecoger,
      payMethodPState
    })
    return {
      success: true,
      message: ''
    }
  } catch (error) {
    return { success: false, message: 'Se ha producido un error' || error }
  }
}
// eslint-disable-next-line
const changePPStatePPedido = async (_, { pPStateP, pCodeRef, pDatMod }, ctx) => {
  const state = {
    1: 'El pedido fue marcado como aprobado',
    2: 'El pedido fue marcado como en proceso',
    3: 'El pedido esta listo para salir',
    4: 'Pedido fue pagado con éxito por el cliente (Concluido)',
    5: 'Pedido rechazado'
  }
  try {
    await StatusOrderModel.update(
      { pSState: pPStateP, pDatMod },
      { where: { pCodeRef: pCodeRef } }
    )
    return {
      success: true,
      message: state[pPStateP]
    }
  } catch (error) {
    return {
      success: false,
      message: error
    }
  }
}
const createMultipleOrderStore = async (_, { input }, ctx) => {
  const {
    setInput,
    change,
    pickUp,
    pCodeRef,
    payMethodPState,
    pPRecoger,
    totalProductsPrice,
    locationUser
  } = input || {}
  try {
    await StatusOrderModel.create({
      id: deCode(ctx.User.id),
      locationUser,
      idStore: deCode(setInput[0].idStore),
      pSState: 0,
      pCodeRef: pCodeRef,
      change: change,
      payMethodPState: payMethodPState,
      pickUp,
      totalProductsPrice
    })
    for (const element of setInput) {
      const { ShoppingCard, idStore } = element
      // PENDIENTE EN DESCOMENTAR !!
      // await deleteOneItem(null, { ShoppingCard, cState: 1 })
      await createOnePedidoStore(null, {
        input: {
          id: ctx.User.id,
          idStore,
          ShoppingCard,
          change,
          pickUp,
          pCodeRef,
          payMethodPState,
          pPRecoger
        }
      })
    }
    return { success: true, message: 'Update' }
  } catch (error) {
    return { success: false, message: error }
  }
}
// store
export const getAllPedidoStore = async (_, args, ctx, info) => {
  const { idStore } = args
  try {
    const attributes = getAttributes(pedidosModel, info)
    // console.log(attributes)
    const data = await pedidosModel.findAll({
      attributes,
      where: {
        [Op.or]: [
          {
            // ppState: 0,
            // ID STORE
            idStore: idStore ? deCode(idStore) : deCode(ctx.restaurant)
          }
        ]
      }
    })
    return data
  } catch (error) {
    return error
  }
}
// store
export const getAllPedidoStoreFinal = async (_, args, ctx, info) => {
  const { idStore, statusOrder } = args || {}
  const START = new Date()
  START.setHours(0, 0, 0, 0)
  const NOW = new Date()
  try {
    const attributes = getAttributes(StatusOrderModel, info)
    const data = await StatusOrderModel.findAll({
      attributes,
      where: {
        [Op.or]: [
          {
            // ID STORE
            pSState: statusOrder,
            idStore: idStore ? deCode(idStore) : deCode(ctx.restaurant),
            pDatCre: {
              [Op.between]: [START.toISOString(), NOW.toISOString()]
            }
          }
        ]
      },
      order: [['pDatMod', 'DESC']]

    })
    return data
  } catch (error) {
    return error
  }
}
export const getAllPedidoUserFinal = async (_, args, ctx, info) => {
  const { id } = args || {}
  try {
    const attributes = getAttributes(StatusOrderModel, info)
    const data = await StatusOrderModel.findAll({
      attributes,
      where: {
        [Op.or]: [
          { id: id ? deCode(id) : deCode(ctx.User.id) }
        ]
      },
      order: [['pDatCre', 'DESC']]
    })
    return data
  } catch (error) {
    return error
  }
}
const getOnePedidoStore = async (_, { pCodeRef }, ctx, info) => {
  try {
    const attributes = getAttributes(StatusOrderModel, info)
    const data = await StatusOrderModel.findOne({
      attributes,
      where: {
        pCodeRef: pCodeRef
      }
    })
    return data
  } catch {
    return null
  }
}

export default {
  TYPES: {
    StorePedidos: {
      // getOneStore,
      productFoodsOne: async (parent, _args, _context, info) => {
        try {
          const attributes = getAttributes(productModelFood, info)
          const data = await productModelFood.findOne({
            attributes,
            where: { pId: deCode(parent.pId) }
          })
          return data
        } catch {
          return null
        }
      },
      getUser: async (parent, _args, _context, info) => {
        try {
          const attributes = getAttributes(Users, info)
          const data = await Users.findOne({
            attributes,
            where: { id: deCode(parent.id) }
          })
          return data
        } catch {
          return null
        }
      },
      getAllPedidoStore: async (parent, _args, _context, info) => {
        try {
          const attributes = getAttributes(pedidosModel, info)
          const data = await pedidosModel.findAll({
            attributes,
            where: { pCodeRef: parent.pCodeRef }
          })
          return data
        } catch {
          return null
        }
      },
      getAllShoppingCard: async (parent, _args, _context, info) => {
        try {
          const attributes = getAttributes(ShoppingCard, info)
          const data = await ShoppingCard.findOne({
            attributes,
            where: { ShoppingCard: deCode(parent.ShoppingCard) }
          })
          return data
        } catch {
          return null
        }
      }
    }
  },
  QUERIES: {
    getAllPedidoStore,
    getAllPedidoStoreFinal,
    getOnePedidoStore,
    // User
    getAllPedidoUserFinal
  },
  MUTATIONS: {
    createOnePedidoStore,
    createMultipleOrderStore,
    changePPStatePPedido
  }
}
