import { useQuery } from '@apollo/client'
import { useCheckboxState } from 'components/hooks/useCheckbox'
import { RippleButton } from 'components/Ripple'
import { Skeleton } from 'components/Skeleton'
import { GET_ULTIMATE_CATEGORY_PRODUCTS } from 'container/dashboard/queries'
import { GET_MIN_PEDIDO } from 'container/dashboard/queriesStore'
import { useRouter } from 'next/router'
import { useGetClients, useSales } from 'npm-pkg-hook'
import { Text, CardProductSimple } from 'pkg-components'
import { IconSales } from 'public/icons'
import { useContext } from 'react'
import { AwesomeModal } from '~/components/AwesomeModal'
import { Loading } from '../../components/Loading'
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
  const {
    sendNotification,
    setSalesOpen,
    setAlertBox
  } = useContext(Context)
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
    loadingRegisterSale,
    handleChange,
    handleChangeFilter,
    handleChangeFilterProduct,
    handleProduct,
    handleSubmit,
    inputValue,
    loading,
    max,
    modalItem,
    oneProductToComment,
    openCommentModal,
    onChangeInput,
    handleRemoveValue,
    print,
    product,
    productsFood,
    search,
    setDelivery,
    setModalItem,
    setShowMore,
    setPrint,
    showMore,
    handleComment,
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
    handleComment: handleComment,
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
  const existComment = oneProductToComment?.comment?.length > 0
  const handleCloseModal = () => {
    router.push({
      pathname: '/pedidos',
      query: { saleId: code }
    })
    setSalesOpen(false)
  }
  return (
    <Wrapper>
      {loadingRegisterSale || loading && <Loading />}
      {openCommentModal &&
      <AwesomeModal
        btnConfirm={false}
        footer={false}
        header={true}
        onCancel={() => { return handleComment() }}
        onHide={() => { return handleComment() }}
        padding='20px'
        show={openCommentModal}
        size='400px'
        title='Dejar un comentario'
        zIndex='9999'
      >
        <CardProductSimple
          {...oneProductToComment}
          ProDescription={oneProductToComment.ProDescription}
          ProDescuento={oneProductToComment.ProDescuento}
          ProImage={oneProductToComment.ProImage}
          ProPrice={oneProductToComment.ProPrice}
          ProQuantity={oneProductToComment.ProQuantity}
          ValueDelivery={oneProductToComment.ValueDelivery}
          comment={false}
          edit={false}
          pName={oneProductToComment.pName}
          render={null}
        />
        <textarea
          className='input-textarea'
          name='comment'
          onChange={(e) => {return handleChange(e)}}
          placeholder='deja tu comentario'
          required
          value={values?.comment}
        />
        <RippleButton
          onClick={() => {
            return dispatch({
              type: 'PUT_COMMENT',
              payload: oneProductToComment.pId
            })
          }}
        >
          {!existComment ? 'Dejar comentario' : 'Actualizar'}
        </RippleButton>

        {existComment && <RippleButton
          onClick={() => {
            return handleRemoveValue({ name: 'comment', pId: oneProductToComment?.pId })
          }}
        >
          Eliminar
        </RippleButton>}
      </AwesomeModal>
      }
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
                <RippleButton onClick={() => { return handleCloseModal() }}>
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
                      <CardProductSimple
                        {...producto}
                        ProDescription={producto.ProDescription}
                        ProDescuento={producto.ProDescuento}
                        ProImage={producto.ProImage}
                        ProPrice={producto.ProPrice}
                        ProQuantity={producto.ProQuantity}
                        ValueDelivery={producto.ValueDelivery}
                        comment={false}
                        edit={false}
                        key={producto.pId}
                        onClick={() => {
                          return dispatch({
                            type: 'ADD_TO_CART',
                            payload: producto
                          })
                        }}
                        pName={producto.pName}
                        render={<IconSales color='red' size='20px' />}
                        tag={producto?.getOneTags && tag}
                      />
                    )
                  })
                )}
              </ContainerGrid>
              <RippleButton
                className='ripple-button__load'
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
                CARGAR MÁS
              </RippleButton>
            </ScrollbarProduct>

          </div >
        </div>
      </Box>
      <BoxProductSales {...restPropsProductSales} />
      <SubItems {...modalItems} />
    </Wrapper>
  )
}


export default GenerateSales
