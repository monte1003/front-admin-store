import React from 'react'
import { PColor } from '@/public/colors'
import { AwesomeModal } from '~/components/AwesomeModal'
import { QuantityButton } from '~/components/QuantityButton'
import { RippleButton } from 'pkg-components'
import { ExtrasProductsItems } from '~/container/producto/extras/ExtrasProductsItems'
import {
  Container,
  Content,
  DishAction
} from './styled'
import { numberFormat } from 'utils'
import { Skeleton } from './Skeleton'

export const SubItems = ({
  dataExtra = [],
  dataOptional = [],
  disabled = false,
  handleDecrement,
  handleIncrement,
  modalItem,
  loading = false,
  product = {},
  setModalItem,
  sumExtraProducts,
  handleAddOptional = () => { return },
  handleDecrementExtra = () => { return },
  handleIncrementExtra = () => { return },
  handleUpdateAllExtra = () => { return }
}) => {
  const {
    pId,
    pName,
    ProPrice,
    ProQuantity
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
      sizeIconClose='30px'
      title='Crea una venta'
      zIndex='9999'
    >
      <Content>
        <div className='header'>
          {pName}
        </div>
        <Container>
          {loading ?
            <Skeleton /> :
            <ExtrasProductsItems
              dataExtra={dataExtra || []}
              dataOptional={dataOptional || []}
              disabled={disabled}
              editing={false}
              handleAddOptional={handleAddOptional}
              handleDecrementExtra={handleDecrementExtra}
              handleIncrementExtra={handleIncrementExtra}
              modal={false}
              pId={pId}
              setModal={() => { return }}
            />
          }
        </Container>

        <DishAction>
          <div style={{ display: 'flex', width: '70%' }}>
            {loading ? <Skeleton numberObject={1} style={{ padding: 0, margin: 0 }} /> 
              : <QuantityButton
                handleDecrement={handleDecrement}
                handleIncrement={handleIncrement}
                label={numberFormat(ProPrice)}
                quantity={ProQuantity}
                showNegativeButton={!ProQuantity || ProQuantity === 0 || ProQuantity === null}
                validationZero={false}
              />
            }
            <RippleButton
              bgColor={`${PColor} !important`}
              disabled={disabled}
              margin='0 0 0 10px'
              onClick={handleUpdateAllExtra}
              padding='10px'
            >
          Agregar &nbsp;{(`${numberFormat(sumExtraProducts || '')}`)}
            </RippleButton>
          </div>
        </DishAction>
      </Content>
    </AwesomeModal>
  )
}
