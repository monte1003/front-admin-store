import { CardProducts } from 'components/CartProduct'
import { Button, Tag, Text } from 'pkg-components'
import { useContext, useState } from 'react'
import { OptionalExtraProducts } from '~/container/producto/extras'
import { Context } from '~/context/Context'
import { useSetState } from '../../hooks/useState'
import { Skeleton } from '../../Skeleton/SkeletonCard'
import FormProduct from './Form'
import { HeaderSteps } from './Steps'
import {
  Card,
  CardProduct,
  Container,
  ContainerAnimation
} from './styled'
import { ActionStep } from './styles'
import { useGetOneProductsFood, useSaveAvailableProduct } from 'npm-pkg-hook'
import { useRouter } from 'next/router'
import { ExtrasProductsItems } from '~/container/producto/extras/ExtrasProductsItems'
import { Loading } from '~/components/Loading'
import { BGColor, PColor, SECColor } from '@/public/colors'
import { Checkbox } from '~/components/Checkbox'
import styled, { css } from 'styled-components'
import { onPulses } from '~/components/animations'

export const FoodComponent = ({
  alt,
  check,
  data,
  dataCategoriesProducts,
  dataFree,
  fetchMore,
  fileInputRef,
  handleChange,
  handleChangeFilter,
  handleCheckFreeShipping,
  handleRegister,
  handleDelete,
  tags,
  image,
  loading,
  setErrors,
  names,
  onClickClear,
  onFileInputChange,
  onTargetClick,
  search,
  tagsProps,
  setActive,
  setName,
  setShowMore,
  showMore,
  active,
  src,
  errors,
  state: grid,
  pId,
  values,
  ...props
}) => {
  const {
    setShowComponentModal,
    sendNotification,
    handleClick
  } = useContext(Context)

  const OPEN_MODAL_ORGANICE = useSetState(0)
  const { dataTags, handleAddTag } = tagsProps
  const router = useRouter()
  const cancelAll = () => {
    setShowComponentModal(false)
    handleClick(false)
    if (router.query.food) {
      router.push(
        {
          query: {
            ...router.query,
            food: ''
          }
        },
        undefined,
        { shallow: true }
      )
    }
  }
  const propsForm = {
    handleRegister,
    setName,
    names,
    check,
    handleChange,
    values,
    dataCategoriesProducts,
    handleCheckFreeShipping,
    image,
    errors,
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
  const [openModalDessets, setopenModalDessets] = useState(true)
  const [handleGetOneProduct,
    {
      dataExtra,
      dataOptional
    }
  ] = useGetOneProductsFood()
  const { food } = router.query || {}

  const handlerSteps = () => {
    if (!values.ProPrice?.length > 0) {
      sendNotification({ description: 'Llena todos los campos', title: 'Error' })
      return setErrors({
        ...errors,
        ProPrice: true,
        carProId: values.carProId ? false : true
      })
    }

    setActive((prev) => {return prev + 1 } )
    if (active >= 4) {
      return setShowComponentModal(false)
    }
    if (active === 0) {
      handleRegister()
    }
    if (active === 1) {
      handleGetOneProduct({ pId: pId ?? food })
    }
    return null
  }

  const { handleDaySelection, selectedDays, days } = useSaveAvailableProduct()
  
  return (<>
    <Container>
      {loading && <Loading />}
      <HeaderSteps active={active} setActive={setActive} />
      <div className='container_step'>
        <ContainerAnimation active={active === 0}>
          {active === 0 &&
          <>
            <Card state={'50%'}>
              <FormProduct {...propsForm} />
            </Card>
            <Card state={'50%'}>
              <CardProducts
                {...values}
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
            </Card>
          </>
          }
        </ContainerAnimation>
        <ContainerAnimation active={active === 1}>
          {active === 1 &&
          <>
            <OptionalExtraProducts
              dataOptional={dataOptional || []}
              pId={pId}
            />
          </>
          }
        </ContainerAnimation>
        <ContainerAnimation active={active === 2}>
          {active === 2 &&
            <>
              <ExtrasProductsItems
                dataExtra={dataExtra || []}
                // dataOptional={dataOptional || []}
                editing={true}
                modal={openModalDessets}
                pId={pId}
                setModal={() => { return setopenModalDessets(false) }}
              />
            </>
          }
        </ContainerAnimation>
        <ContainerAnimation active={active === 3}>
          {active === 3 &&
            <>
              <div className='container_availability'>
                <Text
                  color={PColor}
                  fontSize='20px'
                  margin='10px 0'
                >
                Disponibilidad
                </Text>
                <Text color={SECColor} fontSize='16px'>
                  Aquí Puedes definir en que momentos los clientes pueden comprar este producto.
                </Text>
                <Checkbox
                  checked={check.availability}
                  disabled={check.noAvailability}
                  id='checkboxAvailability'
                  label='Siempre disponible'
                  name='availability'
                  onChange={(e) =>{ return handleCheckFreeShipping(e, true) }}
                  value={check.availability}
                />
                <Checkbox
                  checked={check.noAvailability}
                  disabled={check.availability}
                  id='checkboxNoAvailability'
                  label='Disponible en horarios espesificos'
                  name='noAvailability'
                  onChange={(e) =>{ return handleCheckFreeShipping(e, true) }}
                  value={check.noAvailability}
                />
                {check.noAvailability &&
                <>
                  <Text
                    color={PColor}
                    fontSize='20px'
                    margin='10px 0'
                  >
                    Dias de la semana
                  </Text>
                  {new Date().getDay()}
                  <div className='container_days'>
                    {days.map((day) => {return (
                      <CircleCompany
                        key={day.day}
                        onClick={() => {return handleDaySelection(day.day)}}
                        pulse={selectedDays.includes(day.day)}
                      >
                        {day.name}
                      </CircleCompany>
                    )})}
                  </div>
                </>
                }
              </div>
            </>
          }
        </ContainerAnimation>
      </div>
      <ActionStep>
        {(active !== 1 && active !== 0) && <Button onClick={() => { return setActive((prev) => { return active === 1 ? 1 : prev - 1 } )}}>
          Volver
        </Button>}
        <Button onClick={cancelAll}>
          Cancelar
        </Button>
        <Button onClick={handlerSteps} primary>
          Continuar
        </Button>
      </ActionStep>
    </Container>

    {/* <Dessert />
    <ListProducts {...propsListProducts} /> */}
  </>
  )
}


const CircleCompany = styled.div`
  border: 2px solid #cccccc;
  border-radius: 50%;
  height: 50px;
  cursor: pointer;
  background-color: ${BGColor};
  width: 50px;
  min-height: 50px;
  text-align: center;
  display: grid;
  place-content: center;
  min-width: 50px;
  ${props => {
    return props.pulse
      ? css`
      animation: ${onPulses} 2s infinite;
      background-color: ${`${PColor}`};
      color: ${BGColor};
  `
      : css`
  `}}
`
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
