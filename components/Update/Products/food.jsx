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
import { useStore } from '~/hooks/useStore'
import { AwesomeModal } from 'pkg-components'
import Portal from '~/components/portal'

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
  const [openAlertClose, setOpenAlertClose] = useState(false)
  const [openModalDessert, setOpenModalDessert] = useState(true)
  const [handleGetOneProduct,
    {
      dataExtra,
      dataOptional
    }
  ] = useGetOneProductsFood()
  const { food } = router.query || {}

  const handleOpenCloseAlert = () => {
    setOpenAlertClose(!openAlertClose)
  }
  /**
   * Description
   * @returns {any}
   *
   * */
  const handlerValidateFields = () => {
    if (active === 0) {
      sendNotification({ description: 'Llena todos los campos', title: 'Error' })
      return setErrors({
        ...errors,
        ProPrice: true,
        carProId: values.carProId ? false : true
      })
    }
    return setErrors({ ...errors })
  }

  const handlerCreateDessert = () => {
    if (!pId || !food) {
      setShowComponentModal(false)
      handleClick(false)
      return sendNotification({ description: 'Lo sentimos, no encontramos tu producto.', title: 'Error' })
    }
    setActive((prev) => {return prev + 1 } )
    setOpenModalDessert(true)
    return handleGetOneProduct({ pId: pId ?? food })
  }
  const handlerSteps = () => {
    const { ProPrice, carProId } = values || {}
    const asCompleteFields = ProPrice?.length > 0 && carProId?.length > 0
    if (!asCompleteFields && active === 0) return handlerValidateFields()

    if (asCompleteFields && active === 0) {
      setActive((prev) => {return prev + 1 } )
      return handleRegister()
    }

    if (active === 1) {
      handlerCreateDessert()
    }

    if (active === 2) {
      handlerCreateDessert()
    }
    if (active === 3) {
      setShowComponentModal(false)
      handleClick(false)
    }
    return null
  }
  const {
    handleDaySelection,
    registerAvailableProduct,
    selectedDays,
    loading: loaAvailable,
    days
  } = useSaveAvailableProduct()
  const disabled = active === 3 ? check.noAvailability : false
  const asSave = disabled && selectedDays.length > 0
  const [dataStore] = useStore()
  const { idStore } = dataStore || {}
  const handleContinue = () => {
    const input = selectedDays.map(day => {
      return {
        idStore: idStore,
        pId: pId ?? food,
        dayAvailable: day
      }
    })
    return asSave ?
      registerAvailableProduct({
        variables: {
          'input': input
        }
      }).then((response) => {
        const { success } = response?.data?.registerAvailableProduct || {}
        if (success) {
          setShowComponentModal(false)
          handleClick(false)
          sendNotification({ description: 'Se han registrado todos los campos del producto', title: 'Success' })
        }
      }) :
      handlerSteps()
  }
  return (<>
    <Container>
      <Portal selector='portal'>
        <AwesomeModal
          backdrop='static'
          btnCancel={true}
          btnConfirm={true}
          footer={true}
          header={false}
          height='20vh'
          onCancel={() => { return false }}
          onConfirm={() => { return cancelAll() }}
          onHide={() => { return handleOpenCloseAlert() }}
          padding='20px'
          question={false}
          show={openAlertClose}
          size='small'
          zIndex='99999'
        >
          <Text
            color={PColor}
            fontSize='20px'
            margin='10px 0'
          >
                Es posible que el producto le falten otras cosas
          </Text>
          <Text color={SECColor} fontSize='16px'>
            Puedes agregar mas items a tu producto.
          </Text>
        </AwesomeModal>
      </Portal>
      {loaAvailable && <Loading />}
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
                editing={true}
                modal={openModalDessert}
                pId={pId}
                setModal={() => { return setOpenModalDessert(false) }}
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
                  label='Disponible en horarios específicos'
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
                  <div className='container_days'>
                    {days.map((day) => {return (
                      <CircleDay
                        key={day.day}
                        onClick={() => {return handleDaySelection(day.day)}}
                        pulse={selectedDays.includes(day.day)}
                      >
                        {day.name}
                      </CircleDay>
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
        <Button onClick={active === 1 ? handleOpenCloseAlert : cancelAll}>
          {active === 1 ? 'Cerrar': 'Cancelar'}
        </Button>
        <Button
          disabled={disabled && !selectedDays.length > 0}
          onClick={handleContinue}
          primary
        >
          {asSave ? 'Guardar' : 'Continuar'}
        </Button>
      </ActionStep>
    </Container>

    {/* <Dessert />
    <ListProducts {...propsListProducts} /> */}
  </>
  )
}


const CircleDay = styled.div`
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
