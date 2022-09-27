import { PColor } from '@/public/colors'
import React from 'react'
import { AwesomeModal } from '~/components/AwesomeModal'
import { QuantityButton } from '~/components/QuantityButton'
import { RippleButton } from '~/components/Ripple'
import { ExtrasProductsItems } from '~/container/producto/extras/ExtrasProductsItems'
import {
  Container,
  Content,
  DishAction
} from './styled'

export const SubItems = ({
  dataExtra = [],
  dataOptional = [],
  modalItem,
  product = {},
  setModalItem,
  handleDecrement,
  handleIncrement
}) => {
  const {
    pId,
    pName,
    ProQuantity,
    ProPrice
  } = product || {}

  return (
    <AwesomeModal
      borderRadius='4px'
      btnCancel={true}
      btnConfirm={false}
      footer={false}
      header={false}
      height='60vh'
      onCancel={() => { return false }}
      onHide={() => { return setModalItem(!modalItem) }}
      padding={0}
      question={false}
      show={modalItem}
      size='600px'
      sizeIconClose={'30px'}
      title='Crea una venta'
      zIndex='9999'
    >
      <Content>
        <div className='header'>
          {pName}
        </div>
        <Container>
          <ExtrasProductsItems
            dataExtra={dataExtra || []}
            dataOptional={dataOptional || []}
            modal={false}
            pId={pId}
            setModal={() => { return }}
          />
        </Container>

        <DishAction>
          <div style={{ display: 'flex', width: '70%' }}>
            <QuantityButton
              handleDecrement={handleDecrement}
              handleIncrement={handleIncrement}
              label={ProQuantity}
              quantity={ProQuantity}
            />
            <RippleButton
              bgColor={`${PColor} !important`}
              margin='0 0 0 10px'
              padding='10px'
            >
          Agregar  &nbsp; ${ProPrice}
            </RippleButton>
          </div>
        </DishAction>
      </Content>
    </AwesomeModal>
  )
}
