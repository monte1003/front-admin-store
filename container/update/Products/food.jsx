import { useRouter } from 'next/router'
import { useContext } from 'react'
import { Context } from 'context/Context'
import {
  useProductsFood,
  useDeleteProductsFood,
  useCreateProduct
} from 'npm-pkg-hook'
import { useCategoriesProduct } from 'components/hooks/useCategoriesProducts'
import { FoodComponent } from 'components/Update/Products/food'

export const Food = () => {
  const { setAlertBox, sendNotification } = useContext(Context)
  const router = useRouter()

  // STATES AND HOOKS
  const {
    dataTags,
    loading: loadingCreatingProduct,
    handleAddTag,
    handleRegisterTags,
    search,
    searchFilter,
    showMore,
    tags,
    values,
    ...propsCreateProduct
  } = useCreateProduct({
    setAlertBox,
    sendNotification,
    router
  })

  const [productsFood, { loading, fetchMore }] = useProductsFood({
    search: search?.length >= 4 ? search : '',
    gender: searchFilter?.gender || [],
    desc: searchFilter?.desc || [],
    categories: searchFilter?.speciality,
    max: showMore,
    min: 0
  })

  const productFree = productsFood?.filter((dataProductFree) => {
    return dataProductFree.ProDelivery === 1
  })
  const [dataCategoriesProducts] = useCategoriesProduct()
  const { handleDelete } = useDeleteProductsFood()

  const tagsProps = {
    handleRegisterTags,
    handleAddTag,
    dataTags: dataTags,
    tags
  }

  const foodComponentProps = {
    ...propsCreateProduct,
    data: productsFood,
    dataCategoriesProducts: dataCategoriesProducts,
    dataFree: productFree,
    fetchMore,
    handleDelete,
    loading: loading || loadingCreatingProduct,
    tagsProps: tagsProps,
    values,
    valuesForm: values
  }

  return (
    <FoodComponent {...foodComponentProps} />
  )
}
