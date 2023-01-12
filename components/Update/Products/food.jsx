import { CardProducts } from 'components/CartProduct'
import { Button, Tag, Text } from 'pkg-components'
import PropTypes from 'prop-types'
import { useState } from 'react'
import {
  IconDelete,
  IconDollar,
  IconEdit,
  IconLove
} from 'public/icons'
import {
  PColor,
  PVColor,
  TFSColor
} from '../../../public/colors'
import { numberFormat } from '../../../utils'
import { AwesomeModal } from '../../AwesomeModal'
import { useSetState } from '../../hooks/useState'
import { Skeleton } from '../../Skeleton/SkeletonCard'
import FormProduct from './Form'
import { ListProducts } from './ListProducts'

import {
  ActionName,
  ButtonCard,
  Card,
  CardProduct,
  Container,
  ContentImg,
  ContentInfo,
  Grid,
  Img,
  Title
} from './styled'
import { Steps, Tabs } from './styles'

export const FoodComponent = ({
  alt,
  check,
  data,
  dataCategoriesProducts,
  dataFree,
  dispatch,
  fetchMore,
  fileInputRef,
  handleChange,
  handleChangeFilter,
  handleCheckEnvioGratis,
  handleRegister,
  handleDelete,
  image,
  loading,
  names,
  onClickClear,
  onFileInputChange,
  onTargetClick,
  product_state,
  search,
  tagsProps,
  setName,
  setShowMore,
  showMore,
  src,
  state: grid,
  values,
  ...props
}) => {
  const OPEN_MODAL_ORGANICE = useSetState(0)
  const [active, setActive] = useState(0)

  const { dataTags, handleAddTag, tags } = tagsProps
  const propsForm = {
    handleRegister,
    setName,
    names,
    check,
    handleChange,
    values,
    dataCategoriesProducts,
    handleCheckEnvioGratis,
    image,
    ...props
  }
  const propsListProducts = {
    onClickClear,
    data,
    OPEN_MODAL_ORGANICE,
    dataFree,
    filter: true,
    organice: true,
    handleChangeFilter,
    grid,
    search,
    showMore,
    fetchMore,
    loading,
    setShowMore,
    pState: 1,
    handleDelete,
    ...props
  }
  return (<>
    <Container>
      <Steps>
        <Tabs active={active === 0}>
          <Text
            as='h2'
            fontFamily='PFont-Light'
            fontSize='16px'
            fontWeight='200'
          >
            Detalles
          </Text>
        </Tabs>
         <Tabs active={active === 1}>
          <Text
            as='h2'
            fontFamily='PFont-Light'
            fontSize='16px'
            fontWeight='200'
          >
          Precio
          </Text>
        </Tabs>
         <Tabs active={active === 2}>
          <Text
            as='h2'
            fontFamily='PFont-Light'
            fontSize='16px'
            fontWeight='200'
          >
        Complementos
          </Text>
        </Tabs>
         <Tabs active={active === 3}>
          <Text
            as='h2'
            fontFamily='PFont-Light'
            fontSize='16px'
            fontWeight='200'
          >
        Clasificacion
          </Text>
        </Tabs>
         <Tabs active={active === 4}>
          <Text
            as='h2'
            fontFamily='PFont-Light'
            fontSize='16px'
            fontWeight='200'
          >
        Disponibilidad
          </Text>
        </Tabs>
      </Steps>
      {/* FORM */}
      {/* <Card>
        <FormProduct {...propsForm} />
      </Card> */}
      {/* PREVIEW CARD PRODUCT */}
      {/* <Card>
        <CardProducts
          ProDescription={values?.ProDescription}
          ProDescuento={values?.ProDescuento}
          ProPrice={values?.ProPrice}
          ValueDelivery={values.ValueDelivery}
          alt={alt}
          fileInputRef={fileInputRef}
          height={'500px'}
          onFileInputChange={onFileInputChange}
          onTargetClick={onTargetClick}
          pName={names}
          src={src}
          tag={tags}
        />
      </Card>
      <Card>
        {dataTags.map((tag) => {
          return(
            <Button
              border='none'
              borderRadius='0'
              key={tag.id}
              onClick={() => { return handleAddTag(tag.id, tag.tag) }}
              padding='0'
              style={{ display: 'flex', flexWrap: 'wrap' }}
            >
              <Tag label={tag.tag} />
            </Button>
          )
        })}
      </Card> */}
    </Container>
    {/* <Dessert /> */}
    {/* <ListProducts {...propsListProducts} /> */}
    {/* {false && <AwesomeModal
      backdrop='static'
      borderRadius='10px'
      btnCancel={true}
      btnConfirm={false}
      footer={false}
      header={true}
      height='100vh'
      onCancel={() => { return false }}
      onHide={() => { OPEN_MODAL_ORGANICE.setState(!OPEN_MODAL_ORGANICE.state) }}
      padding='25px'
      show={OPEN_MODAL_ORGANICE.state}
      size='90%'
      zIndex='9999999'
    >
      <Grid
        gridColGap='30px'
        gridColumns={3}
        gridRows={1}
        gridRowsGap='20px'
        height='100%'
      >
        <div>
          Todos los productos
          <ComponentCardProduct
            ADD_PRODUCT={'ADD_PRODUCT'}
            ADD_TO_EFFECTIVE={'ADD_TO_EFFECTIVE'}
            REMOVE={'REMOVE_PRODUCT'}
            data={data}
            dispatch={dispatch}
          />
        </div>
        <div>
          Productos para recoger
          <ComponentCardProduct
            REMOVE={'REMOVE_PRODUCT'}
            data={product_state?.PRODUCT_RECOGER}
            dispatch={dispatch}
          />
        </div>
        <div>
          Pagos en efectivo
          <ComponentCardProduct
            REMOVE={'REMOVE_EFFECTIVE'}
            data={product_state?.PRODUCT_EFFECTIVE}
            dispatch={dispatch}
          />
        </div>
      </Grid>

    </AwesomeModal >
    } */}
  </>
  )
}

FoodComponent.propTypes = {
  alt: PropTypes.any,
  check: PropTypes.any,
  data: PropTypes.any,
  dataCategoriesProducts: PropTypes.any,
  dataFree: PropTypes.any,
  dispatch: PropTypes.any,
  fetchMore: PropTypes.any,
  fileInputRef: PropTypes.any,
  handleChange: PropTypes.any,
  handleChangeFilter: PropTypes.any,
  handleCheckEnvioGratis: PropTypes.any,
  handleRegister: PropTypes.any,
  loading: PropTypes.any,
  names: PropTypes.any,
  onClickClear: PropTypes.any,
  onFileInputChange: PropTypes.any,
  onTargetClick: PropTypes.any,
  product_state: PropTypes.shape({
    PRODUCT_EFFECTIVE: PropTypes.any,
    PRODUCT_RECOGER: PropTypes.any
  }),
  search: PropTypes.any,
  setName: PropTypes.any,
  setShowMore: PropTypes.any,
  showMore: PropTypes.any,
  src: PropTypes.any,
  state: PropTypes.any,
  values: PropTypes.shape({
    ProDescription: PropTypes.any,
    ProDescuento: PropTypes.any,
    ProPrice: PropTypes.any,
    ValueDelivery: PropTypes.any
  })
}


const ComponentCardProduct = ({ data, dispatch, ADD_TO_EFFECTIVE, REMOVE, ADD_PRODUCT }) => {
  return <div>
    {!data?.length ? 'No data' : data?.map((product, idx) => {
      return (
        <CardProduct grid={true} key={idx + 1} >
          <ButtonCard
            grid={true}
            onClick={() => { return dispatch({ type: REMOVE, idx }) }}
            top={'20px'}
          >
            <IconDelete color={PColor} size={20} />
            <ActionName >
              Eliminar
            </ActionName>
          </ButtonCard>
          <ButtonCard
            delay='.1s'
            grid={true}
            top={'80px'}
          >
            <IconEdit color={PColor} size={20} />
            <ActionName>
              Editar
            </ActionName>
          </ButtonCard>
          <ButtonCard
            delay='.1s'
            grid={true}
            onClick={() => { return dispatch({ type: ADD_PRODUCT, payload: product }) }}
            top={'140px'}
          >
            <IconDollar color={TFSColor} size={30} />
            <ActionName>
              Agregar
            </ActionName>
          </ButtonCard>
          {ADD_TO_EFFECTIVE && <ButtonCard
            delay='.0s'
            grid={true}
            onClick={() => { return dispatch({ type: ADD_TO_EFFECTIVE, payload: product }) }}
            top={'200px'}
          >
            <IconLove color={PVColor} size={20} />
            <ActionName>
              Agregar a pagos en efectivo
            </ActionName>
          </ButtonCard>}
          <ContentImg grid={true}>
            {!product.ProImage ? <i>No img</i> : <Img alt={product.ProImage} src={product.ProImage} />}
          </ContentImg>
          <ContentInfo>
            {product.ProDescuento && <span discount={product.ProDescuento} > {numberFormat(product.ProDescuento)}</span>}
            <Title>{product.pName}</Title>
            <Text>{numberFormat(product.ProPrice)}</Text>
            <ContentInfo>
              {product.ProDelivery === 1 && <span>Gratis</span>}
            </ContentInfo>
          </ContentInfo>
        </CardProduct>
      )
    })}
  </div>
}

ComponentCardProduct.propTypes = {
  ADD_PRODUCT: PropTypes.any,
  ADD_TO_EFFECTIVE: PropTypes.any,
  REMOVE: PropTypes.any,
  data: PropTypes.shape({
    length: PropTypes.any,
    map: PropTypes.func
  }),
  dispatch: PropTypes.func
}

export const SkeletonP = () => {
  return <>
    <>
      {[1, 2, 3, 4].map((x) => {
        return (
          <CardProduct key={x + 1}>
            <Skeleton />
          </CardProduct>
        )
      })}
    </>
  </>
}
