import { useMutation, useQuery } from '@apollo/client'
import { useCategoriesProduct } from 'components/hooks/useCategoriesProducts'
import { Context } from 'context/Context'
import { useProductsFood, useTagsProducts } from 'npm-pkg-hook'
import {
  useContext,
  useReducer,
  useRef,
  useState
} from 'react'
import useLocalStorage from '../../../components/hooks/useLocalSorage'
import { useSetState } from '../../../components/hooks/useState'
import { FoodComponent } from '../../../components/Update/Products/food'
import {
  convertBase64,
  getFileSizeByUnit,
  RandomCode,
  validationImg
} from '../../../utils'
import { GET_ALL_PRODUCT_STORE } from '../../dashboard/queriesStore'
import { GET_ONE_STORE } from '../../Restaurant/queries'
import {
  GET_ALL_FOOD_PRODUCTS,
  UPDATE_IMAGE_PRODUCT_FOOD,
  UPDATE_PRODUCT_FOOD
} from './queries'
export const Food = () => {
  const [errors, setErrors] = useState({})
  const [values, setValues] = useState({})
  const { state, changeState } = useSetState(null)
  const [names, setName] = useLocalStorage('namefood', '')
  const { setAlertBox } = useContext(Context)
  const [showMore, setShowMore] = useState(50)
  const [search, setSearch] = useState('')
  /* Filtro  */
  const [searchFilter, setSearchFilter] = useState({ gender: [], desc: [], speciality: [] })
  const [filter, setFilter] = useState({ gender: [], desc: [], speciality: [] })
  //-----------QUERIES ------------

  const [productsFood, { loading, fetchMore }] = useProductsFood({
    search: search?.length >= 4 ? search : '',
    gender: searchFilter?.gender || [],
    desc: searchFilter?.desc || [],
    categories: searchFilter?.speciality,
    max: showMore,
    min: 0
  })
  // ------------ HANDLES ------------
  const handleChange = (e, error) => {
    setValues({ ...values, [e.target.name]: e.target.value })
    setErrors({ ...errors, [e.target.name]: error })
  }
  const [updateProductFoods] = useMutation(UPDATE_PRODUCT_FOOD, {
  })
  const [setImageProducts] = useMutation(UPDATE_IMAGE_PRODUCT_FOOD, {
    context: { clientName: 'admin-server' }
  })
  const [check, setCheck] = useState(false)
  const handleCheckEnvioGratis = e => {
    setCheck(e.target.checked)
    values.ValueDelivery = 0
    values.ProPrice = 0
    values.ProDescuento = 0
  }
  const { data: dataStore } = useQuery(GET_ONE_STORE)
  const fileInputRef = useRef(null)
  const initialState = { alt: '/ images/DEFAULTBANNER.png', src: '/images/DEFAULTBANNER.png' }
  const [{ alt, src }, setPreviewImg] = useState(initialState)
  // eslint-disable-next-line
  const [imageBase64, setImageBase64] = useState(null)
  const [image, setImage] = useState(null)
  const onFileInputChange = async event => {
    const { files } = event.target

    const file = event.target.files[0]
    setImage(file)
    const base64 = await convertBase64(file)
    // eslint-disable-next-line
    const [size, { unit }] = await getFileSizeByUnit(file, "B");
    setImageBase64(base64)
    setPreviewImg(
      files.length
        ? {
          src: URL.createObjectURL(files[0]),
          alt: files[0].name
        }
        : initialState
    )
  }
  const onTargetClick = () => {
    fileInputRef.current.click()
  }
  const {
    handleRegister: handleRegisterTags,
    data,
    handleAddTag,
    tags
  } = useTagsProducts()
  // eslint-disable-next-line
  const handleRegister = async e => {
    e.preventDefault()
    const isImage = validationImg(image)
    if (!values.carProId && !names) return setErrors({ ...errors, carProId: true })
    if (!image) {
      setAlertBox({ message: `Es necesario una imagen para el producto ${names}` })
    } else if (isImage === false) {
      setAlertBox({ message: `El formato de la imagen no es correcto` })
    }
    else {
      const { ProPrice, ProDescuento, ProDescription, ProWeight, ProHeight, ValueDelivery, carProId } = values
      const ProImage = `${process.env.URL_ADMIN_SERVER}static/platos/${image?.name}`
      const pCode = RandomCode(9)
      const formatPrice = ProPrice ? parseFloat(ProPrice.replace(/\./g, '')) : 0
      try {
        updateProductFoods({
          variables: {
            input: {
              idStore: dataStore?.getStore?.idStore || '',
              ProPrice: check ? 0 : formatPrice,
              ProDescuento: check ? 0 : parseInt(ProDescuento),
              ValueDelivery: check ? 0 : parseFloat(ValueDelivery),
              ProDescription: ProDescription,
              pName: names,
              pCode,
              carProId,
              pState: 1,
              sTateLogistic: 1,
              ProStar: 0,
              ProImage: ProImage,
              ProHeight: parseFloat(ProHeight),
              ProWeight: ProWeight,
              ProOutstanding: check ? 1 : 0,
              ProDelivery: check ? 1 : 0
            }
          }, update(cache) {
            cache.modify({
              fields: {
                productFoodsAll(dataOld = []) {
                  return cache.writeQuery({ query: GET_ALL_FOOD_PRODUCTS, data: dataOld })
                }
              }
            })
            setAlertBox({ message: `El producto ${names} subido con éxito`, color: 'success', duration: 7000 })
          }
        }).then((res) => {
          const { updateProductFoods } = res || {}
          const { pId } = updateProductFoods || {}
          const objTag = {
            aName: tags.tag,
            pId
          }
          handleRegisterTags(objTag)
          // setValues({})
        }).catch(err => { return setAlertBox({ message: `${err}`, duration: 7000 }) })
        if (image !== null) {
          setImageProducts({
            variables: {
              input: {
                file: image,
                pCode
              }
            }
          })
        }
      }
      catch (error) {
        setAlertBox({ message: `${error.message}`, duration: 7000 })
      }
    }
  }
  const handleChangeFilter = e => {
    setSearch(e.target.value)
  }
  const onClickSearch = () => {
    setSearchFilter({ ...filter })
  }
  const onClickClear = () => {
    setSearchFilter({})
  }
  const handleChangeClick = e => {
    const { name, value, checked } = e.target
    !checked ? setFilter(s => { return { ...s, [name]: s[name].filter(f => { return f !== value }) } }) : setFilter({ ...filter, [name]: [...filter[name], value] })
    setSearchFilter({ ...filter })
  }

  const onChangeRange = () => {
    // const { value } = e.target
    // setFilterPrice(s => ({ ...s, [name]: s[name].filter(f => f !== value) }))
  }
  // ----------- HANDLE PARA ELIMINAR-----------
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
        setAlertBox({ message: `El producto ${pName} ha sido eliminado`, color: 'error', duration: 7000 })
      }
    }).catch(err => { return setAlertBox({ message: `${err}`, duration: 7000 }) })
  }
  const des = values.ProDescuento
  const pri = values.ProPrice
  const impDesc = values.ProPricepDesc = (des * pri) / 100
  const intPorcentaje = Math.round(impDesc)
  // Filtramos los productos con envio gratis
  const freeDelivery = dataProductFree => {
    return dataProductFree.ProDelivery === 1
  }
  const productFree = productsFood.filter(freeDelivery)
  const initialStateInvoice = {
    PRODUCT_RECOGER: [],
    PRODUCT_EFFECTIVE: []
  }
  const productRecoger = (state, action) => {
    switch (action.type) {
      case 'ADD_PRODUCT':
        return {
          ...state,
          // eslint-disable-next-line no-unsafe-optional-chaining
          PRODUCT_RECOGER: [...state?.PRODUCT_RECOGER, action?.payload]
        }
      case 'ADD_TO_EFFECTIVE':
        return {
          ...state,
          // eslint-disable-next-line no-unsafe-optional-chaining
          PRODUCT_EFFECTIVE: [...state?.PRODUCT_EFFECTIVE, action?.payload]
        }
      case 'REMOVE_EFFECTIVE':
        return {
          PRODUCT_EFFECTIVE: state?.PRODUCT_EFFECTIVE?.filter((t, idx) => { return idx !== action?.idx })
        }
      case 'REMOVE_PRODUCT':
        return {
          PRODUCT_RECOGER: state?.PRODUCT_RECOGER?.filter((t, idx) => { return idx !== action?.idx })
        }
      case 'REMOVE_ALL':
        return {
          PRODUCT_RECOGER: []
        }
      case 'TOGGLE_INVOICE':
        return {
          PRODUCT_RECOGER: state?.PRODUCT_RECOGER.map((t, idx) => { return idx === action.idx ? { ...t, isPaid: !t.isPaid } : t })
        }
      default:
        return state
    }
  }
  const [product_state, dispatch] = useReducer(productRecoger, initialStateInvoice)
  const handleAddProductR = elem => {
    let includes = product_state?.PRODUCT_RECOGER.includes(elem)
    if (includes) {
      setAlertBox({ message: 'El producto ya esta en la lista' })
    } else {
      dispatch({ type: 'ADD_PRODUCT', payload: elem })
    }
  }
  // const YearArray = dataProduct?.productFoodsAll?.length > 0 && dataProduct?.productFoodsAll.map(x => { return parseInt(x.pDatCre?.replace(/\D/gi, '').substring(0, 4)) })
  // let min = YearArray
  // let years = []
  // const currentYear = new Date().getFullYear()
  // useEffect(() => {
  //   const Years = (startYear) => {
  //     for (let i = 0; i < YearArray?.length; i++) {
  //       if (YearArray[i] < min) {
  //         // eslint-disable-next-line react-hooks/exhaustive-deps
  //         min = YearArray[i]
  //       }
  //     }

  //     while (startYear <= currentYear) {
  //       years.push(startYear++)
  //     }
  //     return years
  //   }
  //   Years(min)
  // }, [YearArray, years])
  const [dataCategoriesProducts] = useCategoriesProduct()

  const tagsProps = {
    handleRegisterTags,
    handleAddTag,
    dataTags: data,
    tags
  }
  return (
    <FoodComponent
      alt={alt}
      changeState={changeState}
      check={check}
      data={productsFood}
      dataCategoriesProducts={dataCategoriesProducts || []}
      dataFree={productFree}
      dispatch={dispatch}
      errors={errors}
      fetchMore={fetchMore}
      fileInputRef={fileInputRef}
      handleAddProductR={handleAddProductR}
      handleChange={handleChange}
      handleChangeClick={handleChangeClick}
      handleChangeFilter={handleChangeFilter}
      handleCheckEnvioGratis={handleCheckEnvioGratis}
      handleDelete={handleDelete}
      handleRegister={handleRegister}
      image={image}
      intPorcentaje={intPorcentaje}
      loading={loading}
      names={names}
      onChangeRange={onChangeRange}
      onClickClear={onClickClear}
      onClickSearch={onClickSearch}
      onFileInputChange={onFileInputChange}
      onTargetClick={onTargetClick}
      product_state={product_state || []}
      search={search}
      setName={setName}
      setShowMore={setShowMore}
      showMore={showMore}
      src={src}
      state={state}
      tagsProps={tagsProps}
      values={values}
      valuesForm={values}
    />
  )
}
