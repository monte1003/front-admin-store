import { EColor, NorthTexasGreen } from '@/public/colors'
import { IconDelete, IconMiniCheck } from '@/public/icons'
import { Checkbox } from '~/components/Checkbox'
import { RippleButton } from '~/components/Ripple'
import { CardsComponent, GarnishChoicesHeader } from './styled'

export const Optional = ({
  editing,
  dataOptional = [],
  handleLineChange = () => { return },
  handlersPropsOptional = {
    handleAddOptional: () => { return }
  },
  handleDeleteItemSubOptional = () => { return },
  handleOpenExtra = () => { return }
}) => {
  const { handleAddOptional } = handlersPropsOptional || {}

  return (
    <div>
      {dataOptional?.length > 0 && dataOptional?.map((x, i) => {
        return (
          <div key={x.opExPid}>
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
              x?.ExtProductFoodsSubOptionalAll?.map((z, index) => {
                return (
                  <CardsComponent key={z.opSubExPid}>
                    <div>
                      <h3 className='title_card'>{z?.OptionalSubProName}</h3>
                      <h3 className='title_card'>Item: {index + 1}</h3>
                    </div>
                    {editing &&
                    <RippleButton
                      bgColor={'transparent'}
                      margin='0px'
                      onClick={() => { return handleDeleteItemSubOptional(z) }}
                      type='button'
                      widthButton='min-content'
                    >
                      <IconDelete color={EColor} size='25px' />
                    </RippleButton>
                    }
                    <Checkbox
                      checked={z?.check || false}
                      id={z.opSubExPid}
                      margin='10px 0'
                      name='opSubExPid'
                      onChange={value => { return editing ? handleLineChange(i, 'exState', value) : handleAddOptional({ exOptional: z.opSubExPid, codeCategory: x?.code, index }) }}
                      value={z.opSubExPid}
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
