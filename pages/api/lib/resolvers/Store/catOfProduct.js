/* eslint-disable no-unused-vars */
import { Op } from 'sequelize'
import productModelFood from '../../models/product/productFood'
import catProducts from '../../models/Store/cat'
import { linkHasMany } from '../../utils'
import { deCode, getAttributes, linkBelongsTo } from '../../utils/util'

export const updatedProducts = async (_, { input }, ctx) => {
  try {
    await catProducts.create({ ...input, pState: 1, id: deCode(ctx.User.id), idStore: deCode(ctx.restaurant) })
    return {
      success: true,
      message: 'Categoría creada'
    }
  } catch (error) {
    return { success: false, message: error }
  }
}
export const catProductsAll = async (root, args, context, info) => {
  const { search, min, max, gender, desc, categories } = args
  let whereSearch = {}
  if (search) {
    whereSearch = {
      [Op.or]: [
        { pName: { [Op.substring]: search.replace(/\s+/g, ' ') } },
        { ProPrice: { [Op.substring]: search.replace(/\s+/g, ' ') } },
        { ProDescuento: { [Op.substring]: search.replace(/\s+/g, ' ') } },
        { ProDelivery: { [Op.substring]: search.replace(/\s+/g, ' ') } }
      ]
    }
  }
  if (gender?.length) {
    whereSearch = {
      ...whereSearch,
      ProDelivery: {
        [Op.in]: gender.map(x => { return x })
      }
    }
  }
  if (desc?.length) {
    whereSearch = {
      ...whereSearch,
      ProDescuento: { [Op.in]: desc.map(x => { return x }) }
    }
  }
  //validad que  venga una categoría para hacer el filtro por categorías
  if (categories?.length) {
    whereSearch = {
      ...whereSearch,
      caId: { [Op.in]: categories.map(x => { return deCode(x) }) }
    }
  }
  const attributes = getAttributes(catProducts, info)
  const data = await catProducts.findAll({
    attributes,
    where: {
      [Op.or]: [
        {
          ...whereSearch,
          // get restaurant
          // idStore: deCode(context.restaurant),
          // get user
          id: deCode(context.User.id),
          // Productos state
          pState: { [Op.gt]: 0 }
        }
      ]
    }, limit: [min || 0, max || 100], order: [['pName', 'DESC']]
  })
  return data
}
// eslint-disable-next-line consistent-return
export const updateCatInProduct = async (_root, { input }) => {
  const { idProduct, idCat } = input || {}
  try {
    await productModelFood.update({ carProId: deCode(idCat) }, { where: { pId: deCode(idProduct) } })
  } catch (e) {
    const error = new Error('Lo sentimos, ha ocurrido un error interno')
    return error
  }
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const updatedCatWithProducts = async (_, input, _ctx) => {
  const { setData, idCat } = input.input || {}
  for (const element of setData) {
    const { idProduct } = element
    await updateCatInProduct(null, { input: { idProduct, idCat } })
  }
  return {
    success: true,
    message: 'Update cat'
  }
}
export const deleteCatOfProducts = async (_, { idPc, pState }) => {
  try {
    await catProducts.update({ pState: pState === 1 ? 0 : 1 }, { where: { carProId: deCode(idPc) } })
    return {
      success: true,
      message: 'Update'
    }
  } catch (error) {
    return {
      success: false,
      message: 'Error'
    }

  }
}
export const deleteCatFinalOfProducts = async (_, { idPc }) => {
  try {
    await catProducts.destroy({ where: { carProId: deCode(idPc) } })
    return {
      success: true,
      message: 'Borrado'
    }
  } catch (error) {
    return {
      success: false,
      message: 'Error'
    }

  }
}
export const getCatProductsWithProduct = async (root, args, context) => {
  const { search, min, max, gender, desc, categories } = args
  linkBelongsTo(catProducts, productModelFood, 'pId', 'carProId')
  let whereSearch = {}
  if (search) {
    whereSearch = {
      [Op.or]: [
        { pName: { [Op.substring]: search.replace(/\s+/g, ' ') } },
        { ProPrice: { [Op.substring]: search.replace(/\s+/g, ' ') } },
        { ProDescuento: { [Op.substring]: search.replace(/\s+/g, ' ') } },
        { ProDelivery: { [Op.substring]: search.replace(/\s+/g, ' ') } }
      ]
    }
  }
  if (gender?.length) {
    whereSearch = {
      ...whereSearch,
      ProDelivery: {
        [Op.in]: gender.map(x => { return x })
      }
    }
  }
  if (desc?.length) {
    whereSearch = {
      ...whereSearch,
      ProDescuento: { [Op.in]: desc.map(x => { return x }) }
    }
  }
  // validad que  venga una categoría para hacer el filtro por categorías
  if (categories?.length) {
    whereSearch = {
      ...whereSearch,
      caId: { [Op.in]: categories.map(x => { return deCode(x) }) }
    }
  }
  const { count, rows } = await catProducts.findAndCountAll({
    include: [
      {
        attributes: ['pId', 'carProId'],
        model: productModelFood
      }
    ],
    where: {
      [Op.or]: [
        {
          ...whereSearch,
          // get restaurant
          idStore: deCode(context.restaurant),
          // get user
          id: deCode(context.User.id),
          // Productos state
          pState: { [Op.gt]: 0 }
        }
      ]
    }, limit: [min || 0, max || 5], order: [['pDatCre', 'ASC']]
  })
  return {
    totalCount: count,
    catProductsWithProduct: rows
  }
}
export const getCatProductsWithProductClient = async (root, args, context, info) => {
  const { min, max, idStore } = args
  linkHasMany(catProducts, productModelFood, 'carProId', 'carProId') // busca por muchos 
  const attributes = getAttributes(catProducts, info)
  const data = await catProducts.findAll({
    attributes,
    include: [
      {
        attributes: ['pId', 'carProId'],
        model: productModelFood,
        required: false,
        where: { pState: 1 }
      }
    ],
    where: {
      [Op.or]: [
        {
          // get restaurant
          idStore: deCode(idStore),
          // Productos state
          pState: { [Op.gt]: 0 }
        }
      ]
    }, limit: [min || 0, max || 2], order: [['pDatCre', 'ASC']]
  })
  return data
}
export default {
  TYPES: {
    catProductsWithProduct: {
      productFoodsAll: async (parent, _args, _context, info) => {
        try {
          const attributes = getAttributes(productModelFood, info)
          const data = await productModelFood.findAll({
            attributes,
            where: {
              [Op.or]: [
                {
                  pState: { [Op.gt]: 0 },
                  carProId: deCode(parent.carProId)
                }
              ]

            }
          })
          return data
        } catch {
          return null
        }
      }
    }
  },
  QUERIES: {
    catProductsAll,
    getCatProductsWithProductClient,
    getCatProductsWithProduct
  },
  MUTATIONS: {
    updatedProducts,
    updatedCatWithProducts,
    deleteCatFinalOfProducts,
    deleteCatOfProducts
  }
}
