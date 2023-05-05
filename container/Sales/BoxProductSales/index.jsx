import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import {
  Box,
  Button,
  ContainerGrid,
  ScrollbarProduct,
  Warper
} from '../styled'
import { Checkbox } from 'components/Checkbox'
// import { Range } from 'components/InputRange'
import { CardProductSimple, RippleButton } from 'pkg-components'
import { IconEdit, IconPay } from 'public/icons'
import { PColor, APColor } from 'public/colors'
import { Skeleton } from 'components/Skeleton'
import FooterCalcules from '../FooterCalcules'
import NewSelect from 'components/NewSelectHooks/NewSelect'
import { Flex } from 'container/dashboard/styled'
import { numberFormat } from '../../../utils'
import { Context } from 'context/Context'
import { Draggable } from 'hooks/useDrag'
import { Range } from 'components/InputRange'

export const BoxProductSales = ({
  totalProductPrice,
  data,
  dispatch,
  max,
  setPrint,
  finalFilter,
  print,
  handleChange,
  setModalItem,
  modalItem,
  values,
  discount,
  handleProduct,
  dataClientes,
  callback = () => { return },
  setOpenModalDiscount = () => { return },
  handleComment = () => { return }
}) => {
  const { setShowComponentModal } = useContext(Context)
  const selectProduct = (product) => {
    if (!product) return
    handleProduct(product)
    setModalItem(!modalItem)
  }
  const format = (value = '') => {
    return numberFormat(value.replace(/[^0-9.]/g, '')?.replace(/^0[^.]/, '0'))
  }
  const handleClickAction = () => {
    return setShowComponentModal(2)
  }

  return (
    <Box>
      <ScrollbarProduct margin='0' style={{ height: 'calc(100vh - 100px)', padding: '10px' }}>
        <Warper>
          <NewSelect
            action={true}
            handleClickAction={() => { return handleClickAction() }}
            id='cliId'
            name='cliId'
            onChange={handleChange}
            optionName='clientName'
            options={dataClientes}
            search={true}
            title='Mis clientes'
            value={values?.cliId}
          />
          <input
            autoComplete='off'
            className='optional_input'
            name='change'
            onChange={handleChange}
            placeholder='Cambio'
            title='cambio'
            value={format(values?.change)}
          />
          <input
            autoComplete='off'
            className='optional_input'
            name='valueDelivery'
            onChange={handleChange}
            placeholder='Domicilio'
            title='Domicilio'
            value={format(values?.valueDelivery)}
          />
          <Flex style={{ marginBottom: '40px' }}>
            <Flex>
              <Checkbox
                checked={data.sortBy && data.sortBy === 'PRICE_HIGH_TO_LOW'}
                disabled={false}
                id={'PRICE_HIGH_TO_LOW'}
                name='sort'
                onChange={() => { return dispatch({ type: 'SORT', payload: 'PRICE_HIGH_TO_LOW' }) }}
              />
              <Checkbox
                checked={data.sortBy && data.sortBy === 'PRICE_LOW_TO_HIGH'}
                disabled={false}
                id={'PRICE_LOW_TO_HIGH'}
                name='sort'
                onChange={() => { return dispatch({ type: 'SORT', payload: 'PRICE_LOW_TO_HIGH' }) }}
              />
            </Flex>
            <Flex>
              {/* <RippleButton
                height='10px'
                onClick={() => {return setOpenModalDiscount(true)}}
              >
                {/* Aplicar descuento */}
              {/* {discount.discount ? 'descuento aplicado' : 'Aplicar descuento'} */}
              {/* </RippleButton> */}
            </Flex>
            {/* <Flex>
              <Range
                label='Precio'
                max={max || 0}
                min={0}
                onChange={(e) => {
                  return dispatch({
                    type: 'PRICE_RANGE',
                    payload: e.target.value
                  })
                }
                }
                value={data.priceRange}
                width='100%'
              />
            </Flex> */}

            <Flex style={{ justifyContent: 'space-between' }}>
              <Button
                active={data.payMethodPState === 1}
                color={APColor}
                onClick={() => { return dispatch({ type: 'PAYMENT_METHOD_TRANSACTION' }) }}
              >
                  TRANSFERENCIA
                <IconPay color={APColor} size={'30px'} />
              </Button>
              <Button
                active={data.payMethodPState === 0}
                color={APColor}
                onClick={() => { return dispatch({ type: 'PAYMENT_METHOD_MONEY' }) }}
              >
                  ENTREGA
                <IconPay color={APColor} size={'30px'} />
              </Button>
            </Flex>
          </Flex>
        </Warper>
        <ContainerGrid>
          {data?.PRODUCT?.length > 0 ? finalFilter.map((producto, idx) => {
            const activeComment = producto?.comment?.length > 0 ?? false
            return (
              <CardProductSimple
                ProDescription={producto.ProDescription}
                ProDescuento={producto.ProDescuento}
                ProImage={producto.ProImage}
                ProPrice={producto.ProPrice}
                ProQuantity={producto.ProQuantity}
                ValueDelivery={producto.ValueDelivery}
                activeComment={activeComment}
                asComment={activeComment}
                buttonComment={true}
                del={true}
                dispatch={dispatch}
                edit={false}
                free={producto.free}
                handleComment={() => {return handleComment(producto)}}
                handleDecrement={() => { return dispatch({ type: 'REMOVE_PRODUCT', payload: producto }) }}
                handleDelete={() => { return dispatch({ type: 'REMOVE_PRODUCT_TO_CART', payload: producto }) }}
                handleFree={true}
                handleFreeProducts={() => { return dispatch({ type: 'TOGGLE_FREE_PRODUCT', payload: producto }) }}
                handleIncrement={() => { return dispatch({ id: producto.pId, type: 'INCREMENT' }) }}
                index={idx}
                key={producto.pId || idx}
                onClick={() => { return selectProduct(producto)}}
                pId={producto.pId}
                pName={producto.pName}
                render={<IconEdit color={PColor} size='20px' />}
                sum={true}
                {...producto}
              />
            )
          }) : <Skeleton height={400} numberObject={50} />}
        </ContainerGrid>
        {/* <Draggable minX={300} moveX={false}>
          <div style={{ width: 100, height: 100, backgroundColor: 'grey', zIndex: 9999 }} />
        </Draggable> */}
        <FooterCalcules
          callback={callback}
          counter={Math.abs(data.counter)}
          disabled={false}
          discount={discount}
          dispatch={dispatch}
          print={print}
          setPrint={setPrint}
          totalProductPrice={totalProductPrice}
        />
      </ScrollbarProduct>
    </Box>
  )
}

BoxProductSales.propTypes = {
  dataMinPedido: PropTypes.shape({
    getMinPrice: PropTypes.number
  }),
  dispatch: PropTypes.func,
  handleChangeFilterProduct: PropTypes.func,
  inputValue: PropTypes.any,
  max: PropTypes.number,
  print: PropTypes.bool,
  setPrint: PropTypes.func,
  totalProductPrice: PropTypes.number
}
