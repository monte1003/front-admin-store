import { EColor } from '@/public/colors'
import { IconDelete } from '@/public/icons'
import React from 'react'
import { QuantityButton } from '~/components/QuantityButton'
import { RippleButton } from '~/components/Ripple'
import { numberFormat } from '~/utils'
import { CardsComponent } from './styled'

const Items = ({
  editing,
  handleDeleteAdditional,
  dataExtra
}) => {
  return (
    <div>
      {dataExtra?.map((Adicionales, index) => {
        const contentPrice = Adicionales.extraPrice > 0
        return (
          <div key={index + 1}>
            <CardsComponent>
              <div>
                <h3 className='title_card'>{Adicionales.extraName}</h3>
                <h3 className={`price-${contentPrice ? 'value' : 'free'}`} > {contentPrice ? `$ ${numberFormat(Adicionales.extraPrice)}`: 'Gratis'}</h3>
              </div>
              <div style={{ display: 'flex', width: editing ? 'auto' : 'min-content' }}>
                {editing &&
                <RippleButton
                  bgColor={'transparent'}
                  margin='0px'
                  onClick={() => { return handleDeleteAdditional(Adicionales) }}
                  type='button'
                  widthButton='min-content'
                >
                  <IconDelete color={EColor} size='25px' />
                </RippleButton>
                }
                {!editing &&
                <QuantityButton
                  border='none'
                  handleDecrement={() => {return}}
                  handleIncrement={() => {return}}
                  label={2}
                  padding='5px'
                  quantity={0}
                  showNegativeButton={false}
                  style={{ display: 'flex', justifyContent: 'flex-end' }}
                  validationZero={true}
                  width='min-content'
                />}
              </div>

            </CardsComponent>
          </div>
        )
      })}
    </div>
  )
}

export default Items