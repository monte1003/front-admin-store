import { useQuery } from '@apollo/client'
import { useEffect, useRef, useState } from 'react'
import { useCheckboxState } from 'components/hooks/useCheckbox'
import { RippleButton } from 'components/Ripple'
import { Skeleton } from 'components/Skeleton'
import { GET_ULTIMATE_CATEGORY_PRODUCTS } from 'container/dashboard/queries'
import { GET_MIN_PEDIDO } from 'container/dashboard/queriesStore'
import { useRouter } from 'next/router'
import {
  useGetClients,
  useSales,
  useReactToPrint
} from 'npm-pkg-hook'
import { CardProductSimple, numberFormat } from 'pkg-components'
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
import { SuccessSaleModal } from './Success'
import { generatePdfDocumentInvoice } from './PdfStatement'
import ErrorBoundary from '~/components/Error'

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
    errorSale,
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
  const { checkedItems, disabledItems, handleChangeCheck } = useCheckboxState(datCat?.catProductsAll)
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

  const componentRef = useRef()
  const [isPrinting, setIsPrinting] = useState(false)
  const promiseResolveRef = useRef(null)

  const handlePrint = useReactToPrint({
    documentTitle: '',
    pageStyle: `padding: 20px`,
    content: () => {return componentRef.current},
    onBeforeGetContent: () => {
      return new Promise((resolve) => {
        promiseResolveRef.current = resolve
        setIsPrinting(true)
      })
    },
    onAfterPrint: () => {
    // Reset the Promise resolve so we can print again
      promiseResolveRef.current = null
      setIsPrinting(false)
    }
  })
  const restPropsProductSales = {
    ...modalItems,
    totalProductPrice,
    handleComment: handleComment,
    handleProduct,
    data,
    dispatch,
    dataMinPedido,
    max,
    componentRef,
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
  const [client, setClient] = useState({})
  useEffect(() => {
    (() => {
      if (dataClientes?.length > 0) {
        const client = dataClientes?.find((client) => {
          return client && client?.cliId === values?.cliId
        })
        setClient(client)
      }
    })()
  }, [dataClientes, values.cliId])
  const {
    clientName,
    ccClient,
    ClientAddress,
    clientNumber
  } = client || {}

  const dataToPrint = {
    urlLogo :  '/images/DEFAULTBANNER.png',
    addressStore: ClientAddress,
    storePhone: 4353453,
    date: '',
    client: {
      clientName,
      clientNumber,
      ccClient,
      ...client
    },
    ref: code,
    products: data?.PRODUCT || [],
    total: numberFormat(totalProductPrice),
    change: values.change,
    NitStore: '',
    storeName: ''
  }
  const handleDownLoad = () => {
    if (dataToPrint) {
      return generatePdfDocumentInvoice({data: dataToPrint, titleFile: ''})
    }
    return null
  }
  const restPropsSalesModal = {
    code,
    data,
    delivery,
    print,
    totalProductPrice,
    values,
    handleChange,
    setDelivery,
    componentRef,
    promiseResolveRef,
    handlePrint,
    isPrinting,
    dataClientes,
    setPrint,
    loading,
    handleSubmit,
    handleDownLoad
  }
  const existComment = oneProductToComment?.comment?.length > 0
  const handleCloseModal = () => {
    router.push({
      pathname: '/pedidos',
      query: { saleId: code }
    })
    setSalesOpen(false)
  }
  if (errorSale) return <ErrorBoundary />
  return (
    <Wrapper>
      {loadingRegisterSale || loading || isPrinting && <Loading />}
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
          key={oneProductToComment.pId}
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
      {openCurrentSale
      &&
      <>
        <SuccessSaleModal
          code={code}
          handleCloseModal={handleCloseModal}
          handleDownLoad={handleDownLoad}
          handlePrint={() => { return handlePrint() }}
          loading={isPrinting}
          openCurrentSale={openCurrentSale}
          products={data?.PRODUCT || []}
          setOpenCurrentSale={setOpenCurrentSale}
        />
      </>
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
