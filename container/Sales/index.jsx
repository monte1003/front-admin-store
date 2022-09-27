import { useQuery } from '@apollo/client'
import { GET_ULTIMATE_CATEGORY_PRODUCTS } from 'container/dashboard/queries'
import { GET_MIN_PEDIDO } from 'container/dashboard/queriesStore'
import { IconSales } from 'public/icons'
import { RippleButton } from 'components/Ripple'
import { CardProducts } from 'components/CartProduct'
import { useCheckboxState } from 'components/hooks/useCheckbox'
import { Skeleton } from 'components/Skeleton'
import { LoadingBabel } from 'components/Loading/LoadingBabel'
import { ModalSales } from './ModalSales'
import { SwiperSliderCategory } from './SlideCategories'
import {
  Box,
  ContainerGrid,
  ScrollbarProduct,
  Wrapper
} from './styled'
import { FormFilterSales } from './formFilterSales'
import { BoxProductSales } from './BoxProductSales'
import { useSales, useGetClients } from 'npm-pkg-hook'
import { SubItems } from './SubItems'

const GenerateSales = () => {
  // STATES
  const {
    handleChangeFilter,
    handleChangeFilterProduct,
    search,
    finalFilter,
    loading,
    max,
    valuesDates,
    data,
    onChangeInput,
    dispatch,
    productsFood,
    fetchMore,
    handleProduct,
    inputValue,
    print,
    product,
    setShowMore,
    setDelivery,
    handleChange,
    delivery,
    values,
    handleSubmit,
    showMore,
    setModalItem,
    modalItem,
    dataExtra,
    dataOptional,
    dataProduct,
    totalProductPrice,
    setPrint
  } = useSales()
  const [dataClientes, { loading: loadingClients }] = useGetClients()
  // QUERIES
  const { data: datCat } = useQuery(GET_ULTIMATE_CATEGORY_PRODUCTS)
  const { checkedItems, disabledItems, handleChangeCheck } = useCheckboxState( datCat?.catProductsAll)
  const { data: dataMinPedido } = useQuery(GET_MIN_PEDIDO)

  const restPropsSliderCategory = {
    datCat,
    checkedItems,
    disabledItems,
    handleChangeCheck
  }
  const restPropsFormFilter = {
    valuesDates,
    search,
    handleChangeFilter,
    onChangeInput
  }


  const modalItems = {
    setModalItem,
    product: product?.PRODUCT || {},
    modalItem,
    handleDecrement: () => {
      dispatch({ type: 'REMOVE_PRODUCT', payload: product?.PRODUCT })
    },
    handleIncrement: () => {
      return dispatch({ id: product?.PRODUCT.pId, type: 'INCREMENT' })
    },
    dataExtra,
    dataOptional,
    dataProduct
  }
  const restPropsProductSales = {
    ...modalItems,
    totalProductPrice,
    handleProduct,
    data,
    dispatch,
    dataMinPedido,
    max,
    inputValue,
    handleChangeFilterProduct,
    finalFilter,
    print,
    values,
    dataClientes,
    loadingClients,
    setPrint,
    handleChange
  }
  const restPropsSalesModal = {
    code: 1,
    data,
    delivery,
    print,
    totalProductPrice,
    values,
    handleChange,
    setDelivery,
    setPrint,
    handleSubmit
  }

  return (
    <Wrapper>
      <ModalSales {...restPropsSalesModal} />
      <Box>
        <div className='parent'>
          <div className='child'>
            <SwiperSliderCategory {...restPropsSliderCategory} />
            <FormFilterSales {...restPropsFormFilter} />
            <ScrollbarProduct>
              <ContainerGrid>
                {loading || productsFood?.length <= 0 ? (
                  <Skeleton height={400} numberObject={50} />
                ) : (
                  productsFood?.map((producto) => {
                    return (
                      <CardProducts
                        {...producto}
                        ProDescription={producto.ProDescription}
                        ProDescuento={producto.ProDescuento}
                        ProImage={producto.ProImage}
                        ProPrice={producto.ProPrice}
                        ProQuantity={producto.ProQuantity}
                        ValueDelivery={producto.ValueDelivery}
                        edit={false}
                        key={producto.pId}
                        onClick={() => {
                          return dispatch({
                            type: 'ADD_TO_CART',
                            payload: producto
                          })
                        }}
                        pName={producto.pName}
                        render={<IconSales size='20px' />}
                      />
                    )
                  })
                )}
              </ContainerGrid>
            </ScrollbarProduct>

          </div >
        </div>
        <RippleButton
          margin='0px auto'
          onClick={() => {
            setShowMore((s) => {
              return s + 5
            })
            fetchMore({
              variables: { max: showMore, min: 0 },
              updateQuery: (prevResult, { fetchMoreResult }) => {
                if (!fetchMoreResult) return prevResult
                return {
                  productFoodsAll: [...fetchMoreResult.productFoodsAll]
                }
              }
            })
          }}
          widthButton='100%'
        >
          {loading ? <LoadingBabel /> : 'CARGAR MÁS'}
        </RippleButton>
      </Box>
      <BoxProductSales {...restPropsProductSales} />
      <SubItems {...modalItems} />
    </Wrapper>
  )
}


export default GenerateSales
