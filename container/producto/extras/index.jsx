import PropTypes from 'prop-types'
import { useState } from 'react'
import { Checkbox } from 'components/Checkbox'
import Column from 'components/common/Atoms/Column'
import { useDessert } from 'npm-pkg-hook'
import {
  Button, List,
  ResisesColumns,
  Tag
} from 'pkg-components'
import InputHooks from 'components/InputHooks/InputHooks'
import { QuantityButton } from 'components/QuantityButton'
import { RippleButton } from '../../../components/Ripple'
import {
  BGColor,
  EColor,
  NorthTexasGreen,
  PColor
} from '../../../public/colors'
import { IconDelete, IconMiniCheck } from '../../../public/icons'
import {
  BodyDnd,
  ContentCheckbox,
  GarnishChoicesHeader
} from './styled'


export const OptionalExtraProducts = ({ pId }) => {
  // STATES
  const [numberLimit, setNumberLimit] = useState(1)
  // HOOKS
  const {
    handleCheck,
    handleRemoveList,
    setTitle,
    title,
    setCheck,
    dataListIds,
    data,
    handleChangeItems,
    handleAdd,
    removeOneItem,
    handleAddList,
    setData
  } = useDessert({ pId })
  return (
    <BodyDnd>
      <ResisesColumns
        backgroundColor='transparent'
        initialDividerPosition={{ __0: 80, __1: 20 }}
        lastMinWidth={'auto'}
        padding='0'
      >
        <div className='first-column'>
          {dataListIds && dataListIds?.map((listID, index) => {
            const list = data.lists[listID]
            const numberLimit = list.numberLimit
            const incompleteList = list.numberLimit === list.cards.length
            const messageLimit = `${ numberLimit } ${numberLimit > 1 ? 'opciones' : 'opción'}`
            return (
              <Column
                border={`2px solid ${incompleteList ? NorthTexasGreen : 'transparent' }`}
                height='min-content'
                key={index}
                role='list'
              >
                <GarnishChoicesHeader style={{padding:5, marginBottom: 20}}>
                  <div>
                    <p className='garnish-choices__title'>{list?.title}</p>
                    <p className='garnish-choices__title-desc'>Escoge hasta {messageLimit}.</p>
                    <div className='garnish-choices'>
                      {list?.required === 1 && <Tag />}
                    </div>
                  </div>
                  <RippleButton
                    bgColor='transparent'
                    margin='0px'
                    onClick={() => { return handleRemoveList(index) }}
                    type='button'
                    widthButton='min-content'
                  >
                    <IconDelete color={EColor} size='25px' />
                  </RippleButton>
                </GarnishChoicesHeader>
                <Tag label={`Total de items ${list?.cards?.length} / ${numberLimit}`} />
                {incompleteList && <IconMiniCheck color={NorthTexasGreen} size={10} />}
                <List
                  data={data}
                  index={index}
                  list={list}
                  listID={listID}
                  removeOneItem={removeOneItem}
                  setData={setData}
                />
                <InputHooks
                  aria-disabled
                  autoFocus={true}
                  margin='5px 0'
                  name='list_value'
                  onChange={value => { return handleChangeItems({ listID, id: list.id, value, name: 'list_value' }) }}
                  onFocus={true}
                  required={true}
                  title='Añade un item'
                  value={list?.value}
                />
                {!incompleteList && (
                  <RippleButton
                    disabled={incompleteList}
                    margin='16px 0 auto'
                    onClick={() => { return handleAdd({ listId: listID }) }}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        handleAdd({ listId: listID })
                      }
                    }}
                    widthButton='100%'
                  >
                  Adicionar
                  </RippleButton>
                )}
              </Column>
            )
          })}
        </div>
        <div>
          <GarnishChoicesHeader>
            <div className='content'>
              <div>
                <p className='garnish-choices__title'>{title ? title : 'Escoge tu... '}</p>
                <p className='garnish-choices__title-desc'>Escoge hasta {numberLimit} opciones.</p>
              </div>
              <div className='garnish-choices'>
                {setCheck.exState === true && <Tag />}
              </div>
            </div>
          </GarnishChoicesHeader>
          <InputHooks
            name='title'
            onChange={(e) => { return setTitle(e.target.value) }}
            required={true}
            title='Añadir nueva lista'
            type='text'
            value={title}
          />
          <GarnishChoicesHeader>
            <ContentCheckbox>
              <Checkbox
                checkbox
                checked={setCheck.exState}
                id={setCheck.exState}
                margin='10px 0'
                name='exState'
                onChange={e => { return handleCheck(e) }}
                type='checkbox'
              />
            </ContentCheckbox>
            <QuantityButton
              handleDecrement={() => { return setNumberLimit(numberLimit  === 0 ? 0 : numberLimit - 1) }}
              handleIncrement={() => {return setNumberLimit(numberLimit + 1)}}
              quantity={numberLimit}
              showNegativeButton={numberLimit  === 0}
            />
            <Button
              backgroundColor={PColor}
              borderRadius='0'
              color={BGColor}
              fontWeight='300'
              onClick={() => { return handleAddList({ title: title, numberLimit: numberLimit }) }}
              type='button'
              width='100%'
            >
              añadir
            </Button>
          </GarnishChoicesHeader>

        </div>
      </ResisesColumns>
    </BodyDnd>
  )

}

OptionalExtraProducts.propTypes = {
  pId: PropTypes.string
}
