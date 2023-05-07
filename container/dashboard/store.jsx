import { Context } from 'context/Context'
import { useRouter } from 'next/router'
import {
  useMobile,
  useCatWithProduct,
  useGetOneProductsFood,
  useIntersectionObserver,
  useDeleteProductsFood,
  useStore
} from 'npm-pkg-hook'
import {
  useContext,
  useEffect,
  useRef,
  useState
} from 'react'
import { AwesomeModal } from 'pkg-components'
import { Food } from '../update/Products/food'
import { ManageCategories } from './ManageCategories'
import { Product } from './Product'
import { ManageBanner } from './profile/Managebanner'
import { ButtonsAction } from './Options/index'
import { Container, Wrapper } from './styled'
import { StickyBoundaryCategories } from './StickyBoundaryCategories'
import { IconSearch } from '@/public/icons'
import { PColor } from '@/public/colors'


const DashboardStore = () => {
  // STATES
  const [showDessert, setShowDessert] = useState(false)
  const {
    setAlertBox,
    handleClick,
    show
  } = useContext(Context)

  const [searchFilter] = useState({
    gender: [],
    desc: [],
    speciality: []
  })
  const [search] = useState('')
  const [moreCatProduct, setMoreCaProduct] = useState(2)
  const [modal, setModal] = useState(false)
  // HOOKS
  const { isMobile } = useMobile()
  const { handleDelete } = useDeleteProductsFood()
  const [valueProductName, setValueProductName] = useState('')
  const [handleGetOneProduct,
    {
      data: product,
      dataExtra,
      dataOptional
    }
  ] = useGetOneProductsFood()
  const router = useRouter()
  const [store] = useStore()
  const [data, { fetchMore, totalCount }] = useCatWithProduct({
    search,
    productName: valueProductName,
    max: moreCatProduct,
    ...searchFilter
  })

  // HANDLESS
  const handleOpenModalAdditional = () => {
    setModal(!modal)
  }

  const {
    getStore,
    pId,
    pName,
    ProPrice,
    ProDescuento,
    ProDescription,
    ProImage
  } = product || {}
  const { storeName } = getStore || {}
  const { storeName: nameStore } = store || {}
  const {
    food,
    categories,
    product: queryProductParams
  } = router.query || {}

  const handleQuery = (name, value = '') => {
    router.push(
      {
        query: {
          ...router.query,
          [name]: value
        }
      },
      undefined,
      { shallow: true }
    )
  }
  const handleCleanQuery = (name, value = '') => {
    router.push(
      {
        query: {
          ...router.query,
          [name]: value || ''
        }
      },
      undefined,
      { shallow: true }
    )
  }
  const handleProduct = (product) => {
    const { pId } = product || {}
    handleGetOneProduct({ pId })
    handleClick(1)
    handleQuery('food', pId)
  }

  const handleHidden = (queryName) => {
    handleCleanQuery(queryName)
    handleClick(false)
  }

  useEffect(() => {
    if (food) {
      handleGetOneProduct({ pId: food })
    }
    const stateFood = food ? 1 : null
    const productParam = queryProductParams ? 3 : stateFood
    const state = categories ? 2 : productParam
    handleClick(state)

  // eslint-disable-next-line
  }, [])

  const handleActionClick = (number, query, value = true) => {
    handleClick(number)
    
    handleQuery(query, value)
  }

  const select = {
    1: 'food',
    2: 'categories',
    3: 'product'
  }
  const modalProps = {
    backdrop: 'static',
    btnCancel: true,
    btnConfirm: false,
    footer: false,
    header: true,
    height: '100%',
    modal: true,
    padding: 0,
    question: true,
    show: show,
    size: '100%',
    sizeIconClose: '35px',
    zIndex: '9999',
    onCancel: ()=> { return handleHidden(select[show]) },
    onHide: () => { return handleHidden(select[show]) }
  }

  const productProps = {
    dataExtra: dataExtra,
    dataOptional: dataOptional,
    handleDelete: handleDelete,
    modal: modal,
    nameStore: nameStore,
    pId: pId,
    pName: pName,
    ProDescription: ProDescription,
    ProDescuento: ProDescuento,
    ProImage: ProImage,
    ProPrice: ProPrice,
    showDessert: showDessert,
    store: store,
    storeName: storeName,
    onHideDessert: () => { return setShowDessert(!showDessert) },
    setModal: handleOpenModalAdditional,
    setShowDessert: () => { return setShowDessert(!showDessert) }
  }
  const component = {
    1: <Product {...productProps} />,
    2: <ManageCategories />,
    3: <Food />
  }
  const ref = useRef(null)
  const defaultObserverOptions = {
    root: null,
    threshold: 0.1,
    rootMargin: '200px'
  }
  const { onScreen } = useIntersectionObserver({
    el: ref,
    active: true,
    options: defaultObserverOptions,
    disconnect: true,
    onEnter: () => {
      const long = totalCount
      if (onScreen && (onScreen && moreCatProduct < long)) {
        setMoreCaProduct(s => { return s + 1 })
        fetchMore({
          variables: { max: moreCatProduct, min: 0 },
          updateQuery: (prevResult, { fetchMoreResult }) => {
            const validateArray = Array.isArray(fetchMoreResult.getCatProductsWithProduct.catProductsWithProduct)
            const totalCount = fetchMoreResult?.getCatProductsWithProduct?.totalCount
            if (!fetchMoreResult && !validateArray) return prevResult
            return {
              getCatProductsWithProduct: {
                getCatProductsWithProduct: [...fetchMoreResult.getCatProductsWithProduct.catProductsWithProduct],
                totalCount: totalCount ?? 10
              }
            }
          }
        })
      }
    }
  })
  return (<>
    <Wrapper>
      <Container>
        <ManageBanner isMobile={isMobile} />
        <ButtonsAction handle={handleActionClick} /> 
        <div className='wrapper__filter__wrapper' style={{ display: 'flex', padding: '30px' }}>
          <IconSearch color={PColor} size={20} />
          <input
            className='wrapper__filter'
            onChange={(e) => {return setValueProductName(e.target.value)}}
            placeholder='busca tus productos'
          />
        </div>
        <StickyBoundaryCategories
          data={data}
          handleGetOneProduct={handleProduct}
          reference={ref}
          setAlertBox={setAlertBox}
        />
      </Container>
      <AwesomeModal {...modalProps} >
        {component[show]}
      </AwesomeModal>
    </Wrapper>
  </>
  )
}

DashboardStore.propTypes = {

}

export default DashboardStore

