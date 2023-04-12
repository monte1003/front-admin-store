import { useContext } from 'react'
import { useCategoriesProduct } from 'components/hooks/useCategoriesProducts'
import { Context } from 'context/Context'
import {
  useProductsFood,
  useDeleteProductsFood,
  useCreateProduct
} from 'npm-pkg-hook'
import { FoodComponent } from '../../../components/Update/Products/food'
import { useRouter } from 'next/router'


export const Food = () => {
  const { setAlertBox, sendNotification } = useContext(Context)
  const router = useRouter()

  // STATES AND HOOKS
  const {
    alt,
    check,
    dataTags,
    loading: loadingCreatingProduct,
    fileInputRef,
    handleAddTag,
    pId,
    handleChange,
    handleChangeClick,
    handleChangeFilter,
    handleCheckFreeShipping,
    handleRegister,
    handleRegisterTags,
    image,
    intPorcentaje,
    names,
    onClickClear,
    onClickSearch,
    onFileInputChange,
    initialState,
    onTargetClick,
    search,
    searchFilter,
    setName,
    showMore,
    src,
    tags,
    values,
    setPreviewImg,
    setActive,
    idStore,
    active,
    setShowMore,
    setPid,
    errors,
    setErrors
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
    alt: alt,
    check,
    data: productsFood,
    dataCategoriesProducts: dataCategoriesProducts,
    dataFree: productFree,
    setActive,
    setErrors,
    pId,
    idStore,
    setPid,
    errors: errors,
    fetchMore: fetchMore,
    fileInputRef: fileInputRef,
    handleChange: handleChange,
    handleChangeClick: handleChangeClick,
    handleChangeFilter: handleChangeFilter,
    handleCheckFreeShipping: handleCheckFreeShipping,
    handleDelete: handleDelete,
    handleRegister: handleRegister,
    setPreviewImg,
    initialState,
    image: image,
    intPorcentaje: intPorcentaje,
    loading: loading || loadingCreatingProduct,
    names: names,
    onClickClear: onClickClear,
    onClickSearch: onClickSearch,
    onFileInputChange: onFileInputChange,
    onTargetClick: onTargetClick,
    active,
    search: search,
    setName: setName,
    setShowMore: setShowMore,
    showMore: showMore,
    src: src,
    tagsProps: tagsProps,
    values: values,
    // active: active,
    valuesForm: values
  }
  return (
    <FoodComponent {...foodComponentProps} />
  )
}
