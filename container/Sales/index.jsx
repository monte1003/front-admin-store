import { useQuery } from '@apollo/client'
import { CardProducts } from 'components/CartProduct'
import { useCheckboxState } from 'components/hooks/useCheckbox'
import { LoadingBabel } from 'components/Loading/LoadingBabel'
import { RippleButton } from 'components/Ripple'
import { Skeleton } from 'components/Skeleton'
import { GET_ULTIMATE_CATEGORY_PRODUCTS } from 'container/dashboard/queries'
import { GET_MIN_PEDIDO } from 'container/dashboard/queriesStore'
import { useRouter } from 'next/router'
import { useGetClients, useSales } from 'npm-pkg-hook'
import { Text } from 'pkg-components'
import { IconSales } from 'public/icons'
import { useContext } from 'react'
import { AwesomeModal } from '~/components/AwesomeModal'
import { Context } from '~/context/Context'
import { BoxProductSales } from './BoxProductSales'
import { FormFilterSales } from './formFilterSales'
import { ModalSales } from './ModalSales'
import { SwiperSliderCategory } from './SlideCategories'
import {
  Box,
  ContainerGrid,
  ScrollbarProduct,
  Wrapper
} from './styled'
import { SubItems } from './SubItems'

const GenerateSales = () => {
  // STATES
  const { sendNotification, setAlertBox } = useContext(Context)
  const router = useRouter()

  const {
    data,
    dataExtra,
    dataOptional,
    dataProduct,
    delivery,
    dispatch,
    fetchMore,
    finalFilter,
    handleChange,
    handleChangeFilter,
    handleChangeFilterProduct,
    handleProduct,
    handleSubmit,
    inputValue,
    loading,
    max,
    modalItem,
    onChangeInput,
    print,
    product,
    productsFood,
    search,
    setDelivery,
    setModalItem,
    setShowMore,
    setPrint,
    showMore,
    totalProductPrice,
    setOpenCurrentSale,
    values,
    valuesDates,
    openCurrentSale,
    code
  } = useSales({
    disabled: false,
    sendNotification,
    router,
    setAlertBox
  })
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
    dataClientes,
    setPrint,
    handleSubmit
  }
    console.log("🚀 ~ file: index.jsx:137 ~ GenerateSales ~ values", values)
  return (
    <Wrapper>
      {openCurrentSale &&
            <AwesomeModal
              btnConfirm={false}
              footer={false}
              header={false}
              onCancel={() => { return setOpenCurrentSale(false) }}
              onHide={() => { return setOpenCurrentSale(false) }}
              padding='20px'
              show={openCurrentSale}
              size='small'
              zIndex='9999'
            >
              <div>
                <Text
                  color='#717171'
                  fontSize='22px'
                  margin='10px 0'
                >
                  Tu pedido se ha generado
                </Text>
                <Text
                  color='#717171'
                  fontSize='20px'
                  fontWeight='300'
                  margin='10px 0'
                >
                  {code}
                </Text>
                <RippleButton>
                    Mirar pedido
                </RippleButton>
              </div>
            </AwesomeModal>
      }
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
                    const tag = {
                      tag: producto?.getOneTags?.nameTag
                    }
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
                        tag={producto?.getOneTags && tag}
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
