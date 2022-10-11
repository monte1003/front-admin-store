import { EColor, NorthTexasGreen } from '@/public/colors'
import { IconDelete, IconMiniCheck } from '@/public/icons'
import React from 'react'
import { Checkbox } from '~/components/Checkbox'
import { RippleButton } from '~/components/Ripple'
import { CardsComponent, GarnishChoicesHeader } from './styled'

export const Optional = ({
  handleOpenExtra,
  handleDeleteItemSubOptional,
  dataOptional,
  handleLineChange,
  editing
}) => {
  return (
    <div>
      {dataOptional?.length > 0 && dataOptional?.map((x, i) => {
        return (
          <div key={i + 1}>
            <GarnishChoicesHeader onClick={() => { return handleOpenExtra(x) }}>
              <div>
                <p className='garnish-choices__title'>{x.OptionalProName}</p>
                {!!x.numbersOptionalOnly && <p className='garnish-choices__title-desc'>Escoge hasta {x.numbersOptionalOnly} opciones.</p>}
              </div>
              <div className='garnish-choices'>
                <IconMiniCheck color={NorthTexasGreen} size={'15px'} />
                {x.required ? <span className='marmita-minitag' span>OBLIGATORIO</span> : <span className='marmita-minitag' style={{ backgroundColor: 'transparent', color: 'transparent', width: '8  0px', zIndex: '0' }}>OBLIGATORIO</span>}
              </div>
            </GarnishChoicesHeader>
            {
              x.ExtProductFoodsSubOptionalAll?.map((z, index) => {
                return (
                  <CardsComponent key={z.opSubExPid}>
                    <div>
                      <h3 className='title_card'>{z?.OptionalSubProName}</h3>
                      <h3 className='title_card'>Item: {index + 1}</h3>
                    </div>
                    {editing && <RippleButton
                      bgColor={'transparent'}
                      margin='0px'
                      onClick={() => { return handleDeleteItemSubOptional(z) }}
                      type='button'
                      widthButton='min-content'
                    >
                      <IconDelete color={EColor} size='25px' />
                    </RippleButton>}
                    <Checkbox
                      checked={false}
                      id={i}
                      margin='10px 0'
                      name={'salesLine.exState'}
                      onChange={value => { return handleLineChange(i, 'exState', value) }}
                    />
                  </CardsComponent>
                )
              })
            }
          </div >
        )
      })}
    </div>
  )
}
