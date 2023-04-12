import React from 'react'
import PropTypes from 'prop-types'
import { numberFormat } from 'utils'
import { Input } from '../styled'
import { Prints } from '../Printsale'
import { AwesomeModal } from 'pkg-components'
import { BGColor } from '@/public/colors'
import { IconSales } from 'public/icons'
import { Loading } from '~/components/Loading'

export const ModalSales = ({
  print,
  setPrint,
  totalProductPrice,
  dataClientes = {},
  values = {},
  code,
  data,
  delivery,
  loading,
  discount = {},
  setDelivery = () => { return },
  handleChange = () => { return },
  handleSubmit = () => { return },
  ...rest
}) => {
  return (
    <div>
      {loading && <Loading />}
      <AwesomeModal
        backgroundColor='#ecebeb'
        borderRadius='0'
        btnConfirm={true}
        cancel='Cancelar'
        confirm='Guardar y salir'
        footer
        header={true}
        height='100%'
        hideOnConfirm={false}
        iconConfirm={<IconSales color={BGColor} size={'20px'} />}
        onConfirm={() => { return handleSubmit() }}
        onHide={() => { return setPrint(!print) }}
        padding='30px'
        show={print}
        size='100%'
        zIndex='999999'
      >
        <Prints
          change={values?.change}
          code={code}
          data={data?.PRODUCT || []}
          dataClientes={dataClientes}
          discount={discount}
          handleSubmit={handleSubmit}
          total={`$ ${numberFormat(totalProductPrice)}`}
          values={values}
          {...rest}
        />
      </AwesomeModal>

      <AwesomeModal
        borderRadius='5px'
        btnCancel={true}
        btnConfirm={false}
        footer={false}
        header={true}
        onCancel={() => { return false }}
        onHide={() => { return setDelivery(!delivery) }}
        padding='25px'
        show={delivery}
        size='small'
        title='Añade el costo del envío'
      >
        <Input
          autoComplete='off'
          name='ValueDelivery'
          onChange={handleChange}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              e.stateventDefault()
              e.target.blur()
              setDelivery(!delivery)
            }
          }}
          placeholder='costo de envio'
          value={values?.ValueDelivery}
        />
        <Input
          autoComplete='off'
          name='change'
          onChange={handleChange}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault()
              e.target.blur()
              setDelivery(!delivery)
            }
          }}
          placeholder='Cambio'
          value={values?.change}
        />
      </AwesomeModal>
    </div>
  )
}

ModalSales.propTypes = {
  code: PropTypes.any,
  data: PropTypes.shape({
    PRODUCT: PropTypes.array
  }),
  delivery: PropTypes.any,
  handleChange: PropTypes.any,
  handleSubmit: PropTypes.func,
  setDelivery: PropTypes.func,
  setPrint: PropTypes.func,
  totalProductPrice: PropTypes.any,
  values: PropTypes.shape({
    ValueDelivery: PropTypes.any,
    change: PropTypes.any
  })
}
