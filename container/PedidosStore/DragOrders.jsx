/* eslint-disable react-hooks/exhaustive-deps */
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
  PColor,
  SEGColor
} from 'public/colors'
import { updateCacheMod, updateMultipleCache } from 'utils'
import { useApolloClient, useMutation } from '@apollo/client'
import { CHANGE_STATE_STORE_PEDIDO, GET_ALL_PEDIDOS } from './queries'
import {
  useGetSale,
  useStore,
  numberFormat,
  useFormatDate
} from 'npm-pkg-hook'
import { useRouter } from 'next/router'
import { SubItems } from '../Sales/SubItems'
import { useDrag2 } from '~/hooks/useDrag'
import { Button, ModalDetailOrder, Tag } from 'pkg-components'
import { Loading } from '~/components/Loading'
import { Bubble, ContainerDrag } from './styled'
import { GET_ALL_COUNT_SALES } from 'npm-pkg-hook'
import { QuickFiltersButton } from './QuickFiltersButton'
import { IconSearch } from '@/public/icons'

const DragOrders = ({
  dataReadyOrder,
  dataRechazados,
  dataConcludes,
  dataProgressOrder,
  data: dataInitial
}) => {
  // STATES

  const { sendNotification } = useContext(Context)
  const orders = {
    incoming: dataInitial || [],
    inProgress: dataProgressOrder || [],
    ready: dataReadyOrder || [],
    concluded: dataConcludes || [],
    rejected: dataRechazados || []
  }

  const data = Object.entries(orders).map(([key, value]) => {return {
    title: `${key.charAt(0).toUpperCase()}${key.slice(1)} pedidos`,
    items: value
  }})

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
  const [changePPStatePPedido, { loading: LoadingStatusOrder }] = useMutation(CHANGE_STATE_STORE_PEDIDO, {
    onCompleted: (res) => {
      return sendNotification({
        title: 'Exitoso',
        description: res.changePPStatePPedido.message,
        backgroundColor: 'sucess'
      })
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
    const params = {
      groupIndex: groupIndex,
      itemIndex: itemIndex
    }
    dragItem.current = params
    dragNode.current = e.target
    pushPosition()
    setDraggingItem(item)
    e.dataTransfer.effectAllowed = 'move'
    e.dataTransfer.setData('text/html', e.target.parentNode)
    e.target.parentNode.classList.add('dragging')
    dragNode.current.addEventListener('dragend', handleDragEnd)
    setTimeout(() => {
      setDragging(true)
    }, 0)
  }
  const handleDragEnd = () => {
    let _a
    setDragging(false);
    (_a = dragNode.current) === null || _a === void 0 ? void 0 : _a.removeEventListener('dragend', handleDragEnd)
    _a.classList.remove('dragging')
    dragItem.current = initialCoOrdinate
    dragNode.current = undefined
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
          e.target.classList.add('dragover')
          // setPosition(groupIndex + 1)
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

  const getStyles = (groupIndex, itemIndex) => {
    const currentItem = dragItem.current
    if (currentItem.groupIndex === groupIndex &&
            currentItem.itemIndex === itemIndex) {
      return 'current box-items'
    }
    return 'box-items'
  }


  const router = useRouter()
  const { query } = router
  const { saleId } = query || {}
  const [openModalDetails, setOpenModalDetails] = useState(false)
  const [openAction, setOpenAction] = useState(false)
  const [dataStore] = useStore()
  const handleGetOneOrder = (item) => {
    const { pCodeRef } = item || {}
    getOnePedidoStore({
      variables: {
        pCodeRef: pCodeRef || ''
      }
    })
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
  const client = useApolloClient()

  const HandleChangeState = (stateNumber, pCodeRef) => {
    changePPStatePPedido({
      variables: {
        pPStateP: stateNumber,
        pCodeRef: pCodeRef
      },
      update: async (cache, { data: { getAllPedidoStoreFinal } }) => {
        const updatedData = {
          nameFun1: getAllPedidoStoreFinal
        }
        if (pCodeRef !== 4) {
          client.query({
            query: GET_ALL_COUNT_SALES,
            fetchPolicy: 'network-only',
            onCompleted: (data) => {
              client.writeQuery({ query: GET_ALL_COUNT_SALES, data: { getTodaySales: data.countSales.todaySales } })
            }
          })
        }
        return updateMultipleCache({
          cache,
          queries: [
            { query: GET_ALL_PEDIDOS, dataNew: updatedData.nameFun1, nameFun: 'getAllPedidoStoreFinal' }
          ]
        })
      }
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
    const productModel = listShoppingCard?.getAllShoppingCard || {}
    const newSalesOptional = Array.isArray(productModel?.salesExtProductFoodOptional) ? productModel?.salesExtProductFoodOptional.map((sp) => {
      return {
        ...sp,
        ExtProductFoodsSubOptionalAll: sp?.saleExtProductFoodsSubOptionalAll?.map((subP) => {
          return {
            check: true,
            ...subP
          }
        })
      }
    }) : []
    const objetSubOption = {
      dataExtra: Array.isArray(productModel?.ExtProductFoodsAll) ? productModel?.ExtProductFoodsAll : [],
      dataOptional: newSalesOptional || []
    }
    if (Array.isArray(productModel?.ExtProductFoodsAll) && productModel?.ExtProductFoodsAll?.length > 0 && newSalesOptional.length > 0) {
      setDataOption(objetSubOption)
    } else {
      setDataOption({
        dataExtra: [],
        dataOptional: []
      })
    }
  }

  useEffect(() => {
    if (!saleId) return
    setOpenModalDetails(true)
    getOnePedidoStore({
      variables: {
        pCodeRef: saleId || ''
      }
    })
    sale && setSelectedItem(sale)
  }, [sale])
  
  const modalItems = {
    setModalItem,
    handleModalItem,
    loading: false,
    disabled: true,
    sumExtraProducts: 0,
    product: {},
    modalItem,
    ...dataOption
    // dataProduct
  }
  function pushPosition() {
    changePPStatePPedido({
      variables: {
        pPStateP: position,
        pCodeRef: elem,
        pDatMod: new Date()
      }
      ,update: (cache, { data: { getAllPedidoStoreFinal } }) => {return updateCacheMod({
        cache,
        type: 2,
        query: GET_ALL_PEDIDOS,
        nameFun: 'getAllPedidoStoreFinal',
        dataNew: getAllPedidoStoreFinal
      })}
    })
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    e.stopPropagation()
    e.target.classList.remove('dragover')
  }
  const [draggingItem, setDraggingItem] = useState(null)
  const ref = useRef(null)
  useDrag2(ref)

  const [pos, setPos] = useState({x: 0, y:  0})
  const [startPos, setStartPos] = useState({x: 0, y: 0})
  const [selectedItem, setSelectedItem] = useState(null)

  
  const handleGetPosition = useCallback((e, grpIdx) => {
    setPosition(grpIdx)
  }, [position])

  const handleMouseDown = (e, grpIdx, itemIdx, item) => {
    setDragging(true)
    if (item?.pCodeRef) {
      setElem(item?.pCodeRef)
      setSelectedItem(item)
    }
    setStartPos({ x: e.clientX, y: e.clientY })
  }

  const handleMouseMove = (e) => {
    const dx = e.clientX - startPos.x
    const dy = e.clientY - startPos.y
    setPos({x: pos.x + dx, y: pos.y + dy})
    setStartPos({x: e.clientX, y: e.clientY})
  }

  const handleMouseUp = () => {
    setDragging(false)
  }
  const color = {
    0:'#63ba3c',
    1:'#ffd91f',
    2:'#ffd91f',
    3:'#ff9a1f',
    4: '#63ba3c',
    5: PColor
  }

  const pDatCre= useFormatDate({ date: sale?.pDatCre })
  const [filterValue, setFilterValue] = useState('')

  const handleInputChange = (event) => {
    const inputValue = event.target.value
    setFilterValue(inputValue)

    const filteredList = data.map(category => {
      const filteredItems = category.items.filter(item => {return item.pCodeRef.includes(filterValue)})
      return {
        ...category,
        items: filteredItems
      }
    })

    // Si no hay coincidencias, actualizar con la lista original
    const noMatches = filteredList.every(category => {return category.items.length === 0})
    if (noMatches) {
      setList(data)
    } else {
      setList(filteredList)
    }
  }

  return (
    <ContainerDrag>
      <div ref={ref}>
                    Hola
      </div>
      {(saleLoading || LoadingStatusOrder) && <Loading />}
      {(openModalDetails && sale) &&
        <ModalDetailOrder
          HandleChangeState={HandleChangeState}
          dataModal={sale}
          dataStore={dataStore}
          handleModalItem={handleModalItem}
          handleOpenActions={handleOpenActions}
          loading={false}
          onClose={handleCloseModal}
          onPress={handleGetOneOrder}
          openAction={openAction}
          pDatCre={pDatCre}
          saleError={saleError}
          saleGroup={saleGroup}
          saleKey={saleKey}
          setModalItem={setModalItem}
          totalProductsPrice={numberFormat(Math.abs(sale?.totalProductsPrice)) || 0}
        />
      }
      <SubItems {...modalItems} />
      <div className='quick-filters' style={{ display: 'flex' }}>
        <div className='search-container'>
          <input
            className='search-input'
            onChange={handleInputChange}
            placeholder='Buscar ordenes'
            type='text'
            value={filterValue}
          />
          <IconSearch
            className='search-icon'
            color={PColor}
            size={20}
          />
        </div>
        <QuickFiltersButton
          onClick={() => {
            // handleFilter()
          }}
        />
        <Button
          borderRadius='0'
          onClick={() => {
            setFilterValue('')
            setList(data)
          }}
        >
          Borrar filtro
        </Button>
      </div>

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
                borderRadius='4px 4px 0 0'
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
                // onMouseMove={(e) => { return handleGetPosition(e, grpIdx + 1)}}
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
                    {grp.title} {(grp?.items?.length)}
                  </Text>
                </Column>
                {grp.items.length > 0 && grp.items.map((item, itemIdx) => {
                  const isSelected = selectedItem && selectedItem?.pCodeRef === item?.pCodeRef
                  const style = {
                    // position: 'absolute',
                    // top: pos.y,
                    // left: pos.x,
                    // width: '250px',
                    cursor: dragging ? 'grabbing' : 'grab',
                    backgroundColor: isSelected ? '#ff000026' : BGColor,
                    zIndex: isSelected ? 1 : 0
                  }
                  return (
                    <div
                      borderRadius='5px '
                      className={`box-items ${draggingItem?.pCodeRef === item?.pCodeRef ? 'dragging' : ''}`}
                      draggable={false}
                      key={item?.pCodeRef}
                      margin='auto'
                      onClick={() => { return handleGetOneOrder(item) }}
                      onContextMenu={(event) => {
                        event.preventDefault()
                        return handleGetOneOrder(item)
                      }}
                      onDragEnter={dragging ? (e) => { return handleDragEnter(e, grpIdx, itemIdx, item) } : undefined}
                      onDragLeave={(e) => {return handleDragLeave(e)}}
                      // onDragStart={(e) => { return handleDragStart(e, grpIdx, itemIdx, item) }}
                      onMouseDown={(e) => {return handleMouseDown(e, grpIdx, itemIdx, item)}}
                      onMouseUp={handleMouseUp}
                      padding='10px'
                      position='relative'
                      style={isSelected ? style : {}}
                      width='96%'
                    >
                      <Column >
                        {item?.pCodeRef}
                      </Column>
                      <Column>
                        <Text
                          className='ghx-summary'
                          color={SEGColor}
                          family='PFont-Regular'
                          fontSize='10px'
                        >
                          {grp.title}
                        </Text>
                      </Column>
                      <Column>
                        <Text fontSize='10px' >{item?.pCodeRef}</Text>
                      </Column>
                      <Bubble color={color[item.pSState]}>
                        <span className='bubble-outer-dot'>
                          <span className='bubble-inner-dot'></span>
                        </span>
                      </Bubble>
                      <Tag label={item.channel === 0 ? 'Delivery app' : 'Restaurante'} />
                    </div>
                  )
                })}
              </Column>
            )
          })}
        </Row>
      </Column>
    </ContainerDrag>
  )
}

export default DragOrders
