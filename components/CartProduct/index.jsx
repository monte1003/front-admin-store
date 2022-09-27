import PropTypes from 'prop-types'
import { RippleButton } from 'components/Ripple'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { BGColor, PColor } from 'public/colors'
import { IconDelete, IconEdit, IconPlus } from 'public/icons'
import {
  ActionName,
  Button,
  ButtonCard,
  Card,
  ContainerActions,
  InputCounter,
  ItemProQuantity,
  OverlineFree,
  WrapperButton,
  WrapperCard
} from './styled'
import { useState } from 'react'
import { numberFormat } from '../../utils'

export const CardProducts = ({
  del,
  edit,
  fileInputRef,
  free,
  handleDecrement,
  handleFree,
  handleIncrement,
  height,
  index,
  onFileInputChange,
  pId,
  pName,
  ProDescription,
  ProDescuento = 0,
  ProImage,
  ProPrice,
  ProQuantity,
  render = null,
  src,
  sum,
  ValueDelivery,
  widthButton,
  dispatch = () => { return },
  handleDelete = () => { return },
  handleFreeProducts = () => { return },
  onClick = () => { return },
  onTargetClick = () => { return }
}) => {
  const router = useRouter()
  const [startAnimateUp, setStartAnimateUp] = useState('')
  const [animateType, setAnimateType] = useState('')
  const [show, setShow] = useState(false)

  const handle = () => {
    setTimeout(() => {
      setAnimateType('move-up')
      setStartAnimateUp('')
    }, 250)
  }
  const handleDown = () => {
    handleDecrement()
    setStartAnimateUp('')
    setAnimateType('')
    setTimeout(() => {
      setStartAnimateUp('start-animate-down')
      setTimeout(() => {
        setAnimateType('move-down')
        setStartAnimateUp('')
      }, 250)
    }, 0)
  }

  const handleUp = () => {
    handleIncrement()
    setStartAnimateUp('')
    setAnimateType('')
    setTimeout(() => {
      setStartAnimateUp('start-animate-up')
      handle()
    }, 0)
  }
  return (
    <>
      <input
        accept='.jpg, .png .jpeg'
        id='iFile'
        onChange={onFileInputChange}
        ref={fileInputRef}
        style={{ display: 'none' }}
        type='file'
      />
      <WrapperCard>

        {handleFree &&
        <OverlineFree free={free} onClick={() => { return handleFreeProducts() }}>
          <span>
            Gratis
          </span>
        </OverlineFree>
        }
        <Card free={free} height={height} >
          {del &&
          <ButtonCard grid={false} onClick={handleDelete}>
            <IconDelete color={PColor} size={20} />
            <ActionName>
              Eliminar
            </ActionName>
          </ButtonCard>
          }
          {edit &&
          <ButtonCard
            delay='.1s'
            grid={false}
            onClick={() => { return router.push(`/update/products/editar/${pId}`) }}
            top={'80px'}
          >
            <IconEdit color={PColor} size={20} />
            <ActionName>
              Editar
            </ActionName>
          </ButtonCard>
          }
          {sum &&
          <WrapperButton>
            <Button
              delay='.1s'
              grid={false}
              onClick={() => { return handleUp() }}
              top={'80px'}
            >
              <IconPlus color={BGColor} size={10} />
            </Button>
            <ItemProQuantity className='ProQuantity' >
              <div className='counts--container' onClick={() => { return setShow(index) }}>
                <div className={`count ${startAnimateUp}${animateType}`}>
                  {ProQuantity}
                </div>
              </div>
              {show === index &&
              <InputCounter
                max={999}
                min={1}
                onBlur={() => { return setShow(false) }}
                onChange={event => {
                  return dispatch({
                    type: 'ON_CHANGE',
                    payload: {
                      value: event.target.value,
                      name: 'name',
                      index: index,
                      id: pId
                    }
                  })
                }}
                onFocus={(event) => {
                  return dispatch({
                    type: 'ON_CHANGE',
                    payload: {
                      value: event.target.value,
                      name: 'name',
                      index: index,
                      id: pId
                    }
                  })
                }}
                onKeyDown={(event) => { return (event.key === 'Enter' ? setShow(false) : null) }}
                show={show}
                type='number'
                value={ProQuantity}
              />
              }
            </ItemProQuantity>

            <Button
              delay='.1s'
              grid={false}
              onClick={() => { return handleDown() }}
              top={'80px'}
            >
              -
            </Button>
          </WrapperButton>}
          <div className='dish-card__info'>
            {ValueDelivery > 0 && <span className='description'>Domicilio $ {ValueDelivery > 0 ? numberFormat(ValueDelivery) : 'Gratis'}</span>}

            <div className='flex-wrap'>
              <span className='price'>$ {ProPrice ? numberFormat(ProPrice) || free === 1 : 'Gratis'}</span>
              {ProDescuento > 0 && <span className='price discount'>{` $ ${numberFormat(ProDescuento)}`}</span>}
            </div>
          </div>
          <div className='info-price'>
            <span>
              <h3 className='dish-card__description'>{pName}</h3>
              <span className='description'>{ProDescription}</span>
            </span>
            <ContainerActions>
              {render &&
              <RippleButton
                bgColor={BGColor}
                margin='5px auto'
                onClick={() => { return onClick() }}
                padding='0'
                widthButton={widthButton}
              >
                {render}
              </RippleButton>
              }
            </ContainerActions>
          </div>
          <div className='dish-card__container-image' onClick={() => { return onTargetClick() }}>
            <Image
              alt={pName || ''}
              blurDataURL='/images/DEFAULTBANNER.png'
              className='store_image'
              layout='fill'
              objectFit='cover'
              src={ProImage || src || '/app/images/DEFAULTBANNER.png'}
            />
          </div>
        </Card>
      </WrapperCard >
    </>
  )
}

CardProducts.propTypes = {
  ProDescription: PropTypes.any,
  ProDescuento: PropTypes.number || PropTypes.string,
  ProImage: PropTypes.string,
  ProPrice: PropTypes.any,
  ValueDelivery: PropTypes.number,
  del: PropTypes.any,
  edit: PropTypes.any,
  handleDelete: PropTypes.func,
  key: PropTypes.any,
  onClick: PropTypes.func,
  pId: PropTypes.any,
  pName: PropTypes.any,
  render: PropTypes.any,
  widthButton: PropTypes.any
}

