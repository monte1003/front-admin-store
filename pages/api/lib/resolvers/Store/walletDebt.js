/* eslint-disable import/no-anonymous-default-export */
/* eslint-disable consistent-return */
import Walletdebt from '../../models/Store/walletdebt'
import walletdebtproducts from '../../models/Store/walletdebtproducts'
import { deCode, getAttributes } from '../../utils/util'
import { Op } from 'sequelize'
import { ApolloError } from 'apollo-server-core'

export const createwalletdebtproducts = async (_, { input }) => {
  const { RefDebtCode, UserDebtId, pId, ctx, debtAmountProduct } = input || {}
  await walletdebtproducts.create({
    RefDebtCode,
    debtAmountProduct,
    debtProductState: 1,
    idStore: deCode(ctx.restaurant),
    pId: deCode(pId),
    id: deCode(ctx.User.id),
    UserDebtId: deCode(UserDebtId)
  })
  return {
    success: true,
    message: 'creada products wallet'
  }
}
export const createWalletDebt = async (_, { input, inputLineItems }, ctx) => {
  try {
    const { UserDebtId, RefDebtCode } = input || {}
    const { setData } = inputLineItems || {}
    const data = await Walletdebt.create({
      ...input,
      debtState: 1,
      id: deCode(ctx.User.id),
      UserDebtId: UserDebtId ? deCode(UserDebtId) : null,
      idStore: deCode(ctx.restaurant)
    })
    for (let i = 0; i < setData.length; i++) {
      const { pId, debtAmountProduct } = setData[i]
      await createwalletdebtproducts(null, { input: { pId, RefDebtCode, UserDebtId, debtAmountProduct, ctx } })
    }
    return data
  } catch (error) {
    return new ApolloError('Lo sentimos, ha ocurrido un error interno, al crear la Billetera')
  }
}
export const delWalletDebt = async (_, { input }) => {
  const { debtWalletId, debtState } = input || {}
  try {
    await Walletdebt.update({ debtState: debtState === 1 ? 0 : 1 }, { where: { debtWalletId: deCode(debtWalletId) } })
    return { success: true, message: 'delete' }

  } catch (error) {
    return { success: false, message: error }
  }

}
export const WalletDebt = async (_, { search, min, max }, ctx, info) => {
  let whereSearch = {}
  if (search) {
    whereSearch = {
      [Op.or]: [
        { RefDebtCode: { [Op.substring]: search.replace(/\s+/g, ' ') } }
      ]
    }
  }
  try {
    const attributes = getAttributes(Walletdebt, info)
    const data = await Walletdebt.findAll({
      attributes,
      where: {
        [Op.or]: [
          {
            ...whereSearch,
            idStore: deCode(ctx.restaurant),
            id: deCode(ctx.User.id),
            debtState: { [Op.gt]: 0 }
          }
        ]
      }, limit: [min || 0, max || 100], order: [['debtName', 'DESC']]
    })
    return data
  } catch (e) {
    const error = new Error(e)
    return error
  }
}
export const getAllWalletDebtProduct = async (parent, args, ctx, info) => {
  try {
    const { search, min, max } = args
    let whereSearch = {}
    if (search) {
      whereSearch = {
        [Op.or]: [
          { RefDebtCode: { [Op.substring]: search.replace(/\s+/g, ' ') } }
        ]
      }
    }
    const attributes = getAttributes(walletdebtproducts, info)
    const data = await walletdebtproducts.findAll({
      attributes,
      where: {
        [Op.or]: [
          {
            ...whereSearch,
            RefDebtCode: (parent.RefDebtCode),
            // ...whereSearch,
            // ID Productos
            idStore: deCode(ctx.restaurant),
            debtProductState: { [Op.gt]: 0 }
          }
        ]
      }, limit: [min || 0, max || 100], order: [['debtProductState', 'DESC']]
    })
    return data
  } catch {
    return []
  }
}
export const getOneWalletDebt = async (parent, { debtWalletId }, ctx, info) => {
  try {
    const attributes = getAttributes(Walletdebt, info)
    const data = await Walletdebt.findOne({
      attributes,
      where: {
        [Op.or]: [
          {
            debtWalletId: deCode(debtWalletId),
            idStore: deCode(ctx.restaurant),
            debtState: { [Op.gt]: 0 }
          }
        ]
      }
    })
    return data
  } catch {
    return []
  }
}
export default {
  TYPES: {
    WalletDebt: {
      getAllWalletDebtProduct
    }
  },
  QUERIES: {
    WalletDebt,
    getOneWalletDebt
  },
  MUTATIONS: {
    createWalletDebt,
    delWalletDebt,
    createwalletdebtproducts
  }
}
