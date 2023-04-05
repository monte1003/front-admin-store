import { useQuery } from '@apollo/client'
import {
  useEffect,
  useRef,
  useState
} from 'react'
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
import {
  CardProductSimple,
  numberFormat,
  ResisesColumns
} from 'pkg-components'
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
import { useFormatDate } from './../../../pkg-hook/src/hooks/useFormatDate/index'
import { useStore } from '~/hooks/useStore'

const GenerateSales = () => {
  // STATES
  const {
    sendNotification,
    setSalesOpen,
    setAlertBox
  } = useContext(Context)
  const router = useRouter()
  const [prod, setProd] = useState(null)

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
    setArrayCategory,
    onChangeInput,
    handleRemoveValue,
    print,
    product,
    setProduct,
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
    handleUpdateAllExtra,
    errorSale,
    openCurrentSale,
    handleCleanFilter,
    handleAddOptional,
    handleIncrementExtra,
    sumExtraProducts,
    handleDecrementExtra,
    loadingExtraProduct,
    disabledModalItems,
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
  const {
    checkedItems,
    disabledItems,
    setCheckedItems,
    handleChangeCheck
  } = useCheckboxState(datCat?.catProductsAll, [], [], setArrayCategory)
  const { data: dataMinPedido } = useQuery(GET_MIN_PEDIDO)
  const restPropsSliderCategory = {
    datCat,
    checkedItems,
    disabledItems,
    handleChangeCheck
  }
  const clean = () => {
    handleCleanFilter()
    setCheckedItems(new Set())
  }
  const restPropsFormFilter = {
    valuesDates,
    search,
    handleChangeFilter,
    handleCleanFilter: clean,
    onChangeInput
  }

  const handleProductSelect = (prod) => {
    setProd(null)
    handleProduct(prod)
  }
  const modalItems = {
    setModalItem,
    loading: loadingExtraProduct,
    disabled: disabledModalItems,
    sumExtraProducts,
    product: prod ?? (product?.PRODUCT),
    modalItem,
    handleDecrement: () => {
      const item = data?.PRODUCT?.find(item => {return item.pId === product?.PRODUCT.pId})
      const OurProduct = productsFood.find(items => {return items?.pId === product?.PRODUCT?.pId})
      setProd({
        ...item,
        ProQuantity: item.ProQuantity - 1,
        ProPrice: (item.ProQuantity - 1) * OurProduct?.ProPrice
      })
      dispatch({ type: 'REMOVE_PRODUCT', payload: prod ?? (product?.PRODUCT) })
      if (item?.ProQuantity == 1) {
        setModalItem(false)
        setProduct({
          PRODUCT: {}
        })
      }
    },
    handleIncrement: () => {
      const item = data?.PRODUCT?.find((item) => { return item.pId === product?.PRODUCT.pId })
      const OurProduct = productsFood.find((items) => {
        return items?.pId === product?.PRODUCT?.pId
      })
      setProd({
        ...item,
        ProQuantity: item.ProQuantity + 1,
        ProPrice: (item.ProQuantity + 1) * OurProduct?.ProPrice
      })
      dispatch({
        type: 'ADD_TO_CART',
        payload: product?.PRODUCT
      })
    },
    handleUpdateAllExtra: () => {
      return handleUpdateAllExtra()
    },
    handleIncrementExtra: ({ Adicionales, index }) => {
      return handleIncrementExtra({ Adicionales, index })
    },
    handleDecrementExtra: ({ Adicionales, index }) => {
      return handleDecrementExtra({ Adicionales, index })
    },
    handleAddOptional: (extraOptionalProduct) => {
      return handleAddOptional(extraOptionalProduct)
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
    handleProduct: handleProductSelect,
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
  const { yearMonthDay, longDayName } = useFormatDate({})
  const [date, setDate] = useState(new Date())
  // useEffect(() => {
  //   const timer = setInterval(() => {return setDate(new Date())}, 1000)
  //   return () => {return clearInterval(timer)}
  // }, [])
  const localDate = date.toLocaleTimeString()
  const customDate = `${yearMonthDay + ' - ' + localDate + ' - ' + longDayName}`
  const [dataStore] = useStore()
  const {
    storeName,
    Image: src,
    storePhone,
    NitStore
  } = dataStore || {}
  const dataToPrint = {
    srcLogo :  src ?? '/images/DEFAULTBANNER.png',
    addressStore: ClientAddress,
    storePhone: storePhone,
    date: customDate,
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
    NitStore,
    storeName
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
    setOpenCurrentSale(false)
    setPrint(false)
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
      <ResisesColumns
        backgroundColor='transparent'
        initialDividerPosition={{ __0: 80, __1: 20 }}
        lastMinWidth={'auto'}
        padding='0'
      >
        <Box>
          <SwiperSliderCategory {...restPropsSliderCategory} />
          <FormFilterSales {...restPropsFormFilter} />
          <ScrollbarProduct style={{ height: 'calc(100vh - 400px)' }}>
            <ContainerGrid>
              {false ? (
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
                if (productsFood?.length > 0) {
                  fetchMore({
                    variables: { max: showMore, min: 0 },
                    updateQuery: (previousResult, { fetchMoreResult }) => {
                      const totalCount = fetchMoreResult.productFoodsAll.length
                      return totalCount
                        ? {
                          // Aquí debes especificar la forma en que se actualizará la lista de productos
                          productFoodsAll: [
                            ...previousResult.productFoodsAll,
                            ...fetchMoreResult.productFoodsAll.filter(
                              (newItem) =>
                              {return !previousResult.productFoodsAll.some(
                                (oldItem) => {return oldItem.pId === newItem.pId}
                              )}
                            )
                          ]
                        }
                        : previousResult
                    },
                    onError: error => {
                      // Maneja el error aquí
                      console.error('Error al cargar más productos:', error)
                    }
                  })
                  setShowMore(s => { return s + 100 })
                }
              }}
              widthButton='100%'
            > {loading ? '...Cargando' : 'CARGAR MÁS'}</RippleButton>
          </ScrollbarProduct>
        </Box>
        <BoxProductSales {...restPropsProductSales} />
      </ResisesColumns>
      <SubItems {...modalItems} />
    </Wrapper>
  )
}


export default GenerateSales
