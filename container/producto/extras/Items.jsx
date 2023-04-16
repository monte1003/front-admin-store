import { EColor } from '@/public/colors'
import { IconDelete } from '@/public/icons'
import { QuantityButton } from 'pkg-components'
import { RippleButton } from '~/components/Ripple'
import { numberFormat } from '~/utils'
import { CardsComponent } from './styled'

const Items = ({
  editing,
  handleDeleteAdditional,
  dataExtra,
  disabled = false,
  handleIncrementExtra = () => { return },
  handleDecrementExtra = () => { return }
}) => {
  return (
    <div>
      {dataExtra?.map((Adicionales, index) => {
        const contentPrice = Adicionales.extraPrice === 0 && Adicionales.quantity == 0
        return (
          <div key={Adicionales.exPid}>
            <CardsComponent>
              <div>
                <h3 className='title_card'>{Adicionales.extraName}</h3>
                <h3 className={`price-${!contentPrice ? 'value' : 'free'}`} > {!contentPrice ? `$ ${numberFormat((Adicionales?.newExtraPrice ?? Adicionales.extraPrice) || 0)}`: 'Gratis'}</h3>
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
                  disabled={disabled}
                  handleDecrement={() => {return handleDecrementExtra({ Adicionales, index }) }}
                  handleIncrement={() => {return handleIncrementExtra({ Adicionales, index })}}
                  padding='5px'
                  quantity={Adicionales.quantity || 0}
                  showNegativeButton={!Adicionales.quantity}
                  style={{ display: 'flex', justifyContent: 'flex-end' }}
                  validationZero={false}
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