import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { RippleButton } from '../../../components/Ripple'
import { EColor } from '../../../public/colors'
import { IconDelete, IconMiniCheck } from '../../../public/icons'
import { RandomCode, updateCache } from '../../../utils'
import { MockData } from '../../../components/common/mockData'
import {
  GET_EXTRAS_PRODUCT_FOOD_OPTIONAL,
  GET_EXTRAS_PRODUCT_FOOD_SUB_OPTIONAL,
  UPDATE_EXTRAS_PRODUCT_FOOD_OPTIONAL
} from '../../update/Products/queries'
import {
  CardsComponent,
  ContentCheckbox,
  GarnishChoicesHeader,
  Input
} from './styled'
import { Checkbox } from 'components/Checkbox'
import Column from 'components/common/Atoms/Column'
import Row from 'components/common/Atoms/Row'
import { QuantityButton } from '~/components/QuantityButton'


export const OptionalExtraProducts = ({ pId }) => {
  // STATES
  const [data, setData] = useState(MockData)
  const [numberLimit, setNumberLimit] = useState(2)
  const [title, setTitle] = useState('')
  const [setCheck, setChecker] = useState({})
  // QUERIES
  const [updateExtProductFoodsOptional] = useMutation(UPDATE_EXTRAS_PRODUCT_FOOD_OPTIONAL)
  const [updateExtProductFoodsSubOptional] = useMutation(GET_EXTRAS_PRODUCT_FOOD_SUB_OPTIONAL)
  // HANDLES
  const handleCheck = (e) => {
    const { name, checked } = e.target
    setChecker({ ...setCheck, [name]: checked ? true : false })
  }
  const addCard = async (title, listId) => {
    const id = await RandomCode(9)
    const newCard = {
      id: id,
      title: title,
      numberLimit: 5,
      required: setCheck.exState ? 1 : 0
    }
    const list = data.lists[listId]
    list.cards = [...list.cards, newCard]
    setData({
      ...data,
      lists: {
        ...data.lists,
        [listId]: list
      }
    })
    await updateExtProductFoodsSubOptional({
      variables: {
        input: {
          pId,
          OptionalSubProName: title,
          exCodeOptionExtra: listId,
          exCode: id,
          state: 1
        }
      }, update: (cache, { data: { ExtProductFoodsOptionalAll } }) => {
        return updateCache({
          cache,
          query: GET_EXTRAS_PRODUCT_FOOD_OPTIONAL,
          nameFun: 'ExtProductFoodsOptionalAll',
          dataNew: ExtProductFoodsOptionalAll
        })
      }
    })
    setTitle('')
  }

  const handleRemoveList = i => {
    const Lines = data?.listIds?.filter((salesLine, index) => { return index !== i })
    setData({
      listIds: [...Lines],
      lists: {
        ...data.lists
      }
    })
  }
  const handleAdd = ({ listId }) => {
    if (title !== '') {
      addCard(title, listId)
    }
  }
  const handleAddList = async ({ title, numberLimit }) => {
    if (title !== '') {
      const newListId = await RandomCode(9)
      setData({
        listIds: [...data.listIds, newListId],
        lists: {
          ...data.lists,
          [newListId]: {
            id: newListId,
            title: title,
            required: setCheck.exState ? 1 : 0,
            numberLimit: numberLimit,
            cards: []
          }
        }
      })
      await updateExtProductFoodsOptional({
        variables: {
          input: {
            pId,
            code: newListId,
            OptionalProName: title,
            required: setCheck.exState ? 1 : 0,
            numbersOptionalOnly: numberLimit
          }
        },
        update: (cache, { data: { ExtProductFoodsOptionalAll } }) => {
          return updateCache({
            cache,
            query: GET_EXTRAS_PRODUCT_FOOD_OPTIONAL,
            nameFun: 'ExtProductFoodsOptionalAll',
            dataNew: ExtProductFoodsOptionalAll
          })
        }
      })
      setTitle('')
    }
  }

  const filterData = data?.listIds?.filter(x => {return x !== '01list'})
  return <Row
    flexWrap='wrap'
    margin='102px 0'
    width='100%'
  >
    {filterData && filterData?.map((listID, index) => {
      const list = data.lists[listID]
      return (
        <Column
          key={index}
          role='list'
          width='30%'
        >
          <GarnishChoicesHeader>
            <div>
              <p className='garnish-choices__title'>{list?.title}</p>
              <p className='garnish-choices__title-desc'>Escoge hasta {list?.numberLimit} opciones.</p>
              <div className='garnish-choices'>
                {list?.required === 1 && <span className='marmita-minitag'>OBLIGATORIO</span>}
              </div>
            </div>
            <IconMiniCheck color={'#009b3a'} size={'15px'} />
            <RippleButton
              bgColor={'transparent'}
              margin='0px'
              onClick={() => { return handleRemoveList(index) }}
              type='button'
              widthButton='min-content'
            >
              <IconDelete color={EColor} size='25px' />
            </RippleButton>
          </GarnishChoicesHeader>
          <span>{list?.cards?.length}</span>
          <List
            data={data}
            index={index}
            list={list}
            setData={setData}
          />
          <Input
            aria-disabled
            autoFocus
            card
            name='title'
            onChange={(e) => { return setTitle(e.target.value) }}
            onKeyDown={(event) => { return (event.key === 'Enter' && handleAdd({ listId: listID })) }}
            placeholder='enter card'
            value={listID.title}
          />
          <RippleButton
            margin='20px auto'
            onClick={() => { return handleAdd({ listId: listID }) }}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleAdd({ listId: listID })
              }
            }}
            widthButton='100%'
          >
            Adicionar sobremesa
          </RippleButton>
        </Column>
      )
    })}
    <div className='wrapper-list'>
      <GarnishChoicesHeader>
        <div>
          <p className='garnish-choices__title'>{title ? title : 'Escoge tu... '}</p>
          <p className='garnish-choices__title-desc'>Escoge hasta {numberLimit} opciones.</p>
        </div>
        <div className='garnish-choices'>
          {setCheck.exState === true && <span className='marmita-minitag'>OBLIGATORIO</span>}
        </div>
        <div>
          <div>
            <RippleButton
              bgColor={'transparent'}
              margin='0px'
              type='button'
              widthButton='min-content'
            >
              <IconDelete color={`${EColor}90`} size='25px' />
            </RippleButton>
          </div>
        </div>
      </GarnishChoicesHeader>
      <Input
        card
        margin='10px 0'
        name='title'
        onChange={(e) => { return setTitle(e.target.value) }}
        placeholder='Añadir nueva lista'
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
            name={'exState'}
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
        <RippleButton
          margin='0'
          onClick={() => { return handleAddList({ title: title, numberLimit: numberLimit }) }}
          padding='0'
          type='button'
          widthButton='100%'
        >
          Adicionar Categoría de sobremesa
        </RippleButton>
      </GarnishChoicesHeader>
    </div>
  </Row>

}

export const List = ({ list, setData, data }) => {
  return (
    <Column>
      {list?.cards?.map((card, index) => {
        return (
          <Column key={card?.id}>
            <Card
              card={card}
              data={data}
              id={list?.id}
              index={index}
              key={card?.id}
              list={list}
              setData={setData}
            />
              s
          </Column>
        )
      })}
    </Column>
  )
}

export const Card = ({ card, index }) => {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const handleRemoveItemCard = async () => {
  }
  return (
    <Column>
      <CardsComponent>
        <Column>
          <h3 className='title_card'>{card?.title}</h3>
          <h3 className='title_card'>Item: {index + 1}</h3>
        </Column>
        <RippleButton
          bgColor={'transparent'}
          margin='0px'
          onClick={() => { return handleRemoveItemCard(index) }}
          type='button'
          widthButton='min-content'
        >
          <IconDelete color={EColor} size='25px' />
        </RippleButton>
      </CardsComponent>
    </Column>
  )
}

export const InputHookProducts = ({
  placeholder,
  borderRadius,
  value,
  onChange,
  onFocus,
  inputText,
  type,
  color,
  ...props
}) => {
  return (
    <>
      <Input
        {...props}
        borderRadius={borderRadius}
        color={color}
        inputText={inputText}
        onChange={onChange ? e => { return onChange(e.target.value) } : undefined}
        onFocus={onFocus}
        placeholder={placeholder || ''}
        type={type || 'text'}
        value={value || ''}
      />
    </>
  )
}
