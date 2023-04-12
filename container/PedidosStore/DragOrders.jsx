/* eslint-disable react-hooks/exhaustive-deps */
import dynamic from 'next/dynamic'
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState
} from 'react'
import Column from 'components/common/Atoms/Column'
import Row from 'components/common/Atoms/Row'
import Text from 'components/common/Atoms/Text'
import { Context } from 'context/Context'
import {
  BGColor,
  PVColor,
  SEGColor
} from 'public/colors'
import { updateCache } from 'utils'
import { useMutation } from '@apollo/client'
import { CHANGE_STATE_STORE_PEDIDO, GET_ALL_PEDIDOS } from './queries'
import {
  useGetSale,
  useStore,
  numberFormat,
  useFormatDate
} from 'npm-pkg-hook'
import { useRouter } from 'next/router'
import { SubItems } from '../Sales/SubItems'

const DragOrders = ({
  dataReadyOrder,
  dataRechazados,
  dataConcludes,
  dataProgressOrder,
  data: dataInitial
}) => {
  // STATES
  const ModalDetailOrder = dynamic(() =>
  {return import('pkg-components').then((mod) => {return mod.ModalDetailOrder})}
  )
  const { setAlertBox } = useContext(Context)
  const data = [
    {
      title: `Pedidos entrantes`,
      items: dataInitial || []
    },
    {
      title: `pedidos en progreso`,
      items: dataProgressOrder || []
    },
    {
      title: `Pedidos listos para entrega`,
      items: dataReadyOrder || []
    },
    {
      title: `Pedidos concluidos`,
      items: dataConcludes || []
    },
    {
      title: `Rechazados`,
      items: dataRechazados || []
    }
  ]
  const [list, setList] = useState(data)
  const [saleKey, setSaleKey] = useState([])
  const [saleGroup, setGroup] = useState()
  // QUERIES
  const {
    getOnePedidoStore,
    data: sale,
    error: saleError,
    loading: saleLoading
  } = useGetSale()
  useEffect(() => {
    const { getAllPedidoStore } = sale || {}
    const result = getAllPedidoStore?.length > 0 && getAllPedidoStore?.reduce(function (r, a) {
      r[a.getAllShoppingCard?.pId] = r[a.getAllShoppingCard?.pId] || []
      r[a.getAllShoppingCard?.pId].push(a)
      return r
    }, Object.create(null))
    window.Array.prototype.groupByToMap = function groupByToMap (keySelector) {
      const map = new Map()
      this.forEach(item => {
        const key = keySelector(item)
        const collection = map.get(key)
        if (!collection) {
          map.set(key, [item])
        } else {
          collection.push(item)
        }
      })
      return map
    }
    // eslint-disable-next-line
    const groupByCategory = getAllPedidoStore?.groupByToMap(product => {
      return product.getAllShoppingCard?.pId
    })
    setGroup(result)
    if (sale && !saleLoading) {
      const groupByQuantity = Object.keys(result)
      setSaleKey(groupByQuantity)
    }
  }, [])
  const [changePPStatePPedido] = useMutation(CHANGE_STATE_STORE_PEDIDO, {
    onCompleted: (res) => {
      setAlertBox({ message: res.changePPStatePPedido.message })
    }
  })
  // EFFECTS
  useEffect(() => {
    setList(data)
  }, [dataReadyOrder, dataRechazados, dataConcludes, dataProgressOrder, dataInitial])
  const [dragging, setDragging] = useState(false)
  const initialCoOrdinate = {
    groupIndex: 0,
    itemIndex: 0
  }
  const dragItem = useRef(initialCoOrdinate)
  const dragNode = useRef()
  // HANDLESS
  const [position, setPosition] = useState(undefined)
  const [elem, setElem] = useState('')

  const handleDragStart = (e, groupIndex, itemIndex, item) => {
    const { pCodeRef } = item || {}
    setElem(pCodeRef)
    // eslint-disable-next-line
    const currentItem = dragItem.current
    const params = {
      groupIndex: groupIndex,
      itemIndex: itemIndex
    }
    dragItem.current = params
    dragNode.current = e.target
    dragNode.current.addEventListener('dragend', handleDragEnd)
    setTimeout(() => {
      setDragging(true)
    }, 0)
  }
  const handleDragEnd = () => {
    let _a
    setDragging(false);
    (_a = dragNode.current) === null || _a === void 0 ? void 0 : _a.removeEventListener('dragend', handleDragEnd)
    dragItem.current = initialCoOrdinate
    dragNode.current = undefined
    pushPosition()
  }
  const handleDragEnter = useCallback(
    (e, groupIndex, itemIndex, item) => {
      try {
        const { pSState } = item || {}
        const params = {
          groupIndex: groupIndex,
          itemIndex: itemIndex
        }
        const currentItem = dragItem.current
        if (e.target !== dragNode.current) {
          setPosition(groupIndex + 1)
          setList((oldList) => {
            let newList = JSON.parse(JSON.stringify(oldList))
            newList[params.groupIndex].items.splice(params.itemIndex, 0, newList[currentItem.groupIndex].items.splice(currentItem.itemIndex, 1)[0])
            dragItem.current = params
            return newList
          })
          if ((pSState !== currentItem.groupIndex + 1) && (position && elem)) {
            return
          }
        }
      } catch (error) {
        return
      }
    },
    [position, data, dragItem.current]
  )

  // const handleDragEnter = (e, groupIndex, itemIndex, item) => {
  // }
  const getStyles = (groupIndex, itemIndex) => {
    const currentItem = dragItem.current
    if (currentItem.groupIndex === groupIndex &&
            currentItem.itemIndex === itemIndex) {
      return 'current box-items'
    }
    return 'box-items'
  }
  useEffect(() => {
    setPosition(position)
    setElem(elem)
  }, [position, elem])

  function pushPosition() {
    changePPStatePPedido({
      variables: {
        pPStateP: position,
        pCodeRef: elem,
        pDatMod: new Date()
      }, update: (cache, { data: { getAllPedidoStoreFinal } }) => {return updateCache({
        cache,
        query: GET_ALL_PEDIDOS,
        nameFun: 'getAllPedidoStoreFinal',
        dataNew: getAllPedidoStoreFinal
      })}
    })
  }
  const router = useRouter()
  const { query } = router
  const { saleId } = query || {}
  const [openModalDetails, setOpenModalDetails] = useState(false)
  const [openAction, setOpenAction] = useState(false)
  const [dataModal, setDataModal] = useState({})
  const handleGetOneOrder = (item) => {
    const { pCodeRef } = item || {}
    getOnePedidoStore({
      variables: {
        pCodeRef: pCodeRef ?? null
      }
    })
    setDataModal(sale)
    router.push(
      {
        query: {
          ...router.query,
          saleId: pCodeRef
        }
      },
      undefined,
      { shallow: true }
    )
    if (!saleLoading) {
      setOpenModalDetails(!openModalDetails)
    }
  }
  const [dataStore, { loading }] = useStore()

  const handleOpenActions = () => {
    setOpenAction(!openAction)
  }

  const onClose = () => {
    router.push(
      {
        query: {
          ...router.query,
          saleId: ''
        }
      },
      undefined,
      { shallow: true }
    )
  }
  const handleCloseModal = () => {
    setOpenModalDetails(false)
    onClose()
  }
  const HandleChangeState = (stateNumber, pCodeRef) => {
    changePPStatePPedido({
      variables: {
        pPStateP: stateNumber,
        pCodeRef: pCodeRef
      }, update: (cache, { data: { getAllPedidoStoreFinal } }) => {return updateCache({
        cache,
        query: GET_ALL_PEDIDOS,
        nameFun: 'getAllPedidoStoreFinal',
        dataNew: getAllPedidoStoreFinal
      })}

    })
  }
  const [modalItem, setModalItem] = useState(false)
  const [dataOption, setDataOption] = useState({
    dataExtra: [],
    dataOptional: []
  })
  /**
 * Description
 * @param {any} _pid
 * @param {any} ShoppingCardId
 * @returns {any}
 * */
  const handleModalItem = (pid) => {
    const listShoppingCard = sale.getAllPedidoStore.find((Shopping) => {
      return Shopping.getAllShoppingCard.productFood.pId === pid
    })
    const productModel = listShoppingCard?.getAllShoppingCard?.productFood
    const newSalesOptional = productModel?.salesExtProductFoodOptional.map((sp) => {
      return {
        ...sp,
        ExtProductFoodsSubOptionalAll: sp?.saleExtProductFoodsSubOptionalAll?.map((subP) => {
          return {
            check: true,
            subP
          }
        })
      }
    })
    const objetSubOption = {
      dataExtra: productModel.ExtProductFoodsAll || [],
      dataOptional: newSalesOptional || []
    }
    if (productModel.ExtProductFoodsAll.length > 0 && newSalesOptional.length > 0) {
      setDataOption(objetSubOption)
    } else {
      setDataOption({
        dataExtra: [],
        dataOptional: []
      })
    }
  }
  const propsModal = {
    dataModal,
    dataStore,
    loading: loading || saleLoading,
    openAction,
    pDatCre: useFormatDate({ date: dataModal?.pDatCre }),
    saleError,
    saleGroup,
    saleKey,
    totalProductsPrice: numberFormat(Math.abs(dataModal?.totalProductsPrice)),
    HandleChangeState,
    handleModalItem,
    handleOpenActions,
    setModalItem,
    onClose: () => { return handleCloseModal() },
    onPress: handleGetOneOrder
  }

  useEffect(() => {
    if (!saleId) return
    if (saleId) {
      if (!saleLoading) {
        setOpenModalDetails(true)
      }
      getOnePedidoStore({
        variables: {
          pCodeRef: saleId ?? null
        }
      })
      if (!saleLoading) {
        setDataModal(sale)
      }
    }
  }, [sale, saleId])

  const modalItems = {
    setModalItem,
    handleModalItem,
    loading: false,
    disabled: false,
    sumExtraProducts: 0,
    product: {},
    modalItem,
    handleDecrement: () => {
      return
    },
    handleIncrement: () => {
      return
    },
    handleUpdateAllExtra: () => {
      return
    },
    handleIncrementExtra: () => {
      return
    },
    handleDecrementExtra: () => {
      return
    },
    handleAddOptional: () => {
      return
    },
    ...dataOption
    // dataProduct
  }
  return (
    <>
      {(openModalDetails && !saleLoading) &&
        <ModalDetailOrder {...propsModal} />
      }
      <SubItems {...modalItems} />

      <Column
        alignItems='stretch'
        backgroundColor={BGColor}
        height='100%'
        justifyContent='flex-start'
        padding='0 0 40px 34px'
        userSelect='none'
        with='fit-content'
      >
        <Row backgroundColor={BGColor} >
          {list?.length > 0 && list.map((grp, grpIdx) => {
            return (
              <Column
                background='#f4f5f7'
                borderRadius='10px'
                key={grp.title}
                margin='0 15px 0 0 '
                maxWidth='260px'
                onDragEnter={
                  dragging && !grp.items.length
                    ? (e) => {
                      handleDragEnter(e, grpIdx, 0)
                    }
                    : undefined
                }
                transition='1s ease'
                width='260px'
              >
                <Column
                  height={'45px'}
                  maxHeight='calc(100%  - 45px)'
                  overflow={'hidden'}
                  textOverflow='ellipsis'
                >
                  <Text
                    as='h2'
                    className='group-title'
                    color='#5e6c84'
                    fontSize='10px'
                    margin='15px 0 0 10px'
                    textAlign={'start'}
                    textOverflow='ellipsis'
                    textTransform='uppercase'
                  >
                    {grp.title}
                  </Text>
                </Column>
                {
                  dragging && <Column
                    backgroundColor={`${PVColor}10`}
                    border={`1px solid ${PVColor}`}
                    borderRadius='5px'
                    display='grid'
                    height='40px'
                    margin='auto'
                    placeContent='center'
                    width='95%'
                  >
                    <Text
                      color={SEGColor}
                      family='PFont-Regular'
                      fontSize='10px'
                    >
                      {grp.title}
                    </Text>
                  </Column>

                }
                {grp.items.length > 0 && grp.items.map((item, itemIdx) => {
                  return (
                    <Column
                      borderRadius='5px '
                      className={dragging ? getStyles(grpIdx, itemIdx) : 'box-items'}
                      display='grid'
                      draggable={false}
                      key={item?.pCodeRef}
                      margin='auto'
                      onClick={() => { return handleGetOneOrder(item) }}
                      onDragEnter={dragging ? (e) => { return handleDragEnter(e, grpIdx, itemIdx, item) } : undefined}
                      onDragStart={(e) => { return handleDragStart(e, grpIdx, itemIdx, item) }}
                      padding='10px'
                      position='relative'
                      width='96%'
                    >
                      <Column >
                        {item?.pCodeRef}
                      </Column>
                      <Column>
                        <Text
                          color={SEGColor}
                          family='PFont-Regular'
                          fontSize='10px'
                        >{grp.title}</Text>
                      </Column>
                      <Column>
                        <Text fontSize='10px' >{item?.pCodeRef}</Text>
                      </Column>
                    </Column>
                  )
                })}
              </Column>
            )
          })}
        </Row>
      </Column>
    </>
  )
}

export default DragOrders
