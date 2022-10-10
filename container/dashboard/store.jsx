/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { useLazyQuery, useMutation } from '@apollo/client'
import { useStore } from 'components/hooks/useStore'
import { Skeleton } from 'components/Skeleton'
import { Context } from 'context/Context'
import { useOnScreen } from 'hooks/useIntersection'
import moment from 'moment'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useFormTools, useMobile } from 'npm-pkg-hook'
import { Button } from 'pkg-components'
import PropTypes from 'prop-types'
import { IconDelete, IconEdit } from 'public/icons'
import {
  useContext,
  useEffect,
  useState
} from 'react'
import { AwesomeModal } from '../../components/AwesomeModal'
import { useSetState } from '../../components/hooks/useState'
import InputHooks from '../../components/InputHooks/InputHooks'
import { Loading } from '../../components/Loading'
import { APColor, PColor } from '../../public/colors'
import { numberFormat } from '../../utils'
import { GET_ONE_PRODUCTS_FOOD } from '../producto/queries'
import { Food } from '../update/Products/food'
import { GET_EXTRAS_PRODUCT_FOOD_OPTIONAL, UPDATE_PRODUCT_FOOD } from '../update/Products/queries'
import { ManageCategories } from './ManageCategories'
import { Product } from './Product'
import { Managebanner } from './profile/Managebanner'
import { GET_ALL_CATEGORIES_WITH_PRODUCT, GET_ALL_EXTRA_PRODUCT } from './queries'
import { GET_ALL_PRODUCT_STORE } from './queriesStore'
import {
  Sticky,
  StickyBoundary,
  StickyViewport
} from './stickyheader'
import {
  CardProductsContent,
  Container,
  CtnBox,
  TooltipCardProduct,
  Wrapper,
  WrapperCard
} from './styled'
import {
  ContainerCarrusel,
  ContentSearch,
  Title, WrapperOptions
} from './styledStore'

const DashboardStore = () => {
  // STATE
  const {
    openSchedule,
    setOpenSchedule,
    setAlertBox
  } = useContext(Context)
  const [
    handleChange,
    _handleSubmit,
    _setDataValue,
    {
      dataForm,
      errorForm
    }
  ] = useFormTools()
  const [showDessert, setShowDessert] = useState(false)
  const SHOW_MODAL = useSetState(false)
  const [searchFilter, setSearchFilter] = useState({ gender: [], desc: [], speciality: [] })
  const [search, setSearch] = useState('')
  const [OptionCatProduct, setOpenOptionCatProducts] = useState(false)
  const [table, openTable] = useState(false)
  const [dataProCat, setData] = useState([])
  const [showMore, setShowMore] = useState(5)
  const [modal, setModal] = useState(false)
  const [modalStore, setModalStore] = useState(false)
  const [hour, setHour] = useState(null)
  const [day, setDay] = useState()
  const SET_OPEN_PRODUCT = useSetState(false)
  const router = useRouter()
  const {
    name,
    plato,
    categories,
    food,
    dissert
  } = router.query
  useEffect(() => {
    if (dissert) {
      setModal(true)
    }
  }, [])
  
  const handleOpenModalAdditional = () => {
    router.push(
      {
        query: {
          ...router.query,
          dissert: true
        }
      },
      undefined,
      { shallow: true }
    )
    setModal(!modal)
  }
  const containerStyle = {
    height: '100vh'
  }

  // QUERY
  const [getCatProductsWithProduct, { data: dataProductAndCategory, loading: loadCatPro }] = useLazyQuery(GET_ALL_CATEGORIES_WITH_PRODUCT, {
    fetchPolicy: 'network-only',
    variables:
    {
      search,
      gender: searchFilter?.gender,
      desc: searchFilter?.desc,
      categories: searchFilter?.speciality
    }
  })

  // QUERIES
  const [store] = useStore()
  const [productFoodsOne, { data: dataProduct, loading }] = useLazyQuery(GET_ONE_PRODUCTS_FOOD)
  const [ExtProductFoodsOptionalAll, { data: dataOptional }] = useLazyQuery(GET_EXTRAS_PRODUCT_FOOD_OPTIONAL)
  const [ExtProductFoodsAll, { data: dataExtra }] = useLazyQuery(GET_ALL_EXTRA_PRODUCT)
  const [updateProductFoods] = useMutation(UPDATE_PRODUCT_FOOD)


  // HANDLE
  const handleGetOneProduct = (food) => {
    const { pId } = food
    try {
      router.push(
        {
          query: {
            ...router.query,
            plato: pId
          }
        },
        undefined,
        { shallow: true }
      )
      setModalStore(!modalStore)
      SET_OPEN_PRODUCT.setState(!SET_OPEN_PRODUCT.state)
      productFoodsOne({ variables: { pId: pId || plato } })
      ExtProductFoodsOptionalAll({ variables: { pId: pId || plato } })
      ExtProductFoodsAll({ variables: { pId: pId || plato } }).then(() => { return setAlertBox({ message: '' }) }).catch(() => { return setAlertBox({ message: 'Lo sentimo no pudimos traer Los sub platos' }) })
    } catch (error) {
      setAlertBox({ message: 'Lo sentimos, ocurrió un error' })
    }
  }
  const {
    getStore,
    pId,
    pName,
    ProPrice,
    ProDescuento,
    ProDescription,
    ProImage
  } = dataProduct?.productFoodsOne || {}
  const { storeName } = getStore || {}
  const { storeName: nameStore } = store || {}

  const handleStuck = target => {
    target.style.BorderStyle = 'solid'
    target.style.BorderColor = '#e6e6e6'
    target.style.backgroundColor = PColor
    target.style.boxShadow = '0 6px 10px 0 rgba(0, 0, 0, 0.14)'
  }

  const handleUnstuck = (target) => {
    target.style.backgroundColor = ''
    // target.style.boxShadow = 'blue'
  }
  const handleChangeLol = (elem) => {
    const { type, target } = elem
    if (type === 'unstuck') {
      // target.style.backgroundColor = 'red'
      target.style.BorderBottom = '1px solid'
    } else {
      target.style.backgroundColor = 'blue'

    }
  }
  // EFFECTS
  useEffect(() => {
    dataProductAndCategory?.getCatProductsWithProduct && setData([...dataProductAndCategory.getCatProductsWithProduct])
  }, [dataProductAndCategory, searchFilter])
  useEffect(() => {
    getCatProductsWithProduct({ variables: { max: showMore } })
  }, [getCatProductsWithProduct, searchFilter, showMore])
  useEffect(() => {
    let date = new Date().getTime()
    let dateDay = new Date().getUTCDay()
    setDay(dateDay)
    setHour(moment(date).format('hh:mm'))
  }, [])

  const StickySectionElements = dataProCat?.map((x, key) => {
    return (
      <div key={x.carProId}>
        <StickyBoundary
          key={key}
          onChange={handleChangeLol}
          onStuck={handleStuck}
          onUnstuck={handleUnstuck}
        >
          <Sticky
            as='h3'
            id={key}
            name={x.pName}
            onClick={() => { return setOpenOptionCatProducts(x.carProId) }}
          >
            <ContentSearch>
              {OptionCatProduct === x.carProId
                ? <input
                  autoFocus={true}
                  placeholder={x.pName}
                  type='text'
                />
                : <Title size='.9em'>{x.pName} ({x.productFoodsAll?.length || 0})</Title>
              }
            </ContentSearch>


          </Sticky>
          <ContainerCarrusel>
            {x.productFoodsAll?.length > 0 ? x.productFoodsAll?.map(food => {
              return (
                <CardProducts
                  food={food}
                  key={food.pId}
                  onClick={() => { return handleGetOneProduct(food) }}
                  setAlertBox={setAlertBox}
                />
              )
            }) : <Skeleton height={200} numberObject={2} />}
          </ContainerCarrusel>
        </StickyBoundary>
      </div>)
  })
  const handleHidden = () => {
    router.push(
      {
        pathname: `${name.join('/')}`,
        query: {}
      },
      undefined,
      {
        shallow: true
      }
    )
    setModalStore(!modalStore)
  }
  const handleOpenModal = (option) => {
    if (option) {
      router.push(
        {
          query: {
            ...router.query,
            [option]: true
          }
        },
        undefined,
        { shallow: true }
      )
      setModalStore(!modalStore)
    }
  }
  useEffect(() => {
    if (plato) {
      setModalStore(true)
      productFoodsOne({ variables: { pId: plato } })
      try {
        productFoodsOne({ variables: { pId: plato } })
        ExtProductFoodsOptionalAll({ variables: { pId: plato } })
        ExtProductFoodsAll({ variables: { pId: plato } }).then(() => { return setAlertBox({ message: '' }) }).catch(() => { return setAlertBox({ message: 'Lo sentimo no pudimos traer Los sub platos' }) })
      } catch (error) {
        setAlertBox({ message: 'Lo sentimos, ocurrió un error' })
      }
    }
    if (name[3]) {
      SHOW_MODAL.setState(true)
    }
    // eslint-disable-next-line
  }, [plato])

  const handleDelete = product => {
    const { pId, pState, pName } = product || dataProduct.productFoodsOne
    updateProductFoods({
      variables: {
        input: {
          pId,
          pState
        }
      }, update(cache) {
        cache.modify({
          fields: {
            productFoodsAll(dataOld = []) {
              return cache.writeQuery({ query: GET_ALL_PRODUCT_STORE, data: dataOld })
            }
          }
        })
        cache.modify({
          fields: {
            getCatProductsWithProduct(dataOld = []) {
              return cache.writeQuery({ query: GET_ALL_CATEGORIES_WITH_PRODUCT, data: dataOld })
            }
          }
        })
        setAlertBox({ message: `El producto ${pName} ha sido eliminado`, color: 'error', duration: 7000 })
      }
    }).catch(err => { return setAlertBox({ message: `${err}`, duration: 7000 }) })
  }
  const Buttons = () => {
    return (
      <WrapperOptions>
        <Button
          fontFamily= 'PFont-Light'
          fontWeight='300'
          label='Subir productos'
          onClick={() => { return handleOpenModal('food') }}
          size='small'
        />
        <Button
          fontFamily= 'PFont-Light'
          fontWeight='300'
          label='Categorías'
          onClick={() => { return handleOpenModal('categories') }}
          size='small'
        />
        <Button
          fontFamily= 'PFont-Light'
          fontWeight='300'
          label='Organizar agenda'
          onClick={() => { return setOpenSchedule(!openSchedule) }}
          size='small'
        />
      </WrapperOptions>
    )
  }
  const { isMobile } = useMobile()

  return (<>
    <Wrapper>
      {(loadCatPro || loading) && <Loading />}
      <Container>
        <Managebanner isMobile={isMobile} />
        {Buttons()}
        <InputHooks
          errors={errorForm?.search}
          name='search'
          onChange={handleChange}
          required
          title='Buscar en el menu'
          value={dataForm?.search}
        />
        <StickyViewport as='main' style={containerStyle}>
          {StickySectionElements}
        </StickyViewport>
      </Container>
      {modalStore &&
      <AwesomeModal
        borderRadius='4px'
        btnCancel={true}
        btnConfirm={false}
        footer={false}
        header={true}
        height='100%'
        onCancel={() => { return handleHidden() }}
        onHide={() => { handleHidden() }}
        padding={0}
        question={false}
        show={modalStore}
        size='100%'
        sizeIconClose='35px'
        title='Añade las sobre mesas'
        zIndex='9999'
      >
        {
          plato &&
          <Product
            ProDescription={ProDescription}
            ProDescuento={ProDescuento}
            ProImage={ProImage}
            ProPrice={ProPrice}
            dataExtra={dataExtra}
            dataOptional={dataOptional}
            handleDelete={handleDelete}
            modal={modal}
            nameStore={nameStore}
            pId={pId}
            pName={pName}
            setModal={handleOpenModalAdditional}
            setShowDessert={setShowDessert}
            showDessert={showDessert}
            store={store}
            storeName={storeName}
          />
        }
        {categories && <ManageCategories />}
        {food && <Food />}
      </AwesomeModal>}
    </Wrapper>
  </>
  )
}

export const CardProducts = ({ food, onClick, setAlertBox }) => {
  const router = useRouter()
  const [setRef, isVisible] = useOnScreen()
  const [updateProductFoods] = useMutation(UPDATE_PRODUCT_FOOD)
  const handleDelete = product => {
    const { pId, pState, pName } = product || {}
    updateProductFoods({
      variables: {
        input: {
          pId,
          pState
        }
      }, update(cache) {
        cache.modify({
          fields: {
            productFoodsAll(dataOld = []) {
              return cache.writeQuery({ query: GET_ALL_PRODUCT_STORE, data: dataOld })
            }
          }
        })
        cache.modify({
          fields: {
            getCatProductsWithProduct(dataOld = []) {
              return cache.writeQuery({ query: GET_ALL_CATEGORIES_WITH_PRODUCT, data: dataOld })
            }
          }
        })
        setAlertBox({ message: `El producto ${pName} ha sido eliminado`, color: 'error', duration: 7000 })
      }
    }).catch(err => { return setAlertBox({ message: `${err}`, duration: 7000 }) })
  }
  return (
    <div ref={setRef}>
      {<WrapperCard>
        <TooltipCardProduct>
          <button onClick={() => { return router.push(`/update/products/editar/${food.pId}`) }}>
            <IconEdit color={PColor} size={20} />
          </button>
        </TooltipCardProduct>
        <TooltipCardProduct left='50px'>
          <button onClick={() => { return handleDelete(food) }}>
            <IconDelete color={PColor} size={20} />
          </button>
        </TooltipCardProduct>
        <CardProductsContent onClick={onClick} >
          <CtnBox>
            {isVisible === true && <h3 className='card__description'>{food.pName}</h3>}
            {isVisible === true && <h3 className='card__description'>{food.ProDescription}</h3>}
            {isVisible === true && <div className='footer'>
              <span className='card__price'>$ {numberFormat(food.ProPrice)}</span>
              <span className='card__des' style={{ color: APColor }}>$ {numberFormat(food.ProDescuento)}</span>
            </div>}
          </CtnBox>
          <CtnBox>
            {isVisible === true &&
             <Image
               alt={food.ProDescription || 'img'}
               blurDataURL='/images/DEFAULTBANNER.png'
               layout='fill'
               objectFit='cover'
               src={food.ProImage}
             />
            }
          </CtnBox>
        </CardProductsContent>
      </WrapperCard>}
    </div>
  )
}

CardProducts.propTypes = {
  food: PropTypes.shape({
    ProDescription: PropTypes.string,
    ProDescuento: PropTypes.any,
    ProImage: PropTypes.any,
    ProPrice: PropTypes.any,
    pId: PropTypes.any,
    pName: PropTypes.any
  }),
  onClick: PropTypes.any,
  setAlertBox: PropTypes.func
}
DashboardStore.propTypes = {

}

export default DashboardStore

