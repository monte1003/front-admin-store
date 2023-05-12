/* eslint-disable react/prop-types */
import { useRouter } from 'next/router'
import { useContext, useState } from 'react'
import styled, { css } from 'styled-components'
import {
  Button,
  Tag,
  Text,
  MemoCardProductSimple,
  AwesomeModal
} from 'pkg-components'
import {
  useGetOneProductsFood,
  useSaveAvailableProduct,
  useStore
} from 'npm-pkg-hook'
import { Context } from 'context/Context'
import { OptionalExtraProducts } from 'container/producto/extras'
import { ExtrasProductsItems } from 'container/producto/extras/ExtrasProductsItems'
import { BGColor, PColor, SECColor } from '@/public/colors'
import { Loading } from 'components/Loading'
import { Checkbox } from 'components/Checkbox'
import { onPulses } from 'components/animations'
import { Skeleton } from 'components/Skeleton'
import Portal from 'components/portal'
import { useSetState } from 'hooks/useState'
import FormProduct from './Form'
import { HeaderSteps } from './Steps'
import {
  Card,
  CardProduct,
  Container,
  ContainerAnimation
} from './styled'
import { ActionStep } from './styles'


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
  handleCheck,
  ...props
}) => {
  const {
    setShowComponentModal,
    sendNotification,
    handleClick
  } = useContext(Context)

  const OPEN_MODAL_ORGANICE = useSetState(0)
  const {
    dataTags,
    handleAddTag,
    tags
  } = tagsProps
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
  // eslint-disable-next-line
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
      sendNotification({
        description: 'Llena todos los campos',
        title: 'Error',
        backgroundColor: 'error'
      })
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
      return sendNotification({
        description: 'Lo sentimos, no encontramos tu producto.',
        title: 'Error',
        backgroundColor: 'error'
      })
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
          sendNotification({
            description: 'Se han registrado todos los campos del producto',
            title: 'Success',
            backgroundColor: 'success'
          })
        }
      }) :
      handlerSteps()
  }
  return (<>
    <Container>
      <Portal selector='portal'>
        <AwesomeModal
          backdrop='static'
          btnCancel
          btnConfirm
          footer
          header={false}
          height='20vh'
          onCancel={() => { return false }}
          onConfirm={cancelAll}
          onHide={handleOpenCloseAlert}
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
            <Card state={'30%'}>
              <FormProduct {...propsForm} />
            </Card>
            <Card state='20%'>
              <Text
                fontSize='16px'
                fontWeight='bold'
                margin='10px 0'
              >
                Tags:
              </Text>
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
            <Card state={'20%'} >
              <Text
                fontSize='16px'
                fontWeight='bold'
                margin='10px 0'
              >
                Vista previa
              </Text>
              <MemoCardProductSimple
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
                  id='checkboxAvailability'
                  label='Siempre disponible'
                  name='availability'
                  onChange={(e) => {
                    handleCheck(e)
                    if(check.noAvailability)document.getElementById('checkbox-checkboxNoAvailability').click()
                  }}
                />
                <Checkbox
                  checked={check.noAvailability}
                  id='checkboxNoAvailability'
                  label='Disponible en horarios específicos'
                  name='noAvailability'
                  onChange={(e) => {
                    handleCheck(e)
                    if(check.availability) document.getElementById('checkbox-checkboxAvailability').click()
                  }}
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
    {/* <ListProducts {...propsListProducts} />  */}
    {/* <Dessert />*/}
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
