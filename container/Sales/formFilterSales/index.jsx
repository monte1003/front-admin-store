import React from 'react'
import PropTypes from 'prop-types'
import { Warper } from '../styled'
import InputHooks from 'components/InputHooks/InputHooks'
import { RippleButton } from '~/components/Ripple'

export const FormFilterSales = ({
  onChangeInput,
  valuesDates,
  search,
  handleChangeFilter = () => { return },
  handleCleanFilter = () => { return }
}) => {
  return (
    <Warper>
      <InputHooks
        name='fromDate'
        onChange={onChangeInput}
        required
        title='Desde'
        type='date'
        value={valuesDates?.fromDate}
        width={'20%'}
      />
      <InputHooks
        name='toDate'
        onChange={onChangeInput}
        required
        title='Hasta'
        type='date'
        value={valuesDates?.toDate}
        width='20%'
      />
      <RippleButton
        onClick={handleCleanFilter}
        padding='0'
        widthButton='20%'
      >
        Limpiar
      </RippleButton>

      <InputHooks
        name='search'
        onChange={handleChangeFilter}
        range={{ min: 0, max: 20 }}
        title='Busca tus productos'
        type='text'
        value={search}
        width='100%'
      />
    </Warper>
  )
}

FormFilterSales.propTypes = {
  handleChangeFilter: PropTypes.any,
  onChangeInput: PropTypes.any,
  search: PropTypes.any,
  valuesDates: PropTypes.shape({
    fromDate: PropTypes.any,
    toDate: PropTypes.any
  })
}
